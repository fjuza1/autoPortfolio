import View from './View.js';
class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');
    _flag = false;
    addHandlerPagination(handler) {
        if(this._flag) return;
        this._parentElement.addEventListener('click', (e) => {
            if(e.target.id !== 'loadMore')  return
                const next = +e.target.dataset.pageNext
                handler(next);
        });
        this._flag = true;
    }
    _generateMarkup(_data){
        const curPage = _data.currentPage;
        const numPages = _data.pages;
        let markup = '';
        // Page 1, and there are other pages
        if(curPage < numPages) markup =  `
            <span class="d-block text-primary text-center py-2 cursor-pointer" data-page-next = "${curPage + 1}">Load more</span>
        `
        // If last page, no pagination needed
        if(curPage === numPages && numPages > 1) {
            markup =  ''
        }
        return [markup]
    }
}
export default new PaginationView();