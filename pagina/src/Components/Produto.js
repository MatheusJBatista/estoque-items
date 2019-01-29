import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './produto.css';


//Titulo: 52 caracteres
//Resumo: 78 carecteres
//max-width: 1054
const screenWidth = window.matchMedia("(max-width: 1054px)");
const screenWidthFont = window.matchMedia("(max-width: 488px)");
export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      resumo:true,
      font: false
    }

    this.screenWidth = this.screenWidth.bind(this);
    this.screenWidthFont = this.screenWidthFont.bind(this);
    this.gerarTextoFormatado = this.gerarTextoFormatado.bind(this);
  }

  componentWillMount() {
    this.screenWidth();
    this.screenWidthFont();
    screenWidth.addListener(this.screenWidth);
    screenWidthFont.addListener(this.screenWidthFont);
  }

  //quando a tela chegar na largura defina, o campo "resumo" ira sumir
  screenWidth(){
    if (screenWidth.matches) {
      this.setState({
        resumo: false
      })
      this.props.mobile();
    }else {
      this.setState({
        resumo: true
      })
    }
  }

  //quando a tela chegar na largura definida, a fonte ira reduzir para melhor visualização mobile
  screenWidthFont(){
    if (screenWidthFont.matches) {
      this.setState({
        font: true
      })
    }else {
      this.setState({
        font: false
      })
    }
  }

  gerarTextoFormatado(texto, maxCaracteres){
    this.textoFinal = '';
    this.maximoFixo = maxCaracteres;
    for(maxCaracteres; maxCaracteres >= 0 ; maxCaracteres--){
      this.textoFinal += texto.charAt(this.maximoFixo-maxCaracteres);
    }
    if (this.textoFinal.length - 1 === this.maximoFixo && texto.length > this.maximoFixo) {
      return this.textoFinal + '...';
    }
    return this.textoFinal;
  }

  render(){
    return(
      <>
        <div className={this.state.font ? 'flexItemsProduto produto col-md-12 font' : 'flexItemsProduto produto col-md-12'}>
          <Link to={`/produto/${this.props.produto._id}`}>
            <img src="https://images9.kabum.com.br/produtos/fotos/97079/97079_1528918732_index_gg.jpg" width='120px' height='120px' alt='profile'/>
          </Link>

          <div className="content">
            <Link to={`/produto/${this.props.produto._id}`}>
              <h4><b>{this.gerarTextoFormatado(this.props.children, 49)}</b></h4>
            </Link>

            <div className="flexItemsProduto">
              <h5>Marca: </h5>
              <Link to={`/marca/${this.props.produto.marca._id}`}>
                <p>{this.props.produto.marca.nome}</p>
              </Link>

              <div className="flexItemsProduto" style={{marginLeft:'20px'}}>
                <h5>Categoria:</h5>
                <Link to={`/categoria/${this.props.produto.categoria._id}`}>
                  <p>{this.props.produto.categoria.nome}</p>
                </Link>
              </div>
            </div>

            <div className="flexItemsProduto">
              <h5>Preço:</h5>
              <p>R$ {this.props.produto.preco}</p>
            </div>

            {this.state.resumo ? (
              <Link to={`/produto/${this.props.produto._id}`}>
                <p style={{marginLeft:'0px'}}>{this.gerarTextoFormatado(this.props.produto.descricao, 75)}</p>
              </Link>) : '' }

          </div>
        </div>
      </>
    )
  }
}
