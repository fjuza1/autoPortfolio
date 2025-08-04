import View from './View.js';
class ToolboxView extends View {
  _parentElement = document.getElementById('my qa toolbox');
      _generateQAToolboxMarkup = (_data) => {
            this._data = _data;
            return this._data.map((qaTool) => {
                return `<div class="col-md-4 box-shadow">
                      <div class="card mb-4 shadow-sm">
                        <img src="${qaTool.imgPath}" class="card-img-top" alt="${qaTool.name}">
                        <div class="card-body">
                          <h5 class="card-title">${qaTool.name}</h5>
                          <p class="card-text">${qaTool.description ? qaTool.description : ""}</p>
                    </div>
                  </div>
              </div>`
            })
    }
}
export default new ToolboxView();