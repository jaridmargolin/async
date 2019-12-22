'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.object.to-string');
require('core-js/modules/es.promise');
require('core-js/modules/es.promise.finally');
require('core-js/modules/es.date.now');
require('core-js/modules/es.date.to-string');
require('core-js/modules/es.object.assign');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var BasePromise =
/*#__PURE__*/
function () {
  function BasePromise(executor) {
    _defineProperty(this, "_promise", void 0);

    this._promise = new Promise(executor);
  }

  var _proto = BasePromise.prototype;

  _proto.then = function then(onfulfilled, onrejected) {
    return this._promise.then(onfulfilled, onrejected);
  };

  _proto["catch"] = function _catch(onrejected) {
    return this._promise["catch"](onrejected);
  };

  _proto["finally"] = function _finally(onfinally) {
    return this._promise["finally"](onfinally);
  };

  return BasePromise;
}();

/* -----------------------------------------------------------------------------
 * Deferred
 * -------------------------------------------------------------------------- */

var Deferred =
/*#__PURE__*/
function (_Promise) {
  _inheritsLoose(Deferred, _Promise);

  function Deferred() {
    var _this;

    var _resolve = function _resolve() {
      return undefined;
    };

    var _reject = function _reject() {
      return undefined;
    };

    _this = _Promise.call(this, function (resolve, reject) {
      _resolve = resolve;
      _reject = reject;
    }) || this;

    _defineProperty(_assertThisInitialized(_this), "_resolve", void 0);

    _defineProperty(_assertThisInitialized(_this), "_reject", void 0);

    _this._resolve = _resolve;
    _this._reject = _reject;
    return _this;
  }

  var _proto = Deferred.prototype;

  _proto.resolve = function resolve(value) {
    this._resolve(value);
  };

  _proto.reject = function reject(reason) {
    this._reject(reason);
  };

  return Deferred;
}(BasePromise);

(function (EventListenerStatus) {
  EventListenerStatus[EventListenerStatus["PENDING"] = 0] = "PENDING";
  EventListenerStatus[EventListenerStatus["RESOLVED"] = 1] = "RESOLVED";
  EventListenerStatus[EventListenerStatus["REJECTED"] = 2] = "REJECTED";
})(exports.EventListenerStatus || (exports.EventListenerStatus = {}));

var EventListener =
/*#__PURE__*/
function (_Promise) {
  _inheritsLoose(EventListener, _Promise);

  EventListener.create = function create(target, event) {
    return new EventListener(target, event);
  };

  function EventListener(target, event) {
    var _this;

    var _resolve = function _resolve() {
      return undefined;
    };

    var _reject = function _reject() {
      return undefined;
    };

    _this = _Promise.call(this, function (resolve, reject) {
      _resolve = resolve;
      _reject = reject;
    }) || this;

    _defineProperty(_assertThisInitialized(_this), "_status", void 0);

    _defineProperty(_assertThisInitialized(_this), "_resolve", void 0);

    _defineProperty(_assertThisInitialized(_this), "_reject", void 0);

    _defineProperty(_assertThisInitialized(_this), "_target", void 0);

    _defineProperty(_assertThisInitialized(_this), "_event", void 0);

    _defineProperty(_assertThisInitialized(_this), "_onEvent", void 0);

    _this._resolve = _resolve;
    _this._reject = _reject;
    _this._target = target;
    _this._event = event;

    _this._onEvent = function (evt) {
      _this._status = exports.EventListenerStatus.RESOLVED;

      _this._target.off(_this._event, _this._onEvent);

      _this._resolve(evt);
    };

    _this._status = exports.EventListenerStatus.PENDING;

    _this._target.on(_this._event, _this._onEvent);

    return _this;
  }

  var _proto = EventListener.prototype;

  _proto.cancel = function cancel(error) {
    this._status = exports.EventListenerStatus.REJECTED;

    this._target.off(this._event, this._onEvent);

    this._reject(error);
  };

  return EventListener;
}(BasePromise);

(function (TimerStatus) {
  TimerStatus[TimerStatus["READY"] = 0] = "READY";
  TimerStatus[TimerStatus["STARTED"] = 1] = "STARTED";
  TimerStatus[TimerStatus["PAUSED"] = 2] = "PAUSED";
  TimerStatus[TimerStatus["STOPPED"] = 3] = "STOPPED";
  TimerStatus[TimerStatus["COMPLETED"] = 4] = "COMPLETED";
})(exports.TimerStatus || (exports.TimerStatus = {}));

var Timer =
/*#__PURE__*/
function (_Promise) {
  _inheritsLoose(Timer, _Promise);

  Timer.create = function create(duration) {
    return new Timer(duration);
  };

  function Timer(duration) {
    var _this;

    var _resolve = function _resolve() {
      return undefined;
    };

    var _reject = function _reject() {
      return undefined;
    };

    _this = _Promise.call(this, function (resolve, reject) {
      _resolve = resolve;
      _reject = reject;
    }) || this;

    _defineProperty(_assertThisInitialized(_this), "_state", void 0);

    _defineProperty(_assertThisInitialized(_this), "_resolve", void 0);

    _defineProperty(_assertThisInitialized(_this), "_reject", void 0);

    _this._resolve = _resolve;
    _this._reject = _reject;
    _this._state = {
      status: exports.TimerStatus.READY,
      duration: duration
    };
    return _this;
  }

  var _proto = Timer.prototype;

  _proto.set = function set(duration) {
    // reset an active running timer
    if (this._state.status === exports.TimerStatus.STARTED) {
      this.pause();
      Object.assign(this._state, {
        duration: duration
      });
      this.start();
    }

    if (this._state.status === exports.TimerStatus.READY || this._state.status === exports.TimerStatus.PAUSED) {
      Object.assign(this._state, {
        duration: duration
      });
    }

    return this;
  };

  _proto.start = function start() {
    var _this2 = this;

    if (this._state.status === exports.TimerStatus.READY || this._state.status === exports.TimerStatus.PAUSED) {
      this._state = {
        status: exports.TimerStatus.STARTED,
        start: Date.now(),
        duration: this._state.duration,
        timeout: setTimeout(function () {
          _this2._state = {
            status: exports.TimerStatus.COMPLETED,
            duration: null
          };

          _this2._resolve();
        }, this._state.duration)
      };
    }

    return this;
  };

  _proto.pause = function pause() {
    if (this._state.status === exports.TimerStatus.STARTED) {
      var timeElapsed = Date.now() - this._state.start;

      clearTimeout(this._state.timeout);
      this._state = {
        status: exports.TimerStatus.PAUSED,
        duration: this._state.duration - timeElapsed
      };
    }

    return this;
  };

  _proto.stop = function stop(error) {
    if (this._state.status === exports.TimerStatus.STARTED) {
      clearTimeout(this._state.timeout);
    }

    this._state = {
      status: exports.TimerStatus.STOPPED,
      duration: null
    };

    if (error) {
      this._reject(error);
    }

    return this;
  };

  return Timer;
}(BasePromise);

exports.Deferred = Deferred;
exports.EventListener = EventListener;
exports.Promise = BasePromise;
exports.Timer = Timer;
