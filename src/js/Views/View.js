export default class View {
    _parentElement = null;
    _cleanup(){
        this._parentElement.innerHTML = '';
    };
    _render(el){
        this._cleanup();
        if(typeof el !=='string') return new Error('Invalid value, must be a string')
        this._parentElement.innerHTML = el
    }
}