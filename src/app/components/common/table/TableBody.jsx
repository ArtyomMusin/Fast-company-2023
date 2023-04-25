import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const TableBody = ({ data, columns, messageForEmptyTable }) => {
    const renderContent = (item, column) => {
        if (column.component) {
            if (typeof column.component === 'function') {
                return column.component(item)
            }
            return column.component
        }
        return _.get(item, column.path)
    }

    return (
        <tbody>
            {data.length ? (
                data.map((item) => (
                    <tr key={item._id}>
                        {Object.keys(columns).map((col) => (
                            <td key={`${col}_${item._id}`}>
                                {renderContent(item, columns[col])}
                            </td>
                        ))}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={Object.keys(columns).length} style={{ textAlign: 'center' }}>
                        {messageForEmptyTable}
                    </td>
                </tr>
            )}
        </tbody>
    )
}

TableBody.defaultProps = {
    messageForEmptyTable: 'Нет данных'
}

TableBody.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    columns: PropTypes.object.isRequired,
    messageForEmptyTable: PropTypes.string
}

export default TableBody
