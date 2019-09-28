import React, { Component } from "react";
import SignupApi from "../logicas/SignupApi"
import { browserHistory } from "react-router";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      senha: '',
      confirma_senha: '',
      urlPerfil: '',
      error_senha: "",
      error_login: "",
      error_api: "",
    };
    this.handleValidation = this.handleValidation.bind(this)
  }

  // Lidando com as validações 
  handleValidation() {
    // Verificando se a senha é a mesma que a de confirmação
    if (this.state.senha !== this.state.confirma_senha) {
      this.setState({ error_senha: "Senha não confere" });
    } else {
      this.setState({ error_senha: "" });
    }
    
    // Verificando se o login é igual a senha
    if (this.state.login === this.state.senha) {
      this.setState({ error_login: "Senha igual ao username" });
    } else {
      this.setState({ error_login: "" });
    }
  }
 
  handleSubmit(ev){
    ev.preventDefault()
    // Após lidar com a validação os dados serão mandados para a API
    this.handleValidation()

    // Verificando se possui erros para então fazer a requisição
    if (!this.state.error_login && !this.state.error_senha) {
      SignupApi.postSignup(this.state.login, this.state.senha, this.state.urlPerfil)
      .then(res => {
        if (res.ok){
          return res.text()
        } else { 
          throw new Error('Não foi possivel fazer o cadastro')
        }
      })
      .then(res => {
        this.setState({error_api: ''})
        browserHistory.push("/")
      })
      .catch(err => {
        // Setando mensagem de erro no state 
        this.setState({error_api: 'Não foi possivel realizar o cadastro'})
        // Limpando os campos 
       this.setState({login: '', senha: '', confirma_senha: '', urlPerfil: ''})
      })

    }
  }
 
  

  render() {
    const { error_senha, error_login, error_api } = this.state;
    return (
      <section className="signup-section">
        <h1 className="header-logo" >Instalura</h1>
        <h2 classNane="signup-subtitle" style={{fontSize: '1.25rem'}, {textAlign: 'center'}}> Cria sua conta. É simples e fácil 👍 </h2>
        <form onSubmit={(ev) => this.handleSubmit(ev)} 
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
              onChange={ev => this.setState({login: ev.target.value})}
              value={this.state.login}
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
              onChange={ev => this.setState({senha: ev.target.value})}
              value={this.state.senha}
            />
          </div>
          <div className="confirmacao-container">
            <label className="signup-label" htmlFor="confirma-senha">
              {" "}
              Confirmação da senha{" "}
            </label>
            <input
              id="confirma-senha"
              type="password"
              required="true"
              placeholder="Digite sua senha novamente"
              onChange={ev => this.setState({confirma_senha: ev.target.value})}
              value={this.state.confirma_senha}
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
              required
              placeholder="Digite a url do seu perfil"
              pattern='^(ftp|http|https):\/\/(avatars3)[^ "]+$'
              title="Url inválida"
              onChange={ev => this.setState({urlPerfil: ev.target.value})}
              value={this.state.urlPerfil}
            />
          </div>
          <button type="submit" className="button-submit">
            {" "}
            Signup{" "}
          </button>
          {(error_login ||
            error_senha || error_api) && (
              <ul className="errors-list">
                {error_login && <li> {error_login} </li>}
                {error_senha && <li> {error_senha} </li>}
                {error_api && <li> {error_api} </li>}
              </ul>
            )}
            
        </form>
      </section>
    );
  }
}

export default Signup;
