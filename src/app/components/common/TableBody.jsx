import React from 'react'
import PropTypes from 'prop-types'
import User from '../User'

const TableBody = ({ users, deleteUser, bookmarkHandler }) => {
    return (
        <tbody>
            {users.length ? (
                users.map((user) => (
                    <User
                        key={`user_${user._id}`}
                        data={user}
                        {...{ deleteUser, bookmarkHandler }}
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
    )
}

TableBody.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    deleteUser: PropTypes.func.isRequired,
    bookmarkHandler: PropTypes.func.isRequired
}

export default TableBody
