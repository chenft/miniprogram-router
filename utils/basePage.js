/*
 * @Description: add common Page options's item
 * @Author: Chenft
 * @Date: 2018-11-28 10:51:54
 * @LastEditors: Chenft
 * @LastEditTime: 2018-11-28 12:04:01
 */
const baseOpt = {
  /**
   * @description: initinal common onLoad callback 
   * @param { Object } options 
   * @return: 
   */
  onLoad(options) {
    if (options && options._cached) {
      this.getDataFromCached(options);
    } else {
      this.initData && this.initData();
    }
  },
  /**
   * @description: set cached data in page
   * @param { Object } params 
   * @return: 
   */
  getDataFromCached(params) {
    console.log('getDataFromCached', params);
    delete params._cached;
    delete params.__webviewId__;
    delete params.__proto__;
    this.setData(params);
  }
};
/**
 * @description: mixing common options and user options
 * @param { Object } ori
 * @param { Object } tar 
 * @return: { Object }
 */
function handlerOpt(ori, tar) {
  const options = {};
  for (const key in tar) {
    if (ori[key]) {
      options[key] = function(options) {
        ori[key].call(this, options);
        tar[key].call(this, options);
      };
    } else {
      options[key] = tar[key];
    }
  }
  for (const key in ori) {
    if (!options[key]) {
      options[key] = ori[key];
    }
  }
  return options;
}
export function basePage(opt) {
  const finalOptions = handlerOpt.call(this, baseOpt, opt);
  Page(finalOptions);
}
