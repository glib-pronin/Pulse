import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
    return (
        <main className={styles.main}>
            <div className={styles.msgContainer}>
                <h2 className={styles.mainText}>Not all who wander are lost, but this page is</h2>
                <span className={styles.secondaryText}>The link's not working or the page is gone. Go back to keep exploring.</span>
                <Link to='/' className='primary-btn'>
                    Back
                </Link>
            </div>      
        </main>
    )
}