import onError from "../utils/onError";

export default class MainApi {
  constructor(server) {
    this.server = server;
  }

  // signup регистрирует нового пользователя;
  // signin аутентифицирует пользователя на основе почты и пароля;
  // getUserData возвращает информацию о пользователе;
  // getArticles забирает все статьи;
  // createArticle создаёт статью;
  // removeArticle удаляет статью.

  signup(email, password, name) {
    this.email = email;
    this.password = password;
    this.name = name;

    return fetch(this.server + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.name,
        email: this.email,
        password: this.password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`error: ${res.status}`);
    });
  }

  signin(email, password) {
    this.email = email;
    this.password = password;

    return fetch(this.server + "signin", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`error: ${res.status}`);
      })
      .then((data) => {
        // сохраняем токен
        localStorage.setItem("token", data.token);
      });
  }
}
