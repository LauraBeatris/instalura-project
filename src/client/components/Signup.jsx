import React, { Component } from "react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error_senha: "",
      error_login: ""
    };
    this.handleValidation = this.handleValidation.bind(this)
  }

  // Lidando com as validações 
  handleValidation() {
    // Verificando se a senha é a mesma que a de confirmação
    if (this.senha.value !== this.confirma_senha.value) {
      this.setState({ error_senha: "Senha não confere" });
    } else {
      this.setState({ error_senha: "" });
    }
    
    // Verificando se o login é igual a senha
    if (this.login.value === this.senha.value) {
      this.setState({ error_login: "Senha igual ao username" });
    } else {
      this.setState({ error_login: "" });
    }
  }

  render() {
    const { error_senha, error_login } = this.state;
    return (
      <section className="signup-section">
        <h1 className="header-logo" >Instalura</h1>
        <h2 classNane="signup-subtitle" style={{fontSize: '1.25rem'}, {textAlign: 'center'}}> Cria sua conta. É simples e fácil 👍 </h2>
        <form onSubmit={(ev) => {
          ev.preventDefault()
          // Após lidar com a validação os dados serão mandados para a API
          this.handleValidation()
        }
        } 
          className="signup-form">
          <div className="login-container">
            <label className="signup-label" htmlFor="login">
              {" "}
              Login{" "}
            </label>
            <input
              id="login"
              type="text"
              required="true"
              title="Login obrigatório"
              placeholder="Digite seu login"
              ref={input => (this.login = input)}
            />
          </div>
          <div className="senha-container">
            <label className="signup-label" htmlFor="senha">
              {" "}
              Senha{" "}
            </label>
            <input
              id="senha"
              type="password"
              required="true"
              title="Senha obrigatório"
              placeholder="Digite sua senha"
              ref={input => (this.senha = input)}
            />
          </div>
          <div className="confirmacao-container">
            <label className="signup-label" htmlFor="confirma-senha">
              {" "}
              Confirmação{" "}
            </label>
            <input
              id="confirma-senha"
              type="password"
              required="true"
              placeholder="Digite sua senha novamente"
              ref={input => (this.confirma_senha = input)}
            />
          </div>
          <div className="url-container">
            <label className="signup-label" htmlFor="url">
              {" "}
              Url do perfil{" "}
            </label>
            <input
              id="url"
              type="text"
              placeholder="Digite a url do seu perfil"
              pattern="[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
              title="Url inválida"
            />
          </div>
          <button type="submit" className="button-submit">
            {" "}
            Signup{" "}
          </button>
          {(error_login ||
            error_senha) && (
              <ul className="errors-list">
                {error_login && <li> {error_login} </li>}
                {error_senha && <li> {error_senha} </li>}
              </ul>
            )}
        </form>
      </section>
    );
  }
}

export default Signup;
