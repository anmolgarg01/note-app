import React from 'react';
import { Link, Routes, Route } from "react-router-dom";

import Login from './views/Login'
import AddUser from '../dashboard/views/add-user/AddUser'

class Main extends React.Component {
  render () {
    return(
      <div>
        <nav className="nav">
          <Link className="nav-link" to="">Login</Link>
          <Link className="nav-link" to="sign-up">Sign Up</Link>
        </nav>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="sign-up" element={<AddUser />} />
        </Routes>
      </div>
    )
  }
}

export default Main;
