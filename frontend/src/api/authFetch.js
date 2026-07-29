import { getAccessToken, setAccessToken } from './token'
import { apiFetch } from './apiFetch'

let logoutHandler = null

export function setLogoutHandler(handler) {
    logoutHandler = handler
}

function setTokenHeaders(headers = {}) {
    const token = getAccessToken()
    const newHeaders = {...headers}
    if (token) newHeaders.Authorization = `Bearer ${token}`
    return newHeaders
}

async function refreshAccessToken() {
    const data = await apiFetch('api/auth/refresh', {
        method: 'POST',
    })
    setAccessToken(data.access)
}

export async function authFetch(url, options = {}) {
    const headers = setTokenHeaders(options.headers)
    try {
        return await apiFetch(url, {...options, headers})
    } catch (error) {
        if (error.status !== 401) throw error
        try {
            await refreshAccessToken()
            const headers = setTokenHeaders(options.headers)
            return await apiFetch(url, {...options, headers})
        } catch(error) {
            await logoutHandler?.()
            throw error
        }
    }
}