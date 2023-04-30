import React from 'react'
import PropTypes from 'prop-types'
import WrapperBox from '../../common/WrapperBox'

const UserPageMeetings = ({ count }) => {
    return (
        <WrapperBox>
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Completed meetings</span>
                </h5>
                <h1 className="display-1">{count}</h1>
            </div>
        </WrapperBox>
    )
}

UserPageMeetings.propTypes = {
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default UserPageMeetings
