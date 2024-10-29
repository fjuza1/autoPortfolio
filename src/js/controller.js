import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';
import * as model from './model.js';
import * as help from './helpers.js'
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
const controllResults = () =>{
   const array = model.state.skills;
   skillsView._data.array = model.state.skills;
   skillsView._renderSpinner();
   const sorted = skillsView._sortingSkills(skillsView._data)
   help.timeout(() => {
      skillsView._render(skillsView._skillBarDisplay(sorted))
   });
}
const controllResultsReset = () =>{
   const originalArraySkills = model.original.skills;
   skillsView._render(skillsView._skillBarDisplay(originalArraySkills))
}
const init = () => {
   controllSkillDisplay();
   controllNavBar();
   controlSections();
   skillsView._addHandlerFormReset(controllResultsReset)
   skillsView._addHandlerSubmit(controllResults)
}
init()