import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';
import authUser from '../utils/authUser';

export default class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }
  }

  componentWillMount() {
    authUser.auth = false;
    API.get('/usuario/logout')
      .then(logout => this.setState({
        redirect: true
      }) )
  }

  render() {
    if (this.state.redirect) {
      return <Redirect from={`{pathname: ${this.props.location}}`} to={{pathname: '/'}} />
    }
    return <h1>Aguarde...</h1>
  }
}
