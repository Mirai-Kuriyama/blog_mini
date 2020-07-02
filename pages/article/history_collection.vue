<template>
	<view class="his-collect">
		<!-- <view class="his-tab">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="tabSelect(index)" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
		</view> -->

		<view class="list">
			<mescroll-uni :fixed="false" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
				<view v-for="(item, index) in dataList" :key="index"><card-article :item="item.article"></card-article></view>
			</mescroll-uni>
		</view>

		
	</view>
</template>

<script>
import cardArticle from '@/pages/components/card_article.vue';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
import tuiFab from '@/components/tui-fab/tui-fab.vue';
// 引入mescroll-mixins.js
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	components: {
		cardArticle,
		MescrollUni,
		tuiFab
	},
	data() {
		return {
			flag: 'history',
			TabCur: 0,
			scrollLeft: 0,
			list: ['推荐', '最新', 'JS', 'Node', 'Vue', 'Css', 'MySQL', 'Mongoo'],

			dataList: [],
			tmp: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			upOption: {
				noMoreSize: 5,
				textNoMore: '~ 到底了 ~'
			},
			nav_text: {
				history: '浏览历史',
				collect: '我的收藏'
			},

			
		};
	},
	onLoad(op) {
		if (op.flag) {
			this.flag = op.flag
			uni.setNavigationBarTitle({
				title: this.nav_text[op.flag]
			});
		} else {
			uni.showToast({
				title: '携带参数有误',
				icon: 'none'
			});

			setTimeout(() => {
				uni.navigateBack();
			}, 800);
		}
	},
	methods: {
		getData(data) {
			let url = "/api/collection/get"
			
			if(this.flag == "history") {
				url = "/api/history/get"
			}
			this.$request(url, data)
				.then(res => {
					if (this.mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
					if (res.msg == 'ok' && res.data && res.data.rows.length) {
						this.dataList = this.dataList.concat(res.data.rows); //追加新数据
						this.mescroll.endBySize(res.data.rows.length, res.data.count || res.data.length);
					} else {
						this.mescroll.endBySize(0, 0);
					}
				})
				.catch(res => {});
		},
		/*上拉加载的回调*/
		upCallback(page) {
			let data = {
				page: page.num,
				page_size: page.size
			};
			// if(this.tab_id) {
			// 	data.category_id = this.tab_id
			// }
			this.getData(data);
		},
		tabSelect(index) {
			this.TabCur = index;
			this.scrollLeft = (index - 1) * 60;
		}
	}
};
</script>

<style lang="less">
.his-collect {
	height: 100vh;
	display: flex;
	flex-direction: column;
	.his-tab {
		// position: sticky;
		// top: 0;
		// z-index: 99;
	}
	.list {
		flex: 1;
		overflow: hidden;
	}
}
</style>
