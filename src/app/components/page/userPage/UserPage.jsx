import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import api from '../../../api'
import PagePreloader from '../../common/pagePreloader'
import PropTypes from 'prop-types'
import { CardBody } from '../../ui/UserPage'
import WrapperPage from '../../ui/UserPage/WrapperPage'
import LeftBar from '../../ui/UserPage/LeftBar'
import Qualities from '../../ui/UserPage/Qualities'
import UserPageMeetings from '../../ui/UserPage/Metings'
import Content from '../../ui/UserPage/Content'
import NewComment from '../../ui/UserPage/NewComment'
import CommentsWall from '../../ui/UserPage/CommentsWall'

const UserPage = ({ id }) => {
    const [user, setUser] = useState({})
    const [comments, setComments] = useState([])
    const history = useHistory()
    const { pathname } = useLocation()
    const rateStep = 0.5

    useEffect(() => {
        getUsers()
        getComments()
    }, [])

    const getUsers = () => {
        api.users
            .getById(id)
            .then((data) => setUser(data !== undefined ? data : {}))
            .catch((e) => console.log(e))
    }

    const getComments = () => {
        api.comments.fetchCommentsForUser(id).then((res) => setComments(res))
    }

    const handleDelete = (id) => {
        setComments((prevState) =>
            prevState.filter((comment) => comment._id !== id)
        )
        void api.comments.remove(id)
    }

    const refreshCommentsAfterAdd = (data) => {
        setComments((prevState) => [...prevState, data])
    }

    const goToUsers = () => {
        history.push(`${pathname}/edit`)
    }

    const getNewRate = (value, prevState) => {
        let newRate = value ? prevState.rate + rateStep : prevState.rate - rateStep
        newRate = newRate <= 0 ? 0 : newRate
        newRate = newRate >= 5 ? 5 : newRate
        return newRate
    }

    const changeRate = (value) => {
        setUser((prevState) => {
            return {
                ...prevState,
                rate: getNewRate(value, prevState)
            }
        })
    }

    useEffect(() => {
        void updateData(id, user)
    }, [user.rate])

    const updateData = (id, data) => {
        void api.users.update(id, data)
    }

    return Object.keys(user).length ? (
        <WrapperPage>
            <LeftBar>
                <CardBody
                    name={user.name}
                    profession={user.profession.name}
                    rate={user.rate}
                    onRate={changeRate}
                    onClick={goToUsers}
                />
                <Qualities qualitiesArray={user.qualities} />
                <UserPageMeetings count={user.completedMeetings} />
            </LeftBar>
            <Content>
                <NewComment id={id} refreshComments={refreshCommentsAfterAdd} />
                <CommentsWall data={comments} onDelete={handleDelete} />
            </Content>
        </WrapperPage>
    ) : (
        <div>
            <PagePreloader />
        </div>
    )
}

UserPage.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default UserPage
