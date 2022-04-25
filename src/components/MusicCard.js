import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
/* getFavoriteSongs */
export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteChecked: false,
      // updateFavorites: [],
    };
  }

  componentDidMount() {
    const { musicFavorites, music } = this.props;
    // console.log(musicFavorites);
    const findFavorite = musicFavorites.some((fav) => fav.trackId === music.trackId);
    if (findFavorite) {
      this.setState({ favoriteChecked: true });
    }
  }

addMusicFavorites = async ({ target }) => {
  const { music } = this.props;
  const { checked } = target;
  if (checked) {
    this.setState({
      loading: true,
    });
    await addSong(music);
    // console.log(api);
    this.setState({
      loading: false,
      favoriteChecked: true,
    });
  } else {
    this.setState({ loading: true });
    await removeSong(music);
    this.setState({
      loading: false,
      favoriteChecked: false,
    });
    // this.toUpdate(music);
    // chamar a funcao aqui
  }
}

/* componentDidUpdate = async () => {
  this.toUpdateMusicCard();
}

toUpdateMusicCard = async () => {
  const result2 = await getFavoriteSongs();
  const { loading } = this.state;
  if (!loading) {
    this.setState({
      updateFavorites: result2,
    });
  }
} */

render() {
  const { music /* toUpdateFavorites */ } = this.props;
  const { loading, favoriteChecked } = this.state;

  if (loading) return <Loading />;
  return (
    <div className="music-card">

      <p trackname={ music.trackName } />

      <audio data-testid="audio-component" src={ music.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio>
      <form>
        <label htmlFor="Favorita">
          Favorita
          <input
            checked={ favoriteChecked }
            onChange={ this.addMusicFavorites }
            id="Favorita"
            name="Favorita"
            data-testid={ `checkbox-music-${music.trackId}` }
            type="checkbox"
          />
        </label>
      </form>

    </div>
  );
}
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
  musicFavorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  // toUpdateFavorites: PropTypes.func.isRequired,
};
