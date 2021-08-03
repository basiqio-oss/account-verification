import React, { useEffect, useContext } from 'react';

import BasiqConnect from "@basiq/basiq-connect-control";
import UserContext from '../context/userContext';

import { getUserAccounts } from '../clients/usersClient';
import { getJob } from '../clients/jobsClient';
import  { manageFailedJob } from '../utils/jobs'

export const BasiqConnectModal = (userId) => {
  const { setUserAccounts, handleNotify } = useContext(UserContext)

  var allUserAccounts = [];

  const pollJob = async (jobId) => {
    let job;
    var institution;

    getJob(jobId).then((result) => {
      job = JSON.parse(result);
    }).then(() => {
      let jobStatus = job.steps[1].status;
      
      if (jobStatus === "success") {
        getUserAccounts(job.steps[1].result.url).then((result) => {
          let accountsArray = JSON.parse(result).data;
          let userTransactionAccounts = accountsArray.filter(account => account.type === "transaction");  

          Array.prototype.push.apply(allUserAccounts, userTransactionAccounts); 
          return setUserAccounts(allUserAccounts);
        })
      } 
      else if (jobStatus === "failed") {
        manageFailedJob(job, handleNotify, institution)
      } else {
        return setTimeout(() => {
          console.log("job is still processing")
          pollJob(jobId)
        }, 1000)
      }
    })
  }

  const handleNewJob = async (event) => {
    let jobId = await event.detail.id;
    pollJob(jobId)
  }

    useEffect(() => {
        BasiqConnect({
            containerId: "basiq-control",
            token: sessionStorage.getItem("session_token"),
            userID: userId.userId, 
            })
        
        window.addEventListener("jobCreated", handleNewJob);
    }, [])

    return(
        <div id="basiq-control"></div>
    )
}