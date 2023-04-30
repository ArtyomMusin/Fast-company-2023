import React from 'react'
import PropTypes from 'prop-types'
import WrapperBox from '../../common/WrapperBox'

const CardBody = ({ name, profession, rate, onRate, onClick }) => {
    return (
        <WrapperBox>
            <div className="card-body">
                <button
                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                    onClick={onClick}
                >
                    <i className="bi bi-gear"></i>
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src="https://avatars.dicebear.com/api/avataaars/qweqwdas.svg"
                        className="rounded-circle"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{name}</h4>
                        <p className="text-secondary mb-1">{profession}</p>
                        <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                                onClick={() => onRate(false)}
                            ></i>
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                                onClick={() => onRate(true)}
                            ></i>
                            <span className="ms-2">{rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </WrapperBox>
    )
}

CardBody.propTypes = {
    name: PropTypes.string.isRequired,
    profession: PropTypes.string.isRequired,
    rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onRate: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
}

export default CardBody
