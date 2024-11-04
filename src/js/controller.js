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
import slidesView from './Views/slidesView.js';
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
	const skills = skillsView._sortingSkills(options)
	timeout(() => {
		skillsView._render(skillsView._skillBarDisplay(skills))
	});
}
const controllSkillsExport =  async () => {
	try {
		const array = {array:model.state.skills}
		const options = {...array, ... skillsExportView._formData};
		await skillsExportView.export(options);
	} catch (err) {
		throw err;
	}
}
const controllSortedResetSkills = () => {
	const original = model.state.skills
	skillsView._data =  original
	skillsView._render(skillsView._skillBarDisplay( original))
}
const controllFilterSkills = () =>{
	const options = {params:['name','levelNumber'],values:[skillsView._formData.name,+skillsView._formData.levelNumber]};
	const keys = options['params'];
	const values = options['values'];
	const filtered = skillsView._filterActivities(model.state.skills, keys, values);
    skillsView._renderSpinner();
    timeout(() => {
        skillsView._render(skillsView._skillBarDisplay(filtered))
    });
}
const init = () => {
	controllNavBar();
	controlSections();
	skillsView._addHandlerLoad(controllSkillDisplay)
	skillsView._addHandlerFormReset(controllSortedResetSkills);
	skillsView._addFilterSkillsHandler(controllFilterSkills);
	skillsView._addHandlerSubmit(controllSortedSkills);
	skillsExportView._addHandlerSubmit(controllSkillsExport)
}
init()