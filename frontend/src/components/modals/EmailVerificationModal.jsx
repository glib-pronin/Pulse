import { useModal } from '../../hooks/useModal'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import styles from './EmailVerificationModal.module.css'
import Spinner from '../ui/Spinner'

const OTP_LENGTH = 6

export default function EmailVerificationModal({ from, email, redirect }) {
    const { openModal, closeModal } = useModal()
    const { verifyEmail } = useAuth()
    const [codeError, setCodeError] = useState('')
    const [serverError, setServerError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [code, setCode] = useState(Array(OTP_LENGTH).fill(''))
    const inputsRef = useRef([])
    const navigate = useNavigate()

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return
        if (codeError) setCodeError('')
        if (serverError) setServerError('')

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const codeValue = code.join('')
        if (codeValue.length < OTP_LENGTH) {
            setCodeError('Fill in all fields')
            return
        }

        setIsSubmitting(true)
        try {
            await verifyEmail({ email, code: codeValue })
            closeModal()
            if (redirect) navigate(redirect, {replace: true})
        } catch(error) {
            if (error.data?.code === 'Wrong or expired code') {
                setCodeError(error.data.code)
            } else {
                setServerError('Server error. Try again later')
            }
        } finally {
            setIsSubmitting(false)
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
            {serverError && <p className='error-msg text-center'>{serverError}</p>}
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
                {codeError && <p className='error-msg'>{codeError}</p>}
            </div>
            {isSubmitting ? (
                    <Spinner size={50} />
                ) : (
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
                )
            }
        </form>
    )
}