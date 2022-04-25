import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
// import ProfileCreate from '../components/ProfileCreate';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      dataUser: {},
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const resultUser = await getUser();
    this.setState({
      loading: false,
      dataUser: resultUser,
    });
  }

  render() {
    const { loading, dataUser } = this.state;
    return (
      <div
        data-testid="page-profile"
      >
        <Header />
        Profile
        {
          (loading) ? <Loading />
            : (
              <section>
                <p>
                  Nome
                  { dataUser.name }
                </p>
                <p>
                  Email
                  { dataUser.email }
                </p>
                <img
                  src={ dataUser.image }
                  alt="Imagem do Perfil"
                  data-testid="profile-image"
                />

                <p>
                  Descrição
                  { dataUser.description}
                </p>
                <Link
                  exact
                  to="/profile/edit"
                >
                  Editar perfil
                </Link>
              </section>
            )
        }
      </div>
    );
  }
}

/*
✕ Será validado se as informações da pessoa logada são exibidas na tela (1516 ms)
E o outro só passa quando nao tem nada escrito la na outra pagina - ProfileEdit
     */

/* dataUser.map((userData) => (
                <span key={ userData.name }>
                  <p>
                    Nome:
                    {userData.name}
                  </p>
                  <p>
                    Email:
                    {userData.email}
                  </p>
                  <img
                    src={ userData.image }
                    alt="Imagem do Perfil"
                    data-testid="profile-image"
                  />
                  <p>
                    Descrição:
                    {userData.description}
                  </p>
                  <Link
                    to="/profile/edit"
                  >
                    Editar perfil
                  </Link>
                </span>
              )))

        } */
