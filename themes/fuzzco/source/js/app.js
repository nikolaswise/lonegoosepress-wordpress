import $ from 'jquery'
import debounce from './helpers/debounce.js'
import throttle from './helpers/throttle.js'
import bus from './helpers/bus.js'
import Keyups from './helpers/keyboard.js'
import Scrolling from './helpers/scrolling.js'
import Resizing from './helpers/resizing.js'

const logEvent = (event, param, ...params) => console.log(`Event Data: ${param}`, params)
const captureEvents = () => {
  bus.on('keyboard:escape', logEvent)
  bus.on('keyboard:return', logEvent)
  bus.on('keyboard:space', logEvent)
  bus.on('keyboard:arrow:up', logEvent)
  bus.on('keyboard:arrow:down', logEvent)
  bus.on('keyboard:arrow:left', logEvent)
  bus.on('keyboard:arrow:right', logEvent)
  // These are more annoying that useful unless you need them
  // bus.on('scrolling:at', logEvent)
  // bus.on('resize', logEvent)
}

const init = () => {
  captureEvents()
  Keyups()
  Scrolling()
  Resizing()
}

// App API
let app = {
  init: init,
  bus: bus
}

// Attach that buddy to the global scope
window.app = app;

/*
  jQuery document ready
*/
$(function() {
  app.init();
});