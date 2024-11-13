class PaginationView {
    _parentElement = document.querySelector('.pagination');

    _getNumPages(_data) {
        return Math.ceil(this._data.length / this._itemsPerPage);
    }
    _generateMarkup(){
        const curPage = this.currentPage;
        const numPages = this._getNumPages();
        // Page 1, and there are other pages
        if(curPage < numPages) return `
            <span class="d-block text-primary text-center py-2 cursor-pointer">Load more</span>
        `
        // If last page, no pagination needed
        if(curPage === numpages && numPages > 1) {
            return ''
        }
        return ''
    }
}
export default new PaginationView();