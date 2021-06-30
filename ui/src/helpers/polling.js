
const manageFailedJob = (job) => {
    if (job.result.code === "account-not-accessible-requires-user-action") {
        // error toaster (?): failed to retrieve your ${account} account. 
        // User action is required. 
    } 

    if (job.result.code === "service-unavailable") {

        // let the user know there is a problem fetching data from their bank, 
        // and that you will let them know when their data is ready
        // wait ten minutes, then refresh the connection 
        
    }
}

// account-not-accessible-requires-user-action
// where it occurs
// can occur on any job step: depends where Basiq encounters the error when navigating the user's internet banking
// what it means
// the bank is presenting a popup to the user in their internet banking. Whenever possible Basiq will navigate through these, but for example if the bank presents new T&Cs to the user and offers only options to "Agree" or "Decline", then Basiq will fail the job with this error
// recommended action
// the user should login to their internet banking, navigate to accounts and transactions, and address any popups requiring action from the bank
// you (the API user) can then refresh the connection: once the popup has cleared, the job should complete as normal
// service-unavailable
// where it occurs
// can occur on any job step: depends on where Basiq encounters the error condition on the bank's internet banking portal
// what it means
// the bank is unable to service Basiq's request: typically this is due to a maintenance outage or performance issue on the bank's website, but can occasionally happen if the bank has made significant changes to their internet banking
// recommended action
// handle this as you would if you were logged in to your internet banking and received a response, "We can't do this right now. Please try again later." ... wait a while and try again
// let the user know there is a problem fetching data from their bank, and that you will let them know when their data is ready
// check the status for this bank in the /institutions endpoint: if it is major-outage then the problem is widespread and you should wait until the status has lifted
// if the institution status is anything other than major-outage then wait 10 minutes and try again
// if after a couple of retries the error has not cleared, then report the connection ID to Basiq support
// Best practice
// If you are building your own UI, you should keep your user engaged until the first (verify-credentials) step is complete: it's not a good experience to let the user go and then have to drag them back if the credentials didn't work.

// As soon as the credentials step is complete you should release the user to continue with your onboarding journey while Basiq fetches their accounts and transactions: there is no sense in keeping them hanging around watching a spinning wheel.

// To help manage the user journey, check the institution.stats in the /institutions endpoint for an indication of how long each bank typically takes to complete each job step.

// For the best user experience, have the user connect their banks as early in the onboarding journey as possible. This gives Basiq the best chance of having their transactions ready in time for them finishing the onboarding.