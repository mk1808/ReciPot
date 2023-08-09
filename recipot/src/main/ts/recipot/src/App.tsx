import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';
import Button from 'react-bootstrap/Button';
import restClient from './api/RestClient';
import recipesApi from './api/RecipesApi';
import authApi from './api/AuthApi';
import Header from './layouts/header/Header';
import Footer from './layouts/footer/Footer';
import Main from './pages/main/Main';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import NotFound from './pages/other/notFound/NotFound';
import RecipeDetails from './pages/recipe/details/RecipeDetails';
import RecipeAdd from './pages/recipe/add/RecipeAdd';
import NoAccess from './pages/other/noAccess/NoAccess';
import RecipeCollectionList from './pages/recipeCollection/list/RecipeCollectionList';
import RecipeFilter from './pages/recipe/filter/RecipeFilter';
import { UserProvider } from './context/UserContext';
import Test from './pages/other/test/Test';
import UserDetails from './pages/user/UserDetails';
import AlertContext from './context/AlertContext';

const ProtectedRoute = ({ user, element }: any) => {
  if (!user) {
    return <Navigate to="/noAccess" replace />;
  }
  return element;
};

function App() {

  useEffect(() => {
    authApi.login({ username: "randomuser1234567", password: "Password1!" }, () => { }, () => { })

  }, [])

  const send = () => {
    recipesApi.getRecipe('14e1ea5f-b236-4f4a-b3ab-cdc6b7b93562', () => { })
  }
  const user = undefined;//{ id: 'abcd' };    undefined;
  const routes = () => {
    return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes/filter" element={<RecipeFilter />} />
        <Route path="/recipes/add" element={
          <ProtectedRoute user={user} element={<RecipeAdd />} />}
        />
        <Route path="/recipes/edit/:id" element={
          <ProtectedRoute user={user} element={<RecipeAdd />} />}
        />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/recipeCollections" element={
          <ProtectedRoute user={user} element={<RecipeCollectionList />} />}
        />
        <Route path="/user" element={
          <ProtectedRoute user={user} element={<UserDetails />} />}
        />
        <Route path="/noAccess" element={<NoAccess />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )

  }

  const renderApp = () => {
    return (
      <div className="App">
        <Header></Header>
        <div className="main">
          {routes()}
        </div>
        <Footer></Footer>
      </div>
    )
  }
  return (
    <AlertContext>
      {renderApp()}
    </AlertContext>
  );
}
export default App;

//AlertContext
