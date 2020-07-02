<template>
	<view class="feedback">
		<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
			<view class="cu-item arrow" style="position: relative;">
				<button class="botton-open" type="default" open-type="contact"></button>
				<view class="content">
					<text class="text-grey cuIcon-servicefill"></text>
					<text class="text-grey">客服反馈</text>
				</view>
			</view>
			<view class="cu-item arrow" style="position: relative;">
				<button class="botton-open" type="default" open-type="feedback"></button>
				<view class="content">
					<text class="text-grey cuIcon-communityfill"></text>
					<text class="text-grey">意见反馈</text>
				</view>
			</view>
			<view class="cu-item arrow" style="position: relative;" @click="applyFor">
				<view class="content">
					<text class="text-grey cuIcon-communityfill"></text>
					<text class="text-grey">申请写博客</text>
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
			applyFor() {
				uni.showToast({
					title:"抱歉,后续视情况会开放使用",
					icon:"none"
				})
			}
		}
	}
</script>

<style lang="less">
	.feedback {
		.botton-open {
			width: 100%;
			height: 100%;
			opacity: 0;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 99;
		}
	}
</style>
