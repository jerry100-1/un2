<template>
	<view class="content">
	    <view class="top" style="margin-left:-40upx;">
	    	<view :class="{active:type3==1}" @tap="init(1)">微信收款</view>
	    	<view :class="{active:type3==2}" @tap="init(2)">渠道邀请</view>
	    	<view :class="{active:type3==3}" @tap="init(3)">用户邀请</view>
	    </view>
		
		<div class="box" v-if="type3==1">
			      <!-- 微信收款		 -->
				  
				  <canvas canvas-id="myCanvas2" id="canvas2"></canvas>
				  <view>
				  	<image :src="src2" alt="" style="width:300upx;height:300upx;"></image>
				  	<button @tap="save2">保存图片</button>
				  </view>
				  
				  
				  
		</div>
		<div class="box" v-if="type3==2">
			      <!-- 渠道邀请 -->
			      <canvas canvas-id="myCanvas3" id="canvas3"></canvas>
			      <view v-if="type==0" class="box">
			      	<image src="../../static/invite/invite_1.png" mode="wwidthFix" class="code1"></image>
			      	<image :src="src" class="qrcode1 code"></image>
			      </view>
			      <view v-if="type==1" class="box">
			      	<image src="../../static/invite/invite_2.png"  mode="wwidthFix" class="code2" ></image>
			      	<image :src="src" class="qrcode2 code" ></image>
			      </view>
			      <view class="btns">
			      	<button @tap="save">保存图片</button>
			      	
					<view style="width:280upx;display:flex;flex-direction:row;margin:0 auto;">
						<text @tap="service">联系客服</text>
						<!-- <text @tap="goInviteRecord">邀请记录</text> -->
					</view>
					
			      </view>
			
			
		</div>
		<div class="box" v-if="type3==3">
			<!-- 用户邀请 -->
			<canvas canvas-id="myCanvas1" id="canvas1" style="margin-top:-260upx"></canvas>
			<view v-if="type1==0" class="box">
				<image src="../../static/invite/invite_3.png" mode="wwidthFix" class="code1"></image>
				<image :src="src1" class="qrcode1 code"></image>
				<view>
					<text>邀请码:{{invitaionCode1}}</text>
				</view>
			</view>
			<view v-if="type1==1" class="box">
				<image src="../../static/invite/invite_4.png" mode="wwidthFix" class="code2"></image>
				<image :src="src1" class="qrcode2 code"></image>
				<view>
					<text>邀请码:{{invitaionCode1}}</text>
				</view>
			</view>
			
			<view class="btns">
				<button @tap="copy1" class="copy">复制邀请码</button>
				<button @tap="save1" style="margin:0upx;margin-left:auto;margin-right:auto;position:relative;top:-100upx">保存图片</button>
				<view style="width:300upx;height:60upx;display:flex;flex-direction:row;margin:10upx auto;">
					 <text @tap="service1">联系客服</text>
					 <text @tap="goUserRecord">邀请记录</text>
				</view>
			</view>
			
			
			
		</div>
		
	</view>
</template>

