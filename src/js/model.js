import {EXPORT_WHITELIST, PROJECT_NAME, PROJECT_ORDER_NUM, PROJECT_DESCRIPTOR, PROJECT_TAGS, JSON_TYPE, XML_TYPE, CSV_TYPE,
	DEFAULT_ENCODING, ERROR_MISSING_FILENAME, ERROR_SUPPORTED_FILE_TYPES, UNGENERATED_FILE_MESSAGE, CUR_PAGE, RES_PER_PAGE_TRESHOLD, SKILLS
} from './config.js';
import {toXml, toCsv, toJSON, handleFileGeneration, filterByKeys} from './helpers.js';
import {saveAs} from './lib.js';
export const state = {
	export:{
		fileState: {
			empty:false,
			loading: false,
			done:false
		},
	},
	currentPage: CUR_PAGE,
	resPerPage : RES_PER_PAGE_TRESHOLD,
	data: [],
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
export const fetchSkills = () =>{
	state.data = SKILLS
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
	state.data = filteredData
	const froze = Object.freeze(state.skills.filtered)

    return filteredData;
}
export const sortingSkills = function(options) {
	let {array, sortBy, order} = options;
	const sortFunctions = {
		expertise: (a, b) => order === 'asc' ? a.levelNumber - b.levelNumber : b.levelNumber - a.levelNumber,
		name: (a, b) => order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
		category: (a, b) => order === 'asc' ? a.category.localCompare(b.category) : b.category.localCompare(a.category)
	};
	return [...array].sort(sortFunctions[sortBy]);
}
export const paginate = (arr, pageNumber = state.currentPage, pageSize = state.resPerPage) => {
	const start = 0
	const end = pageSize * pageNumber;
	return arr.slice(start, end);
}