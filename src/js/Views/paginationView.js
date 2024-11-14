import View from './View.js';
class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');
    addHandlerPagination(handler) {
        this._parentElement.removeEventListener('click', this._paginationClickHandler);
        this._paginationClickHandler = (e) => {
            const pageNext = e.target.dataset.pageNext;
            if (!pageNext) return;
            const next = +pageNext;
            handler(next);
        };
        this._parentElement.addEventListener('click', this._paginationClickHandler);
    }
    
    _generateMarkup(_data){
        this._data = _data;
        const curPage = this._data.currentPage;
        const numPages = this._data.pages;
        let markup = '';
        // Page 1, and there are other pages
        if(curPage < numPages) markup =  `
            <span class="d-block text-primary text-center py-2 cursor-pointer" data-page-next = "${curPage + 1}">Load more</span>
        `
        // If last page, no pagination needed
        if(curPage === numPages && numPages > 1) {
            markup =  ''
        }
        console.log(markup);
        return [markup]
    }
}
export default new PaginationView();