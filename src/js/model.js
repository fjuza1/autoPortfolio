import {EXPERT_LEVEL, EXPERT_NUM, CATEGORIES, EXPORT_WHITELIST, PROJECT_NAME, PROJECT_ORDER_NUM, PROJECT_DESCRIPTOR, PROJECT_TAGS, JSON_TYPE, XML_TYPE, CSV_TYPE,
	DEFAULT_ENCODING, ERROR_MISSING_FILENAME, ERROR_SUPPORTED_FILE_TYPES, UNGENERATED_FILE_MESSAGE
} from './config.js';
import {toXml, toCsv, toJSON, handleFileGeneration} from './helpers.js';
import {saveAs} from './lib.js';
export const state = {
	_data:[],
	_exportState: '',
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
	projects: 
	[
		{
		name: PROJECT_NAME[0],
		levelNumber: PROJECT_ORDER_NUM[0],
		description: PROJECT_DESCRIPTOR[0],
		startDate: '2020-01-01',
		endDate: '2020-12-31'
	},
	{
		name: PROJECT_NAME[1],
		levelNumber: PROJECT_ORDER_NUM[1],
		description: PROJECT_DESCRIPTOR[1],
		startDate: '2020-01-01',
		endDate: '2020-12-31'
	},
	{
		name: PROJECT_NAME[2],
		levelNumber: PROJECT_ORDER_NUM[2],
		description: PROJECT_DESCRIPTOR[2],
		startDate: '2020-01-01',
		endDate: '2020-12-31'
	},
	{
		name: PROJECT_NAME[3],
		levelNumber: PROJECT_ORDER_NUM[3],
		description: PROJECT_DESCRIPTOR[3],
		startDate: '2020-01-01',
		endDate: '2020-12-31'
	},
	{
		name: PROJECT_NAME[4],
		levelNumber: PROJECT_ORDER_NUM[4],
		description: PROJECT_DESCRIPTOR[4],
		startDate: '2020-01-01',
		endDate: '2020-12-31'
	},
	{
		name: PROJECT_NAME[5],
		levelNumber: PROJECT_ORDER_NUM[5],
		description: PROJECT_DESCRIPTOR[5],
		startDate: '2020-01-01',
		endDate: '2020-12-31'
	}
]
}
export const toFile = async (options) => {
	try {
		const array = options.array
		const errors = [];
		let content;
		let textType;
		let generatedMessage;
		if (!array) throw new Error(ERROR_ARRAY_MISSING);
		if (options.fileName.trim().length === 0) errors[errors.length] = {
			message: ERROR_MISSING_FILENAME,
			type: 'fileName'
		}
		if (!EXPORT_WHITELIST.includes(options.fileType)) errors[errors.length] = {
            message: ERROR_SUPPORTED_FILE_TYPES,
            type: 'fileType'
        }
		switch (options.fileType) {
			case EXPORT_WHITELIST[0]:
				content = toXml(array)
				textType = { type: `${XML_TYPE}; ${DEFAULT_ENCODING}` }
				break;
			case EXPORT_WHITELIST[1]:
				content = toJSON(array)
				textType = { type: `${JSON_TYPE}; ${DEFAULT_ENCODING}` }
				break;
			case EXPORT_WHITELIST[2]:
				content = toCsv(array);
				textType = { type: `${CSV_TYPE}; ${DEFAULT_ENCODING}` }
				break;
			default:
		}
		const blob = new Blob([String(content)], textType);
		if(errors.length === 0) {
			generatedMessage = await handleFileGeneration(undefined);
			if(!generatedMessage) return;
			if( generatedMessage.includes(UNGENERATED_FILE_MESSAGE)) errors[errors.length] = {message: generatedMessage,type:'generation error'};
		}
		errors.length > 0 ? false : saveAs(blob, options.fileName);
		return [errors,generatedMessage];
	} catch (err) {
		throw err;
	}
}