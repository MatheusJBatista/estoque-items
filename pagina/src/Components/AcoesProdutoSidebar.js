import React, { Component } from "react";

import API from "../utils/API";

const $ = window.$;
class AcoesProdutoSidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            marcas: [],
            erros: []
        }

        this.inclusao = this.inclusao.bind(this);
        this.incluir = this.incluir.bind(this);
        this.clearErros = this.clearErros.bind(this);
    }


    componentDidMount() {
        $('#modalProduto').modal('show');
        $('#modalProduto').on('hidden.bs.modal', e => {
            this.props.onCloseModal();
        })
    }

    componentWillMount() {
        API.get('/marca')
        .then(marcas => {
            this.setState({
                marcas: marcas.data
            })
        })
    }

    incluir(e) {
        e.preventDefault();

        let erros = false;
        let errorList = [];

        console.log(this._slcMarca.value)

        if (!this._txtNome.value) {
            erros = true;
            errorList.push('Nome é obrigatorio');
        }

        if (!this._txtDescricao.value) {
            erros = true;
            errorList.push('Descrição é obrigatorio');
        }

        if (!this._txtPreco.value) {
            erros = true;
            errorList.push('Preço é obrigatorio');
        } else if (isNaN(this._txtPreco.value)) {
            erros = true;
            errorList.push('Preço deve ser numerico')
        }

        if (this._slcDisponivel.value !== 'true' && this._slcDisponivel.value !== 'false') {
            erros = true;
            errorList.push('Status é obrigatorio e deve ser verdadeiro/falso');
        }

        if (this._sclCategoria.value === 'false') {
            erros = true;
            errorList.push('Categoria é obrigatorio');
        }

        if (this._slcMarca.value === 'false') {
            erros = true;
            errorList.push('Marca é obrigatorio');
        }

        if (!erros) {
            this.clearErros();
            API.post('/produto',{
                nome: this._txtNome.value,
                preco: this._txtPreco.value,
                descricao: this._txtDescricao.value,
                categoria: this._sclCategoria.value,
                disponivel: this._slcDisponivel.value,
                marca: this._slcMarca.value
            })
            .then(response => $('#modalProduto').modal('hide') )
            .catch(erro => console.log(erro))
        }else {
            this.setState({
                erros: errorList
            })
        }
    }

    clearErros() {
        this.setState({
            erros: []
        })
    }

    inclusao() {
        return(
            <form onSubmit={this.incluir}>
                <label htmlFor="txtNome">Nome:</label>
                <input type="text" id="txtNome" ref={ txtNome => this._txtNome = txtNome } className="form-control"></input>

                <label htmlFor="txtDescricao">Descrição do produto:</label>
                <input type="text" id="txtDescricao" ref={ txtDescricao => this._txtDescricao = txtDescricao } className="form-control"></input>

                <label htmlFor="txtPreco">Preço:</label>
                <input type="text" id="txtPreco" ref={ txtPreco => this._txtPreco = txtPreco } className="form-control"></input>

                <label htmlFor="slcDisponivel">Status do produto:</label>
                <select id='slcDisponivel' ref={ slcDisponivel => this._slcDisponivel = slcDisponivel } className="custom-select">
                    <option>Selecione</option>
                    <option value={true}>Produto Disponivel</option>
                    <option value={false}>Produto Indisponivel</option>
                </select>

                <label htmlFor="slcCategoria">Categoria</label>
                <select id="slcCategoria" ref={ slcCategoria => this._sclCategoria = slcCategoria } className="custom-select">
                    <option value={false}>Selecione</option>
                    {this.props.categorias.map(categoria =>  (
                        <option key={categoria._id} value={categoria._id}>{categoria.nome}</option>
                    ) )}
                </select>

                <label htmlFor="slcMarca">Marca do produto:</label>
                <select id="slcMarca" ref={ slcMarca => this._slcMarca = slcMarca } className="custom-select">
                    <option value={false}>Selecione</option>
                    {this.state.marcas.map(marca => (
                        <option key={marca._id} value={marca._id}>{marca.nome}</option>
                    ))}
                </select>
                <button type="submit" className="btn btn-primary" style={{marginTop:'20px'}}>Salvar</button>
            </form>
        )
    }

    render() {
        return(
            <div className="modal fade" id="modalProduto" tabIndex="-1" role="dialog" aria-hidden="true" style={{color:'black'}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.state.erros.length > 0 ? (
                                <div className="alert alert-danger">
                                    <strong>Atenção!!</strong>
                                    <ul>
                                        {this.state.erros.map((erro, indice) =>(
                                            <li key={indice}>{erro}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : <></> }
                            {this.props.inclusao ? this.inclusao() : <></>}
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

export default AcoesProdutoSidebar;