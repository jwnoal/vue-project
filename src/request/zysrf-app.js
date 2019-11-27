/**
 * 客户端交互基础模块
 * @description 客户端交互基础模块. 尽量不要修改.
 * @example import zysrf from 'zysrf-app';
 */

const ua = window.navigator.userAgent;
const isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // IOS终端

/**
 * 生成随机字符串
 * @param {*} len
 */
const generateRandomAlphaNum = len => {
  var rdmString = "";
  for (
    ;
    rdmString.length < len;
    rdmString += Math.random()
      .toString(36)
      .substr(2)
  );
  return rdmString.substr(0, len);
};

/**
 * clientInteraction
 * @param {*} _json
 */
// eslint-disable-next-line no-unused-vars
const clientInteraction = _json => {
  if (typeof _json !== "object") {
    throw "参数不正确,请使用 json 格式参数";
  }
  //客户端调用方法
  try {
    if (isIos) {
      // 苹果
      window.webkit.messageHandlers.JSToNative_iOS.postMessage(_json);
    } else {
      // 安卓
      window.JSToNative.postMessage(JSON.stringify(_json));
    }
  } catch {
    console.error("app交互失败或参数不正确");
  }
};

/**
 * api请求 base 方法
 */
const apiBase = {
  doBaseRequest: _json => {
    let callbackName = `_${generateRandomAlphaNum(8)}`;
    let failbackName = `__${callbackName}`;

    let cb_ok = _json["callback"];
    let cb_err = _json["failback"];

    _json["callback"] = callbackName;
    _json["failback"] = failbackName;

    window[callbackName] = res => {
      try {
        res = JSON.parse(res);
      } catch {
        console.error("JSON.parse 异常");
      }
      console.log((_json.url || _json.method) + "==>");
      console.log(res);
      cb_ok && cb_ok(res);
      window[callbackName] = () => {};
    };
    window[failbackName] = res => {
      try {
        res = JSON.parse(res);
      } catch {
        console.error("JSON.parse 异常");
      }
      console.log((_json.url || _json.method) + "==>failback");
      console.log(res);
      cb_err && cb_err(res);
      window[failbackName] = () => {};
    };
    clientInteraction(_json);
  }
};

/**
 * 公共的 api
 */
const api = {
  /**
   * clientRequest
   */
  clientRequest: (_method, _params, _cb_ok = () => {}, _cb_err = () => {}) => {
    let _obj = {
      method: _method,
      params: _params,
      callback: _cb_ok,
      failback: _cb_err
    };
    apiBase.doBaseRequest(_obj);
  },
  /**
   * 通用的请求方法
   * @description 针对URL的请求
   */
  commonRequest: (_url, _params, _cb_ok = () => {}, _cb_err = () => {}) => {
    let _obj = {
      method: "commonRequest",
      url: _url,
      params: _params,
      callback: _cb_ok,
      failback: _cb_err
    };
    apiBase.doBaseRequest(_obj);
  }
};

export default api;
