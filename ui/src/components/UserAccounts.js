import { useContext } from "react"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import userContext from '../context/userContext';

export const UserAccounts = () => {
    const { userAccounts } = useContext(userContext)
    return(
        <div>
            { userAccounts.length !== 0 ? 
             <div>
             <h2>Your accounts: </h2>
             <br />
             </div>
             : null }
            { userAccounts.length !== 0 ? 
                userAccounts.map((account) => 
                <div key={account.id} style={{width: '50%', margin: '0 auto'}}>
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
        </div>
    )
}