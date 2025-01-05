import {Timeline} from '../lib.js';
import { TIMELINE_LAYOUT_SETTINGS, TIMELINE_FUNCTIONALITY_SETTINGS, TIMELINE_TIME_SETTINGS, TIMELINE_GROUP_SETTINGS} from '../config.js';
export default new class JourneyView {
    _parentElement = document.querySelector('.timeline-steps');
    _setTimeline(_data) {
        this._data = _data;
        const timeline = new Timeline(this._parentElement, this.#setItemDataset(), {
            ...TIMELINE_LAYOUT_SETTINGS,...TIMELINE_FUNCTIONALITY_SETTINGS,...TIMELINE_TIME_SETTINGS, ...TIMELINE_GROUP_SETTINGS,
        });
        timeline.on('doubleTap',()=>{
            this.#zoomOut(timeline);
        })
        timeline.on('doubleClick',()=>{
            this.#zoomOut(timeline);
        })
    }
    #zoomOut(timeline) {
        const start = TIMELINE_TIME_SETTINGS.min
        const end = TIMELINE_TIME_SETTINGS.max
        timeline.setWindow(start, end, { animation: true });
    }
    #setItemDataset() {
        return this._data.map((entry, i) => ({
            id: i + 1,
            content: entry.content,
            group:entry.year,
            start: new Date(entry.year, 0, 1),
            end: new Date(entry.year, 11, 31)
        }));
    }
}
