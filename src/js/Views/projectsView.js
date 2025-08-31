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
       <span class="visually-hidden">Previous slide</span>
     </button>
     <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
       <span class="carousel-control-next-icon" aria-hidden="true"></span>
       <span class="visually-hidden">Next slide</span>
     </button>
  `;
  return [indicators, carrouselInner, [endBtns]].flat();
}
#indicators(data) {
  const indicatorsStart = '<div class="carousel-indicators" role="tablist">';
  const buttonIndicatorsMarkup = data.map((_, i) => {
    return `<button type="button" class="${i === 0 ? 'active' : ''}" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}" aria-label="Slide ${i + 1}" ${i === 0 ? 'aria-current="true"' : ''}></button>`;
  });
  return [indicatorsStart, ...buttonIndicatorsMarkup, this._end];
}
#carrouselInner(array, interval) {
  if ((typeof interval !== 'number') && (typeof interval !== 'boolean' || interval === false)) return;
  if (interval === true) interval = DEFAULT_INTERVAL * 1000;
  const carouselInnerStart = `<div class="carousel-inner" role="listbox">`;
  const carrouselItem = array.map((data, i) => {
    return `
       <div class="carousel-item ${i === 0 ? 'active' : ''}" data-bs-interval="${interval ? interval : ''}">
         <div class="d-flex flex-column align-items-center justify-content-center text-center w-100 h-100 p-3">
           <h4 class="fs-3 fw-bold text-uppercase text-primary mb-2">${data.name}</h4>
           <p class="fs-5 text-secondary lh-base w-75 mx-auto">${data.description}</p>
         </div>
         <div class="carousel-caption d-none d-md-block">
           <h5 class="fs-6 fw-semibold text-dark">Types</h5>
           <p class="masthead-subheading text-muted mb-0">${data.types.join(' • ')}</p>
         </div>
       </div>
    `;
  });
  return [carouselInnerStart, ...carrouselItem, this._end];
}
_renderProjectModal(_data) {
  this._data = _data;

  const cardContent = this.#contentProjectModal();
  const demoInstructions = this.#demoInfo();

  const modalMarkup = `
     <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
       <div class="modal-content">
         <div class="modal-header border-bottom-0">
           <h5 class="modal-title fw-bold">Project Demo</h5>
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
  return `
    <section class="alert alert-info small">
      <h5 class="fw-bold mb-2">How to start a demo</h5>
      <p class="mb-2">Follow these steps to run the Cypress demo:</p>
      <ol class="mb-0 ps-3">
        <li>Download or clone the repository from GitHub</li>
        <li>Open CMD/Powershell and navigate to the folder</li>
        <li>Run <code>npm i</code> to install dependencies</li>
        <li>Run <code>npm start</code> to launch Cypress</li>
        <li>Wait for Cypress to start running the tests</li>
      </ol>
    </section>
  `;
}
#contentProjectModal() {
  const cardContent = `
    <div class="col-12">
      ${this._data
        .map(demo => `
          <div class="card mb-3 shadow-sm border-0 rounded-3">
            <img loading="lazy" class="card-img-top img-fluid" src="${demo.imgPath}" alt="Demo preview for ${demo.url}">
            <div class="card-body">
              <p class="card-text mb-0">
                <a href="${demo.url}" target="_blank" rel="noopener noreferrer" class="link-primary">
                  ${demo.url}
                </a>
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
