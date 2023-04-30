import React from 'react'
import PropTypes from 'prop-types'

const TextArea = ({ name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ [target.name]: target.value })
    }

    return (
        <div className="has-validation">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
                Сообщение
            </label>
            <textarea
                className={`form-control ${error ? 'is-invalid' : ''}`}
                id="exampleFormControlTextarea1"
                rows="3"
                name={name}
                value={value}
                onChange={(e) => handleChange(e)}
            ></textarea>
            {error ? <p className="invalid-feedback">{error}</p> : ''}
        </div>
    )
}

TextArea.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string
}

export default TextArea
