import {
  __async,
  __objRest,
  __spreadProps,
  __spreadValues,
  __superGet
} from "./chunk-LJ4VCL4A.js";

// node_modules/jwt-decode/build/esm/index.js
var InvalidTokenError = class extends Error {
};
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
    let code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = "0" + code;
    }
    return "%" + code;
  }));
}
function base64UrlDecode(str) {
  let output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
}
function jwtDecode(token, options) {
  if (typeof token !== "string") {
    throw new InvalidTokenError("Invalid token specified: must be a string");
  }
  options || (options = {});
  const pos = options.header === true ? 0 : 1;
  const part = token.split(".")[pos];
  if (typeof part !== "string") {
    throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
  }
  let decoded;
  try {
    decoded = base64UrlDecode(part);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
  }
  try {
    return JSON.parse(decoded);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
  }
}

// node_modules/oidc-client-ts/dist/esm/oidc-client-ts.js
var nopLogger = {
  debug: () => void 0,
  info: () => void 0,
  warn: () => void 0,
  error: () => void 0
};
var level;
var logger;
var Log = ((Log2) => {
  Log2[Log2["NONE"] = 0] = "NONE";
  Log2[Log2["ERROR"] = 1] = "ERROR";
  Log2[Log2["WARN"] = 2] = "WARN";
  Log2[Log2["INFO"] = 3] = "INFO";
  Log2[Log2["DEBUG"] = 4] = "DEBUG";
  return Log2;
})(Log || {});
((Log2) => {
  function reset() {
    level = 3;
    logger = nopLogger;
  }
  Log2.reset = reset;
  function setLevel(value) {
    if (!(0 <= value && value <= 4)) {
      throw new Error("Invalid log level");
    }
    level = value;
  }
  Log2.setLevel = setLevel;
  function setLogger(value) {
    logger = value;
  }
  Log2.setLogger = setLogger;
})(Log || (Log = {}));
var Logger = class _Logger {
  constructor(_name) {
    this._name = _name;
  }
  /* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
  debug(...args) {
    if (level >= 4) {
      logger.debug(_Logger._format(this._name, this._method), ...args);
    }
  }
  info(...args) {
    if (level >= 3) {
      logger.info(_Logger._format(this._name, this._method), ...args);
    }
  }
  warn(...args) {
    if (level >= 2) {
      logger.warn(_Logger._format(this._name, this._method), ...args);
    }
  }
  error(...args) {
    if (level >= 1) {
      logger.error(_Logger._format(this._name, this._method), ...args);
    }
  }
  /* eslint-enable @typescript-eslint/no-unsafe-enum-comparison */
  throw(err) {
    this.error(err);
    throw err;
  }
  create(method) {
    const methodLogger = Object.create(this);
    methodLogger._method = method;
    methodLogger.debug("begin");
    return methodLogger;
  }
  static createStatic(name, staticMethod) {
    const staticLogger = new _Logger(`${name}.${staticMethod}`);
    staticLogger.debug("begin");
    return staticLogger;
  }
  static _format(name, method) {
    const prefix = `[${name}]`;
    return method ? `${prefix} ${method}:` : prefix;
  }
  /* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
  // helpers for static class methods
  static debug(name, ...args) {
    if (level >= 4) {
      logger.debug(_Logger._format(name), ...args);
    }
  }
  static info(name, ...args) {
    if (level >= 3) {
      logger.info(_Logger._format(name), ...args);
    }
  }
  static warn(name, ...args) {
    if (level >= 2) {
      logger.warn(_Logger._format(name), ...args);
    }
  }
  static error(name, ...args) {
    if (level >= 1) {
      logger.error(_Logger._format(name), ...args);
    }
  }
  /* eslint-enable @typescript-eslint/no-unsafe-enum-comparison */
};
Log.reset();
var UUID_V4_TEMPLATE = "10000000-1000-4000-8000-100000000000";
var toBase64 = (val) => btoa([...new Uint8Array(val)].map((chr) => String.fromCharCode(chr)).join(""));
var CryptoUtils = class _CryptoUtils {
  static _randomWord() {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0];
  }
  /**
   * Generates RFC4122 version 4 guid
   */
  static generateUUIDv4() {
    const uuid = UUID_V4_TEMPLATE.replace(
      /[018]/g,
      (c) => (+c ^ _CryptoUtils._randomWord() & 15 >> +c / 4).toString(16)
    );
    return uuid.replace(/-/g, "");
  }
  /**
   * PKCE: Generate a code verifier
   */
  static generateCodeVerifier() {
    return _CryptoUtils.generateUUIDv4() + _CryptoUtils.generateUUIDv4() + _CryptoUtils.generateUUIDv4();
  }
  /**
   * PKCE: Generate a code challenge
   */
  static generateCodeChallenge(code_verifier) {
    return __async(this, null, function* () {
      if (!crypto.subtle) {
        throw new Error("Crypto.subtle is available only in secure contexts (HTTPS).");
      }
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(code_verifier);
        const hashed = yield crypto.subtle.digest("SHA-256", data);
        return toBase64(hashed).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      } catch (err) {
        Logger.error("CryptoUtils.generateCodeChallenge", err);
        throw err;
      }
    });
  }
  /**
   * Generates a base64-encoded string for a basic auth header
   */
  static generateBasicAuth(client_id, client_secret) {
    const encoder = new TextEncoder();
    const data = encoder.encode([client_id, client_secret].join(":"));
    return toBase64(data);
  }
};
var Event = class {
  constructor(_name) {
    this._name = _name;
    this._logger = new Logger(`Event('${this._name}')`);
    this._callbacks = [];
  }
  addHandler(cb) {
    this._callbacks.push(cb);
    return () => this.removeHandler(cb);
  }
  removeHandler(cb) {
    const idx = this._callbacks.lastIndexOf(cb);
    if (idx >= 0) {
      this._callbacks.splice(idx, 1);
    }
  }
  raise(...ev) {
    return __async(this, null, function* () {
      this._logger.debug("raise:", ...ev);
      for (const cb of this._callbacks) {
        yield cb(...ev);
      }
    });
  }
};
var JwtUtils = class {
  // IMPORTANT: doesn't validate the token
  static decode(token) {
    try {
      return jwtDecode(token);
    } catch (err) {
      Logger.error("JwtUtils.decode", err);
      throw err;
    }
  }
};
var PopupUtils = class {
  /**
   * Populates a map of window features with a placement centered in front of
   * the current window. If no explicit width is given, a default value is
   * binned into [800, 720, 600, 480, 360] based on the current window's width.
   */
  static center(_a) {
    var features = __objRest(_a, []);
    var _a2, _b, _c;
    if (features.width == null)
      features.width = (_a2 = [800, 720, 600, 480].find((width) => width <= window.outerWidth / 1.618)) != null ? _a2 : 360;
    (_b = features.left) != null ? _b : features.left = Math.max(0, Math.round(window.screenX + (window.outerWidth - features.width) / 2));
    if (features.height != null)
      (_c = features.top) != null ? _c : features.top = Math.max(0, Math.round(window.screenY + (window.outerHeight - features.height) / 2));
    return features;
  }
  static serialize(features) {
    return Object.entries(features).filter(([, value]) => value != null).map(([key, value]) => `${key}=${typeof value !== "boolean" ? value : value ? "yes" : "no"}`).join(",");
  }
};
var Timer = class _Timer extends Event {
  constructor() {
    super(...arguments);
    this._logger = new Logger(`Timer('${this._name}')`);
    this._timerHandle = null;
    this._expiration = 0;
    this._callback = () => {
      const diff = this._expiration - _Timer.getEpochTime();
      this._logger.debug("timer completes in", diff);
      if (this._expiration <= _Timer.getEpochTime()) {
        this.cancel();
        void super.raise();
      }
    };
  }
  // get the time
  static getEpochTime() {
    return Math.floor(Date.now() / 1e3);
  }
  init(durationInSeconds) {
    const logger2 = this._logger.create("init");
    durationInSeconds = Math.max(Math.floor(durationInSeconds), 1);
    const expiration = _Timer.getEpochTime() + durationInSeconds;
    if (this.expiration === expiration && this._timerHandle) {
      logger2.debug("skipping since already initialized for expiration at", this.expiration);
      return;
    }
    this.cancel();
    logger2.debug("using duration", durationInSeconds);
    this._expiration = expiration;
    const timerDurationInSeconds = Math.min(durationInSeconds, 5);
    this._timerHandle = setInterval(this._callback, timerDurationInSeconds * 1e3);
  }
  get expiration() {
    return this._expiration;
  }
  cancel() {
    this._logger.create("cancel");
    if (this._timerHandle) {
      clearInterval(this._timerHandle);
      this._timerHandle = null;
    }
  }
};
var UrlUtils = class {
  static readParams(url, responseMode = "query") {
    if (!url)
      throw new TypeError("Invalid URL");
    const parsedUrl = new URL(url, "http://127.0.0.1");
    const params = parsedUrl[responseMode === "fragment" ? "hash" : "search"];
    return new URLSearchParams(params.slice(1));
  }
};
var URL_STATE_DELIMITER = ";";
var ErrorResponse = class extends Error {
  constructor(args, form) {
    var _a, _b, _c;
    super(args.error_description || args.error || "");
    this.form = form;
    this.name = "ErrorResponse";
    if (!args.error) {
      Logger.error("ErrorResponse", "No error passed");
      throw new Error("No error passed");
    }
    this.error = args.error;
    this.error_description = (_a = args.error_description) != null ? _a : null;
    this.error_uri = (_b = args.error_uri) != null ? _b : null;
    this.state = args.userState;
    this.session_state = (_c = args.session_state) != null ? _c : null;
    this.url_state = args.url_state;
  }
};
var ErrorTimeout = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ErrorTimeout";
  }
};
var AccessTokenEvents = class {
  constructor(args) {
    this._logger = new Logger("AccessTokenEvents");
    this._expiringTimer = new Timer("Access token expiring");
    this._expiredTimer = new Timer("Access token expired");
    this._expiringNotificationTimeInSeconds = args.expiringNotificationTimeInSeconds;
  }
  load(container) {
    const logger2 = this._logger.create("load");
    if (container.access_token && container.expires_in !== void 0) {
      const duration = container.expires_in;
      logger2.debug("access token present, remaining duration:", duration);
      if (duration > 0) {
        let expiring = duration - this._expiringNotificationTimeInSeconds;
        if (expiring <= 0) {
          expiring = 1;
        }
        logger2.debug("registering expiring timer, raising in", expiring, "seconds");
        this._expiringTimer.init(expiring);
      } else {
        logger2.debug("canceling existing expiring timer because we're past expiration.");
        this._expiringTimer.cancel();
      }
      const expired = duration + 1;
      logger2.debug("registering expired timer, raising in", expired, "seconds");
      this._expiredTimer.init(expired);
    } else {
      this._expiringTimer.cancel();
      this._expiredTimer.cancel();
    }
  }
  unload() {
    this._logger.debug("unload: canceling existing access token timers");
    this._expiringTimer.cancel();
    this._expiredTimer.cancel();
  }
  /**
   * Add callback: Raised prior to the access token expiring.
   */
  addAccessTokenExpiring(cb) {
    return this._expiringTimer.addHandler(cb);
  }
  /**
   * Remove callback: Raised prior to the access token expiring.
   */
  removeAccessTokenExpiring(cb) {
    this._expiringTimer.removeHandler(cb);
  }
  /**
   * Add callback: Raised after the access token has expired.
   */
  addAccessTokenExpired(cb) {
    return this._expiredTimer.addHandler(cb);
  }
  /**
   * Remove callback: Raised after the access token has expired.
   */
  removeAccessTokenExpired(cb) {
    this._expiredTimer.removeHandler(cb);
  }
};
var CheckSessionIFrame = class {
  constructor(_callback, _client_id, url, _intervalInSeconds, _stopOnError) {
    this._callback = _callback;
    this._client_id = _client_id;
    this._intervalInSeconds = _intervalInSeconds;
    this._stopOnError = _stopOnError;
    this._logger = new Logger("CheckSessionIFrame");
    this._timer = null;
    this._session_state = null;
    this._message = (e) => {
      if (e.origin === this._frame_origin && e.source === this._frame.contentWindow) {
        if (e.data === "error") {
          this._logger.error("error message from check session op iframe");
          if (this._stopOnError) {
            this.stop();
          }
        } else if (e.data === "changed") {
          this._logger.debug("changed message from check session op iframe");
          this.stop();
          void this._callback();
        } else {
          this._logger.debug(e.data + " message from check session op iframe");
        }
      }
    };
    const parsedUrl = new URL(url);
    this._frame_origin = parsedUrl.origin;
    this._frame = window.document.createElement("iframe");
    this._frame.style.visibility = "hidden";
    this._frame.style.position = "fixed";
    this._frame.style.left = "-1000px";
    this._frame.style.top = "0";
    this._frame.width = "0";
    this._frame.height = "0";
    this._frame.src = parsedUrl.href;
  }
  load() {
    return new Promise((resolve) => {
      this._frame.onload = () => {
        resolve();
      };
      window.document.body.appendChild(this._frame);
      window.addEventListener("message", this._message, false);
    });
  }
  start(session_state) {
    if (this._session_state === session_state) {
      return;
    }
    this._logger.create("start");
    this.stop();
    this._session_state = session_state;
    const send = () => {
      if (!this._frame.contentWindow || !this._session_state) {
        return;
      }
      this._frame.contentWindow.postMessage(this._client_id + " " + this._session_state, this._frame_origin);
    };
    send();
    this._timer = setInterval(send, this._intervalInSeconds * 1e3);
  }
  stop() {
    this._logger.create("stop");
    this._session_state = null;
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }
};
var InMemoryWebStorage = class {
  constructor() {
    this._logger = new Logger("InMemoryWebStorage");
    this._data = {};
  }
  clear() {
    this._logger.create("clear");
    this._data = {};
  }
  getItem(key) {
    this._logger.create(`getItem('${key}')`);
    return this._data[key];
  }
  setItem(key, value) {
    this._logger.create(`setItem('${key}')`);
    this._data[key] = value;
  }
  removeItem(key) {
    this._logger.create(`removeItem('${key}')`);
    delete this._data[key];
  }
  get length() {
    return Object.getOwnPropertyNames(this._data).length;
  }
  key(index) {
    return Object.getOwnPropertyNames(this._data)[index];
  }
};
var JsonService = class {
  constructor(additionalContentTypes = [], _jwtHandler = null, _extraHeaders = {}) {
    this._jwtHandler = _jwtHandler;
    this._extraHeaders = _extraHeaders;
    this._logger = new Logger("JsonService");
    this._contentTypes = [];
    this._contentTypes.push(...additionalContentTypes, "application/json");
    if (_jwtHandler) {
      this._contentTypes.push("application/jwt");
    }
  }
  fetchWithTimeout(_0) {
    return __async(this, arguments, function* (input, init = {}) {
      const _a = init, { timeoutInSeconds } = _a, initFetch = __objRest(_a, ["timeoutInSeconds"]);
      if (!timeoutInSeconds) {
        return yield fetch(input, initFetch);
      }
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutInSeconds * 1e3);
      try {
        const response = yield fetch(input, __spreadProps(__spreadValues({}, init), {
          signal: controller.signal
        }));
        return response;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          throw new ErrorTimeout("Network timed out");
        }
        throw err;
      } finally {
        clearTimeout(timeoutId);
      }
    });
  }
  getJson(_0) {
    return __async(this, arguments, function* (url, {
      token,
      credentials
    } = {}) {
      const logger2 = this._logger.create("getJson");
      const headers = {
        "Accept": this._contentTypes.join(", ")
      };
      if (token) {
        logger2.debug("token passed, setting Authorization header");
        headers["Authorization"] = "Bearer " + token;
      }
      this.appendExtraHeaders(headers);
      let response;
      try {
        logger2.debug("url:", url);
        response = yield this.fetchWithTimeout(url, { method: "GET", headers, credentials });
      } catch (err) {
        logger2.error("Network Error");
        throw err;
      }
      logger2.debug("HTTP response received, status", response.status);
      const contentType = response.headers.get("Content-Type");
      if (contentType && !this._contentTypes.find((item) => contentType.startsWith(item))) {
        logger2.throw(new Error(`Invalid response Content-Type: ${contentType != null ? contentType : "undefined"}, from URL: ${url}`));
      }
      if (response.ok && this._jwtHandler && (contentType == null ? void 0 : contentType.startsWith("application/jwt"))) {
        return yield this._jwtHandler(yield response.text());
      }
      let json;
      try {
        json = yield response.json();
      } catch (err) {
        logger2.error("Error parsing JSON response", err);
        if (response.ok)
          throw err;
        throw new Error(`${response.statusText} (${response.status})`);
      }
      if (!response.ok) {
        logger2.error("Error from server:", json);
        if (json.error) {
          throw new ErrorResponse(json);
        }
        throw new Error(`${response.statusText} (${response.status}): ${JSON.stringify(json)}`);
      }
      return json;
    });
  }
  postForm(_0, _1) {
    return __async(this, arguments, function* (url, {
      body,
      basicAuth,
      timeoutInSeconds,
      initCredentials
    }) {
      const logger2 = this._logger.create("postForm");
      const headers = {
        "Accept": this._contentTypes.join(", "),
        "Content-Type": "application/x-www-form-urlencoded"
      };
      if (basicAuth !== void 0) {
        headers["Authorization"] = "Basic " + basicAuth;
      }
      this.appendExtraHeaders(headers);
      let response;
      try {
        logger2.debug("url:", url);
        response = yield this.fetchWithTimeout(url, { method: "POST", headers, body, timeoutInSeconds, credentials: initCredentials });
      } catch (err) {
        logger2.error("Network error");
        throw err;
      }
      logger2.debug("HTTP response received, status", response.status);
      const contentType = response.headers.get("Content-Type");
      if (contentType && !this._contentTypes.find((item) => contentType.startsWith(item))) {
        throw new Error(`Invalid response Content-Type: ${contentType != null ? contentType : "undefined"}, from URL: ${url}`);
      }
      const responseText = yield response.text();
      let json = {};
      if (responseText) {
        try {
          json = JSON.parse(responseText);
        } catch (err) {
          logger2.error("Error parsing JSON response", err);
          if (response.ok)
            throw err;
          throw new Error(`${response.statusText} (${response.status})`);
        }
      }
      if (!response.ok) {
        logger2.error("Error from server:", json);
        if (json.error) {
          throw new ErrorResponse(json, body);
        }
        throw new Error(`${response.statusText} (${response.status}): ${JSON.stringify(json)}`);
      }
      return json;
    });
  }
  appendExtraHeaders(headers) {
    const logger2 = this._logger.create("appendExtraHeaders");
    const customKeys = Object.keys(this._extraHeaders);
    const protectedHeaders = [
      "authorization",
      "accept",
      "content-type"
    ];
    if (customKeys.length === 0) {
      return;
    }
    customKeys.forEach((headerName) => {
      if (protectedHeaders.includes(headerName.toLocaleLowerCase())) {
        logger2.warn("Protected header could not be overridden", headerName, protectedHeaders);
        return;
      }
      const content = typeof this._extraHeaders[headerName] === "function" ? this._extraHeaders[headerName]() : this._extraHeaders[headerName];
      if (content && content !== "") {
        headers[headerName] = content;
      }
    });
  }
};
var MetadataService = class {
  constructor(_settings) {
    this._settings = _settings;
    this._logger = new Logger("MetadataService");
    this._signingKeys = null;
    this._metadata = null;
    this._metadataUrl = this._settings.metadataUrl;
    this._jsonService = new JsonService(
      ["application/jwk-set+json"],
      null,
      this._settings.extraHeaders
    );
    if (this._settings.signingKeys) {
      this._logger.debug("using signingKeys from settings");
      this._signingKeys = this._settings.signingKeys;
    }
    if (this._settings.metadata) {
      this._logger.debug("using metadata from settings");
      this._metadata = this._settings.metadata;
    }
    if (this._settings.fetchRequestCredentials) {
      this._logger.debug("using fetchRequestCredentials from settings");
      this._fetchRequestCredentials = this._settings.fetchRequestCredentials;
    }
  }
  resetSigningKeys() {
    this._signingKeys = null;
  }
  getMetadata() {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("getMetadata");
      if (this._metadata) {
        logger2.debug("using cached values");
        return this._metadata;
      }
      if (!this._metadataUrl) {
        logger2.throw(new Error("No authority or metadataUrl configured on settings"));
        throw null;
      }
      logger2.debug("getting metadata from", this._metadataUrl);
      const metadata = yield this._jsonService.getJson(this._metadataUrl, { credentials: this._fetchRequestCredentials });
      logger2.debug("merging remote JSON with seed metadata");
      this._metadata = Object.assign({}, this._settings.metadataSeed, metadata);
      return this._metadata;
    });
  }
  getIssuer() {
    return this._getMetadataProperty("issuer");
  }
  getAuthorizationEndpoint() {
    return this._getMetadataProperty("authorization_endpoint");
  }
  getUserInfoEndpoint() {
    return this._getMetadataProperty("userinfo_endpoint");
  }
  getTokenEndpoint(optional = true) {
    return this._getMetadataProperty("token_endpoint", optional);
  }
  getCheckSessionIframe() {
    return this._getMetadataProperty("check_session_iframe", true);
  }
  getEndSessionEndpoint() {
    return this._getMetadataProperty("end_session_endpoint", true);
  }
  getRevocationEndpoint(optional = true) {
    return this._getMetadataProperty("revocation_endpoint", optional);
  }
  getKeysEndpoint(optional = true) {
    return this._getMetadataProperty("jwks_uri", optional);
  }
  _getMetadataProperty(name, optional = false) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create(`_getMetadataProperty('${name}')`);
      const metadata = yield this.getMetadata();
      logger2.debug("resolved");
      if (metadata[name] === void 0) {
        if (optional === true) {
          logger2.warn("Metadata does not contain optional property");
          return void 0;
        }
        logger2.throw(new Error("Metadata does not contain property " + name));
      }
      return metadata[name];
    });
  }
  getSigningKeys() {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("getSigningKeys");
      if (this._signingKeys) {
        logger2.debug("returning signingKeys from cache");
        return this._signingKeys;
      }
      const jwks_uri = yield this.getKeysEndpoint(false);
      logger2.debug("got jwks_uri", jwks_uri);
      const keySet = yield this._jsonService.getJson(jwks_uri);
      logger2.debug("got key set", keySet);
      if (!Array.isArray(keySet.keys)) {
        logger2.throw(new Error("Missing keys on keyset"));
        throw null;
      }
      this._signingKeys = keySet.keys;
      return this._signingKeys;
    });
  }
};
var WebStorageStateStore = class {
  constructor({
    prefix = "oidc.",
    store = localStorage
  } = {}) {
    this._logger = new Logger("WebStorageStateStore");
    this._store = store;
    this._prefix = prefix;
  }
  set(key, value) {
    return __async(this, null, function* () {
      this._logger.create(`set('${key}')`);
      key = this._prefix + key;
      yield this._store.setItem(key, value);
    });
  }
  get(key) {
    return __async(this, null, function* () {
      this._logger.create(`get('${key}')`);
      key = this._prefix + key;
      const item = yield this._store.getItem(key);
      return item;
    });
  }
  remove(key) {
    return __async(this, null, function* () {
      this._logger.create(`remove('${key}')`);
      key = this._prefix + key;
      const item = yield this._store.getItem(key);
      yield this._store.removeItem(key);
      return item;
    });
  }
  getAllKeys() {
    return __async(this, null, function* () {
      this._logger.create("getAllKeys");
      const len = yield this._store.length;
      const keys = [];
      for (let index = 0; index < len; index++) {
        const key = yield this._store.key(index);
        if (key && key.indexOf(this._prefix) === 0) {
          keys.push(key.substr(this._prefix.length));
        }
      }
      return keys;
    });
  }
};
var DefaultResponseType = "code";
var DefaultScope = "openid";
var DefaultClientAuthentication = "client_secret_post";
var DefaultStaleStateAgeInSeconds = 60 * 15;
var OidcClientSettingsStore = class {
  constructor({
    // metadata related
    authority,
    metadataUrl,
    metadata,
    signingKeys,
    metadataSeed,
    // client related
    client_id,
    client_secret,
    response_type = DefaultResponseType,
    scope = DefaultScope,
    redirect_uri,
    post_logout_redirect_uri,
    client_authentication = DefaultClientAuthentication,
    // optional protocol
    prompt,
    display,
    max_age,
    ui_locales,
    acr_values,
    resource,
    response_mode,
    // behavior flags
    filterProtocolClaims = true,
    loadUserInfo = false,
    staleStateAgeInSeconds = DefaultStaleStateAgeInSeconds,
    mergeClaimsStrategy = { array: "replace" },
    disablePKCE = false,
    // other behavior
    stateStore,
    revokeTokenAdditionalContentTypes,
    fetchRequestCredentials,
    refreshTokenAllowedScope,
    // extra
    extraQueryParams = {},
    extraTokenParams = {},
    extraHeaders = {}
  }) {
    this.authority = authority;
    if (metadataUrl) {
      this.metadataUrl = metadataUrl;
    } else {
      this.metadataUrl = authority;
      if (authority) {
        if (!this.metadataUrl.endsWith("/")) {
          this.metadataUrl += "/";
        }
        this.metadataUrl += ".well-known/openid-configuration";
      }
    }
    this.metadata = metadata;
    this.metadataSeed = metadataSeed;
    this.signingKeys = signingKeys;
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.response_type = response_type;
    this.scope = scope;
    this.redirect_uri = redirect_uri;
    this.post_logout_redirect_uri = post_logout_redirect_uri;
    this.client_authentication = client_authentication;
    this.prompt = prompt;
    this.display = display;
    this.max_age = max_age;
    this.ui_locales = ui_locales;
    this.acr_values = acr_values;
    this.resource = resource;
    this.response_mode = response_mode;
    this.filterProtocolClaims = filterProtocolClaims != null ? filterProtocolClaims : true;
    this.loadUserInfo = !!loadUserInfo;
    this.staleStateAgeInSeconds = staleStateAgeInSeconds;
    this.mergeClaimsStrategy = mergeClaimsStrategy;
    this.disablePKCE = !!disablePKCE;
    this.revokeTokenAdditionalContentTypes = revokeTokenAdditionalContentTypes;
    this.fetchRequestCredentials = fetchRequestCredentials ? fetchRequestCredentials : "same-origin";
    if (stateStore) {
      this.stateStore = stateStore;
    } else {
      const store = typeof window !== "undefined" ? window.localStorage : new InMemoryWebStorage();
      this.stateStore = new WebStorageStateStore({ store });
    }
    this.refreshTokenAllowedScope = refreshTokenAllowedScope;
    this.extraQueryParams = extraQueryParams;
    this.extraTokenParams = extraTokenParams;
    this.extraHeaders = extraHeaders;
  }
};
var UserInfoService = class {
  constructor(_settings, _metadataService) {
    this._settings = _settings;
    this._metadataService = _metadataService;
    this._logger = new Logger("UserInfoService");
    this._getClaimsFromJwt = (responseText) => __async(this, null, function* () {
      const logger2 = this._logger.create("_getClaimsFromJwt");
      try {
        const payload = JwtUtils.decode(responseText);
        logger2.debug("JWT decoding successful");
        return payload;
      } catch (err) {
        logger2.error("Error parsing JWT response");
        throw err;
      }
    });
    this._jsonService = new JsonService(
      void 0,
      this._getClaimsFromJwt,
      this._settings.extraHeaders
    );
  }
  getClaims(token) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("getClaims");
      if (!token) {
        this._logger.throw(new Error("No token passed"));
      }
      const url = yield this._metadataService.getUserInfoEndpoint();
      logger2.debug("got userinfo url", url);
      const claims = yield this._jsonService.getJson(url, {
        token,
        credentials: this._settings.fetchRequestCredentials
      });
      logger2.debug("got claims", claims);
      return claims;
    });
  }
};
var TokenClient = class {
  constructor(_settings, _metadataService) {
    this._settings = _settings;
    this._metadataService = _metadataService;
    this._logger = new Logger("TokenClient");
    this._jsonService = new JsonService(
      this._settings.revokeTokenAdditionalContentTypes,
      null,
      this._settings.extraHeaders
    );
  }
  /**
   * Exchange code.
   *
   * @see https://www.rfc-editor.org/rfc/rfc6749#section-4.1.3
   */
  exchangeCode(_a) {
    return __async(this, null, function* () {
      var _b = _a, {
        grant_type = "authorization_code",
        redirect_uri = this._settings.redirect_uri,
        client_id = this._settings.client_id,
        client_secret = this._settings.client_secret
      } = _b, args = __objRest(_b, [
        "grant_type",
        "redirect_uri",
        "client_id",
        "client_secret"
      ]);
      const logger2 = this._logger.create("exchangeCode");
      if (!client_id) {
        logger2.throw(new Error("A client_id is required"));
      }
      if (!redirect_uri) {
        logger2.throw(new Error("A redirect_uri is required"));
      }
      if (!args.code) {
        logger2.throw(new Error("A code is required"));
      }
      const params = new URLSearchParams({ grant_type, redirect_uri });
      for (const [key, value] of Object.entries(args)) {
        if (value != null) {
          params.set(key, value);
        }
      }
      let basicAuth;
      switch (this._settings.client_authentication) {
        case "client_secret_basic":
          if (!client_secret) {
            logger2.throw(new Error("A client_secret is required"));
            throw null;
          }
          basicAuth = CryptoUtils.generateBasicAuth(client_id, client_secret);
          break;
        case "client_secret_post":
          params.append("client_id", client_id);
          if (client_secret) {
            params.append("client_secret", client_secret);
          }
          break;
      }
      const url = yield this._metadataService.getTokenEndpoint(false);
      logger2.debug("got token endpoint");
      const response = yield this._jsonService.postForm(url, { body: params, basicAuth, initCredentials: this._settings.fetchRequestCredentials });
      logger2.debug("got response");
      return response;
    });
  }
  /**
   * Exchange credentials.
   *
   * @see https://www.rfc-editor.org/rfc/rfc6749#section-4.3.2
   */
  exchangeCredentials(_c) {
    return __async(this, null, function* () {
      var _d = _c, {
        grant_type = "password",
        client_id = this._settings.client_id,
        client_secret = this._settings.client_secret,
        scope = this._settings.scope
      } = _d, args = __objRest(_d, [
        "grant_type",
        "client_id",
        "client_secret",
        "scope"
      ]);
      const logger2 = this._logger.create("exchangeCredentials");
      if (!client_id) {
        logger2.throw(new Error("A client_id is required"));
      }
      const params = new URLSearchParams({ grant_type, scope });
      for (const [key, value] of Object.entries(args)) {
        if (value != null) {
          params.set(key, value);
        }
      }
      let basicAuth;
      switch (this._settings.client_authentication) {
        case "client_secret_basic":
          if (!client_secret) {
            logger2.throw(new Error("A client_secret is required"));
            throw null;
          }
          basicAuth = CryptoUtils.generateBasicAuth(client_id, client_secret);
          break;
        case "client_secret_post":
          params.append("client_id", client_id);
          if (client_secret) {
            params.append("client_secret", client_secret);
          }
          break;
      }
      const url = yield this._metadataService.getTokenEndpoint(false);
      logger2.debug("got token endpoint");
      const response = yield this._jsonService.postForm(url, { body: params, basicAuth, initCredentials: this._settings.fetchRequestCredentials });
      logger2.debug("got response");
      return response;
    });
  }
  /**
   * Exchange a refresh token.
   *
   * @see https://www.rfc-editor.org/rfc/rfc6749#section-6
   */
  exchangeRefreshToken(_e) {
    return __async(this, null, function* () {
      var _f = _e, {
        grant_type = "refresh_token",
        client_id = this._settings.client_id,
        client_secret = this._settings.client_secret,
        timeoutInSeconds
      } = _f, args = __objRest(_f, [
        "grant_type",
        "client_id",
        "client_secret",
        "timeoutInSeconds"
      ]);
      const logger2 = this._logger.create("exchangeRefreshToken");
      if (!client_id) {
        logger2.throw(new Error("A client_id is required"));
      }
      if (!args.refresh_token) {
        logger2.throw(new Error("A refresh_token is required"));
      }
      const params = new URLSearchParams({ grant_type });
      for (const [key, value] of Object.entries(args)) {
        if (Array.isArray(value)) {
          value.forEach((param) => params.append(key, param));
        } else if (value != null) {
          params.set(key, value);
        }
      }
      let basicAuth;
      switch (this._settings.client_authentication) {
        case "client_secret_basic":
          if (!client_secret) {
            logger2.throw(new Error("A client_secret is required"));
            throw null;
          }
          basicAuth = CryptoUtils.generateBasicAuth(client_id, client_secret);
          break;
        case "client_secret_post":
          params.append("client_id", client_id);
          if (client_secret) {
            params.append("client_secret", client_secret);
          }
          break;
      }
      const url = yield this._metadataService.getTokenEndpoint(false);
      logger2.debug("got token endpoint");
      const response = yield this._jsonService.postForm(url, { body: params, basicAuth, timeoutInSeconds, initCredentials: this._settings.fetchRequestCredentials });
      logger2.debug("got response");
      return response;
    });
  }
  /**
   * Revoke an access or refresh token.
   *
   * @see https://datatracker.ietf.org/doc/html/rfc7009#section-2.1
   */
  revoke(args) {
    return __async(this, null, function* () {
      var _a;
      const logger2 = this._logger.create("revoke");
      if (!args.token) {
        logger2.throw(new Error("A token is required"));
      }
      const url = yield this._metadataService.getRevocationEndpoint(false);
      logger2.debug(`got revocation endpoint, revoking ${(_a = args.token_type_hint) != null ? _a : "default token type"}`);
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(args)) {
        if (value != null) {
          params.set(key, value);
        }
      }
      params.set("client_id", this._settings.client_id);
      if (this._settings.client_secret) {
        params.set("client_secret", this._settings.client_secret);
      }
      yield this._jsonService.postForm(url, { body: params });
      logger2.debug("got response");
    });
  }
};
var ResponseValidator = class {
  constructor(_settings, _metadataService, _claimsService) {
    this._settings = _settings;
    this._metadataService = _metadataService;
    this._claimsService = _claimsService;
    this._logger = new Logger("ResponseValidator");
    this._userInfoService = new UserInfoService(this._settings, this._metadataService);
    this._tokenClient = new TokenClient(this._settings, this._metadataService);
  }
  validateSigninResponse(response, state) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("validateSigninResponse");
      this._processSigninState(response, state);
      logger2.debug("state processed");
      yield this._processCode(response, state);
      logger2.debug("code processed");
      if (response.isOpenId) {
        this._validateIdTokenAttributes(response);
      }
      logger2.debug("tokens validated");
      yield this._processClaims(response, state == null ? void 0 : state.skipUserInfo, response.isOpenId);
      logger2.debug("claims processed");
    });
  }
  validateCredentialsResponse(response, skipUserInfo) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("validateCredentialsResponse");
      if (response.isOpenId && !!response.id_token) {
        this._validateIdTokenAttributes(response);
      }
      logger2.debug("tokens validated");
      yield this._processClaims(response, skipUserInfo, response.isOpenId);
      logger2.debug("claims processed");
    });
  }
  validateRefreshResponse(response, state) {
    return __async(this, null, function* () {
      var _a, _b;
      const logger2 = this._logger.create("validateRefreshResponse");
      response.userState = state.data;
      (_a = response.session_state) != null ? _a : response.session_state = state.session_state;
      (_b = response.scope) != null ? _b : response.scope = state.scope;
      if (response.isOpenId && !!response.id_token) {
        this._validateIdTokenAttributes(response, state.id_token);
        logger2.debug("ID Token validated");
      }
      if (!response.id_token) {
        response.id_token = state.id_token;
        response.profile = state.profile;
      }
      const hasIdToken = response.isOpenId && !!response.id_token;
      yield this._processClaims(response, false, hasIdToken);
      logger2.debug("claims processed");
    });
  }
  validateSignoutResponse(response, state) {
    const logger2 = this._logger.create("validateSignoutResponse");
    if (state.id !== response.state) {
      logger2.throw(new Error("State does not match"));
    }
    logger2.debug("state validated");
    response.userState = state.data;
    if (response.error) {
      logger2.warn("Response was error", response.error);
      throw new ErrorResponse(response);
    }
  }
  _processSigninState(response, state) {
    var _a;
    const logger2 = this._logger.create("_processSigninState");
    if (state.id !== response.state) {
      logger2.throw(new Error("State does not match"));
    }
    if (!state.client_id) {
      logger2.throw(new Error("No client_id on state"));
    }
    if (!state.authority) {
      logger2.throw(new Error("No authority on state"));
    }
    if (this._settings.authority !== state.authority) {
      logger2.throw(new Error("authority mismatch on settings vs. signin state"));
    }
    if (this._settings.client_id && this._settings.client_id !== state.client_id) {
      logger2.throw(new Error("client_id mismatch on settings vs. signin state"));
    }
    logger2.debug("state validated");
    response.userState = state.data;
    response.url_state = state.url_state;
    (_a = response.scope) != null ? _a : response.scope = state.scope;
    if (response.error) {
      logger2.warn("Response was error", response.error);
      throw new ErrorResponse(response);
    }
    if (state.code_verifier && !response.code) {
      logger2.throw(new Error("Expected code in response"));
    }
  }
  _processClaims(response, skipUserInfo = false, validateSub = true) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("_processClaims");
      response.profile = this._claimsService.filterProtocolClaims(response.profile);
      if (skipUserInfo || !this._settings.loadUserInfo || !response.access_token) {
        logger2.debug("not loading user info");
        return;
      }
      logger2.debug("loading user info");
      const claims = yield this._userInfoService.getClaims(response.access_token);
      logger2.debug("user info claims received from user info endpoint");
      if (validateSub && claims.sub !== response.profile.sub) {
        logger2.throw(new Error("subject from UserInfo response does not match subject in ID Token"));
      }
      response.profile = this._claimsService.mergeClaims(response.profile, this._claimsService.filterProtocolClaims(claims));
      logger2.debug("user info claims received, updated profile:", response.profile);
    });
  }
  _processCode(response, state) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("_processCode");
      if (response.code) {
        logger2.debug("Validating code");
        const tokenResponse = yield this._tokenClient.exchangeCode(__spreadValues({
          client_id: state.client_id,
          client_secret: state.client_secret,
          code: response.code,
          redirect_uri: state.redirect_uri,
          code_verifier: state.code_verifier
        }, state.extraTokenParams));
        Object.assign(response, tokenResponse);
      } else {
        logger2.debug("No code to process");
      }
    });
  }
  _validateIdTokenAttributes(response, existingToken) {
    var _a;
    const logger2 = this._logger.create("_validateIdTokenAttributes");
    logger2.debug("decoding ID Token JWT");
    const incoming = JwtUtils.decode((_a = response.id_token) != null ? _a : "");
    if (!incoming.sub) {
      logger2.throw(new Error("ID Token is missing a subject claim"));
    }
    if (existingToken) {
      const existing = JwtUtils.decode(existingToken);
      if (incoming.sub !== existing.sub) {
        logger2.throw(new Error("sub in id_token does not match current sub"));
      }
      if (incoming.auth_time && incoming.auth_time !== existing.auth_time) {
        logger2.throw(new Error("auth_time in id_token does not match original auth_time"));
      }
      if (incoming.azp && incoming.azp !== existing.azp) {
        logger2.throw(new Error("azp in id_token does not match original azp"));
      }
      if (!incoming.azp && existing.azp) {
        logger2.throw(new Error("azp not in id_token, but present in original id_token"));
      }
    }
    response.profile = incoming;
  }
};
var State = class _State {
  constructor(args) {
    this.id = args.id || CryptoUtils.generateUUIDv4();
    this.data = args.data;
    if (args.created && args.created > 0) {
      this.created = args.created;
    } else {
      this.created = Timer.getEpochTime();
    }
    this.request_type = args.request_type;
    this.url_state = args.url_state;
  }
  toStorageString() {
    new Logger("State").create("toStorageString");
    return JSON.stringify({
      id: this.id,
      data: this.data,
      created: this.created,
      request_type: this.request_type,
      url_state: this.url_state
    });
  }
  static fromStorageString(storageString) {
    Logger.createStatic("State", "fromStorageString");
    return Promise.resolve(new _State(JSON.parse(storageString)));
  }
  static clearStaleState(storage, age) {
    return __async(this, null, function* () {
      const logger2 = Logger.createStatic("State", "clearStaleState");
      const cutoff = Timer.getEpochTime() - age;
      const keys = yield storage.getAllKeys();
      logger2.debug("got keys", keys);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const item = yield storage.get(key);
        let remove = false;
        if (item) {
          try {
            const state = yield _State.fromStorageString(item);
            logger2.debug("got item from key:", key, state.created);
            if (state.created <= cutoff) {
              remove = true;
            }
          } catch (err) {
            logger2.error("Error parsing state for key:", key, err);
            remove = true;
          }
        } else {
          logger2.debug("no item in storage for key:", key);
          remove = true;
        }
        if (remove) {
          logger2.debug("removed item for key:", key);
          void storage.remove(key);
        }
      }
    });
  }
};
var SigninState = class _SigninState extends State {
  constructor(args) {
    super(args);
    this.code_verifier = args.code_verifier;
    this.code_challenge = args.code_challenge;
    this.authority = args.authority;
    this.client_id = args.client_id;
    this.redirect_uri = args.redirect_uri;
    this.scope = args.scope;
    this.client_secret = args.client_secret;
    this.extraTokenParams = args.extraTokenParams;
    this.response_mode = args.response_mode;
    this.skipUserInfo = args.skipUserInfo;
  }
  static create(args) {
    return __async(this, null, function* () {
      const code_verifier = args.code_verifier === true ? CryptoUtils.generateCodeVerifier() : args.code_verifier || void 0;
      const code_challenge = code_verifier ? yield CryptoUtils.generateCodeChallenge(code_verifier) : void 0;
      return new _SigninState(__spreadProps(__spreadValues({}, args), {
        code_verifier,
        code_challenge
      }));
    });
  }
  toStorageString() {
    new Logger("SigninState").create("toStorageString");
    return JSON.stringify({
      id: this.id,
      data: this.data,
      created: this.created,
      request_type: this.request_type,
      url_state: this.url_state,
      code_verifier: this.code_verifier,
      authority: this.authority,
      client_id: this.client_id,
      redirect_uri: this.redirect_uri,
      scope: this.scope,
      client_secret: this.client_secret,
      extraTokenParams: this.extraTokenParams,
      response_mode: this.response_mode,
      skipUserInfo: this.skipUserInfo
    });
  }
  static fromStorageString(storageString) {
    Logger.createStatic("SigninState", "fromStorageString");
    const data = JSON.parse(storageString);
    return _SigninState.create(data);
  }
};
var _SigninRequest = class _SigninRequest2 {
  constructor(args) {
    this.url = args.url;
    this.state = args.state;
  }
  static create(_a) {
    return __async(this, null, function* () {
      var _b = _a, {
        url: url,
        authority,
        client_id,
        redirect_uri,
        response_type,
        scope,
        state_data: state_data,
        response_mode,
        request_type,
        client_secret,
        nonce,
        url_state,
        resource,
        skipUserInfo,
        extraQueryParams,
        extraTokenParams,
        disablePKCE
      } = _b, optionalParams = __objRest(_b, [
        // mandatory
        "url",
        "authority",
        "client_id",
        "redirect_uri",
        "response_type",
        "scope",
        // optional
        "state_data",
        "response_mode",
        "request_type",
        "client_secret",
        "nonce",
        "url_state",
        "resource",
        "skipUserInfo",
        "extraQueryParams",
        "extraTokenParams",
        "disablePKCE"
      ]);
      if (!url) {
        this._logger.error("create: No url passed");
        throw new Error("url");
      }
      if (!client_id) {
        this._logger.error("create: No client_id passed");
        throw new Error("client_id");
      }
      if (!redirect_uri) {
        this._logger.error("create: No redirect_uri passed");
        throw new Error("redirect_uri");
      }
      if (!response_type) {
        this._logger.error("create: No response_type passed");
        throw new Error("response_type");
      }
      if (!scope) {
        this._logger.error("create: No scope passed");
        throw new Error("scope");
      }
      if (!authority) {
        this._logger.error("create: No authority passed");
        throw new Error("authority");
      }
      const state = yield SigninState.create({
        data: state_data,
        request_type,
        url_state,
        code_verifier: !disablePKCE,
        client_id,
        authority,
        redirect_uri,
        response_mode,
        client_secret,
        scope,
        extraTokenParams,
        skipUserInfo
      });
      const parsedUrl = new URL(url);
      parsedUrl.searchParams.append("client_id", client_id);
      parsedUrl.searchParams.append("redirect_uri", redirect_uri);
      parsedUrl.searchParams.append("response_type", response_type);
      parsedUrl.searchParams.append("scope", scope);
      if (nonce) {
        parsedUrl.searchParams.append("nonce", nonce);
      }
      let stateParam = state.id;
      if (url_state) {
        stateParam = `${stateParam}${URL_STATE_DELIMITER}${url_state}`;
      }
      parsedUrl.searchParams.append("state", stateParam);
      if (state.code_challenge) {
        parsedUrl.searchParams.append("code_challenge", state.code_challenge);
        parsedUrl.searchParams.append("code_challenge_method", "S256");
      }
      if (resource) {
        const resources = Array.isArray(resource) ? resource : [resource];
        resources.forEach((r) => parsedUrl.searchParams.append("resource", r));
      }
      for (const [key, value] of Object.entries(__spreadValues(__spreadValues({ response_mode }, optionalParams), extraQueryParams))) {
        if (value != null) {
          parsedUrl.searchParams.append(key, value.toString());
        }
      }
      return new _SigninRequest2({
        url: parsedUrl.href,
        state
      });
    });
  }
};
_SigninRequest._logger = new Logger("SigninRequest");
var SigninRequest = _SigninRequest;
var OidcScope = "openid";
var SigninResponse = class {
  constructor(params) {
    this.access_token = "";
    this.token_type = "";
    this.profile = {};
    this.state = params.get("state");
    this.session_state = params.get("session_state");
    if (this.state) {
      const splitState = decodeURIComponent(this.state).split(URL_STATE_DELIMITER);
      this.state = splitState[0];
      if (splitState.length > 1) {
        this.url_state = splitState.slice(1).join(URL_STATE_DELIMITER);
      }
    }
    this.error = params.get("error");
    this.error_description = params.get("error_description");
    this.error_uri = params.get("error_uri");
    this.code = params.get("code");
  }
  get expires_in() {
    if (this.expires_at === void 0) {
      return void 0;
    }
    return this.expires_at - Timer.getEpochTime();
  }
  set expires_in(value) {
    if (typeof value === "string")
      value = Number(value);
    if (value !== void 0 && value >= 0) {
      this.expires_at = Math.floor(value) + Timer.getEpochTime();
    }
  }
  get isOpenId() {
    var _a;
    return ((_a = this.scope) == null ? void 0 : _a.split(" ").includes(OidcScope)) || !!this.id_token;
  }
};
var SignoutRequest = class {
  constructor({
    url,
    state_data,
    id_token_hint,
    post_logout_redirect_uri,
    extraQueryParams,
    request_type,
    client_id
  }) {
    this._logger = new Logger("SignoutRequest");
    if (!url) {
      this._logger.error("ctor: No url passed");
      throw new Error("url");
    }
    const parsedUrl = new URL(url);
    if (id_token_hint) {
      parsedUrl.searchParams.append("id_token_hint", id_token_hint);
    }
    if (client_id) {
      parsedUrl.searchParams.append("client_id", client_id);
    }
    if (post_logout_redirect_uri) {
      parsedUrl.searchParams.append("post_logout_redirect_uri", post_logout_redirect_uri);
      if (state_data) {
        this.state = new State({ data: state_data, request_type });
        parsedUrl.searchParams.append("state", this.state.id);
      }
    }
    for (const [key, value] of Object.entries(__spreadValues({}, extraQueryParams))) {
      if (value != null) {
        parsedUrl.searchParams.append(key, value.toString());
      }
    }
    this.url = parsedUrl.href;
  }
};
var SignoutResponse = class {
  constructor(params) {
    this.state = params.get("state");
    this.error = params.get("error");
    this.error_description = params.get("error_description");
    this.error_uri = params.get("error_uri");
  }
};
var DefaultProtocolClaims = [
  "nbf",
  "jti",
  "auth_time",
  "nonce",
  "acr",
  "amr",
  "azp",
  "at_hash"
  // https://openid.net/specs/openid-connect-core-1_0.html#CodeIDToken
];
var InternalRequiredProtocolClaims = ["sub", "iss", "aud", "exp", "iat"];
var ClaimsService = class {
  constructor(_settings) {
    this._settings = _settings;
    this._logger = new Logger("ClaimsService");
  }
  filterProtocolClaims(claims) {
    const result = __spreadValues({}, claims);
    if (this._settings.filterProtocolClaims) {
      let protocolClaims;
      if (Array.isArray(this._settings.filterProtocolClaims)) {
        protocolClaims = this._settings.filterProtocolClaims;
      } else {
        protocolClaims = DefaultProtocolClaims;
      }
      for (const claim of protocolClaims) {
        if (!InternalRequiredProtocolClaims.includes(claim)) {
          delete result[claim];
        }
      }
    }
    return result;
  }
  mergeClaims(claims1, claims2) {
    const result = __spreadValues({}, claims1);
    for (const [claim, values] of Object.entries(claims2)) {
      if (result[claim] !== values) {
        if (Array.isArray(result[claim]) || Array.isArray(values)) {
          if (this._settings.mergeClaimsStrategy.array == "replace") {
            result[claim] = values;
          } else {
            const mergedValues = Array.isArray(result[claim]) ? result[claim] : [result[claim]];
            for (const value of Array.isArray(values) ? values : [values]) {
              if (!mergedValues.includes(value)) {
                mergedValues.push(value);
              }
            }
            result[claim] = mergedValues;
          }
        } else if (typeof result[claim] === "object" && typeof values === "object") {
          result[claim] = this.mergeClaims(result[claim], values);
        } else {
          result[claim] = values;
        }
      }
    }
    return result;
  }
};
var OidcClient = class {
  constructor(settings, metadataService) {
    this._logger = new Logger("OidcClient");
    this.settings = settings instanceof OidcClientSettingsStore ? settings : new OidcClientSettingsStore(settings);
    this.metadataService = metadataService != null ? metadataService : new MetadataService(this.settings);
    this._claimsService = new ClaimsService(this.settings);
    this._validator = new ResponseValidator(this.settings, this.metadataService, this._claimsService);
    this._tokenClient = new TokenClient(this.settings, this.metadataService);
  }
  createSigninRequest(_0) {
    return __async(this, arguments, function* ({
      state,
      request,
      request_uri,
      request_type,
      id_token_hint,
      login_hint,
      skipUserInfo,
      nonce,
      url_state,
      response_type = this.settings.response_type,
      scope = this.settings.scope,
      redirect_uri = this.settings.redirect_uri,
      prompt = this.settings.prompt,
      display = this.settings.display,
      max_age = this.settings.max_age,
      ui_locales = this.settings.ui_locales,
      acr_values = this.settings.acr_values,
      resource = this.settings.resource,
      response_mode = this.settings.response_mode,
      extraQueryParams = this.settings.extraQueryParams,
      extraTokenParams = this.settings.extraTokenParams
    }) {
      const logger2 = this._logger.create("createSigninRequest");
      if (response_type !== "code") {
        throw new Error("Only the Authorization Code flow (with PKCE) is supported");
      }
      const url = yield this.metadataService.getAuthorizationEndpoint();
      logger2.debug("Received authorization endpoint", url);
      const signinRequest = yield SigninRequest.create({
        url,
        authority: this.settings.authority,
        client_id: this.settings.client_id,
        redirect_uri,
        response_type,
        scope,
        state_data: state,
        url_state,
        prompt,
        display,
        max_age,
        ui_locales,
        id_token_hint,
        login_hint,
        acr_values,
        resource,
        request,
        request_uri,
        extraQueryParams,
        extraTokenParams,
        request_type,
        response_mode,
        client_secret: this.settings.client_secret,
        skipUserInfo,
        nonce,
        disablePKCE: this.settings.disablePKCE
      });
      yield this.clearStaleState();
      const signinState = signinRequest.state;
      yield this.settings.stateStore.set(signinState.id, signinState.toStorageString());
      return signinRequest;
    });
  }
  readSigninResponseState(url, removeState = false) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("readSigninResponseState");
      const response = new SigninResponse(UrlUtils.readParams(url, this.settings.response_mode));
      if (!response.state) {
        logger2.throw(new Error("No state in response"));
        throw null;
      }
      const storedStateString = yield this.settings.stateStore[removeState ? "remove" : "get"](response.state);
      if (!storedStateString) {
        logger2.throw(new Error("No matching state found in storage"));
        throw null;
      }
      const state = yield SigninState.fromStorageString(storedStateString);
      return { state, response };
    });
  }
  processSigninResponse(url) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("processSigninResponse");
      const { state, response } = yield this.readSigninResponseState(url, true);
      logger2.debug("received state from storage; validating response");
      yield this._validator.validateSigninResponse(response, state);
      return response;
    });
  }
  processResourceOwnerPasswordCredentials(_0) {
    return __async(this, arguments, function* ({
      username,
      password,
      skipUserInfo = false,
      extraTokenParams = {}
    }) {
      const tokenResponse = yield this._tokenClient.exchangeCredentials(__spreadValues({ username, password }, extraTokenParams));
      const signinResponse = new SigninResponse(new URLSearchParams());
      Object.assign(signinResponse, tokenResponse);
      yield this._validator.validateCredentialsResponse(signinResponse, skipUserInfo);
      return signinResponse;
    });
  }
  useRefreshToken(_0) {
    return __async(this, arguments, function* ({
      state,
      redirect_uri,
      resource,
      timeoutInSeconds,
      extraTokenParams
    }) {
      var _a;
      const logger2 = this._logger.create("useRefreshToken");
      let scope;
      if (this.settings.refreshTokenAllowedScope === void 0) {
        scope = state.scope;
      } else {
        const allowableScopes = this.settings.refreshTokenAllowedScope.split(" ");
        const providedScopes = ((_a = state.scope) == null ? void 0 : _a.split(" ")) || [];
        scope = providedScopes.filter((s) => allowableScopes.includes(s)).join(" ");
      }
      const result = yield this._tokenClient.exchangeRefreshToken(__spreadValues({
        refresh_token: state.refresh_token,
        // provide the (possible filtered) scope list
        scope,
        redirect_uri,
        resource,
        timeoutInSeconds
      }, extraTokenParams));
      const response = new SigninResponse(new URLSearchParams());
      Object.assign(response, result);
      logger2.debug("validating response", response);
      yield this._validator.validateRefreshResponse(response, __spreadProps(__spreadValues({}, state), {
        // override the scope in the state handed over to the validator
        // so it can set the granted scope to the requested scope in case none is included in the response
        scope
      }));
      return response;
    });
  }
  createSignoutRequest() {
    return __async(this, arguments, function* ({
      state,
      id_token_hint,
      client_id,
      request_type,
      post_logout_redirect_uri = this.settings.post_logout_redirect_uri,
      extraQueryParams = this.settings.extraQueryParams
    } = {}) {
      const logger2 = this._logger.create("createSignoutRequest");
      const url = yield this.metadataService.getEndSessionEndpoint();
      if (!url) {
        logger2.throw(new Error("No end session endpoint"));
        throw null;
      }
      logger2.debug("Received end session endpoint", url);
      if (!client_id && post_logout_redirect_uri && !id_token_hint) {
        client_id = this.settings.client_id;
      }
      const request = new SignoutRequest({
        url,
        id_token_hint,
        client_id,
        post_logout_redirect_uri,
        state_data: state,
        extraQueryParams,
        request_type
      });
      yield this.clearStaleState();
      const signoutState = request.state;
      if (signoutState) {
        logger2.debug("Signout request has state to persist");
        yield this.settings.stateStore.set(signoutState.id, signoutState.toStorageString());
      }
      return request;
    });
  }
  readSignoutResponseState(url, removeState = false) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("readSignoutResponseState");
      const response = new SignoutResponse(UrlUtils.readParams(url, this.settings.response_mode));
      if (!response.state) {
        logger2.debug("No state in response");
        if (response.error) {
          logger2.warn("Response was error:", response.error);
          throw new ErrorResponse(response);
        }
        return { state: void 0, response };
      }
      const storedStateString = yield this.settings.stateStore[removeState ? "remove" : "get"](response.state);
      if (!storedStateString) {
        logger2.throw(new Error("No matching state found in storage"));
        throw null;
      }
      const state = yield State.fromStorageString(storedStateString);
      return { state, response };
    });
  }
  processSignoutResponse(url) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("processSignoutResponse");
      const { state, response } = yield this.readSignoutResponseState(url, true);
      if (state) {
        logger2.debug("Received state from storage; validating response");
        this._validator.validateSignoutResponse(response, state);
      } else {
        logger2.debug("No state from storage; skipping response validation");
      }
      return response;
    });
  }
  clearStaleState() {
    this._logger.create("clearStaleState");
    return State.clearStaleState(this.settings.stateStore, this.settings.staleStateAgeInSeconds);
  }
  revokeToken(token, type) {
    return __async(this, null, function* () {
      this._logger.create("revokeToken");
      return yield this._tokenClient.revoke({
        token,
        token_type_hint: type
      });
    });
  }
};
var SessionMonitor = class {
  constructor(_userManager) {
    this._userManager = _userManager;
    this._logger = new Logger("SessionMonitor");
    this._start = (user) => __async(this, null, function* () {
      const session_state = user.session_state;
      if (!session_state) {
        return;
      }
      const logger2 = this._logger.create("_start");
      if (user.profile) {
        this._sub = user.profile.sub;
        logger2.debug("session_state", session_state, ", sub", this._sub);
      } else {
        this._sub = void 0;
        logger2.debug("session_state", session_state, ", anonymous user");
      }
      if (this._checkSessionIFrame) {
        this._checkSessionIFrame.start(session_state);
        return;
      }
      try {
        const url = yield this._userManager.metadataService.getCheckSessionIframe();
        if (url) {
          logger2.debug("initializing check session iframe");
          const client_id = this._userManager.settings.client_id;
          const intervalInSeconds = this._userManager.settings.checkSessionIntervalInSeconds;
          const stopOnError = this._userManager.settings.stopCheckSessionOnError;
          const checkSessionIFrame = new CheckSessionIFrame(this._callback, client_id, url, intervalInSeconds, stopOnError);
          yield checkSessionIFrame.load();
          this._checkSessionIFrame = checkSessionIFrame;
          checkSessionIFrame.start(session_state);
        } else {
          logger2.warn("no check session iframe found in the metadata");
        }
      } catch (err) {
        logger2.error("Error from getCheckSessionIframe:", err instanceof Error ? err.message : err);
      }
    });
    this._stop = () => {
      const logger2 = this._logger.create("_stop");
      this._sub = void 0;
      if (this._checkSessionIFrame) {
        this._checkSessionIFrame.stop();
      }
      if (this._userManager.settings.monitorAnonymousSession) {
        const timerHandle = setInterval(() => __async(this, null, function* () {
          clearInterval(timerHandle);
          try {
            const session = yield this._userManager.querySessionStatus();
            if (session) {
              const tmpUser = {
                session_state: session.session_state,
                profile: session.sub ? {
                  sub: session.sub
                } : null
              };
              void this._start(tmpUser);
            }
          } catch (err) {
            logger2.error("error from querySessionStatus", err instanceof Error ? err.message : err);
          }
        }), 1e3);
      }
    };
    this._callback = () => __async(this, null, function* () {
      const logger2 = this._logger.create("_callback");
      try {
        const session = yield this._userManager.querySessionStatus();
        let raiseEvent = true;
        if (session && this._checkSessionIFrame) {
          if (session.sub === this._sub) {
            raiseEvent = false;
            this._checkSessionIFrame.start(session.session_state);
            logger2.debug("same sub still logged in at OP, session state has changed, restarting check session iframe; session_state", session.session_state);
            yield this._userManager.events._raiseUserSessionChanged();
          } else {
            logger2.debug("different subject signed into OP", session.sub);
          }
        } else {
          logger2.debug("subject no longer signed into OP");
        }
        if (raiseEvent) {
          if (this._sub) {
            yield this._userManager.events._raiseUserSignedOut();
          } else {
            yield this._userManager.events._raiseUserSignedIn();
          }
        } else {
          logger2.debug("no change in session detected, no event to raise");
        }
      } catch (err) {
        if (this._sub) {
          logger2.debug("Error calling queryCurrentSigninSession; raising signed out event", err);
          yield this._userManager.events._raiseUserSignedOut();
        }
      }
    });
    if (!_userManager) {
      this._logger.throw(new Error("No user manager passed"));
    }
    this._userManager.events.addUserLoaded(this._start);
    this._userManager.events.addUserUnloaded(this._stop);
    this._init().catch((err) => {
      this._logger.error(err);
    });
  }
  _init() {
    return __async(this, null, function* () {
      this._logger.create("_init");
      const user = yield this._userManager.getUser();
      if (user) {
        void this._start(user);
      } else if (this._userManager.settings.monitorAnonymousSession) {
        const session = yield this._userManager.querySessionStatus();
        if (session) {
          const tmpUser = {
            session_state: session.session_state,
            profile: session.sub ? {
              sub: session.sub
            } : null
          };
          void this._start(tmpUser);
        }
      }
    });
  }
};
var User = class _User {
  constructor(args) {
    var _a;
    this.id_token = args.id_token;
    this.session_state = (_a = args.session_state) != null ? _a : null;
    this.access_token = args.access_token;
    this.refresh_token = args.refresh_token;
    this.token_type = args.token_type;
    this.scope = args.scope;
    this.profile = args.profile;
    this.expires_at = args.expires_at;
    this.state = args.userState;
    this.url_state = args.url_state;
  }
  /** Computed number of seconds the access token has remaining. */
  get expires_in() {
    if (this.expires_at === void 0) {
      return void 0;
    }
    return this.expires_at - Timer.getEpochTime();
  }
  set expires_in(value) {
    if (value !== void 0) {
      this.expires_at = Math.floor(value) + Timer.getEpochTime();
    }
  }
  /** Computed value indicating if the access token is expired. */
  get expired() {
    const expires_in = this.expires_in;
    if (expires_in === void 0) {
      return void 0;
    }
    return expires_in <= 0;
  }
  /** Array representing the parsed values from the `scope`. */
  get scopes() {
    var _a, _b;
    return (_b = (_a = this.scope) == null ? void 0 : _a.split(" ")) != null ? _b : [];
  }
  toStorageString() {
    new Logger("User").create("toStorageString");
    return JSON.stringify({
      id_token: this.id_token,
      session_state: this.session_state,
      access_token: this.access_token,
      refresh_token: this.refresh_token,
      token_type: this.token_type,
      scope: this.scope,
      profile: this.profile,
      expires_at: this.expires_at
    });
  }
  static fromStorageString(storageString) {
    Logger.createStatic("User", "fromStorageString");
    return new _User(JSON.parse(storageString));
  }
};
var messageSource = "oidc-client";
var AbstractChildWindow = class {
  constructor() {
    this._abort = new Event("Window navigation aborted");
    this._disposeHandlers = /* @__PURE__ */ new Set();
    this._window = null;
  }
  navigate(params) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("navigate");
      if (!this._window) {
        throw new Error("Attempted to navigate on a disposed window");
      }
      logger2.debug("setting URL in window");
      this._window.location.replace(params.url);
      const { url, keepOpen } = yield new Promise((resolve, reject) => {
        const listener = (e) => {
          var _a;
          const data = e.data;
          const origin = (_a = params.scriptOrigin) != null ? _a : window.location.origin;
          if (e.origin !== origin || (data == null ? void 0 : data.source) !== messageSource) {
            return;
          }
          try {
            const state = UrlUtils.readParams(data.url, params.response_mode).get("state");
            if (!state) {
              logger2.warn("no state found in response url");
            }
            if (e.source !== this._window && state !== params.state) {
              return;
            }
          } catch (err) {
            this._dispose();
            reject(new Error("Invalid response from window"));
          }
          resolve(data);
        };
        window.addEventListener("message", listener, false);
        this._disposeHandlers.add(() => window.removeEventListener("message", listener, false));
        this._disposeHandlers.add(this._abort.addHandler((reason) => {
          this._dispose();
          reject(reason);
        }));
      });
      logger2.debug("got response from window");
      this._dispose();
      if (!keepOpen) {
        this.close();
      }
      return { url };
    });
  }
  _dispose() {
    this._logger.create("_dispose");
    for (const dispose of this._disposeHandlers) {
      dispose();
    }
    this._disposeHandlers.clear();
  }
  static _notifyParent(parent, url, keepOpen = false, targetOrigin = window.location.origin) {
    parent.postMessage({
      source: messageSource,
      url,
      keepOpen
    }, targetOrigin);
  }
};
var DefaultPopupWindowFeatures = {
  location: false,
  toolbar: false,
  height: 640,
  closePopupWindowAfterInSeconds: -1
};
var DefaultPopupTarget = "_blank";
var DefaultAccessTokenExpiringNotificationTimeInSeconds = 60;
var DefaultCheckSessionIntervalInSeconds = 2;
var DefaultSilentRequestTimeoutInSeconds = 10;
var UserManagerSettingsStore = class extends OidcClientSettingsStore {
  constructor(args) {
    const {
      popup_redirect_uri = args.redirect_uri,
      popup_post_logout_redirect_uri = args.post_logout_redirect_uri,
      popupWindowFeatures = DefaultPopupWindowFeatures,
      popupWindowTarget = DefaultPopupTarget,
      redirectMethod = "assign",
      redirectTarget = "self",
      iframeNotifyParentOrigin = args.iframeNotifyParentOrigin,
      iframeScriptOrigin = args.iframeScriptOrigin,
      silent_redirect_uri = args.redirect_uri,
      silentRequestTimeoutInSeconds = DefaultSilentRequestTimeoutInSeconds,
      automaticSilentRenew = true,
      validateSubOnSilentRenew = true,
      includeIdTokenInSilentRenew = false,
      monitorSession = false,
      monitorAnonymousSession = false,
      checkSessionIntervalInSeconds = DefaultCheckSessionIntervalInSeconds,
      query_status_response_type = "code",
      stopCheckSessionOnError = true,
      revokeTokenTypes = ["access_token", "refresh_token"],
      revokeTokensOnSignout = false,
      includeIdTokenInSilentSignout = false,
      accessTokenExpiringNotificationTimeInSeconds = DefaultAccessTokenExpiringNotificationTimeInSeconds,
      userStore
    } = args;
    super(args);
    this.popup_redirect_uri = popup_redirect_uri;
    this.popup_post_logout_redirect_uri = popup_post_logout_redirect_uri;
    this.popupWindowFeatures = popupWindowFeatures;
    this.popupWindowTarget = popupWindowTarget;
    this.redirectMethod = redirectMethod;
    this.redirectTarget = redirectTarget;
    this.iframeNotifyParentOrigin = iframeNotifyParentOrigin;
    this.iframeScriptOrigin = iframeScriptOrigin;
    this.silent_redirect_uri = silent_redirect_uri;
    this.silentRequestTimeoutInSeconds = silentRequestTimeoutInSeconds;
    this.automaticSilentRenew = automaticSilentRenew;
    this.validateSubOnSilentRenew = validateSubOnSilentRenew;
    this.includeIdTokenInSilentRenew = includeIdTokenInSilentRenew;
    this.monitorSession = monitorSession;
    this.monitorAnonymousSession = monitorAnonymousSession;
    this.checkSessionIntervalInSeconds = checkSessionIntervalInSeconds;
    this.stopCheckSessionOnError = stopCheckSessionOnError;
    this.query_status_response_type = query_status_response_type;
    this.revokeTokenTypes = revokeTokenTypes;
    this.revokeTokensOnSignout = revokeTokensOnSignout;
    this.includeIdTokenInSilentSignout = includeIdTokenInSilentSignout;
    this.accessTokenExpiringNotificationTimeInSeconds = accessTokenExpiringNotificationTimeInSeconds;
    if (userStore) {
      this.userStore = userStore;
    } else {
      const store = typeof window !== "undefined" ? window.sessionStorage : new InMemoryWebStorage();
      this.userStore = new WebStorageStateStore({ store });
    }
  }
};
var IFrameWindow = class _IFrameWindow extends AbstractChildWindow {
  constructor({
    silentRequestTimeoutInSeconds = DefaultSilentRequestTimeoutInSeconds
  }) {
    super();
    this._logger = new Logger("IFrameWindow");
    this._timeoutInSeconds = silentRequestTimeoutInSeconds;
    this._frame = _IFrameWindow.createHiddenIframe();
    this._window = this._frame.contentWindow;
  }
  static createHiddenIframe() {
    const iframe = window.document.createElement("iframe");
    iframe.style.visibility = "hidden";
    iframe.style.position = "fixed";
    iframe.style.left = "-1000px";
    iframe.style.top = "0";
    iframe.width = "0";
    iframe.height = "0";
    window.document.body.appendChild(iframe);
    return iframe;
  }
  navigate(params) {
    return __async(this, null, function* () {
      this._logger.debug("navigate: Using timeout of:", this._timeoutInSeconds);
      const timer = setTimeout(() => void this._abort.raise(new ErrorTimeout("IFrame timed out without a response")), this._timeoutInSeconds * 1e3);
      this._disposeHandlers.add(() => clearTimeout(timer));
      return yield __superGet(_IFrameWindow.prototype, this, "navigate").call(this, params);
    });
  }
  close() {
    var _a;
    if (this._frame) {
      if (this._frame.parentNode) {
        this._frame.addEventListener("load", (ev) => {
          var _a2;
          const frame = ev.target;
          (_a2 = frame.parentNode) == null ? void 0 : _a2.removeChild(frame);
          void this._abort.raise(new Error("IFrame removed from DOM"));
        }, true);
        (_a = this._frame.contentWindow) == null ? void 0 : _a.location.replace("about:blank");
      }
      this._frame = null;
    }
    this._window = null;
  }
  static notifyParent(url, targetOrigin) {
    return super._notifyParent(window.parent, url, false, targetOrigin);
  }
};
var IFrameNavigator = class {
  constructor(_settings) {
    this._settings = _settings;
    this._logger = new Logger("IFrameNavigator");
  }
  prepare(_0) {
    return __async(this, arguments, function* ({
      silentRequestTimeoutInSeconds = this._settings.silentRequestTimeoutInSeconds
    }) {
      return new IFrameWindow({ silentRequestTimeoutInSeconds });
    });
  }
  callback(url) {
    return __async(this, null, function* () {
      this._logger.create("callback");
      IFrameWindow.notifyParent(url, this._settings.iframeNotifyParentOrigin);
    });
  }
};
var checkForPopupClosedInterval = 500;
var second = 1e3;
var PopupWindow = class _this extends AbstractChildWindow {
  constructor({
    popupWindowTarget = DefaultPopupTarget,
    popupWindowFeatures = {}
  }) {
    super();
    this._logger = new Logger("PopupWindow");
    const centeredPopup = PopupUtils.center(__spreadValues(__spreadValues({}, DefaultPopupWindowFeatures), popupWindowFeatures));
    this._window = window.open(void 0, popupWindowTarget, PopupUtils.serialize(centeredPopup));
    if (popupWindowFeatures.closePopupWindowAfterInSeconds && popupWindowFeatures.closePopupWindowAfterInSeconds > 0) {
      setTimeout(() => {
        if (!this._window || typeof this._window.closed !== "boolean" || this._window.closed) {
          void this._abort.raise(new Error("Popup blocked by user"));
          return;
        }
        this.close();
      }, popupWindowFeatures.closePopupWindowAfterInSeconds * second);
    }
  }
  navigate(params) {
    return __async(this, null, function* () {
      var _a;
      (_a = this._window) == null ? void 0 : _a.focus();
      const popupClosedInterval = setInterval(() => {
        if (!this._window || this._window.closed) {
          void this._abort.raise(new Error("Popup closed by user"));
        }
      }, checkForPopupClosedInterval);
      this._disposeHandlers.add(() => clearInterval(popupClosedInterval));
      return yield __superGet(_this.prototype, this, "navigate").call(this, params);
    });
  }
  close() {
    if (this._window) {
      if (!this._window.closed) {
        this._window.close();
        void this._abort.raise(new Error("Popup closed"));
      }
    }
    this._window = null;
  }
  static notifyOpener(url, keepOpen) {
    if (!window.opener) {
      throw new Error("No window.opener. Can't complete notification.");
    }
    return super._notifyParent(window.opener, url, keepOpen);
  }
};
var PopupNavigator = class {
  constructor(_settings) {
    this._settings = _settings;
    this._logger = new Logger("PopupNavigator");
  }
  prepare(_0) {
    return __async(this, arguments, function* ({
      popupWindowFeatures = this._settings.popupWindowFeatures,
      popupWindowTarget = this._settings.popupWindowTarget
    }) {
      return new PopupWindow({ popupWindowFeatures, popupWindowTarget });
    });
  }
  callback(_0, _1) {
    return __async(this, arguments, function* (url, { keepOpen = false }) {
      this._logger.create("callback");
      PopupWindow.notifyOpener(url, keepOpen);
    });
  }
};
var RedirectNavigator = class {
  constructor(_settings) {
    this._settings = _settings;
    this._logger = new Logger("RedirectNavigator");
  }
  prepare(_0) {
    return __async(this, arguments, function* ({
      redirectMethod = this._settings.redirectMethod,
      redirectTarget = this._settings.redirectTarget
    }) {
      var _a;
      this._logger.create("prepare");
      let targetWindow = window.self;
      if (redirectTarget === "top") {
        targetWindow = (_a = window.top) != null ? _a : window.self;
      }
      const redirect = targetWindow.location[redirectMethod].bind(targetWindow.location);
      let abort;
      return {
        navigate: (params) => __async(this, null, function* () {
          this._logger.create("navigate");
          const promise = new Promise((resolve, reject) => {
            abort = reject;
          });
          redirect(params.url);
          return yield promise;
        }),
        close: () => {
          this._logger.create("close");
          abort == null ? void 0 : abort(new Error("Redirect aborted"));
          targetWindow.stop();
        }
      };
    });
  }
  callback() {
    return __async(this, null, function* () {
      return;
    });
  }
};
var UserManagerEvents = class _this extends AccessTokenEvents {
  constructor(settings) {
    super({ expiringNotificationTimeInSeconds: settings.accessTokenExpiringNotificationTimeInSeconds });
    this._logger = new Logger("UserManagerEvents");
    this._userLoaded = new Event("User loaded");
    this._userUnloaded = new Event("User unloaded");
    this._silentRenewError = new Event("Silent renew error");
    this._userSignedIn = new Event("User signed in");
    this._userSignedOut = new Event("User signed out");
    this._userSessionChanged = new Event("User session changed");
  }
  load(user, raiseEvent = true) {
    return __async(this, null, function* () {
      __superGet(_this.prototype, this, "load").call(this, user);
      if (raiseEvent) {
        yield this._userLoaded.raise(user);
      }
    });
  }
  unload() {
    return __async(this, null, function* () {
      __superGet(_this.prototype, this, "unload").call(this);
      yield this._userUnloaded.raise();
    });
  }
  /**
   * Add callback: Raised when a user session has been established (or re-established).
   */
  addUserLoaded(cb) {
    return this._userLoaded.addHandler(cb);
  }
  /**
   * Remove callback: Raised when a user session has been established (or re-established).
   */
  removeUserLoaded(cb) {
    return this._userLoaded.removeHandler(cb);
  }
  /**
   * Add callback: Raised when a user session has been terminated.
   */
  addUserUnloaded(cb) {
    return this._userUnloaded.addHandler(cb);
  }
  /**
   * Remove callback: Raised when a user session has been terminated.
   */
  removeUserUnloaded(cb) {
    return this._userUnloaded.removeHandler(cb);
  }
  /**
   * Add callback: Raised when the automatic silent renew has failed.
   */
  addSilentRenewError(cb) {
    return this._silentRenewError.addHandler(cb);
  }
  /**
   * Remove callback: Raised when the automatic silent renew has failed.
   */
  removeSilentRenewError(cb) {
    return this._silentRenewError.removeHandler(cb);
  }
  /**
   * @internal
   */
  _raiseSilentRenewError(e) {
    return __async(this, null, function* () {
      yield this._silentRenewError.raise(e);
    });
  }
  /**
   * Add callback: Raised when the user is signed in (when `monitorSession` is set).
   * @see {@link UserManagerSettings.monitorSession}
   */
  addUserSignedIn(cb) {
    return this._userSignedIn.addHandler(cb);
  }
  /**
   * Remove callback: Raised when the user is signed in (when `monitorSession` is set).
   */
  removeUserSignedIn(cb) {
    this._userSignedIn.removeHandler(cb);
  }
  /**
   * @internal
   */
  _raiseUserSignedIn() {
    return __async(this, null, function* () {
      yield this._userSignedIn.raise();
    });
  }
  /**
   * Add callback: Raised when the user's sign-in status at the OP has changed (when `monitorSession` is set).
   * @see {@link UserManagerSettings.monitorSession}
   */
  addUserSignedOut(cb) {
    return this._userSignedOut.addHandler(cb);
  }
  /**
   * Remove callback: Raised when the user's sign-in status at the OP has changed (when `monitorSession` is set).
   */
  removeUserSignedOut(cb) {
    this._userSignedOut.removeHandler(cb);
  }
  /**
   * @internal
   */
  _raiseUserSignedOut() {
    return __async(this, null, function* () {
      yield this._userSignedOut.raise();
    });
  }
  /**
   * Add callback: Raised when the user session changed (when `monitorSession` is set).
   * @see {@link UserManagerSettings.monitorSession}
   */
  addUserSessionChanged(cb) {
    return this._userSessionChanged.addHandler(cb);
  }
  /**
   * Remove callback: Raised when the user session changed (when `monitorSession` is set).
   */
  removeUserSessionChanged(cb) {
    this._userSessionChanged.removeHandler(cb);
  }
  /**
   * @internal
   */
  _raiseUserSessionChanged() {
    return __async(this, null, function* () {
      yield this._userSessionChanged.raise();
    });
  }
};
var SilentRenewService = class {
  constructor(_userManager) {
    this._userManager = _userManager;
    this._logger = new Logger("SilentRenewService");
    this._isStarted = false;
    this._retryTimer = new Timer("Retry Silent Renew");
    this._tokenExpiring = () => __async(this, null, function* () {
      const logger2 = this._logger.create("_tokenExpiring");
      try {
        yield this._userManager.signinSilent();
        logger2.debug("silent token renewal successful");
      } catch (err) {
        if (err instanceof ErrorTimeout) {
          logger2.warn("ErrorTimeout from signinSilent:", err, "retry in 5s");
          this._retryTimer.init(5);
          return;
        }
        logger2.error("Error from signinSilent:", err);
        yield this._userManager.events._raiseSilentRenewError(err);
      }
    });
  }
  start() {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("start");
      if (!this._isStarted) {
        this._isStarted = true;
        this._userManager.events.addAccessTokenExpiring(this._tokenExpiring);
        this._retryTimer.addHandler(this._tokenExpiring);
        try {
          yield this._userManager.getUser();
        } catch (err) {
          logger2.error("getUser error", err);
        }
      }
    });
  }
  stop() {
    if (this._isStarted) {
      this._retryTimer.cancel();
      this._retryTimer.removeHandler(this._tokenExpiring);
      this._userManager.events.removeAccessTokenExpiring(this._tokenExpiring);
      this._isStarted = false;
    }
  }
};
var RefreshState = class {
  constructor(args) {
    this.refresh_token = args.refresh_token;
    this.id_token = args.id_token;
    this.session_state = args.session_state;
    this.scope = args.scope;
    this.profile = args.profile;
    this.data = args.state;
  }
};
var UserManager = class {
  constructor(settings, redirectNavigator, popupNavigator, iframeNavigator) {
    this._logger = new Logger("UserManager");
    this.settings = new UserManagerSettingsStore(settings);
    this._client = new OidcClient(settings);
    this._redirectNavigator = redirectNavigator != null ? redirectNavigator : new RedirectNavigator(this.settings);
    this._popupNavigator = popupNavigator != null ? popupNavigator : new PopupNavigator(this.settings);
    this._iframeNavigator = iframeNavigator != null ? iframeNavigator : new IFrameNavigator(this.settings);
    this._events = new UserManagerEvents(this.settings);
    this._silentRenewService = new SilentRenewService(this);
    if (this.settings.automaticSilentRenew) {
      this.startSilentRenew();
    }
    this._sessionMonitor = null;
    if (this.settings.monitorSession) {
      this._sessionMonitor = new SessionMonitor(this);
    }
  }
  /**
   * Get object used to register for events raised by the `UserManager`.
   */
  get events() {
    return this._events;
  }
  /**
   * Get object used to access the metadata configuration of the identity provider.
   */
  get metadataService() {
    return this._client.metadataService;
  }
  /**
   * Load the `User` object for the currently authenticated user.
   *
   * @returns A promise
   */
  getUser() {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("getUser");
      const user = yield this._loadUser();
      if (user) {
        logger2.info("user loaded");
        yield this._events.load(user, false);
        return user;
      }
      logger2.info("user not found in storage");
      return null;
    });
  }
  /**
   * Remove from any storage the currently authenticated user.
   *
   * @returns A promise
   */
  removeUser() {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("removeUser");
      yield this.storeUser(null);
      logger2.info("user removed from storage");
      yield this._events.unload();
    });
  }
  /**
   * Trigger a redirect of the current window to the authorization endpoint.
   *
   * @returns A promise
   *
   * @throws `Error` In cases of wrong authentication.
   */
  signinRedirect() {
    return __async(this, arguments, function* (args = {}) {
      this._logger.create("signinRedirect");
      const _a = args, {
        redirectMethod
      } = _a, requestArgs = __objRest(_a, [
        "redirectMethod"
      ]);
      const handle = yield this._redirectNavigator.prepare({ redirectMethod });
      yield this._signinStart(__spreadValues({
        request_type: "si:r"
      }, requestArgs), handle);
    });
  }
  /**
   * Process the response (callback) from the authorization endpoint.
   * It is recommend to use {@link UserManager.signinCallback} instead.
   *
   * @returns A promise containing the authenticated `User`.
   *
   * @see {@link UserManager.signinCallback}
   */
  signinRedirectCallback() {
    return __async(this, arguments, function* (url = window.location.href) {
      const logger2 = this._logger.create("signinRedirectCallback");
      const user = yield this._signinEnd(url);
      if (user.profile && user.profile.sub) {
        logger2.info("success, signed in subject", user.profile.sub);
      } else {
        logger2.info("no subject");
      }
      return user;
    });
  }
  /**
   * Trigger the signin with user/password.
   *
   * @returns A promise containing the authenticated `User`.
   * @throws {@link ErrorResponse} In cases of wrong authentication.
   */
  signinResourceOwnerCredentials(_0) {
    return __async(this, arguments, function* ({
      username,
      password,
      skipUserInfo = false
    }) {
      const logger2 = this._logger.create("signinResourceOwnerCredential");
      const signinResponse = yield this._client.processResourceOwnerPasswordCredentials({ username, password, skipUserInfo, extraTokenParams: this.settings.extraTokenParams });
      logger2.debug("got signin response");
      const user = yield this._buildUser(signinResponse);
      if (user.profile && user.profile.sub) {
        logger2.info("success, signed in subject", user.profile.sub);
      } else {
        logger2.info("no subject");
      }
      return user;
    });
  }
  /**
   * Trigger a request (via a popup window) to the authorization endpoint.
   *
   * @returns A promise containing the authenticated `User`.
   * @throws `Error` In cases of wrong authentication.
   */
  signinPopup() {
    return __async(this, arguments, function* (args = {}) {
      const logger2 = this._logger.create("signinPopup");
      const _a = args, {
        popupWindowFeatures,
        popupWindowTarget
      } = _a, requestArgs = __objRest(_a, [
        "popupWindowFeatures",
        "popupWindowTarget"
      ]);
      const url = this.settings.popup_redirect_uri;
      if (!url) {
        logger2.throw(new Error("No popup_redirect_uri configured"));
      }
      const handle = yield this._popupNavigator.prepare({ popupWindowFeatures, popupWindowTarget });
      const user = yield this._signin(__spreadValues({
        request_type: "si:p",
        redirect_uri: url,
        display: "popup"
      }, requestArgs), handle);
      if (user) {
        if (user.profile && user.profile.sub) {
          logger2.info("success, signed in subject", user.profile.sub);
        } else {
          logger2.info("no subject");
        }
      }
      return user;
    });
  }
  /**
   * Notify the opening window of response (callback) from the authorization endpoint.
   * It is recommend to use {@link UserManager.signinCallback} instead.
   *
   * @returns A promise
   *
   * @see {@link UserManager.signinCallback}
   */
  signinPopupCallback() {
    return __async(this, arguments, function* (url = window.location.href, keepOpen = false) {
      const logger2 = this._logger.create("signinPopupCallback");
      yield this._popupNavigator.callback(url, { keepOpen });
      logger2.info("success");
    });
  }
  /**
   * Trigger a silent request (via refresh token or an iframe) to the authorization endpoint.
   *
   * @returns A promise that contains the authenticated `User`.
   */
  signinSilent() {
    return __async(this, arguments, function* (args = {}) {
      var _a;
      const logger2 = this._logger.create("signinSilent");
      const _a2 = args, {
        silentRequestTimeoutInSeconds
      } = _a2, requestArgs = __objRest(_a2, [
        "silentRequestTimeoutInSeconds"
      ]);
      let user = yield this._loadUser();
      if (user == null ? void 0 : user.refresh_token) {
        logger2.debug("using refresh token");
        const state = new RefreshState(user);
        return yield this._useRefreshToken({
          state,
          redirect_uri: requestArgs.redirect_uri,
          resource: requestArgs.resource,
          extraTokenParams: requestArgs.extraTokenParams,
          timeoutInSeconds: silentRequestTimeoutInSeconds
        });
      }
      const url = this.settings.silent_redirect_uri;
      if (!url) {
        logger2.throw(new Error("No silent_redirect_uri configured"));
      }
      let verifySub;
      if (user && this.settings.validateSubOnSilentRenew) {
        logger2.debug("subject prior to silent renew:", user.profile.sub);
        verifySub = user.profile.sub;
      }
      const handle = yield this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds });
      user = yield this._signin(__spreadValues({
        request_type: "si:s",
        redirect_uri: url,
        prompt: "none",
        id_token_hint: this.settings.includeIdTokenInSilentRenew ? user == null ? void 0 : user.id_token : void 0
      }, requestArgs), handle, verifySub);
      if (user) {
        if ((_a = user.profile) == null ? void 0 : _a.sub) {
          logger2.info("success, signed in subject", user.profile.sub);
        } else {
          logger2.info("no subject");
        }
      }
      return user;
    });
  }
  _useRefreshToken(args) {
    return __async(this, null, function* () {
      const response = yield this._client.useRefreshToken(__spreadProps(__spreadValues({}, args), {
        timeoutInSeconds: this.settings.silentRequestTimeoutInSeconds
      }));
      const user = new User(__spreadValues(__spreadValues({}, args.state), response));
      yield this.storeUser(user);
      yield this._events.load(user);
      return user;
    });
  }
  /**
   *
   * Notify the parent window of response (callback) from the authorization endpoint.
   * It is recommend to use {@link UserManager.signinCallback} instead.
   *
   * @returns A promise
   *
   * @see {@link UserManager.signinCallback}
   */
  signinSilentCallback() {
    return __async(this, arguments, function* (url = window.location.href) {
      const logger2 = this._logger.create("signinSilentCallback");
      yield this._iframeNavigator.callback(url);
      logger2.info("success");
    });
  }
  /**
   * Process any response (callback) from the authorization endpoint, by dispatching the request_type
   * and executing one of the following functions:
   * - {@link UserManager.signinRedirectCallback}
   * - {@link UserManager.signinPopupCallback}
   * - {@link UserManager.signinSilentCallback}
   *
   * @throws `Error` If request_type is unknown or signout can not processed.
   */
  signinCallback() {
    return __async(this, arguments, function* (url = window.location.href) {
      const { state } = yield this._client.readSigninResponseState(url);
      switch (state.request_type) {
        case "si:r":
          return yield this.signinRedirectCallback(url);
        case "si:p":
          return yield this.signinPopupCallback(url);
        case "si:s":
          return yield this.signinSilentCallback(url);
        default:
          throw new Error("invalid response_type in state");
      }
    });
  }
  /**
   * Process any response (callback) from the end session endpoint, by dispatching the request_type
   * and executing one of the following functions:
   * - {@link UserManager.signoutRedirectCallback}
   * - {@link UserManager.signoutPopupCallback}
   * - {@link UserManager.signoutSilentCallback}
   *
   * @throws `Error` If request_type is unknown or signout can not processed.
   */
  signoutCallback() {
    return __async(this, arguments, function* (url = window.location.href, keepOpen = false) {
      const { state } = yield this._client.readSignoutResponseState(url);
      if (!state) {
        return;
      }
      switch (state.request_type) {
        case "so:r":
          yield this.signoutRedirectCallback(url);
          break;
        case "so:p":
          yield this.signoutPopupCallback(url, keepOpen);
          break;
        case "so:s":
          yield this.signoutSilentCallback(url);
          break;
        default:
          throw new Error("invalid response_type in state");
      }
    });
  }
  /**
   * Query OP for user's current signin status.
   *
   * @returns A promise object with session_state and subject identifier.
   */
  querySessionStatus() {
    return __async(this, arguments, function* (args = {}) {
      const logger2 = this._logger.create("querySessionStatus");
      const _a = args, {
        silentRequestTimeoutInSeconds
      } = _a, requestArgs = __objRest(_a, [
        "silentRequestTimeoutInSeconds"
      ]);
      const url = this.settings.silent_redirect_uri;
      if (!url) {
        logger2.throw(new Error("No silent_redirect_uri configured"));
      }
      const user = yield this._loadUser();
      const handle = yield this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds });
      const navResponse = yield this._signinStart(__spreadValues({
        request_type: "si:s",
        // this acts like a signin silent
        redirect_uri: url,
        prompt: "none",
        id_token_hint: this.settings.includeIdTokenInSilentRenew ? user == null ? void 0 : user.id_token : void 0,
        response_type: this.settings.query_status_response_type,
        scope: "openid",
        skipUserInfo: true
      }, requestArgs), handle);
      try {
        const signinResponse = yield this._client.processSigninResponse(navResponse.url);
        logger2.debug("got signin response");
        if (signinResponse.session_state && signinResponse.profile.sub) {
          logger2.info("success for subject", signinResponse.profile.sub);
          return {
            session_state: signinResponse.session_state,
            sub: signinResponse.profile.sub
          };
        }
        logger2.info("success, user not authenticated");
        return null;
      } catch (err) {
        if (this.settings.monitorAnonymousSession && err instanceof ErrorResponse) {
          switch (err.error) {
            case "login_required":
            case "consent_required":
            case "interaction_required":
            case "account_selection_required":
              logger2.info("success for anonymous user");
              return {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                session_state: err.session_state
              };
          }
        }
        throw err;
      }
    });
  }
  _signin(args, handle, verifySub) {
    return __async(this, null, function* () {
      const navResponse = yield this._signinStart(args, handle);
      return yield this._signinEnd(navResponse.url, verifySub);
    });
  }
  _signinStart(args, handle) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("_signinStart");
      try {
        const signinRequest = yield this._client.createSigninRequest(args);
        logger2.debug("got signin request");
        return yield handle.navigate({
          url: signinRequest.url,
          state: signinRequest.state.id,
          response_mode: signinRequest.state.response_mode,
          scriptOrigin: this.settings.iframeScriptOrigin
        });
      } catch (err) {
        logger2.debug("error after preparing navigator, closing navigator window");
        handle.close();
        throw err;
      }
    });
  }
  _signinEnd(url, verifySub) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("_signinEnd");
      const signinResponse = yield this._client.processSigninResponse(url);
      logger2.debug("got signin response");
      const user = yield this._buildUser(signinResponse, verifySub);
      return user;
    });
  }
  _buildUser(signinResponse, verifySub) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("_buildUser");
      const user = new User(signinResponse);
      if (verifySub) {
        if (verifySub !== user.profile.sub) {
          logger2.debug("current user does not match user returned from signin. sub from signin:", user.profile.sub);
          throw new ErrorResponse(__spreadProps(__spreadValues({}, signinResponse), { error: "login_required" }));
        }
        logger2.debug("current user matches user returned from signin");
      }
      yield this.storeUser(user);
      logger2.debug("user stored");
      yield this._events.load(user);
      return user;
    });
  }
  /**
   * Trigger a redirect of the current window to the end session endpoint.
   *
   * @returns A promise
   */
  signoutRedirect() {
    return __async(this, arguments, function* (args = {}) {
      const logger2 = this._logger.create("signoutRedirect");
      const _a = args, {
        redirectMethod
      } = _a, requestArgs = __objRest(_a, [
        "redirectMethod"
      ]);
      const handle = yield this._redirectNavigator.prepare({ redirectMethod });
      yield this._signoutStart(__spreadValues({
        request_type: "so:r",
        post_logout_redirect_uri: this.settings.post_logout_redirect_uri
      }, requestArgs), handle);
      logger2.info("success");
    });
  }
  /**
   * Process response (callback) from the end session endpoint.
   * It is recommend to use {@link UserManager.signoutCallback} instead.
   *
   * @returns A promise containing signout response
   *
   * @see {@link UserManager.signoutCallback}
   */
  signoutRedirectCallback() {
    return __async(this, arguments, function* (url = window.location.href) {
      const logger2 = this._logger.create("signoutRedirectCallback");
      const response = yield this._signoutEnd(url);
      logger2.info("success");
      return response;
    });
  }
  /**
   * Trigger a redirect of a popup window window to the end session endpoint.
   *
   * @returns A promise
   */
  signoutPopup() {
    return __async(this, arguments, function* (args = {}) {
      const logger2 = this._logger.create("signoutPopup");
      const _a = args, {
        popupWindowFeatures,
        popupWindowTarget
      } = _a, requestArgs = __objRest(_a, [
        "popupWindowFeatures",
        "popupWindowTarget"
      ]);
      const url = this.settings.popup_post_logout_redirect_uri;
      const handle = yield this._popupNavigator.prepare({ popupWindowFeatures, popupWindowTarget });
      yield this._signout(__spreadValues({
        request_type: "so:p",
        post_logout_redirect_uri: url,
        // we're putting a dummy entry in here because we
        // need a unique id from the state for notification
        // to the parent window, which is necessary if we
        // plan to return back to the client after signout
        // and so we can close the popup after signout
        state: url == null ? void 0 : {}
      }, requestArgs), handle);
      logger2.info("success");
    });
  }
  /**
   * Process response (callback) from the end session endpoint from a popup window.
   * It is recommend to use {@link UserManager.signoutCallback} instead.
   *
   * @returns A promise
   *
   * @see {@link UserManager.signoutCallback}
   */
  signoutPopupCallback() {
    return __async(this, arguments, function* (url = window.location.href, keepOpen = false) {
      const logger2 = this._logger.create("signoutPopupCallback");
      yield this._popupNavigator.callback(url, { keepOpen });
      logger2.info("success");
    });
  }
  _signout(args, handle) {
    return __async(this, null, function* () {
      const navResponse = yield this._signoutStart(args, handle);
      return yield this._signoutEnd(navResponse.url);
    });
  }
  _signoutStart() {
    return __async(this, arguments, function* (args = {}, handle) {
      var _a;
      const logger2 = this._logger.create("_signoutStart");
      try {
        const user = yield this._loadUser();
        logger2.debug("loaded current user from storage");
        if (this.settings.revokeTokensOnSignout) {
          yield this._revokeInternal(user);
        }
        const id_token = args.id_token_hint || user && user.id_token;
        if (id_token) {
          logger2.debug("setting id_token_hint in signout request");
          args.id_token_hint = id_token;
        }
        yield this.removeUser();
        logger2.debug("user removed, creating signout request");
        const signoutRequest = yield this._client.createSignoutRequest(args);
        logger2.debug("got signout request");
        return yield handle.navigate({
          url: signoutRequest.url,
          state: (_a = signoutRequest.state) == null ? void 0 : _a.id,
          scriptOrigin: this.settings.iframeScriptOrigin
        });
      } catch (err) {
        logger2.debug("error after preparing navigator, closing navigator window");
        handle.close();
        throw err;
      }
    });
  }
  _signoutEnd(url) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("_signoutEnd");
      const signoutResponse = yield this._client.processSignoutResponse(url);
      logger2.debug("got signout response");
      return signoutResponse;
    });
  }
  /**
   * Trigger a silent request (via an iframe) to the end session endpoint.
   *
   * @returns A promise
   */
  signoutSilent() {
    return __async(this, arguments, function* (args = {}) {
      var _a;
      const logger2 = this._logger.create("signoutSilent");
      const _a2 = args, {
        silentRequestTimeoutInSeconds
      } = _a2, requestArgs = __objRest(_a2, [
        "silentRequestTimeoutInSeconds"
      ]);
      const id_token_hint = this.settings.includeIdTokenInSilentSignout ? (_a = yield this._loadUser()) == null ? void 0 : _a.id_token : void 0;
      const url = this.settings.popup_post_logout_redirect_uri;
      const handle = yield this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds });
      yield this._signout(__spreadValues({
        request_type: "so:s",
        post_logout_redirect_uri: url,
        id_token_hint
      }, requestArgs), handle);
      logger2.info("success");
    });
  }
  /**
   * Notify the parent window of response (callback) from the end session endpoint.
   * It is recommend to use {@link UserManager.signoutCallback} instead.
   *
   * @returns A promise
   *
   * @see {@link UserManager.signoutCallback}
   */
  signoutSilentCallback() {
    return __async(this, arguments, function* (url = window.location.href) {
      const logger2 = this._logger.create("signoutSilentCallback");
      yield this._iframeNavigator.callback(url);
      logger2.info("success");
    });
  }
  revokeTokens(types) {
    return __async(this, null, function* () {
      const user = yield this._loadUser();
      yield this._revokeInternal(user, types);
    });
  }
  _revokeInternal(_0) {
    return __async(this, arguments, function* (user, types = this.settings.revokeTokenTypes) {
      const logger2 = this._logger.create("_revokeInternal");
      if (!user)
        return;
      const typesPresent = types.filter((type) => typeof user[type] === "string");
      if (!typesPresent.length) {
        logger2.debug("no need to revoke due to no token(s)");
        return;
      }
      for (const type of typesPresent) {
        yield this._client.revokeToken(
          user[type],
          // eslint-disable-line @typescript-eslint/no-non-null-assertion
          type
        );
        logger2.info(`${type} revoked successfully`);
        if (type !== "access_token") {
          user[type] = null;
        }
      }
      yield this.storeUser(user);
      logger2.debug("user stored");
      yield this._events.load(user);
    });
  }
  /**
   * Enables silent renew for the `UserManager`.
   */
  startSilentRenew() {
    this._logger.create("startSilentRenew");
    void this._silentRenewService.start();
  }
  /**
   * Disables silent renew for the `UserManager`.
   */
  stopSilentRenew() {
    this._silentRenewService.stop();
  }
  get _userStoreKey() {
    return `user:${this.settings.authority}:${this.settings.client_id}`;
  }
  _loadUser() {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("_loadUser");
      const storageString = yield this.settings.userStore.get(this._userStoreKey);
      if (storageString) {
        logger2.debug("user storageString loaded");
        return User.fromStorageString(storageString);
      }
      logger2.debug("no user storageString");
      return null;
    });
  }
  storeUser(user) {
    return __async(this, null, function* () {
      const logger2 = this._logger.create("storeUser");
      if (user) {
        logger2.debug("storing user");
        const storageString = user.toStorageString();
        yield this.settings.userStore.set(this._userStoreKey, storageString);
      } else {
        this._logger.debug("removing user");
        yield this.settings.userStore.remove(this._userStoreKey);
      }
    });
  }
  /**
   * Removes stale state entries in storage for incomplete authorize requests.
   */
  clearStaleState() {
    return __async(this, null, function* () {
      yield this._client.clearStaleState();
    });
  }
};
var version = "3.0.1";
var Version = version;
export {
  AccessTokenEvents,
  CheckSessionIFrame,
  ErrorResponse,
  ErrorTimeout,
  InMemoryWebStorage,
  Log,
  Logger,
  MetadataService,
  OidcClient,
  OidcClientSettingsStore,
  SessionMonitor,
  SigninResponse,
  SigninState,
  SignoutResponse,
  State,
  User,
  UserManager,
  UserManagerSettingsStore,
  Version,
  WebStorageStateStore
};
//# sourceMappingURL=oidc-client-ts.js.map
