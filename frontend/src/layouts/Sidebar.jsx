import styles from './Sidebar.module.css'
import LogoIcon from '../assets/logo_icon.svg?react'
import LogoIconBig from '../assets/logo_big.svg?react'
import { NavLink, Link } from 'react-router-dom'
import { NAVIGATION } from '../constants/navigations'
import { useModal } from '../hooks/useModal'
import { useRef } from 'react'
import { useRequireAuth } from '../hooks/useRequireAuth'

export default function Sidebar() {
    const { openModal } = useModal()
    const anchorRef = useRef(null)
    const requireAuth = useRequireAuth()

    return (
        <div className={styles.sidebar}>
            <Link to='/' className={styles.logoSmall}>
                <LogoIcon />
            </Link>
            <Link to='/' className={styles.logoBig}>
                <LogoIconBig />
            </Link>
            <div className={styles.linksContainer}>
                {NAVIGATION.map(({ icon: Icon, text, to, use }) => 
                    to ? (
                        <NavLink
                            key={text}
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                            to={to}
                        >
                            <Icon className={styles.icon} />
                            <span className={styles.hoverShow} >{text}</span>
                        </NavLink>
                    ) : (
                        <button
                            key={text}
                            ref={use === 'theme' ? anchorRef : null}
                            className={styles.link}
                            onClick={use === 'theme' ? (
                                () => openModal('theme', anchorRef.current)
                            ) : (
                                () => requireAuth(() => openModal('post', null, {type: 'create'}))
                            )}
                        >
                            <Icon className={styles.icon} />
                            <span className={styles.hoverShow} >{text}</span>
                        </button>
                    )
                )}
            </div>
        </div>
    )
}