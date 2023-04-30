import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
    const getMessage = () => {
        switch (length) {
            case 0:
                return 'The list is empty'
            case 2:
            case 3:
            case 4:
                return 'people available for you'
            default:
                return 'people available for you'
        }
    }
    return length > 0 ? (
        <h1 className="badge bg-primary fs-3" style={{ width: 'fit-content' }}>
            {`${length} ${getMessage()}`}
        </h1>
    ) : (
        <h1 className="badge bg-danger fs-3" style={{ width: 'fit-content' }}>
            {getMessage()}
        </h1>
    )
}

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
}

export default SearchStatus
