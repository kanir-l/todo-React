import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Todos } from './components/Todos';


function App() {
  return (
    <div className="app-container">
       <Header></Header>
       <Router>
         <Switch>
           <Route>
             <Todos></Todos>
           </Route>
         </Switch>
       </Router>
    </div>
  );
}

export default App;
