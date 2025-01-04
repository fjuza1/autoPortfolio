import { KEYDOWN_TYPE, SCROLL_TYPE} from '../config.js';
class PopupView {
    _multiCollapse = document.querySelectorAll('.multi-collapse.collapse');
    _skillBtnGroup = document.getElementById('skillBtnGroup');
    _skills = document.querySelector('#Skills')
    _formBtn = document.querySelector('button[type="submit"]');
    _mobileNav = document.getElementById('secondary-navigation')
    _dropdownNav = document.querySelector('.dropdown-menu')
    _dropdownNavs = Array.from(document.querySelectorAll('.dropdown-menu'))
    _body = document.body;
    _main = document.querySelector('main');
    _nav = document.getElementById('navbarsExample03');
    _exportModalToggle = document.querySelector('button[data-toggle="modal"]')
    _projectsModalToggle = document.querySelector("#Projects > div > div > div > div.d-flex.align-items-center.justify-content-start.mb-4 > button > svg")
    _modal = document.getElementById('modalCenter');
    _closeModalButton = document.querySelector('[aria-label="Close"]')
    _toggleAccordionBtn = document.querySelector('.accordion-button');
    _mobileDropdownMenu = document.getElementById('mobileDropdownMenu');
    constructor() {
        this.#addHandlerHideSection();
        this.#addHandlerShowSection();
        this._addHandleOpenModal();
        this.#addHandleCloseModal();
        this.#addHandleAccordion();
        this.#handleTogglingMenu();
        this.#addHandlerShowMobileNav()
    }
    /**
     * Description placeholder
     *
     * @param {Event} e
     */
    #hideDropDownMenus () {
        this._dropdownNavs.forEach((dropdown) =>{
            if(dropdown.classList.contains('show')) dropdown.classList.remove('show')
        })
    }
    #toggleSection(e) {
        const btnSet = e.target.closest('.btn.btn-link').dataset.btn;
        const colapseSection = document.getElementById(`${btnSet}`);
        const isAlreadyShown = colapseSection.classList.contains('show');
        this._multiCollapse.forEach(section => section.classList.remove('show'));
        if (!isAlreadyShown) colapseSection.classList.add('show');
    }
    #hideSection(e) {
        if (this._modal.classList.contains('show') && this._modal.style.display === 'block') return
        const target = e.target;
        const button = target.closest('button')?.tagName.toLowerCase()
        const multi = [...this._multiCollapse].some(el => el.contains(target));
        this._multiCollapse.forEach(el => !multi && !button ? el.classList.remove('show') : '');
    }
    #toggleAccordion(e) {
        const target = e.target
        const openButton = target.closest('button')
        if (!openButton) return
        const sibling = openButton.dataset.bsTarget
        const isAccordionButton = openButton.classList.contains('accordion-button')
        if (sibling && isAccordionButton) {
            if (openButton.classList.contains('accordion-button')) {
                const isOpen = openButton.classList.toggle('open');
                openButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                openButton.classList.toggle('collapsed');
            }
            const element = document.getElementById(sibling.slice(1))
            element.classList.toggle('show');
        }
    }
    #togglePrimaryMenu(e) {
        const target = e.target;
        const isDropdownItem = target.classList.contains('dropdown-item');
        const closest = (target.closest('button') && !target.classList.contains('accordion')) || target.closest('a');
        const isDropdownToggle = target.classList.contains('dropdown-toggle') && target.classList.contains('dropdown-item');
        if(isDropdownItem) 
            this.#hideDropDownMenus();
        else if (target.dataset.navlink)
            this.#hideDropDownMenus();
        if (closest) {
            const menu = closest.dataset
            if(!menu) return
            const targetMenuId = menu.bsTarget?.slice(1) ?? null;
            const expandedMenu = document.getElementById(targetMenuId);
    
            if (expandedMenu) {
                const isCurrentlyOpen = expandedMenu.classList.contains('show');
                this.#hideDropDownMenus();

                if (!isCurrentlyOpen) {
                    expandedMenu.classList.add('show');
                }
            }
        } else if (!isDropdownToggle) {
            this.#hideDropDownMenus();
        }
    }
    #showMobileNav(e) {
        this._mobileDropdownMenu.classList.toggle('show');
    }
    #hideMobileNav() {
        if(this._mobileDropdownMenu.classList.contains('show')) this._mobileDropdownMenu.classList.remove('show');
    }
    #addHandlerShowMobileNav() {
        this._mobileNav.addEventListener('click', this.#showMobileNav.bind(this));
        window.addEventListener('resize', this.#hideMobileNav.bind(this));
        document.addEventListener(SCROLL_TYPE , this.#hideMobileNav.bind(this));
        document.addEventListener(SCROLL_TYPE , this.#hideDropDownMenus.bind(this));
    }
    #handleTogglingMenu() {
        document.addEventListener('click',this.#togglePrimaryMenu.bind(this))
    }
    #addHandleAccordion() {
        [this._modal].forEach(dom => dom.addEventListener('click', this.#toggleAccordion.bind(this)))
    }
    _openModal(open) {
        if (open === true) {
            this._modal.classList.add('show');
            this._modal.style.display = 'block';
            this._body.style.overflow = 'hidden'
        }
    }
    #unshowModal() {
        this._modal.style.display = 'none';
        this._modal.classList.remove('show');
        this._body.style.overflow = 'auto';
        this._modal.innerHTML = '';
    }
    #closeModal(e) {
        if (e.type === KEYDOWN_TYPE) {
            if (e.key === 'Escape') this.#unshowModal()
        }
        if (e.type === 'click') {
            const target = e.target;
            const targetClosest = target.closest('button');
            if (target.id.toLowerCase().includes('modal')) this.#unshowModal()
            if (!targetClosest) return;
            const targetClass = targetClosest.classList;
            if (!targetClass) return;
            if (targetClass.contains('dismiss-modal'))
                this.#unshowModal()
        }
    }
    // modal evs
    _addHandleOpenModal(handler) {
        [this._projectsModalToggle].forEach(btn => {
            btn.addEventListener('click', (e) => {
                const dataModal = e.target.closest('button');
                const modalDataset = dataModal.dataset;
                if (!modalDataset) return;
                if (modalDataset.toggle === 'modal') {
                    if (!handler) this._openModal(true)
                    else handler(this._openModal(true));
                }
            });
        });
    }
    #addHandleCloseModal() {
        this._modal.addEventListener('click', this.#closeModal.bind(this))
        document.addEventListener(KEYDOWN_TYPE, this.#closeModal.bind(this));
    }
    //section evs
    #addHandlerShowSection() {
        this._skillBtnGroup.addEventListener('click', this.#toggleSection.bind(this));
    }
    #addHandlerHideSection() {
        this._skills.addEventListener('mouseup', this.#hideSection.bind(this));
    }
}
export default new PopupView();