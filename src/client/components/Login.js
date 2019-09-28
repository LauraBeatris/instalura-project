import React, { Component } from "react";
import { browserHistory, Link } from "react-router";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: this.props.location.query.msg };
  }

  envia(event) {
    event.preventDefault();

    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        login: this.login.value,
        senha: this.senha.value
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };

    fetch("http://localhost:8080/api/public/login", requestInfo)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("não foi possível fazer o login");
        }
      })
      .then(token => {
        localStorage.setItem("auth-token", token);
        document.cookie = `auth-token=${token}`;
        browserHistory.push("/timeline");
      })
      .catch(error => {
        this.setState({ msg: error.message });
      });
  }

  render() {
    return (
      <div className="login-box">
        <h1 className="header-logo">Instalura</h1>
        <span>{this.state.msg}</span>
        <form className="signup-form" onSubmit={this.envia.bind(this)}>
          <label htmlFor="login" className="signup-label" htmlFor="url">
            Login
          </label>
          <input
            id="login"
            type="text"
            placeholder="Digite seu login"
            ref={input => (this.login = input)}
          />
          <label htmlFor="senha" className="signup-label" htmlFor="url">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            ref={input => (this.senha = input)}
          />
          <button className="button-submit" type="submit">
            {" "}
            Login{" "}
          </button>
          <p className="create-account-msg">
            {" "}
            Não tem uma conta? <Link to="/signup">Inscreva-se</Link>
          </p>
        </form>
      </div>
    );
  }
}
