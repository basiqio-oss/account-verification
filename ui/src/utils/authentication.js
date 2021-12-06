import { getClientToken } from "../clients/authenticationClient";

const isTokenExpiring = (expiryDate) => {
    var now = Date.now() / 1000
    if ((expiryDate - now) < 600) {
        return true
    }
}

export const getValidToken = () => {   
    let token = JSON.parse(sessionStorage.getItem("session_token"));

    if (sessionStorage.length === 0 || isTokenExpiring(token.valid_to)) {
        getClientToken().then((token) => {
            sessionStorage.setItem("session_token", token)
        })
    }

    return token;
}