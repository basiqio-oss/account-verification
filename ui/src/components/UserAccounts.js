import { useContext } from "react"
import UserContext from '../context/userContext';

export const UserAccounts = () => {

    const { userAccounts } = useContext(UserContext)

    return(
        <div className="accounts">
            { userAccounts.length !== 0 && 
                userAccounts.map((account) => 
                <div className="account" key={account.id}>
                    <h6 className="account-name">{account.name}</h6>
                    <p>{account.product}: ${account.balance}</p>
                    <p>AC number: {account.accountNumber}</p>
                </div>
                )
            }
        </div>
    )
}