/**
 * @author ydq
 * @date 2019/05/28
 * @description 版本控制工具
 */

class VersionCtrl {
  /**
   * @description 比较两个版本号大小. 第二个是否大于第一个param
   * @example
   * compareVersion ('1.11.0', '1.9.9');
   * @return Number
   */
  compareVersion(v1 = "0.0.0", v2 = "0.0.0") {
    let v1l = v1.split(".");
    let v2l = v2.split(".");
    let res = 0;
    v1l.some((e, i) => {
      let _v1 = (e || 0) | 0;
      let _v2 = (v2l[i] || 0) | 0;
      if (_v1 !== _v2) {
        res = _v1 > _v2 ? -1 : 1;
        return true;
      }
    });
    return res;
  }
  /**
   * @description 判断版本号是否在两者之间.
   * @return Boolean
   */
  betweenVersion(baseV = "0.0.0", v1 = "0.0.0", v2 = "0.0.0") {
    let res = false;
    let v1Cv2 = this.compareVersion(v1, v2);
    switch (v1Cv2) {
      case -1:
        res =
          this.compareVersion(v2, baseV) === 1 &&
          this.compareVersion(baseV, v1) === 1;
        break;
      case 0:
        res = this.compareVersion(v1, baseV) === 0;
        break;
      case 1:
        res =
          this.compareVersion(v1, baseV) === 1 &&
          this.compareVersion(baseV, v2) === 1;
        break;
    }
    return res;
  }
}

export default new VersionCtrl();
