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
    })
    .then(async(res) => {
      const data = await res.json();
      if (res.ok) {
        return data;
      }
      return Promise.reject({message: data.message});
    })
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
      .then(async(res) => {
        const data = await res.json();
        if (res.ok) {

          // console.log('data', data.name)

          return data;
        }
        return Promise.reject({message: data.message});
      })

      .then((data) => {
        localStorage.setItem("token", data.token);
        return data;
      })


      // .then((res) => {
      //   return res.json().then((data)=>{
      //     if (res.ok) {
      //       return data;
      //     }
      //     return Promise.reject({message: data.message});
      //   })
      // })
      // .then((res) => {
      //   const data = await res.json();
      //   if (res.ok) {
      //     return data;
      //   }
      //   return Promise.reject({message: data.message});
      // })
      // .then((data) => {
      //   localStorage.setItem("token", data.token);
      // });


  }
}
