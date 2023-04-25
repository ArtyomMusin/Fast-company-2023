import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { REGISTER, LOGIN } from '../routes/routesVariables'
import LoginForm from '../components/ui/LoginForm'
import RegisterForm from '../components/ui/RegisterForm'

const Login = () => {
    const { type } = useParams()

    return (
        <div className="container mt-5 ">
            <div className="row col-md-6 offset-md-3 shadow p-4">
                {type === REGISTER ? (
                    <>
                        <h3 className="mb-4">Register</h3>
                        <RegisterForm />
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <p className="mt-3">
                            Already registered? <Link to={LOGIN}>Sign in</Link>
                        </p>
                    </>
                ) : (
                    <>
                        <h3 className="mb-4">Login</h3>
                        <LoginForm />
                        <p className="mt-3">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Haven't account?{' '}
                            <Link to={`${LOGIN}/${REGISTER}`}>Sign up</Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

export default Login
