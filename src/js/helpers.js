import {ANIMATIONTIME} from './config.js';
export const timeout = (callback) => setTimeout(callback, ANIMATIONTIME * 1000);
export const toXml = (string, id) => {
    const declare = {root: {$: {id: id}, _: string}};
    const builder = new xml2js.Builder();
    const content = builder.buildObject(declare);
    return content;
}
export const toCsv = (object, config) =>  Papa.unparse(object, config);
export const toJSON = (array) => JSON.stringify(array)