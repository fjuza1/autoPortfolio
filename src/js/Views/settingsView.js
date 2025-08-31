import {KEYDOWN_TYPE, SECTION_HIDDEN_CLASS, LOAD_TYPE, RESET_TYPE} from '../config.js';
import {removeClass, gotoSegment, removeClass, changeHash, removeHash,  objectToCSSClasses} from '../helpers.js';
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
			return {};
		}

		try {
			return JSON.parse(settings);
		} catch (e) {
			console.error("Invalid JSON in localStorage for 'settings':", settings, e);
			return {};
		}
	}
	_savePreferences(preferences = this._formData) {
		if (!preferences || typeof preferences !== "object") {
			preferences = {};
		}
		localStorage.setItem('settings', JSON.stringify(preferences));
	}
	_getPreferences(e) {
		const settings = this._getSettings();
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
	// addHandleClickTheme() {
	// 	this._themeToggle.addEventListener('click', () => {
	// 		let settings = this._getSettings();
	// 		const darkMode = settings.darkMode === "on";
	// 		settings.darkMode = darkMode ? "off" : "on";
	// 		localStorage.setItem('settings', JSON.stringify(settings));
	// 		this._updateTheme();
	// 	});
	// }
	#navigateByKey(e) {
		const target = e.target;
		if (e.type === KEYDOWN_TYPE) {
			const home = this._firstSection
			const about = this._sections[0];
			const journey = this._sections[1]
			const skills = this._sections[2];
			const projects = this._sections[3];
			const QAToolbox = this._sections[4];
			const contact = this._sections[5];
			if (e.altKey) {
				switch (e.key.toLowerCase()) {
					case 'h':
						removeClass(home, SECTION_HIDDEN_CLASS);
						gotoSegment(home, this._nav)
						removeHash();
						break;
					case 'a':
						removeClass(about, SECTION_HIDDEN_CLASS);
						gotoSegment(about, this._nav)
						changeHash(about);
						break;
					case 'j':
						removeClass(journey, SECTION_HIDDEN_CLASS);
						gotoSegment(journey, this._nav);
						changeHash(journey);
						break
					case 's':
						removeClass(skills, SECTION_HIDDEN_CLASS);
						gotoSegment(skills, this._nav)
						changeHash(skills);
						break;
					case 'p':
						removeClass(projects, SECTION_HIDDEN_CLASS);
						gotoSegment(projects, this._nav);
						changeHash(projects);
						break;
					case 'c':
						removeClass(contact, SECTION_HIDDEN_CLASS);
						gotoSegment(contact, this._nav);
						changeHash(contact);
						break;
					case 'q':
						removeClass(QAToolbox, SECTION_HIDDEN_CLASS);
						gotoSegment(QAToolbox, this._nav);
						changeHash(QAToolbox);
						break;
					default:
						break;
				}
			}
		}
	}
	addHandlerNavigateByKey() {
		document.addEventListener(KEYDOWN_TYPE, this.#navigateByKey.bind(this));
	}
}