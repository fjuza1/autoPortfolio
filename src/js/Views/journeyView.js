import {Timeline} from '../lib.js';
import TimeLineView from './TimelineView.js'
import { TIMELINE_LAYOUT_SETTINGS, TIMELINE_FUNCTIONALITY_SETTINGS, TIMELINE_TIME_SETTINGS, TIMELINE_GROUP_SETTINGS} from '../config.js';
export default new class JourneyView extends TimeLineView {
    _timelineContainer = document.querySelector('.timeline-steps');
    _zoomoutBtn = document.querySelector('.bi.bi-zoom-out');
    _timelineSettings = {}
    _setTimeline(_data) {
        this._data = _data;
        const options = [TIMELINE_LAYOUT_SETTINGS, TIMELINE_FUNCTIONALITY_SETTINGS, TIMELINE_TIME_SETTINGS, TIMELINE_GROUP_SETTINGS]
        this._updateTimeline(this._timeline, { items: this.#setItemDataset(), options: options});
    }
    #setItemDataset() {
        return this._data.map((entry, i) => ({
            id: i + 1,
            content: `<span>${entry.content}</span>`,
            group: entry.year,
            start: new Date(entry.year, 1, 1),
            end: new Date(entry.year, 11, 31),
        }));
    }
}
