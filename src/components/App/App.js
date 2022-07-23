import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import './App.css';

function App() {
  return (
    <div className="root">
      <Routes>
        <>
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
