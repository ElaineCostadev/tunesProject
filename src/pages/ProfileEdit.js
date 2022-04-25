import React, { Component } from 'react';
import Header from '../components/Header';
import { /* Link */ } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser /* updatedUser */ } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      nameState: '',
      emailState: '',
      descriptionState: '',
      imageState: '',
      buttonSalveDisabled: false,
      dataUserEdit: '',
      // updateProfileUser: '',
    };
  }

  componentDidMount() {
    this.getUserApi();
  }

  // Pega os dados na API em getUser
  getUserApi = async () => {
    this.setState({
      loading: true,
    });
    const resultUserEdit = await getUser();
    this.setState({
      loading: false,
      dataUserEdit: resultUserEdit,
    });
  }

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
    console.log(verification);
    if (verification && validationEmail) {
      this.setState({ buttonSalveDisabled: verification });
    }
  });
}

handleSubmit = (e) => {
  e.preventDefault();
  console.log('entrou na handleSubmit');
/*   const { name, email, image, description } = this.state;
  const resultProfileEdit = updateUser();
  this.setState({
    updateProfileUser: resultProfileEdit,
  }); */
}

/* this.setState((prevState) => ({
  updateProfileUser: [...prevState.updateProfileUser, resultProfileEdit],
})); */

/* this.setState({
  updateProfileUser: resultProfileEdit,
}); */

render() {
  const { nameState, emailState, descriptionState, imageState,
    loading, buttonSalveDisabled /* dataUserEdit */ } = this.state;
  if (loading) return <Loading />;
  return (
    <div data-testid="page-profile-edit">
      <Header />
      <h2>ProfileEdit</h2>
      <form onSubmit={ this.handleSubmit }>
        Enviar
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
    </div>
  );
}
}
export default ProfileEdit;
