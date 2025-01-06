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
        timeline.on('rangechange', (properties) => {
            // Detect if the event is a user drag
            const event = properties.event;
            if (event && (event.pointerType === 'mouse' || event.pointerType === 'touch')) {
                timeline.setSelection([]);
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
        console.log("🚀 ~ JourneyView ~ #handleEventOnTimeline ~ selectedGroup:", selectedGroup)
        if (selectedGroup)
            this.#zoomIn(timeline)
        else this.#zoomOut(timeline)
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
