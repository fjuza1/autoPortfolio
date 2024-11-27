import View from './View.js';
import {sendMail, validateEmail} from '../helpers.js';
class ContactView extends View {
	_parentElement = document.getElementById('contactForm')
	_isRobot() {}
	_getRequiredFields() {
		return [...this._getFields()]
			.filter(reqField => {
				if (!reqField) return
				if (reqField.classList.contains('required')) return reqField;
			});
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
			name: 'Please enter a valid email',
			type: 'email',
		}));
	}

	_sendMail(fields) {
		const { name, email, subject, message } = fields
	}
}
export default new ContactView();