import React, { useState } from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { createUser } from '../clients/usersClient';
import { BasiqConnectModal } from "./BasiqConnect";

export const CreateUserForm = () => {
    const [userId, setUserId] = useState("799b55cb-a6a8-44c4-9437-4617dd23dd73");
    const [mobile, setMobile] = useState("+614xxxxxxxx");
    const [email, setEmail] = useState("max@hooli.com");
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser(email, mobile).then((result) => {
            setUserId(JSON.parse(result).id)
        })
    }

    const getAccessToken = () => {
        return sessionStorage.getItem("session_token")
    }

    return(
        <div>
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
            <hr />
            {userId ? 
                <Button variant="primary" onClick={handleShow}>
                    Add your banks
                </Button>
                : null }
            <Modal show={show} onHide={handleClose}>
                <BasiqConnectModal userId={userId} />
            </Modal>
        </div>
    )

}