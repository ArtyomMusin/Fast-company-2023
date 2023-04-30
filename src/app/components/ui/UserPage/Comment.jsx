import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import timeDifference from '../../../utils/differenceTime'

const Comment = ({ data, onDelete }) => {
    const [commentator, setCommentator] = useState({})

    useEffect(() => {
        api.users.getById(data.userId).then(setCommentator)
    }, [])

    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <img
                            src="https://avatars.dicebear.com/api/avataaars/qweqasdas.svg"
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                        {commentator.name}
                                        <span className="small">
                                            &nbsp;
                                            {timeDifference(data.created_at)}
                                        </span>
                                    </p>
                                    <button
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                        onClick={() => onDelete(data._id)}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{data.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Comment.propTypes = {
    data: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default Comment
