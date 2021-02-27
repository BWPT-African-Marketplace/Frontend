import Nav from './components/Nav'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import Profile from './components/Profile'
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
    </div>
  );
}

export default App;
