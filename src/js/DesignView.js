class Design {
    _navBar = document.querySelector('.navbar-collapse')
    handleHover(e) {
        if (e.target.classList.contains('nav-link')) {
            const link = e.target;
            const siblings = link.closest('.navbar-nav').querySelectorAll('.nav-link');
            siblings.forEach(el => {
                if (el !== link) el.style.opacity = this;
            });
        }
    }
    addHandlerHover(handler){
        this._navBar.addEventListener('mouseover',handler.bind(0.5));
        this._navBar.addEventListener('mouseout',handler.bind(1));

    }
}
export default new Design();