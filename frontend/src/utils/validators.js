export function validateUsername(username) {
    return /^[a-zA-Z][a-zA-Z0-9_.]{4,19}$/.test(username) ? '' : 'Username must start with a letter and contain 5–20 characters. Only letters, numbers, underscores, and periods are allowed'
}

export function validateEmail(email) {
    return /^[a-zA-Z0-9+_%.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? '' : 'Enter correct email'
}

export function validatePassword(password) {
    const requirements = getPasswordRequirements(password)
    const isValid = Object.values(requirements).every(Boolean)
    return isValid ? '' : 'Password must consist of at least 6 symbols, one digit, one uppercase and one lowercase letter, one symbol (_.+@-)'
}

export function validateConfirmPassword(confirmPassword, formData) {
    const password = formData.password
    if (!password.trim()) return ''
    return password === confirmPassword ? '' : 'Password don`t match'
}

export function validateRequired(value) {
    return value.trim() ? '' : 'This field is required'
}

export function getPasswordRequirements(password) {
    return {
        minLength: password.length >= 6,
        digit: /[0-9]/.test(password),
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        special: /[_.+@-]/.test(password)
    }
}