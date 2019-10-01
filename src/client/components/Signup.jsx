import React, { Component } from "react";
import SignupApi from "../logicas/SignupApi"
import { browserHistory } from "react-router";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
      senha: null,
      confirmaSenha: null,
      urlPerfil: null,
      errorSenha: null,
      errorLogin: null,
      errorApi: null,
      showErrors: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }
   
 handleValidation(){
    let errors = []; 
      // Verificando se a senha é a mesma que a de confirmação
      if (this.state.senha !== this.state.confirmaSenha){
        errors = [...errors, 'Senha não confere']
        this.setState({ errorSenha: "Senha não confere" });
      } else {
        this.setState({ errorSenha: "" });
      } 

      // Verificando se o login é igual a senha
      if (this.state.login === this.state.senha) {
        errors = [...errors, 'Senha igual ao username']
        this.setState({ errorLogin: "Senha igual ao username" });
      } else {
        this.setState({ errorLogin: "" });
      }

      return errors
  }

  handleSubmit (){
    const hasErrors = this.handleValidation().length > 0

    //Verificando se não possui erros para então fazer a requisição
    if (!hasErrors){
      SignupApi.postSignup(this.state.login, this.state.senha, this.state.urlPerfil)
      .then(() => {
        // Apagando o erro e redirecionando para a tela de login
        this.setState({errorApi: ''})
        browserHistory.push('/')
      })
      .catch(err => {
        // Setando o erro e limpando os campos
        this.setState({errorApi: 'Não foi possivel realizar o cadastro'})
        this.setState({login: '', senha: '', confirmaSenha: '', urlPerfil: ''})
      })
    }
}
  
  render() {
    const { errorSenha, errorLogin, errorApi, showErrors } = this.state;
    return (
      <section className="signup-section">
        <h1 className="header-logo" >Instalura</h1>
        <h2 className="signup-subtitle" style={{fontSize: '1.25rem'}, {textAlign: 'center'}}> Cria sua conta. É simples e fácil 👍 </h2>
        <form onSubmit={(ev) => {
          ev.preventDefault()
          this.handleSubmit()
          this.setState({showErrors: true})
        }}
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
              onChange={ev => this.setState({confirmaSenha: ev.target.value})}
              value={this.state.confirmaSenha}
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
              required="true"
              placeholder="Digite a url do seu perfil"
              pattern='^(ftp|http|https):\/\/(avatars3)[^ "]+$'
              title="Url inválida"
              onChange={ev => this.setState({urlPerfil: ev.target.value})}
              value={this.state.urlPerfil}
            />
          </div>
          <button type="submit" className="button-submit">
            Signup
          </button>
          {(errorLogin ||
            errorSenha || errorApi) && showErrors && (
              <ul className="errors-list">
                {errorLogin && <li> {errorLogin} </li>}
                {errorSenha && <li> {errorSenha} </li>}
                {errorApi && <li> {errorApi} </li>}
              </ul>
            )}
            
        </form>
      </section>
    );
  }
}

export default Signup;
