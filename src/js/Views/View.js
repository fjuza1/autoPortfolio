import { wait } from '../helpers';
export default class View {
    constructor() {
        this._addHandlerSubmit.bind(this);
    }
    _generateMarkup(data) {
        return data.join('');
    }
    _getFields() {
        return Object.values(this._form)
    }
    _cleanup() {
        this._parentElement.innerHTML = '';
    }
    _render(_data) {
        if (Array.isArray(_data) && _data.length === 0) return this._renderError();
        this._cleanup();
        const markup = this._generateMarkup(_data);
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    //rendering msessage 
    _removeError(data) {
        const errorField = document.getElementById(data)
        const li = document.querySelector(`[data-ul = "${data}"]`)
        if (li) li.remove(li)
        const ul = document.querySelector('.list')
        if (ul && ul.children.length === 0) ul.remove();
        errorField.classList.remove('outlineField')
    }
    _renderError(options) {
        let messageMarkup;
        const exclamationError = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
        `;
        messageMarkup = `<div class="alert alert-danger" role="alert">${exclamationError}  ${this._err}</div>`;
        if (options) {
            if (options.close === true) messageMarkup = `<div class="alert alert-dismissible alert-danger" role="alert"> ${exclamationError} ${this._err}
           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
            if (options.disposeTime) {
                wait(() => {
                    this._cleanup();
                }, options.disposeTime)
            }
        }
        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', messageMarkup)
    }
    _renderSuccessMessage(options) {
        const checkIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
            </svg>
        `
        let sucessMessageMarkup;
        sucessMessageMarkup = `<div class="alert alert-success" role="alert">checkIcon ${checkIcon} ${this._msg}</div>`;
        if (options) {
            if (options.close === true) sucessMessageMarkup = `<div class="alert alert-dismissible alert-success" role="alert"> ${this._msg}
           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
            if (options.disposeTime) {
                wait(() => {
                    this._cleanup();
                }, options.disposeTime)
            }
        }
        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', sucessMessageMarkup);
    }
    //end
    //error handling
    _renderErrorList(errors) {
        this._cleanup()
        const lis = [];
        errors.forEach(err => {
            document.getElementById(err.id).classList.add('outlineField')
            lis[lis.length] = `<li data-ul="${err.id}">${err.name}</li>`
        })
        const ul = document.querySelector('.alert-danger.list')
        if (ul) ul.remove();
        const lisMarkup = `<div class="alert alert-danger list" <ul > ${this._generateMarkup(lis)} </ul></div>`
        this._parentElement.insertAdjacentHTML('afterbegin', lisMarkup)
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
    _errorRemoveEvent() {
        ['input', 'textarea', 'select', 'change'].forEach(ev => {
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
        window.addEventListener('load', handler);
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
    // alert evs
    _closeAlert() {
        this._parentElement.addEventListener('click', (e) => {
            const alert = e.target;
            if (alert && alert.type === 'button' && alert.closest('.alert').classList.contains('alert')) this._cleanup();
        });
    }
}