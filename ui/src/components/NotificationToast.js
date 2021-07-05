import { useContext } from 'react'
import Toast from 'react-bootstrap/Toast'
import UserContext from '../context/userContext'

export default Notification = () => {
    const { notify, handleDismiss, notificationMessage } = useContext(UserContext);

    return (
        <Toast style={{position: 'absolute', top: 10, right: 10, zIndex: 9999}} show={notify} onClose={handleDismiss}>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">Account Verification</strong>
            </Toast.Header>
            <Toast.Body>{notificationMessage}</Toast.Body>
        </Toast>
    )
}