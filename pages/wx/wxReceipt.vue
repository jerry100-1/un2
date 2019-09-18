<template>
	<view style="width:100%;">
		<view class="top" style="display:flex;flex-direction:row;width:90%;margin-left:5%;margin-top:40upx;margin-bottom:60upx;margin-left:90upx;">
			<view  style="flex:1;" @click="go1">
			   <text style="color:#007AFF;border-bottom:2px solid #007AFF;padding-bottom:10upx;">微信收款</text>	
			</view>
			<!-- 1c2b3a -->
			<view  style="flex:1" @click="go2" v-if="level==2||level==1">渠道邀请</view>
			<view  style="flex:1" @click="go3">用户邀请</view>
		 </view>
		 
		 <view class="content">
		 	<canvas canvas-id="myCanvas" id="canvas"></canvas>
		 	<view>
		 		<image :src="src" alt=""></image>
		 		<button @tap="save">保存图片</button>
		 	</view>
		 </view>
		 
		 
		 
	</view>
	
</template>

<script>
	 export default {
		 data() {
			return {
			  src:"",
			  bgSrc:"../../static/bg.png",
			  level:"",
			}
		},
		methods:{
			go1:function()
			{
				uni.navigateTo({
					url:"../../pages/wx/wxReceipt?type="+parseInt(Math.random()*2,10)
				})
			},
			go2:function()
			{
				uni.navigateTo({
					url:"../../pages/wx/channel?type="+parseInt(Math.random()*2,10)
				})
			},
			go3:function()
			{
				uni.navigateTo({
					url:"../../pages/wx/userInvitation?type="+parseInt(Math.random()*2,10)
				})
			},
			
			
			
			
			save(){
				uni.showLoading({
					title: '图片保存中...',
				})
				var that=this;
			
				const context = uni.createCanvasContext('myCanvas')
				context.fillStyle="#00BFFF";
				context.drawImage(that.bgSrc, 0,0, 375, 664)
				context.drawImage(that.src, 40,100, 160, 160)
				context.draw(false, function() {
					uni.canvasToTempFilePath({
						canvasId: 'myCanvas',
						success: function(res) {
							that.tempFilePath=res.tempFilePath;
							uni.getImageInfo({
								src: that.tempFilePath,
								success: function(image) {
									console.log('图片信息：', JSON.stringify(image));
									uni.saveImageToPhotosAlbum({
										filePath: image.path,
										success: function() {
											console.log('save success');
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
		onLoad(e) {
			
			console.log("你好,这是在wx页面获取的level"+e.level);
			
			var that=this;
			uni.getStorage({
				key:"shopObj",
				success(res){
					let shopObj=JSON.parse(res.data);
					
					
					console.log("你好,我获取的level是"+shopObj.level);
					that.level=shopObj.level;
					
					let req="shopName="+shopObj.shopName+"%26shopId="+shopObj.shopId+"%26marchantId="+shopObj.merchantId;
		
				
					that.src="https://wx.hnlxyj.com/user/share/qrCode?block=1&width=800&height=800&url=http://www.hnlxyj.com/wx/register/black.html?"+req
					
				}
			})
		}
	}
</script>

<style scoped>
	page{
		background:#f2f2f2;
		}
	.content{
		padding: 0;
		background: rgb(15, 174, 255);
	}
	#canvas{
		width: 494upx;
		height: 726upx;
		margin: 0 auto;
		border:1px solid #eee;
		position: absolute;
		top:-99999999px;
		left:-9999999999px;
		background: #00BFFF;
	}
	.content image{
		width:380upx;
		height:380upx;
		margin: 0 auto;
		opacity: 1 !important;
	}
	.content>view{
		width:686upx;
		height:638upx;
		background: #fff;
		border-radius: 20upx ;
		padding-top: 80upx;
		box-sizing: border-box;
		margin: 0 auto;
		margin-top: 40upx;
		text-align: center;
	}
	button {
		width: 230upx;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		background: transparent;
		border: 1px solid #2D93FF;
		border-radius: 20upx;
		color: #2D93FF;
		margin-bottom: 210upx;
		margin-top: 68upx;
		font-size: 30upx;
	}
</style>
