import {Timeline} from '../lib.js';
import TimeLineView from './TimelineView.js'
import { TIMELINE_LAYOUT_SETTINGS, TIMELINE_FUNCTIONALITY_SETTINGS, TIMELINE_TIME_SETTINGS, TIMELINE_GROUP_SETTINGS} from '../config.js';
export default new class JourneyView extends TimeLineView {
    _parentElement = document.querySelector('.timeline-steps');
    _zoomoutBtn = document.querySelector('.bi.bi-zoom-out');
    _timelineTimeSettings = TIMELINE_TIME_SETTINGS
    _setTimeline(_data) {
        this._data = _data;
        const timeline = new Timeline(this._parentElement, this.#setItemDataset(), {
            ...TIMELINE_LAYOUT_SETTINGS,
            ...TIMELINE_FUNCTIONALITY_SETTINGS,
            ...this._timelineTimeSettings,
            ...TIMELINE_GROUP_SETTINGS
        });
        timeline.on('select', () => {
            this._handleEventOnTimeline(timeline);
        });
        timeline.on('click', () => {
            this._handleEventOnTimeline(timeline);
        });
        timeline.on('rangechange', (properties) => {
            // Detect if the event is a user drag
            const event = properties.event;
            if (event && (event.pointerType === 'mouse' || event.pointerType === 'touch')) {
                this._resetSelected(timeline);
            }
        });
        this._manageZoomOut(timeline)
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
