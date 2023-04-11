import React from 'react'
import Quality from './Quality'
import PropTypes from 'prop-types'

const QualitiesList = ({ data }) => {
    return (
        data?.qualities?.map((quality) => (
            <Quality
                key={`quality_${quality._id}`}
                color={quality.color}
                name={quality?.name}
            />
        ))
    )
}

QualitiesList.propTypes = {
    data: PropTypes.array.isRequired
}

export default QualitiesList
