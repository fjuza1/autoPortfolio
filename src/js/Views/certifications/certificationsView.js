import TimeLineView from "../TimelineView";
import {Timeline} from "vis-timeline";
import {TIMELINE_SIZE_SETTINGS,TIMELINE_FUNCTIONALITY_SETTINGS, TIMELINE_FORMAT_LABELS, TIMELINE_GROUP_SETTINGS} from '../../config.js'
class CertificationsView extends TimeLineView {
	_timelineContainer = document.getElementById('certificationsGrid');
	_timelineSettings = {};
	_timeline;
	_err = "There are no certifications to display. Please adjust your filtering criteria.";
	_zoomoutBtn = this._timelineContainer.querySelector('.bi.bi-zoom-out');
	_setTimelineViewCertifications(_data) {
		this._data = _data;
		// get dfistinct years
		this._setTimelineCertsSettings(this._data);
		// get where to declare to render
		const defaultMarkup = this._declareGridCertificationsMarkup(this._data)
		this._timeline = new Timeline(this._timelineContainer)
		this._timeline.setItems(defaultMarkup);
		this._timeline.setOptions(this._timelineSettings);
		this._timeline.fit()
		this._seTimelineBehavior(this._timeline)
	}
	_setTimelineCertsSettings(_data) {
		if (!Array.isArray(_data)) {
			this._setTimelineSettings([
            TIMELINE_GROUP_SETTINGS,
				TIMELINE_FORMAT_LABELS,
				{
					zoomMin: 2000 * 60 * 60 * 24 * 30,
					zoomMax: 1000 * 60 * 60 * 24 * 365 * 5
				},
				{
					orientation: {
						axis: 'top', // keep axis at the bottom
						item: 'top' // put items above the axis
					}
				},
				{
					autoResize: true
				},
				_data,
				TIMELINE_SIZE_SETTINGS,
				TIMELINE_FUNCTIONALITY_SETTINGS
			])
		}
	}
	_declareGridCertificationsMarkup(_data) {
		this._data = _data
		return this._data.map((cert, i) => {
			const date = new Date(cert.date_obtained);
			const year = date.getFullYear();
			return {
				id: i + 1,
				group: year,
				content: `
                 <div class="dot-content">
        <div class="dot"></div>
        <div class="label">
          <strong>${cert.title}</strong><br/>
          <em>${cert.platform}</em><br/>
          <a href="${cert.cert_url}" target="_blank">View Certificate</a>
        </div>
      </div>
      `,
				start: cert.date_obtained,
				type: 'point'
			};
		});
	}
}
export default new CertificationsView()