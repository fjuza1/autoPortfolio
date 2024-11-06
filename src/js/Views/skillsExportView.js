import View from './View.js';
import { toFile }  from '../model.js';
class SkillsExportView extends View {
    _form = document.querySelector('.exportActivities');
    _parentElement = document.getElementById('exportModal')
    _fileType = document.querySelector('.content.d-none');
    _fileName = document.querySelector('input[name="fileName"]')
    constructor(){
        super();
        this._form.addEventListener('change', () => {
            this._revealExportContainer()
        });
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
    export(options){
        this._removeOutlineError();
        this._formData = options
        const fileErrors = toFile(options)
        const fileType = fileErrors.find(err=>err.type === 'fileType')
        const fileName = fileErrors.find(err=>err.type === 'fileName')
        if(fileType) this._outlineError({type: fileType.type,message:fileType.message})
            else if (!fileType) this._outlineError({type: fileName.type,message:fileName.message})
    }
    _errorRemoveEvent() {
        ['input', 'change'].forEach(ev => {
            this._form.addEventListener(ev, () => {
                this._removeOutlineError();
            });
        });
    }
}
export default new SkillsExportView();