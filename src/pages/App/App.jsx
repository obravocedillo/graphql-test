import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainProvider from '../../context/MainProvider';
import Home from '../Home/Home';
import './App.css';

function App() {
  return (
    <MainProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="*">
            <h1>Not found</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </MainProvider>
  );
}

export default App;
