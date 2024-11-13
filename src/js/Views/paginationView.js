class PaginationView{
    _parentElement = document.querySelector('.pagination');

    _getNumPages(_data) {
        return Math.ceil(_data.data.length / _data.resPerPage);
    }
    _generateMarkup(_data){
        let markup
        const curPage = _data.currentPage;
        const numpages = this._getNumPages(_data);
        // Page 1, and there are other pages
        if(curPage < numpages) markup = `
            <span class="d-block text-primary text-center py-2 cursor-pointer">Load more</span>
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