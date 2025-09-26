import TimeLineView from "../TimelineView";
import { Timeline } from "vis-timeline";
import {TIMELINE_SIZE_SETTINGS, TIMELINE_FUNCTIONALITY_SETTINGS} from '../../config.js'
class CertificationsView extends TimeLineView {
  _timelineContainer = document.getElementById('certificationsGrid');
  _timelineTimeSettings = {};
  _err = "There are no certifications to display. Please adjust your filtering criteria.";
  _setTimelineViewCertifications(_data) {
      this._data = _data;
      // get dfistinct years
      this._setTimelineCertsSettings(this._data)
      const distinctYears = [...new Set(this._data.map(cert => new Date(cert.date_obtained).getFullYear()))].sort()
      // get where to declare to render
      const defaultMarkup = this._declareGridCertificationsMarkup(this._data)
      new Timeline(this._timelineContainer, defaultMarkup, this._timelineTimeSettings)
  }
  _setTimelineCertsSettings(_data) {
      if(!Array.isArray(_data)) {
        Object.assign(this._timelineTimeSettings, _data)
        Object.assign(this._timelineTimeSettings, TIMELINE_SIZE_SETTINGS)
        Object.assign(this._timelineTimeSettings, TIMELINE_FUNCTIONALITY_SETTINGS)
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
          <span>${month} ${year}</span><br/>
          <a href="${cert.cert_url}" target="_blank">View Certificate</a>
        </div>
      `,
              start: cert.date_obtained
          };
      });
  }
	_certificationsMarkup(_data) {
		this._data = _data;
		const innerMarkup = this._data.map(certs => `
      <!-- Viewed in card -->
      <div class="card shadow-sm border-0 mb-3">
        <div class="card-header d-flex justify-content-between align-items-center bg-secondary text-white">
          <span class="fw-bold">Certification</span>
          <small class="fw-semibold obtained">Obtained: ${certs.date_obtained}</small>
        </div>
        <div class="card-body">
          <h5 class="card-title mb-2">${certs.title}</h5>
          <p class="card-text mb-1"><strong>Platform: </strong>${certs.platform}</p>
          <p class="card-text mb-3"><strong>Instructor: </strong>${certs.instructor}</p>
          <a href="${certs.cert_url}" target="_blank" rel="noopener noreferrer" 
             class="btn btn-sm btn-outline-primary">
            View Certificate
          </a>
        </div>
        <div class="card-footer bg-light">
          <p class="mb-1 fw-semibold text-dark">Additional Info</p>
          <small class="text-muted">
            <strong>Time it took to obtain:</strong> ${certs.length}
          </small>
        </div>
      </div>
  `);
		return [
			 ...innerMarkup
		];
	}
}
export default new CertificationsView()