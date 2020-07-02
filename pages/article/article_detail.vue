<template>
	<view class="article-detail">
		<view class="header">
			<view class="title">{{ info.title || '未知标题' }}</view>
			<view class="info">
				<view class="time">{{ date || '请求中...' }}</view>
				<!-- <view class="view-num">
					50682 阅读
				</view> -->
			</view>
		</view>

		<view class="ctt"><jyf-parser selectable show-with-animation autosetTitle autoscroll :html="info.content" ref="article"></jyf-parser></view>

		<tui-fab :bgColor="bgColor" :btnList="btnList" @click="onClick"></tui-fab>
	</view>
</template>

<script>
import jyfParser from '@/components/jyf-parser/jyf-parser';
// import {str} from "./test.js"
import tuiFab from '@/components/tui-fab/tui-fab.vue';
import { getDate } from '@/common/util.js';

export default {
	components: {
		jyfParser,
		tuiFab
	},
	computed: {
		date() {
			if (this.info.created_at) {
				return getDate(this.info.created_at, 'year') || '请求中...';
			}
		}
	},
	data() {
		return {
			// 				html:`<p>这里是内容</p><p><br></p>
			// <video src="BV1KJ411C72x"></video>`
			html: '<p>请求中...</p>',
			info: {},
			bgColor: '#5677fc',
			btnList: [
				{
					bgColor: '#64B532',
					//图标/图片地址
					imgUrl: '/static/fab_share.png',
					//图片高度 rpx
					imgHeight: 64,
					//图片宽度 rpx
					imgWidth: 64,
					//名称
					text: '分享',
					//字体大小
					fontSize: 34,
					//字体颜色
					color: '#fff',
					//微信开放能力
					openType: 'share'
				},
				{
					bgColor: '#F2F2F2',
					//图标/图片地址
					imgUrl: '/static/collection.png',
					//图片高度 rpx
					imgHeight: 64,
					//图片宽度 rpx
					imgWidth: 64,
					//名称
					text: '收藏',
					//字体大小
					fontSize: 34,
					//字体颜色
					color: '#fff'
				}
			]
		};
	},
	onLoad(op) {
		if (op.id && op.id != 'undefined') {
			this.id = op.id;
			this.getData();
		} else {
			uni.showToast({
				title: '参数携带有误',
				icon: 'none'
			});
			setTimeout(() => {
				uni.navigateBack();
			}, 800);
		}
	},
	methods: {
		getData() {
			this.$request('/api/article/detail/' + this.id, {}, 'get').then(res => {
				if (res.msg == 'ok') {
					this.info = res.data;
					this.toggle(res.data.is_collect == 1);
				}
			});
		},

		toggle(flag) {
			if (flag) {
				this.btnList[1].bgColor = '#ffe1b0';
				this.btnList[1].text = '取消收藏';
				this.btnList[1].imgUrl = '/static/collection_active.png';
			} else {
				this.btnList[1].bgColor = '#F2F2F2';
				this.btnList[1].text = '收藏';
				this.btnList[1].imgUrl = '/static/collection.png';
			}
		},

		onClick(e) {
			let index = e.index;
			if (index == 1) {
				this.$request('/api/collection/toggle/' + this.info.id, {}, 'get').then(res => {
					if (res.msg == 'ok') {
						uni.showToast({
							title: res.data
						});
						this.toggle(res.data.indexOf('取消') == -1);
					}
				});
			}
		},

		collectToggle() {
			this.$request();
		},

		navigate(e) {
			console.log(e);
		}
	},
	onShareAppMessage() {
		return {
			title: this.info.title,
			path: '/pages/article/article_detail?id=' + this.info.id,
			imageUrl: this.$imgBaseUrl + this.info.cover_url
		};
	}
};
</script>

<style lang="less">
.article-detail {
	background-color: #fff;
	.header {
		padding: 30upx;

		.title {
			font-size: 38upx;
			color: #333;
			font-weight: bold;
			padding-bottom: 20upx;
		}
		.info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 30upx;
			color: #666;
		}
	}
	.ctt {
		padding: 0 30upx;
		padding-bottom: calc(env(safe-area-inset-bottom) + 20px);
	}
	& /deep/ .interlayer {
		overflow-x: hidden;
		.__table,
		.__div {
			overflow-x: auto;
			white-space: normal!important;
			word-break: keep-all!important;
			word-wrap: break-word!important;
		}
	}
}
</style>
