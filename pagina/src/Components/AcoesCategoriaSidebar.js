import React, { Component } from 'react';
import { FaChevronLeft } from "react-icons/fa";

import API from '../utils/API';

const $ = window.$;
class AcoesCategoriaSidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editar: false,
            deletar: false,
            erros: []
        }

        this.editForm = this.editForm.bind(this);
        this.removeAlert = this.removeAlert.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.insert = this.insert.bind(this);
        this.btnAcoes = this.btnAcoes.bind(this);
        this.showErr = this.showErr.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
    }

    componentDidMount() {
        $('#modalAcoes').modal('show');
        $('#modalAcoes').on('hidden.bs.modal', (e) => {
            this.props.onCloseModal();
        })
    }

    closeModal() {
        $('#modalAcoes').modal('hide');
    }

    btnAcoes() {
        return (
            <>
                <button className="btn btn-info" onClick={ ()=> this.setState({ editar: true })}>
                    Editar
                </button>
                <button className="btn btn-danger" style={{marginTop:'20px'}} onClick={ ()=> this.setState({ deletar: true })}>
                    Deletar
                </button>
            </>
        )
    }

    editForm() {
        return (
            <form style={{width:'80%'}}>
                <div className="form-group" style={{display:'ruby'}}>
                    <label htmlFor="txtNome" style={{marginRight:'10px'}}>Nome</label>
                    <input type="text" name="txtNome" defaultValue={this.props.categoria.nome} className="form-control"></input>
                </div>
                <div className="form-group" style={{display:'ruby'}}>
                    <label htmlFor="slcDisponivel" style={{marginRight:'10px'}}>Status</label>
                    <select className="form-control" name="slcDisponivel">
                        <option>Selecione</option>
                        <option value={this.props.categoria.disponivel} selected={this.props.categoria.disponivel === true ? 'selected' : ''}>
                            Categoria ativa
                        </option>
                        <option value={!this.props.categoria.disponivel} selected={this.props.categoria.disponivel === false ? 'selected' : ''}>
                            Categoria inativa
                        </option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{marginRight:'50%', marginTop:'10px'}}>Atualizar</button>
            </form>
        )
    }

    insert(e) {
        e.preventDefault();

        let erros = false;
        let erroList = [];
        

        if (!this._txtNome.value) {
            erros = true;
            erroList.push('Nome deve ser preenchido')
        }
        
        if (!(this._slcDisponivel.value === 'true' || this._slcDisponivel.value === 'false')) {
            erros = true;
            erroList.push('Status deve ser verdadeiro/falso')
        }

        if (!erros) {
            this.clearErrors();
            API.post('/categoria', {
                nome: this._txtNome.value,
                disponivel: this._slcDisponivel.value
            })
            .then(response => {
                if (response.data.errors) {
                    this.setState({
                        erros: ['Nada foi enviado para o servidor. Tente novamente mais tarde']
                    })
                }else{
                    this.closeModal();
                    this.props.novosDados(response.data)
                }
            })
            .catch(erro => {
                console.log(erro)
            })
        }else {
            this.setState({
                erros: erroList
            })
        }
        
    }

    delete(e) {
        e.preventDefault();
        
        API.delete(`/categoria/${this.props.categoria._id}`)
        .then(response => {
            this.closeModal();
            this.props.delete(this.props.categoria._id)

            if (this.props.produtos.length > 0) {
                this.props.deleteProdutos(this.props.produtos);
            }
        })
        .catch(erro => {
            console.log(erro);
        })
    }

    update() {

    }

    removeAlert() {
        return(
            <>
            <div className="alert alert-danger">
                <h4>Atenção!!!</h4>
                <p>Deseja mesmo deletar está categoria e perder todos os produtos abaixo ?</p>
                <ul>
                    { this.props.produtos.length > 0 ? (
                        <>
                            <li>{this.props.produtos.length} Produtos:</li>
                            {this.props.produtos.map((produto, indice) => <li key={indice}>{produto.nome}</li> )}
                    </> ) : <li>SEM PRODUTOS NESTA CATEGORIA</li>
                    }
                </ul>
            </div>
            <button className="btn btn-primary" style={{marginRight:'10px'}}>Inativar categoria</button>
            <button className="btn btn-danger" onClick={this.delete}>Deletar TUDO</button>
            </>
        )
    }

    showErr() {
        if (this.state.erros.length > 0) {
            return (
                <div className="alert alert-danger">
                    <ul>
                        <strong>Atenção!!</strong>
                        {this.state.erros.map(erro => <li>{erro}</li> )}
                    </ul>
                </div>
            )
        }
        return;
    }

    clearErrors() {
        this.setState({
            erros: []
        })
    }

    render() {

        if (this.props.inclusao) {
            return(
                <div className="modal fade" id="modalAcoes" tabIndex="-1" role="dialog" aria-labelledby="modalAcoes" aria-hidden="true" style={{color:'black'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Inclusão de categoria
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            {/*Caso tenha erros, mostrar ao usuario*/}
                            {this.showErr()}
                            <form style={{width:'80%'}} onSubmit={this.insert}>
                                <div className="form-group" style={{display:'ruby'}}>
                                    <label htmlFor="txtNome" style={{marginRight:'10px'}}>Nome</label>
                                    <input type="text" name="txtNome" className="form-control" ref={txtNome => this._txtNome = txtNome }></input>
                                </div>
                                <div className="form-group" style={{display:'ruby'}}>
                                    <label htmlFor="slcDisponivel" style={{marginRight:'10px'}}>Status</label>
                                    <select className="form-control" name="slcDisponivel" ref={slcDisponivel => this._slcDisponivel = slcDisponivel}>
                                        <option>Selecione</option>
                                        <option value={true}>
                                            Categoria ativa
                                        </option>
                                        <option value={false}>
                                            Categoria inativa
                                        </option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{marginRight:'50%', marginTop:'10px'}}>Incluir</button>
                            </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


        return(
            <div className="modal fade" id="modalAcoes" tabIndex="-1" role="dialog" aria-labelledby="modalAcoes" aria-hidden="true" style={{color:'black'}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            {this.state.editar || this.state.deletar ? (
                                <h5 className="modal-title" style={{marginRight:'20px', cursor: 'pointer'}} onClick={ () => this.setState({ deletar: false, editar: false }) }>
                                    <span>
                                        <FaChevronLeft/>
                                    </span>
                                </h5>
                            ): <></>}
                            <h5 className="modal-title">
                                {this.props.categoria.nome}
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            
                            {/*Quando não estiver editando/excluindo, aparece o menu de escolha*/}
                            {!this.state.editar && !this.state.deletar ? (
                                <div style={{display:'inline-grid', width:'50%'}}>
                                    {this.btnAcoes()}
                                </div>
                            ) : <></>}

                            {/*Quando o state estiver editando, aparecera o formulario de edição*/}
                            {this.state.editar ? this.editForm() : <></> }

                            {/*Quando o state estiver excluindo, aparecera a confirmação de exclusção*/}
                            {this.state.deletar ? this.removeAlert() : <></>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AcoesCategoriaSidebar;