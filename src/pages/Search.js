import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import CardAlbum from '../components/CardAlbum';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      buttonSearch: true,
      loading: false,
      albuns: [],
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

  // Botao Pesquisar - chama a API e altera os states
  onClick = async () => {
    // console.log('esse é o Onclick, de pesquisar');
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    const api = await searchAlbumsAPI(name);
    this.setState({
      loading: false,
      albuns: api,
    });
  }

  // limpa o input
  clearInput = () => {
    target.value = '';
  }

  render() {
    const { buttonSearch, loading, name, albuns } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search - pagina de busca, dentro do site, após o login dar certo.
        {
          loading
            ? (<Loading />)
            : (
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
            )
        }
        {
          (albuns.length > 0)
            ? (`Resultado de álbuns de: ${name}`)
            : (<p>Nenhum álbum foi encontrado</p>)
        }
        <ul>
          {
            albuns.map((album) => (
              <li
                key={ album.collectionId }
              >
                <CardAlbum
                  artistName={ album.artistName }
                  collectionId={ album.collectionId }
                  collectionName={ album.collectionName }
                  collectionPrice={ album.collectionPrice }
                  artworkUrl100={ album.artworkUrl100 }
                  releaseDate={ album.releaseDate }
                  trackCount={ album.trackCount }
                />
                <Link to="/album/:id" />
              </li>
            ))
          }
        </ul>

      </div>
    );
  }
}
