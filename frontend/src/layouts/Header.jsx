import { useLocation, Link } from 'react-router-dom'
import { SunMoon, Search } from 'lucide-react'
import { useModal } from '../hooks/useModal'
import { useAuth } from '../hooks/useAuth'
import { useRef } from 'react'
import styles from './Header.module.css'
import LogoIcon from '../assets/logo_big.svg?react'
import Skeleton from '../components/ui/Skeleton'

const PAGE_TITLES = {
    '/': 'Feed',
    '/following': 'Following',
    '/search': 'Search',
}

export default function Header() {
    const { openModal } = useModal()
    const { pathname } = useLocation()
    const anchorRef = useRef(null)
    const { user, isLoading } = useAuth()
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
            {isLoading ? (
                    <Skeleton width={60} height={32} borderRadius={10} />
                ) : ( 
                    user ? (
                        <Link to='/search'>
                            <Search className={styles.icon}/>
                        </Link>
                    ) : (
                        <button 
                            className='primary-btn login-btn'
                            onClick={() => openModal('login')}
                        >
                            Log in
                        </button>
                    )
                )
            }
            <div className={styles.border}></div>
        </header>
    )
}