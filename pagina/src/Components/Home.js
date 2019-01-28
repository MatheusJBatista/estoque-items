import React, { Component } from 'react';
import './home.css';


//Titulo: 52 caracteres
//Resumo: 72 carecteres
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
  }

  componentWillMount() {
    this.screenWidth();
    this.screenWidthFont();
    screenWidth.addListener(this.screenWidth);
    screenWidthFont.addListener(this.screenWidthFont);
  }

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

  render(){
    return(
      <>
        <div className={this.state.font ? 'flexItems produto col-md-12 font' : 'flexItems produto col-md-12'}>
          <img src="https://images9.kabum.com.br/produtos/fotos/97079/97079_1528918732_index_gg.jpg" width='120px' height='120px' alt='profile'/>
          <div className="content">
            <h4><b>Smartphone Samsung Galaxy J6, 32GB, 13MP, Tela 5.6.. </b></h4>
            <div className="flexItems">
              <h5>Marca: </h5>
              <p>Samsung</p>
            </div>
            <div className="flexItems">
              <h5>Preço:</h5>
              <p>869,90 R$</p>
            </div>
            {this.state.resumo ? (
              <p style={{marginLeft:'0px'}}>Desenhado para proporcionar conforto a quem tem a vida corrida. Com suas be..</p>) : '' }
          </div>
        </div>

        <div className={this.state.font ? 'flexItems produto col-md-12 font' : 'flexItems produto col-md-12'}>
          <img src="https://images5.kabum.com.br/produtos/fotos/80245/80245_index_gg.jpg" width='120px' height='120px' alt='profile'/>
          <div className="content">
            <h4><b>Pen Drive Kingston DataTraveler USB 3.1 32GB - DT5.. </b></h4>
            <div className="flexItems">
              <h5>Marca: </h5>
              <p>Kingston</p>
            </div>
            <div className="flexItems">
              <h5>Preço:</h5>
              <p>869,90 R$</p>
            </div>
            {this.state.resumo ? (
              <p style={{marginLeft:'0px'}}>Compatível com portas USB 2.0 existentes para sua conveniência, esta unidad..</p> ) : '' }
          </div>
        </div>

        <div className={this.state.font ? 'flexItems produto col-md-12 font' : 'flexItems produto col-md-12'}>
          <img src="https://images9.kabum.com.br/produtos/fotos/97079/97079_1528918732_index_gg.jpg" width='120px' height='120px' alt='profile'/>
          <div className="content">
            <h4><b>Smartphone Samsung Galaxy J6, 32GB, 13MP, Tela 5.6.. </b></h4>
            <div className="flexItems">
              <h5>Marca: </h5>
              <p>Samsung</p>
            </div>
            <div className="flexItems">
              <h5>Preço:</h5>
              <p>869,90 R$</p>
            </div>
            {this.state.resumo ? (
              <p style={{marginLeft:'0px'}}>Desenhado para proporcionar conforto a quem tem a vida corrida. Com suas be..</p> ) : '' }
          </div>
        </div>
      </>
    )
  }
}
