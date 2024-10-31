import {TIMEOUT} from './config.js';
export const timeout = (callback)=>{
    setTimeout(callback, TIMEOUT);
}