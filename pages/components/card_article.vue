<template>
	<view class="cu-card article">
		<navigator :url="'/pages/article/article_detail?id='+item.id" class="cu-item shadow">
			<view class="title"><view class="text-cut">{{item.title || "未知"}}</view></view>
			<view class="content">
				<image :src="imgbaseUrl+item.cover_url"
				 mode="aspectFill"></image>
				<view class="desc">
					<view class="text-content">{{item.desc || "未知"}}</view>
					<!-- <view>
						<view class="cu-tag bg-red light sm round">正义天使</view>
						<view class="cu-tag bg-green light sm round">史诗</view>
					</view> -->
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object
		},
		data() {
			return {
				imgbaseUrl:this.$imgBaseUrl
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less">
	
</style>
