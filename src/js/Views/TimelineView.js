import {Timeline} from '../lib.js';
export default class TimeLineView{
    _zoomoutBtn;
    _timelineSettings;
    _timeline;
    _selectedTime;
    _timelineContainer
    _updateTimeline(timeline = this._timeline, {items, options, groups}){
        if(!items && !options) throw new Error("Please provide items and options.");
        if(!Array.isArray(items)) throw new Error("Provided items must be an array.");
        this.#setTimelineSettings(options)
        if(!timeline) {
            this._timeline = new Timeline(this._timelineContainer, items, this._timelineSettings);
            this.#setTimelineBehavior(this._timeline)
            this._timeline.fit()
        } else{
        // then set items
        timeline.setItems(items);

        // then set options
        timeline.setOptions(options)

        // maybe set groups
        if(groups) timeline.setGroups(groups);
		timeline.fit()
        }

    }
    #resetTimelineSettings(){
        this._timelineSettings = {}
    }
    #setTimelineSettings(settings){
        this.#resetTimelineSettings()
         if(!Array.isArray(settings)) Object.assign(this._timelineSettings, settings)
        else    
        settings.forEach(setting => {
            if(!Array.isArray(setting)) Object.assign(this._timelineSettings, setting)
        });
    }
    #setTimelineBehavior(timeline) {
        timeline.on('select', () => {
            this.#handleEventOnTimeline(timeline);
        });
        timeline.on('click', () => {
            this.#handleEventOnTimeline(timeline);
        });
        timeline.on('rangechange', (properties) => {
            // Detect if the event is a user drag
            const event = properties.event;
            if (event && (event.pointerType === 'mouse' || event.pointerType === 'touch')) {
                this.#resetSelected(timeline);
            }
        });
        this.#manageZoomOut(timeline)
    }
    #getSelectedItem(timeline) {
        const [selectedItem] = timeline.getSelection();
        if (!selectedItem) return
        return timeline.itemsData.get(selectedItem);
    }
    #zoomIn(timeline) {
        const selectedGroup = this.#getSelectedItem(timeline);
        if (!selectedGroup) return
        const {
            start,
            end
        } = selectedGroup;
        this.#visWinSet(timeline, start, end);
    }
    #zoomOut(timeline) {
        const start = this._timelineSettings.min.valueOf();
        const end = this._timelineSettings.max.valueOf();
        this.#visWinSet(timeline, start, end);
    }
    #resetSelected(timeline) {
        timeline.setSelection([]);
    }
    #manageZoomOut (timeline) {
        this._zoomoutBtn.addEventListener('click', () => {
            this.#zoomOut(timeline);
            this.#resetSelected(timeline);
        });
    }
    #visWinSet(timeline, start, end) {
        timeline.setWindow(start, end, {
            animation: true,
            animationDuration: 500
        });
    }
    #handleEventOnTimeline(timeline) {
        const selectedGroup = this.#getSelectedItem(timeline);
        if (selectedGroup)
            this.#zoomIn(timeline)
    }
}