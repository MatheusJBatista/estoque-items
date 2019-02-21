import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';
import authUser from '../utils/authUser';

import { setAuth, getAuth } from '../utils/localStorage';

import './login.css';

class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      redirect: false,
      login: true,
      erro: []
    }

    this.changeForm = this.changeForm.bind(this);
    this.loginForm = this.loginForm.bind(this);
    this.cadastroForm = this.cadastroForm.bind(this);
    this.cadastrar = this.cadastrar.bind(this);
    this.logar = this.logar.bind(this);
    this.erro = this.erro.bind(this);
  }

  erro(erro) {
    return (
      <div className='alert alert-danger'>
        <h5>Error:</h5>
        <ul>
          {erro.map((msg, i)=> <li key={i}>{msg}</li> )}
        </ul>
      </div>
    )
  }

  loginForm(){
    return(
      <div className="flexLogin">
        <form>
          <div className='logo'>
            <h1>Login</h1>
          </div>
          {this.state.erro[0] ? this.erro(this.state.erro) : ''}
          <input type="text" className="form-control"
            placeholder="Usuario"
            ref={usuario => this._usuario = usuario }></input>
          <input type="text" className="form-control"
            placeholder="Senha"
            ref={senha => this._senha = senha}></input>
          <button className="btn btn-primary" onClick={this.logar}>Login</button>
          <span style={{paddingLeft: '90px'}} onClick={this.changeForm}>Não sou cadastrado</span>
        </form>
      </div>
    )
  }

  changeForm(){
    for (let i = 0; i < document.getElementsByTagName('input').length; i++) {
      document.getElementsByTagName('input')[i].value = ''
    }
    this.setState(prevState => ({
      login: !prevState.login
    }))
  }

  cadastroForm(){
    return(
      <div className="flexLogin">
        <form>
          <div className='logo'>
            <h1>Cadastro</h1>
          </div>
          {this.state.erro[0] ? this.erro(this.state.erro) : ''}
          <input type="text" className="form-control"
            placeholder="Nome completo"
            ref={nome => this._nome = nome}></input>
          <input type="text" className="form-control"
            placeholder="Usuario"
            ref={usuario => this._usuario = usuario}></input>
          <input type="password" className="form-control"
            placeholder="Senha"
            ref={senha => this._senha = senha}></input>
          <button className="btn btn-primary" onClick={this.cadastrar}>Cadastrar</button>
          <span style={{paddingLeft: '80px'}} onClick={this.changeForm}>Já sou cadastrado</span>
        </form>
      </div>
    )
  }

  logar(e){
    e.preventDefault();
    API.post('/usuario/login', {
      usuario: this._usuario.value,
      senha: this._senha.value
    })
    .then(usuario => {
      if (usuario.data[0]) {
        setAuth();
        authUser.auth = true;
        authUser.usuario = usuario.data[0];
        this.setState({
          redirect: true
        })
      }
      else {
        console.log('cai aqui');
        this.setState({
          erro: ['Login/Senha incorreto']
        })
      }
    })
  }

  cadastrar(e){
    e.preventDefault();
    API.post('/usuario/register',{
      nome: this._nome.value,
      senha: this._senha.value,
      usuario: this._usuario.value
    })
    .then(usuario => {
      authUser.auth = true;
      authUser.usuario = usuario.data;
      this.setState({
        redirect: true
      })
    })
    .catch(erro => this.setState({
      erro: ['Usuario já cadastrado']
    }))
  }

  UNSAFE_componentWillMount() {
    if (getAuth() === 'true') {
      this.setState({
        redirect: true
      })
    }
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to={{pathname:'/'}} />
    }

    if (this.state.login) {
      return this.loginForm();
    }

    return this.cadastroForm();
  }
}

export default Login;
