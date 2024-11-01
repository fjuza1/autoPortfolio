export default class View {
    constructor (){
        this._addHandlerSubmit.bind(this);
    }
    _generateMarkup(data){
        return data.join('');
    }
    _cleanup(){
        this._parentElement.innerHTML = '';
    };
    _render(_data){
        this._data = _data
        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', this._generateMarkup(this._data));
    }
    _renderMessage(){
        this._render(`<div class="alert alert-info" role="alert">${this._msg}</div>`)
    }
    _outlineErrors(errors){
        errors.forEach(err=>{
            const type = err.type;
            const message = err.message;
            const found = document.querySelector(`#${type}`)
            found.style.outline = 'none';
            found.textContent = ''
            found.style.outline = 'color: red';
            found.textContent = message
        }
        )
    }
    _renderErrorList(errors){
        errors.forEach(err=>err)
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
        values = values.map(el => el === 0 ? '' : el);
        const found = array.filter(item => keys.every((key, index) => String(item[key]).toLowerCase().includes(String(values[index]).toLowerCase())))
        this._data = found;
        return found
    }
    _submitEvent(e){
        e.preventDefault();
        const formEntries = [...new FormData(this._form)];
        const data = Object.fromEntries(formEntries);
        this._formData = data;
    }
    _addHandlerSubmit(handler) {
        this._form.addEventListener('submit', (e)=>{
            this._submitEvent(e)
            handler(this._formData);
        })
    }
    _addHandlerFormReset(handler) {
        this._form.addEventListener('reset', handler)
    }
}