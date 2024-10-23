import View from './View.js';
//this._multiCollapse.forEach(el=>el.classList.remove('show'));
class SkillsView extends View {
	_parentElement = document.querySelector('#skillsContainer');
	_sortFilter = document.getElementById('sortSkillFilter');
    _skillBtnGroup = document.getElementById('skillBtnGroup');
    _body = document.body;
    _multiCollapse = document.querySelectorAll('.multi-collapse.collapse');
    constructor() {
        super();
        this._addHandlerHideSection();
        this._addHandlerShowSection();
    }
	_skillBarDisplay(data) {
		const html = [];
		let valNow;
		let width;
		let color
		data.forEach(barArea => {
			switch (barArea.level) {
				case 'Beginner':
					valNow = 0;
					width = 0;
					color = 'bg-danger'
					break;
				case 'Basic':
					valNow = 25;
					width = 25;
					color = 'bg-warning'
					break;
				case 'Skillful':
					valNow = 50;
					width = 50;
					color = 'bg-info'
					break;
				case 'Advanced':
					valNow = 75;
					width = 75;
					color = 'bg-primary';
					break;
				case 'Expert':
					valNow = 100;
					width = 100;
					color = 'bg-success';
					break;
			}
			html.push(`
			   <div class="progress-container mb-3">
				   <span class="skill-name">${barArea.name}</span>
				   <div class="progress">
					   <div class="progress-bar ${color}" role="progressbar" style="width: ${width}%;" aria-valuenow="${valNow}" aria-valuemin="0" aria-valuemax="100" aria-labelledby="progress-${barArea.level.toLowerCase()}">
						   ${barArea.level}
					   </div>
				   </div>
			   </div>
		   `);

		});
		return html.join('');
	}
    _toggleSection(e){
        const btnSet = e.target.closest('.btn.btn-link').dataset.btn
        const colapseSection = document.getElementById(`${btnSet}`);
        colapseSection.classList.toggle('show');
    }
    _hideSection(e){
        const target = e.target;
        const multi = [...this._multiCollapse].some(el=>el.contains(target));
        this._multiCollapse.forEach(el=>!multi ?el.classList.remove('show'):'');
    }
	_sortingSkills(options) {
		const sortFunctions = {
			expertise: (a, b) => options.order === 'asc' ? a.levelNumber - b.levelNumber : b.levelNumber - a.levelNumber,
			name: (a, b) => options.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
			category: (a, b) => options.order === 'asc' ? a.category.localCompare(b.category) : b.category.localCompare(a.category)
		};
		return options.array.sort(sortFunctions[options.sortBy]);
	}
    _addHandlerShowSection(){
        this._skillBtnGroup.addEventListener('click', this._toggleSection.bind(this));
    }
    _addHandlerHideSection(){
        this._body.addEventListener('mouseup', this._hideSection.bind(this));
    }
	addSortHandler(handler) {
		this._sortFilter.addEventListener('change', handler);
	}

}
export default new SkillsView();