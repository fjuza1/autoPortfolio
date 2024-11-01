import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';
import {Papa, xml2js, saveAs} from './lib.js';
import {timeout} from './helpers.js'
import * as model from './model.js';
import popupView from './Views/popoutView.js';
import designView from './Views/designView.js';
import skillsView from './Views/skillsView.js';
import skillsExportView from './Views/skillsExportView.js';
const controllNavBar = () => {
	designView.addHandlerHover(designView.handleHover)
	designView.addHandlerNavObserver()
	designView.addScrollIntoHandler(designView.scrollIntoSection)
}
const controlSections = () => {
	designView.addRevealSectionObserver()
}
const controllSkillDisplay = () => {
	skillsView._render(skillsView._skillBarDisplay(model.state.skills))
}
const controllSortedSkills = () => {
	const array = {array: model.state.skills}
	const options = Object.assign(array, skillsView._formData)
	skillsView._renderSpinner();
	skillsView._sortingSkills(options)
	console.log(skillsView);
	timeout(() => {
		skillsView._render(skillsView._skillBarDisplay(model.state.skills))
	});
}
const controllSkillsExport =  async () => {
	try {
		const array = {array:model.original.skills}
		const options = {...array, ... skillsExportView._formData};
		await skillsExportView.export(options);
	} catch (err) {
		throw err;
	}
}
// BUG loader is there when cicked outside not good
const controllSortedResetSkills = () => {
	const originalArraySkills = model.original.skills;
	skillsView._render(skillsView._skillBarDisplay(originalArraySkills))
}
const controllFilterSkills = () =>{
	const options = {params:['name','levelNumber'],values:[skillsView._formData.name,+skillsView._formData.levelNumber]};
	const keys = options['params'];
	const values = options['values'];
	const filtered = skillsView._filterByKeys(model.state.skills, keys, values);
    skillsView._renderSpinner();
	console.log(skillsView);
    timeout(() => {
        skillsView._render(skillsView._skillBarDisplay(filtered))
    });
}
const init = () => {
	controllSkillDisplay();
	controllNavBar();
	controlSections();
	skillsView._addHandlerFormReset(controllSortedResetSkills);
	skillsView._addFilterSkillsHandler(controllFilterSkills);
	skillsView._addHandlerSubmit(controllSortedSkills);
	skillsExportView._addHandlerSubmit(controllSkillsExport)
}
init()