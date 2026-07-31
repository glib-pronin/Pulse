import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

export default function MyProfileRedirect() {
    const { user } = useAuth()

    return <Navigate to={`/profile/${user.username}`} replace />
}