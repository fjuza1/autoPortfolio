class SlidesView {
    _parentElement = document.querySelector('#carouselExampleDark')
    _slides = document.querySelector('.carousel-inner')
    _prevBtn = document.querySelector('.carousel-control-prev-icon');
    _nextBtn = document.querySelector('.carousel-control-next-icon');
    _slideIndicators = document.querySelector('.carousel-indicators');

    _renderSlides (){}
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
    addSlideHandler(handler) {}
}
export default new SlidesView();