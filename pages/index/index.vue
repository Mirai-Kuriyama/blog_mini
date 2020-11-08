<template>
	<view class="index">

		<view class="DrawerPage" :class="modalName=='viewModal'?'show':''">

			<gesture direction="horizontal" class="u-skeleton" @slideRight="slideRight" @slideLeft="slideLeft">

				<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
					<block v-for="(item,index) in dataList" :key="index">
						<!-- <card-article :item="item"></card-article> -->
						<view class="cu-card article">
							<navigator :url="'/pages/article/article_detail?id='+item.id" class="cu-item shadow">
								<view class="title">
									<view class="text-cut u-skeleton-rect">{{item.title || "未知"}}</view>
								</view>
								<view class="content">
									<image :src="imgbaseUrl+item.cover_url" mode="aspectFill" class="u-skeleton-fillet"></image>
									<view class="desc u-skeleton-rect">
										<view class="text-content">{{item.desc || "未知"}}</view>
										<!-- <view>
											<view class="cu-tag bg-red light sm round">正义天使</view>
											<view class="cu-tag bg-green light sm round">史诗</view>
										</view> -->
									</view>
								</view>
							</navigator>
						</view>
					</block>
				</mescroll-uni>

			</gesture>
			<u-skeleton :loading="loading" :animation="true"></u-skeleton>
			<drag-button isDock img="/static/publish_icon.png" @btnClick="btnClick" />
			<gesture-drawer ref="gestureDrawer" @tabChange="tabChange"></gesture-drawer>
		</view>

		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>
		<view scroll-y class="DrawerWindow" :class="modalName=='viewModal'?'show':''">

			<view class="cu-list menu-avatar">

				<view v-if="user_info.avatar_url" class="cu-item" style="margin: 0 30upx;border-radius: 20upx;position: relative;">
					<view class="cu-avatar round lg" :style="{'background-image':'url('+user_info.avatar_url+')'}"></view>
					<view class="content flex-sub">
						<view class="text-grey">{{user_info.username}}</view>
						<view class="text-gray text-sm flex">
							<text class="text-cut">{{user_info.area}}</text>
						</view>
					</view>

				</view>
				<view v-else class="cu-item" style="margin: 0 30upx;border-radius: 20upx;position: relative;">
					<button class="auth-btn" lang="zh_CN" type="default" open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
					<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
					<view class="content">
						<view class="text-grey">游客你好</view>
						<view class="text-gray text-sm flex">
							<text class="text-cut">点此授权头像,昵称</text>
						</view>
					</view>

				</view>

			</view>

			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				<navigator :url="item.url" class="cu-item arrow" v-for="(item,index) in menu_list" :key="index">
					<view class="content">
						<text class="text-grey" :class="item.icon"></text>
						<text class="text-grey">{{item.text}}</text>
					</view>
				</navigator>
			</view>

			<view class="switch-list">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text>主页向右滑开启此页({{switchBoolean?'已开':'已关'}})
					</view>
					<view class="action">
						<switch :checked="switchBoolean" @change="switchChange"></switch>
					</view>
				</view>
			</view>
			<view class="notice">

				<uni-notice-bar text="欢迎来到微博客! 主页向左划可打开分类。"></uni-notice-bar>
			</view>
			<view style="overflow-x:auto;">
				<official-account class="shadow-blur"></official-account>
			</view>

		</view>




	</view>
</template>

