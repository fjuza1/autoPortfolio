import '../../css/bootstrap.min.css'
import View from './View.js';
import {capitalizeWord, gotoSegment, gotoTop, removeClass} from '../helpers.js';
import {SECTION_REVEAL_TRESHOLD, SECTION_HIDDEN_CLASS, STICKY_TOP_CLASS, LOAD_TYPE} from '../config.js';
class Design extends View {
	_navBar = document.querySelector("body > nav");
	_rightMenu = document.querySelector(".dropdown-menu-right");
	_pcMenu = document.getElementById('navbarsExample03')
	_navbarHeight = this._navBar.getBoundingClientRect().height;
	_navLink = document
	_sections = document.querySelectorAll('.section');
	_firstSection = document.querySelector("#Home");
	_modal = document.getElementById('modalCenter');
	_spyNavSegments = '';
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
		!entry.isIntersecting ? this._navBar.classList.add(STICKY_TOP_CLASS) : removeClass(this._navBar, STICKY_TOP_CLASS);
	}
	scrollIntoSection(e) {
		const hash = window.location.hash;	
		if (hash.length === 0 && e.type === LOAD_TYPE) {
			setTimeout(() => { gotoTop() }, 200);
		}
		if(hash.length > 0 && e.type === LOAD_TYPE) {
			const targetSectionId = capitalizeWord(hash.slice(1));
            const targetSection = document.getElementById(targetSectionId);
            if (!targetSection) return;
			removeClass(targetSection, SECTION_HIDDEN_CLASS);
			requestAnimationFrame(() => {
				gotoSegment(targetSection, document.querySelector('.nav'));
			});

		}
		const target = e.target.dataset;
		if(!target) return
		const section = target.navlink
		const domElement = document.getElementById(section);
		if(!domElement) return;
		
		if (domElement.classList.contains(SECTION_HIDDEN_CLASS)) {
			removeClass(domElement, SECTION_HIDDEN_CLASS);
			requestAnimationFrame(() => {
				gotoSegment(domElement, document.querySelector('.nav'));
			});
			return;
		}
	
		gotoSegment(domElement, document.querySelector('.nav'));
	}
	addHandleClickIntoSection(){
		this._rightMenu.addEventListener('click', this.scrollIntoSection);
		this._pcMenu.addEventListener('click', this.scrollIntoSection);
	}
	addHandlerNavObserver() {
		const sectionObserverNav = new IntersectionObserver(this.stickyNav.bind(this), {
			root: null,
			threshold: 0.12,
			rootMargin: `-${this._navbarHeight}px`
		});
		const resizeNavObserver = new ResizeObserver(this.stickyNav.bind(this))
		resizeNavObserver.observe(this._firstSection)
		sectionObserverNav.observe(this._firstSection);
	}
	revealSection(entries, observer) {
		const [entry] = entries;
		if (!entry.isIntersecting) return;
		removeClass(entry.target, SECTION_HIDDEN_CLASS)
		observer.unobserve(entry.target);
	}
	// TODO use ResizeObserver on revealSection
	_showSectionByHash(hash = location.hash.slice(1)){
		if(!hash) return;
		const id = capitalizeWord(hash);
		removeClass(document.getElementById(id), SECTION_HIDDEN_CLASS)
	}
	addRevealSectionObserver() {
		const options = {root: null,threshold: SECTION_REVEAL_TRESHOLD / 100}
		const sectionObserver = new IntersectionObserver(this.revealSection, options)
		const resizeSectionObserver = new ResizeObserver(this.revealSection, options)
		this._sections.forEach(function(section) {
			sectionObserver.observe(section)
			resizeSectionObserver.observe(section)
		})
	}
	addHandlerHover(handler) {
		this._navBar.addEventListener('mouseover', handler.bind(0.5));
		this._navBar.addEventListener('mouseout', handler.bind(1));
	}
	addHandlerLoad(handler) {
		window.addEventListener(LOAD_TYPE, handler);
	}
}
export default new Design();