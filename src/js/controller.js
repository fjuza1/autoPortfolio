import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';
import * as model from './model.js';
import popupView from './Views/PopoutView.js';
import design from './Views/DesignView.js';
import skillsView from './Views/skillsView.js';
const controllNavBar = () => {
   design.addHandlerHover(design.handleHover)
   design.addHandlerNavObserver()
   design.addScrollIntoHandler(design.scrollIntoSection)
}
const controlSections = () => {
   design.addRevealSectionObserver()
}
const controllSkillDisplay = () => {
   skillsView._render(skillsView._skillBarDisplay(model.state.skills))
}
const controllResults = () =>{
   const array = model.state.skills;
   skillsView._data.array = model.state.skills;
   const sorted = skillsView._sortingSkills(skillsView._data)
   skillsView._render(skillsView._skillBarDisplay(sorted))
}
const init = () => {
   controllSkillDisplay();
   controllNavBar();
   controlSections();
   skillsView._addHandlerSubmit(controllResults)
}
init()