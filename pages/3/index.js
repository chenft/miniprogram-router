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
