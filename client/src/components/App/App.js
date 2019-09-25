import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import './App.css'
// import API from '../../lib/API'
import store from '../../store'
import TokenStore from '../../lib/TokenStore'
import AuthContext from '../../contexts/AuthContext'
import Navigation from '../Navigation'
import SideNav from '../SideNav'
import PrivateRoute from '../PrivateRoute'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import Secret from '../../pages/Secret'
import Genres from '../../pages/Genres'
import SearchResults from '../../pages/SearchResults'
import Details from '../../pages/Details'
import NotFound from '../../pages/NotFound'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      auth: {
        user: undefined,
        authToken: TokenStore.getToken(),
        onLogin: this.handleLogin,
        onLogout: this.handleLogout
      }
    }

    this.handleLogin = (user, authToken) => {
      TokenStore.setToken(authToken)
      this.setState(prevState => ({ auth: { ...prevState.auth, user, authToken } }))
    }

    this.handleLogout = () => {
      TokenStore.clearToken()
      this.setState(prevState => ({ auth: { ...prevState.auth, user: undefined, authToken: undefined } }))
    }
  }

  // componentDidMount() {
  //   const { authToken } = this.state.auth
  //   if (!authToken) return

  //   API.Users.getMe(authToken)
  //     .then(response => response.data)
  //     .then(user => this.setState(prevState => ({ auth: { ...prevState.auth, user } })))
  //     .catch(err => console.log(err))
  // }

  render() {
    return (
      <AuthContext.Provider value={this.state.auth}>
        <Provider store={store}>
          <div className='App'>
            <Navigation />
            <SideNav />
            <div id="app-body">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/genres' component={Genres} />
                <Route path='/results' component={SearchResults} />
                <Route path='/details' component={Details} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <PrivateRoute path='/secret' component={Secret} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Provider>
      </AuthContext.Provider>
    )
  }
}

export default App
