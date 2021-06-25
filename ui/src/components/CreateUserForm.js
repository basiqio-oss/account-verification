import React, { useState } from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { createUser } from '../clients/usersClient';
import { BasiqConnectModal } from "./BasiqConnect";
import { UserAccounts } from './UserAccounts';

export const CreateUserForm = () => {
    const [userId, setUserId] = useState();
    const [mobile, setMobile] = useState("+614xxxxxxxx");
    const [email, setEmail] = useState("max@hooli.com");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser(email, mobile).then( async (result) => {
            let userId = await JSON.parse(result).id
            setUserId(userId)
            console.log(userId)
        })
    }

    return(
        <div>
            { userId ? null : <div>
                <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="email">Email address</Form.Label>
                    <Form.Control onChange={((e) => setEmail(e.target.value))} type="email" value={email} placeholder="Enter email"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="mobile">Phone Number</Form.Label>
                    <Form.Control onChange={((e) => setMobile(e.target.value))} type="phone" value={mobile} placeholder="Phone number"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div> }
            <hr />
            <UserAccounts userId={userId} />
            {userId ? 
                <div>
                    <Button variant="primary" onClick={handleShow}>
                        Connect your accounts
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <BasiqConnectModal userId={userId} />
                    </Modal>
                </div>
                : null }
        </div>
    )

}