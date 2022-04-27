import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [], // essa é a lista de musicas
      musicsOrigin: '', // esse é o objeto completo para pegar o album e o artista
      getFavorites: [], // esse salva as informações da lista salva dos favoritos no localstorage
    };
  }

  async componentDidMount() {
    // ao fazer a async funcionou melhor do que com o then - ajuda do Guilherme Eduardo e Jackson Viana
    const result = await getFavoriteSongs();
    this.setState({
      getFavorites: result,
    });

    this.pegarMusicas();
  }

  /*   componentDidUpdate() {
    this.toUpdateAlbum();
  }

  toUpdateAlbum = async () => {
    const result2 = await getFavoriteSongs();
    const { loading } = this.state;
    if (!loading) {
    this.setState({
      getFavorites: result2,
    });
  } */

  pegarMusicas = async () => {
    // atraves do match consigo ter o id da Route que fica guardado no params - pego de la o id e pego a API e salvo no state;
    const { match } = this.props;
    const { params } = match;
    // const { musics, musicsOrigin } = this.state; não sei pq, nao precisei desestruturar segundo o Lint, so obedece rs.
    const newResult = await getMusics(params.id);
    this.setState({ musicsOrigin: newResult[0], musics: newResult });
  }

  render() {
    const { musics, musicsOrigin, getFavorites } = this.state;
    // metodo slice retira objetos do array
    // https://www.delftstack.com/pt/howto/javascript/javascript-remove-object-from-array/
    const newMusics = musics.slice(1);
    return (
      <div
        data-testid="page-album"
      >
        <Header />
        Album aqui
        <h4 data-testid="artist-name">
          {musicsOrigin.artistName}
        </h4>

        <p data-testid="album-name">
          {musicsOrigin.collectionName}
        </p>
        <ul>
          {
            newMusics.map((music) => (
              <li
                key={ music.trackId }
              >
                <div>
                  <p>
                    {music.trackName}
                  </p>
                </div>
                <MusicCard
                  music={ music } // passar como paramento para a funcao addSong no filho MusicCard
                  musicFavorites={ getFavorites }
                />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

// Pesquisa para props de match
// https://stackoverflow.com/questions/47311310/proptypes-isrequired-on-react-router-4-params-prop
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
