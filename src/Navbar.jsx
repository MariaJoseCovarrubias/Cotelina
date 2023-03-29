import React from 'react';
import {
    Nav, Navbar, Container
  } from 'react-bootstrap';

function BasicExample() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Cotelina Restaurant</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Menu</Nav.Link>
            <Nav.Link href="/courses">Platos</Nav.Link>
            <Nav.Link href="/ingredients">Ingredientes</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;