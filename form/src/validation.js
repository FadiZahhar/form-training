export const requiredValidation = value => {
    return {
        isValid: !!value,
        message: 'Field is required'
    }
}

export const minimumLengthValidation = minimum => {
    return value => {
        return {
            isValid: value.length >= minimum,
            message: `Must be at least ${minimum} characters`
        }
    }
}