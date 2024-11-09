import '../../css/bootstrap.min.css'
import View from './View.js';
import {titleCaseWord, gotoSegment, gotoTop, removeClass} from '../helpers.js';
import {SECTION_REVEAL_TRESHOLD} from '../config.js';
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
		let targetSectionId;
		const hash = window.location.hash
		if(hash.length === 0 && e.type === 'load') setTimeout(() => {gotoTop()}, 200);
		if(hash.length > 0) targetSectionId = titleCaseWord ( hash.slice(1) )
		if(!targetSectionId) return
		const domElement = document.getElementById(targetSectionId)
		if(domElement.classList.contains('section--hidden')) domElement.classList.remove('section--hidden')
		if(e.type === 'load' && hash.length > 0) {
			requestAnimationFrame(() => {gotoSegment(domElement, document.querySelector('.nav'))});
		}
		gotoSegment(domElement, document.querySelector('.nav'))
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
	_showSectionByHash(hash = location.hash.slice(1)){
		if(!hash) return;
		const id = titleCaseWord(hash);
		document.getElementById(id).classList.remove('section--hidden');
	}
	addRevealSectionObserver() {
		const sectionObserver = new IntersectionObserver(this.revealSection, {
			root: null,
			threshold: SECTION_REVEAL_TRESHOLD / 100,
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
	addHandlerLoadHash(handler) {
		['load','hashchange'].forEach(ev=>window.addEventListener(ev,handler))
	}
}
export default new Design();
