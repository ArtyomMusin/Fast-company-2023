import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({ current, itemsCount, pageSize, handlePageChange }) => {
    const countPagesArr = []
    const countPages = Math.ceil(itemsCount / pageSize)

    for (let i = 1; i <= countPages; i++) {
        countPagesArr.push(i)
    }

    return countPages > 1 ? (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={`page-item ${current === 1 ? 'disabled' : ''}`}>
                    <a
                        className="page-link"
                        onClick={() => handlePageChange(current - 1)}
                    >
                        Previous
                    </a>
                </li>
                {countPagesArr.map((page) => (
                    <li
                        key={`pagination_${page}`}
                        className={`page-item ${
                            current === page ? 'active' : ''
                        }`}
                    >
                        <a
                            className="page-link"
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
                <li
                    className={`page-item ${
                        current === countPages ? 'disabled' : ''
                    }`}
                >
                    <a
                        className="page-link"
                        onClick={() => handlePageChange(current + 1)}
                    >
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    ) : ''
}

Pagination.propTypes = {
    current: PropTypes.number.isRequired,
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired
}

export default Pagination
