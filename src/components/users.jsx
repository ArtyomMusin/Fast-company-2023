import {useEffect, useState} from 'react'
import api from '../api/index'
import User from "./User";

const Users = () => {
    const [state, setState] = useState({})

    const addUsersInState = (users) => {
        setState(prevState => ({...prevState, users}))
    }

    useEffect(() => {
        const users = api.users.fetchAll()
        addUsersInState(users)
    }, [])

    useEffect(() => {
        console.log('state: ', state)
    }, [state])

    const deleteUser = (deletedUser) => {
        const newUsersList = state.users?.filter(user => user._id !== deletedUser._id)
        setState(prevState => ({...prevState, users: newUsersList}))
    }

    return (
        <div className="users" style={{padding: '1rem'}}>
            {state.users?.length
                ? <h1 className="badge bg-primary fs-3">{`${state.users?.length} человек с тобой тусанёт сегодня`}</h1>
                : <h1 className="badge bg-danger fs-3">Никто с тобой не тусанёт</h1>
            }
            {state.users?.length ?
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.users.map(user =>
                            <User key={`user_${user._id}`} data={user} deleteUser={deleteUser}/>
                        )}
                    </tbody>
                </table>
            : ''}
        </div>
    );
};

export default Users;