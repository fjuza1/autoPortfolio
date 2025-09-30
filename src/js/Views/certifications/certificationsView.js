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
      const { min, max } = _data
        const oneYears = 24*3600 *1000;
        const threeYears = 2*30*24*3600 * 1000;
        const start = new Date(min.getTime() -oneYears); // 3 years before first
        const end   = new Date(max.getTime() + threeYears); // 3 years after last

        const base = [
          TIMELINE_GROUP_SETTINGS,
          TIMELINE_FORMAT_LABELS,
          {
            min:start,
            max:end,
            zoomMin: start,     // 1 day min zoom
            zoomMax: end,  // ~3 years
          },
          {
            orientation: { axis: "top", item: "top" }
          },{
            format: {
              milisecond:'',
              second:'',
              minute:'',
              hour:'',

              day:'DD',
              month:'MMMM YY'
            }
          },
          { autoResize: true },
          TIMELINE_SIZE_SETTINGS,
          TIMELINE_FUNCTIONALITY_SETTINGS
        ];

        this._timelineSettings = base
    }
  };
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