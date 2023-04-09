import React from 'react'
import User from './User'
import PropTypes from 'prop-types'
import { ASC, NAME, PROFESSIONS_NAME, COMPLETED_MEETINGS, RATE, BOOKMARK } from '../variables'

const UsersTable = ({ users, currentSort, deleteUser, bookmarkHandler, onSort }) => {
    const getIcon = (name) => {
        if (currentSort[0] !== name) {
            return
        }
        const direction = currentSort[1] === ASC ? 'down' : 'up'
        return <i className={`bi bi-caret-${direction}-fill`}></i>
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col" role="button" onClick={() => onSort(NAME)}>Имя {getIcon(NAME)}</th>
                    <th scope="col">Качества</th>
                    <th scope="col" role="button" onClick={() => onSort(PROFESSIONS_NAME)}>Профессия {getIcon(PROFESSIONS_NAME)}</th>
                    <th scope="col" role="button" onClick={() => onSort(COMPLETED_MEETINGS)}>Встретился, раз {getIcon(COMPLETED_MEETINGS)}</th>
                    <th scope="col" role="button" onClick={() => onSort(RATE)}>Оценка {getIcon(RATE)}</th>
                    <th scope="col" role="button" onClick={() => onSort(BOOKMARK)}>Избранное {getIcon(BOOKMARK)}</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {users.length ? (
                    users.map((user) => (
                        <User
                            key={`user_${user._id}`}
                            data={user}
                            deleteUser={deleteUser}
                            bookmarkHandler={bookmarkHandler}
                        />
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan="7"
                            style={{ textAlign: 'center' }}
                        >
                            Нет таких пользователей
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

UsersTable.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    currentSort: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired,
    bookmarkHandler: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
}

export default UsersTable
