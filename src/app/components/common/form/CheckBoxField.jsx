import React from 'react'
import PropTypes from 'prop-types'

const CheckBoxField = ({ value, label, name, error, onChange }) => {
    const handleChange = (e) => {
        onChange({ [name]: e.target.checked })
    }

    return (
        <div className="mb-4">
            <div className="form-check has-validation">
                <input
                    className="form-check-input"
                    role="button"
                    type="checkbox"
                    id={name}
                    name={name}
                    checked={value}
                    onChange={(e) => handleChange(e)}
                />
                <label
                    className={`form-check-label ${error ? 'is-invalid' : ''}`}
                    role="button"
                    htmlFor={name}
                >
                    {label}
                </label>
                {error ? <p className="invalid-feedback">{error}</p> : ''}
            </div>
        </div>
    )
}

CheckBoxField.propTypes = {
    value: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func
}

export default CheckBoxField