<script>
	import Gesture from '@/components/gesture/gesture.vue'
	import gestureDrawer from '@/pages/components/gesture_drawer.vue'
	import cardArticle from '@/pages/components/card_article.vue'
	import dragButton from '@/components/drag-button/drag-button.vue';
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import {
		mapState
	} from "vuex"
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		components: {
			Gesture,
			dragButton,
			cardArticle,
			gestureDrawer,
			MescrollUni
		},
		mixins: [MescrollMixin], // 使用mixin
		computed: {
			...mapState(["user_info"])
		},
		data() {
			return {
				imgbaseUrl: this.$imgBaseUrl,
				dataList: [{
					"cover_url": "blog/5lxnv2hri640000.jpg",
				}, {
					"cover_url": "blog/8c4156w30ec0000.jpg",
				},{
					"cover_url": "blog/8c4156w30ec0000.jpg",
				},{
					"cover_url": "blog/8c4156w30ec0000.jpg",
				}],
				upOption: {
					page: {
						size: 4 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					textNoMore: "~ 到底了 ~"
				},
				menu_list: [
					// {
					// 	text:"浏览记录",
					// 	url:"/pages/article/history_collection?flag=history",
					// 	icon:"cuIcon-timefill",
					// 	show:["1","2"]
					// },
					{
						text: "我的收藏",
						url: "/pages/article/history_collection?flag=collect",
						icon: "cuIcon-favorfill",
						show: ["1", "2"]
					},
					{
						text: "反馈",
						url: "/pages/index/feedback",
						icon: "cuIcon-writefill",
						show: ["1", "2"]
					},
					{
						text: "关于",
						url: "/pages/index/about",
						icon: "cuIcon-questionfill",
						show: ["1", "2"]
					}
				],


				tmp: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

				tab_id: "",

				modalName: null,

				switchBoolean: false,
				loading: true, // 是否显示骨架屏组件

			}
		},
		watch: {
			switchBoolean(nvalue) {
				uni.setStorageSync("gedture_toggle", nvalue)
			}
		},
		onShow() {

		},
		onLoad() {
			this.switchBoolean = !!uni.getStorageSync("gedture_toggle")
			uni.$on("refresh", this.refresh)
		},
		beforeDestroy() {
			uni.$ff("refresh", this.refresh)
		},
		methods: {
			inChange(e) {
				console.log(e)
			},
			refresh() {
				this.tab_id = ""
				this.downCallback()
				this.$refs.gestureDrawer.refresh()
			},
			getUserInfo(res) {
				if (res.detail.errMsg == "getUserInfo:ok") {
					delete res.detail.userInfo
					this.$store.dispatch("initLogin", res.detail)
				}
			},
			tabChange(tab_id) {
				this.tab_id = tab_id
				this.downCallback()
			},
			getData(data) {
				this.loading = true
				this.$request("/api/article/wxlist", data,"post",false).then(res => {
					if (this.mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
					this.loading = false
					if (res.msg == "ok" && res.data && res.data.rows.length) {
						this.dataList = this.dataList.concat(res.data.rows); //追加新数据
						this.mescroll.endBySize(res.data.rows.length, res.data.count || res.data.length);
					} else {
						this.mescroll.endBySize(0, 0);
					}

				}).catch(res => {})
			},
			switchChange(e) {
				this.switchBoolean = e.detail.value
			},
			/*下拉刷新的回调*/
			downCallback() {
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {

				let data = {
					page: page.num,
					page_size: page.size
				}
				if (this.tab_id) {
					data.category_id = this.tab_id
				}
				this.getData(data)
			},
			btnClick() {
				this.modalName = "viewModal"
			},
			slideLeft(e) {
				console.log('左滑===>下一页')
				this.$refs.gestureDrawer.openL()
			},
			slideRight() {
				console.log('右滑===>上一页')
				if (this.switchBoolean) {
					this.modalName = "viewModal"

				}
				// this.$refs.gestureDrawer.openR()
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="less">
	page {
		background-image: var(--gradualBlue);
		width: 100vw;
		overflow: hidden;
	}

	.index {
		width: 100vw;
		height: 100vh;

		.DrawerPage {
			position: fixed;
			width: 100vw;
			height: 100vh;
			left: 0vw;
			background-color: #f1f1f1;
			transform: translate3d(0);
			transition: all 0.4s;

			&.show {
				transform: scale(0.9, 0.9) translateZ(0);
				left: 85vw;
				box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
				transform-origin: 0;
			}

		}

		.DrawerWindow {
			position: absolute;
			width: 85vw;
			height: 100vh;
			left: 0;
			top: 0;
			transform: scale(0.9, 0.9) translateX(-100%) translateZ(0);
			opacity: 0;
			pointer-events: none;
			transition: all 0.4s;
			padding: 30upx 0;

			&.show {
				transform: scale(1, 1) translateX(0%) translateZ(0);
				opacity: 1;
				pointer-events: all;
			}

			.switch-list {
				padding: 0 30upx;
			}

			.notice {
				padding: 30upx;
			}
		}

		.DrawerClose {
			position: absolute;
			width: 40vw;
			height: 100vh;
			right: 0;
			top: 0;
			color: transparent;
			padding-bottom: 30upx;
			display: flex;
			align-items: flex-end;
			justify-content: center;
			background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
			letter-spacing: 5px;
			font-size: 50upx;
			opacity: 0;
			pointer-events: none;
			transform: translateZ(0);
			transition: all 0.4s;

			&.show {
				opacity: 1;
				transform: translate3d(0);
				pointer-events: all;
				width: 15vw;
				color: #fff;
			}
		}

		.cu-card.article>.cu-item .title {
			padding: 30upx;
			line-height: unset;
		}
	}
</style>
