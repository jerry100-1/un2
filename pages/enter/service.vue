<template>
	<view class="content">
		<canvas canvas-id="myCanvas" id="canvas"></canvas>
		<view class="info">
			<text class="title">湖南乐享一家智能科技有限公司</text>
			<text>地址:湖南省长沙市雨花区至雅大厦401室</text>
			<text>电话:0731-83185198</text>
			<text>网址:http://www.hnlxyj.com</text>
		</view>
		<view class="banner">
			<image src="../../static/capital/address.jpg" mode="widthFix"></image>
		</view>
		<view class="list">
			<view>
				<view>
					<image src="http://www.hnlxyj.com/wx/image/my/1.jpg"></image>
					<view>用户经理:谢先生</view>
					<view>电话:17373125198</view>
					<view class="btn" @tap="save(0)">保存图片</view>
				</view>
			</view>
			<view>
				<view>
					<image src="http://www.hnlxyj.com/wx/image/my/2.jpg"></image>
					<view>用户经理:颜先生</view>
					<view>电话:13319580429</view>
					<view class="btn" @tap="save(1)">保存图片</view>
				</view>
			</view>
			<view>
				<view>
					<image src="http://www.hnlxyj.com/wx/image/my/3.jpg"></image>
					<view>用户经理:黎先生</view>
					<view>电话:13574113658</view>
					<view class="btn" @tap="save(2)">保存图片</view>
				</view>
			</view>
			<view>
				<view>
					<image src="http://www.hnlxyj.com/wx/image/my/4.jpg"></image>
					<view>用户经理:彭先生</view>
					<view>电话:13574113658</view>
					<view class="btn" @tap="save(3)">保存图片</view>
				</view>
			</view>
			<view>
				<view>
					<image src="http://www.hnlxyj.com/wx/image/my/5.jpg"></image>
					<view>用户经理:王女士</view>
					<view>电话:17308415198</view>
					<view class="btn" @tap="save(4)">保存图片</view>
				</view>
			</view>
			<view>
				<view>
					<image src="http://www.hnlxyj.com/wx/image/my/6.jpg"></image>
					<view>用户经理:骆先生</view>
					<view>电话:18175197199</view>
					<view class="btn" @tap="save(5)">保存图片</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				arr:["http://www.hnlxyj.com/wx/image/my/1.jpg","http://www.hnlxyj.com/wx/image/my/2.jpg","http://www.hnlxyj.com/wx/image/my/3.jpg","http://www.hnlxyj.com/wx/image/my/4.jpg","http://www.hnlxyj.com/wx/image/my/5.jpg","http://www.hnlxyj.com/wx/image/my/6.jpg"]
			}
		},
		methods: {
			save(index) {
				uni.showLoading({
					title: '图片保存中...',
				})
				var that=this;
				const context = uni.createCanvasContext('myCanvas')
				context.drawImage(that.arr[index], 40, 40, 160, 160)
				context.draw(false, function() {
					uni.canvasToTempFilePath({
						canvasId: 'myCanvas',
						success: function(res) {
							uni.getImageInfo({
								src: res.tempFilePath,
								success: function(image) {
									uni.saveImageToPhotosAlbum({
										filePath: image.path,
										success: function() {
											uni.showToast({
												title: '图片保存成功',
												icon: 'none',
												duration: 2200
											});
										},
										fail: function() {
											uni.hideLoading()
											uni.showToast({
												title: "保存失败，请稍后重试",
												icon: "none"
											});
										}
									});
								}
							});
						}
					})
				})				
							
			}
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url:"enter1"
			})
		}
	}
</script>

<style scoped>
	#canvas{
		width: 494upx;
		height: 726upx;
		margin: 0 auto;
		border:1px solid #eee;
		position: absolute;
		top:-99999999px;
		left:-9999999999px;
	}
	.content{
		padding: 0;
		background: #f2f2f2;
	}
	.info{
		padding: 30upx;
	}
	.info text{
		display: block;
		margin-bottom: 10upx;
	}
	.title{
		font-size: 36upx;
		color:#333;
		font-weight: 600;
	}
	.banner image{
		width:100%;
	}
	.list{
		padding: 0 30upx;
	}
	.list>view{
		display: inline-block;
		width:312upx;
		text-align: center;
		margin-right: 30upx;
		margin-top: 40upx;
	}
	.list image{
		width:312upx;
		height:312upx;
	}
	.btn{
		width: 230upx;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		background: transparent;
		border: 1px solid #2D93FF;
		-webkit-border-radius: 20upx;
		border-radius: 20upx;
		color: #2D93FF;
		margin: 20upx auto;
		font-size: 30upx;
	}
</style>