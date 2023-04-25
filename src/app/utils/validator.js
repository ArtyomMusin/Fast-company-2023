export default function validator(data, config) {
    const errors = {}
    const validate = (dataField, method, config) => {
        let isNotValid
        switch (method) {
            case 'isRequired':
                if (typeof dataField === 'boolean') {
                    isNotValid = !dataField
                    break
                }
                if (typeof dataField !== 'object') {
                    isNotValid = !dataField.trim()
                } else {
                    isNotValid = !Object.keys(dataField).length
                }
                break
            case 'isEmail': {
                const emailRegExp = /^\S+@\S+\.\S+$/g
                isNotValid = !emailRegExp.test(dataField)
                break
            }
            case 'isCapitalSymbol': {
                const capitalRegExp = /[A-Z]+/g
                isNotValid = !capitalRegExp.test(dataField)
                break
            }
            case 'isContainDigit': {
                const digitRegExp = /\d+/g
                isNotValid = !digitRegExp.test(dataField)
                break
            }
            case 'min': {
                isNotValid = dataField.length < config.value
                break
            }
            default:
                break
        }
        if (isNotValid) {
            return config.message
        }
    }
    for (const field in data) {
        for (const validateMethod in config[field]) {
            const error = validate(
                data[field],
                validateMethod,
                config[field][validateMethod]
            )
            if (error && !errors[field]) {
                errors[field] = error
            }
        }
    }
    return errors
}
