import React, { useState, useContext } from "react";

import { createUser } from '../clients/usersClient';
import userContext from "../context/userContext";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const CreateUserForm = () => {
    const [mobile, setMobile] = useState("+61");
    const [email, setEmail] = useState("");

    const { setUserId } = useContext(userContext);

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser(email, mobile).then( async (result) => {
            let userId = await JSON.parse(result).id
            setUserId(userId)
        })
    }

    return(
        <Form className="form" onSubmit={handleSubmit}>
            <p>Enter your details to get started.</p>
            <Form.Group>
                <Form.Control onChange={((e) => setEmail(e.target.value))} type="email" value={email} placeholder="Enter email"/>
            </Form.Group>

            <Form.Group>
                <Form.Control onChange={((e) => setMobile(e.target.value))} type="phone" value={mobile} placeholder="Phone number"/>
            </Form.Group>

            <Button variant="dark" type="submit">
                Submit
            </Button>
        </Form>
    )
}