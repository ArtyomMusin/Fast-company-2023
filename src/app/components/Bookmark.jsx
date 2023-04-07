import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ isTrue, handler }) => {
    return (
        <button onClick={handler}>
            {isTrue ? (
                <i className="bi bi-bookmark-fill"></i>
            ) : (
                <i className="bi bi-bookmark"></i>
            )}
        </button>
    )
}

Bookmark.propTypes = {
    isTrue: PropTypes.bool.isRequired,
    handler: PropTypes.func.isRequired
}

export default Bookmark
