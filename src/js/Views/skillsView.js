import View from './View.js';
class SkillsView extends View {
    _parentElement = document.querySelectorAll('.container')[1];
    skillBarDisplay(data) {
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
}
export default new SkillsView();