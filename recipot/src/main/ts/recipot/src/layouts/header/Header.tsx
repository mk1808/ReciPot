import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

function Header() {
  const [isLogged, setIsLogged] = useState(true);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Recipot</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to='/' >Strona główna</Nav.Link>
            <Nav.Link as={NavLink} to="/recipes/filter">Szukaj przepisów</Nav.Link>
            {isLogged &&
              <>
                <Nav.Link as={NavLink} to="/recipes/add">Dodaj przepis</Nav.Link>
                <Nav.Link as={NavLink} to="/recipeCollections">Kolekcje</Nav.Link>
                <Nav.Link as={NavLink} to="/recipes/filter">Powiadomienia</Nav.Link>
              </>
            }
            <NavDropdown title="Konto" id="navbarScrollingDropdown" align="end">
              {!isLogged &&
                <>
                  <NavDropdown.Item as={NavLink} to="/login">Zaloguj</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/register">Zarejestruj</NavDropdown.Item>
                </>
              }
              {isLogged && <>
                <NavDropdown.Item as={NavLink} to="/user">Moje konto</NavDropdown.Item>
                <NavDropdown.Item as={Button} >Wyloguj2</NavDropdown.Item>
              </>
              }
            </NavDropdown>
          </Nav>


          {/*  <Nav.Link href="#" disabled>
              Link
  </Nav.Link>*/}

          {/*   <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>*/}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;