import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';
import {emailValidator, createCaptcha} from './lib.js';
import {timeout} from './helpers.js'
import * as model from './model.js';
import paginationView from './Views/paginationView.js';
import popoutView from './Views/popoutView.js'
import designView from './Views/designView.js';
import skillsView from './Views/skillsView.js';
import skillsExportView from './Views/skillsExportView.js';
import slidesView from './Views/slidesView.js';
import contactView from './Views/contactView.js';
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
	skillsView._render(skillsView._skillBarDisplay(model.state.skills))
	//projectViewRender
}
const controllSortedSkills = () => {
	const array = {array: model.state.skills}
	const options = Object.assign(array, skillsView._formData)
	skillsView._renderSpinner();
	const skills = model.sortingSkills(options)
	const paged = model.paginate(skills)
	console.log("🚀 ~ controllpagedSkills ~ paged:", paged)
	timeout(() => {
		skillsView._render(skillsView._skillBarDisplay(skills))
	});
}
const controllSlides = () => {
	slidesView.handleSlides()
}
const controllProjects = () =>{
}
const controllSkillsExport =  async () => {
	try {
		const array = {array:model.state.skills}
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
	const original = model.state.skills
	original.filteredSkills = '';
	//skillsView._data =  original
	skillsView._render(skillsView._skillBarDisplay( original))
}
const controllFilterSkills = () =>{
	const options = {array: model.state.skills, keys:['name','levelNumber'],values:[skillsView._formData.name,+skillsView._formData.levelNumber]};
	const filtered = model.filterSkills(options);
	const paged = model.paginate(filtered)
    skillsView._renderSpinner();
    timeout(() => {
        paginationView._render(paged)
		skillsView._render(skillsView._skillBarDisplay( paged.data))
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
}
init()