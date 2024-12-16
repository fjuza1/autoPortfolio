import '../../css/bootstrap.min.css'
import View from './View.js';
import {capitalizeWord, gotoSegment, gotoTop, removeClass, changeHash, removeHash} from '../helpers.js';
import {SECTION_REVEAL_TRESHOLD, SECTION_HIDDEN_CLASS, STICKY_TOP_CLASS, LOAD_TYPE, KEYDOWN_TYPE ,REV_TRESH} from '../config.js';
class Design extends View {
	_navBar = document.querySelector("body > nav");
	_rightMenu = document.querySelector(".dropdown-menu-right");
	_pcMenu = document.getElementById('navbarsExample03')
	_navbarHeight = this._navBar.getBoundingClientRect().height;
	_nav = document.querySelector('.nav')
	_sections = document.querySelectorAll('.section');
	_firstSection = document.querySelector("#Home");
	_goupBtn = document.querySelector('[data-btn="goup"]')
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
		const target = e.target;
		if(e.type === KEYDOWN_TYPE) {
			const about = this._sections[0];
			const skills = this._sections[1];
			const projects = this._sections[2];
			const contact = this._sections[3];
			if(e.shiftKey) {
				switch (e.key.toLowerCase()) {
					case 'a':
						removeClass(about, SECTION_HIDDEN_CLASS);
						gotoSegment(about, this._nav)
						changeHash(about);
						break;
					case 's':
						removeClass(skills, SECTION_HIDDEN_CLASS);
						gotoSegment(skills, this._nav)
						changeHash(skills);
						break;
					case 'p' :
						removeClass(projects, SECTION_HIDDEN_CLASS);
						gotoSegment(projects, this._nav);
						changeHash(projects);
						break;
					case 'c':
						removeClass(contact, SECTION_HIDDEN_CLASS);
						gotoSegment(contact, this._nav);
						changeHash(contact);
						break;
					default:
						break;
				}
			}
		}
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
		if(e.type === 'click') {
			const goup = target.closest('button');
			if(goup && goup.dataset.btn === 'goup') {
				gotoTop();
				removeHash();
                return;
			}
		}
		const sectionNav = target.dataset;
		if(!sectionNav) return
		const section = sectionNav.navlink
		const domElement = document.getElementById(section);
		if(!domElement) return;
		if (domElement.classList.contains(SECTION_HIDDEN_CLASS)) {
			removeClass(domElement, SECTION_HIDDEN_CLASS);
			requestAnimationFrame(() => {
				gotoSegment(domElement, this._nav);
			});
			return;
		}
		gotoSegment(domElement, this._nav);
	}
	addHandleClickIntoSection(){
		[this._rightMenu, this._pcMenu, this._goupBtn].forEach(btn=>btn.addEventListener('click',this.scrollIntoSection.bind(this)))
		document.addEventListener(KEYDOWN_TYPE, this.scrollIntoSection.bind(this));
	}
	addHandlerNavObserver() {
		const sectionObserverNav = new IntersectionObserver(this.stickyNav.bind(this), {
			root: null,
			threshold: REV_TRESH,
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