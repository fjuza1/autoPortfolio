import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';
import {timeout, wait, debounce} from './helpers.js';
import * as model from './model.js';
import paginationView from './Views/paginationView.js';
import popoutView from './Views/popoutView.js';
import designView from './Views/designView.js';
import skillsView from './Views/skillsView.js';
import skillsExportView from './Views/skillsExportView.js';
import projectsView from './Views/projectsView.js';
import slidesView from './Views/slidesView.js';
import contactView from './Views/contactView.js';
import performanceView from './Views/performanceView.js';
performanceView._perfObserver()
// design part
const controllNavBar = () => {
	designView.addHandlerHover(designView.handleHover)
	designView.addHandlerNavObserver()
}
const controlSections = () => {
	designView.addRevealSectionObserver()
}
const loadAndRenderContent = () => {
	skillsView._renderSpinner();
	// handle generation
	handlePagination(model.state.skills,(data) => {
		skillsView._render(skillsView._skillBarDisplay(data))
	})
	// projects
	projectsView._render(projectsView._renderSlidesMarkup({array: model.state.projects, interval: true}))
	slidesView._initializeElement();
	slidesView.handleSlides()
}

// pagination basic
const handlePagination = (dataSource, callback) => {
	const paged = model.loadMore(dataSource)
	paginationView._render(paged)
	callback(paged.data)

	paginationView.addHandlerPagination((data)=>{
		const updated = model.loadMore(dataSource,data)
		paginationView._render(updated)
		callback(updated.data)
	})
}


// skillsData manipulation part
const controllSortedSkills = () => {
	const array = {array: model.state.skills}
	const options = Object.assign(array, skillsView._formData)
	skillsView._renderSpinner();
	const skills = model.sortingSkills(options)
	timeout(() => {
		handlePagination(skills,(data)=>{
			skillsView._render(skillsView._skillBarDisplay(data))
		})
	});
}
const controllSortedResetSkills = () => {
	const original = model.state.skills
	original.filteredSkills = '';
    model.state.curPage = 1;

    handlePagination(original, (data) => {
        skillsView._render(skillsView._skillBarDisplay(data));
    });
};

const controllFilterSkills = () =>{
	const options = {array: model.state.skills, keys:['name','levelNumber'],values:[skillsView._formData.name,+skillsView._formData.levelNumber]};
	const filtered = model.filterSkills(options);
    skillsView._renderSpinner();
    timeout(() => {
		handlePagination(filtered,(data)=>{
            skillsView._render(skillsView._skillBarDisplay(data))
        })
    });
}
					/*
					(function(next) {
  //do something
  next()
}(function() {
  //do some more
}))
					*/
// export skills
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
			if(done === true) {
				if(skillsExportView._generatingfileState === null) {
					popoutView._openModal(true)
					wait(()=>{
						skillsExportView._exportModal(generatedData);
					},800)
					skillsExportView._animateState('Generating file')
				}
				return;
			}
		}
		if(fileType) skillsExportView._outlineError({type: fileType.type,message:fileType.message})
            else skillsExportView._outlineError({type: fileName.type,message:fileName.message})
	} catch (err) {
		throw err;
	}
}


// project part
const controllProjects = () => {
	model.getProjectDemos(); 
	// demo data model.state.projectDemo
	projectsView._renderProjectModal(model.state.projectDemos)
}

//contaction
const controllContacting = () =>{
	const email = contactView._formData
	contactView._sendMail(email)
}
const init = () => {
	controllNavBar();
	controlSections();
	designView.addHandleClickIntoSection()
	skillsView.addHandlerLoad(loadAndRenderContent)
	designView.addHandlerLoad(designView.scrollIntoSection)
	skillsView._addHandlerFormReset(controllSortedResetSkills);
	skillsView._addFilterSkillsHandler(controllFilterSkills);
	skillsView._addHandlerSubmit(controllSortedSkills);
	skillsExportView._addHandlerSubmit(controllSkillsExport);
	popoutView._addHandleOpenModal(controllProjects);
}
init()
// performance optimization
console.log(performanceView._getMemoryStats());