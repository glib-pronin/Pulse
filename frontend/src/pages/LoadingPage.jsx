import styles from './LoadingPage.module.css'
import Spinner from '../components/ui/Spinner'

export default function LoadingPage() {
    return (
        <div className={styles.wrapper} >
            <Spinner size={60} />
        </div>
    )
}