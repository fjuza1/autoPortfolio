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
        timeline.on('select', () => {
            this.#handleEventOnTimeline(timeline);
        });
        timeline.on('click', () => {
            this.#handleEventOnTimeline(timeline);
        });
        timeline.on('rangechanged', () => {
            const prev = this.#getSelectedItem(timeline);
            const visibleItems = timeline.getVisibleItems();
            if (visibleItems.length > 0) {
                timeline.setSelection([]);
                if (prev) timeline.setSelection([prev.id]);
            }
        });
        
    }
    #getSelectedItem(timeline) {
        const [selectedItem] = timeline.getSelection();
        if (!selectedItem) return
        return timeline.itemsData.get(selectedItem);
    }
    #handleEventOnTimeline(timeline) {
        const selectedGroup = this.#getSelectedItem(timeline);
        if (!selectedGroup)
            this.#zoomOut(timeline)
        else this.#zoomIn(timeline)
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
        return this._data.map((entry, i) => ({
            id: i + 1,
            content: `<span>${entry.content}</span>`,
            group: entry.year,
            start: new Date(entry.year, 1, 1),
            end: new Date(entry.year, 11, 31),
        }));
    }
}
