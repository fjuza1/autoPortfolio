import View from './View.js';
class SkillsExportView extends View {
    _form = document.querySelector('.exportActivities');
    _parentElement = document.querySelector('exportModal')
    _exportContainer = document.querySelector("#export > div > form > div.content.d-none.mb-4")
    _exportState = document.querySelector('div[data-formerror="fileName"]');
    _fileType = document.querySelector('.content.d-none');
    _fileName = document.querySelector('input[name="fileName"]')
    _modal = document.querySelector('#modalCenter')
    _generatingfileState = null;
    _selectedBTN = document.querySelector('.exportActivities button[type="submit"]');
    _isPrimaryBTN = false;
    constructor() {
        super();
        this._revealNameEvent();
        this.#errorRemoveEvent();
        this.#handlerSelectedBTN();
    }
    _cleanupModal() {
        this._modal.innerHTML = '';
    }
    _disableFilteredExportBTN(_data) {
        this._data = _data;
        if(this._data === false) this._selectedBTN.classList.add('disabled');
        else this._selectedBTN.classList.remove('disabled');
    }
    #handlerSelectedBTN (){
        this._form.addEventListener('click',(e)=>{
           this._isPrimaryBTN = e.target.classList.contains('btn-primary');
        })
    };
    _changeType() {
        const selectedVariable = document.querySelector('input[name="fileType"]:checked').value;
        document.getElementById('tp').innerText = `.${selectedVariable}`
    }
    _revealExportContainer() {
        if (this._fileType.classList.contains('d-none')) this._fileType.classList.remove('d-none');
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
    #setOutline(elementId, message) {
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
    #removeOutlineError() {
        const allFormErrors = document.querySelectorAll(`div[data-formerror]`);
        allFormErrors.forEach(dom => {
            dom.textContent = '';
            this._clearOutline(dom.dataset.formerror);
        });
    }
    _outlineError(options) {
        const {
            type,
            message
        } = options;
        this.#setOutline(type, message);
    }
    #errorRemoveEvent() {
        ['input', 'change', 'submit'].forEach(ev => {
            this._form.addEventListener(ev, () => {
                this.#removeOutlineError();
            });
        });
    }
    _revealNameEvent() {
        this._form.addEventListener('change', () => {
            this._revealExportContainer()
        });
    }
    _animateState(text) {
        this._cleanupModal();
        this._generatingfileState = document.getElementById('generatingfileState')
        const id = text.split(' ').join('').toLowerCase()
        const statusMarkup = `
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                </div>
                <div class="modal-body">
                <div id = "${id}State">
                    ${text} <div class="spinner-grow spinner-grow-sm text-primary" role="status">
                    <span class="sr-only"></span>
                    </div>
                    <div class="spinner-grow spinner-grow-sm text-secondary" role="status">
                    <span class="sr-only"></span>
                    </div>
                    <div class="spinner-grow spinner-grow-sm text-success" role="status">
                    <span class="sr-only"></span>
                    </div>
                    <div class="spinner-grow spinner-grow-sm text-danger" role="status">
                    <span class="sr-only"></span>
                    </div>
                    <div class="spinner-grow spinner-grow-sm text-warning" role="status">
                    <span class="sr-only"></span>
                    </div>
                    <div class="spinner-grow spinner-grow-sm text-info" role="status">
                    <span class="sr-only"></span>
                    </div>
                    <div class="spinner-grow spinner-grow-sm text-light" role="status">
                    <span class="sr-only"></span>
                    </div>
                    <div class="spinner-grow spinner-grow-sm text-dark" role="status">
                    <span class="sr-only"></span>
                    </div>
                </div>
                </div>
            </div>
            </div>
            `
        this._modal.insertAdjacentHTML('afterbegin', statusMarkup);
    }
    // _removeAnimationState (){
    //     this._exportState.nextElementSibling.remove();
    // }
    _exportModal(data) {
        this._cleanupModal();
        const markup = `
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Generation Done</h5>
                    </div>
                    <div class="modal-body">
                        <h5>Everything was generated</h5>
                        <div class="accordion open" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Detail
                                        <i class="bi bi-chevron-down ms-2"></i>
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <pre id="exportContent">${data.startsWith("<?xml") ? this.#escapeXml(data) : data}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer text-center">
                        <button type="button" class="btn btn-primary btn-lg w-100 dismiss-modal">OK</button>
                    </div>
                </div>
            </div>
        `;
        this._modal.insertAdjacentHTML('afterbegin', markup);
    }
    #escapeXml(unsafe) {
        return unsafe.replace(/[<>&'"]/g, function(c) {
            switch (c) {
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '&':
                    return '&amp;';
                case '\'':
                    return '&apos;';
                case '"':
                    return '&quot;';
            }
        });
    }
}
export default new SkillsExportView();