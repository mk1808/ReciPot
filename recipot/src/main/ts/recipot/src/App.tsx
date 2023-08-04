import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import Button from 'react-bootstrap/Button';
import restClient from './api/RestClient';
import recipesApi from './api/RecipesApi';
import authApi from './api/AuthApi';

function App() {

  useEffect(()=>{
    authApi.login({username:"randomuser1234567",password:"Password1!"}, ()=>{}, ()=>{})
   
  },[])

  const send=()=>{
 recipesApi.getRecipe('14e1ea5f-b236-4f4a-b3ab-cdc6b7b93562', ()=>{})
  }

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
      {process.env.REACT_APP_URL}
 
          Learn React
         
        </a>
        <Button variant="primary" onClick={send}>Primary</Button>{' '}
      </header>
    </div>
  );
}
   /*  {RestClient()}*/
export default App;
