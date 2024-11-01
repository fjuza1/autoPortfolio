import {EXPERT_LEVEL, EXPERT_NUM, CATEGORIES} from './config.js';
import {toXml,toCsv,toJSON} from './helpers.js';
import {saveAs} from './lib.js';
import path from "path";
export const state = {
	_data:[],
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
export const toFile = (options) => {
	try {
		const array = options.array
		const errors = [];
		const fileTypes = ['xml', 'json', 'csv'];
		const encoding = 'charset=utf-8'
		let content;
		let textType;
		if (!fileTypes.includes(options.fileType)) throw new Error('Incorrect or no specified file type')
		if (!array) throw new Error('Please provide an array');
		if (options.fileName.trim().length === 0) errors[errors.length] = {
			message: 'Please provide a fileName',
			type: 'fileName'
		}
		if (!options.fileType) errors[errors.length] = {
			message: 'Please provide a fileType',
			type: 'fileType'
		}
		switch (options.fileType) {
			case 'xml':
				content = toXml(array, 'skills')
				type = { type: `application/xml; ${encoding}` }
				break;
			case 'json':
				content = toJSON(array)
				type = { type: `application/json; ${encoding}` }
				break;
			case 'csv':
				content = toCsv(array);
				type = { type: `text/csv; ${encoding}` }
				break;
			default:
				throw new Error('Unknown option');
		}
		const blob = new Blob([String(content)], type);
		saveAs(blob, options.fileName);
		return errors;
	} catch (err) {
		throw err;
	}
}