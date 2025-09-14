import View from './View.js'
class CertificationsView extends View {
    _parentElement = ""
    #keepCollapsed (){
        const idShown = this._parentElement.querySelector('.collapse.show')?.getAttribute(id);
        if(!idShown) return;
        document.getElementById(`${idShown}`).classList.add('show')
    }
    _certificationsMarkup(_data) {
        this._data = _data;
        return this._data.map((certs)=>{
            
        })
    }
}
export default new CertificationsView ()