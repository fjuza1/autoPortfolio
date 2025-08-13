import { API_TIMEOUT_SEC, ANIMATIONTIME, SENDTO, UNGENERATED_FILE_MESSAGE} from './config.js';
import {xml2js, Papa, emailjs, EmailJSResponseStatus, xmlSanitizer, DOMPurify, moment} from './lib.js';
/**
 * Checks if is xml text
 *
 * @param {String} xml;
 * @return {boolean}
 */
export const isXML = async (xml) => {
    return new Promise((resolve) => {
        xml2js.parseString(xml, (err, result) => {
            if (err || !result) reject(false)
            else {
                resolve(true);
            }
        });
    });
}
/**
 * Checks if is CSV text
 *
 * @param {String} csv;
 * @return {boolean}
 */
export const isCSV = (csv) => {
    return new Promise((resolve) => {
        Papa.parse(csv, {
            complete: () => resolve(true),
            error: () => resolve(false)
        })
    });
};
/**
 * Checks if is JSON object
 *
 * @param {Object<Array>} json;
 * @return {boolean}
 */
export const isJSON = (json) => {
    return new Promise((resolve, reject) => {
        try {
            JSON.parse(json);
            resolve(true)
        } catch (err) {
            reject(false)
        }
    });
};
/**
 * Description placeholder
 *
 * @param {String} url
 * @returns {FileString}
 */
const setCustomTimeout = (callback, time) => setTimeout(callback, time);
/**
 * Executes a callback function after a custom timeout period.
 *
 * @param {Function} callback - The function to be executed after the timeout.
 */
export const timeout = (callback) => setCustomTimeout(callback, ANIMATIONTIME * 1000);

/**
 * Waits for a specified amount of time before executing a callback function.
 *
 * @param {Function} callback - The function to be executed after the wait time.
 * @param {number} time - The amount of time to wait before executing the callback, in milliseconds.
 */
export const wait = (callback, time) => setCustomTimeout(callback, time);

/**
 * Creates a promise that rejects after a specified timeout.
 *
 * @returns {Promise<never>} A promise that rejects with an error message after the specified timeout.
 */
export const timeoutAPI = () => {
    return new Promise((_, reject) => {
        setCustomTimeout(() => {
            reject(new Error(`API request timed out after ${API_TIMEOUT_SEC} seconds.`));
        }, API_TIMEOUT_SEC * 1000);
    });
};

// hash manip

/**
 * Changes the URL hash to the lowercase ID of the given element.
 *
 * @param {HTMLElement} element - The DOM element whose ID will be used to set the hash.
 */
export const changeHash = (element) => window.location.hash = element.id.toLowerCase();

/**
 * Removes the hash from the URL without reloading the page.
 * This function uses the History API to replace the current state
 * with a new state that has the same URL minus the hash.
 */
export const removeHash = () => window.history.replaceState(null, document.title, window.location.pathname + window.location.search);

/**
 * Makes an AJAX request to the specified URL.
 *
 * @param {string} url - The URL to which the request is sent.
 * @param {Object} [body] - The body of the request, if any. If provided, a POST request is made; otherwise, a GET request is made.
 * @returns {Promise<Object>} The response data as a JSON object.
 * @throws {Error} Throws an error if the response is not ok.
 */
export const AJAX = async (url, body = undefined) => {
    try {
        const fetchPro = body ?
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }) :
            fetch(url);
        const res = await fetchPro;
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
};
/**
 * Filters an array of objects based on specified keys and values.
 *
 * @param {Array<Object>} array - The array of objects to filter.
 * @param {Array<string>} keys - The keys to filter by.
 * @param {Array<string>} values - The values to filter by.
 * @returns {Array<Object>} The filtered array of objects.
 */
export const filterByKeys = (array, keys, values) => array.filter(item => keys.every((key, index) => String(item[key]).toLowerCase().includes(String(values[index]).toLowerCase())))
/**
 * Converts an array of skills into an XML string.
 *
 * @param {Array} array - The array of skills to be converted to XML.
 * @returns {string} The XML string representation of the skills.
 */
/**
 * Sanitizes the given XML string to prevent XML-related vulnerabilities.
 *
 * @param {string} xml - The XML string to be sanitized.
 * @returns {string} - The sanitized XML string.
 */
// sanitising
export const sanitizeXml = (xml) => xmlSanitizer(xml);
/**
 * Escapes HTML special characters in a string to their corresponding HTML entities.
 *
 * @param {string} str - The string to escape.
 * @returns {string} The escaped string with HTML entities.
 */
/**
 * Sanitizes the given HTML string to prevent XSS attacks.
 *
 * @param {string} html - The HTML string to sanitize.
 * @returns {string} - The sanitized HTML string.
 */
export const sanitizeHtml = (html = escapeHTML(html)) => DOMPurify.sanitize(html);

// To files fctions
export const toXml = (array) => {
    const obj = {
        root: {
            skills: {
                skill: array
            }
        }
    };
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(obj);
    return sanitizeXml(xml)
}
/**
 * Converts an array of objects into a CSV string using the PapaParse library.
 *
 * @param {Array} array - The array of objects to be converted to CSV.
 * @param {Object} [config] - Optional configuration object for PapaParse.
 * @returns {string} The CSV string representation of the input array.
 */
