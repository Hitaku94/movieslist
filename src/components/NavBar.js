import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';

function NavBar() {
    return (
        <div>
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">IronMovies</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
        </div>
    )
}

export default NavBar