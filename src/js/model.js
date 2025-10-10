import {toXml, toCsv, toJSON, handleFileGeneration, filterByKeys, isXML, isCSV, isJSON, sortFunctions} from './helpers.js';
import {saveAs} from './lib.js';
import {CURRENT_PAGE, RES_PER_PAGE_TRESHOLD} from './config.js'
export const state = {
    search:{
        skills:[],
        tools:[],
        certs:[],
        isFiltered: false,
        isFilteredByTool:false
    },
    fileState: {
        empty: false,
        loading: false,
        done: false
    },
    curPage: CURRENT_PAGE,
    perPage: RES_PER_PAGE_TRESHOLD
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
/**
 * Formats date fields in an array of objects to relative time strings (e.g., "2 days ago").
 *
 * @param {Array<Object>} array - The array of objects containing date fields to format.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {string} [options.format] - Optional date format string for parsing dates with moment.js.
 * @uses copyArray from helpers
 * @returns {void} The function updates `state.extractedData.certifications.dateRelatives` with the formatted array.
 */
export const formatDatesRelative = function (array, options = {}) {
  if (!Array.isArray(array)) return [];

  const { format } = options;
  const copiedArray = copyArray(array);
  const rowIds = getDatesIndexes(copiedArray);

  const absoluteDaysArray = copiedArray.map(item => {
    const newItem = { ...item }; // avoid mutating original

    rowIds.forEach(idx => {
      const key = Object.keys(item)[idx];
      const value = item[key];

      if (!value) return;

      const formattedDate = format
        ? moment(value, format, true).fromNow()
        : moment(value).fromNow();

      newItem[key] = formattedDate;
    });

    return newItem;
  });

  state.extractedData.certifications.dateRelatives = absoluteDaysArray;
};
/**
 * Get the minimum and maximum dates from an array of objects
 * based on a specified key.
 *
 * Uses `moment.js` for parsing and comparison, and formats
 * the result using localized date format (`L`).
 *
 * @function getMinMaxDates
 * @param {Array<Object>} array - The input array containing date entries.
 * @param {string} key - The key to look for in each mapped entry.
 * @returns {{min: string|null, max: string|null}} An object containing:
 * - `min`: The earliest date (formatted with `moment.format("L")`) or `null` if no valid dates.
 * - `max`: The latest date (formatted with `moment.format("L")`) or `null` if no valid dates.
 *
 * @example
 * const data = [
 *   { key: "date_obtained", value: "2024-01-10" },
 *   { key: "date_obtained", value: "2024-03-22" },
 *   { key: "date_obtained", value: "2024-02-05" }
 * ];
 *
 * const result = getMinMaxDates(data, "date_obtained");
 * // result = { min: "01/10/2024", max: "03/22/2024" } (localized format)
 */
export const getMinMaxDates = function (array, key) {
  // Extract values for the given key
  const dateValues = mapDatesEntries(array)
    .reduce((acc, cur) => {
      if (cur.key === key) acc.push(cur.value);
      return acc;
    }, [])
    // Parse directly with moment
    .map(date => moment(date));
  if (dateValues.length === 0) {
    return { min: null, max: null };
  }
  // Use moment.min and moment.max
  const minDate = moment.min(dateValues);
  const maxDate = moment.max(dateValues);
  return {
    min: minDate.toDate(),
    max: maxDate.toDate()
  };
};
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