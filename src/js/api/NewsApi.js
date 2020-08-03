export default class NewsApi {

  getNews(url) {
    this.url = url;
    return fetch(new Request(this.url))
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          console.log({ data });
          return data;
        }
        return Promise.reject({ message: data.message });
      })
      .catch((err) => {
        console.error("newsApi failed:", err);
      });
  }
}
