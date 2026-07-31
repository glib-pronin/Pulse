import { getPasswordRequirements } from '../../utils/validators'
import styles from './PasswordChecklist.module.css'

const validation_state = {
    true: {
        style: styles.success,
        icon: '✓'
    },
    false: {
        style: styles.error,
        icon: '✗'  
    }
}

export default function PasswordChecklist({ password, error }) {
    const requirements = getPasswordRequirements(password)

    if (!password && !error) return null
    if (Object.values(requirements).every(Boolean)) return null

    return (
        <div className={styles.checklist} >
            <p 
                className={validation_state[requirements.minLength].style}
            >
                {validation_state[requirements.minLength].icon} at least 6 symbols
            </p>
            <p 
                className={validation_state[requirements.digit].style}
            >
                {validation_state[requirements.digit].icon} at least 1 digit
            </p>
            <p 
                className={validation_state[requirements.lowercase].style}
            >
                {validation_state[requirements.lowercase].icon} at least 1 lowercase letter
            </p>
            <p 
                className={validation_state[requirements.uppercase].style}
            >
                {validation_state[requirements.uppercase].icon} at least 1 uppercase letter
            </p>
            <p 
                className={validation_state[requirements.special].style}
            >
                {validation_state[requirements.special].icon} at least 1 symbol (_.+@-)
            </p>
        </div>
    )
}
