import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CardAlbum.css';
import PropTypes from 'prop-types';

export default class CardAlbum extends Component {
  render() {
    const { artistName, collectionId, collectionName,
      collectionPrice, artworkUrl100, releaseDate,
      trackCount } = this.props;
    return (
      <main className="card-albuns">
        <header artistName={ artistName } />
        <header collectionId={ collectionId } />
        <h3>
          { collectionName }
        </h3>
        <img src={ artworkUrl100 } alt="Imagem do Album" />
        <p>
          R$
          { collectionPrice }
        </p>
        <p>
          { releaseDate }
        </p>
        <p>
          { trackCount }
        </p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Album
        </Link>
      </main>
    );
  }
}

CardAlbum.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.string.isRequired,
};
