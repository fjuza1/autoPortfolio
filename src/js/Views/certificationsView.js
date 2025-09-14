import View from './View.js'
class CertificationsView extends View {
	_parentElement = document.getElementById('navTabContentCerts')
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
          <small class="fw-semibold">Obtained: ${certs.date_obtained}</small>
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
		return [`<div class="tab-content mb-3" id="nav-tabContent">`,
			gridStart, ...innerMarkup,
			gridEnd,
			cardsStart, `<p class="text-muted">Alternative card view will be implemented here.</p>`,
			cardsEnd, `</div>` // end tab-content
		];
	}
}
export default new CertificationsView()