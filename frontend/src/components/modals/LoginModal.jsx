import InputField from "../form/InputField"

export default function LoginModal() {
    return (
        <form action="">
            <div className="inputs-container">
                <InputField 
                    label='Username/email'
                    type='text'
                    placeholder='Enter your username or email'
                />
                <InputField 
                    label='Password'
                    type='password'
                    placeholder='Enter your password'
                />
            </div>
            <button className="primary-btn form-btn">Log in</button>
        </form>
    )
}