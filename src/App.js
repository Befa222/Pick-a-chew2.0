import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './routes/Home';
import Ingredients from './routes/Ingredients';
import Receipes from './routes/Receipes';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/Ingredients' exact component={Ingredients}/>
        <Route path='/Receipes' exact component={Receipes}/>
      </Switch>
    </Router>
  );
}

export default App;
