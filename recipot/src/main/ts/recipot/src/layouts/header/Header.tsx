import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { GiCookingPot } from 'react-icons/gi';
import { useTranslation } from "react-i18next";
import NotificationManager from './components/NotificationManager';
import { UserContext } from '../../context/UserContext';
import { AppUser } from '../../data/types';

function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const { t } = useTranslation();
  const user = useContext(UserContext).user;
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Recipot</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        {renderCollapse()}
      </Container>
    </Navbar>
  );

  function renderCollapse() {
    return (
      <Navbar.Collapse id="navbarScroll" className="justify-content-end">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <GiCookingPot className='fs-4' />
        </Nav>
        {renderRightSide()}
      </Navbar.Collapse>
    )
  }

  function renderRightSide() {
    return (
      <Nav>
        <Nav.Link as={NavLink} to='/' >{t('p.main')}</Nav.Link>
        <Nav.Link as={NavLink} to="/recipes/filter">{t('p.search')}</Nav.Link>
        {isLogged &&
          <>
            <Nav.Link as={NavLink} to="/recipes/add">{t('p.addRecipe')}</Nav.Link>
            <Nav.Link as={NavLink} to="/recipeCollections">{t('p.collections')}</Nav.Link>
          </>
        }
        <NavDropdown title={t('p.account') + user?.login} id="navbarScrollingDropdown" align="end">
          {!isLogged &&
            <>
              <NavDropdown.Item as={NavLink} to="/login">{t('p.login')}</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/register">{t('p.register')}</NavDropdown.Item>
            </>
          }
          {isLogged &&
            <>
              <NavDropdown.Item as={NavLink} to="/user">{t('p.myAccount')}</NavDropdown.Item>
              <NavDropdown.Item as={Button} >{t('p.logout')}</NavDropdown.Item>
            </>
          }
        </NavDropdown>
        {isLogged && <NotificationManager />}
      </Nav>
    )
  }
}

export default Header;