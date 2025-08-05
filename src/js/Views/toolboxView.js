import View from './View.js';
class ToolboxView extends View {
  _parentElement = document.getElementById('myQA');
      _generateQAToolboxMarkup = (_data) => {
            this._data = _data;
            return this._data.map((qaTool) => {
            return `
              <div class="col-6 col-md-3 col-lg-2 mb-3">
                <div class="card h-100 shadow-sm">
                  <img src="${qaTool.imgPath}" class="card-img-top p-2" alt="${qaTool.name}" style="height: 120px; object-fit: contain;">
                  <div class="card-body p-2">
                    <h6 class="card-title mb-1">${qaTool.name}</h6>
                    ${qaTool.description ? `<p class="card-text small mb-0">${qaTool.description}</p>` : ''}
                  </div>
                </div>
              </div>
            `
            })
    }
}
export default new ToolboxView();