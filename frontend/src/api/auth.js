import { apiFetch } from './apiFetch'
import { authFetch } from './authFetch'
import { setAccessToken } from './token'

export async function login(username, password) {
    const data =  await apiFetch('api/auth/login', {
        method: 'POST',
        body: {email_or_username: username, password}
    })
    setAccessToken(data.access)
}

export async function register(username, email, password, confirmPassword) {
    return apiFetch('api/auth/register', {
        method: 'POST',
        body: {username, email, password, confirm_password: confirmPassword}
    })
}

export async function verifyEmail(email, code) {
    return apiFetch('api/auth/verify-email', {
        method: 'POST',
        body: {email, code}
    })
}

export async function logout() {
    return apiFetch('api/auth/logout',{
        method: 'POST'
    })
}

export async function me() {
    return authFetch('api/auth/me')
}