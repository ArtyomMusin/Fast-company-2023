import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
    const getMessage = () => {
        switch (length) {
            case 0:
                return 'Никто с тобой не тусанёт'
            case 2:
            case 3:
            case 4:
                return 'человека с тобой тусанёт сегодня'
            default:
                return 'человек с тобой тусанёт сегодня'
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
