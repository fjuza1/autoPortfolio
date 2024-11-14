class PaginationView{
    _parentElement = document.querySelector('.pagination');
    _pageStart = 0;
    addHandlerPagination(handler) {
        this._parentElement.addEventListener('click', (e) => {
            if(e.target.id === 'loadMore') {
                handler(this._data.currentPage ++);
            }
        });
    }
    _getNumPages(_data) {
        this._data = _data
        console.log(this._data);
        return Math.ceil(this._data.data.length / this._data.resPerPage);
    }
    _generateMarkup(_data){
        this._data = _data
        let markup
        const curPage = _data.currentPage;
        const numpages = this._getNumPages(_data);
        // Page 1, and there are other pages
        if(curPage < numpages) markup = `
            <span class="d-block text-primary text-center py-2 cursor-pointer" id="loadMore" >Load more</span>
        `
        // If last page, no pagination needed
        if(curPage === numpages && numpages > 1) {
            markup = ''
        }
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}
export default new PaginationView();