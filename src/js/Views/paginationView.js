import View from './View.js';
class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');
    _pageStart = 1;
    addHandlerPagination(handler) {
        this._parentElement.addEventListener('click', (e) => {
            if(!e.target.id === 'loadMore')  return
            this._data.currentPage += 1;
                handler(this._data.currentPage);
        });
    }
    _generateMarkup(_data){
        this._data = _data;
        const curPage = this._data.currentPage;
        const numPages = this._data.pages;
        let markup = '';
        // Page 1, and there are other pages
        if(curPage < numPages) markup =  `
            <span class="d-block text-primary text-center py-2 cursor-pointer">Load more</span>
        `
        // If last page, no pagination needed
        if(curPage === numPages && numPages > 1) {
            markup =  ''
        }
        return [markup]
    }
}
export default new PaginationView();