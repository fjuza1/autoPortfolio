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
    _handleFormSubmit(e) {
        e.preventDefault();
        const data = Object.fromEntries([...new FormData(this._form)])
        return data;
    }
    _addHandlerSubmit(handler) {
        ['submit'].forEach(ev=>this._form.addEventListener(ev,handler))
    }
}