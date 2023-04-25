import React from 'react'
import PropTypes from 'prop-types'

const InputSearch = ({ placeholder = 'Search', value, onChange }) => {
    return (
        <nav className="navbar navbar-light bg-light p-1">
            <form className="form-inline w-100">
                <input
                    className="form-control mr-sm-2 w-100"
                    type="search"
                    placeholder={placeholder}
                    aria-label="Search"
                    onChange={onChange}
                    value={value}
                />
            </form>
        </nav>
    )
}
InputSearch.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default InputSearch
