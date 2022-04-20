import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      musicsOrigin: '',
    };
    // this.apiGetMusics = this.apiGetMusics.bind(this);
  }

  componentDidMount() {
    // atraves do match consigo ter o id da Route que fica guardado no params - pego de la o id e pego a API e salvo no state;
    const { match } = this.props;
    const { params } = match;
    // const { musics, musicsOrigin } = this.state; não sei pq, nao precisei desestruturar segundo o Lint, so obedece rs.
    // console.log(params.id);
    getMusics(params.id)
      .then((result) => {
        // Ajuda mentoria e Jonathan, Samuel e Vinicius.
        // Pego o 1º item que tem a informacao do artista e album.
        // const newResult = result[0];
        // seto os dois states -  um preciso do 1º item  e outro que vou fazer o map
        this.setState({ musicsOrigin: result[0], musics: result });
      });
  }

  render() {
    const { musics, musicsOrigin } = this.state;
    // metodo slice retira objetos do array
    // https://www.delftstack.com/pt/howto/javascript/javascript-remove-object-from-array/
    const newMusics = musics.slice(1);
    // console.log('newMusics', newMusics);
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
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
