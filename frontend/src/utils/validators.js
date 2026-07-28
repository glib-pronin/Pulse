export function validateUsername(username) {
    return /^[a-zA-Z][a-zA-Z0-9_.]{4,19}$/.test(username) ? '' : 'Username must start with a letter and contain 5–20 characters. Only letters, numbers, underscores, and periods are allowed'
}

export function validateEmail(email) {
    return /^[a-zA-Z0-9+_%.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? '' : 'Enter correct email'
}

export function validatePassword(password) {
    if (password.length < 6) return 'Password must consist of at least 6 symbols'
    if (!/[0-9]/.test(password)) return 'Password must consist of at least one digit'
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) return 'Password must consist of at least one uppercase and one lowercase letter' 
    if (!/[_.+@-]/.test(password)) return 'Password must consist of at least 1 symbol (_.+@-)'
    return ''
}

export function validateConfirmPassword(confirmPassword, formData) {
    const password = formData.password
    if (!password.trim()) return ''
    return password === confirmPassword ? '' : 'Password don`t match'
}

export function validateRequired(value) {
    return value.trim() ? '' : 'This field is required'
}