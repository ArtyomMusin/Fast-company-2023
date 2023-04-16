import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ value, onClick, className }) => {
    return (
        <button
            className={`btn ${className}`}
            onClick={onClick}
        >
            {value}
        </button>
    )
}

Button.defaultProps = {
    className: ''
}

Button.propTypes = {
    value: PropTypes.any.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default Button
