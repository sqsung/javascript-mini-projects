class NewsList extends HTMLElement {
  constructor() {
    super(); 

    this.category = 'all';
    this.size = 5;
    this.page = 1;
    this.innerHTML =
    `
    <div class="news-list-container">
      <article class="news-list"></article>
      <div class="scroll-observer">
          <img src="./img/ball-triangle.svg" alt="Loading..." />
      </div>
    </div>
    `;
  }

  async updateNewsList(cat, pg, sz) {
    const currentNewsList = document.querySelector('.news-list');
    const api = '3fb91bc39b5a462f93b8e29ae16f03d3';
    let received;

    try { 
      received = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr&category=${cat === 'all' ? '' : cat}&page=${pg}&pageSize=${sz}&apiKey=${api}`)
      received.data.articles.forEach(article => {
        currentNewsList.innerHTML += `
        <section class="news-item">
            <div class="thumbnail">
                <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                    <img src="${article.urlToImage}" alt="thumbnail" />
                </a>
            </div>
            <div class="contents">
                <h2>
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a>
                </h2>
                <p>${article.description}</p>
            </div>
        </section>`;
      })
    } catch(e) {
      console.log(`Check error: ${e}`);
    }
  }
  
  clearNewsList() {
    const currentNewsList = document.querySelector('news-list');
    currentNewsList.innerHTML =
        `
    <div class="news-list-container">
      <article class="news-list"></article>
      <div class="scroll-observer">
          <img src="./img/ball-triangle.svg" alt="Loading..." />
      </div>
    </div>
    `;
  }
}

window.customElements.define('news-list', NewsList);
export default NewsList;