import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "./@floating-ui/react-dom+[...].mjs";
import { o as createStore } from "./@reduxjs/toolkit+[...].mjs";
//#region node_modules/redux-persist/es/constants.js
var KEY_PREFIX = "persist:";
var FLUSH = "persist/FLUSH";
var REHYDRATE = "persist/REHYDRATE";
var PAUSE = "persist/PAUSE";
var PERSIST = "persist/PERSIST";
var PURGE = "persist/PURGE";
var REGISTER = "persist/REGISTER";
//#endregion
//#region node_modules/redux-persist/es/stateReconciler/autoMergeLevel1.js
function _typeof$1(obj) {
	if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof$1 = function _typeof(obj) {
		return typeof obj;
	};
	else _typeof$1 = function _typeof(obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};
	return _typeof$1(obj);
}
function ownKeys$2(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		if (enumerableOnly) symbols = symbols.filter(function(sym) {
			return Object.getOwnPropertyDescriptor(object, sym).enumerable;
		});
		keys.push.apply(keys, symbols);
	}
	return keys;
}
function _objectSpread$2(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {};
		if (i % 2) ownKeys$2(source, true).forEach(function(key) {
			_defineProperty$3(target, key, source[key]);
		});
		else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
		else ownKeys$2(source).forEach(function(key) {
			Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
		});
	}
	return target;
}
function _defineProperty$3(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function autoMergeLevel1(inboundState, originalState, reducedState, _ref) {
	_ref.debug;
	var newState = _objectSpread$2({}, reducedState);
	if (inboundState && _typeof$1(inboundState) === "object") Object.keys(inboundState).forEach(function(key) {
		if (key === "_persist") return;
		if (originalState[key] !== reducedState[key]) return;
		newState[key] = inboundState[key];
	});
	return newState;
}
//#endregion
//#region node_modules/redux-persist/es/createPersistoid.js
function createPersistoid(config) {
	var blacklist = config.blacklist || null;
	var whitelist = config.whitelist || null;
	var transforms = config.transforms || [];
	var throttle = config.throttle || 0;
	var storageKey = "".concat(config.keyPrefix !== void 0 ? config.keyPrefix : KEY_PREFIX).concat(config.key);
	var storage = config.storage;
	var serialize;
	if (config.serialize === false) serialize = function serialize(x) {
		return x;
	};
	else if (typeof config.serialize === "function") serialize = config.serialize;
	else serialize = defaultSerialize;
	var writeFailHandler = config.writeFailHandler || null;
	var lastState = {};
	var stagedState = {};
	var keysToProcess = [];
	var timeIterator = null;
	var writePromise = null;
	var update = function update(state) {
		Object.keys(state).forEach(function(key) {
			if (!passWhitelistBlacklist(key)) return;
			if (lastState[key] === state[key]) return;
			if (keysToProcess.indexOf(key) !== -1) return;
			keysToProcess.push(key);
		});
		Object.keys(lastState).forEach(function(key) {
			if (state[key] === void 0 && passWhitelistBlacklist(key) && keysToProcess.indexOf(key) === -1 && lastState[key] !== void 0) keysToProcess.push(key);
		});
		if (timeIterator === null) timeIterator = setInterval(processNextKey, throttle);
		lastState = state;
	};
	function processNextKey() {
		if (keysToProcess.length === 0) {
			if (timeIterator) clearInterval(timeIterator);
			timeIterator = null;
			return;
		}
		var key = keysToProcess.shift();
		var endState = transforms.reduce(function(subState, transformer) {
			return transformer.in(subState, key, lastState);
		}, lastState[key]);
		if (endState !== void 0) try {
			stagedState[key] = serialize(endState);
		} catch (err) {
			console.error("redux-persist/createPersistoid: error serializing state", err);
		}
		else delete stagedState[key];
		if (keysToProcess.length === 0) writeStagedState();
	}
	function writeStagedState() {
		Object.keys(stagedState).forEach(function(key) {
			if (lastState[key] === void 0) delete stagedState[key];
		});
		writePromise = storage.setItem(storageKey, serialize(stagedState)).catch(onWriteFail);
	}
	function passWhitelistBlacklist(key) {
		if (whitelist && whitelist.indexOf(key) === -1 && key !== "_persist") return false;
		if (blacklist && blacklist.indexOf(key) !== -1) return false;
		return true;
	}
	function onWriteFail(err) {
		if (writeFailHandler) writeFailHandler(err);
	}
	return {
		update,
		flush: function flush() {
			while (keysToProcess.length !== 0) processNextKey();
			return writePromise || Promise.resolve();
		}
	};
}
function defaultSerialize(data) {
	return JSON.stringify(data);
}
//#endregion
//#region node_modules/redux-persist/es/getStoredState.js
function getStoredState(config) {
	var transforms = config.transforms || [];
	var storageKey = "".concat(config.keyPrefix !== void 0 ? config.keyPrefix : KEY_PREFIX).concat(config.key);
	var storage = config.storage;
	config.debug;
	var deserialize;
	if (config.deserialize === false) deserialize = function deserialize(x) {
		return x;
	};
	else if (typeof config.deserialize === "function") deserialize = config.deserialize;
	else deserialize = defaultDeserialize;
	return storage.getItem(storageKey).then(function(serialized) {
		if (!serialized) return void 0;
		else try {
			var state = {};
			var rawState = deserialize(serialized);
			Object.keys(rawState).forEach(function(key) {
				state[key] = transforms.reduceRight(function(subState, transformer) {
					return transformer.out(subState, key, rawState);
				}, deserialize(rawState[key]));
			});
			return state;
		} catch (err) {
			throw err;
		}
	});
}
function defaultDeserialize(serial) {
	return JSON.parse(serial);
}
//#endregion
//#region node_modules/redux-persist/es/purgeStoredState.js
function purgeStoredState(config) {
	var storage = config.storage;
	var storageKey = "".concat(config.keyPrefix !== void 0 ? config.keyPrefix : KEY_PREFIX).concat(config.key);
	return storage.removeItem(storageKey, warnIfRemoveError);
}
function warnIfRemoveError(err) {}
//#endregion
//#region node_modules/redux-persist/es/persistReducer.js
function ownKeys$1(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		if (enumerableOnly) symbols = symbols.filter(function(sym) {
			return Object.getOwnPropertyDescriptor(object, sym).enumerable;
		});
		keys.push.apply(keys, symbols);
	}
	return keys;
}
function _objectSpread$1(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {};
		if (i % 2) ownKeys$1(source, true).forEach(function(key) {
			_defineProperty$2(target, key, source[key]);
		});
		else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
		else ownKeys$1(source).forEach(function(key) {
			Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
		});
	}
	return target;
}
function _defineProperty$2(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
var DEFAULT_TIMEOUT = 5e3;
function persistReducer(config, baseReducer) {
	var version = config.version !== void 0 ? config.version : -1;
	config.debug;
	var stateReconciler = config.stateReconciler === void 0 ? autoMergeLevel1 : config.stateReconciler;
	var getStoredState$1 = config.getStoredState || getStoredState;
	var timeout = config.timeout !== void 0 ? config.timeout : DEFAULT_TIMEOUT;
	var _persistoid = null;
	var _purge = false;
	var _paused = true;
	var conditionalUpdate = function conditionalUpdate(state) {
		state._persist.rehydrated && _persistoid && !_paused && _persistoid.update(state);
		return state;
	};
	return function(state, action) {
		var _ref = state || {}, _persist = _ref._persist;
		var restState = _objectWithoutProperties(_ref, ["_persist"]);
		if (action.type === "persist/PERSIST") {
			var _sealed = false;
			var _rehydrate = function _rehydrate(payload, err) {
				if (!_sealed) {
					action.rehydrate(config.key, payload, err);
					_sealed = true;
				}
			};
			timeout && setTimeout(function() {
				!_sealed && _rehydrate(void 0, new Error("redux-persist: persist timed out for persist key \"".concat(config.key, "\"")));
			}, timeout);
			_paused = false;
			if (!_persistoid) _persistoid = createPersistoid(config);
			if (_persist) return _objectSpread$1({}, baseReducer(restState, action), { _persist });
			if (typeof action.rehydrate !== "function" || typeof action.register !== "function") throw new Error("redux-persist: either rehydrate or register is not a function on the PERSIST action. This can happen if the action is being replayed. This is an unexplored use case, please open an issue and we will figure out a resolution.");
			action.register(config.key);
			getStoredState$1(config).then(function(restoredState) {
				(config.migrate || function(s, v) {
					return Promise.resolve(s);
				})(restoredState, version).then(function(migratedState) {
					_rehydrate(migratedState);
				}, function(migrateErr) {
					_rehydrate(void 0, migrateErr);
				});
			}, function(err) {
				_rehydrate(void 0, err);
			});
			return _objectSpread$1({}, baseReducer(restState, action), { _persist: {
				version,
				rehydrated: false
			} });
		} else if (action.type === "persist/PURGE") {
			_purge = true;
			action.result(purgeStoredState(config));
			return _objectSpread$1({}, baseReducer(restState, action), { _persist });
		} else if (action.type === "persist/FLUSH") {
			action.result(_persistoid && _persistoid.flush());
			return _objectSpread$1({}, baseReducer(restState, action), { _persist });
		} else if (action.type === "persist/PAUSE") _paused = true;
		else if (action.type === "persist/REHYDRATE") {
			if (_purge) return _objectSpread$1({}, restState, { _persist: _objectSpread$1({}, _persist, { rehydrated: true }) });
			if (action.key === config.key) {
				var reducedState = baseReducer(restState, action);
				var inboundState = action.payload;
				return conditionalUpdate(_objectSpread$1({}, stateReconciler !== false && inboundState !== void 0 ? stateReconciler(inboundState, state, reducedState, config) : reducedState, { _persist: _objectSpread$1({}, _persist, { rehydrated: true }) }));
			}
		}
		if (!_persist) return baseReducer(state, action);
		var newState = baseReducer(restState, action);
		if (newState === restState) return state;
		return conditionalUpdate(_objectSpread$1({}, newState, { _persist }));
	};
}
//#endregion
//#region node_modules/redux-persist/es/persistStore.js
function _toConsumableArray(arr) {
	return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function _iterableToArray(iter) {
	if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
	if (Array.isArray(arr)) {
		for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
		return arr2;
	}
}
function ownKeys(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		if (enumerableOnly) symbols = symbols.filter(function(sym) {
			return Object.getOwnPropertyDescriptor(object, sym).enumerable;
		});
		keys.push.apply(keys, symbols);
	}
	return keys;
}
function _objectSpread(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {};
		if (i % 2) ownKeys(source, true).forEach(function(key) {
			_defineProperty$1(target, key, source[key]);
		});
		else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
		else ownKeys(source).forEach(function(key) {
			Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
		});
	}
	return target;
}
function _defineProperty$1(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
var initialState = {
	registry: [],
	bootstrapped: false
};
var persistorReducer = function persistorReducer() {
	var state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : initialState;
	var action = arguments.length > 1 ? arguments[1] : void 0;
	switch (action.type) {
		case REGISTER: return _objectSpread({}, state, { registry: [].concat(_toConsumableArray(state.registry), [action.key]) });
		case REHYDRATE:
			var firstIndex = state.registry.indexOf(action.key);
			var registry = _toConsumableArray(state.registry);
			registry.splice(firstIndex, 1);
			return _objectSpread({}, state, {
				registry,
				bootstrapped: registry.length === 0
			});
		default: return state;
	}
};
function persistStore(store, options, cb) {
	var boostrappedCb = cb || false;
	var _pStore = createStore(persistorReducer, initialState, options && options.enhancer ? options.enhancer : void 0);
	var register = function register(key) {
		_pStore.dispatch({
			type: REGISTER,
			key
		});
	};
	var rehydrate = function rehydrate(key, payload, err) {
		var rehydrateAction = {
			type: REHYDRATE,
			payload,
			err,
			key
		};
		store.dispatch(rehydrateAction);
		_pStore.dispatch(rehydrateAction);
		if (boostrappedCb && persistor.getState().bootstrapped) {
			boostrappedCb();
			boostrappedCb = false;
		}
	};
	var persistor = _objectSpread({}, _pStore, {
		purge: function purge() {
			var results = [];
			store.dispatch({
				type: PURGE,
				result: function result(purgeResult) {
					results.push(purgeResult);
				}
			});
			return Promise.all(results);
		},
		flush: function flush() {
			var results = [];
			store.dispatch({
				type: FLUSH,
				result: function result(flushResult) {
					results.push(flushResult);
				}
			});
			return Promise.all(results);
		},
		pause: function pause() {
			store.dispatch({ type: PAUSE });
		},
		persist: function persist() {
			store.dispatch({
				type: PERSIST,
				register,
				rehydrate
			});
		}
	});
	if (!(options && options.manualPersist)) persistor.persist();
	return persistor;
}
//#endregion
//#region node_modules/redux-persist/es/integration/react.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function _typeof(obj) {
	if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function _typeof(obj) {
		return typeof obj;
	};
	else _typeof = function _typeof(obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};
	return _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
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
function _possibleConstructorReturn(self, call) {
	if (call && (_typeof(call) === "object" || typeof call === "function")) return call;
	return _assertThisInitialized(self);
}
function _getPrototypeOf(o) {
	_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf(o);
}
function _assertThisInitialized(self) {
	if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return self;
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		writable: true,
		configurable: true
	} });
	if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
	_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
