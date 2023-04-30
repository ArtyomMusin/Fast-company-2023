import React from 'react'
import { useParams } from 'react-router-dom'
import { USER_ID, EDIT } from '../routes/routesVariables'
import UserPage from '../components/page/userPage/UserPage'
import UsersListPage from '../components/page/usersListPage/UsersListPage'
import UserConfig from '../components/ui/userConfig'

const Users = () => {
    const params = useParams()
    const userId = params[USER_ID]
    const { users3 } = params

    const getContent = () => {
        if (!userId) {
            return <UsersListPage />
        }

        if (users3 === EDIT) {
            return <UserConfig id={userId} />
        }

        return <UserPage id={userId} />
    }

    return getContent()
}

export default Users
