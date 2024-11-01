import {ANIMATIONTIME} from './config.js';
import {xml2js, Papa} from './lib.js';
export const timeout = (callback) => setTimeout(callback, ANIMATIONTIME * 1000);
export const toXml = (array, id) => {
    const obj = {
        root: {
            skill: array
        }
    };
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(obj);
    return xml
}
export const toCsv = (object, config) =>  Papa.unparse(object, config);
export const toJSON = (array) => JSON.stringify(array, null, '\t')