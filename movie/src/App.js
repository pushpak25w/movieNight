import React from 'react'
import Auth from './components/Auth';
import Header from './components/Header';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 
import Start from './components/Start.js';
function App() {
  return (
    <Router>
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

      </Switch>

     
      </div>
    
    {/* <Auth /> */}
    </div>
    </Router>
   

  );
}

export default App;
