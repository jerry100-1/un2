<template>
	<view class="content1" style="width:100%;">
		<view class="wrapHead" style="display:flex;flex-direction:row;align-items:center;position:relative;">
			 <view class="headLeft" style="flex:1;"></view>
			 <view class="headMiddle" style="color:#fff;flex:1;text-align:center;"> 邀请</view>
			 <view class="headLeft" style="flex:1;color:#fff;text-align:right;" @click="showThree">
				  <text class="iconfont icon-jiahao" style="margin-right:30upx;"></text>
			 </view>
		</view>
		
		<view class="top" style="display:flex;flex-direction:row;width:90%;margin-left:5%;margin-top:40upx;">
			<view  style="flex:1;" @click="go1">
			    微信收款
			</view>
			<view  style="flex:1"  @click="go2">
				<text style="color:#007AFF;border-bottom:2px solid #007AFF;padding-bottom:10upx;">渠道邀请</text>	
			</view>
			<view  style="flex:1"  @click="go3">用户邀请</view>
		 </view>
		 
		
		
		
		
		
		
		<canvas canvas-id="myCanvas" id="canvas"></canvas>
		<view v-if="type==0" class="box">
			<image src="../../static/invite/invite_1.png" mode="wwidthFix" class="code1"></image>
			<image :src="src" class="qrcode1 code"></image>
		</view>
		<view v-if="type==1" class="box">
			<image src="../../static/invite/invite_2.png" mode="wwidthFix" class="code2"></image>
			<image :src="src" class="qrcode2 code"></image>
		</view>
		<view class="btns" style="margin:20upx auto;text-align:center;">
			<button @tap="save" style="margin:0 auto;margin-top:200upx;">保存图片</button>
			<text @tap="service">联系客服</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				type:2,
				src:""
			}
		},
		methods:{
			
			go1:function()
			{
				uni.navigateTo({
					url:"../../pages/wx/mynewInvite1"
				})
			},
			go2:function()
			{
				uni.navigateTo({
					url:"../../pages/wx/mynewInvite2"
				})
			},
			go3:function()
			{
				uni.navigateTo({
					url:"../../pages/wx/mynewInvite3"
				})
			},
			
			
			
			service(){
				uni.navigateTo({
					url:"/pages/enter/service"
				})
			},
			save() {
				uni.showLoading({
					title: '图片保存中...',
				})
				let that=this;
				let urlP="";
				let x=0,y=0;
				if(this.type==0){
					urlP="../../static/invite/invite_1.png";
					x=80;
					y=140;
				}else{
					urlP="../../static/invite/invite_2.png"
					x=80;
					y=210;
				}
				let url=that.src;
				this.type = parseInt(Math.random() * 2, 10);
				const context = uni.createCanvasContext('myCanvas')
				context.drawImage(urlP, 0, 0, this.windowWidth, this.windowHeight)
				context.drawImage(that.src, x, y, 90, 90)
				context.draw(false, function() {
					uni.canvasToTempFilePath({
						canvasId: 'myCanvas',
						success: function(res) {
							that.tempFilePath=res.tempFilePath;
							uni.getImageInfo({
								src: that.tempFilePath,
								success: function(image) {
									console.log('图片信息：', JSON.stringify(image));
									that.type=that.type
									uni.saveImageToPhotosAlbum({
										filePath: image.path,
										success: function() {
											that.type=that.type
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
			let that=this;
			uni.getStorage({
			 	key:"shopObj",
			 	success(res){
			 		let shopObj=JSON.parse(res.data);
			 		that.src="https://wx.hnlxyj.com/user/share/qrCode?block=1&width=800&height=800&url=http://www.hnlxyj.com/wx/register/enter.html?marchantId="+shopObj.merchantId
			 	}
			})
			this.type=e.type
		},
	}
</script>

<style scoped>
	
	*{
		margin:0px;
		padding:0px;
	}
	page{
		background: #f8f8f8;
	}
	.wrapHead{
		width:100%;
		height:80upx;
		background:#007AFF;
	}
	
	.content{
		padding: 0;
		background: rgb(15, 174, 255);
	}
	
	
	.content {
		position:relative;
		background: #f2f2f2;
		text-align: center;
	}
	
	.box {
		width: 100%;
		position: relative;
		text-align: center;
	}
	#canvas{
		width: 494upx;
		height: 726upx;
		margin: 0 auto;
		border:1px solid #eee;
		position: absolute;
		top:-99999999px;
		left:-9999999999px;
	}
	.code {
		width: 192upx;
		height: 192upx;
		position: absolute;
		left: 248upx;
		margin: 0 auto;
	}
	
	.code1,
	.code2 {
		width: 494upx;
		height: 726upx;
		margin: 0 auto;
	}
	
	.qrcode1 {
		top: 300upx;
	}
	
	.qrcode2 {
		top: 430upx;
	}
	
	.btns text {
		display: block;
		text-align: center;
		width: 100%;
		text-decoration: underline;
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
