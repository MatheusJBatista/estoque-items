import React, { Component } from 'react';
import './app.css';
import './Components/sideBar.css';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import SideBar from './Components/SideBar';
import Home from './Components/Home';
import Login from './Components/Login';
import NotFound from './Components/NotFound';
import Logout from './Components/Logout';
import Auth from './Components/Auth';

import authUser from './utils/authUser';
import { getAuth } from './utils/localStorage';
import API from './utils/API';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      openedNav:true,
      usuario: false,
      redirectToAuth: false,
      produtos: []
    }

    this.closeNav = this.closeNav.bind(this);
    this.mobile = this.mobile.bind(this);
    this.deleteProdutos = this.deleteProdutos.bind(this);
  }

  componentWillMount(){
    
    API.get('/produto')
      .then(produtos => {
        this.setState({
          produtos: produtos.data
        })
      })
      
    
    if (getAuth() === 'true' && !authUser.auth) {
      this.setState({
        redirectToAuth: true
      })
    }
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

  deleteProdutos(produtos) {
    produtos.map(produtoDelete => (
      this.setState(prevState => ({
        produtos: prevState.produtos.filter(produtoFiltro => produtoFiltro._id !== produtoDelete._id)
      }))
    ))
  }

  render() {
    // if (this.state.redirectToAuth) {
    //   return (
    //     <Router>
    //       <Redirect to={{pathname:'/auth'}} />
    //     </Router>
    //   )
    // }
    return (
      <Router>
        <>
          {/*Verificar por sessao antes de iniciar a pagina*/}
          {this.state.redirectToAuth ? <Auth usuario={this.state.usuario} /> : <></>}
          {this.state.openedNav ? <SideBar produtos={this.state.produtos} deleteProdutos = {this.deleteProdutos}/> : '' }
          {/*Caso a navbar não estiver ativa, vai ser colocado a menu de ação antes do container*/}
          {!this.state.openedNav ? (
            <div className="toggleNav">
              <img src="http://www.marbleroomcle.com/wp-content/themes/marbleroomcle/images/menu-icon.png" width="50px" onClick={this.closeNav} alt="toggle sidebar"></img>
            </div>
          ) : '' }
          <div className={this.state.openedNav ? 'openedNav' : 'container'}>
            {/*O menu se repete aqui, porque se a navbar estiver fechada, não ira aparecer nada*/}
            {this.state.openedNav ? (
              <div className="toggleNav">
                <img src="http://www.marbleroomcle.com/wp-content/themes/marbleroomcle/images/menu-icon.png" width="50px" onClick={this.closeNav} alt="toggle sidebar"></img>
              </div>
            ) : '' }
            <div className="col-md-12 home">
              <Switch>
                <Route exact path="/" render={(props) => (
                    <Home
                      produtos={this.state.produtos}
                      mobile = {this.mobile}
                      />
                  )}
                />
                <Route exact path="/login" render={(props) => (
                    <Login 
                      loged={authUser.auth}
                      />
                  )} 
                />

                <Route exact path='/logout' component={Logout} />

                <Route exact path='/produto/:id' component={(props)=> {
                  let id = props.location.pathname.replace('/produto/', '');
                  return(
                    <Home 
                      produtos={this.state.produtos.filter(produto => produto._id === id)}
                      mobile={this.mobile}
                    />
                  )
                }} />

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
