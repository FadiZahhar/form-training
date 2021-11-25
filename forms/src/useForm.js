import { useState } from 'react';

const useForm = FIELDS => {
    const [fields, setFields] = useState(FIELDS)

    const handleChange = event => {
        const { name, value } = event.target

        let newFields = { ...fields }

        newFields[name].value = value
        newFields[name].touched = true

        newFields = setValidationErrors(newFields)

        setFields(newFields)
    }

    // Run Validation Check.. 
    const setValidationErrors = fields => {

        Object.keys(fields).forEach(field => {
            fields[field].errors = errorsForField(field)
        })
        return fields;
    }
    const errorsForField = field => {
        return fields[field].validations.map(validation => {
            const { isValid, message } = validation(fields[field].value)
            return isValid ? '' : message;
        })
            .filter(value => value.length > 0)
    }
    const formHandler = event => {
        event.preventDefault();

        console.log(fields)

    }
    return {
        fields,
        handleChange,
        formHandler
    }
}

export default useForm;