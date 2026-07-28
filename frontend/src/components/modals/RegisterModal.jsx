import InputField from "../form/InputField"

export default function RegisterModal() {
    return (
        <form action="">
            <div className="inputs-container">
                <InputField 
                    label='Username'
                    type='text'
                    placeholder='Enter your username'
                />
                <InputField 
                    label='Email'
                    type='email'
                    placeholder='Enter your email'
                />
                <InputField 
                    label='Password'
                    type='password'
                    placeholder='Enter your password'
                />
                <InputField 
                    label='Confirm password'
                    type='password'
                    placeholder='Confirm your password'
                />
            </div>
            <button className="primary-btn form-btn">Sign up</button>
        </form>
    )
}