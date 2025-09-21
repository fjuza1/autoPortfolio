import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';
import {timeout, wait} from './helpers.js';
import {NONQATOOLS} from './config.js';
import * as model from './model.js';
import paginationView from './Views/paginationView.js';
import popoutView from './Views/popoutView.js';
import designView from './Views/designView.js';
import journeyView from './Views/journeyView.js';
import skillsView from './Views/skillsView.js';
import skillsExportView from './Views/skillsExportView.js';
import projectsView from './Views/projectsView.js';
import slidesView from './Views/slidesView.js';
import contactView from './Views/contactView.js';
import toolboxView from './Views/toolboxView.js';
import certificationsView from './Views/certificationsView.js'
import browserErrorsView from './Views/errorsHandlerView.js'
//console.log("TCL: toolboxView", toolboxView)
// filterTools({name: true, values: NONQATOOLS})
// _generateQAToolboxMarkup
//performanceView._perfObserve
// r()
// design part
const controllNavBar = () => {
	designView.addHandlerHover(designView.handleHover)
	designView.addHandlerNavObserver()
}
const controlSections = () => {
	designView.addRevealSectionObserver()
}
/**
 * Loads and renders the main content of the application.
 * 
 * This function performs the following actions:
 * 1. Displays a loading spinner for the skills section.
 * 2. Handles pagination for the skills data and renders the skill bars.
 * 3. Renders the projects section with slides and initializes slide functionality.
 * 4. Controls the journey section.
 * 5. Updates the application's theme.
 *
 * @function
 * @returns {void}
 */
const loadAndRenderContent = () => {
	certificationsView._render(certificationsView._certificationsMarkup(model.formatDatesRelative({array: model.state.certifications})))
	//certificationsView._setTimelineViewCertifications(model.state.certifications)
	// handle generation
	handlePagination(model.state.skills, (data) => {
		skillsView._render(skillsView._skillBarDisplay(data))
	})
	// projects
	projectsView._render(projectsView._renderSlidesMarkup({
		array: model.state.projects,
		interval: true
	}))
	slidesView._initializeElement();
	slidesView.handleSlides();
	controllJourney();
	model.filterTools({
		name: true,
		values: NONQATOOLS
	});
	toolboxView._render(toolboxView._generateQAToolboxMarkup(model.state.search.tools));
	designView._renderToast({
		msg: 'Thank you for visiting my personal portfolio website. Here, you can explore my work, discover my skills, and learn more about who I am as a creator and professional. Feel free to interact with the content, browse through my projects, and explore the features, including data export and filtering options.If you have any questions or want to connect, do not hesitate to reach out. I would love to hear from you! Pro Tip: Hover over the "i" icon for shortcuts and extra details!',
		position: 'bottom-center',
		title: 'Welcome to my portfolio!',
		type: 'info'
	});
	// // paginate tools
	// handlePagination(model.state.skills,(data) => {
	// 	toolboxView._render(toolboxView._generateQAToolboxMarkup(data))
	// })
}
// pagination basic
const handlePagination = (dataSource, callback) => {
	const paged = model.loadMore(dataSource)
	paginationView._update(paged)
	callback(paged.data)

	paginationView.addHandlerPagination((data) => {
		const updated = model.loadMore(dataSource, data)
		paginationView._update(updated)
		callback(updated.data)
	})
}
// controlling Personal sections

// controling journey
const controllJourney = () => {
	journeyView._setTimeline(model.state.journey);
}
// skillsData manipulation part
const controllSortedSkills = () => {
	const array = {
		array: model.state.search.skills
	}
	const options = Object.assign(array, skillsView._formData)
	model.sortingSkills(options);
	skillsExportView._disableBTN(model.state.search.isFiltered)
	timeout(() => {
		handlePagination(model.state.search.skills, (data) => {
			skillsView._update(skillsView._skillBarDisplay(data))
		})
	});
}
const controllResetSkills = () => {
	const original = model.state.skills
	original.filteredSkills = '';
	model.state.curPage = 1;
	model.state.search.skills = '';
	model.state.search.isFiltered = false;
	skillsExportView._disableBTN({disabled: model.state.search.isFiltered, existingButton: true})
	handlePagination(original, (data) => {
		skillsView._update(skillsView._skillBarDisplay(data));
	});
};

const controllFilterSkills = () => {
	const options = {
		array: model.state.skills,
		keys: ['name', 'levelNumber'],
		values: [skillsView._formData.name, +skillsView._formData.levelNumber]
	};
	model.filterSkills(options)
	model.state.search.isFiltered = model.state.search.skills.length > 0;
	skillsExportView._disableBTN({disabled: model.state.search.isFiltered, existingButton: true})
	timeout(() => {
		handlePagination(model.state.search.skills, (data) => {
			skillsView._update(skillsView._skillBarDisplay(data))
		})
	});
}
const controllSkillsExport = async () => {
	try {
		const array = {
			array: skillsExportView._isPrimaryBTN ?
				model.state.skills :
				model.state.search.skills
		}
		const options = {
			...array,
			...skillsExportView._formData
		};
		const data = await model.toFile(options);
		const done = model.state.fileState.done === true
		const [fileErrors] = data
		const generatedData = data[1];
		const fileType = fileErrors.find(err => err.type === 'fileType');
		const fileName = fileErrors.find(err => err.type === 'fileName');
		if (!fileName) {
			if (done === true) {
				if (skillsExportView._generatingfileState === null) {
					popoutView._openModal(true)
					wait(() => {
						skillsExportView._exportModal(generatedData);
					}, 800)
					skillsExportView._animateState('Generating file')
				}
				return;
			}
		}
		if (fileType) skillsExportView._outlineError({
			type: fileType.type,
			message: fileType.message
		})
		else skillsExportView._outlineError({
			type: fileName.type,
			message: fileName.message
		})
	} catch (err) {
		throw err;
	}
}
// project part
const controllModals = () => {
	model.getProjectDemos();
	// demo data model.state.projectDemo
	projectsView._renderProjectModal(model.state.projectDemos)
}
//contaction
const controllContacting = () => {
	const email = contactView._formData
	contactView._sendMail(email)
}
// settings
const controllSettings = (e) => {
	const type = e.type;
	designView._getSettings()
	designView._renderManipulatedSettingsToast(type);
	designView._savePreferences();
	designView._updateTheme();
	designView._centerLayout();
	const settings = designView._settings
	const settingsLen = Object.values(settings).length !== 0
	designView._disableBTN({disabled: settingsLen, existingButton: true});
}
const init = () => {
	controllNavBar();
	controlSections();
	designView.addHandleClickIntoSection();
	skillsView.addHandlerLoad(loadAndRenderContent)
	designView.addHandlerLoad(designView._getPreferences());
	designView.addHandlerLoad(designView.scrollIntoSection);
	skillsView._addHandlerFormReset(controllResetSkills);
	skillsView._addFilterSkillsHandler(controllFilterSkills);
	skillsView._addHandlerSubmit(controllSortedSkills);
	contactView._addHandlerSubmit(controllContacting);
	skillsExportView._addHandlerSubmit(controllSkillsExport);
	skillsExportView.addHandlerLoad(skillsExportView._disableBTN({disabled: model.state.search.isFiltered, existingButton: true}))
	designView._addHandlerSubmit(controllSettings);
	designView.addHandlerLoad(controllSettings);
	designView.addHandlerNavigateByKey();
	designView._addHandlerFormReset(controllSettings)
	popoutView._addHandleOpenModal(controllModals);
}
init()
// performance optimization
//console.log(performanceView._getMemoryStats());