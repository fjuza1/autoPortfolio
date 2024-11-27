import View from './View.js';
import {sendMail, validateEmail} from '../helpers.js';
class ContactView extends View {
	_parentElement = document.getElementById('contactForm')
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
			name: 'Please enter a valid email',
			type: 'email',
		}));
	}

	_sendMail(fields) {
		const { name, email, subject, message } = fields
	}
}
export default new ContactView();