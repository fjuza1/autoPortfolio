import View from './View.js';
class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    _getNumPages(_data) {
        return Math.ceil(this._data.length / this.resPerPage);
    }
    _generateMarkup(_data){
        const curPage = this.currentPage;
        const numpages = this._getNumPages(_data);
        // Page 1, and there are other pages
        if(curPage < numpages) return `
            <span class="d-block text-primary text-center py-2 cursor-pointer">Load more</span>
        `
        // If last page, no pagination needed
        if(curPage === numpages && numpages > 1) {
            return ''
        }
        return ''
    }
}
export default new PaginationView();