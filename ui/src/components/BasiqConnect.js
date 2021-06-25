import React, { useEffect } from 'react';
import BasiqConnect from "@basiq/basiq-connect-control";

export function BasiqConnectModal(userId) {
    useEffect(() => {
        BasiqConnect({
            containerId: "basiq-control",
            token: sessionStorage.getItem("session_token"),
            userID: userId.userId, 
            })
    })

    return(
        <div id="basiq-control"></div>
    )
}