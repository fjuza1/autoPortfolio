class FormView {
    _multiCollapse = document.querySelectorAll('.multi-collapse.collapse');
    _body = document.body;
    _skillBtnGroup = document.getElementById('skillBtnGroup');
    _form = document.querySelector('form');
    constructor() {
        this._addHandlerSubmit(this._handleFormSubmit.bind(this));
        this._addHandlerHideSection();
        this._addHandlerShowSection();
    }
    _toggleSection(e) {
        const btnSet = e.target.closest('.btn.btn-link').dataset.btn;
        const colapseSection = document.getElementById(`${btnSet}`);
        const isAlreadyShown = colapseSection.classList.contains('show');
        this._multiCollapse.forEach(section => section.classList.remove('show'));
        if (!isAlreadyShown) colapseSection.classList.add('show');
    }
    _hideSection(e) {
        const target = e.target;
        const button = target.closest('button')?.tagName.toLowerCase()
        const multi = [...this._multiCollapse].some(el => el.contains(target));
        this._multiCollapse.forEach(el => !multi && !button ? el.classList.remove('show') : '');
    }
    _handleFormSubmit(e) {
        e.preventDefault();
        const data = Object.fromEntries([...new FormData(this._form)])
    }
    _addHandlerShowSection() {
        this._skillBtnGroup.addEventListener('click', this._toggleSection.bind(this));
    }
    _addHandlerHideSection() {
        this._body.addEventListener('mouseup', this._hideSection.bind(this));
    }
    _addHandlerSubmit(handler) {
        this._form.addEventListener('submit', handler);
    }
}
export default new FormView();