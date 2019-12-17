(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Async = {}));
}(this, (function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var BasePromise =
  /*#__PURE__*/
  function () {
    function BasePromise(executor) {
      _classCallCheck(this, BasePromise);

      _defineProperty(this, "_promise", void 0);

      this._promise = new Promise(executor);
    }

    _createClass(BasePromise, [{
      key: "then",
      value: function then() {
        var _this$_promise;

        return (_this$_promise = this._promise).then.apply(_this$_promise, arguments);
      }
    }, {
      key: "catch",
      value: function _catch() {
        var _this$_promise2;

        return (_this$_promise2 = this._promise)["catch"].apply(_this$_promise2, arguments);
      }
    }, {
      key: "finally",
      value: function _finally() {
        var _this$_promise3;

        return (_this$_promise3 = this._promise)["finally"].apply(_this$_promise3, arguments);
      }
    }]);

    return BasePromise;
  }();

  /* -----------------------------------------------------------------------------
   * Deferred
   * -------------------------------------------------------------------------- */

  var Deferred =
  /*#__PURE__*/
  function (_Promise) {
    _inherits(Deferred, _Promise);

    function Deferred() {
      var _this;

      _classCallCheck(this, Deferred);

      var _resolve = function _resolve() {
        return undefined;
      };

      var _reject = function _reject() {
        return undefined;
      };

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Deferred).call(this, function (resolve, reject) {
        _resolve = resolve;
        _reject = reject;
      }));

      _defineProperty(_assertThisInitialized(_this), "_resolve", void 0);

      _defineProperty(_assertThisInitialized(_this), "_reject", void 0);

      _this._resolve = _resolve;
      _this._reject = _reject;
      return _this;
    }

    _createClass(Deferred, [{
      key: "resolve",
      value: function resolve() {
        this._resolve.apply(this, arguments);
      }
    }, {
      key: "reject",
      value: function reject() {
        this._reject.apply(this, arguments);
      }
    }]);

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
    _inherits(EventListener, _Promise);

    _createClass(EventListener, null, [{
      key: "create",
      value: function create(target, event) {
        return new EventListener(target, event);
      }
    }]);

    function EventListener(target, event) {
      var _this;

      _classCallCheck(this, EventListener);

      var _resolve = function _resolve() {
        return undefined;
      };

      var _reject = function _reject() {
        return undefined;
      };

      _this = _possibleConstructorReturn(this, _getPrototypeOf(EventListener).call(this, function (resolve, reject) {
        _resolve = resolve;
        _reject = reject;
      }));

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

    _createClass(EventListener, [{
      key: "cancel",
      value: function cancel(error) {
        this._status = exports.EventListenerStatus.REJECTED;

        this._target.off(this._event, this._onEvent);

        this._reject(error);
      }
    }]);

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
    _inherits(Timer, _Promise);

    _createClass(Timer, null, [{
      key: "create",
      value: function create(duration) {
        return new Timer(duration);
      }
    }]);

    function Timer(duration) {
      var _this;

      _classCallCheck(this, Timer);

      var _resolve = function _resolve() {
        return undefined;
      };

      var _reject = function _reject() {
        return undefined;
      };

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Timer).call(this, function (resolve, reject) {
        _resolve = resolve;
        _reject = reject;
      }));

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

    _createClass(Timer, [{
      key: "set",
      value: function set(duration) {
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
      }
    }, {
      key: "start",
      value: function start() {
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
      }
    }, {
      key: "pause",
      value: function pause() {
        if (this._state.status === exports.TimerStatus.STARTED) {
          var timeElapsed = Date.now() - this._state.start;

          clearTimeout(this._state.timeout);
          this._state = {
            status: exports.TimerStatus.PAUSED,
            duration: this._state.duration - timeElapsed
          };
        }

        return this;
      }
    }, {
      key: "stop",
      value: function stop(error) {
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
      }
    }]);

    return Timer;
  }(BasePromise);

  exports.Deferred = Deferred;
  exports.EventListener = EventListener;
  exports.Promise = BasePromise;
  exports.Timer = Timer;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
