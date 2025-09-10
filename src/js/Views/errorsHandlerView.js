import {TOAST_DURATION} from '../config.js'
import SettingsView from "./settingsView";
class BrowserErrorsView extends SettingsView{
    _settings = {}
    constructor() {
        super();
        //this.settings = this._getSettings()
        this.#addHandlerLoadError();
    }
    #addHandlerLoadError() {
        this._getSettings()
        const settings = this._settings
        if(!settings.displayErrorsInView) return;
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