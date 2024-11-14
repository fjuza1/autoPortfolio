import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';
import {emailValidator, createCaptcha} from './lib.js';
import {timeout} from './helpers.js'
import * as model from './model.js';
import popoutView from './Views/popoutView.js'
import designView from './Views/designView.js';
import skillsView from './Views/skillsView.js';
import skillsExportView from './Views/skillsExportView.js';
import slidesView from './Views/slidesView.js';
import contactView from './Views/contactView.js';
import paginationView from './Views/paginationView.js';
// console.log(emailValidator, createCaptcha);
//console.log(popupView, designView, skillsView, skillsExportView, slidesView, contactView);
const controllNavBar = () => {
	designView.addHandlerHover(designView.handleHover)
	designView.addHandlerNavObserver()
}
const controlSections = () => {
	designView.addRevealSectionObserver()
}
const loadAndRenderContent = () => {
	model.fetchSkills();
	console.log(model.state.data);
	const data = model.paginate(model.state.data)
	skillsView._render(skillsView._skillBarDisplay(data))
	//markup
	paginationView._generateMarkup(model.state)
	//projectViewRender
}
const controllSortedSkills = () => {
	const sorted = model.sortingSkills({array:model.state.skills.data, sortBy:skillsView._formData.sortBy, order: skillsView._formData.order})
	skillsView._renderSpinner();
	timeout(() => {
		skillsView._render(skillsView._skillBarDisplay(sorted))
	});
}
const controllSlides = () => {
	slidesView.handleSlides()
}
const controllProjects = () =>{
}
const controllSkillsExport =  async () => {
	try {
		const array = {array:model.state.skills.data}
		const options = {...array, ... skillsExportView._formData};
		const data = await model.toFile(options);
		const done = model.state.export.fileState.done === true
        const [fileErrors]= data
        const generatedData = data[1];
        const fileType = fileErrors.find(err=>err.type === 'fileType');
        const fileName = fileErrors.find(err=>err.type === 'fileName');
		if(!fileName){
			if(done) {
				skillsExportView._exportModal(generatedData);
				popoutView._openModal(true);
				return;
			}
		}
		if(fileType) skillsExportView._outlineError({type: fileType.type,message:fileType.message})
            else skillsExportView._outlineError({type: fileName.type,message:fileName.message})
	} catch (err) {
		throw err;
	}
}
const controllSortedResetSkills = () => {
	const original = model.state.skills.data
	skillsView._data =  original
	model.state.skills.filtered = [];
	skillsView._render(skillsView._skillBarDisplay( original))
}
const controllFilterSkills = () =>{
	const options = {array: model.state.skills.data, keys:['name','levelNumber'],values:[skillsView._formData.name,+skillsView._formData.levelNumber]};
	model.filterSkills(options)
    skillsView._renderSpinner();
    timeout(() => {
        skillsView._render(skillsView._skillBarDisplay(model.state.skills.filtered))
    });
}
const init = () => {
	designView.addHandlerLoadHash(designView.scrollIntoSection)
	controllNavBar();
	controlSections();
	controllSlides();
	skillsView._addHandlerLoad(loadAndRenderContent)
	skillsView._addHandlerFormReset(controllSortedResetSkills);
	skillsView._addFilterSkillsHandler(controllFilterSkills);
	skillsView._addHandlerSubmit(controllSortedSkills);
	skillsExportView._addHandlerSubmit(controllSkillsExport)
	paginationView.addHandlerPagination(loadAndRenderContent)
}
init()