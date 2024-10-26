export default class FormView {
    _form = document.querySelector('form');
    constructor(){
        this._addHandlerSubmit(this._handleFormSubmit.bind(this));
    }
    _handleFormSubmit(e){
        e.preventDefault();
        const data = Object.fromEntries([...new FormData(this._form)])
    }
    _addHandlerSubmit(handler) {
        this._form.addEventListener('submit', handler);
    }
}