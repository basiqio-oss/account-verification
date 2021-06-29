import React, { useState, useContext } from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { createUser } from '../clients/usersClient';
import UserIdContext from "../context/userContext";

export const CreateUserForm = () => {
    const [mobile, setMobile] = useState("+614xxxxxxxx");
    const [email, setEmail] = useState("max@hooli.com");

    const {setUserId } = useContext(UserIdContext);

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
            <hr />
        </Form>
        </div>
    )

}