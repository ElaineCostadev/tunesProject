import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import logoTrybeTunes from '../images/logoTrybeTunes.svg';
import styles from './Login.module.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      buttonSubmitDisable: true,
      loading: false,
      changeSearch: false,
    };
  }

  // quando clicar em Login, carrega e entra na pasta Search
   onClick = async () => {
     const { name } = this.state;
     this.setState({
       loading: true,
     });
     await createUser({ name });
     this.setState({
       loading: false,
       changeSearch: true,
     });
   };

  // verificar o que está sendo digitado e habilitar o botao de enviar
  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      // const { buttonSubmitDisable } = this.state;
      const three = 3;
      if (target.value.length >= three) {
        this.setState({ buttonSubmitDisable: false });
      } else {
        this.setState({ buttonSubmitDisable: true });
      }
    });
  }

  render() {
    // const { userName } = this.props;
    const { buttonSubmitDisable, loading, changeSearch /* name */ } = this.state;
    if (loading) return <Loading />;

    return (
      <div
        className={ styles.container }
        data-testid="page-login"
      >
        Login
        <img src={ logoTrybeTunes } alt="logo do TrybeTunes" />
        <form>
          <label htmlFor="login">
            <input
              type="text"
              placeholder="Digite seu nome"
              // value="login"
              name="name"
              data-testid="login-name-input"
              onChange={ this.onInputChange }
            />

            <button
              type="button"
              disabled={ buttonSubmitDisable }
              onClick={ this.onClick }
              name="login-button"
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </label>
          <div>
            {
              changeSearch && <Redirect to="/search" />
            }
          </div>
        </form>
        {/*  <p userName={ dataUser.name } /> */}
      </div>
    );
  }
}
// outra forma de redirecionar a pagina
// Mentoria do Muca
/* const { history } = this.props;
   history.push('/search' - pagina desejada); */
