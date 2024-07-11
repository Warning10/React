import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import AddEditAppointment from './components/AddEditAppointment';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Header loggedIn={!!user} onLogout={handleLogout} />
      <div className="container mt-5">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-appointment" element={<AddEditAppointment />} />
          <Route path="/edit-appointment/:id" element={<AddEditAppointment />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
