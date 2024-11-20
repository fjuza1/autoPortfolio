import View from './View.js';
import {DEFAULT_INTERVAL} from '../config.js';
class ProjectsView extends View {
  _parentElement = document.getElementById('carouselProjects');
  _modal = document.getElementById('modalCenter');
  _end = '</div>'
  _renderSlidesMarkup(options) {
      let {
          interval,
          array
      } = options;
      if (!interval) interval = 0;
      const indicators = this.#indicators(array);
      const carrouselInner = this.#carrouselInner(array, interval);
      const endBtns = `
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
    `
      return [indicators, carrouselInner, [endBtns]].flat()
  }
  #indicators(data) {
      const indicatorsStart = '<div class="carousel-indicators">'
      const buttonIndicatorsMarkup = data.map((data, i) => {
          return `<button type="button" class=" ${i === 0 ? 'active' : ''}" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}" aria-label="Slide ${i}"></button>`;
      })
      return [indicatorsStart, ...buttonIndicatorsMarkup, this._end];

  }
  #carrouselInner(array, interval) {
      if ((typeof interval !== 'number') && (typeof interval !== 'boolean' || interval === false)) return;
      if (interval === true) interval = DEFAULT_INTERVAL * 1000;
      const carouselInnerStart = `<div class="carousel-inner" role="listbox">`
      const carrouselItem = array.map((data, i) => {
          return `
              <div class="carousel-item ${i === 0 ? 'active' : ''} " data-bs-interval="${interval ? interval : ''}">
                <div class="d-flex flex-column align-items-center justify-content-center text-center w-100 h-100">
                  <h4 class="fs-3 fw-bold text-uppercase text-primary mb-3">${data.name}</h4>
                  <p class="fs-5 text-secondary mb-4">${data.description}</p>
                </div>
                <div class="carousel-caption">
                  <h5 class="fs-5 fs-md-4 fs-lg-3">Types</h5>
                <p class="masthead-subheading font-weight-light text-muted mb-0">
                    ${data.types.join(' • ')}
                 </p>
                </div>
              </div>
    `
      })
      return [carouselInnerStart, ...carrouselItem, this._end];
  }
  _renderProjectModal(_data) {
    // Ensure modal is extra-large and scrollable
    if (!this._modal.classList.contains('modal-xl')) this._modal.classList.add('modal-xl');
    this._data = _data;

    // Clear any previous content inside the modal
    this._modal.innerHTML = '';

    // Generate side navigation and card content
    const sideNav = this.#sideNavProjectModal();
    const cardContent = this.#contentProjectModal();

    // Modal markup with scrollable layout
    const modalMarkup = `
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row g-3">
                            ${sideNav} <!-- Sidebar -->
                            ${cardContent} <!-- Cards -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Insert modal markup into the DOM
    this._modal.insertAdjacentHTML('afterbegin', modalMarkup);
}

#sideNavProjectModal() {
    // Sidebar content with responsive design
    const sideNav = `
        <div class="col-12 col-md-4 bg-light p-3" style="overflow-y: auto; max-height: 80vh;"> <!-- Added scroll for large content -->
            ${this._data
                .map(item => `<h5><a href="#">${item.name}</a></h5>`)
                .join('')}
        </div>
    `;
    return sideNav;
}

#contentProjectModal() {
    // Main content area with responsive cards
    const cardContent = `
        <div class="col-12 col-md-8" style="overflow-y: auto; max-height: 80vh;"> <!-- Added scroll for large content -->
            ${this._data
                .map(demo => `
                    <div class="card mb-3">
                        <img class="card-img-top" src="${demo.imgPath}" alt="Card image cap">
                        <div class="card-body">
                            <p class="card-text">
                                <u><a href="${demo.url}" target="_blank">${demo.url}</a></u>
                            </p>
                        </div>
                    </div>
                `)
                .join('')}
        </div>
    `;
    return cardContent;
}


}
export default new ProjectsView();