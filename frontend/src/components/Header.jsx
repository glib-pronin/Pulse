import { useLocation, Link } from 'react-router-dom'
import styles from './Header.module.css'
import LogoIcon from '../assets/logo_big.svg?react'

const PAGE_TITLES = {
    '/': 'Feed',
    '/following': 'Following',
    '/search': 'Search',
}

export default function Header() {
    const { pathname } = useLocation()
    let headerTitle = PAGE_TITLES[pathname] || pathname.split('/')[2]
    
    return (
        <header className={styles.header}>
            <Link to='/'>
                <LogoIcon className={styles.logo} />
            </Link>
            <h1>{headerTitle}</h1>
        </header>
    )
}