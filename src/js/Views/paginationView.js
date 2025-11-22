import View from './View.js';
import {loadMore} from '../model.js';
export default class PaginationView extends View {
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
        this._paginationParent.removeEventListener('click', this._paginationClickHandler);
        this._paginationClickHandler = (e) => {
            const pageNext = e.target.dataset.pageNext;
            if (!pageNext) return;
            const next = +pageNext;
            handler(next);
        };
        this._paginationParent.addEventListener('click', this._paginationClickHandler);
    }

    /**
     * Generate pagination markup into VIEW
     *
     * @param {*} _data
     * @returns {Array<string>}
     */
    _renderPagination(_data){
        this._data = _data;
        const markup = this._generatePaginationMarkup(this._data).join('');
        this._paginationParent.innerHTML = '';
        this._paginationParent.insertAdjacentHTML('afterbegin', markup);
    }
    _generatePaginationMarkup(_data) {
        this._data = _data;
        const curPage = this._data.currentPage;
        const numPages = this._data.pages;
        let markup = [];
        // Page 1, and there are other pages
        if (curPage < numPages) markup.push(`
            <span class="d-block text-primary text-center py-2 cursor-pointer" data-page-next = "${curPage + 1}">Load more</span>
        `);
        // If last page, no pagination needed
        if (curPage === numPages && numPages > 1) {
            markup = []
        }
        return markup
    }
    _handlePagination = (dataSource, callback) => {
        const paged = loadMore(dataSource)
        this._renderPagination(paged)
        callback(paged.data)

        this.addHandlerPagination((data) => {
            const updated = loadMore(dataSource, data)
            this._renderPagination(updated)
            callback(updated.data)
        })
    }
}