<script>
	var that=" ";
	export default{
		data()
		{
			return{
				type3:1,
				//渠道收款
				type:2,
				src:"",
				//微信收款
				src2:"",
				bgSrc2:"../../static/bg.png",
				tempFilePath2:"",
				//用户邀请
				invitaionCode1:"",
				type1: 2,
				tempFilePath1:"",
				src1:""
			}
		},
		onLoad:function(e)
		{
			    //渠道收款
			    that=this;
				uni.getStorage({
					key:"shopObj",
					success(res){
						let shopObj=JSON.parse(res.data);
						that.src="https://wx.hnlxyj.com/user/share/qrCode?block=1&width=800&height=800&url=http://www.hnlxyj.com/wx/register/enter.html?marchantId="+shopObj.merchantId
					}
				})
			   that.type=parseInt(Math.random()*2,10);
			   //微信收款
			   uni.getStorage({
					key:"shopObj",
					success(res){
						let shopObj=JSON.parse(res.data);
						
						let req="shopName="+shopObj.shopName+"%26shopId="+shopObj.shopId+"%26marchantId="+shopObj.merchantId;
						
					
						that.src2="https://wx.hnlxyj.com/user/share/qrCode?block=1&width=800&height=800&url=http://www.hnlxyj.com/wx/register/black.html?"+req
						
					}
			   })
			   //用户邀请
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
			   		that.invitaionCode1=num;
			    		that.src1="https://wx.hnlxyj.com/user/share/qrCode?block=1&width=800&height=800&url=http://www.hnlxyj.com/wx/register/register.html?marchantId="+shopObj.merchantId
			    	}
			   })
			   this.type1=parseInt(Math.random()*2,10);
			   
			   
			   
			   
			 
		},
		onShow(){
			console.log(that.type)
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: "/pages/user/userList1"
			})
		},
		methods:{
			goUserRecord:function()
			{
				uni.navigateTo({
					url:"/pages/user/userList2"
				})
			},
			goInviteRecord:function()
			{
			  uni.navigateTo({
                 url:"/pages/user/userList1"			  	
			  })	
			},
			init:function(index)
			{
				that.type3=index
				console.log("您点击了"+that.type3);
			},
			//微信收款
			save2(){
				uni.showLoading({
					title: '图片保存中...',
				})
				var that=this;
			
				const context = uni.createCanvasContext('myCanvas2')
				context.fillStyle="#00BFFF";
				context.drawImage(that.bgSrc2, 0,0, 375, 664)
				context.drawImage(that.src2, 40,100, 160, 160)
				context.draw(false, function() {
					uni.canvasToTempFilePath({
						canvasId: 'myCanvas2',
						success: function(res) {
							that.tempFilePath2=res.tempFilePath;
							uni.getImageInfo({
								src: that.tempFilePath2,
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
							
							
					// uni.downloadFile({
					// 		url: that.src2,
					// 		success: (res) =>{
					// 			if (res.statusCode === 200){
					// 				uni.saveImageToPhotosAlbum({
					// 					filePath: res.tempFilePath,
					// 					success: function() {
					// 						uni.showToast({
					// 							title: "保存成功",
					// 							icon: "none"
					// 						});
					// 					},
					// 					fail: function() {
					// 						uni.showToast({
					// 							title: "保存失败，请稍后重试",
					// 							icon: "none"
					// 						});
					// 					}
					// 				});
					// 			}
					// 		}
					// 	})
						
							
			
			},  
			//渠道邀请
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
				that.type = parseInt(Math.random() * 2, 10);
				const context = uni.createCanvasContext('myCanvas3')
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
			},
			 //用户邀请
			copy1(){
				uni.setClipboardData({
					data: that.invitaionCode1,
					success: function () {
						console.log('success');
					}
				});
			},
			service1() {
				uni.navigateTo({
					url: "/pages/enter/service"
				})
			},
			save1() {
				uni.showLoading({
					title: '图片保存中...',
				})
				// var that=this;
				var urlP="";
				var x=0,y=0;
				if(that.type==0){
					urlP="../../static/invite/invite_3.png";
					x=80;
					y=180;
				}else{
					urlP="../../static/invite/invite_4.png"
					x=80;
					y=210;
				}
				var url=that.src1;
				const context = uni.createCanvasContext('myCanvas1')
				context.drawImage(urlP, 0, 0, 274, 363)
				context.drawImage(url, x, y, 90, 90);
				context.setFillStyle('white');
				context.setFontSize(14);
				context.fillText("邀请码:"+that.invitaionCode1, 80,326)
				context.draw(false, function() {
					uni.canvasToTempFilePath({
						canvasId: 'myCanvas',
						success: function(res) {
							that.tempFilePath1=res.tempFilePath;
							uni.getImageInfo({
								src: that.tempFilePath1,
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
	.content{
		position:relative;
		background: #f2f2f2;
		text-align: center;
	}
	.top{
		position: fixed;
		width:100%;
		height:86upx;
		margin-top:-20px;
		line-height: 86upx;
		background: #fff;
		padding: 0 30upx;
		font-size:30upx;
		z-index: 100000;
	}
	.top>view{
		display: inline-block;
		margin-right: 40upx;
		border-bottom:4upx solid transparent;
	}
	.top>view.active{
		color:#2D93FF;
		border-bottom-color:#2D93FF;
	}
	.box{
		margin-top: 106upx;
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
		top: 390upx;
	}
	
	.qrcode2 {
		top: 460upx;
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
