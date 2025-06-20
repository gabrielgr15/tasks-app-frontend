export const fetcher = async ([url, token] : [string, string | null]) => {
    if (!token) {
        throw new Error('Not authorized')
    }

    const response = await fetch(url, {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const errorInfo = await response.json();
        throw new Error(errorInfo.message || 'An error occurred while fetching the data.');
    }

    return response.json()
}