import '../../css/bootstrap.min.css'
import View from './View.js';
import {titleCaseWord, gotoSegment, gotoTop, removeClass} from '../helpers.js';
import {SECTION_REVEAL_TRESHOLD, SECTION_HIDDEN_CLASS, STICKY_TOP_CLASS, LOAD_TYPE} from '../config.js';
class Design extends View {
	_navBar = document.querySelector("body > nav");
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
		let targetSectionId = '';
	
		if (hash.length === 0 && e.type === LOAD_TYPE) 
			setTimeout(() => { gotoTop() }, 200);
		else if (hash.length > 0) 
			targetSectionId = titleCaseWord(hash.slice(1));
		
	
		if (!targetSectionId) return;
	
		const domElement = document.getElementById(targetSectionId);
		if(!domElement) return;
		if(domElement.classList.contains(SECTION_HIDDEN_CLASS)) removeClass(domElement, SECTION_HIDDEN_CLASS)
	
		if (e.type === LOAD_TYPE && hash.length > 0) 
			requestAnimationFrame(() => { gotoSegment(domElement, document.querySelector('.nav')) });
		 else 
			gotoSegment(domElement, document.querySelector('.nav'));
	}
	scrollSpy(entries){
		const [entry] = entries;
		if (!entry.isIntersecting) return;
	}
	addHandlerNavObserver() {
		const sectionObserverNav = new IntersectionObserver(this.stickyNav.bind(this), {
			root: null,
			threshold: 0.12,
			rootMargin: `-${this._navbarHeight}px`
		});
		sectionObserverNav.observe(this._firstSection);
	}
	addHandlerScrollSpyObserver () {
		const spyObserver  = new IntersectionObserver(this.scrollSpy.bind(this, {
			root:null,
			threshold: 0.9,
            rootMargin: '0px 0px -100px 0px'
		}))
		spyObserver.forEach(observer => observer.observe(this._modal))
	}
	revealSection(entries, observer) {
		const [entry] = entries;
		if (!entry.isIntersecting) return;
		removeClass(entry.target, SECTION_HIDDEN_CLASS)
		observer.unobserve(entry.target);
	}
	_showSectionByHash(hash = location.hash.slice(1)){
		if(!hash) return;
		const id = titleCaseWord(hash);
		removeClass(document.getElementById(id), SECTION_HIDDEN_CLASS)
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
		document.addEventListener(LOAD_TYPE, handler);
	}
}
export default new Design();