import React from 'react';
import { Link, Routes, Route } from "react-router-dom";

import AddUser from './views/add-user/AddUser';
import Note from './views/note/Note';
import {UserContext} from '../../UserProvider';

class Dashboard extends React.Component {

  static contextType = UserContext;

  render () {
    if(!this.context[0].logging_in){
      const email = this.context[0].email;
      if(!email){
        window.location.replace("/");
      }
    }

    const isSuperAdmin = this.context[0].is_super_admin;
    let add_user;
    if (!isSuperAdmin) {
      add_user = <></>;
    } else {
      add_user = <Link className="nav-link" to="add-user">Add User</Link>;
    }
    return(
      <div>
        <h1>Dashboard</h1>
        <nav className="nav">
          {add_user}
          <Link className="nav-link" to="note">Note</Link>
        </nav>
        <Routes>
          <Route path="add-user" element={<AddUser />} />
          <Route path="note" element={<Note />} />
        </Routes>
      </div>
    )
  }
}

export default Dashboard;
