import Toast from 'react-bootstrap/Toast'

export default Notification = (show, onClose, message) => {
    return (
        <Toast show={show} onClose={onClose}>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">Account Verification</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    )
}