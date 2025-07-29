class SettingsView {

    _checkboxAutoComplete = document.getElementById('checkboxAutoComplete');
    _form = document.querySelectorAll('form');

    _toggleAutoFill (){
        this._form.forEach((usrInput) => {
            const autocomplete = usrInput.getAttribute("autocomplete");
            if (!autocomplete || autocomplete === "off") {
                usrInput.setAttribute("autocomplete", "on");
            } else {
                usrInput.setAttribute("autocomplete", "off");
            }
        });
    }
    _addHandleSettings() {
        this._checkboxAutoComplete.addEventListener('change', (e) => 
            {if (e.target.checked) {    this._toggleAutoFill();} else {    this._toggleAutoFill()}
        });
    }
}
export default new SettingsView();