(function () {
'use strict';

function E () {}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }

    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) {
          liveEvents.push(evts[i]);
        }
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];
    return this;
  }
};

var bus = new E();

// ┌─────┐
// │ DOM │
// └─────┘
// Handles dom nodes

// returns closest element up the DOM tree matching a given class
function closest (className, context) {
  var current;
  for (current = context; current; current = current.parentNode) {
    if (current.nodeType === 1 && has(current, className)) {
      break;
    }
  }
  return current;
}

// turn a domNodeList into an array
function nodeListToArray (domNodeList) {
  if (Array.isArray(domNodeList)) {
    return domNodeList;
  } else {
    return Array.prototype.slice.call(domNodeList);
  }
}

// Finds all the elements inside a node, or the document and returns them as an array
function findElements (query, domNode) {
  var context = domNode || document;
  var elements = context.querySelectorAll(query);
  return nodeListToArray(elements);
}

// Cool Helpers
// ┌────────────────────┐
// │ Class Manipulation │
// └────────────────────┘

// check if an element has a specific class
function has (domNode, className) {
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test(domNode.getAttribute('class'));
}

// add one or more classes to an element
function add (domNode, classes) {
  classes.split(' ').forEach(function (c) {
    if (!has(domNode, c)) {
      domNode.setAttribute('class', domNode.getAttribute('class') + ' ' + c);
    }
  });
}

// remove one or more classes from an element
function remove (domNode, classes) {
  classes.split(' ').forEach(function (c) {
    var removedClass = domNode.getAttribute('class').replace(new RegExp('(\\s|^)' + c + '(\\s|$)', 'g'), '$2');
    if (has(domNode, c)) {
      domNode.setAttribute('class', removedClass);
    }
  });
}

// if domNode has the class, remove it, else add it
function toggle (domNode, className) {
  if (has(domNode, className)) {
    remove(domNode, className);
  } else {
    add(domNode, className);
  }
}

// remove 'is-active' class from every element in an array
function removeActive (array) {
  array = nodeListToArray(array);
  array.forEach(function (item) {
    remove(item, 'is-active');
  });
}

// add 'is-active' class from every element in an array


// remove 'is-active' class from every element in an array, add to one element

// ┌────────────────┐
// │ Aria Adjusters │
// └────────────────┘
// utilities to help manage aria properties

// toggles `aria-hidden` on a domNode


// adds `aria-hidden` on a domNode
function hide (array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    node.setAttribute('aria-hidden', true);
  });
}

// removes `aria-hidden` on a domNode
function show (array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    node.removeAttribute('aria-hidden');
  });
}

// ┌──────────────────────┐
// │ DOM Event Management │
// └──────────────────────┘

// returns standard interaction event, later will add touch support
function click () {
  return 'click';
}

// add a callback function to an event on a DOM node
function add$1 (domNode, e, fn) {
  if (domNode.addEventListener) {
    return domNode.addEventListener(e, fn, false);
  } else if (domNode.attachEvent) {
    return domNode.attachEvent('on' + e, fn);
  }
}

// remove a specific function binding from a DOM node event
function remove$1 (domNode, e, fn) {
  if (domNode.removeEventListener) {
    return domNode.removeEventListener(e, fn, false);
  } else if (domNode.detachEvent) {
    return domNode.detachEvent('on' + e, fn);
  }
}

// get the target element of an event


// prevent default behavior of an event
function preventDefault (e) {
  if (e.preventDefault) {
    return e.preventDefault();
  } else if (e.returnValue) {
    e.returnValue = false;
  }
}

// stop and event from bubbling up the DOM tree


// return a function that will only execute
// once it is NOT called for delay milliseconds

// ┌───────┐
// │ Modal │
// └───────┘
// show and hide modal dialogues
// Listens to a 'modal:bind' optionally takes a node
// Emits and listens on the 'modal:open' channel. Takes a data-modal attr
// Emits and listens to on the 'modal:close' channel. Optionally takes a data-modal
// Emitting a modal id toggle that modals state.
// Emitting false or null closes all modals.

