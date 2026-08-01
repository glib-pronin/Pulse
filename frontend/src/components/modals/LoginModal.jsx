import { useModal } from '../../hooks/useModal'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'
import { validateRequired } from '../../utils/validators'
import { useNavigate } from 'react-router-dom'
import InputField from "../form/InputField"
import Spinner from '../ui/Spinner'

const initialState = {
    username: '',
    password: ''
}

const validators = {
    username: validateRequired,
    password: validateRequired,
}

export default function LoginModal({ redirect }) {
    const { openModal, closeModal } = useModal()
    const { formData, errors, setError, handleBlur, handleChange, validateBeforeSubmit } = useForm(initialState, validators)
    const { login } = useAuth()
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateBeforeSubmit()) return

        setIsSubmitting(true)
        try {
            await login({...formData})
            closeModal()
            if (redirect) navigate(redirect, {replace: true})
        } catch(error) {
            if (error.data?.code === 'invalid_credentials') {
                setError('formError', error.data.detail)
            } else if (error.data?.code === 'email_not_verified') {
                openModal('emailVerify', null, {from: 'login', email: error.data.email, redirect })
            } else {
                setError('formError', 'Server error. Try again later')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            {errors.formError && <p className='error-msg text-center'>{errors.formError}</p>}
            <div className="inputs-container">
                <InputField 
                    label='Username/email'
                    type='text'
                    placeholder='Enter your username or email'
                    name='username'
                    value={formData.username}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors.username}
                />
                <InputField 
                    label='Password'
                    type='password'
                    placeholder='Enter your password'
                    name='password'
                    value={formData.password}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors.password}
                />
            </div>
            {isSubmitting ? (
                    <Spinner size={50} />
                ) : (
                    <button className="primary-btn form-btn">Log in</button>
                )
            }
        </form>
    )
}