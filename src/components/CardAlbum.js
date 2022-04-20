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
      <div className="card-albuns">
        <p artistName={ artistName } />
        <p collectionId={ collectionId } />
        <p>
          Nome:
          { collectionName }
        </p>
        <p>
          R$
          { collectionPrice }
        </p>
        <img src={ artworkUrl100 } alt="Imagem do Album" />
        <p>
          Data de Lançamento:
          { releaseDate }
        </p>
        <p>
          { trackCount }
        </p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Link para o album
        </Link>
      </div>
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
