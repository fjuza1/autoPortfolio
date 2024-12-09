import View from './View.js';
import {sendMail, validateEmail, capitalizeWord, gotoSegment} from '../helpers.js';
import {EMAIL_SUCCESS_MESSAGE, EMAIL_FAILURE_MESSAGE} from '../config.js';
class ContactView extends View {
    _parentElement = document.getElementById('error-contact');
    _nav = document.querySelector('.nav')
    _form = document.getElementById('contactForm');
    _msg = EMAIL_SUCCESS_MESSAGE;
    _err = EMAIL_FAILURE_MESSAGE;
    constructor() {
        super();
        this._errorRemoveEvent()
    }
    _getRequiredFields() {
        const emptyReqFields = [...this._getFields()]
            .filter(reqField => {
                if (!reqField) return false
                if (reqField.classList.contains('required') && reqField.value.trim().length < 1) return reqField;
                return false;
            });
        return emptyReqFields.map(field => ({
            name: `Please fill in the required field: ${capitalizeWord (field.id)}`,
            type: `${field.tagName.toLowerCase()} required`,
            id: field.id
        }))
    }
    _getValidityEmailField() {
        const invalidEmailFields = [...this._getFields()]
            .filter(emailField => {
                if (!emailField) return false;
                if (!emailField.classList.contains('email')) return false;
                if (emailField.value.trim().length > 0) {
                    return !validateEmail(emailField.value);
                }

                return false;
            });
        return invalidEmailFields.map(mail => ({
            name: 'Please enter valid email',
            type: 'email ',
            id: mail.id
        }));
    }
    async _sendMail(fields) {
        const errors = [...this._getValidityEmailField(), ...this._getRequiredFields()]
        const { name, email, subject, message } = fields
        if (Array.isArray(errors) && (!errors || errors.length > 0)) {
            this._renderErrorList(errors)
            gotoSegment(this._parentElement, this._nav)
        } else if (errors.length === 0) {
            const mailSendState = await sendMail({
                name,
                email,
                subject,
                message
            })
            if (!mailSendState) this._renderError({
                close: true
            })
            else this._renderSuccessMessage({
                close: true,
                disposeTime: 3000
            })
            this._closeAlert();
        }
    }
}
export default new ContactView();
