import View from './View.js';
import { ALLOWED_FILTER_SKILLS } from "../config.js";
import { filterByKeys } from "../helpers.js";
class SkillsView extends View {
    _parentElement = document.querySelector('#skillsContainer');
    _sortFilter = document.getElementById('sortSkillFilter');
    _form = document.querySelector('form')
    _formBtn = document.querySelector('button[type="submit"]');
    _msg = 'No skills were found! Please try again.';
    _skillBarDisplay(_data) {
        let valNow;
        let width;
        let color
        return _data.map(barArea => {
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
            return `
            <div class="progress-container mb-1">
                <div class="d-flex justify-content-between mb-1">
                    <span class="skill-name fw-bold">${barArea.name}</span>
                    <span class="skill-level badge "></span>
                </div>
                <div class="progress" style="height: 1.5rem;">
                    <div class="progress-bar ${color} progress-bar" role="progressbar" style="width: ${width}%;" 
                         aria-valuenow="${valNow}" aria-valuemin="0" aria-valuemax="100" 
                         aria-labelledby="progress">
                         ${barArea.level}
                    </div>
                </div>
            </div>
        `;
        });
    }
    _sortingSkills(options) {
        options.array = this._data ?? options.array ?? []
        const sortFunctions = {
            expertise: (a, b) => options.order === 'asc' ? a.levelNumber - b.levelNumber : b.levelNumber - a.levelNumber,
            name: (a, b) => options.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
            category: (a, b) => options.order === 'asc' ? a.category.localCompare(b.category) : b.category.localCompare(a.category)
        };
        return [...options.array].sort(sortFunctions[options.sortBy]);
    }
    _filterActivities(array, keys, values) {
        values = values.map(el => el === 0 ? '' : el);
        const found = filterByKeys(array, keys, values)
        this._data = found;
        return found
    }
    _addFilterSkillsHandler(handler) {
        ['input', 'change'].forEach(ev => this._form.addEventListener(ev, (e) => {
            const name = e.target.getAttribute('name')
            if (!name) return;
            if (ALLOWED_FILTER_SKILLS.includes(name)) {
                this._submitEvent(e)
                handler(this._data)
            }
        }))
    }
}
export default new SkillsView();