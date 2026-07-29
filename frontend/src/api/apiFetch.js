import { ApiError } from './ApiError'

const BASE_URL = import.meta.env.VITE_API_URL

export async function apiFetch(url, options = {}) {
    const headers = {...options.headers}
    let body = options.body

    if (body && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify(body)
    }

    const res = await fetch(`${BASE_URL}${url}`, {
        method: options.method ?? 'GET',
        headers,
        body,
        credentials: 'include'
    })

    const data = res.status === 204 ? null : await res.json()
    if (!res.ok) {
        throw new ApiError(
            data.message ?? 'Request failed',
            res.status, data
        )
    }

    return data
}

