import { useModal } from '../../hooks/useModal'
import { useForm } from '../../hooks/useForm'
import { validateRequired } from '../../utils/validators'
import InputField from "../form/InputField"

const initialState = {
    username: '',
    password: ''
}

const validators = {
    username: validateRequired,
    password: validateRequired,
}

export default function LoginModal() {
    const { openModal, closeModal } = useModal()
    const { formData, errors, handleBlur, handleChange, validateBeforeSubmit } = useForm(initialState, validators)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateBeforeSubmit()) return
        openModal('emailVerify', null, {from: 'login', email: 'test@gmail.com'})
    }

    return (
        <form action="" onSubmit={handleSubmit}>
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
            <button className="primary-btn form-btn">Log in</button>
        </form>
    )
}