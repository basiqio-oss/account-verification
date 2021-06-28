import './App.css';
import React, { useState }from 'react';
import { getClientToken } from "./clients/authenticationClient";
import { CreateUserForm } from './components/CreateUserForm';
import UserIdContext from './context/userContext';
import { BasiqConnectModal } from "../src/components/BasiqConnect";
import { UserAccounts } from '../src/components/UserAccounts';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function App() {
  const [userId, setUserId] = useState("");
  const value = { userId, setUserId };
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const refreshToken = async () => {        
    console.log("refreshingToken")
    let token = await getClientToken();
    let parsedToken = JSON.parse(token)
    sessionStorage.setItem("session_token", parsedToken.access_token)
}

// refreshToken()
  window.setInterval(refreshToken, 1800000)

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
