import React, { Component } from 'react';
import Header from '../components/Header';
// import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import styles from './Favorites.module.css';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      getFavoritesPage: [], // essa é a lista de musicas na pagina dos favoritos
      getFavoritesPage2: '', // esse é o objeto completo para pegar o album e o artista
    };
  }

  async componentDidMount() {
    const result = await getFavoriteSongs();
    this.setState({
      getFavoritesPage: result,
      // getFavoritesPage2: result[0],
    });
  }

  componentDidUpdate() {
    this.toUpdateFavorites();
  }

toUpdateFavorites = async () => {
  const result2 = await getFavoriteSongs();
  this.setState({
    getFavoritesPage: result2,
  });
}

/*   this.setState({
    loading: true,
    getFavoritesPage: result2,
  });
 */
  removedFromFavoritesPage = async ({ target }) => {
    const { checked } = target;
    if (!checked) {
      const removed = await removeSong(music);
      this.setState({ loading: true, getFavoritesPage: removed });
      const result2 = await getFavoriteSongs();
      /*  const { loading } = this.state;
      if (!loading) { */
      this.setState({
        getFavoritesPage: result2,
      });
    }
  }

  render() {
    const { getFavoritesPage, getFavoritesPage2, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-favorites" className={ styles.container }>
        <Header />
        <h1>Favorites songs</h1>
        {
          (getFavoritesPage.length > 0)
            && (
              <section>
                <h4>
                  {getFavoritesPage2.artistName}
                </h4>

                <p>
                  {getFavoritesPage2.collectionName}
                </p>
                <ul>
                  {
                    getFavoritesPage.map((favoriteMusic) => (
                      <li
                        key={ favoriteMusic.trackId }
                      >
                        <p>
                          {favoriteMusic.trackName}
                        </p>

                        <MusicCard
                          music={ favoriteMusic } // passar como paramento para a funcao addSong no filho MusicCard
                          musicFavorites={ getFavoritesPage }
                          // updateFunction={ this.toUpdateFavorites }
                        />
                      </li>
                    ))
                  }
                </ul>
              </section>
            )
            /*  : <p> Não há musicas favoritadas</p> */
        }
      </div>
    );
  }
}
/*
  ✕ Será validado se a lista de músicas favoritas é atualizada ao remover uma música da lista (1523 ms)
*/

/* async componentDidMount() {
  const result = await getFavoriteSongs();
  this.setState({
    getFavoritesPage: result,
    getFavoritesPage2: result[0],
  });
} */

/*
removedFromFavoritesPage = async ({ target }) => {
  const { checked } = target;
  if (!checked) {
    this.setState({
      loading: true,
    });
  }
  await removeSong(music);
}
 */
