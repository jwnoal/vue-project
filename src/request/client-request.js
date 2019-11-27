import request from "./zysrf-app";

/**
 * 打开APP内的页面
 * @param json { login, toBindInviteCode... }
 */
export function openNativeActivity(_page, _from, _cb_ok) {
  request.clientRequest(
    "openNativeActivity",
    {
      activity: _page,
      from: _from
    },
    _cb_ok
  );
}
