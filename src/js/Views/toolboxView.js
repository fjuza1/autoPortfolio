import View from './View.js';
class ToolboxView extends View {
  constructor() {
    super();
    this.addHandlerHideShowDescription();
  }
  _parentElement = document.getElementById('myQA');
      _generateQAToolboxMarkup = (_data) => {
            this._data = _data;
            return this._data.map((qaTool) => {
            return `
              <div class="col-6 col-md-3 col-lg-2 mb-3">
                <div class="card h-100 shadow-sm">
                  <img src="${qaTool.imgPath}" class="card-img-top p-2" alt="${qaTool.name}" style="height: 120px; object-fit: contain;">
                  <button type="button card-button" class="btn btn-link d-block d-md-none" id="${qaTool.name.toLowerCase().replaceAll(" ", "-")}">Show description</button>
                  <div class="card-body p-2">
                    <h6 class="card-title mb-1">${qaTool.name}</h6>
                    ${qaTool.description ? `<p class="card-text small mb-0 d-none" data-btn=${qaTool.name.toLowerCase().replaceAll(" ", "-")}>${qaTool.description}</p>` : ''}
                  </div>
                </div>
              </div>
            `
            })
    }
    _hideShowDescription = (e) => {
      const target = e.target.closest('button');
      if(!target) return
      if(!target.classList.contains('btn-link')) return
      const btnID  = target.id; 
      const showDescriptionElement = document.querySelector(`[data-btn="${btnID}"]`);
      if(!showDescriptionElement) return
      showDescriptionElement.classList.toggle('d-none');
      target.textContent = showDescriptionElement.classList.contains('d-none') ? 'Show description' : 'Hide description';
    }
    addHandlerHideShowDescription() {
      this._parentElement.addEventListener('click', this._hideShowDescription.bind(this));
}
}
export default new ToolboxView();