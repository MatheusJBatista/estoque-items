import React from 'react';
import './sideBar.css';

import authUser from '../utils/authUser';

const Categoria = (props) => {
  return(
    <div>
      <div className="flexItemsSideBar">
        <div>
          <h5>{props.children}</h5>
        </div>
        {authUser.usuario.conta.admin ? (
          <div className="btnAcoes">
            <button className="btn btn-info" style={{
                height: '24px',
                paddingTop: '0px',
                paddingBottom: '0px',
                marginLeft: '10px'
              }}> Ações </button>
            </div>
        ) : ''}
      </div>
    </div>
  )
}

export default Categoria;
