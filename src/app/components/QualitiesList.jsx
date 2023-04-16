import React from 'react'
import PropTypes from 'prop-types'
import Quality from './Quality'

const QualitiesList = ({ data }) => {
    return (
        data?.map((quality) => (
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
