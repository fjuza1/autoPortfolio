import { sanitizeHtml, wait, resetTimeout, calcToastPosition, objectToCSSClasses, escapeCSS, debounce} from '../helpers';
import {TOAST_DURATION, CREATE_TIME} from '../config.js'
export default class View {
    _toast_container = document.querySelector('.toast-container')
    constructor() {
        this.boundAddHandlerSubmit = this._addHandlerSubmit.bind(this);
        this.#addHandlerCloseToast();
    }
    /**
     * Description placeholder
     *
     * @param {Array<Object>} data
     * @returns {String}
     */
    _generateMarkup(data) {
        return data.join('');
    }
    /**
     * Getting inputs/textareas/selects from form
     *
     * @returns {Array} from forms
     */
    _getFields() {
        return Object.values(this._form)
    }
    /** Unsets parentElement to empty string */
    _cleanup() {
        this._parentElement.innerHTML = '';
    }
    /**
     * Rendering from Array into view.
     *
     * @param {Array} _data
     */
    _render(_data) {
        this._renderSpinner();
        if (Array.isArray(_data) && _data.length === 0) return this._renderError();
        this._cleanup();
        const markup = sanitizeHtml(this._generateMarkup(_data));
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    //rendering msessage 
    /**
     * Remoive errors from forms
     *
     * @param {Array<Object>} data
     */
    _removeError(data) {
        const errorField = document.getElementById(data)
        const li = document.querySelector(`[data-ul = "${data}"]`)
        if (li) li.remove(li)
        const ul = document.querySelector('.list')
        if (ul && ul.children.length === 0) ul.remove();
        errorField.classList.remove('outlineField')
    }
    /**
     * Rendering error into view based on object
     *
     * @param {Object} options
     */
    /**
     * Renders an error message into the view based on the provided options.
     *
     * @param {Object} options - Additional options for rendering the error message.
     * @param {boolean} [options.close=false] - If true, the error message will be dismissible.
     * @param {number} [options.disposeTime] - Time in milliseconds after which the error message will be disposed.
     *
     * @returns {void}
     */
    _closeToast(toast) {
        if(!toast) return;
        toast.remove();
    }
#addHandlerCloseToast() {
  this._toast_container.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-close');
    if (!btn) return;
    const toast = btn.closest('.toast');        // <— grab the toast element directly
    if (toast) this._closeToast(toast);
  });
}
    _hideToast(autohide, delayMs) {
    if (!autohide) return;
    const el = this._toast_container.firstElementChild; // you just inserted at 'afterbegin'
    if (!el) return;

    const hideIn = (typeof delayMs === 'number') ? delayMs : TOAST_DURATION * 1000;
    const debouncedHide = debounce(() => {
        // element might be gone or moved; double-check
        if (el && el.isConnected) this._closeToast(el);
    }, hideIn);

    debouncedHide();
    }
    #declareToastType(type){
		let toastType
		switch (type) {
			case 'error':
				toastType = 'toast-error';
				break;
			case 'info':
				toastType = 'toast-info';
				break;
			case 'warning':
				toastType = 'toast-warning';
				break;
			case 'success':
				toastType = 'toast-success';
				break;
			default:
				toastType = ''
		}
        return toastType
    }
    _renderToast(options) {
  const { title, msg, position, autohide, delay, type } = options;
    const toastType = this.#declareToastType(type)
  // position container
  this._toast_container.classList = 'toast-container p-3'
  this._toast_container.classList.add(
    ...objectToCSSClasses(calcToastPosition(position))
  );
  // build markup (fix attrs)
  //const closeBtnClass = autohide ? 'd-none' : 'd-block';
  // ${closeBtnClass}
  const toast = `
    <div class="toast fade show ${toastType}" role="alert" aria-live="assertive" aria-atomic="true"">
      <div class="toast-header ${toastType}">
        <strong class="me-auto">${title}</strong>
        <button type="button" class="btn-close btn-toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">${msg}</div>
    </div>
  `;

  // insert, then use your _hideToast
  this._toast_container.insertAdjacentHTML('afterbegin', sanitizeHtml(toast));
  this._hideToast(autohide, delay);
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
           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
            if (options.disposeTime) {
                wait(() => {
                    this._cleanup();
                }, options.disposeTime)
            }
        }
        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', messageMarkup);
    }
    /**
     * Renders a success message into the view based on the provided options.
     *
     * @param {Object} options - Additional options for rendering the success message.
     * @param {boolean} [options.close=false] - If true, the success message will be dismissible.
     * @param {number} [options.disposeTime] - Time in milliseconds after which the success message will be disposed.
     *
     * @returns {void}
     */
    _renderSuccessMessage(options) {
        const checkIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
            </svg>
        `;
        let successMessageMarkup;
        successMessageMarkup = `<div class="alert alert-success" role="alert">${checkIcon} ${this._msg}</div>`;
        if (options) {
            if (options.close === true) {
                successMessageMarkup = `<div class="alert alert-dismissible alert-success" role="alert"> ${this._msg}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
            }
            if (options.disposeTime) {
                wait(() => {
                    this._cleanup();
                }, options.disposeTime);
            }
        }

        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', successMessageMarkup);
    }
    //end
    //error handling
    /**
     * Renderts error list
     *
     * @param {Array<Object>} errors
     */
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
    /**
     * Renders a loading spinner into the view.
     *
     * @private
     * @returns {void}
     */
    _renderSpinner() {
        const markup = `
        <div class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </div>`;
        this._cleanup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
    /**
     * Handles the form submission event.
     *
     * @param {Event} e - The form submission event.
     *
     * @private
     * @returns {void}
     */
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
    _addHandlerSubmitChange(handler) {
        this._form.querySelectorAll('input, textarea, select')
            .forEach(input => {
            input.addEventListener('change', (e) => {
                this._submitEvent(e)
                handler(this._formData);
            })
        })
    }
    _addHandlerFormReset(handler) {
        this._form.addEventListener('reset', handler)
    }
    // alert evs
    /**
     * Handles the closing of alert messages in the view.
     *
     * @private
     * @returns {void}
     */
    _closeAlert() {
        this._parentElement.addEventListener('click', (e) => {
            const alert = e.target;
            /**
             * Check if the clicked element is a button and if it is a child of an alert element.
             * If both conditions are met, the alert is cleaned up.
             */
            if (alert && alert.type === 'button' && alert.closest('.alert').classList.contains('alert')) this._cleanup();
        });
    }
}