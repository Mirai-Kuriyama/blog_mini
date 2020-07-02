import Vue from 'vue'
import App from './App'
import store from './store'
import {request} from '@/common/request.js'
import {apiBaseUrl,imgBaseUrl} from '@/common/url_config.js'
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
Vue.component('uni-notice-bar',uniNoticeBar)

Vue.prototype.$request = request
Vue.prototype.$requestUrl = apiBaseUrl
Vue.prototype.$imgBaseUrl = imgBaseUrl


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
