import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import styles from './InputField.module.css'

export default function InputField({ label, type, name, value, placeholder, handleChange, handleBlur, error }) {
    const [isShownPassword, setIsShownPassword] = useState(false)
    return (
        <div className={styles.inputContainer} >
            <label htmlFor="">{label}</label>
            <input 
                className={type === 'password' ? styles.password : ''}
                type={type === 'password' ? (isShownPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur} 
            />
            { type === 'password' && (isShownPassword ? (
                    <Eye className={styles.passwordEye} onClick={() => setIsShownPassword(false)} />
                ) : (
                    <EyeOff className={styles.passwordEye} onClick={() => setIsShownPassword(true)} />
                )) 
            }
            { error && <p className='error-msg' >{error}</p> }
        </div>
    )
}