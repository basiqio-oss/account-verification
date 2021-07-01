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

export async function getAllUserJobs(userId) {
    let response = await fetch(`/api/users/${userId}/jobs`);

    if (response.status === 200) {
        let data = await response.text();
        return data
    }
    return response.data;
}
