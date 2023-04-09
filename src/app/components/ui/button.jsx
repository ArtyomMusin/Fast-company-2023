import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ value, onClick }) => {
    return (
        <button
            className="btn btn-secondary mt-1"
            onClick={onClick}
        >
            {value}
        </button>
    )
}
Button.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Button