var PersistGate = /*#__PURE__*/ function(_PureComponent) {
	_inherits(PersistGate, _PureComponent);
	function PersistGate() {
		var _getPrototypeOf2;
		var _this;
		_classCallCheck(this, PersistGate);
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		_this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PersistGate)).call.apply(_getPrototypeOf2, [this].concat(args)));
		_defineProperty(_assertThisInitialized(_this), "state", { bootstrapped: false });
		_defineProperty(_assertThisInitialized(_this), "_unsubscribe", void 0);
		_defineProperty(_assertThisInitialized(_this), "handlePersistorState", function() {
			if (_this.props.persistor.getState().bootstrapped) {
				if (_this.props.onBeforeLift) Promise.resolve(_this.props.onBeforeLift()).finally(function() {
					return _this.setState({ bootstrapped: true });
				});
				else _this.setState({ bootstrapped: true });
				_this._unsubscribe && _this._unsubscribe();
			}
		});
		return _this;
	}
	_createClass(PersistGate, [
		{
			key: "componentDidMount",
			value: function componentDidMount() {
				this._unsubscribe = this.props.persistor.subscribe(this.handlePersistorState);
				this.handlePersistorState();
			}
		},
		{
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				this._unsubscribe && this._unsubscribe();
			}
		},
		{
			key: "render",
			value: function render() {
				if (typeof this.props.children === "function") return this.props.children(this.state.bootstrapped);
				return this.state.bootstrapped ? this.props.children : this.props.loading;
			}
		}
	]);
	return PersistGate;
}(import_react.PureComponent);
_defineProperty(PersistGate, "defaultProps", {
	children: null,
	loading: null
});
//#endregion
export { PAUSE as a, REGISTER as c, FLUSH as i, REHYDRATE as l, persistStore as n, PERSIST as o, persistReducer as r, PURGE as s, PersistGate as t };
