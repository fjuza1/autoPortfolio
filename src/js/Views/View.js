import * as model from '../model.js'
export default class View {
    _parentElement = null;
    _msg = ''
    _form = ''
    super(){
        this._addHandlerSubmit.bind(this);
    }
    _cleanup(){
        this._parentElement.innerHTML = '';
    };
    _render(el){
        if(typeof el !=='string') return new Error('Invalid value, must be a string')
        this._cleanup();
        this._parentElement.innerHTML = el
    }
    _renderMessage(){
        this._render(`<div class="alert alert-info" role="alert">${this._msg}</div>`)
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
}