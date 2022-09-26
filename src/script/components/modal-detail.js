import css from "bootstrap/dist/css/bootstrap.min.css";

export default class ModalDetail extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  closeModal() {
    this.querySelector("#close").addEventListener("click", () => {
      this.remove();
    });
  }

  render() {
    this.innerHTML = `
    <style>
    ${css}
    </style>

    <div
      class="modal fade"
      id="movieDetailModal"
      tabindex="-1"
      aria-labelledby="movieDetailModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="movieDetailModalLabel">
              Modal title
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              id="close"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

customElements.define("modal-detail", ModalDetail);
