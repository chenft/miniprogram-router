/*
 * @Description: unlimited router, break the limit of wechat's ten pages 
 * @Author: Chenft
 * @Date: 2018-11-28 10:51:54
 * @LastEditors: Chenft
 * @LastEditTime: 2018-11-28 11:40:18
 */

import { stringify } from '/stringify.js';
class Router {
  constructor() {
    this.maxPagesCount = 10;
    this.pages = [];
  }
  routerPage({ method = 'navigateTo', url = '' }) {
    console.log(method, url);
    if (this.pages.length < this.maxPagesCount - 1) {
      try {
        wx[method]({
          url
        });
        switch (method) {
          case 'switchTab':
          case 'navigateTo':
            this.pushPage(url);
            break;
          case 'redirectTo':
            this.popPage();
            this.pushPage(url);
            break;
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      const currentPages = getCurrentPages();
      const { route, data } = currentPages.slice(-1)[0];
      wx.setStorage({
        key: `cached:${route}`,
        data
      });
      wx.redirectTo({
        url
      });
      this.pushPage(url);
    }
  }
  destroyPage(e) {
    if (this.pages.length < this.maxPagesCount) {
      wx.navigateBack({
        delta: 1
      });
      this.popPage();
    } else {
      this.popPage();
      const url = this.pages.slice(-1)[0].slice(1);
      const data = Object.assign(wx.getStorageSync('cached:' + url) || {}, {
        _cached: true
      });
      wx.redirectTo({
        url: stringify('/' + url, data)
      });
      if (this.pages.indexOf(url) < 0) {
        wx.removeStorage({
          key: 'cached:' + url
        });
      }
    }
  }
  pushPage(url) {
    this.pages.push(url);
  }
  popPage(e) {
    return this.pages.pop();
  }
  clearCached() {
    wx.getStorageInfo({
      success: res => {
        if (res.keys.length) {
          res.keys.forEach(key => {
            if (/^cached:/.test(key)) {
              wx.removeStorage({
                key
              });
            }
          });
        }
      }
    });
  }
}
export const router = new Router();
