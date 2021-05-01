import { Route, Routes } from 'react-router-dom'
import Helmet from 'react-helmet'

import Home from '@/pages/Home'
import AboutUs from '@/pages/AboutUs'
import Explore from '@/pages/explore/Explore'
import TellerProfile from '@/pages/tellers/TellerProfile'

// Authentication
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Admin
import AdminDashBoard from './pages/admin/dashboard'

// Admin -> User
import UserMan from './pages/admin/users'
import UserForm from './pages/admin/users/userForm'

const App = () => {
  return (
    <>
      <Helmet
        titleTemplate="%s | HolyFans"
        defaultTitle="HolyFans | Design your best fortune"
      ></Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="aboutus/" element={<AboutUs />} />
        <Route path="explore/" element={<Explore />} />
        <Route path="tellers/*">
          <Route path=":tellerId" element={<TellerProfile />} />
        </Route>
        <Route path="auth/*">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="admin/*">
          <Route path="" element={<AdminDashBoard />} />
          <Route path="users/*">
            <Route path="" element={<UserMan />} />
            <Route path="add" element={<UserForm />} />
            <Route path="edit/:userId" element={<UserForm edit />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
