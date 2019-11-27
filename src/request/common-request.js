import request from "./zysrf-app";
import api from "../api";

/**
 * 邀请码加分接口
 */
export const getUserdatalist = _cb_ok => {
  const _url = api.path.getuserdatalist;
  const params = {
    totalbool: "1"
  };
  request.commonRequest(_url, params, _cb_ok);
};
