import React from 'react'
import PropTypes from 'prop-types'

const Select = ({ data, defaultValue, label, name, onChange, error }) => {
    const isDataLoaded = Boolean(Object.keys(data).length)

    const handler = (e) => {
        if (!e.target.name) return
        onChange({ [name]: data[Object.keys(data).find(item => data[item]._id === e.target.value)] })
    }

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <select
                    className={`form-select ${error ? 'is-invalid' : ''}`}
                    id={name}
                    required
                    value={isDataLoaded ? defaultValue._id : ''}
                    name={name}
                    onChange={(e) => handler(e)}
                >
                    <option value="" disabled>
                        Choose...
                    </option>
                    {isDataLoaded ? (
                        Object.keys(data).map((key) => (
                            <option
                                key={`profession_${data[key]._id}`}
                                value={data[key]._id}
                            >
                                {data[key].name}
                            </option>
                        ))
                    ) : ('')}
                </select>
                {error ? <p className="invalid-feedback">{error}</p> : ''}
            </div>
        </div>
    )
}

Select.defaultProps = {
    data: {},
    defaultValue: {}
}

Select.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    defaultValue: PropTypes.object,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
}

export default Select
