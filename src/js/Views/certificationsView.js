import TimeLineView from "./TimelineView";
import { Timeline } from "vis-timeline";
import moment from '../lib.js'
class CertificationsView extends TimeLineView {
	_parentElement = document.getElementById('navTabContentCerts');
  _timelineTimeSettings
  _setTimelineViewCertifications(_data) {
      this._data = _data;
      // get dfistinct years
      const distinctYears = [...new Set(this._data.map(cert => moment(cert.date_obtained).get('year')))]
      // get where to declare to render
      const timelineParent = this._parentElement?.querySelector('#certificationsGrid');
      const defaultMarkup = this._declareGridCertificationsMarkup(this._data)
      const timeline = new Timeline(timelineParent, {})
  }
  _declareGridCertificationsMarkup(_data) {
      this._data = _data
      return this._data.map(cert => {
          const date = moment(cert.date_obtained, "YYYY-MM-DD");
          const year = date.get('year')
          const month = date.format('MMMM')
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
		const gridStart = `<div class="tab-pane" id="certificationsGrid" role="tabpanel" aria-labelledby="nav-home-tab">`;
		const gridEnd = `</div>`; // end certificationsGrid
		const cardsStart = `<div class="tab-pane" id="certificationsCards" role="tabpanel" aria-labelledby="nav-profile-tab">`;
		const cardsEnd = `</div>`; // end certificationsCards
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
			gridStart, ...innerMarkup,
			gridEnd,
			cardsStart,
			cardsEnd, `</div>` // end tab-content
		];
	}
}
export default new CertificationsView()