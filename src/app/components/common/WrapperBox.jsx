import React from 'react'
import PropTypes from 'prop-types'
import '../styles/styles.scss'

const WrapperBox = ({ children }) => {
    return <div className="Wrapper-Box card mb-3">{children}</div>
}

WrapperBox.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}

export default WrapperBox
