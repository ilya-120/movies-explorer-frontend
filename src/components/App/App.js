import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import './App.css';

function App() {
  return (
    <div className="root">
      <Routes>
        <>
          <Route path="/signup"
            element={
              <Register
                userName={'Виталий'}
                email={'pochta@yandex.ru'} />
            } />
          <Route path="/signin"
            element={
              <Login
                email={'pochta@yandex.ru'} />
            } />
          <Route path="/"
            element={
              <Main loggedIn={false} />
            } />
          <Route path="*"
            element={
              <NotFound />
            } />
        </>
      </Routes>
    </div>
  );
}

export default App;
