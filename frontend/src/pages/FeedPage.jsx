import { useModal } from '../hooks/useModal'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function FeedPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { openModal } = useModal()
    const needOpenModal = location.state?.openLogin

    useEffect(() => {
        if (needOpenModal) {
            openModal('login', null, {redirect: location.state.redirect})
            navigate(location.pathname, {replace: true, state: null})
        }
    }, [needOpenModal])

    return (
        <>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        <h2>FeedPage</h2>
        </>
    )
}