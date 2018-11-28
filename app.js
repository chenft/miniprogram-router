import { router } from '/utils/router.js'
App({
	onLaunch: function () {
		router.clearCached()
		const {
			screenHeight,
			statusBarHeight,
			windowHeight,
			model
		} = wx.getSystemInfoSync()
		const totalTopHeight = model.indexOf('iPhone X') > -1
			? 88
			: model.indexOf('iPhone') > -1
				? 64
				: 68
		this.globalData.navigatorH = totalTopHeight - statusBarHeight
    this.globalData.statusBarHeight = statusBarHeight
    this.globalData.router = router
	},
	routerPage: router.routerPage.bind(router),
	destroyPage: router.destroyPage.bind(router),
	globalData: {
		userInfo: null,
		navigatorH: 0,
    statusBarHeight: 0,
    router: null
	}
})