import { FC } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from '../header/Header'
import Role from '../role/Role'
import Patient from '../patient/Patient'
import Auth from '../auth/Auth'
import Archive from '../archive/Archive'
import Admin from '../admin/Admin'

const App: FC = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<Role />} />
                <Route path='/create-application' element={<Patient />} />
                <Route path='/auth-admin' element={<Auth />} />
                <Route path='/admin-panel' element={<Admin />} />
                <Route path='/archive-applications' element={<Archive />} />
            </Routes>
        </Router>
    )
}

export default App
