import React from 'react'
import PropTypes from 'prop-types'

const Content = ({ children }) => {
    return <div className="col-md-8">{children}</div>
}

Content.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}

export default Content
