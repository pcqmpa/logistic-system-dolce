/* eslint-disable no-console */
/**
 * Module with a set of logging tools.
 * @module src/shared/utils/log
 */
import PrettyError from 'pretty-error';

// The error render object.
const prettyError = new PrettyError();

// Apply some styles to the render object.
prettyError.appendStyle({
  // this is a simple selector to the element that says 'Error'
  'pretty-error > header > title > kind': {
    // which we can hide:
    display: 'block'
  },

  // the 'colon' after 'Error':
  'pretty-error > header > colon': {
    // we hide that too:
    display: 'none'
  },

  // our error message
  'pretty-error > header > message': {
    // let's change its color:
    color: 'bright-white',

    // we can use black, red, green, yellow, blue, magenta, cyan, white,
    // grey, bright-red, bright-green, bright-yellow, bright-blue,
    // bright-magenta, bright-cyan, and bright-white

    // we can also change the background color:
    background: 'red',

    // it understands paddings too!
    padding: '0 1' // top/bottom left/right
  },

  // each trace item ...
  'pretty-error > trace > item': {
    // ... can have a margin ...
    marginLeft: 2,

    // ... and a bullet character!
    bullet: '"<grey>o</grey>"'

    // Notes on bullets:
    //
    // The string inside the quotation mark gets used as the character
    // to show for the bullet point.
    //
    // You can set its color/background color using tags.
    //
    // This example sets the background color to white, and the text color
    // to cyan, the character will be a hyphen with a space character
    // on each side:
    // example: '"<bg-white><cyan> - </cyan></bg-white>"'
    //
    // Note that we should use a margin of 3, since the bullet will be
    // 3 characters long.
  },

  'pretty-error > trace > item > header > pointer > file': {
    color: 'bright-red'
  },

  'pretty-error > trace > item > header > pointer > colon': {
    color: 'red'
  },

  'pretty-error > trace > item > header > pointer > line': {
    color: 'bright-red'
  },

  'pretty-error > trace > item > header > what': {
    color: 'bright-white'
  },

  'pretty-error > trace > item > footer > addr': {
    display: 'none'
  }
});

/**
 * Logs a debug message with a label and value args.
 * @param {String} label -> The log label.
 * @param {Any} value -> The debugger value.
 */
const debug = (label, value) => {
  console.log(label, value);
};

/**
 * Logs errors in a clean way.
 * @param {Any} err -> The error to be logged.
 * @returns {void}
 */
const error = (err) => {
  console.error(prettyError.render(err));
};

/**
 * Logs a message as an console info.
 * @param {Any} message -> The message to be logged.
 * @returns {void}
 */
const info = (message) => {
  console.info(message);
};

/**
 * Logs a message to the console.
 * @param {Any} message -> The message to be logged.
 * @returns {void}
 */
const log = (message) => {
  console.log(message);
};


export default { debug, error, log, info };
