<template>
	<view class="gesturer">
		<uni-drawer ref="drawerL" mode="left">
		    <view style="padding:30rpx;">
		        <view class="uni-title">个人信息</view>
		    </view>
		</uni-drawer>
		
		<uni-drawer ref="drawerR" width="220" mode="right">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:100vh">
				<view class="cu-item" style="overflow: hidden;text-overflow: ellipsis;" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="TabSelect(index,item.id)"
				 :data-id="index">{{item.text}}</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	export default {
		components:{
			uniDrawer
		},
		data() {
			return {
				list:[],
				tabCur:0,
				verticalNavTop:0,
			}
		},
		created() {
			this.refresh()
		},
		methods: {
			refresh() {
				this.getCats()
			},
			getCats() {
				this.$request("/api/category/wxget",{},"get",false).then(res=>{
					if(res.msg == "ok") {
						this.list = res.data
					}
				})
			},
			openL() {
				this.$refs.drawerR.open()
			},
			openR() {
				this.$refs.drawerL.open()
			},
			TabSelect(index,id) {
				this.tabCur = index;
				this.verticalNavTop = (index - 1) * 50
				this.$emit("tabChange",id)
			},
		}
	}
</script>

<style lang="less" scoped>
.gesturer {
	width: 100vw;
	height: 100vh;
	position: fixed;
	z-index: 19;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	.VerticalNav.nav {
		width: 100%;
		white-space: initial;
		.cu-item {
			width: 100%;
			text-align: center;
			background-color: #fff;
			margin: 0;
			border: none;
			height: 100upx;
			line-height: 100upx;
			position: relative;
			&.cur {
				background-color: #f1f1f1;
				&::after {
					content: "";
					width: 8upx;
					height: 30upx;
					border-radius: 0 10upx 10upx 0;
					position: absolute;
					background-color: currentColor;
					top: 0;
					left: 0;
					bottom: 0;
					margin: auto;
				}
			}
		}
	}
	
}
</style>
