import {useEffect, useState} from 'react'
import * as data from '../api/index'

const Users = () => {
    const [state, setState] = useState({})

    useEffect(() => {
        const users = data.default.users.fetchAll()
        setState(prevState => ({...prevState, users}))
        console.log('qwe')
    }, [])

    useEffect(() => {
        console.log('state: ', state)
    }, [state])

    return (
        <div>
            <h1>Users</h1>
        </div>
    );
};

export default Users;