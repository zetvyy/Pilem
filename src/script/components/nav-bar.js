import css from "bootstrap/dist/css/bootstrap.min.css";

class NavBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <style>
    ${css}
    </style>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3" style="bacground-color: #393e46;">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Pilem</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"      data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active" aria-current="page" href="#listMovie">Trending</a>
            <a class="nav-link active" aria-current="page" href="#listTopMovie">Top Rated</a>
          </div>
        </div>
      </div>
    </nav>
    `;
  }
}

customElements.define("nav-bar", NavBar);
