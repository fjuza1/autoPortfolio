import { min } from 'moment';
import {EXPERT_LEVEL, EXPERT_NUM, CATEGORIES, EXPORT_WHITELIST, PROJECT_NAME, PROJECT_ORDER_NUM, PROJECT_DESCRIPTOR, JSON_TYPE, XML_TYPE, CSV_TYPE,
	DEFAULT_ENCODING, ERROR_MISSING_FILENAME, ERROR_SUPPORTED_FILE_TYPES, UNGENERATED_FILE_MESSAGE, RES_PER_PAGE_TRESHOLD, CURRENT_PAGE, DEV_TYPE, FE_TYPE, BE_TYPE,
	MN_TYPE, URL_CY_DEMO, URL_PORTFOLIO_DEMO, IMGS, IMGS_TINY
} from './config.js';
import {toXml, toCsv, toJSON, handleFileGeneration, filterByKeys, isXML, isCSV, isJSON, sortFunctions, copyArray, getDatesIndexes} from './helpers.js';
import {saveAs, moment} from './lib.js';
export const state = {
    search:{
        skills:[],
        tools:[],
        certs:[],
        isFiltered: false,
        isFilteredByTool:false
    },
    extractedData: {
        certifications: {
            minDate: null,
            maxDate: null,
            dateRelatives: []
        },
    },
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
        category: CATEGORIES[0],
        imgPath: IMGS.POSTMAN,
        description: 'Postman is a popular API testing tool that allows developers to send requests to APIs and receive responses. It provides a user-friendly interface for creating and managing API requests, making it easier to test and debug APIs during development.'
    }, {
        name: 'JavaScript',
        level: EXPERT_LEVEL[4],
        levelNumber: EXPERT_NUM[4],
        category: CATEGORIES[2],
        imgPath: IMGS.BLANKPIC,
        description:null
    }, {
        name: 'HTML',
        level: EXPERT_LEVEL[3],
        levelNumber: EXPERT_NUM[3],
        category: CATEGORIES[2],
        imgPath: IMGS.BLANKPIC,
        description:null
    }, {
        name: 'XML',
        level: EXPERT_LEVEL[3],
        levelNumber: EXPERT_NUM[3],
        category: CATEGORIES[2],
        imgPath: IMGS.BLANKPIC,
        description:null
    }, {
        name: 'SQL',
        level: EXPERT_LEVEL[3],
        levelNumber: EXPERT_NUM[3],
        category: CATEGORIES[2],
        imgPath: IMGS.BLANKPIC,
        description:null
    }, {
        name: 'Cypress',
        level: EXPERT_LEVEL[2],
        levelNumber: EXPERT_NUM[2],
        category: CATEGORIES[0],
        imgPath: IMGS.CYPRESS_LOGO,
        description: 'Cypress is a popular end-to-end testing framework for modern web applications.'
    },
    {
        name:"Katalon Studio",
        level: EXPERT_LEVEL[1],
        levelNumber: EXPERT_NUM[1],
        category: CATEGORIES[0],
        imgPath: IMGS.IMG_KATALON_STUDIO,
        description: 'Katalon Studio is an all-in-one test automation solution for web, API, mobile, and desktop applications. It provides a user-friendly interface and supports both manual and automated testing, making it suitable for teams of all sizes.'
    },
    {
        name: 'SoapUI',
        level: EXPERT_LEVEL[1],
        levelNumber: EXPERT_NUM[1],
        category: CATEGORIES[0],
        imgPath: IMGS.SOAPUI,
        description: 'SoapUI is an open-source API testing tool that allows developers to test SOAP and RESTful web services. It provides a user-friendly interface for creating and executing test cases, making it easier to validate the functionality and performance of APIs.'
    }, {
        name: 'Azure DevOps Server',
        level: EXPERT_LEVEL[3],
        levelNumber: EXPERT_NUM[3],
        category: CATEGORIES[0],
        imgPath: IMGS.AZURE_LOGO,
        description: 'Azure DevOps Server is a set of development tools and services provided by Microsoft for software development teams. It includes features for version control, project management, continuous integration, and deployment, making it easier to collaborate and deliver software projects.'
    }, {
        name: 'TFS',
        level: EXPERT_LEVEL[3],
        levelNumber: EXPERT_NUM[3],
        category: CATEGORIES[0],
        imgPath: IMGS.TFS,
        description: 'TFS (Team Foundation Server) is a Microsoft product that provides source control, bug control, project management, and build automation for software development teams. It helps teams collaborate on code development and manage the entire software development lifecycle.'
    }, {
        name: 'Microsoft Visual Studio Code',
        level: EXPERT_LEVEL[3],
        levelNumber: EXPERT_NUM[3],
        category: CATEGORIES[0],
        imgPath: IMGS.MS_VISUAL_LOGO,
        description: 'Microsoft Visual Studio Code is a lightweight and powerful code editor that supports multiple programming languages. It provides features like syntax highlighting, debugging, and extensions, making it a popular choice for developers.'
    }, {
        name: 'Microsoft SQL Servers Studio',
        level: EXPERT_LEVEL[2],
        levelNumber: EXPERT_NUM[2],
        category: CATEGORIES[0],
        imgPath: IMGS.MSSQL_IDE_LOGO,
        description: 'Microsoft SQL Servers Studio is a powerful tool for managing and developing SQL Server databases. It provides features like query execution, database management, and object modeling, making it a popular choice for developers.'
    }, {
        name: 'UML - Unified Modeling Language',
        level: EXPERT_LEVEL[2],
        levelNumber: EXPERT_NUM[2],
        category: CATEGORIES[2],
        imgPath: IMGS.BLANKPIC,
        description:null
    }, {
        name: 'Enterprise Architect',
        level: EXPERT_LEVEL[3],
        levelNumber: EXPERT_NUM[3],
        category: CATEGORIES[0],
        imgPath: IMGS.BLANKPIC,
        description:"Enterprise Architect is a modeling and design tool that supports UML and other modeling languages. It provides features for creating and managing models, making it easier to visualize and communicate software designs."
    }, {
        name: 'Select Architect',
        level: EXPERT_LEVEL[3],
        levelNumber: EXPERT_NUM[3],
        category: CATEGORIES[0],
        imgPath: IMGS.BLANKPIC,
        description:"Select Architect is a modeling and design tool that supports UML and other modeling languages. It provides features for creating and managing models, making it easier to visualize and communicate software designs."
    }, {
        name: 'Eclipse IDE for Java Developers',
        level: EXPERT_LEVEL[3],
        levelNumber: EXPERT_NUM[3],
        category: CATEGORIES[0],
        imgPath: IMGS.ECLIPSE_IDE_LOGO,
        description: 'Eclipse IDE for Java Developers is a popular open-source Java IDE that supports Java development. It provides features like syntax highlighting, debugging, and code completion, making it a popular choice for developers.'
    }, {
        name: 'CI/CD pipeline',
        level: EXPERT_LEVEL[1],
        levelNumber: EXPERT_NUM[1],
        category: CATEGORIES[3],
        imgPath: IMGS.BLANKPIC,
        description:null
    },
    {
        name: 'PowerApps',
        level: EXPERT_LEVEL[1],
        levelNumber: EXPERT_NUM[1],
        category: CATEGORIES[0],
        imgPath: IMGS.BLANKPIC,
        description:null
    },
    {
        name: 'PowerAutomate',
        level: EXPERT_LEVEL[1],
        levelNumber: EXPERT_NUM[1],
        category: CATEGORIES[3],
        imgPath: IMGS.BLANKPIC,
        description:null
    },
    {
        name: 'SharePoint',
        level: EXPERT_LEVEL[1],
        levelNumber: EXPERT_NUM[1],
        category: CATEGORIES[0],
        imgPath: IMGS.BLANKPIC,
        description:null
    },
    {
        name: 'Typescript',
        level: EXPERT_LEVEL[1],
        levelNumber: EXPERT_NUM[1],
        category: CATEGORIES[2],
        imgPath: IMGS.BLANKPIC,
        description:null
    }
],
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
        {year:'2025', content:'Gained ISTQB Foundation Level 4.0 certification on 14.2.2025.'},
        {year:'2025', content:'Started learning Typescript in July.'},
        {year:'2025', content:'Finished learning Typescript in July.'},
        {year:'2025', content:'Started learning for pl-900 in mid July.'}
    ],
    projects: [{
            name: PROJECT_NAME[0],
            levelNumber: PROJECT_ORDER_NUM[0],
            description: PROJECT_DESCRIPTOR[0],
            types: [MN_TYPE],
            url: null,
            imgPath: IMGS.BLANKPIC
        },
        {
            name: PROJECT_NAME[1],
            levelNumber: PROJECT_ORDER_NUM[1],
            description: PROJECT_DESCRIPTOR[1],
            types: [MN_TYPE, BE_TYPE],
            url: null,
            imgPath: IMGS.BLANKPIC
        },
        {
            name: PROJECT_NAME[2],
            levelNumber: PROJECT_ORDER_NUM[2],
            description: PROJECT_DESCRIPTOR[2],
            types: [MN_TYPE],
            url: null,
            imgPath: IMGS.BLANKPIC
        },
        {
            name: PROJECT_NAME[3],
            levelNumber: PROJECT_ORDER_NUM[3],
            description: PROJECT_DESCRIPTOR[3],
            types: [MN_TYPE],
            url: null,
            imgPath: IMGS.BLANKPIC
        },
        {
            name: PROJECT_NAME[4],
            levelNumber: PROJECT_ORDER_NUM[4],
            description: PROJECT_DESCRIPTOR[4],
            types: [MN_TYPE, BE_TYPE, FE_TYPE],
            url: null,
            imgPath: IMGS.BLANKPIC
        },
        {
            name: PROJECT_NAME[5],
            levelNumber: PROJECT_ORDER_NUM[5],
            description: PROJECT_DESCRIPTOR[5],
            types: [MN_TYPE, FE_TYPE],
            url: null,
            imgPath: IMGS.BLANKPIC
        },
        {
            name: PROJECT_NAME[7],
            levelNumber: PROJECT_ORDER_NUM[7],
            description: PROJECT_DESCRIPTOR[7],
            types: [FE_TYPE],
            url: URL_CY_DEMO,
            imgPath: IMGS.IMG_CY_DEMO
        },
        {
            name: PROJECT_NAME[6],
            levelNumber: PROJECT_ORDER_NUM[6],
            description: PROJECT_DESCRIPTOR[6],
            types: [DEV_TYPE, FE_TYPE],
            url: URL_PORTFOLIO_DEMO,
            imgPath: IMGS.IMG_PORTFOLIO_DEMO
        },
        {
            name: PROJECT_NAME[8],
            levelNumber: PROJECT_ORDER_NUM[8],
            description: PROJECT_DESCRIPTOR[8],
            types: [DEV_TYPE],
            imgPath: IMGS.BLANKPIC
        }
    ],
    certifications: [{
            platform: 'Udemy',
            title: 'The Complete JavaScript Course 2024: From Zero to Expert!',
            instructor: 'Jonas Schmedtmann',
            date_obtained: '2024-04-24',
            cert_url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-bcd5477c-43d2-43fd-83b8-6503badfde16.pdf',
            length: '68.5 hours'
        },
        {
            platform: 'Udemy',
            title: 'POSTMAN API Testing - Step - by Step for Beginners',
            instructor: 'Raghav Pal',
            date_obtained: '2022-01-20',
            cert_url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-c4445c82-aee0-4c01-a6b9-f8fe28b90ea7.pdf',
            length: '2.5 hours'
        },
        {
            platform: 'Udemy',
            title: 'Microsoft SQL for Beginners',
            instructor: 'Brewster Knowlton',
            date_obtained: '2021-08-24',
            cert_url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-a7110719-34e3-4b36-b258-1910e596fc95.pdf',
            length: '4 hours'
        },
        {
            platform: 'Udemy',
            title: 'ISTQB Foundation Level preparation course+1000quiz examples',
            instructor: ' Mark Shrike, Victoria N',
            date_obtained: '2024-10-19',
            cert_url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-88d958e9-bd39-4856-b260-0571b0ee4860.pdf',
            length: '14.5 hours'
        },
        {
            platform: 'ISTQB',
            title: 'ISTQB Foundation Level 4.0',
            instructor: 'ISTQB - CASQB',
            date_obtained: '2025-02-14',
            cert_url: 'https://drive.google.com/file/d/1Kac1H4RFHsW_r9uBgvW2fI2hlZbXV2kq/view?usp=sharing',
            length: '1 hour 15 minutes'
        }
    ]
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

      // Reset state before starting
      state.fileState.empty = false;
      state.fileState.loading = false;
      state.fileState.done = false;

      reader.onerror = (error) => {
        state.fileState.loading = false;
        reject(error);
      };

      reader.onloadstart = () => {
        state.fileState.empty = false;   // we *do* have a file
        state.fileState.loading = true;
        state.fileState.done = false;
      };

      reader.onprogress = () => {
        state.fileState.loading = true;
      };

      reader.onloadend = (event) => {
        state.fileState.loading = false;
        state.fileState.done = true;
        resolve(event.target.result);
      };

      reader.readAsText(file);
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
//Filtering fctions
export const filterSkills = function(options) {
    let value;
    const {array, keys, values} = options;
    const copiedArray = [...array];
    value = values.map(el => el === 0 ? '' : el);

    const filteredData = filterByKeys(copiedArray, keys, value);
    state.search.skills = filteredData;
    state.search.isFiltered = true;
    return filteredData;
}
/**
 * Filters and sorts tools from the state based on the provided exclusion options.
 *
 * @param {Object} [excludeOptions={}] - Options to exclude certain tools.
 * @param {boolean} [excludeOptions.name] - Whether to exclude tools by name.
 * @param {string[]} [excludeOptions.values] - Array of tool names to exclude.
 * @returns {Object[]} Sorted array of filtered tools.
 * @throws {Error} If `name` is provided and is not a boolean.
 * @throws {Error} If `values` is provided and is not an array.
 */
