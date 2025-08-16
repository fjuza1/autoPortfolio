import {TOAST_DURATION} from '../config.js'
import View from './View.js'
class BrowserErrorsView extends View{
    constructor() {
        super();
        this.#addHandlerLoadError();
    }
    #addHandlerLoadError() {
    window.addEventListener('error', (ev) => {
        const errObj = ev?.error;
        const msg    = errObj?.message || ev?.message || 'Unknown error';
        const stack  = errObj?.stack || '';
        const at = stack.split('\n').find(line => line.trim().startsWith('at')) || '';
        this._renderToast({
        title: 'Error',
        msg: `Error: ${msg}\n${at}`, // <-- change to stackOut for full
        position: 'bottom-center',
        autohide: true,
        type: 'error'
        });
    });
    window.addEventListener('unhandledrejection', (ev) => {
        const r = ev?.reason;
        let msg   = '';
        let stack = '';

        if (r instanceof Error) {
        msg   = r.message;
        stack = r.stack || '';
        } else if (typeof r === 'string') {
        msg = r;
        } else {
        msg = JSON.stringify(r);
        }

        const firstAtLine = stack.split('\n').find(line => line.trim().startsWith('at')) || '';

        this._renderToast({
        title: 'Error',
        msg: `Error: ${msg}\n${firstAtLine}`,
        position: 'bottom-center',
        autohide: true,
        type: 'error'
        });
    });
    }
}
export default new BrowserErrorsView()