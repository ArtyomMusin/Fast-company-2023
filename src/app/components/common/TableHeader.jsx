import React from 'react'
import PropTypes from 'prop-types'
import { ASC, DESC } from '../../variables'

const TableHeader = ({ columns, currentSort, refreshSortState, invertedSortParams }) => {
    const getIcon = (name) => {
        if (currentSort[0] !== name) {
            return
        }

        let direction = currentSort[1] === ASC ? 'down' : 'up'
        invertedSortParams?.forEach(item => {
            if (currentSort[0] === item) {
                direction = currentSort[1] === DESC ? 'down' : 'up'
            }
        })

        return <i className={`bi bi-caret-${direction}-fill`}></i>
    }

    // обработчик состояния сортировки
    const handleSortUsersState = (param) => {
        refreshSortState(prevState => {
            let type = DESC
            invertedSortParams?.forEach(item => {
                type = param === item ? ASC : DESC
            })
            if (prevState[0] === param) {
                type = prevState[1] === DESC ? ASC : DESC
            }
            return [param, type]
        })
    }

    return (
        <thead>
            <tr>
                {Object.keys(columns).map(col => (
                    <th
                        key={col}
                        scope="col"
                        {...columns[col].path ? {
                            role: 'button',
                            onClick: () => handleSortUsersState(columns[col].path)
                        } : ''}
                    >
                        {columns[col].name} {columns[col].path ? getIcon(columns[col].path) : ''}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

TableHeader.propTypes = {
    columns: PropTypes.object.isRequired,
    currentSort: PropTypes.array.isRequired,
    refreshSortState: PropTypes.func.isRequired,
    invertedSortParams: PropTypes.array
}

export default TableHeader
