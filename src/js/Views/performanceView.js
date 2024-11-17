class PerformanceView {
    _observeArray = ['mark', 'measure','navigation','element','resource'];
    _eTypes = []
    _perfObserve(entries) {
        entries.getEntries().forEach(entry => {
            performance.eventCounts.entries().forEach((element,i) => {
                this._eTypes.push({type: element[0],event: element[1]});
            });
            switch(entry.entryType) {
                case "mark":
                    console.log(`${entry.name}'s startTime: ${entry.startTime}`);
                    break;
                case "measure":
                    console.log(`${entry.name}'s duration: ${entry.duration}`);
                    break;
                case "navigation":
                    console.log(`Navigation type: ${entry.entryType}`);
                    console.log(`Navigation start time: ${entry.startTime}`);
                    console.log(`Navigation duration: ${entry.duration}`);
                    break;
                case "element":
                    console.log(`Element type: ${entry.entryType}`);
                    console.log(`Element name: ${entry.name}`);
                    console.log(`Element duration: ${entry.duration}`);
                    break;
                case "resource":
                    console.log(`Resource type: ${entry.entryType}`);
                    console.log(`Resource name: ${entry.name}`);
                    console.log(`Resource duration: ${entry.duration}`);
                    break;
                default:
                    console.log(`Unknown entry type: ${entry.entryType}`);
                    break;
            }
        });
    }
    _getMemoryStats(){
        return [performance.memory, performance.timing]
    }
    _perfObserver() {
        const performanceObserver = new PerformanceObserver(this._perfObserve.bind(this));
        performanceObserver.observe({ entryTypes: this._observeArray});
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
