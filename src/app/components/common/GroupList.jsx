import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({ data, current, onSelect }) => {
    const checkCurrent = (id) => {
        return current === id ? 'active' : ''
    }

    return (
        <ul className="list-group">
            {Object.keys(data).map((profession) => (
                <li
                    key={`profession_${
                        data[profession]._id ? data[profession]._id : 'all'
                    }`}
                    className={`list-group-item ${checkCurrent(
                        data[profession]._id
                    )}`}
                    onClick={() => onSelect(data[profession]._id)}
                    role="button"
                >
                    {data[profession].name}
                </li>
            ))}
        </ul>
    )
}

GroupList.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onSelect: PropTypes.func.isRequired
}

export default GroupList
