import View from './View.js';
import { toFile }  from '../model.js';
class SkillsExportView extends View {
    _form = document.querySelector('.exportActivities');
    constructor(){
        super();
    }
    _revealExportContainer(){

    }
    // Add your export functionality here;
    async export(options){
        options = await toFile(options)
        const fileErrors = options
        if(!fileErrors) return;
        this.fileErrors = fileErrors;
        if(fileErrors && fileErrors.some(err=>err.message.toLowerCase().includes('type'))) this._outlineErrors(fileError.find(err=>err.message.toLowerCase().includes('type')))
        if(fileErrors && fileErrors.length > 0) this._outlineErrors(this.fileErrors);
		/*
		const blob = new Blob([String(options)], type);
		FileSaver.saveAs(blob, options.fileName);
		*/
    }
}
export default new SkillsExportView();