import { useLocation, Link } from 'react-router-dom'
import { SunMoon, Search } from 'lucide-react'
import styles from './Header.module.css'
import LogoIcon from '../assets/logo_big.svg?react'

const PAGE_TITLES = {
    '/': 'Feed',
    '/following': 'Following',
    '/search': 'Search',
}

export default function Header() {
    const user = null
    const { pathname } = useLocation()
    let headerTitle = PAGE_TITLES[pathname] || pathname.split('/')[2]
    
    return (
        <header className={styles.header}>
            <SunMoon className={styles.icon}/>
            <Link to='/' className={`${styles.logo} ${styles.center}`} >
                <LogoIcon />
            </Link>
            <h1 className={styles.center} >{headerTitle}</h1>
            {user ? (
                    <Search className={styles.icon}/>
                ) : (
                    <button className='primary-btn'>
                        Log in
                    </button>
                )
            }
        </header>
    )
}