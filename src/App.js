// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Login from './components/Login';
import ActivityRegister from './components/ActivityRegister';
import ActivityHistory from './components/ActivityHistory';
import ActivityStats from './components/ActivityStats';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Actividad App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Registrar Actividad</Nav.Link>
            <Nav.Link as={Link} to="/history">Historial</Nav.Link>
            <Nav.Link as={Link} to="/stats">Estadísticas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <ActivityRegister />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <ActivityHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <PrivateRoute>
              <ActivityStats />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
