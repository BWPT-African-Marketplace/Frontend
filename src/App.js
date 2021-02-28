import Data from './components/DummyData'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Profile from './pages/Profile'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import { useState } from 'react'

function App() {
  const [dumbData] = useState(Data)
  return (
    <div className="App">
     <Nav/>
     <main>
        <Switch>
          <Route path='/signup'>
            <SignUp/>
          </Route>
          <Route path='/login'>
            <LogIn/>
          </Route>
          <Route path='/profile'>
            <Profile data = {dumbData}/>
          </Route>
          <Route path='/'>
            <Home data = {dumbData}/>
          </Route>
        </Switch>
     </main>
     <Footer/>
    </div>
  );
}

export default App;
