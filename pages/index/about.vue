<template>
	<view class="about">
		<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
			<navigator url="/pages/index/update_log" class="cu-item arrow" style="position: relative;">
				
				<view class="content">
					<text class="text-grey cuIcon-repairfill"></text>
					<text class="text-grey">更新日志</text>
				</view>
			</navigator>
			<navigator url="/pages/index/introduction" class="cu-item arrow" style="position: relative;">
				
				<view class="content">
					<text class="text-grey cuIcon-formfill"></text>
					<text class="text-grey">简介</text>
				</view>
			</navigator>
			<view class="cu-item arrow" style="position: relative;" @click="reLogin">
				
				<view class="content">
					<text class="text-grey cuIcon-formfill"></text>
					<text class="text-grey">清除缓存</text>
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
			reLogin() {
				uni.showModal({
					title:"提示",
					content:"确认清除登陆缓存吗?",
					success:res=> {
						if(res.confirm) {
							uni.removeStorageSync("user_info")
							this.$store.dispatch("initLogin")
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	
</style>
