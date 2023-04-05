import {useEffect, useState} from 'react'

import User from "./User";

const Users = ({users, deleteUser, bookmarkHandler}) => {
    return (
        <div className="users">
            {users?.length
                ? <h1 className="badge bg-primary fs-3">{`${users?.length} человек с тобой тусанёт сегодня`}</h1>
                : <h1 className="badge bg-danger fs-3">Никто с тобой не тусанёт</h1>
            }
            {users?.length ?
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user =>
                            <User key={`user_${user._id}`} data={user} deleteUser={deleteUser} bookmarkHandler={bookmarkHandler}/>
                        )}
                    </tbody>
                </table>
            : ''}
        </div>
    );
};

export default Users;