export const filterTools = function(excludeOptions = {}) {
    const {name,values} = excludeOptions;
    if(name && typeof name !== 'boolean') throw new Error('Invalid parameter type. Expected boolean.');
    if(values && !Array.isArray(values)) throw new Error('Invalid parameter type. Expected array.')
    const allTools = state.skills.filter(el => {
        if (name && values && values.length > 0) {
            return el.category === CATEGORIES[0] && !values.some(value => el.name === value);
        }
        return el.category === CATEGORIES[0]
    });
    state.search.tools = allTools.sort((a, b) => a.name.localeCompare(b.name));
}
export const filterCerts = function(options) {
    let value;
    const {array, keys, values} = options;
    const copiedArray = [...array];
    if(values.toLowerCase() === 'all') {
        state.search.isFilteredByTool = false;
        state.search.certs = [];
    } else {
    const filteredData = filterByKeys(copiedArray, keys, value);
    state.certifications = filteredData;
    }
}
export const formatDatesRelative = function(array, options = {}) {
    const {format} = options;
    const copiedArray = copyArray(array);
    const rowIds = getDatesIndexes(copiedArray);
    const absoluteDaysArray  =  copiedArray?.map((mnt) => {
        // Find the index of the property that looks like a date (format not assumed)
        //const rowId = Object.values(mnt).findIndex(val => val.split('-').length === 3);
        // Extract the original date string using the index
        const currentRow = Object.values(mnt)[rowIds];
        // Get the corresponding key name (e.g., "date_obtained")
        const keyIndex = Object.keys(mnt)[rowIds];
        // Replace the original date string with its relative time representation
        const formatedDate = format ? moment(currentRow, format, true).fromNow() : moment(currentRow, true).fromNow();
        mnt[keyIndex] = formatedDate;
        return mnt; // must return inside map
    });
    state.extractedData.certifications.dateRelatives = absoluteDaysArray;
}
//console.log(filterTools({name: true, values: NONQATOOLS}));
/**
 * Sorts the skills based on the provided options.
 *
 * @param {Object} options - The sorting options.
 * @param {string} options.sortBy - The property to sort by. Can be 'expertise', 'name', or 'category'.
 * @param {string} options.order - The order of sorting. Can be 'asc' for ascending or 'desc' for descending.
 * @returns {Array} The sorted array of skills.
 */
export const sortingSkills = function(options) {
    let {sortBy, order, array } = options;
    const skills = state.skills
    Array.isArray(state.search.skills) && state.search.isFiltered? array = state.search.skills : array = skills;
    state.search.skills = sortFunctions({sortBy, order, array });
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
        if (cur.imgPath && cur.imgPath.trim().length > 0 && (cur.url && cur.url.trim().length > 0))
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