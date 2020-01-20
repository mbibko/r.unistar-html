import validate from './validate.js'
import {forEach} from './helpers.js'
import {controls} from './controls.js'


controls(document.forms);
validate('.contact-form');
