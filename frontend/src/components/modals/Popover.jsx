import styles from './Popover.module.css'
import { useEffect, useRef, useState, useLayoutEffect } from 'react'

const OFFSET = 8

export default function Popover({anchorElement, closeModal, children}) {
    const popoverRef = useRef(null)
    const [position, setPosition] = useState({top: 0, left: 0})

    useLayoutEffect(() => {
        if (!anchorElement || !popoverRef.current) return
        const anchorRect = anchorElement.getBoundingClientRect()
        const popoverRect = popoverRef.current.getBoundingClientRect()
        
        let top = anchorRect.bottom + OFFSET
        let left = anchorRect.left

        if (top + popoverRect.height > window.innerHeight) {
            top = anchorRect.top - popoverRect.height - OFFSET
        }

        if (left + popoverRect.width > window.innerWidth) {
            left = window.innerWidth - popoverRect.width - OFFSET
        }
        setPosition({top, left})
        
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            console.log('///');
            
            if (popoverRef.current && !popoverRef.current.contains(e.target)){
                closeModal()
            }
        }
        document.addEventListener('click', handleClickOutside, true)
        return () => document.removeEventListener('click', handleClickOutside, true)
    }, [])

    useEffect(() => {
        const handleResize = () => closeModal()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div 
            ref={popoverRef} 
            className={styles.popover}
            style={position}
        >
            {children}
        </div>
    )
}