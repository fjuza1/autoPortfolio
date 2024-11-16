import View from './View.js';
class ProjectsView extends View {
    _parentElement = document.getElementById('carouselProjects');
    _end = '</div>'
    _renderSlides(options) {
        let {interval, array} = options;
        if(!interval) interval = 0;
        const indicators = this._indicators(array);
        const carrouselInner = this._carrouselInner(array, interval);
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
    _indicators(data) {
        const indicatorsStart = '<div class="carousel-indicators">'
        const buttonIndicatorsMarkup = data.map((data, i) => {
            return `<button type="button ${i === 0 ? 'active' : ''}" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}" aria-label="Slide ${i}"></button>`;
        })
        // return [indicatorsStart, ...buttonIndicatorsMarkup, this._end];

    }
    _carrouselInner(array,interval) {
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
        `
        })
        return [carouselInnerStart, ...carrouselItem, this._end];
    }
}
export default new ProjectsView();