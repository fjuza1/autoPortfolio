class PopupView {
    _multiCollapse = document.querySelectorAll('.multi-collapse.collapse');
    _body = document.body;
    _skillBtnGroup = document.getElementById('skillBtnGroup');
    _formBtn = document.querySelector('button[type="submit"]');
    _mobileNav = document.getElementById('mobileNav')
    _dropdownNav = document.querySelector('.dropdown-menu')
    _body = document.body;
    _modalToggle = document.querySelector('button[data-toggle="modal"]')
    _modal = document.getElementById('modalCenter');
    _closeModalButton = document.querySelector('[aria-label="Close"]')
    _toggleAccordionBtn = document.querySelector('.accordion-button');
    constructor() {
        this._addHandlerHideSection();
        this._addHandlerShowSection();
        this.addHandlerShowMobileNav();
        this._addHandlerHideDropdownNav();
        this._addHandleOpenModal();
        this._addHandleCloseModal();
        this._addHandleAccordion();
    }
    _toggleSection(e) {
        const btnSet = e.target.closest('.btn.btn-link').dataset.btn;
        const colapseSection = document.getElementById(`${btnSet}`);
        const isAlreadyShown = colapseSection.classList.contains('show');
        this._multiCollapse.forEach(section => section.classList.remove('show'));
        if (!isAlreadyShown) colapseSection.classList.add('show');
    }
    _toggleAccordion(e) {
        const target = e.target
        const openButton = target.closest('button')
        if(!openButton) return
        const sibling = openButton.dataset.bsTarget
        if(sibling){
            if(openButton.classList.contains('accordion-button')){
                const isOpen = openButton.classList.toggle('open');
                openButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                openButton.classList.toggle('collapsed');
            }
            document.getElementById(sibling.slice(1)).classList.toggle('show');
        }
    }
    _hideSection(e) {
        if(this._modal.classList.contains('show') && this._modal.style.display === 'block') return
        const target = e.target;
        const button = target.closest('button')?.tagName.toLowerCase()
        const multi = [...this._multiCollapse].some(el => el.contains(target));
        this._multiCollapse.forEach(el => !multi && !button ? el.classList.remove('show') : '');
    }
    showMobileNav() {
        const targetDropdownMenu = this._dropdownNav
        const isAlreadyShown = targetDropdownMenu.classList.contains('show');
        if(!isAlreadyShown) targetDropdownMenu.classList.add('show');
        else targetDropdownMenu.classList.remove('show');
	}
    hideMobileNav(e) {
        const targetDropdownMenu = this._dropdownNav;
        if (!targetDropdownMenu.contains(e.target) && e.target !== this._mobileNav) {
            targetDropdownMenu.classList.remove('show');
        }
        if (e.target.classList.contains('dropdown-item')) {
            targetDropdownMenu.classList.remove('show');
        }
    }
    addHandlerShowMobileNav () {
        this._mobileNav.addEventListener('click', this.showMobileNav.bind(this));
    }
    _addHandlerHideDropdownNav () {
        !document.addEventListener('mouseup', this.hideMobileNav.bind(this));
    }
    _addHandleAccordion(){
        document.addEventListener('click', this._toggleAccordion.bind(this));
    }
    _openModal(show){
        if(show === true) {
            this._modal.classList.add('show');
            this._modal.style.display = 'block';
            this._body.style.overflow = 'hidden'
        }
    }
    _closeModal(e) {
        const target = e.target.closest('button');
        if (!target) return;
    
        const targetClass = target.classList;
        if (!targetClass) return;
    
        if (targetClass.contains('dismiss-modal')) {
            this._modal.style.display = 'none';
            this._modal.classList.remove('show');
            this._body.style.overflow = 'auto';
        }
    }
    _addHandleOpenModal(){
        this._modalToggle.addEventListener('click', this._openModal.bind(this));
    }
    _addHandleCloseModal(){
        this._modal.addEventListener('click', this._closeModal.bind(this));
    }
    _addHandlerShowSection() {
        this._skillBtnGroup.addEventListener('click', this._toggleSection.bind(this));
    }
    _addHandlerHideSection() {
        !document.addEventListener('mouseup', this._hideSection.bind(this));
    }
}
export default new PopupView();