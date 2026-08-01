import { createContext, useState, useEffect } from "react"
import { setLogoutHandler } from "../api/authFetch"
import { clearAccessToken } from "../api/token"
import * as authApi from '../api/auth'

export const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setLogoutHandler(logout)
        return () => setLogoutHandler(null)
    }, [])

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        try {
            const data = await authApi.me()
            setUser(data)
        } catch(error) {
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    const login = async ({ username, password }) => {
        await authApi.login({ username, password })
        await loadUser()
    }

    const verifyEmail = async ({ email, code }) => {
        await authApi.verifyEmail({ email, code })
        await loadUser()
    }

    const logout = async () => {
        try {
            await authApi.logout()
        } finally {
            clearAccessToken()
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user, isLoading,
                login, logout, verifyEmail
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}