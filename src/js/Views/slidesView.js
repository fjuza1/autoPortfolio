class SlidesView {
    _parentElement = document.querySelector('#carouselExampleDark')
    _slides = document.querySelectorAll('.carousel-item');
    _prevBtn = document.querySelector('.carousel-control-prev');
    _nextBtn = document.querySelector('.carousel-control-next');
    _slideIndicatorsContainer = document.querySelector('.carousel-indicators')
    _slideIndicators = this._slideIndicatorsContainer.children;
    _slideIndex = 0;
    _renderSlides (){
        // Implement logic to render slides and slide indicators here

        // end
    }
    _removeSlideClass (){
        this._slides.forEach(slide => slide.classList.remove('active'));
    }
    _removeIndicatorsClass () {
        [...this._slideIndicators].forEach(indicator => indicator.classList.remove('active'));
    }
    _goto(index) {
        this._removeSlideClass();
        this._removeIndicatorsClass();
        this._slides[index].classList.add('active');
        this._slideIndicators[index].classList.add('active');
    }
    goToSlide(e) {
        const dataset = e.target.dataset.bsSlideTo;
        this._slideIndex = dataset
        this._goto(dataset)
    }
    goForward(e){
        const target = e.target.closest('button');
        if (!target) return;
        const len = this._slides.length;
        let curSlide = this._slideIndex;
        this._slideIndex = (curSlide + 1) % len;
    }
    goBack(e){
        const target = e.target.closest('button');
        if (!target) return;
        const len = this._slides.length;
        let curSlide = this._slideIndex;
        this._slideIndex = (curSlide - 1 + len) % len;
    }
    nextSlide(e) {
        this.goForward(e)
        this._goto(this._slideIndex)
    }
    prevSlide(e) {
        this.goBack(e)
        this._goto(this._slideIndex)
    }
    _animateSlides() {
        // TODO Implement logic to animate slides here
    }
    addSlideHandler() {
        this._slideIndicatorsContainer.addEventListener('click', this.goToSlide.bind(this));
        this._nextBtn.addEventListener('click', this.nextSlide.bind(this));
        this._prevBtn.addEventListener('click', this.prevSlide.bind(this));
    }
}
export default new SlidesView();