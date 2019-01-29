import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';
import authUser from '../utils/authUser';

class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      redirect: false
    }
  }

  componentWillMount(){
    API.get('/usuario')
    .then(usuario => {
      authUser.auth = true;
      authUser.usuario = usuario.data;
      this.setState({
        redirect:true
      })
    })
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to={{pathname:'/'}} />
    }

    return(
      <button>Login</button>
    )
  }
}

export default Login;
