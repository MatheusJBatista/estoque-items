import React, { Component } from 'react';
import { FaChevronLeft } from "react-icons/fa";

const $ = window.$;
class AcoesCategoriaSidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editar: false,
            deletar: false
        }

        this.editForm = this.editForm.bind(this);
        this.removeAlert = this.removeAlert.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.insert = this.insert.bind(this);
        this.btnAcoes = this.btnAcoes.bind(this);
    }

    componentDidMount() {
        
        $('#modalAcoes').modal('show');
        $('#modalAcoes').on('hidden.bs.modal', (e) => {
            this.props.onCloseModal();
        })
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

    insert() {

    }

    delete() {

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
                    {this.props.produtos.map(produto => <li>{produto.nome}</li> )}
                </ul>
            </div>
            <button className="btn btn-primary" style={{marginRight:'10px'}}>Inativar categoria</button>
            <button className="btn btn-danger">Deletar TUDO</button>
            </>
        )
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
                            <form style={{width:'80%'}}>
                                <div className="form-group" style={{display:'ruby'}}>
                                    <label htmlFor="txtNome" style={{marginRight:'10px'}}>Nome</label>
                                    <input type="text" name="txtNome" className="form-control"></input>
                                </div>
                                <div className="form-group" style={{display:'ruby'}}>
                                    <label htmlFor="slcDisponivel" style={{marginRight:'10px'}}>Status</label>
                                    <select className="form-control" name="slcDisponivel">
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