import '../../css/bootstrap.min.css'
import View from './View.js';
import {capitalizeWord, gotoSegment, gotoTop, removeClass, changeHash, removeHash} from '../helpers.js';
import {SECTION_REVEAL_TRESHOLD, SECTION_HIDDEN_CLASS, STICKY_TOP_CLASS, LOAD_TYPE, KEYDOWN_TYPE ,REV_TRESH} from '../config.js';
class Design extends View {
	_navBar = document.querySelector("body > nav");
	_rightMenu = document.querySelector("#mobileDropdownMenu");
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
 /**
  * Handles navigation and scrolling behavior within the design view.
  *
  * @param {Event} e - The event object that triggered the function.
  * @property {HTMLElement} e.target - The element that initiated the event.
  * @property {string} e.type - The type of event (e.g., 'click', 'keydown', 'load').
  * @property {string} e.altKey - Indicates whether the alt key was pressed during the event.
  * @property {string} e.key - The key that was pressed during a keydown event.
  * @property {string} e.dataset - The dataset of the target element.
  * @property {string} e.dataset.navlink - The id of the section to navigate to.
  * @property {string} window.location.hash - The current hash fragment in the URL.
  * @property {HTMLElement} this._firstSection - The first section element.
  * @property {NodeList} this._sections - A NodeList of all section elements.
  * @property {HTMLElement} this._nav - The navigation element.
  * @property {HTMLElement} this._goupBtn - The go-to-top button element.
  * @property {function} removeClass - A function to remove a class from an element.
  * @property {function} gotoSegment - A function to scroll to a specific section.
  * @property {function} gotoTop - A function to scroll to the top of the page.
  * @property {function} changeHash - A function to change the hash fragment in the URL.
  * @property {function} removeHash - A function to remove the hash fragment from the URL.
  * @property {function} capitalizeWord - A function to capitalize the first letter of a word.
  * @property {number} SECTION_REVEAL_TRESHOLD - A threshold value for revealing sections.
  * @property {string} SECTION_HIDDEN_CLASS - The class name for hidden sections.
  * @property {string} STICKY_TOP_CLASS - The class name for sticky navigation.
  * @property {string} LOAD_TYPE - The type of load event.
  * @property {string} KEYDOWN_TYPE - The type of keydown event.
  * @property {number} REV_TRESH - A threshold value for Intersection Observer.
  */
 scrollIntoSection(e) {
     const target = e.target;
     if(e.type === KEYDOWN_TYPE) {
         const home = this._firstSection
         const about = this._sections[0];
         const journey = this._sections[1]
         const skills = this._sections[2];
         const projects = this._sections[3];
         const QAToolbox = this._sections[4];
         const contact = this._sections[5];
         if(e.altKey) {
             switch (e.key.toLowerCase()) {
                 case 'h':
                     removeClass(home, SECTION_HIDDEN_CLASS);
                     gotoSegment(home, this._nav)
                     removeHash();
                     break;
                 case 'a':
                     removeClass(about, SECTION_HIDDEN_CLASS);
                     gotoSegment(about, this._nav)
                     changeHash(about);
                     break;
                 case 'j':
                     removeClass(journey, SECTION_HIDDEN_CLASS);
                     gotoSegment(journey, this._nav);
                     changeHash(journey);
                     break
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
                case 'q' :
                     removeClass(QAToolbox, SECTION_HIDDEN_CLASS);
                     gotoSegment(QAToolbox, this._nav);
                     changeHash(QAToolbox);
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
addHandleClickIntoSection() {
    [this._rightMenu, this._pcMenu, this._goupBtn].forEach(btn => btn.addEventListener('click', this.scrollIntoSection.bind(this)));
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