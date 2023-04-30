import React from 'react'
import PropTypes from 'prop-types'

const Select = ({ data, value, label, name, onChange, error }) => {
    const isDataLoaded = Boolean(Object.keys(data).length)

    const handler = (e) => {
        if (!e.target.name) return
        onChange({
            [name]: data[
                Object.keys(data).find(
                    (item) => data[item]._id === e.target.value
                )
            ]
        })
    }

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <select
                    className={`form-select ${error ? 'is-invalid' : ''}`}
                    id={name}
                    required
                    value={isDataLoaded && value ? value : ''}
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
                    ) : (
                        <option value="" disabled>
                            Загрузка данных...
                        </option>
                    )}
                </select>
                {error ? <p className="invalid-feedback">{error}</p> : ''}
            </div>
        </div>
    )
}

Select.defaultProps = {
    data: {},
    value: {}
}

Select.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    error: PropTypes.string
}

export default Select
