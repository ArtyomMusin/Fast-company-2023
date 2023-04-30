import React from 'react'
import PropTypes from 'prop-types'

const WrapperPage = ({ children }) => {
    return (
        <div className="container">
            <div className="row gutters-sm">{children}</div>
        </div>
    )
}
WrapperPage.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}

export default WrapperPage
