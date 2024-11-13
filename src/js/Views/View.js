export default class View {
    constructor() {
        this._addHandlerSubmit.bind(this);
    }
    _generateMarkup(data) {
        return data.join('');
    }
    _cleanup() {
        this._parentElement.innerHTML = '';
    }
    _render(_data) {
        if (Array.isArray(this._data) && this._data.length === 0) return this._renderError()
        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', this._generateMarkup(_data));
    }
    _showState(string) {
        if(typeof string !== 'string') throw new TypeError('string expected');
        return  markup = `
                <p>${string}</p>
            <div class="spinner-grow text-primary" role="status">
                <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-secondary" role="status">
                <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-success" role="status">
                <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-danger" role="status">
                <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-warning" role="status">
                <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-info" role="status">
                <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-light" role="status">
                <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-dark" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        `
    }
    //rendering msessage 
    _renderError() {
        const messageMarkup = `<div class="alert alert-danger" role="alert">${this._msg}</div>`;
        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', messageMarkup)
    }
    _renderSuccessMessage() {
        this._cleanup();
        const successAlert = `
        <div class="alert alert-success alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        ${this._msg}
        </div>`
        this._parentElement.insertAdjacentHTML('afterbegin', successAlert);
    }
    //end
    //error handling
    _renderErrorList(errors) {
        errors.forEach(err => err)
    }
    //end
    //spinner
    _renderSpinner() {
        const markup = `
        <div class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </div>`;
        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    //end
    //form
    _submitEvent(e) {
        e.preventDefault();
        const formEntries = [...new FormData(this._form)];
        const data = Object.fromEntries(formEntries);
        this._formData = data;
    }
    //end
    _addHandlerLoad (handler){
        window.addEventListener('load', handler)
    }
    //form
    _addHandlerSubmit(handler) {
        this._form.addEventListener('submit', (e) => {
            this._submitEvent(e)
            handler(this._formData);
        })
    }
    _addHandlerFormReset(handler) {
        this._form.addEventListener('reset', handler)
    }
    //end
}