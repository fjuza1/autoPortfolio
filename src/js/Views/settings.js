import View from './View.js';
class SettingsView extends View {
    _form =  document.getElementById('settingsForm');
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
}
export default new SettingsView();