export const toCsv = (array, config) => Papa.unparse(array, config);
/**
 * Converts an array to a JSON string with tab indentation.
 *
 * @param {Array} array - The array to be converted to JSON.
 * @returns {string} The JSON string representation of the array.
 */
export const toJSON = (array) => JSON.stringify(array, null, '\t')
/**
 * Sends an email using the provided options.
 * 
 * @param {Object} options - The options for sending the email.
 * @param {string} options.name - The name of the recipient.
 * @param {string} options.email - The email address of the sender.
 * @param {string} options.subject - The subject of the email.
 * @param {string} options.message - The message content of the email.
 * @returns {Promise<Object>} The result of the email sending operation.
 * @throws {EmailJSResponseStatus} If there is an error in the email sending process.
 */
export const sendMail = async (options) => {
    try {
        const {
            name,
            email,
            subject,
            message
        } = options;
        const template = {
            to_name: name,
            subject: subject,
            message: message,
            reply_to: email,
            to_email: SENDTO,
        }
        const result = await emailjs.send(
            process.env.EMAIL_SERVICE_ID,
            process.env.EMAIL_TEMPLATE_ID,
            template,
            process.env.EMAIL_PUBLIC_KEY,
        )
        return result;
    } catch (err) {
        if (err instanceof EmailJSResponseStatus) throw err;
    }
}
/**
 * Handles the generation of a file from a Blob object.
 * 
 * @param {Blob} blob - The Blob object to be processed.
 * @returns {Promise<string>} - A promise that resolves to the decoded text content of the Blob.
 * @returns {Error} - Throws an error if the Blob cannot be processed.
 */
export const handleFileGeneration = async (blob) => {
    try {
        return new TextDecoder().decode(await blob.arrayBuffer())
    } catch (err) {
        return `${UNGENERATED_FILE_MESSAGE}\n Error details: \n${err}`;
    }
}
/**
 * Capitalizes the first letter of a given word.
 *
 * @function capitalizeWord
 * @param {string} word - The word to capitalize.
 * @returns {string} - The capitalized word.
 *
 * @example
 * capitalizeWord('hello') // returns 'Hello'
 * capitalizeWord('world') // returns 'World'
 */
export const capitalizeWord = word => word.charAt(0).toUpperCase() + word.slice(1, word.length)

export const gotoSegment = (domElement, nav) => {
    const targetSection = domElement.getBoundingClientRect();
    const navHeight = nav.offsetHeight;
    const sectionPositionTop = (targetSection.top + window.scrollY) - navHeight;
    const sectionPositionLeft = targetSection.left + window.scrollX;
    window.scrollTo({
        left: sectionPositionLeft,
        top: sectionPositionTop,
        behavior: 'smooth',
    })
}
export const gotoTop = () => window.scrollTo(0, 0)

export const removeClass = (element, className) => {
    if (element.classList.contains(className)) element.classList.remove(className)
}
/**
 * Validates if the given email is in a proper format.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
/**
 * Slowing execution of js functions
 *
 * @param {*} fn
 * @param {*} wait
 * @returns {(...args: {}) => void}
 */
/**
 * Creates a debounced function that delays invoking the provided function until after the specified wait time has elapsed since the last time the debounced function was invoked.
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {Function} - Returns the new debounced function.
 */
// timeouts
export const debounce = function(fn, wait) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), wait);
    };
}
export const resetTimeout = ({
    timeoutId,
    callback,
    duration
}) => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    return setTimeout(callback, duration * 1000); // Reset to the same timeout duration
}
export const objectToCSS = (obj) => {
    return Object.entries(obj).map(([key, value]) => `${key}: ${value}`).join('; ');
}
export const calcToastPosition = (position, HTMLElement) => {
    const rectWindow = !HTMLElement ? document.documentElement.getBoundingClientRect() : HTMLElement.getBoundingClientRect();;
    let screenCoords
    switch (position) {
        case 'top-center':
            screenCoords = {
                position: 'fixed',
                top: Math.abs(rectWindow.top),
                left: '50%',
                transform: 'translateX(-50%)'
            };
            break;
        case 'bottom-center':
            screenCoords = {
                position: 'fixed',
                bottom: rectWindow.bottom,
                left: '50%',
                transform: 'translateX(-50%)'
            };
            break;
        case 'top-start':
            screenCoords = {
                position: 'fixed',
                top: Math.abs(rectWindow.top),
                left: '0'
            };
            break;
        case 'bottom-start':
            screenCoords = {
                position: 'fixed',
                bottom: rectWindow.bottom,
                left: '0'
            };
            break;
        case 'top-end':
            screenCoords = {
                position: 'fixed',
                top: Math.abs(rectWindow.top),
                right: '0'
            };
            break;
        case 'bottom-end':
            screenCoords = {
                position: 'fixed',
                bottom: rectWindow.bottom,
                right: '0'
            }
            break;
        case 'middle-center':
            screenCoords = {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            };
            break;
        case 'middle-start':
            screenCoords = {
                position: 'fixed',
                top: '50%',
                left: '0',
                transform: 'translateY(-50%)'
            };
            break;
        case 'middle-end':
            screenCoords = {
                position: 'fixed',
                top: '50%',
                right: '0',
                transform: 'translateY(-50%)'
            };
            break;
        default:
            throw new Error('Invalid position');
    }
    return screenCoords;
}