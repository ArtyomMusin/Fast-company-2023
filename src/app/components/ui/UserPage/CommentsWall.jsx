import React from 'react'
import PropTypes from 'prop-types'
import WrapperBox from '../../common/WrapperBox'
import Divider from '../../common/Divider'
import Comment from './Comment'
import Preloader from '../../common/preloader'

const CommentsWall = ({ data, onDelete }) => {
    const sortedData = data.sort((a, b) => b.created_at - a.created_at)
    return (
        <WrapperBox>
            <div className="card-body">
                <h2>Comments</h2>
                <Divider />
                {sortedData ? (
                    sortedData.map((data) => (
                        <Comment
                            key={data._id}
                            data={data}
                            onDelete={(e) => onDelete(e)}
                        />
                    ))
                ) : (
                    <Preloader />
                )}
            </div>
        </WrapperBox>
    )
}

CommentsWall.propTypes = {
    data: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default CommentsWall
