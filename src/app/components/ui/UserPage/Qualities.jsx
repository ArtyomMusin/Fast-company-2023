import React from 'react'
import PropTypes from 'prop-types'
import WrapperBox from '../../common/WrapperBox'
import QualitiesList from '../qualities'

const Qualities = ({ qualitiesArray }) => {
    return (
        <WrapperBox>
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p className="card-text">
                    <QualitiesList data={qualitiesArray} />
                </p>
            </div>
        </WrapperBox>
    )
}

Qualities.propTypes = {
    qualitiesArray: PropTypes.array.isRequired
}

export default Qualities
