import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [visiblePassword, setVisiblePassword] = useState(false)

    const toggleShowPassword = () => {
        setVisiblePassword(prevState => !prevState)
    }

    const getVisibleIcon = () => {
        return visiblePassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>
    }

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input className={`form-control ${error ? 'is-invalid' : ''}`} type={visiblePassword ? 'text' : type} id={name} name={name} value={value} onChange={e => onChange(e)} />
                {type === 'password' &&
                    <button type="button" className="btn btn-outline-secondary" onClick={toggleShowPassword}>{getVisibleIcon()}</button>
                }
                {error ? (
                    <p className="invalid-feedback">{error}</p>
                ) : ('')}
            </div>
        </div>
    )
}

TextField.defaultProps = {
    type: 'text'
}

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
}

export default TextField
