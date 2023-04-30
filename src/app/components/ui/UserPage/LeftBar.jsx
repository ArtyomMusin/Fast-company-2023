import React from 'react'
import PropTypes from 'prop-types'

const LeftBar = ({ children }) => {
    return <div className="col-md-4 mb-3">{children}</div>
}

LeftBar.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}

export default LeftBar
