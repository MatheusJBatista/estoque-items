import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AcoesCategoriaSidebar from './AcoesCategoriaSidebar';
import AcoesProdutoSidebar from "./AcoesProdutoSidebar";
import { FaPlus } from 'react-icons/fa';


import authUser from '../utils/authUser';
import API from '../utils/API';
import Categoria from './Categoria';
import './sideBar.css'
import profileImage from '../images/teste.jpg'

export default class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      categorias: [],
      modalInclusaoCategoria: false,
      modalInclusaoProduto:false,
      modalInclusaoMarca:false
    }

    this.setCategorias = this.setCategorias.bind(this);
    this.gerarTextoFormatado = this.gerarTextoFormatado.bind(this);
    this.novosDados = this.novosDados.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentWillMount(){
    API.get('/categoria')
    .then(categorias => {
      this.setState({
        categorias: categorias.data
      })
    })
  }

  novosDados(dados) {
    this.setState(prevState => ({
      categorias: [...prevState.categorias, dados]
    }))
  }

  delete(id){
    this.setState(prevState => ({
      categorias: prevState.categorias.filter(categoria => categoria._id !== id)
    }))
  }

  setCategorias(categoria, indice) {
    return(
      <Categoria
        key = {categoria._id}
        categoria = {categoria}
        produtos = {this.props.produtos}
        novosDados = {this.novosDados}
        deleteProdutos = {this.props.deleteProdutos}
        delete = {this.delete}>
        {categoria.nome}
      </Categoria>
    )
  }

  gerarTextoFormatado(texto, maximoCaracteres) {
    this._textoFormatado = '';
    for (let i = 0; i < texto.length && i <= maximoCaracteres; i++) {
      this._textoFormatado += texto.charAt(i);
    }
    if (texto.length > this._textoFormatado.length) {
      return this._textoFormatado + '...';
    }
    return this._textoFormatado;
  }

  render(){
    return(
      <div className='sidebar'>
        <div className="profile">
          {authUser.auth ? (
            <>
              <div className="profileImage">
                <img src={profileImage} width="100px"
                  height="100px"
                  alt="profile"
                  style={{borderRadius:'60%'}} ></img>
              </div>
              <div className="profileContent" style={{marginTop:'10px'}}>
                <div className="flexItemsSideBar itemsProfileContent">
                  <h5>Nome: </h5>
                  <p>{this.gerarTextoFormatado(authUser.usuario.nome, 16)}</p>
                </div>
                <div className="flexItemsSideBar itemsProfileContent">
                  <h5>Usuario: </h5>
                  <p>{this.gerarTextoFormatado(authUser.usuario.usuario,14)}</p>
                </div>
                <div className="flexItemsSideBar itemsProfileContent">
                  <h5>Conta: </h5>
                  <p>{authUser.usuario.conta.nome}</p>
                </div>
                <div className="flexItemsSideBar">
                  <div>
                    <button className="btn btn-info">Configuração</button>
                  </div>
                  <div style={{marginLeft:'10px'}}>
                    <Link to='/logout'>
                      <button className="btn btn-danger">Logout</button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="profileImage">
                <img src='https://png.pngtree.com/svg/20160308/_user_profile_icon_1108089.png' width='50%' alt='profile'/>
              </div>
              <div className="profileContent" style={{paddingTop:'50px'}}>
                <Link to='/login'>
                  <button className="btn btn-primary">Login</button>
                </Link>
              </div>
            </>
          )}
        </div>
        <hr style={{backgroundColor:'#fff'}}/>
        <div className="categoria">
          <h1>Categorias</h1>
          {this.state.categorias.map(this.setCategorias)}
          <button className="btn btn-primary" onClick={ () => this.setState({ modalInclusaoCategoria:true }) } style={{marginRight:'10px'}}>
            <span>
              <FaPlus />
            </span>
            categoria
          </button>
          <button className="btn btn-primary" onClick={ () => this.setState({ modalInclusaoProduto: true }) }>
            <span>
              <FaPlus />
            </span>
            Produto
          </button>
          {this.state.modalInclusaoCategoria ? (
            <AcoesCategoriaSidebar 
              inclusao = {true}
              novosDados = {this.novosDados}
              onCloseModal={ () => this.setState({ modal:false, modalInclusaoCategoria:false })} 
            />
          ) : <></>}

          {this.state.modalInclusaoProduto ? (
            <AcoesProdutoSidebar
              inclusao={true}
              categorias= {this.state.categorias}
              onCloseModal={ () => this.setState({ modalInclusaoProduto: false })}
            />
          ) : <></>}
        </div>
      </div>
    )
  }
}
