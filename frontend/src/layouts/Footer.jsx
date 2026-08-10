import styles from './Footer.module.css'
import { NAVIGATION } from '../constants/navigations'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { useModal } from '../hooks/useModal'

export default function Footer() {
    const [showFooter, setShowFooter] = useState(true)
    const { openModal } = useModal()
    const requireAuth = useRequireAuth()

    useEffect(() => {
        let lastScroll = window.scrollY
        const handleScroll = () => {
            const currentScroll = window.scrollY
            setShowFooter(currentScroll <= lastScroll)
            lastScroll = currentScroll
        }   
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)     
    }, [])

    return (
        <footer className={showFooter ? styles.footer : `${styles.footer} ${styles.hidden}`} >
            {NAVIGATION.filter(link => link.footer).map(({icon: Icon, text, to}) => 
                to ? (
                    <NavLink 
                        key={text}
                        to={to}
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    >
                        <Icon />
                    </NavLink>
                ) : (
                    <button
                        key={text}
                        className={`${styles.link} ${styles.postBtn}`}
                        onClick={() => requireAuth(() => openModal('post', null, {type: 'create'}))}
                    >
                        <Icon />
                    </button>
                )
            )}
        </footer>
    )
}