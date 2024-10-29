export default class View {
    constructor (){
        this._addHandlerSubmit.bind(this);
    }
    _cleanup(){
        this._parentElement.innerHTML = '';
    };
    _render(data){
        if(typeof data !=='string') return new Error('Invalid value, must be a string')
        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', data)
    }
    _renderMessage(){
        this._render(`<div class="alert alert-info" role="alert">${this._msg}</div>`)
    }
    _renderSpinner(){
        const markup = `
        <div class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </div>`;
        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    _addHandlerSubmit(handler) {
        this._form.addEventListener('submit', (e)=>{
            e.preventDefault();
            const formEntries = [...new FormData(this._form)];
            const data = Object.fromEntries(formEntries);
            this._data = data;
            handler(data);
        })
    }
    _addHandlerFormReset(handler) {
        this._form.addEventListener('reset', handler)
    }
}