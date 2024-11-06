import View from './View.js';
import { toFile }  from '../model.js';
class SkillsExportView extends View {
    _form = document.querySelector('.exportActivities');
    _parentElement = document.getElementById('exportModal')
    _fileType = document.querySelector('.content.d-none');
    constructor(){
        super();
        this._form.addEventListener('change', () => {
            this._revealExportContainer();
        });
    }
    _revealExportContainer(){
        if(this._fileType.classList.contains('d-none')) this._fileType.classList.remove('d-none');
    }
    export(options){
        this._formData = options
        const fileErrors = toFile(options)
        if(!fileErrors) return;
    }
}
export default new SkillsExportView();