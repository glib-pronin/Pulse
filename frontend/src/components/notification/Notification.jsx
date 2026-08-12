import { useEffect, useState } from "react"
import { useNotification } from '../../hooks/useNotification'
import { Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Spinner from '../ui/Spinner'
import styles from './Notification.module.css'

const ICONS = {
    loading: Spinner,
    success: Check,
    error: X
}

const NOTIFICATION_DURATION = 3000
const ANIMATION_DURATION = 250

export default function Notification() {
    const [isVisible, setIsVisible] = useState(true)
    const { notification, hideNotification } = useNotification()  

    useEffect(() => {
        if (!notification) return

        setIsVisible(true) // reset state


        if (!notification.autoHide) return

        const hideTimer = setTimeout(() => {
            setIsVisible(false)
        }, NOTIFICATION_DURATION)

        const removeTimer = setTimeout(() => {
            hideNotification()
        }, NOTIFICATION_DURATION + ANIMATION_DURATION)

        return () => {
            clearTimeout(hideTimer)
            clearTimeout(removeTimer)
        }
    }, [notification])

    const Icon = ICONS[notification?.icon]

    let classes = styles.notification
    if (!notification?.icon) classes += ' ' + styles.onlyText
    if (!isVisible) classes += ' ' + styles.hide

    return (
        <>
            {notification && (
                <div className={classes} >
                    <div className={styles.content} >
                        {Icon && <Icon size={20} />}
                        <span>{notification.text}</span>
                    </div>
                    {notification.url && (
                        <Link to={notification.url}>
                            View
                        </Link>
                    )}
                </div>
            )}
        </>
    )
}