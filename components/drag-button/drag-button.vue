<template>
	<view>
		<view
			id="_drag_button"
			class="drag"
			:style="'left: ' + left + 'px; top:' + top + 'px;'"
			@touchstart="touchstart"
			@touchmove.stop.prevent="touchmove"
			@touchend="touchend"
			@click.stop.prevent="click"
			:class="[ani_toggle?'active':'',isDock && !isMove?'transition':'' ]"
		>
			<view class="drag-ctt" :style="{width:img_width+'px',height:img_height+'px',opacity:opacity}">
				<image class="image" :src="img" v-if="img" @load="imgLoad"></image>
			</view>
			<!-- <text>{{ text }}</text> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: 'drag-button',
		props: {
			isDock:{
				type: Boolean,
				default: false
			},
			existTabBar:{
				type: Boolean,
				default: false
			},
			img:{
				type: String,
				default: ""
			}
		},
		data() {
			return {
				top:0,
				left:0,
				width: 0,
				height: 0,
				offsetWidth: 0,
				offsetHeight: 0,
				windowWidth: 0,
				windowHeight: 0,
				isMove: true,
				edge: 10,
				text: '按钮',
				
				ani_toggle:false,
				opacity:0,
				
				img_width:0,
				img_height:0,
			}
		},
		mounted() {
			const sys = uni.getStorageSync("system_info");
			this.windowWidth = sys.windowWidth;
			this.windowHeight = sys.windowHeight;
			
			this.existTabBar && (this.windowHeight -= 50);
			if (sys.windowTop) {
				this.windowHeight += sys.windowTop;
			}
			
			// const query = uni.createSelectorQuery().in(this);
			// query.select('#_drag_button').boundingClientRect(data => {
			// 	console.log(data)
			// 	this.width = data.width;
			// 	this.height = data.height;
			// 	this.offsetWidth = data.width / 2;
			// 	this.offsetHeight = data.height / 2;
			// 	this.left = this.windowWidth - this.width - this.edge;
			// 	this.top = this.windowHeight - this.height - this.edge - 80;
			// }).exec();
		},
		methods: {
			imgLoad(e) {
				this.img_width = uni.upx2px(e.detail.width)
				this.img_height = uni.upx2px(e.detail.height)
				const query = uni.createSelectorQuery().in(this);
				this.$nextTick(()=>{
					query.select('#_drag_button').boundingClientRect(data => {
						this.width = data.width;
						this.height = data.height;
						this.offsetWidth = data.width / 2;
						this.offsetHeight = data.height / 2;
						this.left = this.edge;
						// this.left = this.windowWidth - this.width - this.edge;
						this.top = this.windowHeight - this.height - this.edge - 80;
						// #ifdef APP-PLUS
							this.top = this.windowHeight - this.height - this.edge - 100;
						// #endif
						
						this.opacity = 1
					}).exec();
				},300)
				
			},
			click() {
				this.ani_toggle = true
				setTimeout(()=> {
					this.ani_toggle = false
				}, 200);
				this.$emit('btnClick');
			},
			touchstart(e) {
				this.$emit('btnTouchstart');
			},
			touchmove(e) {
				// 单指触摸
				if (e.touches.length !== 1) {
					return false;
				}
				
				this.isMove = true;
				
				this.left = e.touches[0].clientX - this.offsetWidth;
				
				let clientY = e.touches[0].clientY - this.offsetHeight;
				// #ifdef H5
					clientY += this.height;
				// #endif
				let edgeBottom = this.windowHeight - this.height - this.edge;

				// 上下触及边界
				if (clientY < this.edge) {
					this.top = this.edge;
				} else if (clientY > edgeBottom) {
					this.top = edgeBottom;
				} else {
					this.top = clientY
				}
				
			},
			touchend(e) {
				if (this.isDock) {
					let edgeRigth = this.windowWidth - this.width - this.edge;
					
					if (this.left < this.windowWidth / 2 - this.offsetWidth) {
						this.left = this.edge;
					} else {
						this.left = edgeRigth;
					}
					
				}
				
				this.isMove = false;
				
				this.$emit('btnTouchend');
			},
		}}
</script>

<style lang="scss">
	.drag {
		display: flex;
		justify-content: center;
		align-items: center;
		color: $uni-text-color-inverse;
		// width: 100upx;
		// height: 100upx;
		// border-radius: 50%;
		font-size: $uni-font-size-sm;
		position: fixed;
		z-index: 19;
		&.active {
			animation: wobble 0.3s;
		}
		.drag-ctt {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.image {
				width: 100%;
				height: 100%;
			}
		}
		&.transition {
			transition: left .3s ease,top .3s ease;
		}
	}
	
</style>
