import View from './View.js';
import {emailValidator, createCaptcha} from '../lib.js';
import {sendMail} from '../helpers.js';
class ContactView extends View {
    _parentElement = document.getElementById('contactForm')
    _getRequiredFields (){
        [...this._parentElement]
        .map(reqField => reqField.classList.contains('required'))
    }
    _isRobot(){}
    _sendMail(options){
        const {name, email, subject, message} = options
    }
}
export default new ContactView();