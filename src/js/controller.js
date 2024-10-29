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
   console.log(skillsView);
}
const init = () => {
   controllSkillDisplay();
   controllNavBar();
   controlSections();
   skillsView._addHandlerSubmit(controllResults)
}
init()