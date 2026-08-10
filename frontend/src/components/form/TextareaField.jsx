import styles from './InputField.module.css'

export default function TextareaField({ label, name, value, placeholder, handleChange, handleBlur, error }) {
    return (
        <div className={`${styles.inputContainer} ${error ? styles.error : ''}`} >
            <label htmlFor="">{label}</label>
            <textarea 
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur} 
            ></textarea>
            {error && <p className='error-msg' >{error}</p>}
        </div>
    )
}