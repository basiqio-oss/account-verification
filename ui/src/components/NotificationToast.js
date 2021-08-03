import { useContext } from 'react'
import Toast from 'react-bootstrap/Toast'
import UserContext from '../context/userContext'

export const NotificationToast = () => {
    const { notify, handleDismiss, notificationMessage } = useContext(UserContext);

    return (
        <Toast 
            style={{position: 'absolute', top: 10, right: 10, zIndex: 9999}} 
            show={notify} 
            onClose={handleDismiss}
            delay={10000} 
            autohide>
            <Toast.Header>
                <strong className="mr-auto">Account Verification</strong>
            </Toast.Header>
            <Toast.Body>{notificationMessage}</Toast.Body>
        </Toast>
    )
}