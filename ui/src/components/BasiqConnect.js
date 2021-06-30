import React, { useEffect, useContext } from 'react';
import BasiqConnect from "@basiq/basiq-connect-control";
import userContext from '../context/userContext';
import { getUserJobs, getJob, getUserAccount } from '../clients/usersClient';

export function BasiqConnectModal(userId) {

    const { setUserAccounts } = useContext(userContext)
    var jobsReturned = [];
    var newJobs = [];
    var allUserAccounts = [];
    var jobsAlreadyReceived = [];

  const filterNewJobs = (jobsReturned, jobsAlreadySuccessful) => {
      newJobs = jobsReturned.filter(firstArrayItem =>
          !jobsAlreadySuccessful.some(
              secondArrayItem => firstArrayItem.id === secondArrayItem.id
              ));
      };

  const pollJobs = async () => {
    getUserJobs(userId.userId).then((result) => {
      jobsReturned = JSON.parse(result).data
    filterNewJobs(jobsReturned, jobsAlreadyReceived);
      jobsAlreadyReceived = jobsReturned;
    }).then(async () => {
      if (newJobs.length !== 0) {
        newJobs.forEach(job => {
          pollJob(job.id)
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
        getUserAccount(job.steps[1].result.url).then((result) => {
          let accountsArray = JSON.parse(result).data;
          let userTransactionAccounts = accountsArray.filter(account => account.class.type === "transaction");
          Array.prototype.push.apply(allUserAccounts, userTransactionAccounts); 
          return setUserAccounts(allUserAccounts);
        })
      } else if (jobStatus === "failed") {
        return console.log(`job has ${jobStatus}`)
      } else {
        console.log("job is still processing")
        return pollJob(jobId)
      }
    }
    )
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
    })

    return(
        <div id="basiq-control"></div>
    )
}