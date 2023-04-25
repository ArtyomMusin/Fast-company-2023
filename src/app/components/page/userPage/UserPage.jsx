import React, { useEffect, useState } from 'react'
// import { USERS } from '../../../routes/routesVariables'
import { useLocation, useHistory } from 'react-router-dom'
import api from '../../../api'
import PagePreloader from '../../common/pagePreloader'
import Qualities from '../../ui/qualities'
import Button from '../../common/Button'
import PropTypes from 'prop-types'

const UserPage = ({ id }) => {
    const [user, setUser] = useState({})
    const history = useHistory()
    const { pathname } = useLocation()
    console.log(id)

    useEffect(() => {
        api.users
            .getById(id)
            .then((data) => setUser(data !== undefined ? data : {}))
            .catch((e) => console.log(e))
    }, [])

    const goToUsers = () => {
        history.push(`${pathname}/edit`)
    }

    return Object.keys(user).length ? (
        <div>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <div>
                <Qualities data={user.qualities} />
            </div>
            <p>completedMeetings: {user.completedMeetings}</p>
            <h2>Rate: {user.rate}</h2>
            <Button
                value={'Изменить'}
                onClick={goToUsers}
                className={'btn btn-secondary'}
            />
        </div>
    ) : (
        <div>
            <PagePreloader />
        </div>
    )
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired
}

export default UserPage
