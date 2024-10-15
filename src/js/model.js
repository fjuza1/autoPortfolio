import {RES_PER_PAGE, EXPERT_LEVEL} from './config.js'
export const state = {
	skills: [{
		name: 'Postman',
		level: EXPERT_LEVEL[3]
	},{
        name: 'JavaScript',
        level: EXPERT_LEVEL[4]
    },{
        name: 'HTML',
        level: EXPERT_LEVEL[3]
    },{
        name: 'XML',
        level: EXPERT_LEVEL[3]
    },{
        name: 'SQL',
        level: EXPERT_LEVEL[3]
    },{
        name: 'Cypress',
        level: EXPERT_LEVEL[2]
    },{
        name: 'SoapUI',
        level: EXPERT_LEVEL[1]
    },{
        name: 'Azure DevOps Server',
        level: EXPERT_LEVEL[3]
    },{
        name: 'TFS',
        level: EXPERT_LEVEL[3]
    },{
        name: 'Microsoft Visual Studio Code',
        level: EXPERT_LEVEL[3]
    },{
        name: 'Microsoft SQL Servers Studio',
        level: EXPERT_LEVEL[2]
    },{
        name: 'UML - Unified Modeling Language',
        level: EXPERT_LEVEL[2]
    },{
        name: 'Enterprise Architect',
        level: EXPERT_LEVEL[3]
    },{
        name: 'Select Architect',
        level: EXPERT_LEVEL[3]
    },{
        name: 'Eclipse IDE for Java Developers',
        level: EXPERT_LEVEL[3]
    },{
        name: 'CI/CD pipeline',
        level: EXPERT_LEVEL[1]
    }],
	res_per_page: RES_PER_PAGE,
	currentPage: 1
}