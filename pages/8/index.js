//index.js
//获取应用实例
const app = getApp()
import { basePage } from '../../utils/basePage.js'
basePage.call(this, {
	data: {
		motto: '8 World'
	},
	newPage(e) {
		app.routerPage({
			url: '/pages/9/index'
		})
	}
})
