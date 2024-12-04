import {EXPERT_LEVEL, EXPERT_NUM, CATEGORIES, EXPORT_WHITELIST, PROJECT_NAME, PROJECT_ORDER_NUM, PROJECT_DESCRIPTOR, JSON_TYPE, XML_TYPE, CSV_TYPE,
	DEFAULT_ENCODING, ERROR_MISSING_FILENAME, ERROR_SUPPORTED_FILE_TYPES, UNGENERATED_FILE_MESSAGE, RES_PER_PAGE_TRESHOLD, CURRENT_PAGE, DEV_TYPE, FE_TYPE, BE_TYPE,
	MN_TYPE, URL_CY_DEMO, URL_PORTFOLIO_DEMO, IMG_PORTFOLIO_DEMO, IMG_CY_DEMO
} from './config.js';
import {fetchData, toXml, toCsv, toJSON, handleFileGeneration, filterByKeys} from './helpers.js';
import {saveAs} from './lib.js';
export const state = {
	export:{
		fileState: {
			empty:false,
			loading: false,
			done:false
		},
	},
	curPage:CURRENT_PAGE,
	perPage: RES_PER_PAGE_TRESHOLD,
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
		types: [MN_TYPE],
		url: '',
		imgPath: ''
	},
	{
		name: PROJECT_NAME[1],
		levelNumber: PROJECT_ORDER_NUM[1],
		description: PROJECT_DESCRIPTOR[1],
		types: [MN_TYPE, BE_TYPE],
		url: '',
		imgPath: ''
	},
	{
		name: PROJECT_NAME[2],
		levelNumber: PROJECT_ORDER_NUM[2],
		description: PROJECT_DESCRIPTOR[2],
		types: [MN_TYPE],
		url: '',
		imgPath: ''
	},
	{
		name: PROJECT_NAME[3],
		levelNumber: PROJECT_ORDER_NUM[3],
		description: PROJECT_DESCRIPTOR[3],
		types: [MN_TYPE],
		url: '',
		imgPath: ''
	},
	{
		name: PROJECT_NAME[4],
		levelNumber: PROJECT_ORDER_NUM[4],
		description: PROJECT_DESCRIPTOR[4],
		types: [MN_TYPE, BE_TYPE,FE_TYPE],
		url: '',
		imgPath: ''
	},
	{
		name: PROJECT_NAME[5],
		levelNumber: PROJECT_ORDER_NUM[5],
		description: PROJECT_DESCRIPTOR[5],
		types: [MN_TYPE, FE_TYPE],
		url: '',
		imgPath: ''
	},
	{
		name: PROJECT_NAME[7],
		levelNumber: PROJECT_ORDER_NUM[7],
		description: PROJECT_DESCRIPTOR[7],
		types: [FE_TYPE],
		url: URL_CY_DEMO,
		imgPath: IMG_CY_DEMO
	},
	{
		name: PROJECT_NAME[6],
		levelNumber: PROJECT_ORDER_NUM[6],
		description: PROJECT_DESCRIPTOR[6],
		types: [DEV_TYPE, FE_TYPE],
		url: URL_PORTFOLIO_DEMO,
		imgPath: IMG_PORTFOLIO_DEMO
	}
],
projectDemos:''
}
export const readFileState = async (file) => {
    try {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
			reader.onerror = (error) => {
                reject(error);
            };
			state.export.fileState.empty = true;
			reader.readAsText(file);
			state.export.fileState.empty = false;
			state.export.fileState.loading = true;

			reader.onloadend = (event) => {

			  state.export.fileState.loading = false;
			  state.export.fileState.done = true;
			  resolve(event.target.result);
			};
        });
    } catch (err) {
        throw err;
    }
};
export const toFile = async (options) => {
	try {
		const array = options.array
		const errors = [];
		let content;
		let textType;
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
		const checkValsEmpty = Object.values(options).every(val=> val.length !== 0)
		let generatedMessage;
		if(checkValsEmpty) {
			const blob = new Blob([String(content)], textType);
			const read = await readFileState(blob)
			generatedMessage = await handleFileGeneration(blob);
			errors.length > 0 || generatedMessage.includes( UNGENERATED_FILE_MESSAGE ) ? false : saveAs(blob, options.fileName);
		}
		return [errors,generatedMessage];
	} catch (err) {
		throw err;
	}
}
export const filterSkills = function (options) {
    let value;
    const { array, keys, values } = options;
    const copiedArray = [...array];
    value = values.map(el => el === 0 ? '' : el);

    const filteredData = filterByKeys(copiedArray, keys, value);
	state.skills.filteredSkills = filteredData
	const froze = Object.freeze(state.skills.filteredSkills)

    return filteredData;
}
export const sortingSkills = function(options) {
	let {array, sortBy, order} = options;
	const skills = state.skills
	const value = state.skills.filteredSkills ? array = state.skills.filteredSkills : skills;
	const sortFunctions = {
		expertise: (a, b) => order === 'asc' ? a.levelNumber - b.levelNumber : b.levelNumber - a.levelNumber,
		name: (a, b) => order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
		category: (a, b) => order === 'asc' ? a.category.localCompare(b.category) : b.category.localCompare(a.category)
	};
	return [...array].sort(sortFunctions[sortBy]);
}
export const getProjectDemos = (array = state.projects) => {
	const demos = array.reduce((acc,cur)=>{
		if(cur.imgPath.trim().length > 0 && cur.url.trim().length > 0)
			acc[acc.length] =  cur
        return acc;
	},[])
	state.projectDemos = demos
}
export const loadMore = function(array,currentPage = state.curPage ,itemsPerPage = state.perPage) {
	const start = 0;
	const end = currentPage * itemsPerPage;
	return {
		currentPage: currentPage,
        data: array.slice(start, end),
		pages: Math.ceil(array.length / itemsPerPage),
		perPage: itemsPerPage
	}
}