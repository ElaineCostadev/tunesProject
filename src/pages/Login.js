import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      buttonSubmitDisable: true,
      loading: false,
    };
  }
  // ✕ Será validado se ao clicar no botão, a mensagem Carregando... é exibida e após a resposta da API acontece o redirecionamento para a rota /search

  // quando clicar no botao aparece a msg Carregando..., ou seja loading é true
  // executa createUser
  // para de carregar
  // redireciona para search
  onSubmit = (event) => {
    event.preventDefault();
    /* const { history } = this.props;
    history.push('/search'); */
    console.log('esse é o onSubmit');

    const { loading, name } = this.state;
    // createUser({ name });
    this.setState({
      loading: true,
    });
    createUser({ name });
    if (loading) {
      this.setState({
        loading: false,
      }, () => {
        <Redirect to="/search" />;
      });
    }
    /*      this.setState((prevState) => (
         // console.log(prevState.loading))
         {
        loading: prevState.loading
     })) */
  }

  /* this.setState({
      loading: true,
    }, () => {
      if (loading) {
        <Loading />;
      } else {
        createUser({ name });
        this.setState({
          loading: false,
        });
      }
    });
  } */

  // verificar o que está sendo digitado e habilitar o botao de enviar
  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      // const { buttonSubmitDisable } = this.state;
      const three = 3;
      if (target.value.length >= three) {
        this.setState({
          buttonSubmitDisable: false,
        });
      }
    });
  }

  render() {
    const { buttonSubmitDisable, loading /* name */ } = this.state;
    if (loading) return <Loading />;

    return (
      <div
        data-testid="page-login"
      >
        Login
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
              onClick={ this.onSubmit }
              // min="3"
              name="login-button"
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </label>
          <div>
            {/* {
              loading && <Redirect to="/search" />
            } */}
          </div>
        </form>
      </div>
    );
  }
}
// <Redirect to="/search" />
