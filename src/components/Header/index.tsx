import React from 'react';
import {Link} from 'react-router-dom';
import { Nav, Navbar} from 'react-bootstrap';

// import { Container } from './styles';

const Header: React.FC = () => {
  return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Jenniffer - Tasks </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Item as={Link} className="nav-link" to="/">Início</Nav.Item>
            <Nav.Item as={Link} className="nav-link" to="/tarefas">Tarefas</Nav.Item>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;