import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MAIN, LOGIN, USERS } from '../routes/routesVariables'

const NavBar = () => {
    const url = useLocation()
    const path = `/${url.pathname.split('/')[1]}`

    const data = [
        { path: MAIN, value: 'Main' },
        { path: LOGIN, value: 'Login' },
        { path: USERS, value: 'Users' }
    ]

    return (
        <ul className="nav nav-pills mb-1">
            {data.map(item => (
                <li key={`nav_${item.path}`} className="nav-item">
                    <Link to={item.path} className={`nav-link ${item.path === path ? 'active' : ''}`} aria-current="true">{item.value}</Link>
                </li>
            ))}
        </ul>
    )
}

export default NavBar
