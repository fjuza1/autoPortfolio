import {EXPERT_LEVEL, EXPERT_NUM, CATEGORIES} from './config.js'
export const state = {
	skills: [{
		name: 'Postman',
		level: EXPERT_LEVEL[3],
		levelNumber: EXPERT_NUM[3],
		category: CATEGORIES[0]
	}, {
		name: 'JavaScript',
		level: EXPERT_LEVEL[4],
		levelNumber: EXPERT_NUM[4],
		category: CATEGORIES[2]
	}, {
		name: 'HTML',
		level: EXPERT_LEVEL[3],
		levelNumber: EXPERT_NUM[3],
		category: CATEGORIES[2]
	}, {
		name: 'XML',
		level: EXPERT_LEVEL[3],
		levelNumber: EXPERT_NUM[3],
		category: CATEGORIES[2]
	}, {
		name: 'SQL',
		level: EXPERT_LEVEL[3],
		levelNumber: EXPERT_NUM[3],
		category: CATEGORIES[2]
	}, {
		name: 'Cypress',
		level: EXPERT_LEVEL[2],
		levelNumber: EXPERT_NUM[2],
		category: CATEGORIES[0]
	}, {
		name: 'SoapUI',
		level: EXPERT_LEVEL[1],
		levelNumber: EXPERT_NUM[1],
		category: CATEGORIES[0]
	}, {
		name: 'Azure DevOps Server',
		level: EXPERT_LEVEL[3],
		levelNumber: EXPERT_NUM[3],
		category: CATEGORIES[0]
	}, {
		name: 'TFS',
		level: EXPERT_LEVEL[3],
		levelNumber: EXPERT_NUM[3],
		category: CATEGORIES[0]
	}, {
		name: 'Microsoft Visual Studio Code',
		level: EXPERT_LEVEL[3],
		levelNumber: EXPERT_NUM[3],
		category: CATEGORIES[0]
	}, {
		name: 'Microsoft SQL Servers Studio',
		level: EXPERT_LEVEL[2],
		levelNumber: EXPERT_NUM[2],
		category: CATEGORIES[0]
	}, {
		name: 'UML - Unified Modeling Language',
		level: EXPERT_LEVEL[2],
		levelNumber: EXPERT_NUM[2],
		category: CATEGORIES[2]
	}, {
		name: 'Enterprise Architect',
		level: EXPERT_LEVEL[3],
		levelNumber: EXPERT_NUM[3],
		category: CATEGORIES[0]
	}, {
		name: 'Select Architect',
		level: EXPERT_LEVEL[3],
		levelNumber: EXPERT_NUM[3],
		category: CATEGORIES[0]
	}, {
		name: 'Eclipse IDE for Java Developers',
		level: EXPERT_LEVEL[3],
		levelNumber: EXPERT_NUM[3],
		category: CATEGORIES[0]
	}, {
		name: 'CI/CD pipeline',
		level: EXPERT_LEVEL[1],
		levelNumber: EXPERT_NUM[1],
		category: CATEGORIES[3]
	}],
    projects:[]
}
export const original = {
	skills: Object.freeze([...state.skills]),
    projects: Object.freeze([...state.projects])
}