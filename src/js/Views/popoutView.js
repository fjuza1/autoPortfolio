class PopupView {
    _multiCollapse = document.querySelectorAll('.multi-collapse.collapse');
    _body = document.body;
    _skillBtnGroup = document.getElementById('skillBtnGroup');
    _formBtn = document.querySelector('button[type="submit"]');
    _mobileNav = document.getElementById('mobileNav')
    _dropdownNav = document.querySelector('.dropdown-menu')
    _body = document.body;
    _modal = document.querySelector('button[data-toggle="modal"]')
    constructor() {
        this._addHandlerHideSection();
        this._addHandlerShowSection();
        this.addHandlerShowMobileNav();
        this._addHandlerHideDropdownNav();
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
    _openModal(){
        console.log('we are calling openModal');
        const markup = `
            <div id="modalCenter" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle style = display:block">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                    </div>
                    </div>
                </div>
            </div>
        `
        this._body.insertAdjacentHTML('afterbegin', markup);
        const modalCenter = document.getElementById('modalCenter');
        modalCenter.classList.add('show');
    }
    _closeModal(){}
    toggleMobileNav(e) {
        const target = e.target
        const targetDropdownMenu = target.nextElementSibling
		const clickedNavBtn = target.closest('button');
        targetDropdownMenu.classList.contains('show') ? targetDropdownMenu.classList.remove('show') : targetDropdownMenu.classList.add('show');
	}
    hideMobileNav(e){
        const targetDropdownMenu = this._dropdownNav;
        if(targetDropdownMenu.classList.contains('show') && !e.target.classList.contains('dropdown-item')) targetDropdownMenu.classList.remove('show')
    }
    addHandlerShowMobileNav () {
        this._mobileNav.addEventListener('click', this.toggleMobileNav.bind(this));
    }
    _addHandleOpenModal(){
        this._modal.addEventListener('click', this._openModal.bind(this));
    }
    _addHandleCloseModal(){}
    _addHandlerShowSection() {
        this._skillBtnGroup.addEventListener('click', this._toggleSection.bind(this));
    }
    _addHandlerHideDropdownNav () {
        this._body.addEventListener('mouseup',this.hideMobileNav.bind(this));
    }
    _addHandlerHideSection() {
        this._body.addEventListener('mouseup', this._hideSection.bind(this));
    }
}
export default new PopupView();
