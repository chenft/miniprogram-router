// components/navigator.js
const app = getApp()
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {

	},

	/**
	 * 组件的初始数据
	 */
	data: {
		navigatorH: app.globalData.navigatorH,
    statusBarHeight: app.globalData.statusBarHeight,
    router: app.globalData.router
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		back (e) {
			app.destroyPage()
		}
	}
})