function modal () {
  // Cool nodes
  var wrapper = document.querySelector('.wrapper');
  var footer = document.querySelector('.footer');
  var toggles = findElements('.js-modal-toggle');
  var modals = findElements('.js-modal');

  // Bus events
  bus.on('modal:open', openModal);
  bus.on('keyboard:escape', closeModal);
  bus.on('modal:close', closeModal);
  bus.on('modal:bind', bindModals);

  function dependentNodes () {
    var nodes = [];
    if (wrapper) {
      nodes.push(wrapper);
    }
    if (footer) {
      nodes.push(footer);
    }
    return nodes;
  }

  function openModal (modalId) {
    bus.emit('modal:close');
    if (!modalId) return;
    var modal = document.querySelector(`.js-modal[data-modal="${modalId}"]`);
    modal.removeAttribute('tabindex');
    add$1(document, 'focusin', fenceModal);
    add(modal, 'is-active');
    hide(dependentNodes());
    modal.focus();
  }

  function closeModal (modalId) {
    if (!modalId) return removeActive(modals);
    var modal = document.querySelector(`.js-modal[data-modal="${modalId}"]`);
    remove(modal, 'is-active');
    modal.setAttribute('tabindex', 0);
    remove$1(document, 'focusin', fenceModal);
    show(dependentNodes());
  }

  function bindModals (node) {
    if (!node) {
      toggles.forEach(function (toggle$$1) {
        add$1(toggle$$1, click(), toggleClick);
      });
    } else {
      add$1(node, click(), toggleClick);
    }
  }

  function fenceModal (e) {
    if (!closest('js-modal', e.target)) {
      modals.forEach(function (modal) {
        if (has(modal, 'is-active')) {
          modal.focus();
        }
      });
    }
  }

  function toggleClick (e) {
    preventDefault(e);
    var modalId = e.target.dataset.modal;
    bus.emit('modal:open', modalId);
  }

  bus.emit('modal:bind');
}

var bind = function () {
  var incrementItemButtons = findElements('.js-add-one');
  var deincrementItemButtons = findElements('.js-remove-one');
  var addToCartButtons = findElements('.js-add-to-cart');
  var pricePickers = findElements('.js-purchase-amount');
  var cartClearButtons = findElements('.js-cart-clear');

  incrementItemButtons.forEach(function (button) {
    button.addEventListener('click', incrementItemClick);
  });
  deincrementItemButtons.forEach(function (button) {
    button.addEventListener('click', deincrementItemClick);
  });
  addToCartButtons.forEach(function (button) {
    button.addEventListener('click', addToCartClick);
  });
  pricePickers.forEach(function (input) {
    input.addEventListener('change', updatePrice);
  });
  cartClearButtons.forEach(function (button) {
    button.addEventListener('click', cartClearClick);
  });
};

var addToCartClick = function (e) {
  var id = e.target.getAttribute('data-id');
  var price = e.target.getAttribute('data-price');
  var shipping = e.target.getAttribute('data-shipping');
  bus.emit('cart:add', id, price, shipping);
};
var deincrementItemClick = function (e) {
  var id = e.target.getAttribute('data-id');
  bus.emit('cart:adjust', id, -1);
};
var incrementItemClick = function (e) {
  var id = e.target.getAttribute('data-id');
  bus.emit('cart:adjust', id, 1);
};
var updatePrice = function (e) {
  bus.emit('cart:price', e);
};
var cartClearClick = function (e) {
  bus.emit('cart:clear');
};

var intent = function () {
  bind();
  bus.on('cart:bind', bind);
};

var model = function (cart) {
  var addToCart = function (id, price, shipping) {
    cart.addItem(id, 1, price, shipping);
    bus.emit('cart:updated');
  };
  var adjustItemCount = function (id, count) {
   cart.incrementItem(id, count);
   bus.emit('cart:updated');
  };
  var setPrice = function (e) {
   var pricePickers = document.querySelectorAll('.js-purchase-amount');
   pricePickers.forEach(function (input) {
     input.value = e.target.value;
   });
   bus.emit('cart:updated');
  };
  var clearCart = function () {
    cart.clear();
    bus.emit('cart:updated');
  };
  bus.on('cart:clear', clearCart);
  bus.on('cart:add', addToCart);
  bus.on('cart:adjust', adjustItemCount);
  bus.on('cart:price', setPrice);
};

