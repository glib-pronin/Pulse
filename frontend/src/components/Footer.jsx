import styles from './Footer.module.css'
import { NAVIGATION } from '../constants/navigations'
import { NavLink } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className={styles.footer} >
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
                    >
                        <Icon />
                    </button>
                )
            )}
        </footer>
    )
}