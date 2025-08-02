import View from './View.js';
import { ALLOWED_FILTER_SKILLS, SKILLSVIEW_EMPTY_MESSAGE } from "../config.js";
class SkillsView extends View {
    _parentElement = document.querySelector('#skillsContainer');
    _form = document.querySelector('.filterActivities')
    _formBtn = document.querySelector('button[type="submit"]');
    _err = SKILLSVIEW_EMPTY_MESSAGE;
    /**
     * This function generates HTML markup for displaying skill bars based on the provided data.
     *
     * @param {Array} _data - An array of objects representing skills. Each object should have properties:
     *                         'name' (string) - The name of the skill.
     *                         'level' (string) - The level of the skill.
     *
     * @returns {Array} - An array of strings, each representing an HTML markup for a skill bar.
     *
     * @example
     * const skillsData = [
     *   { name: 'JavaScript', level: 'Advanced' },
     *   { name: 'HTML', level: 'Expert' },
     *   { name: 'CSS', level: 'Skillful' },
     * ];
     *
     * const skillBarMarkup = _skillBarDisplay(skillsData);
     * console.log(skillBarMarkup);
     * // Output:
     * // [
     * //   '<div class="progress-container mb-1">...',
     * //   '<div class="progress-container mb-1">...',
     * //   '<div class="progress-container mb-1">...',
     * // ]
     */
    _skillBarDisplay(_data) {
        let valNow;
        let width;
        let color;
        return _data.map(barArea => {
            switch (barArea.level) {
                case 'Beginner':
                    valNow = 0;
                    width = 0;
                    color = 'bg-danger';
                    break;
                case 'Basic':
                    valNow = 25;
                    width = 25;
                    color = 'bg-warning';
                    break;
                case 'Skillful':
                    valNow = 50;
                    width = 50;
                    color = 'bg-info';
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

    /**
     * Adds event listeners to the form for filtering skills.
     * The function listens for 'change', 'input', and 'paste' events on the form.
     * When an event is triggered, it retrieves the name attribute of the target element.
     * If the name attribute is not present, the function returns early.
     * If the name attribute is present and matches any of the allowed filter skills,
     * it calls the provided handler function with the current data.
     *
     * @param {Function} handler - A function that will be called when a valid filter event occurs.
     *                            The function should accept one parameter:
     *                            - _data: An array of objects representing skills.
     *
     * @returns {void}
     */
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