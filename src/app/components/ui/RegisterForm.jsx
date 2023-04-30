import React, { useEffect, useState } from 'react'
import MultiSelect from '../common/form/MultiSelect'
import validator from '../../utils/validator'
import TextField from '../common/form/TextField'
import Select from '../common/form/Select'
import RadioField from '../common/form/RadioField'
import api from '../../api'
import transformData from '../../utils/transformDataForSelect'
import CheckBoxField from '../common/form/CheckBoxField'

const RegisterForm = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        profession: {},
        sex: '',
        qualities: [],
        license: false
    })

    const [professions, setProfessions] = useState({})
    const [allQualities, setAllQualities] = useState({})

    useEffect(() => {
        getProfessions()
    }, [])

    const getProfessions = () => {
        api.professions.fetchAll().then((res) => setProfessions(res))
        api.qualities.fetchAll().then((res) => setAllQualities(res))
    }

    const [errors, setErrors] = useState({})

    const handleChangeField = (data) => {
        setState((prevState) => ({ ...prevState, ...data }))
    }

    const sexData = [
        { _id: 1, label: 'Мужской', value: 'male' },
        { _id: 2, label: 'Женский', value: 'female' },
        { _id: 3, label: 'Другое', value: 'other' }
    ]

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
                message: `Длина пароля должна быть не менее 8 символов`,
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: 'Выберите профессию'
            }
        },
        sex: {
            isRequired: {
                message: 'Укажите Ваш пол'
            }
        },
        qualities: {
            isRequired: {
                message: 'Необходимо указать хотя бы одно Ваше качество'
            }
        },
        license: {
            isRequired: {
                message: 'Необходимо Ваше соглашение'
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

    const handlerMultiSelect = (items) => {
        const value = items.map(
            (item) =>
                allQualities[
                    Object.keys(allQualities).find(
                        (quality) => allQualities[quality]._id === item.value
                    )
                ]
        )
        handleChangeField({ qualities: value })
    }

    const { email, password, profession, sex, qualities, license } = state

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
            <Select
                data={professions}
                value={profession}
                label={'Выберите профессию'}
                name={'profession'}
                onChange={handleChangeField}
                error={errors.profession}
            />
            <RadioField
                data={sexData}
                label={'Ваш пол'}
                name={'sex'}
                defaultValue={sex}
                onChange={handleChangeField}
                error={errors.sex}
            />
            <MultiSelect
                data={allQualities}
                defaultValue={qualities}
                dataTransformer={transformData}
                label={'Укажите Ваши качества'}
                onChange={handlerMultiSelect}
                error={errors.qualities}
            />
            <CheckBoxField
                value={license}
                label={'Я принимаю условия пользовательского соглашения'}
                name={'license'}
                error={errors.license}
                onChange={handleChangeField}
            />
            <button
                className="btn btn-primary"
                type="submit"
                disabled={Boolean(Object.keys(errors).length)}
            >
                Зарегистрироваться
            </button>
        </form>
    )
}

export default RegisterForm
