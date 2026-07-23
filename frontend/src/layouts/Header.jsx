import { useLocation, Link } from 'react-router-dom'
import { SunMoon, Search } from 'lucide-react'
import { useModal } from '../hooks/useModal'
import { useRef } from 'react'
import styles from './Header.module.css'
import LogoIcon from '../assets/logo_big.svg?react'

const PAGE_TITLES = {
    '/': 'Feed',
    '/following': 'Following',
    '/search': 'Search',
}

export default function Header() {
    const { openModal } = useModal()
    const { pathname } = useLocation()
    const anchorRef = useRef(null)
    const user = null
    let headerTitle = PAGE_TITLES[pathname] || pathname.split('/')[2]
    
    return (
        <header className={styles.header}>
            <SunMoon 
                ref={anchorRef}
                className={styles.icon}
                onClick={() => openModal('theme', anchorRef.current)}
            />
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
            <div className={styles.border}></div>
        </header>
    )
}