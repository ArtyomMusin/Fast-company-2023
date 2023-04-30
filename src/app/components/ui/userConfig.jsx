import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import api from '../../api'
import Preloader from '../common/preloader'
import TextField from '../common/form/TextField'
import Select from '../common/form/Select'
import RadioField from '../common/form/RadioField'
import MultiSelect from '../common/form/MultiSelect'
import transformData from '../../utils/transformDataForSelect'
import Button from '../common/Button'
import { object, string, array } from 'yup'

const UserConfig = () => {
    const history = useHistory()
    const url = useLocation().pathname
    const previousUrl = url.match(/\/users\/[a-zA-Z0-9]+/)[0]
    const parsedUrl = url.match(/[^/users/][a-zA-Z\d]+/)
    const id = parsedUrl[0]

    const [userData, setUserData] = useState({})
    const [errors, setErrors] = useState({})
    const [professions, setProfessions] = useState({})
    const [allQualities, setAllQualities] = useState({})
    const sexData = [
        { _id: 1, label: 'Man', value: 'male' },
        { _id: 2, label: 'Woman', value: 'female' },
        { _id: 3, label: 'Other', value: 'other' }
    ]

    useEffect(() => {
        api.users
            .getById(id)
            .then((data) => setUserData(data !== undefined ? data : {}))
            .catch((e) => console.log(e))
        api.professions
            .fetchAll()
            .then((data) => setProfessions(data))
            .catch((err) => console.log('Ошибка прогрузки профессий', err))
        api.qualities.fetchAll().then((data) => setAllQualities(data))
    }, [])

    const userSettingsFormValidateScheme = object({
        qualities: array().min(1, 'Укажите хотя бы 1 качество'),
        profession: object().required('Выберите профессию'),
        email: string()
            .required('Поле email не должно быть пустым')
            .email('Некорректно введён email'),
        name: string().required('Поле Имя не должно быть пустым')
    })

    const validate = () => {
        userSettingsFormValidateScheme
            .validate(userData, { abortEarly: true })
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }))
        return Object.keys(errors).length === 0
    }

    const submitForm = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        api.users.update(userData._id, userData).then((res) => {
            goToUserPage()
        })
    }

    const goToUserPage = () => {
        return history.replace(previousUrl)
    }

    useEffect(() => {
        validate()
    }, [userData])

    const handleChangeField = (data) => {
        setUserData((prevState) => ({ ...prevState, ...data }))
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

    const { name, email, profession, sex, qualities } = userData

    return (
        <div className="container mt-5 ">
            <Button className="btn btn-primary" onClick={goToUserPage}>
                <i className="bi bi-caret-left"></i>
                Back
            </Button>
            <div className="row col-md-6 offset-md-3 shadow p-4">
                {Object.keys(userData).length ? (
                    <form onSubmit={submitForm}>
                        <TextField
                            label={'Name'}
                            name={'name'}
                            value={name}
                            onChange={handleChangeField}
                            error={errors.name}
                        />
                        <TextField
                            label={'Email'}
                            name={'email'}
                            value={email}
                            onChange={handleChangeField}
                            error={errors.email}
                        />
                        <Select
                            data={professions}
                            defaultValue={profession}
                            label={'Choose profession'}
                            name={'profession'}
                            onChange={handleChangeField}
                            error={errors.profession}
                        />
                        <RadioField
                            data={sexData}
                            label={'Choose sex'}
                            name={'sex'}
                            defaultValue={sex}
                            onChange={handleChangeField}
                            error={errors.sex}
                        />
                        <MultiSelect
                            data={allQualities}
                            defaultValue={qualities}
                            dataTransformer={transformData}
                            label={'Choose qualities'}
                            onChange={handlerMultiSelect}
                            error={errors.qualities}
                        />
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={Boolean(Object.keys(errors).length)}
                        >
                            Update
                        </button>
                    </form>
                ) : (
                    <Preloader />
                )}
            </div>
        </div>
    )
}

export default UserConfig
