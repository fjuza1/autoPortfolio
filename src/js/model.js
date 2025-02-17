import {EXPERT_LEVEL, EXPERT_NUM, CATEGORIES, EXPORT_WHITELIST, PROJECT_NAME, PROJECT_ORDER_NUM, PROJECT_DESCRIPTOR, JSON_TYPE, XML_TYPE, CSV_TYPE,
	DEFAULT_ENCODING, ERROR_MISSING_FILENAME, ERROR_SUPPORTED_FILE_TYPES, UNGENERATED_FILE_MESSAGE, RES_PER_PAGE_TRESHOLD, CURRENT_PAGE, DEV_TYPE, FE_TYPE, BE_TYPE,
	MN_TYPE, URL_CY_DEMO, URL_PORTFOLIO_DEMO, IMG_PORTFOLIO_DEMO, IMG_CY_DEMO
} from './config.js';
import {toXml, toCsv, toJSON, handleFileGeneration, filterByKeys, isXML, isCSV, isJSON} from './helpers.js';
import {saveAs} from './lib.js';
export const state = {
    fileState: {
        empty: false,
        loading: false,
        done: false
    },
    curPage: CURRENT_PAGE,
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
    journey:[
        {year:'2021', content:'Started working as QA Tester.'},
        {year:'2021', content:'Started learning to read UML diagrams.'},
        {year:'2021', content:'Finished Udemy online course on UML.'},
        {year:'2021', content:'Started youtube online course on Postman.'},
        {year:'2021', content:'Started using Postman for testing.'},
        {year:'2021', content:'Finished Udemy course on Soap UI.'},
        {year:'2021', content:'Started Udemy course on Soap UI.'},
        {year:'2021', content:'Was taught to work with TFS.'},
        {year:'2021', content:'Started writing testcases in TFS.'},
        {year:'2021', content:'Started learning JavaScript.'},
        {year:'2022', content:'Started automating BE test in Postman.'},
        {year:'2023', content:'Ended Udemy online course in JavaScript.'},
        {year:'2024', content:'Learned automating E2E tests using Cypress.'},
        {year:'2024', content:'Started using Cypress for automating E2E tests.'},
        {year:'2025', content:'Started studying for ISTQB Foundation Level 4.0 certification.'},
        {year:'2025', content:'Gained ISTQB Foundation Level 4.0 certification.'}
    ],
    projects: [{
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
            types: [MN_TYPE, BE_TYPE, FE_TYPE],
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
    projectDemos: ''
}
/**
 * Saves states of gfile generation
 *
 * @async
 * @param {String} file
 * @returns {Promise<Object>}
 */
/**
 * Reads the content of a file and updates the file state.
 *
 * @param {File} file - The file to be read.
 * @returns {Promise<string>} A promise that resolves with the file content as a string.
 * @throws Will throw an error if the file reading fails.
 */
export const readFileState = async (file) => {
    try {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = (error) => {
                reject(error);
            };
            state.fileState.empty = true;
            reader.readAsText(file);
            state.fileState.empty = false;
            state.fileState.loading = true;

            reader.onloadend = (event) => {

                state.fileState.loading = false;
                state.fileState.done = true;
                resolve(event.target.result);
            };
        });
    } catch (err) {
        throw err;
    }
};
/**
 * Returns fileCOntents if successfull
 *
 * @async
 * @param { Object } options
 * @returns {Array || String}
 */
