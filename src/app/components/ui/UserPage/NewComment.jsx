import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import { object, string } from 'yup'
import WrapperBox from '../../common/WrapperBox'
import Select from '../../common/form/Select'
import Button from '../../common/Button'
import TextArea from '../../common/form/TextArea'

const NewComment = ({ id, refreshComments }) => {
    const [users, setUsers] = useState({})
    const [errors, setErrors] = useState({})
    const [state, setState] = useState({
        pageId: id,
        userId: '',
        content: ''
    })

    // base actions after mount
    useEffect(() => {
        api.users.fetchAll().then((res) => {
            setUsers(
                res.map((user) => ({
                    _id: user._id,
                    value: user._id,
                    name: user.name
                }))
            )
        })
    }, [])

    // validation

    const errorMessages = {
        content: {
            reqired: 'Контент не может быть пустым'
        },
        userId: {
            reqired: 'Укажите пользователя'
        }
    }

    const commentSchema = object({
        content: string().required({ content: errorMessages.content.reqired }),
        userId: string().required({ userId: errorMessages.userId.reqired })
    })

    const validate = async() => {
        const isValid = await new Promise((resolve) =>
            commentSchema
                .validate(state, { abortEarly: false })
                .then(() => {
                    setErrors({})
                    resolve(true)
                })
                .catch((err) => {
                    setErrors(
                        err.errors.reduce((newObj, obj) => {
                            const key = Object.keys(obj)[0]
                            return { ...newObj, ...{ [key]: obj[key] } }
                        }, {})
                    )
                    resolve(false)
                })
        )
        console.log('Promise: ', isValid)
        return isValid
    }

    const validButtonSubmit = () => {
        return state.userId.trim() && state.content.trim()
    }

    // submit comment
    const submitComment = async() => {
        const isValid = await validate()
        if (!isValid) {
            return console.error('Validation error')
        }
        api.comments
            .add(state)
            .then((data) => refreshComments(data))
            .then(() => clearForm())
    }

    // handlers
    const handleSelect = (data) => {
        handleField(
            Object.keys(data).map((key) => ({ [key]: data[key]._id }))[0]
        )
    }

    const handleField = (data) => {
        setState((prevState) => ({
            ...prevState,
            ...data
        }))
    }

    // clear, removers etc.
    const clearForm = () => {
        setState((prevState) => ({
            ...prevState,
            userId: '',
            content: ''
        }))
    }

    return (
        <WrapperBox>
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <div className="mb-4">
                        <Select
                            name={'userId'}
                            data={users}
                            value={state.userId}
                            onChange={handleSelect}
                            error={errors.userId}
                        />
                    </div>
                    <div className="mb-4">
                        <TextArea
                            name={'content'}
                            value={state.content}
                            onChange={handleField}
                            error={errors.content}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={submitComment}
                            value={'Publish'}
                            disabled={!validButtonSubmit()}
                        />
                    </div>
                </div>
            </div>
        </WrapperBox>
    )
}

NewComment.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    refreshComments: PropTypes.func.isRequired
}

export default NewComment
