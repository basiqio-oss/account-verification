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
      handleNotify(
        `Unfortunately, we were unable to retrieve your accounts due to an issue with your bank, please try again later.`
      )
  } 
    
    return;
}