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
        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', this._generateMarkup(_data));
    }
    _renderMessage(){
        this._render(`<div class="alert alert-info" role="alert">${this._msg}</div>`)
    }
    _outlineErrors(errors) {
        let found;
        let dataset;
        errors.forEach(err => {
            const type = err.type;
            const message = err.message;
            dataSet = document.querySelector(`div[data-formerror="${type}"]`);
            found = document.querySelector(`#${type}`);
            if (found) found.style.outline = 'none';
            if (dataSet) dataSet.textContent = '';
            if (found) found.style.outline = '2px solid red !important';
            if (dataSet) dataSet.textContent = message;
        });
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
    _submitEvent(e){
        e.preventDefault();
        const formEntries = [...new FormData(this._form)];
        const data = Object.fromEntries(formEntries);
        this._formData = data;
    }
    _addHandlerLoad = (handler) => window.addEventListener('load', handler) 
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