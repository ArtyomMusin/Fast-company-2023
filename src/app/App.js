import React from 'react'
import NavBar from './components/NavBar'
import AppRoutes from './routes/appRoutes'

const App = () => {
    return (
        <div className="App p-3 pt-1">
            <NavBar />
            <AppRoutes />
        </div>
    )
}

export default App
