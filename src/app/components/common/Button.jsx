import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ value, onClick, classes, children, ...rest }) => {
    return (
        <button className={`btn ${classes}`} onClick={onClick} {...rest}>
            {children || value}
        </button>
    )
}

Button.defaultProps = {
    classes: 'btn-primary',
    value: 'Кнопка'
}

Button.propTypes = {
    value: PropTypes.any,
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}

export default Button
