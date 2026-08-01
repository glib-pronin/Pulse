import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useAuth } from '../hooks/useAuth'
import LoadingPage from '../pages/LoadingPage'

export default function ProtectedRoute() {
    const { isLoading, user } = useAuth()
    const { pathname }  = useLocation()

    if (isLoading) {
        return <LoadingPage />
    } 

    if (!user) {
        return <Navigate to='/' replace state={{redirect: pathname, openLogin: true}} />
    }

    return <Outlet />
}