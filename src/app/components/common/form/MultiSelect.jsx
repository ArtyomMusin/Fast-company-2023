import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const MultiSelect = ({
    data,
    defaultValue,
    dataTransformer,
    label,
    closeMenuOnSelect,
    onChange,
    error
}) => {
    return (
        <div className="mb-4 has-validation">
            <label htmlFor="validate-custom-4">{label}</label>
            <Select
                isMulti
                options={dataTransformer(data)}
                defaultValue={dataTransformer(defaultValue)}
                closeMenuOnSelect={closeMenuOnSelect}
                className={`basic-multi-select ${error ? 'is-invalid' : ''}`}
                classNamePrefix={'select'}
                onChange={onChange}
            />
            {error ? <p className="invalid-feedback">{error}</p> : ''}
        </div>
    )
}

MultiSelect.defaultProps = {
    closeMenuOnSelect: false
}

MultiSelect.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
        .isRequired,
    dataTransformer: PropTypes.func,
    closeMenuOnSelect: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    error: PropTypes.string
}

export default MultiSelect
