import View from './View.js';
import {sendMail, validateEmail} from '../helpers.js';
class ContactView extends View {
	_parentElement = document.getElementById('contactForm')
	_form = this._parentElement;
	constructor(){
		super();
		this._errorRemoveEvent()
	}
	_isRobot() {}
	_getRequiredFields() {
		const emptyReqFields = [...this._getFields()]
			.filter(reqField => {
				if (!reqField) return false
				if (reqField.classList.contains('required') && reqField.value.trim().length < 1) return reqField;
                return false;
			});
            return emptyReqFields.map(field=> ({
                name: `Please fill in the required field: ${field.id}`,
                type: `${field.tagName.toLowerCase()} required`,
				id:field.id
            }))
	}
	_getValidityEmailField() {
		const invalidEmailFields = [...this._getFields()]
			.filter(emailField => {
				if (!emailField) return false;
				if (!emailField.classList.contains('email')) return false;
				if ( emailField.value.trim().length > 0) {
					return !validateEmail( emailField.value);
				}

				return false;
			});
		return invalidEmailFields.map(mail => ({
			name: 'Please enter valid email',
			type: 'email ',
			id:mail.id
		}));
	}
	_sendMail(fields) {
		const errors = [...this._getValidityEmailField() , ...this._getRequiredFields()]
		const { name, email, subject, message } = fields
		if(Array.isArray(errors) && (!errors || errors.length > 0)) this._renderErrorList(errors)
			else sendMail(name, email, subject, message)
	}
}
export default new ContactView();