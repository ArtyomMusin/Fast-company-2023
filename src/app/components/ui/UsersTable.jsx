import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
    BOOKMARK,
    COMPLETED_MEETINGS,
    NAME,
    PROFESSION_NAME,
    RATE
} from '../../variables'
import Table, { TableHeader, TableBody } from '../common/table'
import Bookmark from '../common/Bookmark'
import Button from '../common/Button'
import Qualities from './qualities'
import { USERS } from '../../routes/routesVariables'

const UsersTable = ({
    users,
    currentSort,
    deleteUser,
    bookmarkHandler,
    refreshSortState,
    invertedSortParams
}) => {
    const columns = {
        name: {
            name: 'Имя',
            path: NAME,
            component: (data) => (
                <Link to={`${USERS}/${data._id}`}>{data[NAME]}</Link>
            )
        },
        qualities: {
            name: 'Качества',
            component: (data) => <Qualities {...{ data: data.qualities }} />
        },
        profession: { name: 'Профессии', path: PROFESSION_NAME },
        completedMeetings: {
            name: 'Встретился, раз',
            path: COMPLETED_MEETINGS
        },
        rate: { name: 'Оценка', path: RATE },
        bookmark: {
            name: 'Избранное',
            path: BOOKMARK,
            component: (data) => (
                <Bookmark
                    isTrue={data.bookmark}
                    handler={() => bookmarkHandler(data._id)}
                />
            )
        },
        delete: {
            name: '',
            component: (data) => (
                <Button
                    value={'Удалить'}
                    onClick={() => deleteUser(data)}
                    className="btn btn-danger"
                />
            )
        }
    }

    return (
        <Table>
            <TableHeader
                {...{
                    columns,
                    currentSort,
                    invertedSortParams,
                    refreshSortState
                }}
            />
            <TableBody {...{ data: users, columns }} />
        </Table>
    )
}

UsersTable.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    currentSort: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired,
    bookmarkHandler: PropTypes.func.isRequired,
    refreshSortState: PropTypes.func.isRequired,
    invertedSortParams: PropTypes.array
}

export default UsersTable
