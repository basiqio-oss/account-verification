import { getClientToken } from "../clients/authenticationClient";

export const refreshToken = async () => {        
    let token = await getClientToken();
    let parsedToken = JSON.parse(token)
    sessionStorage.setItem("session_token", parsedToken.access_token)
}