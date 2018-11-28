//index.js
//获取应用实例
const app = getApp()
import { basePage } from '../../utils/basePage.js'
basePage.call(this, {
	data: {
		motto: '1',
	},
	newPage(e) {
		app.routerPage({
			url: '/pages/2/index'
		})
	}
})
