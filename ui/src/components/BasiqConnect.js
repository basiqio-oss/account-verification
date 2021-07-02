import React, { useEffect, useContext } from 'react';

import BasiqConnect from "@basiq/basiq-connect-control";
import UserContext from '../context/userContext';

import { getUserAccounts, refreshConnection } from '../clients/usersClient';
import { getAllUserJobs, getJob } from '../clients/jobsClient';

export const BasiqConnectModal = (userId) => {

  const { setUserAccounts, handleNotify } = useContext(UserContext)

  var jobsReturned = [];
  var newJobs = [];
  var allUserAccounts = [];
  var jobsAlreadyReceived = [];

  const filterNewJobs = (jobsReturned, oldJobs) => {
      newJobs = jobsReturned.filter(
          jobsReturned =>!oldJobs.some(oldJobs => jobsReturned.id === oldJobs.id)
        );
      };

  const pollJobs = async () => {
    getAllUserJobs(userId.userId).then((result) => {
      jobsReturned = JSON.parse(result).data.data
    filterNewJobs(jobsReturned, jobsAlreadyReceived);
      jobsAlreadyReceived = jobsReturned;
    }).then(async () => {
      if (newJobs.length !== 0) {
        newJobs.forEach(job => {
          pollJob(job.id);
        });
        }
      }
    )
  }

  const pollJob = async (jobId) => {
    let job;
    getJob(jobId).then((result) => {
      job = JSON.parse(result);
    }).then(() => {
      let jobStatus = job.steps[1].status;

      if (jobStatus === "success") {
        console.log('successfully retrieved your account.')
        getUserAccounts(job.steps[1].result.url).then((result) => {
          let accountsArray = JSON.parse(result).data;
          let userTransactionAccounts = accountsArray.filter(account => account.type === "transaction");         
          Array.prototype.push.apply(allUserAccounts, userTransactionAccounts); 
          return setUserAccounts(allUserAccounts);
        })
      } 
      
      else if (jobStatus === "failed") {
        manageFailedJob(job)
        return console.log(`job has ${jobStatus}`)
      } 

      else {
        return setTimeout(() => {
          console.log("job is still processing")
          pollJob(jobId)
        }, 5000)
      }
    })
  }

  const manageFailedJob = (job) => {
    if (job.steps[1].result.code === "service-unavailable") {
      handleNotify(
        `Unfortunately we were unable to retrieve your accounts from {BANK}. 
        We will keep trying in the background.`
      )
      setTimeout(() => {
        refreshConnection(job.links.source)
      }, 300000)
    } 
    
    else if (job.steps[1].result.code === "account-not-accessible-requires-user-action") {
      handleNotify(
        `Couls not connect your accounts from {BANK} as user action is required. 
        Please log in to your internet banking portal, take action, and try again.`
        )
    } 
    
    else if (job.steps[1].result.code === "invalid-credentials") {
      console.log("invalid credentials")
    }
  }

    useEffect(() => {
        BasiqConnect({
            containerId: "basiq-control",
            token: sessionStorage.getItem("session_token"),
            userID: userId.userId, 
            })

        const interval = setInterval(() => {
            pollJobs();
            }, 1000);
        
        return () => clearInterval(interval);
    }, [])

    return(
        <div id="basiq-control"></div>
    )
}