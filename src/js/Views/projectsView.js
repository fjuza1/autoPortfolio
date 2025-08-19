import View from './View.js';
import {DEFAULT_INTERVAL} from '../config.js';
class ProjectsView extends View {
  _parentElement = document.getElementById('carouselProjects');
  _modal = document.getElementById('modalCenter');
  _end = '</div>'
  _renderSlidesMarkup(options) {
      let { interval, array } = options;
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
  /**
   * Generates the indicators for the carousel.
   *
   * @param {Array} data - An array of data objects to create indicators for.
   * @returns {Array} - An array containing the HTML markup for the carousel indicators.
   *
   * @example
   * const data = [
   *   { name: 'Project 1', description: 'Description of Project 1', types: ['Type 1', 'Type 2'] },
   *   { name: 'Project 2', description: 'Description of Project 2', types: ['Type 3', 'Type 4'] },
   * ];
   * const indicators = projectsView.#indicators(data);
   * console.log(indicators);
   * // Output:
   * // [
   * //   '<div class="carousel-indicators">',
   * //   '<button type="button" class="active" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" aria-label="Slide 0"></button>',
   * //   '<button type="button" class="" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 1"></button>',
   * //   '</div>'
   * // ]
   */
  #indicators(data) {
      const indicatorsStart = '<div class="carousel-indicators">'
      const buttonIndicatorsMarkup = data.map((_, i) => {
          return `<button type="button" class=" ${i === 0 ? 'active' : ''}" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}" aria-label="Slide ${i}"></button>`;
      })
      return [indicatorsStart, ...buttonIndicatorsMarkup, this._end];
  }

  /**
   * Generates the HTML markup for the carousel inner content.
   *
   * @param {Array} array - An array of data objects to create carousel items for.
   * @param {number|boolean} interval - The interval at which the carousel should automatically slide.
   * If `true`, the interval is set to the default value from the `DEFAULT_INTERVAL` constant.
   * If `false` or not provided, the carousel does not automatically slide.
   *
   * @returns {Array} - An array containing the HTML markup for the carousel inner content.
   *
   * @example
   * const data = [
   *   { name: 'Project 1', description: 'Description of Project 1', types: ['Type 1', 'Type 2'] },
   *   { name: 'Project 2', description: 'Description of Project 2', types: ['Type 3', 'Type 4'] },
   * ];
   * const interval = 5000; // 5 seconds
   * const carrouselInner = projectsView.#carrouselInner(data, interval);
   * console.log(carrouselInner);
   * // Output:
   * // [
   * //   '<div class="carousel-inner" role="listbox">',
   * //   '<div class="carousel-item active" data-bs-interval="5000">',
   * //   '  ...',
   * //   '</div>',
   * //   '<div class="carousel-item" data-bs-interval="5000">',
   * //   '  ...',
   * //   '</div>',
   * //   '</div>'
   * // ]
   */
  #carrouselInner(array, interval) {
      if ((typeof interval !== 'number') && (typeof interval !== 'boolean' || interval === false)) return;
      if (interval === true) interval = DEFAULT_INTERVAL * 1000;
      const carouselInnerStart = `<div class="carousel-inner" role="listbox">`
      const carrouselItem = array.map((data, i) => {
          return `
           <div class="carousel-item ${i === 0 ? 'active' : ''} " data-bs-interval="${interval ? interval : ''}">
             <div class="d-flex flex-column align-items-center justify-content-center text-center w-100 h-100">
               <h4 class="fs-3 fw-bold text-uppercase text-primary mb-sm-2 mb-md-0">${data.name}</h4>
               <p class="fs-5 text-secondary mb-sm-2 mb-md-0 lh-base w-50">${data.description}</p>
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

  /**
   * Renders the project modal with demo instructions and project details.
   *
   * @param {Array} _data - An array of objects containing demo information.
   * Each object should have the following properties:
   * - imgPath: The path to the demo image.
   * - url: The URL of the demo.
   *
   * @returns {void}
   *
   * @example
   * const demos = [
   *   { imgPath: 'path/to/demo1.jpg', url: 'https://demo1.com' },
   *   { imgPath: 'path/to/demo2.jpg', url: 'https://demo2.com' },
   * ];
   * projectsView._renderProjectModal(demos);
   */
  _renderProjectModal(_data) {
      this._data = _data;

      const cardContent = this.#contentProjectModal();

      const demoInstructions = this.#demoInfo()

      const modalMarkup = `
               <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                   <div class="modal-content">
                       <div class="modal-header">
                           <button type="button" class="btn-close dismiss-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                       </div>
                       <div class="modal-body">
                           <div class="container-fluid">
                                ${demoInstructions}
                               <div class="row g-3">
                                   ${cardContent}
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
   `;
      this._modal.innerHTML = '';
      this._modal.insertAdjacentHTML('afterbegin', modalMarkup);
  }

  #demoInfo() {
      // Render demo info here
      return `
   <div class="jumbotron jumbotron-fluid">
     <h5 class="display-5">How to start a demo</h5>
     <p class="lead">Example instructions: </p>
     <ol>
       <li>Download or clone the repository from GitHub</li>
       <li>Open CMD/Powershell and navigate to the folder</li>
       <li>Run npm i to install dependencies</li>
       <li>Run npm start to launch Cypress</li>
       <li>Wait for Cypress to launch and start running the tests</li>
     </ol>
   </div>
   `
  }
  /**
   * Generates the HTML markup for the project modal content.
   *
   * @private
   * @returns {string} - The HTML markup for the project modal content.
   *
   * @example
   * const projectsView = new ProjectsView();
   * const cardContent = projectsView.#contentProjectModal();
   * console.log(cardContent);
   * // Output:
   * // '<div class="col-12">
   * //     <div class="card mb-3 w-100">
   * //         <img loading="lazy" class="card-img-top img-fluid img-thumbnail" src="path/to/demo1.jpg" alt="Card image cap">
   * //         <div class="card-body">
   * //             <p class="card-text">
   * //                 <u><a href="https://demo1.com" target="_blank">https://demo1.com</a></u>
   * //             </p>
   * //         </div>
   * //     </div>
   * //     ...
   * // </div>'
   */
  #contentProjectModal() {
      const cardContent = `
      <div class="col-12">
          ${this._data
              .map(demo => `
                  <div class="card mb-3 w-100">
                      <img loading="lazy" class="card-img-top img-fluid img-thumbnail" src="${demo.imgPath}" alt="Card image cap">
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
