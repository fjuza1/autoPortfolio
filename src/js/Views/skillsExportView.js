import View from './View.js';
import { toFile }  from '../model.js';
import {UNGENERATED_FILE_MESSAGE} from  '../config.js';
class SkillsExportView extends View {
    _form = document.querySelector('.exportActivities');
    _parentElement = document.getElementById('exportModal')
    _fileType = document.querySelector('.content.d-none');
    _fileName = document.querySelector('input[name="fileName"]')
    constructor(){
        super();
        this._revealNameEvent();
        this._errorRemoveEvent();
    }
    _changeType(){
        const selectedVariable = document.querySelector('input[name="fileType"]:checked').value;
        document.getElementById('tp').innerText = `.${selectedVariable}`
    }
    _revealExportContainer(){
        if(this._fileType.classList.contains('d-none')) this._fileType.classList.remove('d-none');
        this._changeType()
    }
    _clearOutline(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            if (elementId === 'fileType') {
                // Clear outline on #fileType div
                element.style.outline = '';
            } else {
                // Clear outline on input field within element
                const inputField = element.querySelector('input');
                if (inputField) inputField.style.outline = '';
            }
        }
    }
    _setOutline(elementId, message) {
        const formErrorElement = document.querySelector(`div[data-formerror="${elementId}"]`);
        if (formErrorElement) {
            formErrorElement.textContent = message;
        }
    
        const element = document.getElementById(elementId);
        if (element) {
            if (elementId === 'fileType') {
                // Apply outline to entire #fileType div
                element.style.outline = '2px solid red';
            } else {
                // Apply outline to input field within element
                const inputField = element.querySelector('input');
                if (inputField) inputField.style.outline = '2px solid red';
            }
        }
    }
    _removeOutlineError() {
        const allFormErrors = document.querySelectorAll(`div[data-formerror]`);
        allFormErrors.forEach(dom => {
            dom.textContent = '';
            this._clearOutline(dom.dataset.formerror);
        });
    }
    _outlineError(options) {
        const { type, message } = options;
        this._setOutline(type, message);
    }
    _errorRemoveEvent() {
        ['input', 'change','submit'].forEach(ev => {
            this._form.addEventListener(ev, () => {
                this._removeOutlineError();
            });
        });
    }
    _revealNameEvent (){
        this._form.addEventListener('change', () => {
            this._revealExportContainer()
        });
    }
}
export default new SkillsExportView();