export default class TimeLineView{
    _zoomoutBtn;
    _timelineSettings
    _seTimelineBehavior(timeline) {
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
    _getSelectedItem(timeline) {
        const [selectedItem] = timeline.getSelection();
        if (!selectedItem) return
        return timeline.itemsData.get(selectedItem);
    }
    _zoomIn(timeline) {
        const selectedGroup = this._getSelectedItem(timeline);
        if (!selectedGroup) return
        const {
            start,
            end
        } = selectedGroup;
        this._visWinSet(timeline, start, end);
    }
    _zoomOut(timeline) {
        const start = this._timelineSettings.min.valueOf();
        const end = this._timelineSettings.max.valueOf();
        this._visWinSet(timeline, start, end);
    }
    _resetSelected(timeline) {
        timeline.setSelection([]);
    }
    _manageZoomOut (timeline) {
        this._zoomoutBtn.addEventListener('click', () => {
            this._zoomOut(timeline);
            this._resetSelected(timeline);
        });
    }
    _visWinSet(timeline, start, end) {
        timeline.setWindow(start, end, {
            animation: true,
            animationDuration: 500
        });
    }
    _handleEventOnTimeline(timeline) {
        const selectedGroup = this._getSelectedItem(timeline);
        if (selectedGroup)
            this._zoomIn(timeline)
    }
}