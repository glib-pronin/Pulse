import { useModal } from '../../hooks/useModal'
import { useForm } from '../../hooks/useForm'
import { validateUsername, validateEmail, validatePassword, validateConfirmPassword } from '../../utils/validators'
import InputField from "../form/InputField"
import PasswordChecklist from '../form/PasswordChecklist'

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

export default function RegisterModal() {
    const { openModal, closeModal } = useModal()
    const { formData, errors, handleBlur, handleChange, validateBeforeSubmit } = useForm(initialState, validators)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateBeforeSubmit()) return
        openModal('emailVerify', null, {from: 'register', email: 'test@gmail.com'})
    }

    return (
        <form action="" onSubmit={handleSubmit}>
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
                    helper={<PasswordChecklist password={formData.password} />}
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
            <button className="primary-btn form-btn">Sign up</button>
        </form>
    )
}