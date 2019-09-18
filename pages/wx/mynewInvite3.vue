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
				渠道邀请
			</view>
			<view  style="flex:1"  @click="go3">
				<text style="color:#007AFF;border-bottom:2px solid #007AFF;padding-bottom:10upx;">
				用户邀请
				</text>	
				
			</view>
		 </view>
		 
	
	      <view class="content">
	      	<canvas canvas-id="myCanvas" id="canvas"></canvas>
	      	<view v-if="type==0" class="box">
	      		<image src="../../static/invite/invite_3.png" mode="wwidthFix" class="code1"></image>
	      		<image :src="src" class="qrcode1 code"></image>
	      		<view>
	      			<text>邀请码:{{invitaionCode}}</text>
	      		</view>
	      	</view>
	      	<view v-if="type==1" class="box">
	      		<image src="../../static/invite/invite_4.png" mode="wwidthFix" class="code2"></image>
	      		<image :src="src" class="qrcode2 code"></image>
	      		<view>
	      			<text>邀请码:{{invitaionCode}}</text>
	      		</view>
	      	</view>
	      	
	      	<view class="btns">
	      		<button @tap="copy" class="copy">复制邀请码</button>
	      		<button @tap="save">保存图片</button>
	      		<text @tap="service">联系客服</text>
	      	</view>
	      
	      </view>
	
	
	
	
	
	
	
	
	
		
		
		
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				invitaionCode:"",
				type: 2,
				tempFilePath:"",
				src:""
			}
		},
		onLoad(e) {
			//let type=parseInt(Math.random()*2,10);
			let that=this;
			uni.getStorage({
			 	key:"shopObj",
			 	success(res){
			 		let shopObj=JSON.parse(res.data);
					shopObj.merchantId+=""
					var num="";
					for(let i=0,len=8-shopObj.merchantId.length;i<len;i++){
						num+=0
					}
					num+=shopObj.merchantId;
					that.invitaionCode=num;
			 		that.src="https://wx.hnlxyj.com/user/share/qrCode?block=1&width=800&height=800&url=http://www.hnlxyj.com/wx/register/register.html?marchantId="+shopObj.merchantId
			 	}
			})
			this.type=e.type
		},
		onShow(){
			console.log(this.type)
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: "/pages/user/userList1"
			})
		},
		methods: {
			
			
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
			
			
			
			
			copy(){
				uni.setClipboardData({
					data: this.invitaionCode,
					success: function () {
						console.log('success');
					}
				});
			},
			service() {
				uni.navigateTo({
					url: "/pages/enter/service"
				})
			},
			save() {
				uni.showLoading({
					title: '图片保存中...',
				})
				var that=this;
				var urlP="";
				var x=0,y=0;
				if(this.type==0){
					urlP="../../static/invite/invite_3.png";
					x=80;
					y=180;
				}else{
					urlP="../../static/invite/invite_4.png"
					x=80;
					y=210;
				}
				var url=that.src;
				const context = uni.createCanvasContext('myCanvas')
				context.drawImage(urlP, 0, 0, 274, 363)
				context.drawImage(url, x, y, 90, 90);
				context.setFillStyle('white');
				context.setFontSize(14);
				context.fillText("邀请码:"+that.invitaionCode, 80,326)
				context.draw(false, function() {
					uni.canvasToTempFilePath({
						canvasId: 'myCanvas',
						success: function(res) {
							that.tempFilePath=res.tempFilePath;
							uni.getImageInfo({
								src: that.tempFilePath,
								success: function(image) {
									uni.saveImageToPhotosAlbum({
										filePath: image.path,
										success: function() {
											uni.hideLoading()
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
		}
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
	.box>view{
		position: absolute;
		bottom: 70upx;
		color: #fff;
		left: 224upx;
		font-size: 28upx;
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
	.copy{
		margin-bottom: 20upx;
	}
	.code1,.code2 {
		width: 494upx;
		height: 726upx;
		margin: 0 auto;
	}
	
	.qrcode1 {
		top: 400upx;
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
		width: 210upx;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		background: transparent;
		border: 1px solid #2D93FF;
		-webkit-border-radius: 20upx;
		border-radius: 20upx;
		color: #2D93FF;
		margin-bottom: 210upx;
		margin-top: 68upx;
		font-size: 30upx;
		margin-left: 20upx;
		vertical-align: text-top;
		display: inline-block;
	}
	
	
	
	
</style>
