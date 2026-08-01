import { validateUsername, validateEmail, validatePassword, validateConfirmPassword } from '../../utils/validators'
import { useModal } from '../../hooks/useModal'
import { useForm } from '../../hooks/useForm'
import { register } from '../../api/auth'
import { useState } from 'react'
import PasswordChecklist from '../form/PasswordChecklist'
import InputField from "../form/InputField"
import Spinner from '../ui/Spinner'

const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const validators = {
    username: validateUsername,
    email: validateEmail,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
}

const dependencies = {
    password: ['confirmPassword']
}

export default function RegisterModal({ redirect }) {
    const { openModal, closeModal } = useModal()
    const { formData, errors, handleBlur, handleChange, validateBeforeSubmit, setError } = useForm(initialState, validators, dependencies)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateBeforeSubmit()) return

        setIsSubmitting(true)
        try {
            await register({...formData})
            openModal('emailVerify', null, {from: 'register', email: formData.email, redirect})
        } catch(error) {
            if (error.status === 400) {
                Object.entries(error.data).forEach(([name, value]) => setError(name, value[0]))
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
                    label='Username'
                    type='text'
                    placeholder='Enter your username'
                    name='username'
                    value={formData.username}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors.username}
                />
                <InputField 
                    label='Email'
                    type='email'
                    placeholder='Enter your email'
                    name='email'
                    value={formData.email}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors.email}
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
                    helper={<PasswordChecklist password={formData.password} error={errors.password} />}
                />
                <InputField 
                    label='Confirm password'
                    type='password'
                    placeholder='Confirm your password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors.confirmPassword}
                />
            </div>
            {isSubmitting ? (
                    <Spinner size={50} />
                ) : (
                    <button className="primary-btn form-btn">Sign up</button>
                )
            }
        </form>
    )
}