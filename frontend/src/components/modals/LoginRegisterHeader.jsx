import styles from './LoginRegisterHeader.module.css'
import { useModal } from '../../hooks/useModal'
import { useRef, useEffect, use } from 'react'

export default function LoginRegisterHeader(props) {
    const { modal, openModal } = useModal()
    const highlighter = useRef(null)
    const activeElement = useRef(null)

    useEffect(() => {
        const hl = highlighter.current
        const aE = activeElement.current
        if (!hl || !aE) return
        
        const setHighlighter = () => {
            hl.style.width = `${aE.offsetWidth}px`    
            hl.style.left = `${aE.offsetLeft}px`    
        }
        setHighlighter()
        window.addEventListener('resize', setHighlighter)
        
        return () => window.removeEventListener('resize', setHighlighter)
    }, [modal.name])

    return (
        <div className={`${styles.modalHeader} ${modal.name === 'login' ? styles.login : styles.register}`}>
            <span
                ref={modal.name === 'login' ? activeElement : null} 
                onClick={() => openModal('login', null, props)}
                >
                Log in
            </span>
            <span 
                onClick={() => openModal('register', null, props)}
                ref={modal.name === 'register' ? activeElement : null} 
            >
                Sign up
            </span>
            <div className={styles.highlighter} ref={highlighter} ></div>
        </div>
    )
}