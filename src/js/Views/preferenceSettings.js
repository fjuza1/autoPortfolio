import View from './View.js';
class PreferrencesView extends View {
  _parentElement = document.getElementById('Preferences');
  _renderSettingsModal() {
      const modalMarkup = `
        <div class="container-fluid">
                    <strong class="mb-0 mt-5">Page settings</strong>
                    <hr class="my-4">
                    <strong class="mb-0 mt-5">Behavior settings</strong>
                    <p>Controls behavior of webpage</p>
                    <div class="list-group mb-5 shadow">
                        <div class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col-auto">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="darkModeSwitch">
                                <label class="form-check-label" for="flexSwitchCheckChecked">Enable/Disable dark mode</label>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="my-4">
                    <strong class="mb-0">Display settings</strong>
                    <p>Controls displaying of webpage</p>
                    <div class="list-group mb-5 shadow">
                        <div class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col-auto">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked">
                                <label class="form-check-label" for="flexSwitchCheckChecked">Enable/Disable auto complete</label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked">
                                <label class="form-check-label" for="flexSwitchCheckChecked">Enable/Disable form suggestions</label>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
   `;
      this._modal.innerHTML = '';
      this._modal.insertAdjacentHTML('afterbegin', modalMarkup);
  }
}
export default new PreferrencesView();
