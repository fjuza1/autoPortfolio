import { wait, debounce} from '../helpers.js';
import {REV_TRESH, KEYDOWN_TYPE} from '../config.js';
class SlidesView {
    constructor() {
        this._parent = document.querySelector('#Projects')
        this._slides = null;
        this._prevBtn = null;
        this._nextBtn = null;
        this._slideIndicatorsContainer = null;
        this._slidesContainer = null;
        this._slideIndicators = null;
        this._slideIndex = 0;
        this._isAnimating = false;
        this._interval = null;
        this._startX = null;

        this._boundTouchStart = this.#touchStart.bind(this)
        this._boundTouchMove = debounce(this.#touchMove.bind(this)), 400
        this._boundTouchEnd = this.#touchEnd.bind(this)
    }
    _initializeElement() {
        this._slides = document.querySelectorAll('.carousel-item');
        this._prevBtn = document.querySelector('.carousel-control-prev');
        this._nextBtn = document.querySelector('.carousel-control-next');
        this._slideIndicatorsContainer = document.querySelector('.carousel-indicators')
        this._slidesContainer = document.querySelector('.carousel-inner')
        this._slideIndicators = [...this._slideIndicatorsContainer.children]
    }
    /**
     * Finds the index of the active element within a given HTML collection.
     *
     * @param {HTMLCollection} element - The HTML collection to search for the active element.
     * @returns {number} The index of the active element. If no active element is found, returns -1.
     *
     * @private
     */
    #findActive(element) {
        return [...element].findIndex(el => el.classList.contains('active'));
    }

    #deactivateActiveElement(elements) {
        const activeIndex = this.#findActive(elements);
        if (activeIndex === -1) return;
        elements[activeIndex].classList.remove('active');
    }
    #deactivateActiveSlide() {
        this.#deactivateActiveElement(this._slides);
    }
    #deactivateActiveIndicator() {
        this.#deactivateActiveElement(this._slideIndicators);
    }
    /**
     * Sets index for this._slideIndex
     *
     * @param {number} index - The index of the slide to set.
     * @returns {void}
     *
     * @private
     */
    #goto(index) {
        this.#deactivateActiveSlide();
        this.#deactivateActiveIndicator();
        if (index < 0 || index >= this._slides.length) return;
        const slide = this._slides[index];
        if (!slide) return;
        slide.classList.add('active');
        this._slideIndicators[index].classList.add('active');
        this._slideIndex = index;
    }

    #goToSlide(e) {
        const target = e.target.closest('button');
        if (!target) return;
        const dataset = +target.dataset.bsSlideTo;
        this.#goto(dataset)
        this._slideIndex = dataset
    }
    #goForward() {
        const len = this._slides.length;
        this._slideIndex = (this._slideIndex + 1) % len;
    }
    #goBack() {
        const len = this._slides.length;
        this._slideIndex = (this._slideIndex - 1 + len) % len;
    }
    #showNextSlide(e) {
        const target = e.target.closest('button');
        if (!target) return;
        this.#goForward(e)
        this.#goto(this._slideIndex)
        this._isAnimating = false;
    }
    #showPreviousSlide(e) {
        const target = e.target.closest('button');
        if (!target) return;
        this.#goBack(e)
        this.#goto(this._slideIndex)
        this._isAnimating = false;
    }
    #keyboardNavigation(e) {
        const ky = e.key;
        if (!ky) return;
        const key = ky.toLowerCase();
        if (key === 'arrowright') {
            this.#goForward()
        } else if (key === 'arrowleft') {
            this.#goBack();
        }
        this.#goto(this._slideIndex)
    }
    #touchStart(e) {
        this._startX = e.touches[0].clientX;
    }

    #touchMove(e) {
        const swipeTresh = 30
        if (this._startX === null || this._isAnimating) return;
        const curX = e.touches[0].clientX;
        const diffX = curX - this._startX;
        if (Math.abs(diffX) > swipeTresh) {
            this._isAnimating = true;
            this.#goForward();
        } else if (diffX < 0) {
            this.#goBack();
        }
        this.#goto(this._slideIndex);
        this._isAnimating = false;
        this._startX = null;
    }
    #touchEnd() {
        this._startX = null;
        wait(() => {
            this.isAnimating = false;
        }, 400)
    }
    #handleTouchSlides() {
        this._parent.addEventListener('touchstart', this._boundTouchStart);
        this._parent.addEventListener('touchmove', this._boundTouchMove);
        this._parent.addEventListener('touchend', this._boundTouchEnd);
    }
    _animateSlides() {
        const animationQuestion = [...this._slidesContainer.children].every(
            item => !item.dataset.bsInterval || +item.dataset.bsInterval === 0
        );
        if (animationQuestion) return;
        if (this._isAnimating) return;
        this._isAnimating = true;

        const active = [...this._slides].findIndex(el => el.classList.contains('active'));
        this._slideIndex = active;

        const curSlide = this._slides[active];
        const interval = isNaN(+curSlide.dataset.bsInterval) ? 0 : +curSlide.dataset.bsInterval;
        if (!interval) return;

        if (this._interval) {
            window.clearTimeout(this._interval);
            this._interval = null;
        }
        this._interval = wait(() => {
            this.#goForward();
            this.#goto(this._slideIndex);
            this._isAnimating = false;


            this._animateSlides();
        }, interval);
    }
    /**
     * Handles the Intersection Observer for the carousel slides.
     * This observer watches for changes in the visibility of the slides container.
     * When the slides container becomes visible, it starts the animation of the slides.
     *
     * @private
     * @memberof SlidesView
     *
     * @param {IntersectionObserverEntry[]} entries - The array of IntersectionObserverEntry objects.
     * Each entry represents a target element and its intersection with the root element or its ancestor.
     *
     * @returns {void}
     */
    #watchAnimation(entries) {
        const [entry] = entries;
        if (!entry.isIntersecting) {
            this._isAnimating = false;
            return;
        } else {
            this._isAnimating = true;
        }
    }

    /**
     * Handles the Intersection Observer for the carousel slides.
     * This observer watches for changes in the visibility of the slides container.
     * When the slides container becomes visible, it starts the animation of the slides.
     *
     * @private
     * @memberof SlidesView
     *
     * @returns {void}
     */
    #handleAnimationObserver() {
        const animationObserver = new IntersectionObserver(this.#watchAnimation.bind(this), {
            root: null,
            threshold: REV_TRESH,
        });
        animationObserver.observe(this._slidesContainer);
    }

    handleSlides() {
        this.#handleTouchSlides();
        window.addEventListener(KEYDOWN_TYPE, debounce(this.#keyboardNavigation.bind(this), 400));
        this._slideIndicatorsContainer.addEventListener('click', debounce(this.#goToSlide.bind(this), 400));
        this._nextBtn.addEventListener('click', debounce(this.#showNextSlide.bind(this), 400));
        this._prevBtn.addEventListener('click', debounce(this.#showPreviousSlide.bind(this), 400));
        this._slidesContainer.addEventListener('animationiteration', () => {
            this.#handleAnimationObserver();
            requestAnimationFrame(() => this._animateSlides());
        })
    }
}
export default new SlidesView();