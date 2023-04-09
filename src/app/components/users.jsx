import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../api'
import _ from 'lodash'
import UsersTable from './UsersTable'
import GroupList from './GroupList'
import InputSearch from './InputSearch'
import Pagination from './Pagination'
import { paginate } from '../utils/paginate'
import Preloader from './ui/preloader'
import Button from './ui/button'
import { ASC, DESC } from '../variables'

const Users = ({ allUsers, deleteUser, bookmarkHandler }) => {
    const defaultSortParams = ['', DESC]
    const pageSize = 2

    const [professions, setProfessions] = useState({})
    const [users, setUsers] = useState([])
    const [usersOfCurrentPage, setUsersOfCurrentPage] = useState([])
    const [filteredProfessionId, setFilteredProfessionId] = useState(null)
    const [searchedUsersName, setSearchedUsersName] = useState('')
    const [sortParams, setSortParams] = useState(defaultSortParams)
    const [currentPage, setCurrentPage] = useState(1)
    const [testObj, setTestObj] = useState({ a: 1 })

    // получаем профессии
    useEffect(() => {
        console.log('Исходная дата: ', allUsers)
        getProfessions()
    }, [])

    const getProfessions = async() => {
        try {
            let professions = await api.professions.fetchAll()
            const all = { _id: null, name: 'Все' }
            // добавляем "все"
            if (Array.isArray(professions)) {
                if (professions[0]._id !== null) {
                    professions.unshift(all)
                }
            } else {
                professions = { ...all, ...professions }
            }
            setProfessions(professions)
        } catch (e) {
            console.log(e)
        }
    }

    // фильтруем всех юзеров на нужных
    useEffect(() => {
        refreshUsers()
    }, [allUsers, filteredProfessionId, searchedUsersName])

    const filterUsers = (users) => {
        if (filteredProfessionId === null) {
            return users
        }
        return users.filter(user => user.profession._id === filteredProfessionId)
    }

    const searchedUsers = (users) => {
        if (!searchedUsersName) {
            return users
        }
        return users.filter((user) => user.name.includes(searchedUsersName))
    }

    const refreshUsers = () => {
        let users = filterUsers(allUsers)
        users = searchedUsers(users)
        setUsers(users)
        if (sortParams[0] !== '') {
            setSortParams(defaultSortParams)
        }
    }

    // пагинация
    useEffect(() => {
        setUsersPagination(currentPage)
    }, [currentPage])

    const setUsersPagination = (page) => {
        setUsersOfCurrentPage(paginate(users, page, pageSize))
    }

    // пагинация - меняем текущую страницу на предыдущую при удалении всех элементов на текущей странице (если она последняя)
    useEffect(() => {
        checkLastPageIsNotEmpty()
    }, [users])

    const checkLastPageIsNotEmpty = () => {
        const currentPageIsNotEmpty = Math.ceil(users.length / pageSize) < currentPage && currentPage > 1
        if (currentPageIsNotEmpty) {
            setCurrentPage(prevState => prevState - 1)
            return
        }
        setUsersPagination(currentPage)
    }

    // обработчик выбора профессии
    const handleSelectProfession = (id) => {
        setFilteredProfessionId(id)
        setCurrentPage(1)
    }

    // обработчик поиска
    const handleSearchProfession = (e) => {
        const userName = e.target.value
        setSearchedUsersName(userName)
        setCurrentPage(1)
    }

    // обработчик пагинации - смена страницы
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    // обработчик сортировки юзеров
    useEffect(() => {
        handleSortUsers()
    }, [sortParams])

    const handleSortUsers = () => {
        if (!sortParams[0]) {
            return
        }
        setUsers(prevState => _.orderBy(prevState, sortParams[0], sortParams[1] === ASC ? DESC : ASC))
    }

    const setStateUserSort = (param) => {
        setSortParams(prevState => {
            let type = prevState[1]
            if (prevState[0] === param) {
                type = type === DESC ? ASC : DESC
            }
            return [param, type]
        })
    }

    // сброс фильтров
    const cancelFilters = () => {
        setFilteredProfessionId(null)
        setSearchedUsersName('')
    }

    return (
        <div className="users">
            {allUsers?.length ? (
                <h1 className="badge bg-primary fs-3">{`${users?.length} человек с тобой тусанёт сегодня`}</h1>
            ) : (
                <h1 className="badge bg-danger fs-3">
                    Никто с тобой не тусанёт
                </h1>
            )}
            <div className="d-flex flex-direction-column gap-1">
                {Object.keys(professions).length && allUsers?.length ? (
                    <div className="d-flex flex-column">
                        <GroupList
                            data={professions}
                            current={filteredProfessionId}
                            onSelect={handleSelectProfession}
                        />
                        <Button value={'Сброс'} onClick={cancelFilters} />
                    </div>
                ) : allUsers?.length ? (
                    <Preloader />
                ) : (
                    ''
                )}
                {allUsers.length ? (
                    <div className="d-flex flex-column">
                        <InputSearch value={searchedUsersName} placeholder={'Введите имя'} onChange={(e) => handleSearchProfession(e)} />
                        <UsersTable users={usersOfCurrentPage} currentSort={sortParams} deleteUser={deleteUser} bookmarkHandler={bookmarkHandler} onSort={setStateUserSort} />
                    </div>
                ) : (
                    ''
                )}
            </div>
            <Pagination
                current={currentPage}
                itemsCount={users.length}
                pageSize={pageSize}
                handlePageChange={handlePageChange}
            />
            <button onClick={() => setTestObj(prevState => ({ ...prevState, a: prevState.a + 1 }))}>{testObj.a}</button>
        </div>
    )
}

Users.propTypes = {
    allUsers: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired,
    bookmarkHandler: PropTypes.func.isRequired
}

export default Users
