// 千位，分割数字
export function formatNumber(num = "") {
  let decimalPart = "";
  num = num.toString();
  if (num.indexOf(".") != -1) {
    decimalPart = "." + num.split(".")[1];
    num = parseInt(num.split(".")[0]);
  }
  let array = num.toString().split("");
  let index = -3;
  while (array.length + index > 0) {
    array.splice(index, 0, ",");
    index -= 4;
  }
  return array.join("") + decimalPart;
}

// 时间戳转时间 2018.8.29 15:30
export function toTime(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + ".";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + ".";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return Y + M + D + h + m;
}
