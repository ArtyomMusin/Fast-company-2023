import React, { useEffect, useState } from 'react'
import api from '../api'
import _ from 'lodash'
import { ASC, DESC, BOOKMARK, NAME, USERS_SEARCH, USERS_PROFESSION } from '../variables'
import UsersTable from './common/UsersTable'
import GroupList from './GroupList'
import InputSearch from './InputSearch'
import Pagination from './Pagination'
import { paginate } from '../utils/paginate'
import Preloader from './ui/preloader'
import Button from './ui/Button'
import PagePreloader from './ui/pagePreloader'

const UsersList = () => {
    const pageSize = 4
    const defaultFilteredProfessionId = null
    const defaultSearchedUsersName = ''
    const defaultCurrentFilter = null
    const defaultSortParams = [NAME, DESC]
    const invertedSortParams = [BOOKMARK]

    const [allUsers, setAllUsers] = useState([])
    const [dataIsLoaded, setDataIsLoaded] = useState(false)

    const [professions, setProfessions] = useState({})
    const [users, setUsers] = useState([])
    const [usersOfCurrentPage, setUsersOfCurrentPage] = useState([])
    const [filteredProfessionId, setFilteredProfessionId] = useState(defaultFilteredProfessionId)
    const [searchedUsersName, setSearchedUsersName] = useState(defaultSearchedUsersName)
    const [currentFilter, setCurrentFilter] = useState(defaultCurrentFilter)
    const [sortParams, setSortParams] = useState(defaultSortParams)
    const [currentPage, setCurrentPage] = useState(1)

    // инициируем подгрузку данных
    useEffect(() => {
        void getProfessions()
        void getData()
    }, [])

    // получаем пользователей
    const getData = async() => {
        try {
            const data = await api.users.fetchAll()
            setAllUsers(data)
            setDataIsLoaded(true)
        } catch (e) {
            console.log(e)
        }
    }

    // получаем профессии
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
    // этот useEffect сортирует юзеров при обновлении всех юзеров, их изменении (например добавление в закладки) и поиске
    useEffect(() => {
        searchUsers(allUsers)
        handleSortUsers()
    }, [allUsers])

    // этот useEffect сортирует юзеров при изменении фильтра
    useEffect(() => {
        if (currentFilter !== USERS_PROFESSION) {
            return
        }
        setSearchedUsersName(defaultSearchedUsersName)
        filterUsers(allUsers)
        clearSort()
    }, [filteredProfessionId])

    const filterUsers = (data) => {
        let users = data
        setCurrentFilter(defaultCurrentFilter)
        if (filteredProfessionId !== defaultFilteredProfessionId) {
            users = users.filter(user => user.profession._id === filteredProfessionId)
            setCurrentFilter(USERS_PROFESSION)
        }
        setUsers(users)
    }

    // строка поиска
    useEffect(() => {
        if (currentFilter !== USERS_SEARCH) {
            return
        }
        setFilteredProfessionId(defaultFilteredProfessionId)
        searchUsers(allUsers)
        handleSortUsers()
    }, [searchedUsersName])

    const searchUsers = (data) => {
        let users = data
        setCurrentFilter(defaultCurrentFilter)
        if (searchedUsersName) {
            users = users.filter((user) => user.name.toLowerCase().includes(searchedUsersName.trim().toLowerCase()))
            setCurrentFilter(USERS_SEARCH)
        }
        setUsers(users)
    }

    // сортировка юзеров
    useEffect(() => {
        handleSortUsers()
    }, [sortParams])

    const handleSortUsers = () => {
        if (!sortParams[0]) {
            return
        }
        setUsers(prevState => _.orderBy(prevState, sortParams[0], sortParams[1] === ASC ? DESC : ASC))
    }

    const clearSort = () => {
        setSortParams(defaultSortParams)
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
        setCurrentFilter(USERS_PROFESSION)
        setCurrentPage(1)
    }

    // обработчик поиска
    const handleSearchProfession = (e) => {
        const userName = e.target.value
        setSearchedUsersName(userName)
        setCurrentFilter(USERS_SEARCH)

        setCurrentPage(1)
    }

    // обработчик пагинации - смена страницы
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    // обработчик добавления/удаления закладок
    const bookmarkHandler = (id) => {
        setAllUsers((prevState) => (
            prevState.map((user) => user._id === id ? { ...user, bookmark: !user.bookmark } : user)
        ))
    }

    // обработчик удаления пользователей
    const deleteUser = (deletedUser) => {
        const newUsersList = allUsers?.filter((user) => user._id !== deletedUser._id)
        setAllUsers(() => (newUsersList))
    }

    // сброс фильтров
    const cancelFilters = () => {
        setFilteredProfessionId(null)
        setSearchedUsersName('')
    }

    return (
        dataIsLoaded ? (
            <div className="users d-flex flex-column" style={{ width: 'fit-content' }}>
                {allUsers?.length ? (
                    <h1 className="badge bg-primary fs-3" style={{ width: 'fit-content' }}>
                        {`${users?.length} человек с тобой тусанёт сегодня`}
                    </h1>
                ) : (
                    <h1 className="badge bg-danger fs-3" style={{ width: 'fit-content' }}>
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
                            <Button value={'Сброс'} onClick={cancelFilters} className={'btn-secondary mt-1'} />
                        </div>
                    ) : allUsers?.length ? (
                        <Preloader />
                    ) : (
                        ''
                    )}
                    {allUsers.length ? (
                        <div className="d-flex flex-column">
                            <InputSearch value={searchedUsersName} placeholder={'Введите имя'} onChange={(e) => handleSearchProfession(e)} />
                            <UsersTable
                                users={usersOfCurrentPage}
                                currentSort={sortParams}
                                refreshSortState={setSortParams}
                                {...{ deleteUser, bookmarkHandler, invertedSortParams }}
                            />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <Pagination
                    current={currentPage}
                    itemsCount={users.length}
                    {...{ pageSize, handlePageChange }}
                />
            </div>
        ) : (
            <PagePreloader/>
        )
    )
}

export default UsersList