var lineItem = function (item) {
  return("\n    <div class=\"first-column font-size-1 padding-tailer-half trailer-half column-17 phone-column-5\">\n      <a href=\"#\" class=\"js-remove-one gutter-right-1 link-white\" data-id=\"" + (item.id) + "\" data-add=\"false\">-</a>\n      <span>" + (item.num) + "</span>\n      <a href=\"#\" class=\"js-add-one gutter-left-1 link-white\" data-id=\"" + (item.id) + "\" data-add=\"true\">+</a>\n      <span class=\"gutter-left-1\">" + (item.id) + "</span>\n      <span class=\"right gutter-right-1\">" + (item.price) + "</span>\n      <hr />\n    </div>\n  ")
};

var render = function (cart) {
  if (cart.items.length == 0) {
    return "\n      <p class=\"text-center padding-leader-2 padding-trailer-2\">No items in your cart.</p>\n    "
  }
  return ("\n    <h3 class=\"trailer-1\">Your Cart</h3>\n    " + (cart.items.map(function (item) { return lineItem(item); }).join('')) + "\n    <div class=\"column-17 phone-column-5\">\n      <p class=\"font-size-1 trailer-half text-right gutter-right-1\">Subtotal: $ " + (cart.subtotal) + "</p>\n      <p class=\"font-size-1 trailer-half text-right gutter-right-1\">Shipping: $ " + (cart.shipping) + "</p>\n      <p class=\"font-size-1 trailer-half text-right gutter-right-1\">Total: $ " + (cart.total) + "</p>\n    </div>\n  ")
};

var setToggleCartToggle = function (cart) {
  return function () {
    var cartToggleButtons = findElements('.js-cart-toggle');
    var data = cart.get();
    if (data.items.length > 0) {
      cartToggleButtons.forEach(function (button) {
        remove(button, 'is-hidden');
      });
    } else {
      cartToggleButtons.forEach(function (button) {
        add(button, 'is-hidden');
      });
    }
  }
};
// THIS FUNCTION IS P GROSS
var setSetActions = function (cart) {
  return function () {
    var data = cart.get();
    var itemActions = findElements('.js-action-container');
    var artistsInCart = [];
    data.items.forEach(function (item) {
      artistsInCart.push(item.id);
    });
    itemActions.forEach(function (item) {
      var btn = item.querySelector('.js-add-to-cart');
      var num = item.querySelector('.js-action-current');
      var artist = btn.getAttribute('data-id');
      if (artistsInCart.includes(artist)) {
        add(item, 'is-in-cart');
        data.items.forEach(function (item) {
          if (item.id === artist) {
            num.innerHTML = item.num;
          }
        });
      } else {
        remove(item, 'is-in-cart');
      }
    });
  }
};

var setCart = function (cart) {
  return function () {
    var data = cart.get();
    var cartOverviewSections = findElements('.js-cart-overview');
    cartOverviewSections.forEach(function (section) {
      var subTotal = section.querySelector('.js-purchase-amount');
      if (subTotal && parseInt(subTotal.value) > data.subtotal) {
        data.subtotal = parseInt(subTotal.value);
        data.total = data.shipping + data.subtotal;
      }
      section.innerHTML = render(data);
    });
    if (data.itemCount > 0) {
      var body = document.querySelector('body');
      add(body, 'is-cart');
      remove(body, 'no-cart');
    } else {
      var body$1 = document.querySelector('body');
      remove(body$1, 'is-cart');
      add(body$1, 'no-cart');
    }
    bus.emit('cart:bind');
  }
};

var view = function (cart) {
  var renderCart = setCart(cart);
  var setActions = setSetActions(cart);
  var toggleCartToggle = setToggleCartToggle(cart);
  var bind = function () {
    bus.emit('modal:bind');
    setActions();
  };
  bus.on('cart:updated', renderCart);
  bus.on('cart:updated', setActions);
  bus.on('cart:updated', toggleCartToggle);
  bus.on('cart:bind', bind);

  renderCart();
  setActions();
  toggleCartToggle();
};

