import React, { useEffect, useState } from 'react'
import { USERS } from '../routes/routesVariables'
import { useHistory } from 'react-router-dom'
import api from '../api'
import PagePreloader from './ui/pagePreloader'
import QualitiesList from '../components/QualitiesList'
import Button from '../components/ui/Button'
import PropTypes from 'prop-types'

const UserPage = ({ id }) => {
    const [user, setUser] = useState({})
    const history = useHistory()

    useEffect(() => {
        api.users.getUser(id)
            .then(data => {
                setUser(data !== undefined ? data : {})
            })
            .catch(e => console.log(e))
    }, [])

    const goToUsers = () => {
        history.push(USERS)
    }

    return (
        Object.keys(user).length ? (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <div>
                    <QualitiesList data={user.qualities}/>
                </div>
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <Button value={'Все пользователи'} onClick={goToUsers} className={'btn btn-secondary'} />
            </div>
        ) : (
            <div>
                <PagePreloader/>
            </div>
        )

    )
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired
}

export default UserPage
