# miniprogram-router

小程序无线路由 and demo。
具体实现方案参考自 (https://segmentfault.com/a/1190000016440273)，但是方案中提供的开源项目项目功能太多，并且使用框架不同，于是自己实现了一个只带有无限路由的功能的 demo。

# 策略

- 修改小程序默认导航行为，自行维护完整历史记录
- 页面层级小于等于 10 时，导航行为与原生导航行为一致
- 请求打开第 11 层及以上时，逻辑层级记录完整历史，实际层级每次都是直接将第 10 层替换为目标页面
- 返回时，逻辑层级相应回退；若回退后逻辑层级大于等于 10，则实际层级将第 10 层替换为目标页面，否则实际层级回退到相应页面
- demo:
  逻辑层级 1 - 2 - ... - 8 - 9 - 10
  实际层级 1 - 2 - ... - 8 - 9 - 10

  打开

  逻辑层级 1 - 2 - ... - 8 - 9 - 10 - 11
  实际层级 1 - 2 - ... - 8 - 9 - 11

  打开，打开，打开

  逻辑层级 1 - 2 - ... - 8 - 9 - 10 - 11 - 12 - 13 - 14
  实际层级 1 - 2 - ... - 8 - 9 - 14

  返回

  逻辑层级 1 - 2 - ... - 8 - 9 - 10 - 11 - 12 - 13
  实际层级 1 - 2 - ... - 8 - 9 - 13

  返回，返回，返回

  逻辑层级 1 - 2 - ... - 8 - 9 - 10
  实际层级 1 - 2 - ... - 8 - 9 - 10

  返回

  逻辑层级 1 - 2 - ... - 8 - 9
  实际层级 1 - 2 - ... - 8 - 9

# usage

## 使用 app.routerPage 代替 wx.navigateTo、wx.redirectTo 等用法

``` js
// method 默认为 navigateTo、wx
app.routerPage({
  // method: 'redirectTo',
  url: '/pages/1/index',
});
```

- 使用 basePage 代替 Page

``` js
//index.js
//获取应用实例
const app = getApp();
import { basePage } from '../../utils/basePage.js';
basePage.call(this, {
  data: {
    motto: '5 World',
  },
  newPage(e) {
    app.routerPage({
      url: '/pages/6/index',
    });
  },
});
```

## basePgage 会混合默认的页面参数和用户定义的参数。当用户定义了默认参数里的同名参数时（函数），会优先调用默认的回到函数，然后再调用用户定义的回调函数

## 混合参数中定义了 onLoad 回调函数。该回调函数会在适当的时候（返回页面并且此时页面栈长度大于微信定义的 10 层时）把缓存的 data 数据吐到页面上。

## 页面中的初始化数据建议写在 initData 函数上

``` js
## basePgage 中的默认参数 onLoad
onLoad(options) {
  if (options && options._cached) {
    this.getDataFromCached(options);
  } else {
    this.initData && this.initData();
  }
}
```
``` js
//index.js
//获取应用实例
const app = getApp()
import { basePage } from '../../utils/basePage.js'
basePage.call(this, {
	data: {
		motto: '3 World',
		load: false,
	},
	initData () {
		this.setData({
			load: true
		})
	},
	newPage(e) {
		app.routerPage({
			url: '/pages/4/index'
		})
	}
})

```