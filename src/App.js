import Nav from './components/Nav'
import Footer from './components/Footer'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Profile from './pages/Profile'
import { Route, Switch } from 'react-router-dom'
import './App.css';

function App() {
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
            <Profile/>
          </Route>
        </Switch>
     </main>
     <Footer/>
    </div>
  );
}

export default App;
