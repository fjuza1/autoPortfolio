import {DEFAULT_SETTINGS_OPTIONS} from '../config.js'
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
	_submitSettingsBTN = this._form.querySelector('button[type="submit"]');
	_resetSettingsBTN = this._form.querySelector('button[type="reset"]')
	_settingsChanged = false;
	_settingsExists = false;
	_resetSettings() {
		this._settingsExists = true
		this._formData = DEFAULT_SETTINGS_OPTIONS;
		this._savePreferences(this._formData)
	};
	#settingsChanged (){
		const originalSettingsSet = new Set(Object.values(DEFAULT_SETTINGS_OPTIONS ?? {}));
		const currentSettingsSet = new Set(Object.values(this._formData ?? {}))
		const settingsDifference = currentSettingsSet.difference(originalSettingsSet);
		this._settingsChanged = Object.values(settingsDifference).length > 0;
		console.log(this._settingsChanged);
	}
	_disableBTN() {
		this.#settingsChanged();
		if(this._settingsChanged){
			this._submitSettingsBTN.setAttribute('disabled', 'true');
			this._resetSettingsBTN.removeAttribute('disabled');
		} else{
			this._submitSettingsBTN.removeAttribute('disabled');
			this._resetSettingsBTN.setAttribute('disabled', 'false');
		}
	}
	_setSettingsExists() {
		if(!this._formData) {this._settingsExists = true}
		this._settingsExists = !this._formData
	}
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
		this._setSettingsExists();
	}
	_savePreferences(preferences = this._formData) {
		if (!preferences || typeof preferences !== "object") {
			preferences = DEFAULT_SETTINGS_OPTIONS;
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