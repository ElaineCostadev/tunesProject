import React from 'react';
import { Route, Switch /* Link */ } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
/* import Loading from './components/Loading';
import { Redirect } from 'react-router-dom'; */

class App extends React.Component {
  render() {
    return (
      <main>

        <p>TrybeTunes App</p>

        <div>
          <Switch>
            <Route path="/search" component={ Search } />
            <Route path="/album/:id" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route path="/profile" component={ Profile } />
            <Route exact path="/" component={ Login } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </div>

      </main>
    );
  }
}

export default App;

/* window.onload = async () => {
  // funcoes aqui
} */
