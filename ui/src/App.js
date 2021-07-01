import './App.css';

import React, { useState, useEffect }from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { BasiqConnectModal } from "../src/components/BasiqConnect";
import { UserAccounts } from '../src/components/UserAccounts';
import { Header } from './components/Header';
import { CreateUserForm } from './components/CreateUserForm';
import { refreshToken } from './helpers/helpers';
import UserContext from './context/userContext';

function App() {
  const [userId, setUserId] = useState("");
  const [userAccounts, setUserAccounts] = useState([])
  const [jobsAlreadyReceived, setJobsAlreadyReceived] = useState([])
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () =>  setShow(true);

  const VALUE = { userId, setUserId, userAccounts, setUserAccounts, jobsAlreadyReceived, setJobsAlreadyReceived };
  const THIRTY_MINUTES = 1800000;

  useEffect(() => {
    setInterval(refreshToken, THIRTY_MINUTES)
  })

  return (
    <div className="App">
      <Header />
      <UserContext.Provider value={VALUE}>
        { userId !== "" &&         
        <Button variant="dark" onClick={handleShow}>
            Connect { userAccounts.length !== 0 ? "more" : "your"} accounts
        </Button> }
        { userId === "" && <CreateUserForm />}
        <UserAccounts />
        <Modal show={show} onHide={handleClose}>
            <BasiqConnectModal userId={userId} />
        </Modal>
      </UserContext.Provider>
    </div>
  );
}

export default App;
