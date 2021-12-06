import React, { useEffect, useContext } from 'react';

import BasiqConnect from "@basiq/basiq-connect-control";
import UserContext from '../context/userContext';

import { getUserAccounts } from '../clients/usersClient';
import { getJob } from '../clients/jobsClient';
import  { manageFailedJob } from '../utils/jobs'
import { getValidToken } from '../utils/authentication';

export const BasiqConnectModal = (userId) => {
  const { setUserAccounts, handleNotify } = useContext(UserContext)

  let allUserAccounts = [];
  let token = getValidToken();

  const pollJob = async (jobId) => {
    let job;

    getJob(jobId).then((result) => {
      job = JSON.parse(result);
    }).then(() => {
      let retrieveAccountsStep = job.steps.filter(step => step.title === "retrieve-accounts")[0];

      if (retrieveAccountsStep.status === "success") {
        // If the retrieve accounts step has successfully completed, fetch the users accounts
        getUserAccounts(job.steps[1].result.url).then((result) => {
          let accountsArray = JSON.parse(result).data;
          let userTransactionAccounts = accountsArray.filter(account => account.type === "transaction");  

          Array.prototype.push.apply(allUserAccounts, userTransactionAccounts); 
          return setUserAccounts(allUserAccounts);
        })
      } 
      else if (retrieveAccountsStep.status === "failed") {
        // If the retrieve accounts step has failed, manage the failed job appropriately
        manageFailedJob(job, handleNotify)
      } else {
        // If the step has not completed or failed, it is still processing, so wait a second before checking again. 
        return setTimeout(() => {
          console.log("job is still processing")
          pollJob(jobId)
        }, 1000)
      }
    })
  }

  const handleNewJob = async (event) => {
    // event detail will return the id of the job for polling, use this to poll and monitor the status
    let jobId = await event.detail.id;
    pollJob(jobId)
  }

    useEffect(() => {
      // Renders the "BasiqConnect Simple UI" (bank picker)
        BasiqConnect({
            containerId: "basiq-control",
            token: token.access_token,
            userID: userId.userId, 
            })
        
        // Adding event listener to register when a new job has been created as this indicated a connection has been initiated. 
        // When this event is triggered, we start polling the job resource to monitor the status and act accordingly (handle failed jobs or proceed with fetching accounts)
        window.addEventListener("jobCreated", handleNewJob);
    }, [])

    return(
        <div id="basiq-control"></div>
    )
}