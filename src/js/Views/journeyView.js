import {Timeline} from '../lib.js';
import { TIMELINE_LAYOUT_SETTINGS, TIMELINE_FUNCTIONALITY_SETTINGS, TIMELINE_TIME_SETTINGS, TIMELINE_GROUP_SETTINGS} from '../config.js';
export default new class JourneyView {
    _parentElement = document.querySelector('.timeline-steps');
    _zoomoutBtn = document.querySelector('.bi.bi-zoom-out');
    _setTimeline(_data) {
        this._data = _data;
        const timeline = new Timeline(this._parentElement, this.#setItemDataset(), {
            ...TIMELINE_LAYOUT_SETTINGS,
            ...TIMELINE_FUNCTIONALITY_SETTINGS,
            ...TIMELINE_TIME_SETTINGS,
            ...TIMELINE_GROUP_SETTINGS
        });
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
        this._zoomoutBtn.addEventListener('click', () => {
            this.#zoomOut(timeline);
            this.#resetSelected(timeline);
        });
    }
    #resetSelected(timeline) {
        timeline.setSelection([]);
    }
    #getSelectedItem(timeline) {
        const [selectedItem] = timeline.getSelection();
        if (!selectedItem) return
        return timeline.itemsData.get(selectedItem);
    }
    #handleEventOnTimeline(timeline) {
        const selectedGroup = this.#getSelectedItem(timeline);
        if (selectedGroup)
            this.#zoomIn(timeline)
    }
    #visWinSet(timeline, start, end) {
        timeline.setWindow(start, end, {
            animation: true,
            animationDuration: 500
        });
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
        const start = TIMELINE_TIME_SETTINGS.min.valueOf();
        const end = TIMELINE_TIME_SETTINGS.max.valueOf();
        this.#visWinSet(timeline, start, end);
    }
    #setItemDataset() {
        if (!this._itemMap) {
            this._itemMap = new Map();
        }
        this._data.forEach((entry, i) => {
            if (!this._itemMap.has(entry.year)) {
                this._itemMap.set(entry.year, {
                    id: i + 1,
                    content: `<span>${entry.content}</span>`,
                    group: entry.year,
                    start: new Date(entry.year, 1, 1),
                    end: new Date(entry.year, 11, 31),
                });
            }
        });
        return Array.from(this._itemMap.values());
    }
}
