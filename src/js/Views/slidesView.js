class SlidesView {
    _parentElement = document.querySelector('#carouselExampleDark')
    _slides = document.querySelectorAll('.carousel-item');
    _prevBtn = document.querySelector('.carousel-control-prev');
    _nextBtn = document.querySelector('.carousel-control-next');
    _slideIndicatorsContainer = document.querySelector('.carousel-indicators')
    _slideIndicators = this._slideIndicatorsContainer.children;
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
        this._goto(dataset)
    }
    nextSlide() {}
    prevSlide() {}
    _animateSlides() {
        // TODO Implement logic to animate slides here
    }
    addSlideHandler(handler) {
        this._slideIndicatorsContainer.addEventListener('click', handler);
    }
}
export default new SlidesView();