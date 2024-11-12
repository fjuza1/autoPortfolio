import { wait } from '../helpers.js';
class SlidesView {
    _parentElement = document.querySelector('#carouselExampleDark')
    _slides = document.querySelectorAll('.carousel-item');
    _prevBtn = document.querySelector('.carousel-control-prev');
    _nextBtn = document.querySelector('.carousel-control-next');
    _slideIndicatorsContainer = document.querySelector('.carousel-indicators')
    _slidesContainer = document.querySelector('.carousel-inner');
    _slideIndicators = this._slideIndicatorsContainer.children;
    _slideIndex = 0;
    _isAnimating = false
    _renderSlides (){
        // Implement logic to render slides and slide indicators here

        // end
    }
    _deactivateAllSlides (){
        this._slides.forEach(slide => slide.classList.remove('active'));
    }
    _deactivateAllIndicators () {
        [...this._slideIndicators].forEach(indicator => indicator.classList.remove('active'));
    }
    _goto(index) {
        this._deactivateAllSlides();
        this._deactivateAllIndicators();
        this._slides[index].classList.add('active');
        this._slideIndicators[index].classList.add('active');
    }
    goToSlide(e) {
        const dataset = e.target.dataset.bsSlideTo;
        this._slideIndex = dataset
        this._goto(dataset)
    }
    goForward(){
        const len = this._slides.length;
        let curSlide = this._slideIndex;
        this._slideIndex = (curSlide + 1) % len;
    }
    goBack(){
        const len = this._slides.length;
        let curSlide = this._slideIndex;
        this._slideIndex = (curSlide - 1 + len) % len;
    }
    showNextSlide(e) {
        const target = e.target.closest('button');
        if (!target) return;
        this.goForward(e)
        this._goto(this._slideIndex)
    }
    showPreviousSlide(e) {
        const target = e.target.closest('button');
        if (!target) return;
        this.goBack(e)
        this._goto(this._slideIndex)
    }
    _animateSlides() {
        const animationQuestion = [...this._slidesContainer.children].every(item => !item.dataset.bsInterval || +item.dataset.bsInterval === 0);
        if (animationQuestion) return;
        if(this._isAnimating) return;
        this._isAnimating = true;
        let curSlide = this._slides[this._slideIndex];
        const interval = +curSlide.dataset.bsInterval;
        if(!interval || interval === 0) {
            this.goForward();
            this._goto(this._slideIndex);
            this._isAnimating = false;
            return;
        }
        wait(() => {
            this.goForward()
            this._goto(this._slideIndex);
            this._isAnimating = false;
        }, interval)
    }
    handleSlides() {
        this._slideIndicatorsContainer.addEventListener('click', this.goToSlide.bind(this));
        this._nextBtn.addEventListener('click', this.showNextSlide.bind(this));
        this._prevBtn.addEventListener('click', this.showPreviousSlide.bind(this));
        this._slidesContainer.addEventListener('animationiteration', this._animateSlides.bind(this));
    }
}
export default new SlidesView();