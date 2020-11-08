<script>
	import Vue from 'vue'
	export default {
		async onLaunch() {
			let sys_info = uni.getSystemInfoSync();
			if(sys_info) {
				uni.setStorageSync('system_info', sys_info);
				// #ifndef MP
				Vue.prototype.StatusBar = sys_info.statusBarHeight;
				if (sys_info.platform == 'android') {
					Vue.prototype.CustomBar = sys_info.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = sys_info.statusBarHeight + 45;
				}
				// #endif
						
				// #ifdef MP-WEIXIN
				Vue.prototype.StatusBar = sys_info.statusBarHeight;
				let custom = uni.getMenuButtonBoundingClientRect();
				Vue.prototype.Custom = custom;
				Vue.prototype.CustomBar = custom.bottom + custom.top - sys_info.statusBarHeight;
				// #endif
						
				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = sys_info.statusBarHeight;
				Vue.prototype.CustomBar = sys_info.statusBarHeight + sys_info.titleBarHeight;
				// #endif
			}
			this.$store.dispatch("initLogin")
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	.text-light {
		font-weight: 300;
	}
	
	.auth-btn {
		width: 100%;
		height: 100%;
		padding: 0;
		position: absolute;
		left: 0;
		top:0;
		background-color: transparent;
		opacity: 0;
		z-index: 99;
		
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}
	
	@keyframes wobble {
		0% {
			transform: scale(1) rotate(0deg)
		}
		40% {
			transform: scale(1.2, .8) rotate(5deg)
		}
		70% {
			transform: scale(.8, 1.2) rotate(-3deg)
		}
		80% {
			transform: scale(1.1, .90) rotate(1deg)
		}
		to {
			transform: scale(1) rotate(0deg)
		}
	}
</style>
