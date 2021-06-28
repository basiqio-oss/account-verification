import { useState } from "react"
import { getUserAccounts } from "../clients/usersClient";
import Button from "react-bootstrap/esm/Button";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

export const UserAccounts = (userId) => {
    const [userAccounts, setUserAccounts] = useState()

    const getAccounts = () => {
        getUserAccounts(userId).then((result) => {
            let accountsArray = JSON.parse(result).data;
            let userTransactionAccounts = accountsArray.filter(account => account.class.type === "transaction")
            setUserAccounts(userTransactionAccounts)
        })
    }

    return(
        <div>
            { userAccounts ? 
             <div>
             <h2>Your accounts: </h2>
             <br />
             </div>
             : null }
            { userAccounts ? 
                userAccounts.map((account) => 
                <div style={{width: '50%', margin: '0 auto'}}>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{account.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Product: {account.class.product}</Card.Subtitle>
                        <ListGroup variant="flush">
                            <ListGroup.Item>AC number: {account.accountNo}</ListGroup.Item>
                            <ListGroup.Item>Balance: {account.balance}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                    </Card>
                    <br />
                    </div>
                )
            : 
            null }
            <Button onClick={getAccounts}> Show my connected Accounts </Button>
        </div>
    )
}