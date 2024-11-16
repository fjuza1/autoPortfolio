import { wait } from '../helpers.js';
class SlidesView {
    constructor(){
        this._parentElement = document.querySelector('#carouselProjects')
        this._slides = null;
        this._prevBtn = null;
        this._nextBtn = null;
        this._slideIndicatorsContainer = null;
        this._slidesContainer = null;
        this._slideIndicators = null;
        this._slideIndex = 0;
        this._isAnimating = false;
    }
    _initializeElement(){
        this._slides = document.querySelectorAll('.carousel-item');
        this._prevBtn = document.querySelector('.carousel-control-prev');
        this._nextBtn = document.querySelector('.carousel-control-next');
        this._slideIndicatorsContainer = document.querySelector('.carousel-indicators')
        this._slidesContainer = document.querySelector('.carousel-inner');
        this._slideIndicators = [...this._slideIndicatorsContainer.children]
    }
    #debounce(fn,wait) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), wait);
        };
    }
    #deactivateAllSlides() {
        this._slides.forEach(slide => slide.classList.remove('active'));
    }
    #deactivateAllIndicators() {
        [...this._slideIndicators].forEach(indicator => indicator.classList.remove('active'));
    }
    #goto(index) {
        this.#deactivateAllSlides();
        this.#deactivateAllIndicators();
        if (index < 0 || index >= this._slides.length) return;
        const slide = this._slides[index];
        if (!slide) return;

        slide.classList.add('active');
        this._slideIndicators[index].classList.add('active');
        this._slideIndex = index;
    }
    #goToSlide(e) {
        const dataset = +e.target.dataset.bsSlideTo;
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
    _animationObserver(e) {

    }
    _animateSlides() {
        const animationQuestion = [...this._slidesContainer.children].every(item => !item.dataset.bsInterval || +item.dataset.bsInterval === 0);
        if (animationQuestion) return;
        if (this._isAnimating) return;
        this._isAnimating = true;
        let curSlide = this._slides[this._slideIndex];
        const interval = +curSlide.dataset.bsInterval;
        if (!interval) return;
        wait(() => {
            if (!this._slides || !this._slidesContainer) return;
            this.#goForward()
            this.#goto(this._slideIndex);
            this._isAnimating = false;
        }, interval)
    }
    handleSlides() {
        this._slideIndicatorsContainer.addEventListener('click', this.#goToSlide.bind(this));
        this._nextBtn.addEventListener('click', this.#debounce(this.#showNextSlide.bind(this), 100));
        this._prevBtn.addEventListener('click', this.#debounce(this.#showPreviousSlide.bind(this),100));
        this._slidesContainer.addEventListener('animationiteration', () => {
            requestAnimationFrame(() => this._animateSlides());
        })
    }
}
export default new SlidesView();