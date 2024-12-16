import { API_TIMEOUT_SEC, ANIMATIONTIME, SENDTO, ME_NAME ,UNGENERATED_FILE_MESSAGE} from './config.js';
import {xml2js, Papa, emailjs, EmailJSResponseStatus} from './lib.js';
/**
 * Checks if is xml text
 *
 * @param {String} xml;
 * @return {boolean}
 */
export const isXML = async (xml) => {
    return new Promise((resolve) => {
        xml2js.parseString(xml, (err, result) => {
            if (err) {
                resolve(false);
            }
            resolve(true);
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
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
};
/**
 * Description placeholder
 *
 * @param {String} url
 * @returns {FileString}
 */

export const timeout = (callback) => setTimeout(callback, ANIMATIONTIME * 1000);
export const wait = (callback, time) => {
    const expire = setTimeout(() => {
        callback();
    }, time);
    return expire;
};
/**
 * Description placeholder
 *
 * @returns {Promise<TIME>}
 */
export const timeoutAPI = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`API request timed out after ${API_TIMEOUT_SEC} seconds.`));
        }, API_TIMEOUT_SEC * 1000);
    });
}
export const changeHash = (element) => window.location.hash = element.id.toLowerCase();
export const removeHash = () => window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
/**
 * AJAX call
 *
 * @async
 * @param {*} url
 * @param {*} [body=undefined]
 * @returns {Promise<data>}
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
        const res = await Promise.race([fetchPro, timeoutAPI()])
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        throw error;
    }
};
/**
 * Description placeholder
 *
 * @param {*} array
 * @param {*} keys
 * @param {*} values
 * @returns {Array<string>}
 */
export const filterByKeys = (array,keys,values) => array.filter(item => keys.every((key, index) => String(item[key]).toLowerCase().includes(String(values[index]).toLowerCase())))
/**
 * Converts JSON into xml using xml2js npm pacjkage
 *
 * @param {*} array
 * @returns {xml}
 */
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
    return xml
}
/**
 * Description placeholder
 *
 * @param {*} array
 * @param {*} config
 * @returns {CSV}
 */
export const toCsv = (array, config) =>  Papa.unparse(array, config);
/**
 * Description placeholder
 *
 * @param {*} array
 * @returns {JSONArray}
 */
export const toJSON = (array) => JSON.stringify(array, null, '\t')
/**
 * Description placeholder
 *
 * @async
 * @param {Object} options
 * @returns {email}
 */
export const sendMail = async (options) => {
    try {
        const {name, email, subject, message} = options;
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
        if(err instanceof EmailJSResponseStatus) throw err;
    }
}
/**
 * Handling file generation states
 *
 * @async
 * @param {String} blob
 * @returns {Error || String}
 */
export const handleFileGeneration = async (blob) => {
    try {
        return new TextDecoder().decode(await blob.arrayBuffer())
    } catch (err) {
        return `${UNGENERATED_FILE_MESSAGE}\n Error details: \n${err}`;
    }
}
/**
 * Description placeholder
 *
 * @param {String} word
 * @returns {String}
 */
export const capitalizeWord = word => word.charAt(0).toUpperCase() + word.slice(1,word.length)
export const gotoSegment = (domElement, nav) => {
    const targetSection = domElement.getBoundingClientRect();
    const navHeight = nav.offsetHeight;
    const sectionPositionTop = (targetSection.top + window.pageYOffset) - navHeight;
    const sectionPositionLeft = targetSection.left + window.pageXOffset;
    window.scrollTo({
        left: sectionPositionLeft,
        top: sectionPositionTop,
        behavior: 'smooth',
    })
}
export const gotoTop = () => window.scrollTo(0,0)

export const removeClass = (element, className) => {
    if (element.classList.contains(className)) element.classList.remove(className)
}
/**
 * Description placeholder
 *
 * @param {String} email
 * @returns {boolean}
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
export const debounce = function(fn, wait) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), wait);
    };
}