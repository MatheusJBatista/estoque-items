import React, { Component } from 'react';
import AcoesCategoriaSidebar from "./AcoesCategoriaSidebar";
import { FaPencilAlt } from 'react-icons/fa';
import './sideBar.css';

import authUser from '../utils/authUser';

class Categoria extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      modalInclusao: false
    }
  }

  render(){
    return(
      <div>
        <div className="flexItemsSideBar">
          <div>
            <h5>{this.props.children}</h5>
          </div>
          {authUser.usuario.conta.admin ? (
            <div className="btnAcoes">
              <button 
                className="btn btn-info" 
                onClick={ () => this.setState({ modal:true })}
                style={{
                    height: '24px',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    marginLeft: '10px'
                  }}> 
                Ações <span><FaPencilAlt /></span> 
              </button>
              </div>
          ) : ''}
        </div>
        {this.state.modal ? (
          <AcoesCategoriaSidebar 
            categoria = {this.props.categoria}
            novosDados = {this.props.novosDados}
            delete = {this.props.delete}
            deleteProdutos = {this.props.deleteProdutos}
            produtos = {this.props.produtos.filter(produto => produto.categoria._id === this.props.categoria._id)}
            onCloseModal = { () => this.setState({ modal:false, modalInclusao:false })} 
          />
        ) : <></>}
      </div>
    )
  }
}

export default Categoria;
