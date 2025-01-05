import {Timeline} from '../lib.js';
import { TIMELINE_LAYOUT_SETTINGS, TIMELINE_FUNCTIONALITY_SETTINGS, TIMELINE_TIME_SETTINGS, TIMELINE_GROUP_SETTINGS} from '../config.js';
export default new class JourneyView {
    _parentElement = document.querySelector('.timeline-steps');
    _setTimeline(_data) {
        this._data = _data;
        const timeline = new Timeline(this._parentElement, this.#setItemDataset(), {
            ...TIMELINE_LAYOUT_SETTINGS,
            ...TIMELINE_FUNCTIONALITY_SETTINGS,
            ...TIMELINE_TIME_SETTINGS,
            ...TIMELINE_GROUP_SETTINGS
        });
        console.log("🚀 ~ JourneyView ~ timeline ~ timeline:", timeline)
        timeline.on('select', () => {
            // Zoom out if a selection is made.
            this.#zoomOut(timeline);
        });

        timeline.on('click', () => {
            // Zoom in on click if an item is selected.
            this.#zoomIn(timeline);
        });
    }
    #visWinSet(timeline,start,end){
        timeline.setWindow(start, end, { animation: true, animationDuration: 500 });
    }
    #zoomIn(timeline) {
        const [selectedItem] = timeline.getSelection();
        if (!selectedItem) return;
    
        const selectedGroup = timeline.itemsData.get(selectedItem);
        if (!selectedGroup || !selectedGroup.start || !selectedGroup.end) return;
    
        const { start, end } = selectedGroup;    
        this.#visWinSet(timeline,start, end);
    }
    #zoomOut(timeline) {
        const start = TIMELINE_TIME_SETTINGS.min.valueOf();
        const end = TIMELINE_TIME_SETTINGS.max.valueOf();
        this.#visWinSet(timeline,start, end);
    }
    #setItemDataset() {
        return this._data.map((entry, i) => ({
            id: i + 1,
            content: `<span>${entry.content}</span>`,
            group:entry.year,
            start: new Date(entry.year, 0, 1),
            end: new Date(entry.year, 11, 31),
        }));
    }
}
