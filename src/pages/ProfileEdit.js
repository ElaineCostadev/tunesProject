import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      nameState: '',
      emailState: '',
      descriptionState: '',
      imageState: '',
      buttonSalveDisabled: false,
      savedNewProfileUser: false, // verifica se chamou a Api updateUser - retorna 'OK'
    };
  }

  componentDidMount() {
    this.getUserApi();
  }

  // Pega os dados na API em getUser
  getUserApi = async () => {
    const resultGetUser = await getUser();
    this.setState({
      // dados do usuario anterior a alteração - deixam o formulario ja preenchido com essas informações
      nameState: resultGetUser.name,
      emailState: resultGetUser.email,
      descriptionState: resultGetUser.description,
      imageState: resultGetUser.image,
    });
  }

  // pego os valores dos inputs e controlo - coloco verificações para ativar o botao.
onInputChange = ({ target }) => {
  this.setState({
    [target.name]: target.value,
  }, () => {
    const { nameState, emailState, descriptionState, imageState } = this.state;
    const validationEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[AZ]{2,4}$/i;
    const errorCases = [
      nameState.length !== 0,
      emailState.length !== 0,
      descriptionState.length !== 0,
      imageState.length !== 0,
    ];
    const verification = errorCases.every((error) => error === true);
    if (verification && validationEmail) {
      this.setState({ buttonSalveDisabled: verification });
    }
  });
}

// Enviar o formulario - salva os dados alterados no storage com a funcao updateUser e atualiza o state.
handleSubmit = async (e) => {
  e.preventDefault();
  const { nameState, emailState, descriptionState,
    imageState } = this.state;
  const { history } = this.props;
  const resultUpdateUser = await updateUser({
    name: nameState,
    email: emailState,
    image: imageState,
    description: descriptionState,
  });
  this.setState({ savedNewProfileUser: resultUpdateUser });

  history.push('/profile');
};
/* this.setState({ savedNewProfileUser: true });
}; */

render() {
  const { nameState, emailState, descriptionState, imageState,
    buttonSalveDisabled, savedNewProfileUser } = this.state;
  // if (loading) return <Loading />;
  // if (savedNewProfileUser === 'OK') return <Redirect exact to="/profile" />;
  return (
    <div data-testid="page-profile-edit">
      <Header />
      <Link
        to="/profile/edit"
      >
        Editar perfil
      </Link>
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="ProfileEdit">
          Nome
          <input
            type="text"
            placeholder="Digite seu nome"
            name="nameState"
            value={ nameState }
            data-testid="edit-input-name"
            onChange={ this.onInputChange }
          />
          <label htmlFor="email">
            Email
            <input
              type="email"
              placeholder="Digite seu email"
              value={ emailState }
              name="emailState"
              onChange={ this.onInputChange }
              data-testid="edit-input-email"
            />
          </label>

          <label htmlFor="textarea">
            Descrição
            <input
              type="textarea"
              placeholder="Descreva sobre você"
              name="descriptionState"
              value={ descriptionState }
              data-testid="edit-input-description"
              rows="5"
              cols="20"
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="image">
            Imagem
            <input
              type="text"
              name="imageState"
              value={ imageState }
              onChange={ this.onInputChange }
              placeholder="Insira o link de uma imagem"
              data-testid="edit-input-image"
            />
          </label>

          <button
            type="submit"
            disabled={ !buttonSalveDisabled }
            name="profileEdit-button"
            data-testid="edit-button-save"
          >
            Salvar alterações
          </button>
        </label>
      </form>
      {
        (savedNewProfileUser) && <Redirect exact to="/profile" />
      }
    </div>
  );
}
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

/*
✓ Será validado se é feita a requisição para getUser para recuperar as informações da pessoa logada (1553 ms)

✓ Será validado se o formulário é renderizado já preenchido com as informações da pessoa logada (1525 ms)
✓ Será validado se é possível alterar os valores dos campos (1786 ms)
✓ Será validado se o botão salvar é habilitado somente se todos os campos estiverem válidos (1748 ms)
✕ Será validado se as informações são enviadas usando a API updateUser (1692 ms)
✕ Será validado se após salvar as informações a pessoa é redirecionada para a página de exibição de perfil (1519 ms)
 */

// atualiza no storage os novos dados e salvo no state.
// updateApi = async () => {
/*     const { nameState, emailState, descriptionState, imageState } = this.state;
      const resultProfileEdit = await updateUser({
        name: nameState,
        email: emailState,
        image: descriptionState,
        description: imageState,
      }); */
/*      this.setState({
        savedNewProfileUser: resultProfileEdit,
      }); */
// if (savedNewProfileUser) return <Redirect to="/profile" />;
//  }

/*     {
        (savedNewProfileUser === "OK") ? <Redirect to="/profile" />
          : (
            updateProfileUser.map((userData, index) => (
              <section
                key={ index }
              >
                <p>
                  { userData.name }
                </p>
                <p>
                  { userData.email }
                </p>
                <img
                  src={ userData.image }
                  alt="Imagem do Perfil"
                  data-testid="profile-image"
                />
                <p>
                  { userData.description}
                </p>
              </section>
            ))
          )
      } */
