import { createContext, useState } from "react"

export const NotificationContext = createContext(null)

export default function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null)

    const showNotification = ({ icon = null, text = '', url = null, autoHide = true }) => {
        setNotification({ icon, text, url, autoHide })
    }

    const hideNotification = () => {
        setNotification(null)
    }

    return (
        <NotificationContext.Provider
            value={{
                notification,
                showNotification,
                hideNotification
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}