import View from './View.js';
class SkillsView extends View {
	_parentElement = document.querySelectorAll('.container')[1];
	_sortFilter = document.getElementById('sortSkillFilter');
	_skillBarDisplay(data) {
		console.log(this._sortFilter);
		const html = [];
		let valNow;
		let width;
		let color
		const filterinfoBtn = `          
			<button type="button" class="btn btn-link" tabindex="0" data-toggle="tooltip" title="Filter & Sort"> 
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
				<path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
				</svg>
			</button>`
		const exportBtn = `
		    <button type="button" class="btn btn-link" tabindex="0" data-toggle="tooltip" title="Export"> 
				<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
				<path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
				</svg>
          	</button>`
		const buttonGroup = `<div class="btn-group" id="skillBtnGroup" role="group" aria-label="Filtering Buttons"> ${filterinfoBtn}${exportBtn}</div>`
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
		return '<h3>Skills</h3>' + buttonGroup + html.join('');
	}
	_sortingSkills(options) {
		const sortFunctions = {
			expertise: (a, b) => options.order === 'asc' ? a.levelNumber - b.levelNumber : b.levelNumber - a.levelNumber,
			name: (a, b) => options.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
			category: (a, b) => options.order === 'asc' ? a.category.localCompare(b.category) : b.category.localCompare(a.category)
		};

		return options.array.sort(sortFunctions[options.sortBy]);
	}
	addSortHandler(handler) {
		this._sortFilter.addEventListener('change', handler);
	}

}
export default new SkillsView();