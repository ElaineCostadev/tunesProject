import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      buttonSearch: true,
    };
  }

  componentDidMount() {
    this.onClick();
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      const two = 2;
      if (target.value.length >= two) {
        this.setState({ buttonSearch: false });
      } else {
        this.setState({ buttonSearch: true });
      }
    });
  }

  getAPI = async () => {
    const { name } = this.state;
    const api = await searchAlbumsAPI(name);
    return console.log('esse é o getAPI', api);
  }

  onClick= async () => {
    const { name } = this.state;

    console.log('este é o botao de pesquisar');

    const api = await searchAlbumsAPI(name);

    console.log(api);

    // peguei o botao
    // limpar o input
    // API searchAlbumsAPIs.js espera receber uma string - o que foi digitado, nome da banda ou artista
    // como vou pegar esses dados para inserir em searchAPI?
  }

  clearInput = () => {
    target.value = '';
  }

  render() {
    const { buttonSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search - pagina de busca, dentro do site, após o login dar certo.
        <form>
          <label htmlFor="search">
            Arista ou Banda
            <input
              type="text"
              name="name"
              placeholder="Digite o nome do artista ou banda"
              onChange={ this.onInputChange }
              data-testid="search-artist-input"
            />
            <button
              name="button-search"
              type="button"
              disabled={ buttonSearch }
              onClick={ this.onClick }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}
