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
        const messageMarkup = `<div class="alert alert-danger" role="alert">${this._err}</div>`;
        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', messageMarkup)
    }
    _renderErrorAfter() {
        const messageMarkup = `<div class="alert alert-danger" role="alert">${this._err}</div>`;
        console.log(this._parentElement.lastElementChild);
        this._parentElement.insertAdjacentHTML('afterend', messageMarkup)
    }
    _removeError(data){
        const errorField = document.getElementById(data)
        const li = document.querySelector(`[data-ul = "${data}"]`)
        if(li) li.remove(li)
        const ul = document.querySelector('.list')
        if(ul && ul.children.length === 0) ul.remove();
        errorField.classList.remove('outlineField')
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
        const lis = [];
        errors.forEach(err => {
            document.getElementById(err.id).classList.add('outlineField')
            lis[lis.length] = `<li data-ul="${err.id}">${err.name}</li>`
        })
        const ul = document.querySelector('.alert-danger.list')
        if(ul) ul.remove();
        const lisMarkup = `<div class="alert alert-danger list" <ul > ${this._generateMarkup(lis)} </ul></div>`
        this._parentElement.insertAdjacentHTML('afterend', lisMarkup)
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
        ['input','textarea','select','change'].forEach(ev=>{
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