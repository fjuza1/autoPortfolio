import View from './View.js';
class ToolboxView extends View {
	constructor() {
		super();
		this.addHandlerHideShowDescription();
	}
	_parentElement = document.getElementById('myQA');
    #showAllBTN = document.querySelector("#myQAtoolboxs > div.row.text-center.justify-content-center.mb-4 > div > div.col.text-end > button");
    #cardDescriptions = this._parentElement.getElementsByTagName('p');
	_generateQAToolboxMarkup = (_data) => {
		//d-block d-md-none
		this._data = _data;
		return this._data.map((qaTool) => {
			return `
			<div class="col-6 col-md-4 col-lg-2 mb-3">
				<div class="card h-100 shadow-sm">
				<img 
					src="${qaTool.imgPath}" 
					class="card-img-top p-2 img-fluid" 
					alt="${qaTool.name}" 
					style="max-height: 80px; object-fit: contain;">
				<div class="card-body p-2 d-flex flex-column align-items-center">
					<h6 class="card-title mb-1 text-center">
					<strong>${qaTool.name}</strong>
					</h6>
					<button 
					type="button" 
					class="btn btn-link p-0 small" 
					id="${qaTool.name.toLowerCase().replaceAll(" ", "-")}">
					Show description
					</button>
					<p 
					class="card-text small mb-0 d-none text-center" 
					data-btn="${qaTool.name.toLowerCase().replaceAll(" ", "-")}">
					${qaTool.description}
					</p>
				</div>
				</div>
			</div>
			`
		})
	}
	#toggleCard = (desc, hide) => {
	// Proper toggle: if 'hide' is boolean, force it; else truly toggle
	if (typeof hide === 'boolean') {
		desc.classList.toggle('d-none', hide);
	} else {
		desc.classList.toggle('d-none');
	}

	const btnId = desc.dataset.btn;
	const btn = this._parentElement.querySelector(`button#${CSS.escape(btnId)}.btn-link`);
	if (btn) {
		const isHidden = desc.classList.contains('d-none');
		btn.textContent = isHidden ? 'Show description' : 'Hide description';
		btn.setAttribute('aria-expanded', String(!isHidden));
	}
	};
	#toggleDescription = (e) => {
	const target = e.target.closest('button.btn-link');
	if (!target) return;

	const isAllBtn = target.dataset.btn === 'allTool';
	if (isAllBtn) {
		const descriptions = Array.from(this.#cardDescriptions);
		if (!descriptions.length) return;

		// Use the button's state/intent, not current mixed visibility
		const wantShowAll = target.getAttribute('aria-expanded') !== 'true';
		const hideAll = !wantShowAll;

		descriptions.forEach(desc => this.#toggleCard(desc, hideAll));
		target.textContent = hideAll ? 'Show descriptions' : 'Hide descriptions';
		target.setAttribute('aria-expanded', String(!hideAll));
		return;
	}

	// Single-card toggle
	const btnID = target.id;
	if (!btnID) return;
	const desc = this._parentElement.querySelector(`[data-btn="${CSS.escape(btnID)}"]`);
	if (!desc) return;

	this.#toggleCard(desc); // true toggle now works
	};
	addHandlerHideShowDescription() {
		this._parentElement.addEventListener('click', this.#toggleDescription.bind(this));
		this.#showAllBTN.addEventListener('click', this.#toggleDescription.bind(this));
	}
}
export default new ToolboxView();