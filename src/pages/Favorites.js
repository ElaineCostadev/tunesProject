import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      getFavoritesPage: [],
    };
  }

  async componentDidMount() {
    const result = await getFavoriteSongs();
    this.setState({
      getFavoritesPage: result,
    });
  }

  removedFromFavoritesPage = async ({ target }) => {
    const { checked } = target;
    if (!checked) {
      this.setState({
        loading: true,
      });
      await removeSong(music);
      this.setState({
        loading: false,
        // favoriteChecked: false,
      });
    }
  }

  render() {
    const { getFavoritesPage, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        <ul>
          {
            getFavoritesPage.map((favoriteMusic) => (
              <li
                key={ favoriteMusic.trackId }
              >
                <MusicCard
                  music={ favoriteMusic } // passar como paramento para a funcao addSong no filho MusicCard
                  musicFavorites={ getFavoritesPage }
                />
              </li>
            ))
          }

        </ul>
      </div>
    );
  }
}
