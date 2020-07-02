<template>
	<view class="introduction">
		<view class="padding radius shadow-blur bg-white">
			<view class="text-lg text-center">关于"微"博客</view>
			<view space class="margin-top-sm text-content indent">
				博客项目想做很久了,终于在有空的时间里前后台一起做了练练手,后续会陆续加功能,也可能会开放读者使用,敬请期待!
				<view>
					本项目绝大部分组件取自"ColorUi"小程序样式库和"ThorUi"组件库,采用Uniapp框架开发.
					<view class="">
						"ColorUi"样式库作者是 文晓港 大佬,这是他的github地址:<text @click="copy('https://github.com/weilanwl/ColorUI')" class="link">https://github.com/weilanwl/ColorUI</text>
					</view>
					<view class="">
						"ThorUi"组件库作者是 ThorUI_echo 大佬,这是他github地址<text @click="copy('https://github.com/dingyong0214/ThorUI-uniapp')" class="link">https://github.com/dingyong0214/ThorUI-uniapp</text>
					</view>
					<view class="">
					非常感谢!也非常感谢Dcloud公司开发出Uniapp框架,非常好用 !
					</view>
				</view>
				<view>
					本项目采用Uniapp开发小程序端,后台文章管理采用Vue + View-Ui组合开发, 后台接口采用Eggjs框架 + Mysql辅助使用Redis开发, 感谢你们 !
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			copy(str) {
				uni.setClipboardData({
					data:str,
					success() {
						uni.showToast({
							title:"复制成功"
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.introduction {
		padding: 50upx;
		letter-spacing: 2upx;
		.indent {
			text-indent: 54upx;
		}
		.link {
			color: #0366d6;
			text-decoration: underline;
		}
	}
</style>
