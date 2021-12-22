import React from 'react'
import Auth from './components/Auth';
import Header from './components/Header';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 
import Start from './components/Start.js';
import CreateRoom from './components/CreateRoom';
import AddFiles from './components/AddFiles';
import { useState } from 'react';
import MainPage from './components/MainPage';
import { MovieProvider } from './components/MovieContext';
function App() {
  
  return (
   
    <Router>
    <MovieProvider >

   
        <div className="App">
       <Header />
      <div className='content'>
      <Switch>
        <Route exact path ="/">
        <Start />
        
        </Route>
        <Route  path ="/Auth">
        <Auth />
        </Route>
        <Route  path ="/CreateRoom">
        <CreateRoom  />
        </Route>
        <Route  path ="/AddFiles">
        <AddFiles />
        </Route>
        <Route  path ="/MainPage">
        <MainPage />
        </Route>
      </Switch>

     
      </div>
    
    </div>
    </MovieProvider>
    </Router>
   

  );
}

export default App;
