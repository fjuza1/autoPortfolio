import TimeLineView from "../TimelineView";
import {Timeline} from "vis-timeline";
import {TIMELINE_SIZE_SETTINGS,TIMELINE_FUNCTIONALITY_SETTINGS} from '../../config.js'
class CertificationsView extends TimeLineView {
   _timelineContainer = document.getElementById('certificationsGrid');
   _timelineSettings = {};
   _err = "There are no certifications to display. Please adjust your filtering criteria.";
   _zoomoutBtn = this._timelineContainer.querySelector('.bi.bi-zoom-out');
   _setTimelineViewCertifications(_data) {
      this._data = _data;
      // get dfistinct years
      this._setTimelineCertsSettings(this._data)
      const distinctYears = [...new Set(this._data.map(cert => new Date(cert.date_obtained).getFullYear()))].sort()
      // get where to declare to render
      const defaultMarkup = this._declareGridCertificationsMarkup(this._data)
      const timeline = new Timeline(this._timelineContainer, defaultMarkup, this._timelineSettings)
      this._seTimelineBehavior(timeline)
   }
   _setTimelineCertsSettings(_data) {
      if (!Array.isArray(_data)) {
         this._setTimelineSettings([{
               orientation: {
                  axis: 'top', // keep axis at the bottom
                  item: 'top' // put items above the axis
               }
            },
            _data,
            TIMELINE_SIZE_SETTINGS,
            TIMELINE_FUNCTIONALITY_SETTINGS
         ])
      }
   }
   _declareGridCertificationsMarkup(_data) {
      this._data = _data
      return this._data.map(cert => {
         const date = new Date(cert.date_obtained);
         const year = date.getFullYear()
         const month = date.getMonth() + 1; // Months are zero-based
         return {
            id: `${year}-${cert.title}`,
            group: year,
            content: `
        <div>
          <strong>${cert.title}</strong><br/>
          <em>${cert.platform}</em><br/>
          <a href="${cert.cert_url}" target="_blank">View Certificate</a>
        </div>
      `,
            start: cert.date_obtained
         };
      });
   }
}
export default new CertificationsView()