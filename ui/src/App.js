import './App.css';
import React, { useState }from 'react';
import { getClientToken } from "./clients/authenticationClient";
import { CreateUserForm } from './components/CreateUserForm';
import userContext from './context/userContext';
import { BasiqConnectModal } from "../src/components/BasiqConnect";
import { UserAccounts } from '../src/components/UserAccounts';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function App() {
  const [userId, setUserId] = useState("");
  const [userAccounts, setUserAccounts] = useState([])
  const [jobsAlreadyReceived, setJobsAlreadyReceived] = useState([])
  const value = { userId, setUserId, userAccounts, setUserAccounts, jobsAlreadyReceived, setJobsAlreadyReceived };
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () =>  setShow(true);

  const thirtyMinutes = 1800000;

  const refreshToken = async () => {        
    console.log("refreshingToken")
    let token = await getClientToken();
    let parsedToken = JSON.parse(token)
    sessionStorage.setItem("session_token", parsedToken.access_token)
}

  // refreshToken()
  window.setInterval(refreshToken, thirtyMinutes)


  return (
    <div className="App">
      <div style={{width: '50%', margin: '0 auto'}}>
      <h1>Verify your account</h1>
      <hr />
      <userContext.Provider value={value}>
        <CreateUserForm />
        { userId !== "" ? 
        <>        
        <Button variant="primary" onClick={handleShow}>
            Connect your accounts
        </Button>
        <hr />
        </>
        : null }
        <Modal show={show} onHide={handleClose}>
            <BasiqConnectModal userId={userId} />
        </Modal>
        <UserAccounts />
      </userContext.Provider>
      </div>
    </div>
  );
}

export default App;
