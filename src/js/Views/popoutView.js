import { KEYDOWN_TYPE, SCROLL_TYPE} from '../config.js';
import {removeClass, setCanvasOffOptions, notifyIncorrectData} from  '../helpers.js'
class PopupView {
    _multiCollapse = document.querySelectorAll('.multi-collapse.collapse');
    _skillBtnGroup = document.getElementById('skillBtnGroup');
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
    _infoNav = document.querySelector("[data-info='infoNav']");
    _prefBTN = document.getElementById('prefBTN');
    _prefs = document.querySelector('#Preferences')
    _offcanvas = document.querySelector('.offcanvas')
    constructor() {
        this.#addHandlerHideSection();
        this.#addHandlerShowSection();
        this._addHandleOpenModal();
        this.#addHandleCloseModal();
        this.#addHandleAccordion();
        this.#handleTogglingMenu();
        this.#addHandlerShowMobileNav();
        this.#addHandlerRevealHover();
    }
    /**
     * Description placeholder
     *
     * @param {Event} e
     */
    #hoverRevealInfo (e) {
        const target = e.target;
        const infoNavI = target.closest('.bi.bi-info-circle-fill');
		const infoNav = infoNavI?.dataset.info;
        if(!infoNav) return;
        const infoCard = document.getElementById(infoNav);
        infoCard.classList.toggle('d-none');
    }
    #addHandlerRevealHover(){
        this._infoNav.addEventListener('mouseover', this.#hoverRevealInfo.bind(this));
        this._infoNav.addEventListener('mouseout', this.#hoverRevealInfo.bind(this));
    };
    #hideDropDownMenus () {
        this._dropdownNavs.forEach((dropdown) =>{
            if(dropdown.classList.contains('show')) removeClass(dropdown, 'show')
        })
    }
    #toggleSection(e) {
        const btnSet = e.target.closest('.btn.btn-link').dataset.btn;
        const colapseSection = document.getElementById(`${btnSet}`);
        const isAlreadyShown = colapseSection.classList.contains('show');
        this._multiCollapse.forEach(section => removeClass(section,  'show'));
        if (!isAlreadyShown) colapseSection.classList.add('show');
    }
    #hideSection(e) {
        if (this._modal.classList.contains('show') && this._modal.style.display === 'block') return
        const target = e.target;
        const button = target.closest('button')?.tagName.toLowerCase()
        const multi = [...this._multiCollapse].some(el => el.contains(target));
        this._multiCollapse.forEach(el => !multi && !button ? removeClass(el,'show') : '');
    }
    /**
     * Handles the toggling of accordion sections in the popout view.
     *
     * @param {Event} e - The event object that triggered the function.
     * @listens click
     * @fires toggleAccordion#accordion-button
     * @fires toggleAccordion#show
     * @fires toggleAccordion#hide
     */
    #toggleAccordion(e) {
        const target = e.target;
        const openButton = target.closest('button');

        // If the target is not a button, return early
        if (!openButton) return;

        const sibling = openButton.dataset.bsTarget;
        const isAccordionButton = openButton.classList.contains('accordion-button');

        // If the button is not an accordion button or does not have a sibling, return early
        if (sibling && isAccordionButton) {
            if (openButton.classList.contains('accordion-button')) {
                // Toggle the 'open' class and update the 'aria-expanded' attribute
                const isOpen = openButton.classList.toggle('open');
                openButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                openButton.classList.toggle('collapsed');
            }

            // Toggle the 'show' class on the sibling element
            const element = document.getElementById(sibling.slice(1));
            element.classList.toggle('show');
        }
    }

    /**
     * Handles the toggling of the primary navigation menu in the popout view.
     *
     * @param {Event} e - The event object that triggered the function.
     * @listens click
     * @fires togglePrimaryMenu#dropdown-item
     * @fires togglePrimaryMenu#navlink
     * @fires togglePrimaryMenu#dropdown-toggle
     * @fires togglePrimaryMenu#show
     * @fires togglePrimaryMenu#hide
     */
    #togglePrimaryMenu(e) {
        const target = e.target;
        const isDropdownItem = target.classList.contains('dropdown-item');
        const closest = (target.closest('button') && !target.classList.contains('accordion')) || target.closest('a');
        const isDropdownToggle = target.classList.contains('dropdown-toggle') && target.classList.contains('dropdown-item');

        // If the target is a dropdown item, hide all dropdown menus
        if(isDropdownItem) 
            this.#hideDropDownMenus();
        // If the target has a 'navlink' dataset, hide all dropdown menus
        else if (target.dataset.navlink)
            this.#hideDropDownMenus();

        // If the target is a closest element to a button or anchor
        if (closest) {
            const menu = closest.dataset;

            // If the closest element does not have a dataset, return early
            if(!menu) return;

            // Extract the target menu ID from the 'bsTarget' dataset attribute
            const targetMenuId = menu.bsTarget?.slice(1) ?? null;

            // Get the expanded menu element by its ID
            const expandedMenu = document.getElementById(targetMenuId);

            // If the expanded menu exists
            if (expandedMenu) {
                // Check if the expanded menu is currently open
                const isCurrentlyOpen = expandedMenu.classList.contains('show');

                // Hide all dropdown menus
                this.#hideDropDownMenus();

                // If the expanded menu is not currently open, show it
                if (!isCurrentlyOpen) {
                    expandedMenu.classList.add('show');
                }
            }
        } 
        // If the target is not a dropdown toggle, hide all dropdown menus
        else if (!isDropdownToggle) {
            this.#hideDropDownMenus();
        }
    }

    #showMobileNav(e) {
        this._mobileDropdownMenu.classList.toggle('show');
    }
    #hideMobileNav() {
        if(this._mobileDropdownMenu.classList.contains('show')) removeClass(this._mobileDropdownMenu, 'show');
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
    /**
     * Opens or closes the modal window.
     *
     * @param {boolean} open - A boolean indicating whether to open or close the modal.
     * @returns {void}
     *
     * @fires PopupView#_openModal#show - When the modal is opened.
     * @fires PopupView#_openModal#hide - When the modal is closed.
     *
     * @example
     * // Open the modal
     * _openModal(true);
     *
     * // Close the modal
     * _openModal(false);
     */
    _openModal(open) {
        if (open === true) {
            this._modal.classList.add('show');
            this._modal.style.display = 'block';
            this._body.style.overflow = 'hidden'
        }
    }

    /**
     * Hides the modal window and resets its state.
     *
     * @private
     * @returns {void}
     *
     * @fires PopupView#_unshowModal#hide - When the modal is hidden.
     *
     * @example
     * // Call the method to hide the modal
     * _unshowModal();
     */
    #unshowModal() {
        this._modal.style.display = 'none';
        removeClass(this._modal,'show');
        this._body.style.overflow = 'auto';
        this._modal.innerHTML = '';
    }

    /**
     * Handles the closing of the modal window.
     *
     * @private
     * @param {Event} e - The event object that triggered the function.
     * @returns {void}
     *
     * @fires PopupView#_unshowModal#hide - When the modal is hidden.
     *
     * @example
     * // Call the method to close the modal
     * #closeModal(eventObject);
     */
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
    /**
     * Handles the opening of the modal window.
     *
     * @param {Function} [handler] - An optional callback function to be executed when the modal is opened.
     * @returns {void}
     *
     * @fires PopupView#_openModal#show - When the modal is opened.
     * @fires PopupView#_openModal#hide - When the modal is closed.
     *
     * @example
     * // Open the modal
     * _addHandleOpenModal();
     *
     * // Open the modal and execute a callback function
     * _addHandleOpenModal(function() {
     *   console.log('Modal opened');
     * });
     */
    _addHandleOpenModal(handler) {
        [this._projectsModalToggle].forEach(btn => {
            btn.addEventListener('click', (e) => {
                const dataModal = e.target.closest('button');
                const modalDataset = dataModal.dataset;

                // If the button does not have a dataset, return early
                if (!modalDataset) return;

                // Check if the button's dataset toggle attribute is set to 'modal'
                if (modalDataset.toggle === 'modal') {
                    // If no handler is provided, open the modal
                    if (!handler) this._openModal(true)
                    // If a handler is provided, execute the handler and pass the result of _openModal(true)
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
        [this._skillBtnGroup,this._prefBTN].forEach(btn=>btn.addEventListener('click', this.#toggleSection.bind(this)));
    }
    #addHandlerHideSection() {
        document.body.addEventListener('mouseup', this.#hideSection.bind(this));
    }
}
export default new PopupView();