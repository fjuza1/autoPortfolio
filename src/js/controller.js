import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';
import {timeout, wait} from './helpers.js';
import {NONQATOOLS} from './config.js';
import * as model from './model.js';
import paginationView from './Views/paginationView.js';
import popoutView from './Views/popoutView.js';
import skillsView from './Views/skillsView.js';
import exportView from './Views/exportView.js';
import browserErrorsView from './Views/errorsHandlerView.js'
const controllModals = () =>{};
const controllResetSkills = () =>{};
const controllSortedSkills = () =>{};
const controllFilterSkills = () =>{};
const controllSkillsExport = ()=>{};
const init = () => {
	//skillsView._addHandlerFormReset(controllResetSkills);
	//skillsView._addFilterSkillsHandler(controllFilterSkills);
	//skillsView._addHandlerSubmit(controllSortedSkills);
	//exportView._addHandlerSubmit(controllSkillsExport);
	popoutView._addHandleOpenModal(controllModals);
}
init()