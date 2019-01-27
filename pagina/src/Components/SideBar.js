import React, { Component } from 'react';
import './sideBar.css'

export default class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      teste:false
    }

    this.teste = this.teste.bind(this);
  }

  teste(){
    this.setState({
      teste:true
    })
  }

  render(){
    return(
      <div className={this.state.teste ? 'sidebar' : 'sidebar' }>
        <div className="profile">
          <div className="profileImage">
            <img src='https://png.pngtree.com/svg/20160308/_user_profile_icon_1108089.png' width='50%' alt='profile'/>
          </div>
          <div className="profileContent">
            <h1>Matheus Roberto</h1>
            <h1>Matheus Roberto</h1>
            <h1>Matheus Roberto</h1>
          </div>
        </div>
        <hr style={{backgroundColor:'#fff'}}/>
        <div className="categoria">
          <h1>Categorias</h1>
          <div>
            <div className="flexItems">
              <div>
                <h5>Arvores</h5>
              </div>
              <div className="btnAcoes">
                <button className="btn btn-info" style={{
                  height: '24px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                  marginLeft: '10px'
                }}> Ações </button>
              </div>
            </div>
          </div>

          <div>
            <div className="flexItems">
              <div>
                <h5>Perifericos</h5>
              </div>
              <div className="btnAcoes">
                <button className="btn btn-info" style={{
                  height: '24px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                  marginLeft: '10px'
                }}> Ações </button>
              </div>
            </div>
          </div>

          <div>
            <div className="flexItems">
              <div>
                <h5>Sintrotina</h5>
              </div>
              <div className="btnAcoes">
                <button className="btn btn-info" style={{
                  height: '24px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                  marginLeft: '10px'
                }}> Ações </button>
              </div>
            </div>
          </div>

          <div>
            <div className="flexItems">
              <div>
                <h5>Binatroxina</h5>
              </div>
              <div className="btnAcoes">
                <button className="btn btn-info" style={{
                  height: '24px',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                  marginLeft: '10px'
                }}> Ações </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
