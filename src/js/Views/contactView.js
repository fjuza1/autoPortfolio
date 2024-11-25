import View from './View.js';
import {emailValidator} from '../lib.js';
import {sendMail} from '../helpers.js';
class ContactView extends View {
    _parentElement = document.getElementById('contactForm')
    _isRobot(){}
    _getRequiredFields (){
        return [...this._getFields()]
       .filter(reqField => {
        if(!reqField) return
        if (reqField.classList.contains('required')) return reqField;
       });
    }
    _sendMail(fields){
        const {name, email, subject, message} = fields
    }
}
export default new ContactView();