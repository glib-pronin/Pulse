import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
    return (
        <div>
            <h2>Not all who wander are lost, but this page is</h2>
            <span>The link's not working or the page is gone. Go back to keep exploring.</span>
            <Link>
                Back
            </Link>
        </div>      
    )
}