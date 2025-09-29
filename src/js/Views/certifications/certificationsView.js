import TimeLineView from "../TimelineView";
import {TIMELINE_SIZE_SETTINGS,TIMELINE_FUNCTIONALITY_SETTINGS, TIMELINE_FORMAT_LABELS, TIMELINE_GROUP_SETTINGS} from '../../config.js'
class CertificationsView extends TimeLineView {
  _timelineContainer = document.getElementById('certificationsGrid');
  _timelineSettings = {};
  _err = "There are no certifications to display. Please adjust your filtering criteria.";
  _zoomoutBtn = this._timelineContainer.querySelector('.bi.bi-zoom-out');
  _setTimelineViewCertifications(_data) {
    this._setTimelineCertsSettings(_data);
    const defaultMarkup = this._declareGridCertificationsMarkup(_data);
    this._updateTimeline(undefined, {
      items: defaultMarkup,
      options: this._timelineSettings
    })
  }
  _setTimelineCertsSettings(_data) {
    if (!Array.isArray(_data)) {
      const base = [TIMELINE_GROUP_SETTINGS,
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
      ]
      return this._timelineSettings = base
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
        start: cert.date_started,
        end: cert.date_obtained,
        type: 'range'
      };
    });
  }
}
export default new CertificationsView()