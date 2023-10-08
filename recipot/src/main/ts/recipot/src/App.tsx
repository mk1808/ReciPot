import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
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
import { UserContextProvider, UsersContext, UsersDispatchContext } from './context/UserContext';
import Test from './pages/other/test/Test';
import UserDetails from './pages/user/UserDetails';
import AlertContextProvider from './context/AlertContext';
import ProtectedRoute from './config/ProtectedRoute';
import { EnumDictionaryContextProvider } from './context/EnumDictionaryContext';
import RecipeEdit from './pages/recipe/edit/RecipeEdit';

function App() {
  const usersDispatchContext = useContext(UsersDispatchContext);

  useEffect(() => {
    usersDispatchContext(
      { type: "refresh" }
    )
    //authApi.login({ username: "randomuser1234567", password: "Password1!" }, () => { }, () => { })
  }, [])

  const routes = () => {
    return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes/filter" element={<RecipeFilter />} />
        <Route path="/recipes/add" element={
          <ProtectedRoute element={<RecipeAdd />} />}
        />
        <Route path="/recipes/edit/:id" element={
          <ProtectedRoute element={<RecipeEdit />} />}
        />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/recipeCollections" element={
          <ProtectedRoute element={<RecipeCollectionList />} />}
        />
        <Route path="/user" element={
          <ProtectedRoute element={<UserDetails />} />}
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
        <Header/>
        <div className="main">
          {routes()}
        </div>
        <Footer/>
      </div>
    )
  }
  return (
    <EnumDictionaryContextProvider>
      <AlertContextProvider>
        <UserContextProvider>
          {renderApp()}
        </UserContextProvider>
      </AlertContextProvider>
    </EnumDictionaryContextProvider>
  );
}
export default App;
