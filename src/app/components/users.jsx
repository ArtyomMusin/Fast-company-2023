import React, { useEffect, useState } from 'react'
import User from './User'
import Pagination from './Pagination'
import { paginate } from '../utils/paginate'
import PropTypes from 'prop-types'

const Users = ({ users, deleteUser, bookmarkHandler }) => {
    const [state, setState] = useState({
        currentPage: 1,
        pageSize: 4,
        users: []
    })

    useEffect(() => {
        const currentPageIsNotEmpty =
            Math.ceil(users.length / state.pageSize) < state.currentPage &&
            state.currentPage > 1
        if (currentPageIsNotEmpty) {
            setState((prevState) => ({
                ...prevState,
                currentPage: prevState.currentPage - 1
            }))

            return
        }
        setUsersPagination(state.currentPage)
    }, [users])

    useEffect(() => {
        setUsersPagination(state.currentPage)
    }, [state.currentPage])

    const handlePageChange = (page) => {
        setState((prevState) => ({ ...prevState, currentPage: page }))
    }

    const setUsersPagination = (page) => {
        setState((prevState) => ({
            ...prevState,
            users: paginate(users, page, state.pageSize)
        }))
    }

    return (
        <div className="users">
            {users?.length ? (
                <h1 className="badge bg-primary fs-3">{`${users?.length} человек с тобой тусанёт сегодня`}</h1>
            ) : (
                <h1 className="badge bg-danger fs-3">
                    Никто с тобой не тусанёт
                </h1>
            )}
            {state.users?.length ? (
                <>
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
                            {state.users.map((user) => (
                                <User
                                    key={`user_${user._id}`}
                                    data={user}
                                    deleteUser={deleteUser}
                                    bookmarkHandler={bookmarkHandler}
                                />
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        current={state.currentPage}
                        itemsCount={users.length}
                        pageSize={state.pageSize}
                        handlePageChange={handlePageChange}
                    />
                </>
            ) : ('')}
        </div>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired,
    bookmarkHandler: PropTypes.func.isRequired
}

export default Users
