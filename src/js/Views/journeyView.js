import {Timeline} from '../lib.js';
import View from './View.js';
class JourneyView extends View {
    _parentElement = document.getElementById('Journey');
    #setYear(_data) {
        this._data = _data;
        return new Date().getFullYear(this._data.year)
    }
    _setTimeline(_data){
        this._data = _data;
        const yearData = this.#setYear()
        new Timeline(this._parentElement, this._data, {
            width: '100%',
            height: '90dvh',
            margin: { item: 10 },
            align: 'center',
            autoResize: true,
            format: {
              minorLabels: () => {return { date: yearData, scale:yearData }}
            },
            groupOrder:this._data.name
          });
    }
    #setItemDataset(_data) {
        this._data = _data;
        const yearData = this.#setYear();
        return this._data.map((data, i)=>{
            return {
                id: i,
                content: data.content,
                start: yearData,
                end: yearData,
                type: data.type,
                group: data.group,
            }
        })
    }
}
export default new JourneyView();