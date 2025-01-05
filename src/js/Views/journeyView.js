import {Timeline} from '../lib.js';
import {MIN_YEAR, MAX_YEAR} from '../config.js';
export default new class JourneyView {
    _parentElement = document.querySelector('.timeline-steps');

    _setTimeline(_data) {
        this._data = _data;
        new Timeline(this._parentElement, this.#setItemDataset(), {
            height: '60vh',
            stack:true,
            moveable:true,
            zoomable:true,
            orientation: 'top',
            margin: { item: 10 },
            align: 'start',
            autoResize: true,
            groupOrder: 'id',
            min: new Date(MIN_YEAR, 0, 1),
            max: new Date(MAX_YEAR, 11, 31),
            timeAxis: { scale: 'year', step: 1 }
        });
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
