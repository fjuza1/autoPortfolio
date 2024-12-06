import View from './View.js';
import { ALLOWED_FILTER_SKILLS, SKILLSVIEW_MESSAGE } from "../config.js";
import { filterByKeys } from "../helpers.js";
class SkillsView extends View {
    _parentElement = document.querySelector('#skillsContainer');
    _form = document.querySelector('form')
    _formBtn = document.querySelector('button[type="submit"]');
    _err = SKILLSVIEW_MESSAGE;
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
    _addFilterSkillsHandler(handler) {
        ['change', 'input', 'paste'].forEach(ev => this._form.addEventListener(ev, (e) => {
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