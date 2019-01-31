import React, { Component } from 'react';
import './app.css';
import './Components/sideBar.css';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import SideBar from './Components/SideBar';
import Home from './Components/Home';
import Login from './Components/Login';
import NotFound from './Components/NotFound';
import Logout from './Components/Logout';

import API from './utils/API';
import authUser from './utils/authUser';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      openedNav:true,
      usuario: false
    }

    this.closeNav = this.closeNav.bind(this);
    this.mobile = this.mobile.bind(this);
  }

  componentWillMount(){
    API.get('/usuario/login')
    .then(usuario => {
      if (usuario.data) {
        authUser.auth = true;
        authUser.usuario = usuario.data;
        this.setState({
          usuario:true
        })
      }
    })
    .catch(erro => {
      console.log(erro);
    })
  }

  closeNav(){
    this.setState(prevState => ({
      openedNav: !prevState.openedNav
    }))
  }

  mobile(){
    this.setState({
      openedNav:false
    })
  }

  render() {
    return (
      <Router>
        <>
          {this.state.openedNav ? <SideBar /> : '' }
          {!this.state.openedNav ? (
            <div className="toggleNav">
              <img src="http://www.marbleroomcle.com/wp-content/themes/marbleroomcle/images/menu-icon.png" width="50px" onClick={this.closeNav} alt="toggle sidebar"></img>
            </div>
          ) : '' }
          <div className={this.state.openedNav ? 'openedNav' : 'container'}>
            {this.state.openedNav ? (
              <div className="toggleNav">
                <img src="http://www.marbleroomcle.com/wp-content/themes/marbleroomcle/images/menu-icon.png" width="50px" onClick={this.closeNav} alt="toggle sidebar"></img>
              </div>
            ) : '' }
            <div className="col-md-12 home">
              <Switch>
                <Route exact path="/" render={(props) => (
                    <Home
                      mobile = {this.mobile}
                      />
                  )}
                />
                <Route exact path='/logout' component={Logout} />
                <Route exact path="/login" render={(props) => (
                    <Login loged={authUser.auth}/>
                  )} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </>
      </Router>
    );
  }
}

export default App;
