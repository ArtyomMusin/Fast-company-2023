import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ({ data, defaultValue, label, name, onChange, error }) => {
    const handleChange = (e) => {
        onChange({ [e.target.name]: e.target.value })
    }

    return (
        <div className="mb-4">
            <label htmlFor="validate-custom-4">{label}</label>
            <div className={`input-group has-validation`}>
                {Object.keys(data).length ? (
                    <div className={`${error ? 'is-invalid' : ''}`}>
                        {Object.keys(data).map((item, i) => (
                            <div
                                className="form-check form-check-inline"
                                key={`${name}_${data[item]._id}`}
                            >
                                <label
                                    className="form-check-label"
                                    htmlFor={`inline-radio-${i}`}
                                >
                                    {data[item].label}
                                </label>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id={`inline-radio-${i}`}
                                    value={data[item].value}
                                    checked={
                                        String(data[item].value) ===
                                        String(defaultValue)
                                    }
                                    name={name}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    ''
                )}
                {error ? <p className="invalid-feedback">{error}</p> : ''}
            </div>
        </div>
    )
}

RadioField.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    defaultValue: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
}

export default RadioField
