import View from './View.js';
class Design extends View {
	_navBar = document.querySelector("body > nav");
	_navbarHeight = this._navBar.getBoundingClientRect().height;
	_navLink = document
	_sections = document.querySelectorAll('.section');
	_firstSection = document.querySelector("#About");
	_parentElement = document.querySelectorAll('.container')[1]
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
		const targetSectionId = e.target.closest('.nav-link').textContent.trim();
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
	skillBarDisplay(data) {
		const html = [];
		let valNow;
		let width;
		let color
		data.forEach(barArea => {
			switch (barArea.level) {
				case 'Beginner':
					valNow = 0;
					width = 0;
					color = 'bg-danger'
					break;
				case 'Basic':
					valNow = 25;
					width = 25;
					color = 'bg-warning'
					break;
				case 'Skillful':
					valNow = 50;
					width = 50;
					color = 'bg-info'
					break;
				case 'Advanced':
					valNow = 75;
					width = 75;
					color = 'bg-primary';
					break;
				case 'Expert':
					valNow = 100;
					width = 100;
					color = 'bg-success';
					break;
			}
			html.push(`
			   <div class="progress-container mb-3">
				   <span class="skill-name">${barArea.name}</span>
				   <div class="progress">
					   <div class="progress-bar ${color}" role="progressbar" style="width: ${width}%;" aria-valuenow="${valNow}" aria-valuemin="0" aria-valuemax="100" aria-labelledby="progress-${barArea.level.toLowerCase()}">
						   ${barArea.level}
					   </div>
				   </div>
			   </div>
		   `);

		});
		return html.join('');
	}
	addRevealSectionObserver() {
		const sectionObserver = new IntersectionObserver(this.revealSection, {
			root: null,
			threshold: 0.93,
		})
		this._sections.forEach(function(section) {
			sectionObserver.observe(section)
			section.classList.add('section--hidden')
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