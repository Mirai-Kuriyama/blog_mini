import {
	apiBaseUrl as baseUrl
} from "@/common/url_config.js"
import store from '@/store/index.js'
let flag = 0
export function request(url, params = {}, methods = "post", showLoading = true, is_form_params = false) {
	let user_info = uni.getStorageSync('user_info');
	let reqheader = {
		'Content-Type': 'application/json',
	};
	if (is_form_params) {
		// reqheader['Content-Type'] = "multipart/form-data"
		reqheader['Content-Type'] = "application/x-www-form-urlencoded"
	}
	if (user_info.token) {
		reqheader.authorization = "wx " + user_info.token;
	}
	if (showLoading) {
		uni.showLoading({
			mask: true,
			title: '请求中...'
		})
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url + '/',
			data: params,
			method: methods,
			header: reqheader,
			success(res) { // 请求只要发出去了 就算是404，500 都会走这里（猜测是微信的api控制这个行为）
				let data = res.data
				if (res.statusCode == 200) { // 服务器状态码 200为请求成功，具体服务器约定的其他错误，如传参错误等，在这个里面判断
					resolve(data)
					setTimeout(() => {
						flag = 0
					}, 800)
				} else { // 服务器404 500等

					let str = "请求失败，请稍后再试！"
					if (res.statusCode == 422 || res.statusCode == 404) { // 参数错误
						str = data.data || data.message
					} else if (res.statusCode == 403) {
						if (flag == 0) {
							flag++
							uni.removeStorageSync("user_info")
							store.dispatch("forceLogin")
							setTimeout(() => {
								flag = 0
							}, 800)
							reject(res)
							return
						}
					}
					uni.showToast({
						title: str,
						icon: "none"

					})

					reject(res)
				}
			},
			fail(res) { // 请求未发出(如超时等) 或其他错误走这里
				if (res.errMsg.indexOf("timeout") != -1) { // 请求超时提醒
					uni.showToast({
						title: "请求超时，请稍后再试！",
						icon: "none"

					})
				} else { // 其他错误提醒
					uni.showToast({
						title: "请求错误，请稍后再试！",
						icon: "none"

					})
				}
				reject(res)
			},
			complete() {
				showLoading && uni.hideLoading()
			}
		})
	})
}
