import View from './View.js';
class ToolboxView extends View {
	constructor() {
		super();
		this.addHandlerHideShowDescription();
	}
	_parentElement = document.getElementById('myQA');
    #showAllBTN = document.querySelector("[data-btn='allTool']");
    #cardDescriptions = this._parentElement.getElementsByTagName('p');
	_generateQAToolboxMarkup = (_data) => {
		//d-block d-md-none
		this._data = _data;
		return this._data.map((qaTool) => {
		return `
		<div class="col-12 col-md-6 col-xl-4 mb-3 d-flex">
		<div class="p-4 rounded shadow bg-white border-0 w-100 h-100" style="border-bottom: .25rem solid var(--bs-primary);">
			<div class="row align-items-center g-2">
			<div class="col-auto">
				<div class="bg-light rounded-circle d-flex align-items-center justify-content-center"
					style="width:64px;height:64px;">
				<img src="${qaTool.imgPath}" alt="${qaTool.name}"
					class="img-fluid" style="max-width:32px; max-height:32px; object-fit:contain;">
				</div>
			</div>
			<div class="col text-center">
				<h5 class="text-uppercase fw-bold mb-1 text-break w-100">
				${qaTool.name}
				</h5>
				<button 
				type="button" 
				class="btn btn-link p-0 small text-primary"
				id="${qaTool.name.toLowerCase().replaceAll(" ", "-")}">
				Show description
				</button>
			</div>
			</div>

			<p class="small text-center mb-0 d-none mt-2"
			data-btn="${qaTool.name.toLowerCase().replaceAll(" ", "-")}">
			${qaTool.description}
			</p>
		</div>
		</div>
		`;
		;
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