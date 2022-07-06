import React from 'react';
import './App.css';
import { Submit_Page } from './Submit_Page.jsx';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Anotherpage } from './Another-page';
import { Loginpage } from './Loginpage';

function App() {
  return (
    <>
        <Switch>
          <Route exact path="https://pern-app1.herokuapp.com/" component={Loginpage} />
          <Route exact path="https://pern-app1.herokuapp.com/home" component={Submit_Page} />
          <Route exact path="https://pern-app1.herokuapp.com/detail" component={Anotherpage} />
        </Switch>
    </>
  );
}

export default App;
