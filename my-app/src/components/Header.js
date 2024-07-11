import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = ({ loggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Company Logo</Navbar.Brand>
      <Nav className="ml-auto">
        {loggedIn && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
      </Nav>
    </Navbar>
  );
};

export default Header;
