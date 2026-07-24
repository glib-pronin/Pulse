import styles from './Sidebar.module.css'
import LogoIcon from '../assets/logo_icon.svg?react'
import LogoIconBig from '../assets/logo_big.svg?react'
import { NavLink, Link } from 'react-router-dom'
import { NAVIGATION } from '../constants/navigations'
import { useModal } from '../hooks/useModal'
import { useRef } from 'react'

export default function Sidebar() {
    const { openModal } = useModal()
    const anchorRef = useRef(null)

    return (
        <div className={styles.sidebar}>
            <Link to='/' className={styles.logoSmall}>
                <LogoIcon />
            </Link>
            <Link to='/' className={styles.logoBig}>
                <LogoIconBig />
            </Link>
            <div className={styles.linksContainer}>
                {NAVIGATION.map(({ icon: Icon, text, to, clickable }) => 
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
                            ref={clickable ? anchorRef : null}
                            className={styles.link}
                            onClick={clickable ? () => openModal('theme', anchorRef.current) : null}
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