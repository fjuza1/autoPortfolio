class FormView {
    _multiCollapse = document.querySelectorAll('.multi-collapse.collapse');
    _body = document.body;
    _skillBtnGroup = document.getElementById('skillBtnGroup');
    constructor() {
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
    _handleFormSubmit(form , e) {
        e.preventDefault();
        const data = Object.fromEntries([...new FormData(form)])
        return data;
    }
    _addHandlerShowSection() {
        this._skillBtnGroup.addEventListener('click', this._toggleSection.bind(this));
    }
    _addHandlerHideSection() {
        this._body.addEventListener('mouseup', this._hideSection.bind(this));
    }
    _addHandlerSubmit(handler) {
        ['submit','input'].forEach(ev=>form.addEventListener(ev,handler))
    }
}
export default new FormView();