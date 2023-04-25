import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MAIN, LOGIN, USERS, USER_ID, NOT_FOUND, TYPE } from './routesVariables'
import Main from '../layouts/Main'
import Login from '../layouts/Login'
import Users from '../layouts/Users'
import NotFound from '../layouts/NotFound'

const AppRoutes = () => {
    return (
        <Switch>
            <Route path={MAIN} component={Main} />
            <Route path={`${LOGIN}/:${TYPE}?`} component={Login} />
            <Route path={`${USERS}/:${USER_ID}?/:users3?`} component={Users} />
            <Route path={NOT_FOUND} component={NotFound} />
            <Redirect from="/" to={USERS} exact></Redirect>
            <Redirect to={NOT_FOUND} />
        </Switch>
    )
}

export default AppRoutes
