import React, { useEffect, useState } from 'react'
import Users from './components/users'
import api from './api'

const App = () => {
    const [state, setState] = useState({
        users: {},
        dataLoaded: false
    })

    const getData = async() => {
        try {
            const data = await api.users.fetchAll()
            setState((prevState) => ({
                ...prevState,
                users: data,
                dataLoaded: true
            }))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        void getData()
    }, [])

    const deleteUser = (deletedUser) => {
        const newUsersList = state.users?.filter(
            (user) => user._id !== deletedUser._id
        )
        setState((prevState) => ({
            ...prevState,
            users: newUsersList
        }))
    }

    const bookmarkHandler = (id) => {
        setState((prevState) => ({
            ...prevState,
            users: prevState.users.map((user) =>
                user._id === id ? { ...user, bookmark: !user.bookmark } : user
            )
        }))
    }

    return (
        <div className="App" style={{ padding: '1rem' }}>
            {state.dataLoaded ? (
                <Users
                    allUsers={state.users}
                    deleteUser={deleteUser}
                    bookmarkHandler={bookmarkHandler}
                />
            ) : (
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button>
            )}
        </div>
    )
}

export default App
