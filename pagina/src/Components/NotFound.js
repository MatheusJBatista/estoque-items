import React from 'react'
import { Link } from 'react-router-dom';
import './notFound.css';

const NotFound = (props) => {
  return (
    <div className="notFound">
      <img src="http://www.pierrebossiermall.com/custom13/images/_design/404.png" alt="404"></img>
      <h3>Parece que você se perdeu no meio do caminho amigão</h3>
      <Link to='/' >Voltar</Link>
    </div>
  )
}

export default NotFound
