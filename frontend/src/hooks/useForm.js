import { SERVER_ERRORS } from '../constants/serverErrors'
import { useState } from "react"

export function useForm(initialState, validators = {}, dependencies = {}) {
    const [formData, setFormData] = useState(initialState)
    const [errors, setErrors] = useState({})

    const deleteError = (name) => {
        setErrors(prev => {
            const { [name]: _, ...rest } = prev
            return rest
        })
    }

    const setError = (name, error) => {
        setErrors(prev => ({
            ...prev,
            [name]: SERVER_ERRORS[error] ?? error
        }))
    }

    const validate = (name, value, fD = formData) => {
        const validator = validators[name]
        if (!validator) return

        const error = validator(value, fD)
        if (!error) deleteError(name)
        else setError(name, error)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        const newFormData = {
            ...formData,
            [name]: value
        }
        setFormData(newFormData)

        if (errors[name]) deleteError(name)
        if (errors.formError) deleteError('formError')
        
        dependencies[name]?.forEach(field => {
            if (newFormData[field]) {
                validate(field, newFormData[field], newFormData)
            }
        })
    }
    
    const handleBlur = (e) => {
        const { name, value } = e.target
        validate(name, value)
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
        formData, setFormData, 
        errors, setError,
        handleBlur, handleChange,
        validateBeforeSubmit
    }
}