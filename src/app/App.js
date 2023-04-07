import React, { useEffect, useState } from 'react'
import Users from './components/users'
import api from './api'

const App = () => {
    const [state, setState] = useState({
        users: {},
        dataLoaded: false
    })

    const query = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = api.users.fetchAll()
                // const data = null
                if (data) {
                    resolve(data)
                }
                resolve('Request error')
            }, 1000)
        })
    }

    const getData = async() => {
        try {
            const data = await query()
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
        getData()
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
                    users={state.users}
                    deleteUser={deleteUser}
                    bookmarkHandler={bookmarkHandler}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default App
