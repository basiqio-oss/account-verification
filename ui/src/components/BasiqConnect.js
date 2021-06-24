import React, { useEffect } from 'react';
import BasiqConnect from "@basiq/basiq-connect-control";

export function BasiqConnectModal(userId) {
    useEffect(() => {
        BasiqConnect({
            containerId: "basiq-control",
            token: sessionStorage.getItem("session_token"),
            userID: "728e1c6c-d46f-40bb-8b70-08e72cb9aaf0", 
            })
    })

    return(
        <div id="basiq-control"></div>
    )
}