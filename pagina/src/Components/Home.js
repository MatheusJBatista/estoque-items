import React, { Component } from 'react';
import Produto from './Produto';

export default class Home extends Component {

  constructor(props){
    super(props);

    this.setProduto = this.setProduto.bind(this);
  }

  setProduto(produto, i){
    
    return (
      <Produto
        mobile = {this.props.mobile}
        produto = {produto}
        key= {produto._id}>
        {produto.nome}
      </Produto>
    )
  }


  render(){
    
    return(
      <>
        {this.props.produtos.map(this.setProduto)}
      </>
    )
  }
}
