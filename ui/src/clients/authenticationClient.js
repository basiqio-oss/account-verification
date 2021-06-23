export async function getClientToken() {
    let response = await fetch('/api/client-token');

    if (response.status === 200) {
        let data = await response.text();
        return data
    }

    return response.data;
}