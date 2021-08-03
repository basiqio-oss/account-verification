import { refreshConnection } from "../clients/usersClient";

export const manageFailedJob = (job, handleNotify, institution) => {
  const accountsStepStatus = job.steps[1].result.code;

    if (accountsStepStatus === "service-unavailable") {
      // check status of the institution 
      if (institution.status === "major-outage") {
        handleNotify(
          `Unfortunately, we are unable to retrieve your accounts from ${institution.name} 
          due to a major outage with their services. Please try again later.`
        )
      }
      else {
        // if status !== major outage
        handleNotify(
          `Unfortunately we were unable to retrieve your accounts from ${institution.name}. 
          We will keep trying in the background.`
        )
        setTimeout(() => {
          refreshConnection(job.links.source)
        }, 300000)
      }
    } 
    
    else if (accountsStepStatus === "account-not-accessible-requires-user-action") {
      handleNotify(
        `Could not retrieve your accounts from ${institution.name} as user action is required. 
        Please log in to your internet banking portal, follow the prompts on your accounts and 
        transactions page, and try again.`
        )
    } 
    
    return;
}