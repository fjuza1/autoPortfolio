import View from './View.js';
class SettingsView extends View {
    _form =  document.getElementById('settingsForm');
    _themeToggle = document.getElementById('darkModeSwitch');
    _html = document.querySelector('html');
    #getSettings = () => {
        const settings = localStorage.getItem('settings');
        return settings ? JSON.parse(settings) : {};
    }
    _savePreferences() {
        localStorage.setItem('settings', JSON.stringify(this._formData));
    }
    _getPreferences() {
        const settings = localStorage.getItem('settings');
        if (settings) {
            const parsedSettings = JSON.parse(settings);
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
    _updateTheme() {
        const settings = this.#getSettings();
        const darkMode = settings.darkMode === "on";
        this._html.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
    }
    addHandleClickTheme() {
        this._themeToggle.addEventListener('click', () => {
            let settings = this.#getSettings();
            const darkMode = settings.darkMode === "on";
            settings.darkMode = darkMode ? "off" : "on";
            localStorage.setItem('settings', JSON.stringify(settings));
            this._updateTheme();
        });
    }
}
export default new SettingsView();