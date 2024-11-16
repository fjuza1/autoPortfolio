class PerformanceView {
    _observeArray = ['mark', 'measure'];
    _perfObserve(entries) {
        entries.getEntries().forEach(entry => {
            if (entry.entryType === "mark") {
                console.log(`${entry.name}'s startTime: ${entry.startTime}`);
            }
            if (entry.entryType === "measure") {
                console.log(`${entry.name}'s duration: ${entry.duration}`);
            }
        });
    }
    _perfObserver() {
        const performanceObserver = new PerformanceObserver(this._perfObserve.bind(this));
        performanceObserver.observe({ entryTypes: this._observeArray });
        console.log("PerformanceObserver initialized:", performanceObserver);
    }
    _calcTimePerformace(){
        return 
    }
    /*
            $$("*").map(el => {
            return { el, listeners: getEventListeners(el) };
          }).filter(data => {
            return Object.keys(data.listeners).length;
          });
    */
}

export default new PerformanceView();
