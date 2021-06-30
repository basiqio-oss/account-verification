import React, { useEffect, useContext } from 'react';
import BasiqConnect from "@basiq/basiq-connect-control";
import userContext from '../context/userContext';
import { getUserJobs, getJob, getUserAccount } from '../clients/usersClient';

export function BasiqConnectModal(userId) {

    const { jobsAlreadyReceived, setJobsAlreadyReceived, setUserAccounts } = useContext(userContext)
    var jobsReturned = [];
    var newJobs = [];
    let allUserAccounts = [];

  const pollJobs = async () => {
    getUserJobs(userId.userId).then((result) => {
      jobsReturned = JSON.parse(result).data;
      console.log("jobs returned", jobsReturned);
      newJobs = jobsReturned.filter(job => !jobsAlreadyReceived.includes(job))
      setJobsAlreadyReceived(jobsReturned)
      console.log("new jobs", newJobs);
    }).then(() => {
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
          setUserAccounts(allUserAccounts);
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
        setInterval(() => (pollJobs()), 3000)
    })

    return(
        <div id="basiq-control"></div>
    )
}