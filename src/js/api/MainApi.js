export default class MainApi {
  constructor(server) {
    this.server = server;
  }

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
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        return data;
      }
      return Promise.reject({ message: data.message });
    });
  }

  signin(email, password) {
    this.email = email;
    this.password = password;

    return fetch(this.server + "signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          return data;
        }
        return Promise.reject({ message: data.message });
      })

      .then((data) => {
        localStorage.setItem("token", data.token);
        return data;
      });
  }

  checkStatus() {
    console.log(
      "checking status of token:",
      JSON.stringify({ token: localStorage.getItem("token") })
    );
    return fetch(this.server + "users/me", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject();
    });
  }

  createArticle(articleData) {
    this.articleData = articleData;

    return fetch(this.server + "articles/", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(articleData),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`error: ${res.status}`);
    });
  }

  //////////////
  getArticles() {
    return fetch(this.server + 'articles', {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
  })
      .then((res) => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`error: ${res.status}`);
      })
      .then((articles) => {
          return articles;
      });
  }

  removeArticle(cardId) {
    this.cardId = cardId;

    return fetch(this.server  + 'articles/' + this.cardId, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        },
        method: "DELETE"
    })
    .then((res) => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`error: ${res.status}`);
  })
}
}
