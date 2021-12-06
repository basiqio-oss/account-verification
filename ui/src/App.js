import './App.css';

import React, { useState }from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import UserContext from './context/userContext';
import Steps from './images/hooli-bank-steps.svg';

import { BasiqConnectModal } from "../src/components/BasiqConnect";
import { UserAccounts } from '../src/components/UserAccounts';
import { Header } from './components/Header';
import { CreateUserForm } from './components/CreateUserForm';
import { NotificationToast } from './components/NotificationToast';

function App() {
  const buttonStyle = { color: "#3920AC", backgroundColor: "#3FF8CF", border: "0px", fontWeight: "bold" };

  const [userId, setUserId] = useState("");
  const [userAccounts, setUserAccounts] = useState([])
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
    setNotificationMessage,
    notificationMessage,
    handleNotify,
    handleDismiss,
    notify
  };

  return (
    <div className="App">
      <Header />
      <UserContext.Provider value={APP_SHARED_STATE}>
        
        { userId !== "" &&         
        <>
          <img className="steps" src={Steps} alt="Static steps graphic" />
          {/* Value exchange below to be improved */}
          <p className="approval">
            For faster approval, please advise us of all financial institutions where you have accounts - including credit cards and loans.
          </p>
          <Button style={buttonStyle} onClick={handleShow}>
              Connect { userAccounts.length !== 0 ? "more" : "your"} accounts
          </Button> 
        </>}
        { userId === "" && <CreateUserForm />}
        <UserAccounts />

        <Modal show={show} onHide={handleClose}>
            <BasiqConnectModal userId={userId} />
        </Modal>
        
        <NotificationToast />
      </UserContext.Provider>
    </div>
  );
}

export default App;
