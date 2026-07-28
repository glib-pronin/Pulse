import styles from './EmailVerificationModal.module.css'
import { useModal } from '../../hooks/useModal'
import { useState, useRef } from 'react'

const OTP_LENGTH = 6

export default function EmailVerificationModal({ from, email }) {
    const { openModal, closeModal } = useModal()
    const [codeErrror, setCodeError] = useState('')
    const [code, setCode] = useState(Array(OTP_LENGTH).fill(''))
    const inputsRef = useRef([])

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return
        if (codeErrror) setCodeError('')

        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        if (value && index < OTP_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus()
        } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
            e.preventDefault()
            inputsRef.current[index + 1]?.focus()       
            inputsRef.current[index + 1]?.select()       
        } else if (e.key === 'ArrowLeft' && index > 0) {
            e.preventDefault()
            inputsRef.current[index - 1]?.focus()
            inputsRef.current[index - 1]?.select()       
        }        
    }

    const handlePaste = (e) => {
        e.preventDefault()        
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
        const newCode = [...code]
        pasted.split('').forEach((char, i) => newCode[i] = char)
        setCode(newCode)
        inputsRef.current[Math.max(pasted.length - 1, 0)]?.focus()        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const codeValue = code.join('')
        if (codeValue.length < OTP_LENGTH) {
            setCodeError('Fill in all fields')
            return
        }
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <h2>Verify Your Email</h2>
            <p 
                className={styles.message}
            >
                {`To verify your account, enter the 6-digit code sent to your email (${email}) below`}
            </p>
            <div className={styles.container} >
                <div className={styles.otpInputs} >
                    {code.map((value, index) => (
                        <input 
                            key={index}
                            ref={(el) => inputsRef.current[index] = el}
                            type="text" 
                            placeholder='__'
                            value={value}
                            maxLength={1}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                        />
                    ))}
                </div>
                {codeErrror && <p className='error-msg'>{codeErrror}</p>}
            </div>
            <div className={styles.btnsContainer} >
                <button 
                    className='primary-btn form-btn'
                >
                    Verify
                </button>
                <span
                    onClick={() => from ? openModal(from) : closeModal()}
                >
                    Back
                </span>
            </div>
        </form>
    )
}