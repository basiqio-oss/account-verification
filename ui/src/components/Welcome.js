import React, { useEffect, useState } from "react";
import { getClientToken } from "../clients/authenticationClient"

export default function Welcome() {
    useEffect(() => {
        getClientToken().then((result) => {
            sessionStorage.setItem("session_token", result)
        })
    }, [])

    return(
        <div>
            <p>your token is {sessionStorage.getItem("session_token")}</p>
        </div>
    )
}