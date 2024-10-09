import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import design from './DesignView.js';
const controllNavBar = () => {
    design.addHandlerHover(design.handleHover)
    design.addHandlerNavObserver()
}
const init = () => {
    controllNavBar();
}
init()