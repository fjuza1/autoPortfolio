import View from './View.js';
import {Papa, xml2js} from '../lib.js';
import * as model  from '../model.js';
class SkillsExportView extends View {
    _form = document.getElementById('export');
    constructor(){
        super();
    }
    _revealExportContainer(){

    }
    // Add your export functionality here;
    exportToFile(fileErrors){
        this.fileErrors = fileErrors;
        if(fileErrors && fileErrors.length > 0) this._outlineErrors(this.fileErrors)
        // Implement your export functionality here
        // For example, you can use the FileSaver.js library to create a file
        // with the exported data
        //...
    }
}
export default new SkillsExportView();