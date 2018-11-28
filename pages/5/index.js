//index.js
//获取应用实例
const app = getApp()
import { basePage } from '../../utils/basePage.js'
basePage.call(this, {
	data: {
		motto: '5 World'
	},
	newPage(e) {
		app.routerPage({
			// method: 'redirectTo',
			url: '/pages/6/index'
		})
	}
})
