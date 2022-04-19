import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
    };
  }

  // a funcao getUser pega o nome da pessoa que foi digitado
  // precisa ser renderizada na tela
  // colocar em qualquer tag - p data-testid="header-user-name"

  componentDidMount() {
    this.user();
  }

  user = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    const userGetFunction = await getUser(name);
    this.setState({
      loading: false,
      name: Object.values(userGetFunction.name),
    });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        {
          (loading)
            ? <Loading />
            : (
              <h2 data-testid="header-user-name">
                { name }
              </h2>
            )
        }
        <Link data-testid="link-to-search" to="/search">Search  </Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites  </Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}