var cart$1 = function (options) {
  var name = options.name;
  var emptyModel = {
    items: [],
    itemCount: 0,
    subtotal: 0,
    shipping: 0,
    total: 0,
  };

  var set = function (model$$1) {
    window.localStorage.setItem(name, JSON.stringify(model$$1));
    return this
  };

  var get = function () {
    var model$$1 = JSON.parse(window.localStorage.getItem(name));
    model$$1.itemCount = 0;
    model$$1.subtotal = 0;
    model$$1.shipping = 0;
    model$$1.items.forEach(function (item){
      console.log(item);
      model$$1.subtotal += (item.price * item.num);
      model$$1.itemCount += item.num;
      model$$1.shipping += (item.shipping * item.num);
    });
    model$$1.total = model$$1.subtotal + model$$1.shipping;
    return model$$1
  };

  var clear = function () {
    set(emptyModel);
    return this
  };

  var getItemIds = function () {
    var model$$1 = get();
    return model$$1.items.map(function (item){
      return item.id
    })
  };

  var addItem = function (id, num, price, shipping) {
    var model$$1 = get();
    var item = {
      id: id,
      price: price,
      shipping: shipping,
      num: num
    };
    if (!hasItem(id)) {
      model$$1.items.push(item);
    } else {
      var i = getItemIds().indexOf(id);
      model$$1.items[i].num += num;
    }
    set(model$$1);
    return this
  };

  var hasItem = function (id) {
    var model$$1 = get();
    var itemIds = getItemIds();
    return itemIds.indexOf(id) > -1
  };

  var incrementItem = function(id, num) {
    var model$$1 = get();
    var i = getItemIds().indexOf(id);
    model$$1.items[i].num += num;
    if (model$$1.items[i].num == 0) {
      model$$1.items.splice(i, 1);
    }
    set(model$$1);
    return this
  };

  var setItemCount = function(id, num) {
    var model$$1 = get();
    var i = getItemIds().indexOf(id);
    model$$1.items[i].num = num;
    if (model$$1.items[i].num == 0) {
      model$$1.items.splice(i, 1);
    }
    set(model$$1);
    return this
  };

  var submit = function (cb) {
    var model$$1 = get();
    cb(model$$1);
    return this
  };

  var current = JSON.parse(window.localStorage.getItem(name));
  if (!current) {
    set(emptyModel);
  }


  var Cart = {
    set: set,
    get: get,
    clear: clear,
    getItemIds: getItemIds,
    addItem: addItem,
    hasItem: hasItem,
    incrementItem: incrementItem,
    setItemCount: setItemCount,
    submit: submit
  };
  intent();
  model(Cart);
  view(Cart);
  return Cart
};

var nav = function () {
  var navToggles = findElements('.js-expanding-toggle');
  var menus = findElements('.js-expanding');
  var toggleMenu = function () {
    console.log('tog tog tog');
    menus.forEach(function (menu) {
      toggle(menu, 'is-active');
    });
  };
  navToggles.forEach(function (toggle$$1) {
    add$1(toggle$$1, 'click', toggleMenu);
  });
};

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    };

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue+','+value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) { items.push(name); });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) { items.push(value); });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) { items.push([name, value]); });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : undefined);

var req = fetch;

var buildOrder = function (data) {
  var order = {
    "line_items": buildItems(data.items, data.shipping)
  };
  return order
};

var buildItems = function (items, shipping) {
  items.push({
    id: "Shipping",
    num: 1,
    price: shipping
  });
  return items.map(function (item) {
    return {
      "name": item.id,
      "quantity": item.num.toString(),
      "base_price_money": {
        "amount": parseInt(item.price * 100),
        "currency": "USD"
      }
    }
  })
};

var bind$1 = function () {
  var btnClick = function () { return bus.emit('payment:start'); };
  var submitBtns = findElements('.js-submit-payment');
  submitBtns.forEach(function (btn) {
    add$1(btn, 'click', btnClick);
  });
};

var setup = function (cart) { return function () {
  var data = cart.get();
  var order = buildOrder(data);
  console.log(order);
  var body = JSON.stringify(order);
  req('https://api.nikolas.ws/lone-goose-press/square/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  })
  .then(function(res){
    return res.json();
  })
  .then(function(data){
    console.log(data);
    bus.emit('checkout:new', data);
  });
}; };

var handleCheckout = function (data) {
  location.assign(data.checkout.checkout_page_url);
};

var init$1 = function (cart) {
  window.cart = cart;
  bind$1();
  var submitCart = setup(cart);
  bus.on('payment:start', submitCart);
  bus.on('checkout:new', handleCheckout);
};

var cart = cart$1({name: 'lonegoosepress'});
var setCartCounter = function () {
  var count = cart.get().itemCount;
  var counters = findElements('.js-cart-counter');
  counters.forEach(function (counter) {
    counter.innerHTML = count;
  });
};
bus.on('cart:updated', setCartCounter);
setCartCounter();
modal();
nav();
init$1(cart);

}());
