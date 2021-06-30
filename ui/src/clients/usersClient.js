export async function createUser(email, phone) {
    let body = JSON.stringify({
        email: email,
        phone: phone
      });

    let response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    });

    if (response.status === 200) {
        let data = await response.text();
        return data
    }
    return response.data;
}

export async function getUserJobs(userId) {
    let response = await fetch(`/api/users/${userId}/jobs`);

    if (response.status === 200) {
        let data = await response.text();
        return data
    }
    return response.data;
}

export async function getUserAccounts(userId) {
    
    let response = await fetch(`/api/users/${userId.userId}/accounts`);

    if (response.status === 200) {
        let data = await response.text();
        return data
    }
    
    return response.data;
}

export async function getUserAccount(url) {
    let body = JSON.stringify({
        url: url
      });

    let response = await fetch(`/api/account`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    });

    if (response.status === 200) {
        let data = await response.text();
        return data
    }
    
    return response.data;
}


export async function getJob(jobId) {
    let response = await fetch(`https://au-api.basiq.io/jobs/${jobId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("session_token")}`
        }
    });
    
    if (response.status === 200) {
        let data = await response.text();
        return data
    }
    
    return response.data;
}

export async function refreshConnection(userId, connectionId) {
    let body = JSON.stringify({
        userId: userId,
        connectionId: connectionId
      });

    let response = await fetch(`/api/refresh-connection`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    });
    
    if (response.status === 200) {
        let data = await response.text();
        return data
    }
    
    return response.data;
}