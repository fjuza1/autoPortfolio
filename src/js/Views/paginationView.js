import View from './View.js';
import {loadMore} from '../model.js';
class PaginationView extends View {
    _parent = document.querySelector('.pagination');
    /**
     * Adds a click event listener to the pagination element to handle page navigation.
     *
     * @param {Function} handler - A callback function that will be called when a page is clicked.
     * The function should accept a single parameter:
     * @param {number} next - The next page number to navigate to.
     *
     * @returns {void}
     */
    addHandlerPagination(handler) {
        this._parent.removeEventListener('click', this._paginationClickHandler);
        this._paginationClickHandler = (e) => {
            const pageNext = e.target.dataset.pageNext;
            if (!pageNext) return;
            const next = +pageNext;
            handler(next);
        };
        this._parent.addEventListener('click', this._paginationClickHandler);
    }

    /**
     * Generate pagination markup into VIEW
     *
     * @param {*} _data
     * @returns {Array<string>}
     */
    _generateMarkup(_data) {
        this._data = _data;
        const curPage = this._data.currentPage;
        const numPages = this._data.pages;
        let markup = '';
        // Page 1, and there are other pages
        if (curPage < numPages) markup = `
            <span class="d-block text-primary text-center py-2 cursor-pointer" data-page-next = "${curPage + 1}">Load more</span>
        `
        // If last page, no pagination needed
        if (curPage === numPages && numPages > 1) {
            markup = ''
        }
        return [markup]
    }
    _handlePagination = (dataSource, callback) => {
        const paged = loadMore(dataSource)
        this._update(paged)
        callback(paged.data)

        this.addHandlerPagination((data) => {
            const updated = loadMore(dataSource, data)
            this._update(updated)
            callback(updated.data)
        })
    }
}
export default new PaginationView();