import { wait, debounce} from '../helpers.js';
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
        this._interval = null;
        this._startX = null;
    }
    _initializeElement(){
        this._slides = document.querySelectorAll('.carousel-item');
        this._prevBtn = document.querySelector('.carousel-control-prev');
        this._nextBtn = document.querySelector('.carousel-control-next');
        this._slideIndicatorsContainer = document.querySelector('.carousel-indicators')
        this._slidesContainer = document.querySelector('.carousel-inner')
        this._slideIndicators = [...this._slideIndicatorsContainer.children]
    }
    #findActive(element){
        return [...element].findIndex(el=>el.classList.contains('active'))
    }
    #deactivateActiveSlide() {
        const activeI = this.#findActive(this._slides);
        if(activeI === -1) return;
        this._slides[activeI].classList.remove('active')
    }
    #deactivateActiveIndicator() {
        const activeI = this.#findActive(this._slideIndicators)
        if(activeI === -1) return;
        const activeSlideIndicator = this._slideIndicators[activeI]
        activeSlideIndicator.classList.remove('active')
    }
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
        if(!target) return;
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
    #keyboardNavigation(e){
        const ky = e.key;
        if(!ky) return;
        const key = ky.toLowerCase();
        if(key === 'arrowright') {
            this.#goForward()
        }
            else if(key === 'arrowleft'){
                this.#goBack();
            }
            this.#goto(this._slideIndex)
    }
    #touchStart(e) {
        this._startX = e.touches[0].clientX;
    }
    #touchMove(e){
        const swipeTresh = 30
        if (this._startX === null || this._isAnimating) return;
        const curX = e.touches[0].clientX;
        const diffX = curX - this._startX;
        if (Math.abs(diffX) > swipeTresh) {
            this._isAnimating = true;
            this.#goForward();
        } else if(diffX < 0 ) {
            this.#goBack();
        }
        this.#goto(this._slideIndex);
        this._isAnimating = false;
        this._startX = null;
    }
    #touchEnd() {
        this._startX = null;
        wait(()=>{
            this.isAnimating = false;
        },400)
    }
    _animationObserver(e) {};
    #handleTouchSlides () {
        this._parentElement.addEventListener('touchstart', this.#touchStart.bind(this));
        this._parentElement.addEventListener('touchmove', debounce(this.#touchMove.bind(this)),400);
        this._parentElement.addEventListener('touchend', this.#touchEnd.bind(this));
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
        const interval = +curSlide.dataset.bsInterval ?? 0;
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
    
    handleSlides() {
        this.#handleTouchSlides();
        window.addEventListener('keydown', debounce(this.#keyboardNavigation.bind(this), 400));
        this._slideIndicatorsContainer.addEventListener('click', this.#goToSlide.bind(this));
        this._nextBtn.addEventListener('click', debounce(this.#showNextSlide.bind(this), 400));
        this._prevBtn.addEventListener('click', debounce(this.#showPreviousSlide.bind(this),400));
        this._slidesContainer.addEventListener('animationiteration', () => {
            requestAnimationFrame(() => this._animateSlides());
        })
    }
}
export default new SlidesView();