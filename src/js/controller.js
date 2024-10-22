import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';
import * as model from './model.js';
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
   // usew update instead
   //skillsView._sortingSkills(options)
   skillsView.addCollapseHandler(skillsView._displayCollapsedSection)
   skillsView._render(skillsView._skillBarDisplay(model.state.skills))
}
const init = () => {
   controllSkillDisplay();
   controllNavBar();
   controlSections();
}
init()