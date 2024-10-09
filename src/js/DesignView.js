class Design {
	_navBar = document.querySelector("body > nav");
	_navbarHeight = this._navBar.getBoundingClientRect().height;
	_firstSection = document.querySelector("#About");
	handleHover(e) {
		if (e.target.classList.contains('nav-link')) {
			const link = e.target;
			const siblings = link.closest('.navbar-nav').querySelectorAll('.nav-link');
			siblings.forEach(el => {
				if (el !== link) el.style.opacity = this;
			});
		}
	}
	stickyNav(entries) {
		const [entry] = entries;
		!entry.isIntersecting ? this._navBar.classList.add('sticky-top') : this._navBar.classList.remove('sticky-top');
	}
	addHandlerNavObserver() {
		const sectionObserver = new IntersectionObserver(this.stickyNav.bind(this), {
			root: null,
			threshold: 0.1,
			rootMargin: `-${this._navbarHeight}px`
		});

		sectionObserver.observe(this._firstSection);
	}
	addHandlerHover(handler) {
		this._navBar.addEventListener('mouseover', handler.bind(0.5));
		this._navBar.addEventListener('mouseout', handler.bind(1));
	}
}

export default new Design();