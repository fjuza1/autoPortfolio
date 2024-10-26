import View from './View.js';
class Design extends View {
	_navBar = document.querySelector("body > nav");
	_navbarHeight = this._navBar.getBoundingClientRect().height;
	_navLink = document
	_sections = document.querySelectorAll('.section');
	_firstSection = document.querySelector("#Home");
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
	scrollIntoSection(e) {
		const targetSectionId = e.target.closest('.nav-link').dataset.navlink.trim();
		if (!targetSectionId) return
		const targetSection = document.getElementById(targetSectionId).getBoundingClientRect();
		const navHeight = document.querySelector('.nav').offsetHeight;
		const sectionPositionTop = (targetSection.top + window.pageYOffset) - navHeight;
		const sectionPositionLeft = targetSection.left + window.pageXOffset
		window.scrollTo({
			left: sectionPositionLeft,
			top: sectionPositionTop,
			behavior: 'smooth',
		})
	}
	addScrollIntoHandler(handler) {
		this._navBar.addEventListener('click', handler)
	}
	addHandlerNavObserver() {
		const sectionObserverNav = new IntersectionObserver(this.stickyNav.bind(this), {
			root: null,
			threshold: 0.12,
			rootMargin: `-${this._navbarHeight}px`
		});
		sectionObserverNav.observe(this._firstSection);
	}
	revealSection(entries, observer) {
		const [entry] = entries;
		if (!entry.isIntersecting) return;
		entry.target.classList.remove('section--hidden');
		observer.unobserve(entry.target);
	}
	addRevealSectionObserver() {
		const sectionObserver = new IntersectionObserver(this.revealSection, {
			root: null,
			threshold: 0.1,
		})
		this._sections.forEach(function(section) {
			sectionObserver.observe(section)
		})
	}
	addHandlerHover(handler) {
		this._navBar.addEventListener('mouseover', handler.bind(0.5));
		this._navBar.addEventListener('mouseout', handler.bind(1));
	}
	addHandlerLoad(handler) {
		document.addEventListener('load', handler);
	}
}

export default new Design();