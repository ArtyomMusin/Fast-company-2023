import React from 'react'
import { useParams } from 'react-router-dom'
import { USER_ID } from '../routes/routesVariables'
import UserPage from '../components/UserPage'
import UsersList from '../components/UsersList'

const Users = () => {
    const params = useParams()
    const userId = params[USER_ID]

    return (
        userId ? (
            <UserPage id={userId}/>
        ) : (
            <UsersList />
        )
    )
}

export default Users
