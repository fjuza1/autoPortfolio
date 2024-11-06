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
    _removeOutlineError(){
        const allFormErrors = document.querySelectorAll(`div[data-formerror]`)
        allFormErrors.forEach(dom => {

            dom.textContent = '';
            const errorOutline = document.getElementById(dom.dataset.formerror)
            console.log("🚀 ~ SkillsExportView ~ _removeOutlineError ~ errorOutline:", errorOutline)
            if(!errorOutline) return
        })
    }
    _outlineError(options) {
        const { type, message} = options
        const dom  = document.querySelector(`div[data-formerror="${type}"]`)
        dom.textContent = message;
        const selectedType = document.getElementById(type)
        selectedType.style.outline = 'none'
        selectedType.style.outline = '2px solid red'
    }
    export(options){
        this._removeOutlineError();
        this._formData = options
        const fileErrors = toFile(options)
        const fileType = fileErrors.find(err=>err.type === 'fileType')
        const fileName = fileErrors.find(err=>err.type === 'fileName')
        if(fileType) this._outlineError({type: fileType.type,message:fileType.message})
            else if (!fileType) this._outlineError({type: fileName.type,message:fileName.message})
    }
}
export default new SkillsExportView();