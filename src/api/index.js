import { devApi } from "./dev.api";
import { prodApi } from "./prod.api";

let API = "";

if (process.env.VUE_APP_CURRENTMODE === "prod") {
  API = prodApi;
} else {
  API = devApi;
}

export default {
  name: API.name,
  cdn: API.cdn,
  path: {}
};
