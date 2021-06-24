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