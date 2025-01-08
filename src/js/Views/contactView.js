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
    /**
     * Retrieves required fields from the form.
     *
     * @returns {Array<Object>} An array of objects representing the required fields.
     * Each object contains the field's name, type, and id.
     * If no required fields are found, an empty array is returned.
     *
     * @private
     */
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

    /**
     * Flags in view if input val is email
     *
     * @returns {Boolean || Array<Object>}
     */
    _getValidityEmailField() {
        const invalidEmailFields = [...document.querySelectorAll('input')].filter(emailField => {
            if (!emailField.classList.contains('email')) return false;
            if (emailField.value.trim().length > 0) {
                return !validateEmail(emailField.value);
            }
            return false;
        });
        return invalidEmailFields.map(mail => ({
            name: 'Please enter valid email',
            type: 'email',
            id: mail.id
        }));
    }
    /**
     * Fct for sending mail using npm package
     *
     * @async
     * @param {*} fields
     * @returns {*}
     */
    async _sendMail(fields) {
        const errors = [...this._getValidityEmailField(), ...this._getRequiredFields()];
        if (errors.length > 0) {
            this._handleErrors(errors);
        } else if (errors.length === 0) {
            const mailSendState = await sendMail(fields);
            this._handleMailSendState(mailSendState);
        }
    }
    _handleErrors(errors) {
        this._renderErrorList(errors);
        gotoSegment(this._parentElement, this._nav);
    }
    _handleMailSendState(mailSendState) {
        if (!mailSendState) {
            this._renderError({ close: true });
        } else {
            this._renderSuccessMessage({ close: true, disposeTime: 3000 });
        }
        this._closeAlert();
    }
}
export default new ContactView();
