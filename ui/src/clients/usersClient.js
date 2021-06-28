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