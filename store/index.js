import Vue from 'vue'
import Vuex from 'vuex'
import {request} from '@/common/request.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user_info:""
	},
	mutations: {
		setUserInfo(state,data) {
			state.user_info = data
		}
	},
    getters:{
       
    },
	actions: {
		async initLogin({state,commit},data) {
			if(data) {
			 	await login(commit,data)
			}else {
				let user_info = uni.getStorageSync("user_info")
				if(user_info) {
					if(!state.user_info || state.user_info.token!=user_info.token ) {
						commit("setUserInfo",user_info)
					}
				}else {
					await login(commit,data)
				}
			}
			
		},
		async forceLogin({commit}) {
			await login(commit)
		}
	}
})
async function login(commit,data) {
	uni.login({
		async success(res) {
			if(res.code) {
				let send_data = {
					code:res.code,
				}
				if(data) {
					send_data.info = data
				}
				let result = await request("/api/wxlogin",send_data,"post",false)
				if(result.msg=="ok" && result.data.token) {
					commit("setUserInfo",result.data)
					uni.setStorageSync("user_info",result.data)
					uni.$emit("refresh")
				}else {
					uni.showToast({
						title:"登陆失败",
						icon:"none"
					})
				}
			}
		}
	})
}
export default store
