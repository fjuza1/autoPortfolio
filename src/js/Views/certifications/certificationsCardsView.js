import View from "../View.js";
class CertificationsCardsView extends View {
	_parentElement = document.getElementById('certificationsCards');
  _err = "There are no certifications to display. Please adjust your filtering criteria.";
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
export default new CertificationsCardsView();