/**
 * Asynchronously generates a file from an array of data based on the provided options.
 *
 * @param {Object} options - The options for file generation.
 * @param {Array} options.array - The array of data to be converted into a file.
 * @param {string} options.fileName - The name of the file to be generated.
 * @param {string} options.fileType - The type of the file to be generated (must be in EXPORT_WHITELIST).
 * @returns {Promise<Array>} A promise that resolves to an array containing any errors and a generated message.
 * @throws {Error} Throws an error if the array is missing or if an unexpected error occurs.
 */
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
                const contentXML = await isXML(content);
                if(!contentXML) return;
                textType = {
                    type: `${XML_TYPE}; ${DEFAULT_ENCODING}`
                }
                break;
            case EXPORT_WHITELIST[1]:
                content = toJSON(array)
                const contentJSON = await isJSON(content);
                if(contentJSON) {
                textType = {
                    type: `${JSON_TYPE}; ${DEFAULT_ENCODING}`
                }
            }
                break;
            case EXPORT_WHITELIST[2]:
                content = toCsv(array);
                const contentCSV = await isCSV(content);
                if(contentCSV === false) return;
                textType = {
                    type: `${CSV_TYPE}; ${DEFAULT_ENCODING}`
                }
                break;
            default:
        }
        const checkValsEmpty = Object.values(options).every(val => val.length !== 0)
        let generatedMessage;
        if (checkValsEmpty) {
            const blob = new Blob([String(content)], textType);
            await readFileState(blob)
            generatedMessage = await handleFileGeneration(blob);
            errors.length > 0 || generatedMessage.includes(UNGENERATED_FILE_MESSAGE) ? false : saveAs(blob, options.fileName);
        }
        return [errors, generatedMessage];
    } catch (err) {
        throw err;
    }
}
/**
 * Filter function for skills based on param,va;ue Object properties.
 *
 * @param {Object} options
 * @returns {Array<Object>}
 */
export const filterSkills = function(options) {
    let value;
    const {array, keys, values} = options;
    const copiedArray = [...array];
    value = values.map(el => el === 0 ? '' : el);

    const filteredData = filterByKeys(copiedArray, keys, value);
    state.skills.filteredSkills = filteredData;

    return filteredData;
}
/**
 * Sorts the skills based on the provided options.
 *
 * @param {Object} options - The sorting options.
 * @param {string} options.sortBy - The property to sort by. Can be 'expertise', 'name', or 'category'.
 * @param {string} options.order - The order of sorting. Can be 'asc' for ascending or 'desc' for descending.
 * @returns {Array} The sorted array of skills.
 */
export const sortingSkills = function(options) {
    let {sortBy, order } = options;
    let array
    const skills = state.skills
   skills.filteredSkills ? array = skills.filteredSkills : array = skills;
    const sortFunctions = {
        expertise: (a, b) => order === 'asc' ? a.levelNumber - b.levelNumber : b.levelNumber - a.levelNumber,
        name: (a, b) => order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
        category: (a, b) => order === 'asc' ? a.category.localCompare(b.category) : b.category.localCompare(a.category)
    };
    return [...array].sort(sortFunctions[sortBy]);
}
/**
 * Return state.Project where url and img String are specified
 *
 * @param {{}} [array=state.projects]
 */
/**
 * Retrieves project demos from the provided array or the default state.projects array.
 * Filters projects that have non-empty imgPath and url properties.
 * Updates the state.projectDemos with the filtered demos.
 *
 * @param {Array} [array=state.projects] - The array of projects to filter.
 * @returns {void}
 */
export const getProjectDemos = (array = state.projects) => {
    const demos = array.reduce((acc, cur) => {
        if (cur.imgPath.trim().length > 0 && cur.url.trim().length > 0)
            acc[acc.length] = cur
        return acc;
    }, [])
    state.projectDemos = demos
}
/**
 * Description placeholder
 *
 * @param {Array} array
 * @param {number} [currentPage=state.curPage]
 * @param {number} [itemsPerPage=state.perPage]
 * @returns {{ currentPage: number; data: Array; pages: number; perPage: number; }}
 */
/**
 * Loads more items from the given array based on the current page and items per page.
 *
 * @param {Array} array - The array of items to paginate.
 * @param {number} [currentPage=state.curPage] - The current page number.
 * @param {number} [itemsPerPage=state.perPage] - The number of items per page.
 * @returns {Object} An object containing the current page, the sliced data, the total number of pages, and the items per page.
 * @property {number} currentPage - The current page number.
 * @property {Array} data - The sliced array of items for the current page.
 * @property {number} pages - The total number of pages.
 * @property {number} perPage - The number of items per page.
 */
export const loadMore = function(array, currentPage = state.curPage, itemsPerPage = state.perPage) {
    const start = 0;
    const end = currentPage * itemsPerPage;
    return {
        currentPage: currentPage,
        data: array.slice(start, end),
        pages: Math.ceil(array.length / itemsPerPage),
        perPage: itemsPerPage
    }
}