import { refreshConnection } from "../clients/usersClient";

export const manageFailedJob = (job, handleNotify) => {
  let retrieveAccountsStepStatus = job.steps.filter(step => step.title === "retrieve-accounts")[0].result.code;
  
  if (retrieveAccountsStepStatus === "account-not-accessible-requires-user-action") {
    handleNotify(
      `We had an issue retrieving your accounts, due to user action being required on your internet banking portal. 
      Please log in to your internet banking portal, follow the prompts on your accounts and 
      transactions page, and try again.`
      )
  } 

    if (retrieveAccountsStepStatus === "service-unavailable") {
      if ("hello" === "major-outage") {
        handleNotify(
          `Unfortunately, we are unable to retrieve your accounts from your bank 
          due to a major outage with their services. Please try again later.`
        )
      }
      else {
        // if status !== major outage
        handleNotify(
          `Unfortunately we were unable to retrieve your accounts from your bank. 
          We will keep trying in the background.`
        )
        setTimeout(() => {
          refreshConnection(job.links.source)
        }, 300000)
      }
    } 
    
    
    return;
}