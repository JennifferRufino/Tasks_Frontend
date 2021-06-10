import React from 'react';
import {Switch, Route} from 'react-router-dom';

// import { Container } from './styles';

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Form from './pages/Tasks/Form';
import Details from './pages/Tasks/Details';

const Routes: React.FC = () => {
  return (
      <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/tarefas" exact component={Tasks}/>
          <Route path="/tarefas_cadastro" exact component={Form} />
          <Route path="/tarefas_cadastro/:id" exact component={Form} />
          <Route path="/tarefas/:id" exact component={Details} />
      </Switch>
  )
}

export default Routes;