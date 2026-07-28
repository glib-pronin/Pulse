import { useState } from "react"

export function useForm(initialState, validators = {}) {
    const [formData, setFormData] = useState(initialState)
    const [errors, setErrors] = useState({})

    const deleteError = (name) => {
        setErrors(prev => {
            const { [name]: _, ...rest } = prev
            return rest
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (errors[name]) deleteError(name)
        }
    
    const handleBlur = (e) => {
        const { name, value } = e.target
        const validator = validators[name]
        if (!validator) return

        const error = validator(value, formData)
        if (!error) deleteError(name)
        else setErrors(prev => ({...prev, [name]: error}))
    }

    const validateBeforeSubmit = () => {
        const newErrors = {}
        Object.entries(validators).forEach(([key, validator]) => {
            const error = validator(formData[key], formData)
            if (error) newErrors[key] = error
        })
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    return {
        formData, errors,
        handleBlur, handleChange,
        validateBeforeSubmit
    }
}