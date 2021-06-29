import './App.css';
import React, { useState }from 'react';
import { getClientToken } from "./clients/authenticationClient";
import { CreateUserForm } from './components/CreateUserForm';
import UserIdContext from './context/userContext';
import { BasiqConnectModal } from "../src/components/BasiqConnect";
import { UserAccounts } from '../src/components/UserAccounts';
import { getUserJobs, getJob, getUserAccount } from './clients/usersClient';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function App() {
  const [userId, setUserId] = useState("");
  const value = { userId, setUserId };
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    pollJobs(userId)
  };

  const thirtyMinutes = 1800000;

  const refreshToken = async () => {        
    console.log("refreshingToken")
    let token = await getClientToken();
    let parsedToken = JSON.parse(token)
    sessionStorage.setItem("session_token", parsedToken.access_token)
}

  refreshToken()
  window.setInterval(refreshToken, thirtyMinutes)

  const pollJobs = async () => {
    var jobsArray;
    getUserJobs(userId).then((result) => {
      jobsArray = JSON.parse(result).data;
    }).then(() => {
      if (jobsArray.length !== 0) {
        jobsArray.forEach(job => {
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
          console.log(result)
        })
        return console.log(`jobstatus is ${jobStatus}`);
      } else if (jobStatus === "failed") {
        return console.log(`job has ${jobStatus}`)
      }
      else {
        console.log("job is still pending")
        return pollJob(jobId)
      }
    }
    )
  }

  return (
    <div className="App">
      <div style={{width: '50%', margin: '0 auto'}}>
      <h1>Verify your account</h1>
      <hr />
      <UserIdContext.Provider value={value}>
        <CreateUserForm />
        { userId !== "" ? 
        <>        
        <Button variant="primary" onClick={handleShow}>
            Connect your accounts
        </Button>
        <hr />
        </>
        : null }
        <UserAccounts userId={userId} />
        <Modal show={show} onHide={handleClose}>
            <BasiqConnectModal userId={userId} />
        </Modal>
      </UserIdContext.Provider>
      </div>
    </div>
  );
}

export default App;
