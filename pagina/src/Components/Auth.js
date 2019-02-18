import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';

import { getAuth } from '../utils/localStorage';
import authUser from '../utils/authUser'
import API from '../utils/API'

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state= {
            redirect: false
        }
    }

    componentWillMount() {
        if(getAuth()) {
            API.get('/usuario/login')
            .then(usuario => {
                if (usuario.data) {
                    authUser.auth = true;
                    authUser.usuario = usuario.data;

                    this.setState({
                        redirect:true
                    })
                }
            })
            .catch(erro => {
                console.log(erro);
            })
        }
        else {
            this.setState({
                redirect: true
            })
        }
    }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to={{pathname:'/'}} />
        // }
        // setTimeout(this.autoRedirect, 5000);
        // return <p>Aguarde...</p>
        return <></>
    }
}

export default Auth;