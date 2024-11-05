import View from './View.js';
import sendMail from '../helpers.js';
class ContactView extends View {
    _isRobot(){}
    _sendMail(options){
        const {name, email, subject, message} = options
    }
}
export default new ContactView();