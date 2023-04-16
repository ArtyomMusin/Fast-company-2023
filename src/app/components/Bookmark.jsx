import React from 'react'
import PropTypes from 'prop-types'
import Button from './ui/Button'

const Bookmark = ({ isTrue, handler }) => {
    const value = isTrue ? (
        <i className="bi bi-bookmark-fill"></i>
    ) : (
        <i className="bi bi-bookmark"></i>
    )
    return (
        <Button value={value} onClick={handler} className={'btn-success'} />
    )
}

Bookmark.propTypes = {
    isTrue: PropTypes.bool.isRequired,
    handler: PropTypes.func.isRequired
}

export default Bookmark
