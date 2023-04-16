import React, { useEffect, useState } from 'react'
import TextField from '../components/ui/TextField'
import validator from '../utils/validator'

const Login = () => {
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const handleLogin = (e) => {
        const field = e.target.name
        const value = e.target.value.trim()
        setState(prevState => ({
            ...prevState,
            [field]: value
        }))
    }

    const validateConfig = {
        email: {
            isRequired: {
                message: 'Поле email не должно быть пустым'
            },
            isEmail: {
                message: 'Некорректно введён email'
            }
        },
        password: {
            isRequired: {
                message: 'Поле password не должно быть пустым'
            },
            isCapitalSymbol: {
                message: 'Должна быть хотя бы 1 заглавная буква'
            },
            isContainDigit: {
                message: 'Должна быть хотя бы 1 цифра'
            },
            min: {
                message: `Длина пароля должна быть больше 8 символов`,
                value: 8
            }
        }
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

    const validate = () => {
        const errors = validator(state, validateConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const { email, password } = state

    return (
        <form onSubmit={submitForm} className="container mt-5 ">
            <div className="row col-md-6 offset-md-3 shadow p-4">
                <h3 className="mb-4">Login</h3>
                <TextField label={'Электронная почта'} name={'email'} value={email} onChange={handleLogin} error={errors.email} />
                <TextField label={'Password'} type={'password'} name={'password'} value={password} onChange={handleLogin} error={errors.password} />
                <button className="btn btn-primary" type="submit" disabled={Boolean(Object.keys(errors).length)}>Войти</button>
            </div>
        </form>)
}

export default Login
