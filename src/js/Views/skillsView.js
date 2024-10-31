import View from './View.js';
import * as model from '../model.js'
class SkillsView extends View {
    _parentElement = document.querySelector('#skillsContainer');
    _sortFilter = document.getElementById('sortSkillFilter');
     _form = document.querySelector('form')
     _formBtn = document.querySelector('button[type="submit"]');
    _skillBarDisplay(_data) {
        this._data = _data;
        const html = [];
        let valNow;
        let width;
        let color
        _data.forEach(barArea => {
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
    _sortingSkills(options) {
        const sortFunctions = {
            expertise: (a, b) => options.order === 'asc' ? a.levelNumber - b.levelNumber : b.levelNumber - a.levelNumber,
            name: (a, b) => options.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
            category: (a, b) => options.order === 'asc' ? a.category.localCompare(b.category) : b.category.localCompare(a.category)
        };
        const sorted = options.array.sort(sortFunctions[options.sortBy]);
        this._data = sorted
        return sorted
    }
    _addFilterSkillsHandler(handler){
        ['input','change'].forEach(ev=>this._form.addEventListener(ev, (e) =>{
            const allowedList = ['name','levelNumber']
            const name = e.target.getAttribute('name')
            if(!name) return;
            if (allowedList.includes(name)) {
                this._submitEvent(e)
                handler(this._data)
            }
        }))
    }
}
export default new SkillsView();