class PopupView {
    _multiCollapse = document.querySelectorAll('.multi-collapse.collapse');
    _skillBtnGroup = document.getElementById('skillBtnGroup');
    _skills = document.querySelector('#Skills')
    _formBtn = document.querySelector('button[type="submit"]');
    _mobileNav = document.getElementById('secondary-navigation')
    _dropdownNav = document.querySelector('.dropdown-menu')
    _body = document.body;
    _main = document.querySelector('main')
    _exportModalToggle = document.querySelector('button[data-toggle="modal"]')
    _projectsModalToggle = document.querySelector('[title="Get demos"]')
    _modal = document.getElementById('modalCenter');
    _closeModalButton = document.querySelector('[aria-label="Close"]')
    _toggleAccordionBtn = document.querySelector('.accordion-button');
    _mobileDropdownMenu = document.getElementById('mobileDropdownMenu');
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
    _hideSection(e) {
        if(this._modal.classList.contains('show') && this._modal.style.display === 'block') return
        const target = e.target;
        const button = target.closest('button')?.tagName.toLowerCase()
        const multi = [...this._multiCollapse].some(el => el.contains(target));
        this._multiCollapse.forEach(el => !multi && !button ? el.classList.remove('show') : '');
    }
    _toggleAccordion(e) {
        const target = e.target
        const openButton = target.closest('button')
        if(!openButton) return
        const sibling = openButton.dataset.bsTarget
        const isAccordionButton = openButton.classList.contains('accordion-button')
        if(sibling && isAccordionButton){
            if(openButton.classList.contains('accordion-button')){
                const isOpen = openButton.classList.toggle('open');
                openButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                openButton.classList.toggle('collapsed');
            }
            document.getElementById(sibling.slice(1)).classList.toggle('show');
        }
    }
    showMobileNav(e) {
        this._mobileDropdownMenu.classList.toggle('show');
	}
    hideMobileNav(e) {
        const targetDropdownMenu = e.target;
        if (targetDropdownMenu.classList.contains('dropdown-item')) {
            targetDropdownMenu.classList.remove('show');
        } else if (targetDropdownMenu !== this._mobileNav) {
            this._mobileDropdownMenu.classList.remove('show');
        }
    }
    addHandlerShowMobileNav () {
        this._mobileNav.addEventListener('click', this.showMobileNav.bind(this));
    }
    _addHandlerHideDropdownNav () {
        [this._main,this._dropdownNav].forEach((listener)=>{listener.addEventListener('mouseup', this.hideMobileNav.bind(this))})
    }
    _addHandleAccordion(){
        [this._modal].forEach(dom => dom.addEventListener('click',this._toggleAccordion.bind(this)))
    }
    _openModal(open){
        if(open === true){
            this._modal.classList.add('show');
            this._modal.style.display = 'block';
            this._body.style.overflow = 'hidden'
        }
    }
    #unshowModal(){
        this._modal.style.display = 'none';
        this._modal.classList.remove('show');
        this._body.style.overflow = 'auto';
        this._modal.innerHTML = '';
    }
    _closeModal(e) {
        if(e.type === 'keydown') {
            if(e.key === 'Escape') this.#unshowModal()
        }
        if(e.type === 'click') {
            const target = e.target;
            const targetClosest = target.closest('button');
            if(target.id.toLowerCase().includes('modal')) this.#unshowModal()
            if (!targetClosest) return;
            const targetClass = targetClosest.classList;
            if (!targetClass) return;
            if (targetClass.contains('dismiss-modal'))
                this.#unshowModal()
        }
    }
    // modal evs
    _addHandleOpenModal(handler){
        [this._projectsModalToggle].forEach(btn => {
            btn.addEventListener('click', (e) =>{
                const dataModal = e.target.closest('button');
                const modalDataset = dataModal.dataset;
                if(!modalDataset) return;
                if(modalDataset.toggle === 'modal'){
                    if(!handler) this._openModal(true)
                        else handler(this._openModal(true));
                }
            });
        });
    }
    _addHandleCloseModal(){
        this._modal.addEventListener('click', this._closeModal.bind(this))
        document.addEventListener('keydown', this._closeModal.bind(this));
    }
    //section evs
    _addHandlerShowSection() {
        this._skillBtnGroup.addEventListener('click', this._toggleSection.bind(this));
    }
    _addHandlerHideSection() {
        this._skills.addEventListener('mouseup', this._hideSection.bind(this));
    }
}
export default new PopupView();