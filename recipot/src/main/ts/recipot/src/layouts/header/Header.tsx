import { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { GiCookingPot } from 'react-icons/gi';
import { useTranslation } from "react-i18next";
import NotificationManager from './components/NotificationManager';
import { UsersContext, UsersDispatchContext } from '../../context/UserContext';
import { AppUser } from '../../data/types';
import recipotIcon from '../../assets/images/logo2.png';

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useContext(UsersContext).user;
  const usersDispatchContext = useContext(UsersDispatchContext);
  const isLogged = () => { return user != null }

  useEffect(() => {
    usersDispatchContext(
      { type: "refresh" }
    )
  }, [])
  function onLogout() {
    usersDispatchContext({ type: "logout" })
    gotToMainPage();
  }
  function getUserName() {
    return user ? ` ${user.login}` : ""
  }

  function gotToMainPage() {
    navigate("");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary" >
      <Container fluid>
        {renderRecipotLogo()}
        {renderNotifications()}
        <Navbar.Toggle aria-controls="navbarScroll" />
        {renderCollapse()}
      </Container>
    </Navbar>
  );

  function renderRecipotLogo() {
    return (
      <>
        <Navbar.Brand href="#" onClick={gotToMainPage}></Navbar.Brand>
        <Nav
          className="me-auto my-2 my-lg-0 cursor-pointer"
          style={{ maxHeight: '100px' }}
          navbarScroll
          onClick={gotToMainPage}
        >
          <img src={recipotIcon} alt="Recipot logo" height={45} />
        </Nav>
      </>
    );
  }

  function renderCollapse() {
    return (
      <Navbar.Collapse id="navbarScroll" className="justify-content-end">
        {renderRightSide()}
      </Navbar.Collapse>
    )
  }

  function renderRightSide() {
    return (
      <Nav>
        <Nav.Link as={NavLink} to='/' >{t('p.main')}</Nav.Link>
        <Nav.Link as={NavLink} to="/recipes/filter">{t('p.search')}</Nav.Link>
        {isLogged() &&
          <>
            <Nav.Link as={NavLink} to="/recipes/add">{t('p.addRecipe')}</Nav.Link>
            <Nav.Link as={NavLink} to="/recipeCollections">{t('p.collections')}</Nav.Link>
          </>
        }
        <NavDropdown title={t('p.account') + getUserName()} id="navbarScrollingDropdown" align="end">
          {!isLogged() &&
            <>
              <NavDropdown.Item as={NavLink} to="/login">{t('p.login')}</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/register">{t('p.register')}</NavDropdown.Item>
            </>
          }
          {isLogged() &&
            <>
              <NavDropdown.Item as={NavLink} to="/user">{t('p.myAccount')}</NavDropdown.Item>
              <NavDropdown.Item as={Button} onClick={onLogout}>{t('p.logout')}</NavDropdown.Item>
            </>
          }
        </NavDropdown>
      </Nav>
    )
  }

  function renderNotifications() {
    return isLogged() && <div className='mx-3'><NotificationManager /></div>
  }
}

export default Header;