import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import CardAlbum from '../components/CardAlbum';
import './Search.css';

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
      <div data-testid="page-search" className="search-container">
        <Header />
        {
          loading
            ? (<Loading />)
            : (
              <form className="form-container">
                <label htmlFor="search">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome do artista /banda"
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
            ? <p>{(`Resultado de álbuns de: ${name}`)}</p>
            : (<p>Nenhum álbum foi encontrado</p>)
        }
        {/*  <ul> */}
        {
          albuns.map((album) => (
            <div
              className="album-container"
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
            </div>
          ))
        }
        {/*  </ul> */}

      </div>
    );
  }
}
