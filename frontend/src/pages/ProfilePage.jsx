import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProfilePage() {
    const { username } = useParams()
    const { user, logout } = useAuth()
    const isCurrentUser = username === user?.username

    return (
        <>
            <h2>ProfilePage</h2>
            {isCurrentUser && <button className='primary-btn' onClick={logout}>Log out</button>}
        </>
    )
}