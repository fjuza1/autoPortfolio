export default class View {
    constructor (){
        this._addHandlerSubmit.bind(this);
    }
    _cleanup(){
        this._parentElement.innerHTML = '';
    };
    _render(_data){
        if(typeof _data !=='string') return new Error('Invalid value, must be a string')
        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', _data)
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
    _filterByKeys(array,keys,values){
        return array.filter(item => keys.every((key, index) => String(item[key]).toLowerCase().includes(String(values[index]).toLowerCase())))
        /*
        ex 
        const cars = [{type: "Fiat", model: "500", color: "white"}];
        const options = {params: ['type', 'color'], values: ['Fiat', 'te']};
        const keys = options['params'];
        const values = options['values'];        
        */
    }
    _submitEvent(e){
        e.preventDefault();
        const formEntries = [...new FormData(this._form)];
        const data = Object.fromEntries(formEntries);
        this._data = data;
    }
    _addHandlerSubmit(handler) {
        this._form.addEventListener('submit', (e)=>{
            this._submitEvent(e)
            handler(this._data);
        })
    }
    _addHandlerFormReset(handler) {
        this._form.addEventListener('reset', handler)
    }
}