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

    return new Promise((resolve, reject) => {
      fetch("http://localhost:8080/usuarios", requestInfo)
        .then(res => {
          if (res.ok) {
            resolve();
          } else {
            throw new Error("Não foi possivel fazer o cadastro");
          }
        })
        .catch(err => reject(err));
    });
  }
}
