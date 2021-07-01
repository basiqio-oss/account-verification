import React, { useEffect, useContext } from 'react';
import BasiqConnect from "@basiq/basiq-connect-control";
import userContext from '../context/userContext';
import { getUserJobs, getJob, getUserAccount, refreshConnection } from '../clients/usersClient';

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
        getUserAccount(job.steps[1].result.url).then((result) => {
          let accountsArray = JSON.parse(result).data;
          let userTransactionAccounts = accountsArray.filter(account => account.class.type === "transaction");
          Array.prototype.push.apply(allUserAccounts, userTransactionAccounts); 
          return setUserAccounts(allUserAccounts);
        })
      } else if (jobStatus === "failed") {
        manageFailedJob(job)
        return console.log(`job has ${jobStatus}`)
      } else {
        return setTimeout(() => {
          console.log("job is still processing")
          pollJob(jobId)
        }, 5000)
      }
    }
    )
  }

  const manageFailedJob = (job) => {
    if (job.steps[1].result.code === "service-unavailable") {
      // alert(
      //   `Unfortunately we were unable to retrieve your accounts from {BANK}. 
      //   We will keep trying in the background and let you know how we go!`
      //   )
      console.log("Unfortunately we were unable to retrieve your accounts from {BANK}. We will keep trying in the background and let you know how we go!")
      setTimeout(() => {
        refreshConnection(job.links.source)
      }, 300000)
    } else if (job.result.code === "account-not-accessible-requires-user-action") {
      console.log('account not accessible')
        // alert(
        //   `Unfortunately we are unable to retrieve your account details
        //   as the bank is waiting for you to perform an action. 
        //   Please login to your internet banking, navigate to 
        //   accounts and transactions, and address any popups requiring 
        //   action from the bank. Hit try again below and we will continue.`)
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
    })

    return(
        <div id="basiq-control"></div>
    )
}