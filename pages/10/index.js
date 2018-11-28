//index.js
//获取应用实例
const app = getApp();
import { basePage } from "../../utils/basePage.js";
basePage.call(this, {
  data: {
    motto: "10 World",
    count: 0
  },
  newPage(e) {
    app.routerPage({
      url: "/pages/11/index"
    });
  },
  addCount() {
    this.setData({
      count: +this.data.count + 1
    });
  }
});
