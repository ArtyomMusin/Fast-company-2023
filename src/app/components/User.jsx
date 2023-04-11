import React from 'react'
import Bookmark from './Bookmark'
import Quality from './Quality'
import PropTypes from 'prop-types'

const User = ({ data, deleteUser, bookmarkHandler }) => {
    return (
        <tr key={data?._id}>
            <td>{data?.name}</td>
            <td>
                {data?.qualities?.map((quality) => (
                    <Quality
                        key={`quality_${quality._id}`}
                        color={quality.color}
                        name={quality?.name}
                    />
                ))}
            </td>
            <td>{data?.profession?.name}</td>
            <td>{data?.completedMeetings}</td>
            <td>{data?.rate} / 5</td>
            <td>
                <Bookmark
                    isTrue={data.bookmark}
                    handler={() => bookmarkHandler(data._id)}
                />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(data)}
                >
                    delete
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    data: PropTypes.object.isRequired,
    deleteUser: PropTypes.func.isRequired,
    bookmarkHandler: PropTypes.func.isRequired
}

export default User
