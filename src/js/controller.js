import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import * as model from './model.js'
import design from './Views/DesignView.js';
import paginationView from './Views/paginationView.js';
const controllNavBar = () => {
    design.addHandlerHover(design.handleHover)
    design.addHandlerNavObserver()
    design.addScrollIntoHandler(design.scrollIntoSection)
}
const init = () => {
    controllNavBar();
}
init()