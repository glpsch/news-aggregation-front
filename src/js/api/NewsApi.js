import onError from "../utils/onError";

export default class NewsApi {
  constructor(url) {
    this.url = url;
  }

  getNews() {
    return fetch(new Request(this.url)).then(async function (response) {
      var r = await response.json();
      console.log({ r });
    });
  }
}
