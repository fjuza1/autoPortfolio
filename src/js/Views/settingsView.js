import {DEFAULTOPTIONS} from '../config.js'
import View from './View.js';
export default class SettingsView extends View {
	_form = document.getElementById('settingsForm');
	_themeToggle = document.getElementById('darkModeSwitch');
	_html = document.querySelector('html');
	_sections = document.querySelectorAll('.section');
	_nav = document.querySelector('.nav');
	_firstSection = document.querySelector("#Home");
	_selectedBTN = document.querySelector("#settingsForm > div > div.d-flex.justify-content-end > button");
    _offcanvas = document.querySelector('.offcanvas');
	_resetSettings() {
		this._formData = {};
		this._savePreferences(this._formData)
	};
	_getSettings = () => {
		const settings = localStorage.getItem('settings');

		// nothing stored → return empty object
		if (!settings || settings === "undefined") {
			this._settings = {}
		}

		try {
			this._settings = JSON.parse(settings);
		} catch (e) {
			console.error("Invalid JSON in localStorage for 'settings':", settings, e);
			this._settings = {};
		}
	}
	_savePreferences(preferences = this._formData) {
		if (!preferences || typeof preferences !== "object") {
			preferences = DEFAULTOPTIONS;
		}
		localStorage.setItem('settings', JSON.stringify(preferences));
	}
	_getPreferences() {
		this._getSettings()
		const settings = this._settings;
		if (!settings) return {};
		if (settings !== undefined && settings !== null) {
			const parsedSettings = JSON.parse(JSON.stringify(settings));
			this._formData = parsedSettings;
			this._form.querySelectorAll('input, textarea, select').forEach(input => {
				if (input.type === 'checkbox') {
					input.checked = parsedSettings[input.name];
				} else {
					input.value = parsedSettings[input.name] || '';
				}
			});
		} else {
			this._formData = {};
		}
	}
}