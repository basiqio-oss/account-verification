import './App.css';

import React, { useState, useEffect }from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { BasiqConnectModal } from "../src/components/BasiqConnect";
import { UserAccounts } from '../src/components/UserAccounts';
import { Header } from './components/Header';
import { CreateUserForm } from './components/CreateUserForm';
import { refreshToken } from './utils/authentication';
import UserContext from './context/userContext';
import { NotificationToast } from './components/NotificationToast';

function App() {
  const [userId, setUserId] = useState("");
  const [userAccounts, setUserAccounts] = useState([])
  const [jobsAlreadyReceived, setJobsAlreadyReceived] = useState([])
  const [notificationMessage, setNotificationMessage] = useState([])
  const [show, setShow] = useState(false)
  const [notify, setNotify] = useState(false)

  // BasiqConnect
  const handleClose = () => setShow(false);
  const handleShow = () =>  setShow(true);

  // Toast Notifications
  const handleDismiss = () => setNotify(false);
  const handleNotify = (message, delay) =>  {
    setNotificationMessage(message)
    setNotify(true)
  };

  const APP_SHARED_STATE = { 
    userId, 
    setUserId, 
    userAccounts, 
    setUserAccounts, 
    jobsAlreadyReceived, 
    setJobsAlreadyReceived, 
    setNotificationMessage,
    notificationMessage,
    handleNotify,
    handleDismiss,
    notify
  };

  const THIRTY_MINUTES = 1800000;

  const handleNewJob = (event) => {
    console.log("new job");
    console.log("data", event.data)
  }

  refreshToken()
  useEffect(() => {
    window.addEventListener('jobCreated', handleNewJob);
    setInterval(refreshToken, THIRTY_MINUTES)
    
  }, [])

  return (
    <div className="App">
      <Header />
      <UserContext.Provider value={APP_SHARED_STATE}>
        { userId !== "" &&         
        <Button variant="dark" onClick={handleShow}>
            Connect { userAccounts.length !== 0 ? "more" : "your"} accounts
        </Button> }
        { userId === "" && <CreateUserForm />}
        <UserAccounts />

        <Modal 
          show={show} 
          onHide={handleClose}
          >
            <BasiqConnectModal userId={userId} />
        </Modal>
        
        <NotificationToast />
      </UserContext.Provider>
    </div>
  );
}

export default App;
