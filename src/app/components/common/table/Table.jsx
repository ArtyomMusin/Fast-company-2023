import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

const Table = ({
    data,
    currentSort,
    invertedSortParams,
    refreshSortState,
    columns,
    children
}) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader
                        {...{
                            columns,
                            currentSort,
                            invertedSortParams,
                            refreshSortState
                        }}
                    />
                    <TableBody {...{ columns, data }} />
                </>
            )}
        </table>
    )
}

Table.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    currentSort: PropTypes.array,
    refreshSortState: PropTypes.func,
    invertedSortParams: PropTypes.array,
    columns: PropTypes.object,
    children: PropTypes.node
}

export default Table
