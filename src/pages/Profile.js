import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
// import ProfileCreate from '../components/ProfileCreate';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      dataUser: {},
    };
  }

  componentDidMount() {
    this.getUserLoading();
  }

  getUserLoading = async () => {
    const resultUser = await getUser();
    this.setState({
      dataUser: resultUser,
    });
  }

  render() {
    const { dataUser } = this.state;

    return (
      <div
        data-testid="page-profile"
      >
        <Header />
        Profile
        <section>
          <p>
            { dataUser.name }
          </p>

          <p>
            { dataUser.email }
          </p>
          <img
            src={ dataUser.image }
            alt="Imagem do Perfil"
            data-testid="profile-image"
          />

          <p>
            { dataUser.description}
          </p>
          <Link
            to="/profile/edit"
          >
            Editar perfil
          </Link>
        </section>
      </div>
    );
  }
}
