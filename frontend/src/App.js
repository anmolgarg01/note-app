import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Main from './components/main/Main';
import Dashboard from './components/dashboard/Dashboard';
import {UserProvider} from './UserProvider';

function App() {
  return (
    <UserProvider>
      <div className="container">
        <h1>Note App</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/*" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
