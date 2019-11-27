/**
 * @author ydq
 * @date 2019/05/28
 * @description 工具类 js 文件
 */

const u = navigator.userAgent;
const Agents = [
  "Android",
  "iPhone",
  "SymbianOS",
  "Windows Phone",
  "iPad",
  "iPod"
];
let mobile = false;
for (let v = 0; v < Agents.length; v++) {
  if (u.indexOf(Agents[v]) > -1) {
    mobile = true;
    break;
  }
}

class Os {
  // 移动终端浏览器版本信息
  constructor() {
    this.mobile = mobile;
    this.ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.android = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
    this.iphone = u.indexOf("iPhone") > -1;
    this.ipad = u.indexOf("iPad") > -1;
  }
  /**
   * OS的判断
   * @return {[type]} [description]
   */
  getOsType() {
    let agent = navigator.userAgent.toLowerCase();
    let osType = "";
    let index = "";
    let version = "";
    if (/android/i.test(navigator.userAgent)) {
      index = agent.indexOf("android");
      version = agent.substr(index + 8, 3);
      osType = `Android ${version}`;
    }
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      index = agent.indexOf("os");
      version = agent.substr(index + 3, 4);
      osType = `iOS ${version}`;
    }
    if (
      /Linux/i.test(navigator.userAgent) &&
      !/android/i.test(navigator.userAgent) &&
      !/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
    ) {
      osType = "Linux";
    }
    if (/windows|win32/i.test(navigator.userAgent)) {
      osType = "windows32";
    }
    if (/windows|win64/i.test(navigator.userAgent)) {
      osType = "windows64";
    }
    return osType;
  }
}

export default new Os();
