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
    _outlineError(options) {
        const { type, message} = options
        const dom  = document.querySelector(`div[data-formerror="${type}"]`)
        dom.textContent = message
        console.log("🚀 ~ SkillsExportView ~ _outlineError ~ dom:", type)
       document.getElementById('fileType').style.outline = '2px solid red'
    }
    export(options){
        this._formData = options
        const fileErrors = toFile(options)
        const fileType = fileErrors.find(err=>err.type === 'fileType')
        if(fileType) this._outlineError({type: fileType.type,message:fileType.message})
    }
}
export default new SkillsExportView();