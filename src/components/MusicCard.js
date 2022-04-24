import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteChecked: false,

    };
  }

  componentDidMount() {
    const { musicFavorites, music } = this.props;
    console.log(musicFavorites);
    const findFavorite = musicFavorites.some((fav) => fav.trackId === music.trackId);
    if (findFavorite) {
      console.log('funcionou componentDidMount');
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
    this.setState({ favoriteChecked: false });
  }
  if (!checked) {
    this.setState({
      loading: true,
    });
    await removeSong(music);
    this.setState({
      loading: false,
      favoriteChecked: false,
    });
  }
}

/* else { */
/*   removed() {
    removeSong(musicsOrigin).then((removeFavorites) => {
      this.setState - loadin...true..checked false...
      console.log(removeFavorites);
      console.log(params);
    });
  } */

render() {
  const { music } = this.props;
  // console.log(music);
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
          <input
            checked={ favoriteChecked }
            onChange={ this.addMusicFavorites }
            id="Favorita"
            name="favoriteChecked"
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
};
