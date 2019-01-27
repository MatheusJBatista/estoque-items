import React, { Component } from 'react';
import './app.css';
import './Components/sideBar.css';
import SideBar from './Components/SideBar';
import Home from './Components/Home';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      openedNav:false
    }

    this.closeNav = this.closeNav.bind(this);
  }

  componentWillMount(){
    this.setState(prevState => ({
      openedNav: !prevState.openedNav
    }))
  }

  closeNav(){
    this.setState(prevState => ({
      openedNav: !prevState.openedNav
    }))
  }

  render() {
    return (
      <>
        {this.state.openedNav ? <SideBar /> : '' }
        <div className={this.state.openedNav ? 'openedNav' : ''}>
          <div className="toggleNav">
            <img src="http://www.marbleroomcle.com/wp-content/themes/marbleroomcle/images/menu-icon.png" width="50px" onClick={this.closeNav} alt="toggle sidebar"></img>
          </div>
          <div className="col-md-12 home">
            <Home/>
          </div>
        </div>
      </>
    );
  }
}

export default App;
