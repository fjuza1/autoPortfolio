import View from './View.js';
import { toFile }  from '../model.js';
class SkillsExportView extends View {
    _form = document.querySelector('.exportActivities');
    constructor(){
        super();
    }
    _revealExportContainer(){

    }
    export(options){
        this._formData = options
        const fileErrors = toFile(options)
        if(!fileErrors) return;
        this.fileErrors = fileErrors;
        if(fileErrors && fileErrors.some(err=>err.message.toLowerCase().includes('type')) && fileErrors.length === 1) this._outlineErrors(fileError.find(err=>err.message.toLowerCase().includes('type')))
        if(fileErrors && fileErrors.length > 0) this._outlineErrors(this.fileErrors);
    }
}
export default new SkillsExportView();