export default class View {
    constructor() {
        this._addHandlerSubmit.bind(this);
    }
    _generateMarkup(data) {
        return data.join('');
    }
    _getFields (){
        return Object.values(this._parentElement)
    }
    _cleanup() {
        this._parentElement.innerHTML = '';
    }
    _render(_data) {
        // If no data, render an error and exit
        if (Array.isArray(_data) && _data.length === 0) return this._renderError();
    
        // Clear content to prevent duplicates
        this._cleanup();
    
        // Generate new markup and add to the DOM
        const markup = this._generateMarkup(_data);
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    //rendering msessage 
    _renderError() {
        const messageMarkup = `<div class="alert alert-danger" role="alert">${this._msg}</div>`;
        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', messageMarkup)
    }
    _removeError(data){
        const errorFields = document.getElementById(data) 
        errorFields.classList.remove('outlineField')
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
        errors.forEach(err => {
            document.getElementById(err.id).classList.add('outlineField')
        })
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
    _errorRemoveEvent(){
        ['input','textarea','select','change','submit','keyup'].forEach(ev=>{
            this._form.addEventListener(ev, (e) => {
                this._removeError(e.target.id);
            })
        })
    }
    _submitEvent(e) {
        e.preventDefault();
        const formEntries = [...new FormData(this._form)];
        const data = Object.fromEntries(formEntries);
        this._formData = data;
    }
    //end
	addHandlerLoad(handler) {
        window.addEventListener('load',handler);
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