import { useState, useEffect } from "react"
import { Sun, Moon } from 'lucide-react'
import styles from './ThemePopover.module.css'

export default function ThemePopover() {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme'))

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <>
            <span>Appearance</span>
            <div 
                className={`${styles.switchContainer} ${theme === 'dark' ? styles.dark : styles.light }`} 
            >
                <div 
                    className={styles.switchMode} 
                    onClick={() => setTheme('light')}
                >
                    <Sun />
                </div>
                <div 
                    className={styles.switchMode} 
                    onClick={() => setTheme('dark')}
                >
                    <Moon />
                </div>
            </div>
        </>
    )
}