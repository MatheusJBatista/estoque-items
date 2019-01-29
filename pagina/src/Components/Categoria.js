import React from 'react';
import './sideBar.css';

const Categoria = (props) => {
  return(
    <div>
      <div className="flexItemsSideBar">
        <div>
          <h5>{props.children}</h5>
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
  )
}

export default Categoria;
