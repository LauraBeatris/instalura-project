import "isomorphic-fetch";

export default class SignupApi {
  static postSignup(login, senha, urlPerfil) {
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({ login, senha, urlPerfil }),
      headers: new Headers({
        "Content-type": "application/json",
        "X-AUTH-TOKEN": ""
      })
    };

    return fetch("http://localhost:8080/usuarios", requestInfo);
  }
}
