import styles from './Sidebar.module.css'
import LogoIcon from '../assets/logo_icon.svg?react'
import LogoIconBig from '../assets/logo_big.svg?react'
import { NavLink, Link } from 'react-router-dom'
import { Home, Heart, Search, Plus, UserRound, SunMoon  } from 'lucide-react'

const SIDEBAR_LINKS = [
    {
        icon: Home,
        text: 'Feed',
        to: '/',
    },
    {
        icon: Heart,
        text: 'Following',
        to: '/following',
    },
    {
        icon: Plus,
        text: 'New post',
        type: 'button'
    },
    {
        icon: Search,
        text: 'Search',
        to: '/search',
    },
    {
        icon: UserRound,
        text: 'Profile',
        to: '/profile/test',
    },
    {
        icon: SunMoon,
        text: 'Appearance',
    },
]

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Link to='/' className={styles.logoSmall}>
                <LogoIcon />
            </Link>
            <Link to='/' className={styles.logoBig}>
                <LogoIconBig />
            </Link>
            <div className={styles.linksContainer}>
                {SIDEBAR_LINKS.map(({ icon: Icon, text, to }) => 
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
                            className={styles.link}
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