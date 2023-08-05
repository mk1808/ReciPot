import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';
import Button from 'react-bootstrap/Button';
import restClient from './api/RestClient';
import recipesApi from './api/RecipesApi';
import authApi from './api/AuthApi';
import Main from './pages/main/Main';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import NotFound from './pages/other/notFound/NotFound';
import RecipeDetails from './pages/recipe/details/RecipeDetails';
import RecipeAdd from './pages/recipe/add/RecipeAdd';


function App() {

  useEffect(() => {
    authApi.login({ username: "randomuser1234567", password: "Password1!" }, () => { }, () => { })

  }, [])

  const send = () => {
    recipesApi.getRecipe('14e1ea5f-b236-4f4a-b3ab-cdc6b7b93562', () => { })
  }
  const hasAccess=true;




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >


          Learn React

        </a>
        <Button variant="primary" onClick={send}>Primary</Button>{' '}
      </header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes/add" element={<RecipeAdd />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>




    </div>
  );
}
export default App;
