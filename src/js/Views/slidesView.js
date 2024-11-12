class SlidesView {
    _parentElement = document.querySelector('#carouselExampleDark')
    _slides = document.querySelectorAll('.carousel-item');
    _prevBtn = document.querySelector('.carousel-control-prev');
    _nextBtn = document.querySelector('.carousel-control-next');
    _slideIndicators = document.querySelector('.carousel-indicators').children;

    _renderSlides (){
        // Implement logic to render slides and slide indicators here
        this._slides = document.querySelector('.carousel-inner')
        this._prevBtn = document.querySelector('.carousel-control-prev-icon');
        this._nextBtn = document.querySelector('.carousel-control-next-icon');
        this._slideIndicators = document.querySelector('.carousel-indicators');
        // end
    }
    _removeSlideClass (){
        this._slides.forEach(slide => slide.classList.remove('active'));
    }
    _removeIndicatorsClass () {
        this._slideIndicators.forEach(indicator => indicator.classList.remove('active'));
    }
    _goto(index = index - 1) {
        this._removeSlideClass();
        this._removeIndicatorsClass();
        this._slides(index).classList.add('active');
        this._slideIndicators(index).classList.add('active');
    }
    goToSlide(slide) {
        let init = 0;

    }
    nextSlide() {}
    prevSlide() {}
    _animateSlides() {
        // TODO Implement logic to animate slides here
    }
    addSlideHandler(handler) {}
}
export default new SlidesView();