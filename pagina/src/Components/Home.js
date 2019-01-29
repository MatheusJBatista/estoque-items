import React, { Component } from 'react';
import Produto from './Produto';
import api from '../utils/API';

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      produtos: []
    }

    this.setProduto = this.setProduto.bind(this);
  }

  componentWillMount(){
    api.get('/produto')
      .then(produtos => {
        this.setState({
          produtos: produtos.data
        })
      })
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
        {this.state.produtos.map(this.setProduto)}
      </>
    )
  }
}
