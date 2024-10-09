import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import design from './DesignView.js';
const controllHover = () => {
    design.addHandlerHover(design.handleHover)
}
const init = () => {
    controllHover();
}
init()