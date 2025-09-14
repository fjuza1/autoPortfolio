import View from './View.js'
class CertificationsView extends View {
  _parentElement = document.getElementById('navTabContentCerts')
  _generateCertificationsMarkup(_data) {
    this._data = _data;
    return this._data.map(certs => {
return `
  <div class="tab-content mb-3" id="nav-tabContent">
  <!-- Viewed in card--!>
    <div class="tab-pane active show" id="certificationsGrid" role="tabpanel" aria-labelledby="nav-home-tab">
      <div class="card shadow-sm border-0">
        <div class="card-header d-flex justify-content-between align-items-center bg-secondary text-white">
          <span class="fw-bold">Certification</span>
          <small class="text-white fw-semibold">Obtained: ${certs.date_obtained}</small>
        </div>
        <div class="card-body">
          <h5 class="card-title mb-2">${certs.title}</h5>
          <p class="card-text mb-1"><strong>Platform: </strong>${certs.platform}</p>
          <p class="card-text mb-3"><strong>Instructor: </strong>${certs.instructor}</p>
          <a href="${certs.cert_url}" target="_blank" rel="noopener noreferrer" 
             class="nav nav-link">
            View Certificate
          </a>
        </div>
        <div class="card-footer bg-white">
          <p class="mb-1 text-white fw-semibold fw-semibold">Additional Info</p>
          <small class="text-muted">
            <strong>Time it took to obtain:</strong> ${certs.length}
          </small>
        </div>
      </div>
    </div>
    <div class="tab-pane" id="certificationsCards" role="tabpanel" aria-labelledby="nav-profile-tab">
      <p>
        <strong>This is some placeholder content for the ${certs.instructor} tab’s associated content.</strong>
        Clicking another tab will toggle the visibility of this one for the next. 
        The tab JavaScript swaps classes to control the content visibility and styling. 
        You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.
      </p>
    </div>
  </div>
`
    })
  }
}
export default new CertificationsView()