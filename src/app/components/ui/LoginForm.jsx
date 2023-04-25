import React, { useEffect, useState } from 'react'
import { object, string } from 'yup'
import TextField from '../common/form/TextField'
import CheckBoxField from '../common/form/CheckBoxField'

const LoginForm = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        stayLogged: false
    })

    const [errors, setErrors] = useState({})

    const handleChangeField = (data) => {
        setState((prevState) => ({ ...prevState, ...data }))
    }

    useEffect(() => {
        validate()
    }, [state])

    const submitForm = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log('send', state)
    }

    const loginValidateSchema = object({
        password: string()
            .required('Поле password не должно быть пустым')
            .matches(/^(?=.*[A-Z])/, 'Должна быть хотя бы 1 заглавная буква')
            .matches(/^(?=.*[0-9])/, 'Должна быть хотя бы 1 цифра')
            .matches(
                /^(?=.*[!@#$%^&*])/,
                'Пароль должен содержать хотя бы 1 из специальных символов'
            )
            .matches(
                /^(?=.{8,})/,
                'Длина пароля должна быть не менее 8 символов'
            ),
        email: string()
            .required('Поле email не должно быть пустым')
            .email('Некорректно введён email')
    })

    const validate = () => {
        loginValidateSchema
            .validate(state, { abortEarly: true })
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }))
        return Object.keys(errors).length === 0
    }

    const { email, password, stayLogged } = state

    return (
        <form onSubmit={submitForm}>
            <TextField
                label={'Электронная почта'}
                name={'email'}
                value={email}
                onChange={handleChangeField}
                error={errors.email}
            />
            <TextField
                label={'Password'}
                type={'password'}
                name={'password'}
                value={password}
                onChange={handleChangeField}
                error={errors.password}
            />
            <CheckBoxField
                value={stayLogged}
                label={'Оставаться в системе'}
                name={'stayLogged'}
                onChange={handleChangeField}
            />
            <button
                className="btn btn-primary"
                type="submit"
                disabled={Boolean(Object.keys(errors).length)}
            >
                Войти
            </button>
        </form>
    )
}

export default LoginForm
