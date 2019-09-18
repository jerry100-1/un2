<template>
	<view class="content">
		<!-- <view class="top"></view> -->
		<view class="uni-page-head" style="display:flex;flex-direction:row;align-items:center;">
			<view class="" style="flex:1;visibility:hidden;">
				<image src="../../static/logo@2x.png" alt="" class="logo"></image>
			</view>
			<view class="center" style="flex:1;">
				我的店
			</view>
			<view class=""  style="flex:1;">
				  <view @tap="url" data-url="/pages/enter/briefIntroduction" style="width:140upx;text-align:right;" class="rightTextMsg">商户简介</view>
				
			<!-- 	<view @tap="changeDown">
					<image src="../../static/home/addpng.png" class="add" mode="widthFix" ></image>
				</view>
				<view @tap="url" data-url="/pages/system/system">
					<image src="../../static/home/system.png" class="system" mode="widthFix"  ></image>
				</view>
				<view class="down" v-if="isDown">
					<view class="up"></view>
					<view class="border" @tap="url" data-url="/pages/wx/wxReceipt" v-if="isPayQR">
						微信收款
					</view>
					<view class="border" @tap="urlCode" data-url="/pages/wx/channel" v-if="shopObj.level*1<3">
						渠道邀请
					</view>
					<view class="border" @tap="urlCode" data-url="/pages/wx/userInvitation">
						用户邀请
					</view>
				</view> -->
				
			</view>
		</view>
		
		<view class="shopInfo"  @click="centerClick1">
			<view style="display:flex;flex-direction:row;">
			
					<view class="img">
						<image :src="shopObj.disPlayImg" @tap="changeImg"></image>
					</view>
					<view style="flex-shrink:0;flex:1;height:80upx;">
						<view style="width:100%;">
							 <view style="width:100%;height:40upx;">
								 <view style="width:56%;height:40upx;float:left;font-size:28upx;text-align:left;">
									 {{shopObj.shopName}}
								 </view>
								 <view style="width:44%;height:40upx;float:right;font-size:28upx;text-align:right;">
								 	 {{shopObj.levelName}} （{{shopObj.levelName=="C"?'运营商':shopObj.levelName=="B"?'渠道商':shopObj.levelName=="A"?'联盟商家':'联盟商家'}}）					 
								 </view>
								 
							 </view>
							 <view style="width:100%;height:40upx;">
								 上次登录:{{shopObj.loginTime}}
							 </view>
						</view>
						
						
					</view>
					
					<!-- <view style="height:44upx;background:red;float:right;">
						<view style="height:44upx;width:60%;background:green;float:left;text-overflow:ellipsis;white-space:nowrap;">
							{{shopObj.shopName}}
						</view>
						<view style="height:44upx;width:40%;background:yellow;float:right;text-align:right;text-overflow:ellipsis;white-space:nowrap;">
							{{shopObj.levelName}} （{{shopObj.levelName=="C"?'运营商':shopObj.levelName=="B"?'渠道商':shopObj.levelName=="A"?'联盟商家':'联盟商家'}}）
						</view>
					</view> -->
				
			</view>
	
			<!-- <view>
				<view>{{shopObj.shopName}}</view>
				<view>上次登录:{{shopObj.loginTime}}</view>
			</view>
			<view class="r">
				<view>
					{{shopObj.levelName}} （{{shopObj.levelName=="C"?'运营商':shopObj.levelName=="B"?'渠道商':shopObj.levelName=="A"?'联盟商家':'联盟商家'}}）
				</view>
			</view> -->
		</view>
		<view class="proList" >
			<!-- <view v-for="(item,index) in textInfo.imgs" :key="index">
				<image :src="item" @tap="prevMyImg" :id="index"></image>
			</view> -->
			
			<view v-for="(item,index) in filterNewProductList" :key="index">
				<image :src="item.productImg" :data-productid="item.productId" @tap="goToDetail" :id="index" mode=""></image>				
			</view>
			
			
		</view>
		<view class="textInfo" @click="centerClick2">
			<view>
				<view @tap="goUrl" data-url="/pages/user/userAdmin">
					<text>{{textInfo.memberCount}}</text>
					<view class="text">用户总数</view>
				</view>
				<view  @tap="goUrl" data-url="/pages/order/orderList">
					<text>{{textInfo.orderCount}}</text>
					<view class="text">订单总数</view>
				</view>
				<view  @tap="goUrl" data-url="/pages/capital/index">
					<text>{{textInfo.sellAmount}}</text>
					<view class="text">销售金额</view>
				</view>
				<view>
					<text>{{textInfo.collectCount}}</text>
					<view class="text">收藏总数</view>
				</view>
			</view>
			<view>
				<view v-if="shopObj.level*1<3" @tap="goUrl" data-url="/pages/enter/index">
					<text>{{textInfo.aChannelCount}}</text>
					<view class="text">渠道A数</view>
				</view>
			<!-- 	<view  v-if="shopObj.level*1<3">
					<text>{{textInfo.a2ChannelCount}}</text>
					<view class="text">渠道A2数</view>
				</view> -->
				<view  v-if="shopObj.level*1<2" @tap="goUrl" data-url="/pages/enter/index">
					<text>{{textInfo.bChannelCount}}</text>
					<view class="text">渠道B数</view>
				</view>
				
				
				<view  @tap="goUrl200" :data-invitebonus="textInfo.inviteBonus" data-url="/pages/capital/index">
					<text>{{textInfo.inviteBonus}}</text>
					<view class="text">注册奖励金额</view>
				</view>
				
				<view  @tap="goUrl201" data-url="/pages/capital/index">
					<text>{{textInfo.jiaoyi||0}}</text>
					<view class="text">交易补贴金额</view>
				</view>
				
				<!-- <view>
					<text>{{textInfo.browseCount}}</text>
					<view class="text">浏览总数</view>
				</view> -->
			</view>
		</view>
		<view class="banner" @click="centerClick3">
			<image src="/static/home/banner.png" alt="" mode="widthFix"></image>
		</view>
		<view class="enter">
			<view @click="centerClick6">
				
				<view @tap="url" data-url="/pages/user/userAdmin">
					<view class="enter_item bg1">
						<image class="image1" src="/static/home/user.png" style="margin-top:-1upx;" alt="" mode="widthFix"></image>
						<text class="newTextDesc" style="padding-top:20upx;">用户</text>
						<image  @click.stop="clickTap" data-index="1" src="/static/addImg/icon_tips@2x.png" style="width:15px;height:15px;z-index:0;"     class="rightImgAb" mode="widthFix"></image>
					
					    <view  v-if="index==1" class="addNewView">
							 商家直属用户,下级关联用户,交易用户的管理专区,还可对订单评论进行查看,回复等；
						</view>
					
					
					
					</view>
				</view>
				
				<view>
					<view class="enter_item bg2" @tap="url" data-url="/pages/pro/index">
						<image class="image1" style="margin-top:-1upx;" src="/static/home/shop.png" alt="" mode="widthFix"></image>
						<text class="newTextDesc" style="padding-top:20upx;">商品</text>
						<image  @click.stop="clickTap" data-index="2" src="/static/addImg/icon_tips@2x.png" style="width:15px;height:15px;z-index:0;"     class="rightImgAb" mode="widthFix"></image>
											
						<view  v-if="index==2" class="addNewView">
							发布商品至商家在乐驿享的专属店铺进行线上销售;对出售中,待审核,审核失败的商品进行管理；
						</view>	
					</view>
				</view>
				<view>
					<view class="enter_item bg3" @tap="url" data-url="/pages/order/orderList">
						<image class="image1" style="margin-top:-1upx;" src="/static/home/order.png" alt="" mode="widthFix"></image>
						<text class="newTextDesc" style="padding-top:20upx;">订单</text>
						<image  @click.stop="clickTap" data-index="3" src="/static/addImg/icon_tips@2x.png" style="width:15px;height:15px;z-index:0;"     class="rightImgAb" mode="widthFix"></image>
											
						<view  v-if="index==3" class="addNewView">
							对线上订单和线下订单进行查询,管理,发货,跟踪,对退款订单进行及时处理等;
						</view>	
					</view>
				</view>
				 
				 <view>
				 	<view class="enter_item bg4" @tap="url" data-url="/pages/capital/index">
				 		<image class="image1" style="margin-top:-1upx;" src="/static/home/capt.png" alt="" mode="widthFix"></image>
				 		<text class="newTextDesc" style="padding-top:20upx;">资金</text>
						<image  @click.stop="clickTap" data-index="4" src="/static/addImg/icon_tips@2x.png" style="width:15px;height:15px;z-index:0;"     class="rightImgAb" mode="widthFix"></image>
											
						<view  v-if="index==4" class="addNewView" id="addNewView4">
							销售收入,用户返佣,注册奖励,交易补贴的提现;收入金额,发放金额,提现金额的明细报表
						</view>	
				 	</view>
				 </view>
				
				
			</view>
			<view>
				
				
				
				<view>
					<view class="enter_item bg5" @tap="url2" data-url="/pages/enter/index">
						<image class="image1" style="margin-top:-1upx;" src="/static/home/invit.png" alt="" mode="widthFix"></image>
						<text class="newTextDesc" style="padding-top:20upx;">渠道</text>
						<image   @click.stop="clickTap" data-index="5" src="/static/addImg/icon_tips@2x.png" style="width:15px;height:15px;z-index:0;"     class="rightImgAb" mode="widthFix"></image>
											
						<view  v-if="index==5" class="addNewView">
							对所属渠道的新增,管理,对渠道资料的修改完善,对商户身份,支付方式的修改确认等;
						</view>	
					</view>
				</view>
				<view>
					<view class="enter_item bg7" @tap="url89" data-url="/pages/wx/wxReceipt">
						<image class="image1" style="margin-top:-1upx;" src="/static/addImg/icon_home6.png" alt="" mode="widthFix"></image>
						<text class="newTextDesc" style="padding-top:20upx;">邀请</text>
						<image   @click.stop="clickTap" data-index="6" src="/static/addImg/icon_tips@2x.png" style="width:15px;height:15px;z-index:0;"     class="rightImgAb" mode="widthFix"></image>
											
						<view  v-if="index==6" class="addNewView">
							通过二维码邀请下级渠道入驻和直属用户注册乐驿享,建立关联关系,获得渠道收入和交易返佣;
						</view>	
					</view>
				</view>
				
				<view>
					<view class="enter_item bg6" @tap="url" data-url="/pages/msg/msgList">
						<image class="image1" style="margin-top:-1upx;" src="/static/home/msg.png" alt="" mode="widthFix"></image>
						<text class="newTextDesc" style="padding-top:20upx;">消息</text>
						<image   @click.stop="clickTap" data-index="7" src="/static/addImg/icon_tips@2x.png" style="width:15px;height:15px;z-index:0;"     class="rightImgAb" mode="widthFix"></image>
											
						<view  v-if="index==7" class="addNewView">
								集中管理关于系统,订单,物流,资金入账的消息通知,方便快捷;
						</view>	
					</view>
				</view>
				
				<view @tap="url" data-url="/pages/system/system">
					<view class="enter_item bg8">
						<image class="image1"  style="margin-top:-1upx;" src="/static/addImg/icon_home8.png" alt="" mode="widthFix"></image>
						<text class="newTextDesc" style="padding-top:20upx;">设置</text>
						<image   @click.stop="clickTap" data-index="8" src="/static/addImg/icon_tips@2x.png" style="width:15px;height:15px;z-index:0;"     class="rightImgAb" mode="widthFix"></image>
											
						<view  v-if="index==8" class="addNewView" id="addNewView8">	
                             处理包括安全手机,登录密码,取现密码,地址管理,清除缓存等系统功能。
						</view>		
					</view>
				</view>
				
			</view>
		</view>
		
		
		<view class="msg" v-if="false" @click="centerClick5">
			<view>
				<image src="/static/home/user.png" alt="" mode="widthFix"></image>
				<view>
					<view class="h5">
						乐享公告
					</view>
					<view>
						【与你有关】春节期间乐享各项工作安排
					</view>
				</view>
			</view>
		</view>
	
	      <view class="botText" @click="centerClick5">
	     			 
				 <view class="botTextInner">
					 <text class="botTextInnerLeft" @tap="makePhoneCall">联系客服</text>
					 <text class="botTextInnerMiddle">
						 <text class="borderText"></text>
						 
					 </text>
					 <text class="botTextInnerRight" @tap="goProblemPage">常见问题</text>
				 </view>
	     			 
	     </view>
	     		
	
	
	
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isPayQR:"",
				shopObj:{},
				showFlag:false,
				marchantId:"",
				textInfo: {},
				index:0,
				invite: "",//13327313408
				isDown: false, //是否显示微信收款等下拉
				newProductList:[],
				filterNewProductList:[]
			}
		},
		methods: {
			goUrl200:function(e)
			{
		      uni.navigateTo({
		      	url:e.currentTarget.dataset.url
		      })
			},
			goUrl201:function(e){
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			},
			//查询数据
			searchIndexData(){
				let that=this;
					that.$ajax({
						url:"/shopProduct/selectShopProduct",
						method:"POST",
						data:{
							shopId:that.shopObj.shopId,
							type:1,
							pageNo:1
						},
						success(d){
						  console.log("这是首页获取所有商品的数据-------"+d);
						  
						  console.log("这是列表的数据的长度"+d.lists.length);
						  that.newProductList=d.lists;
						  that.filterNewProductList=that.newProductList.filter((item,index)=>index<4);
						  console.log("这是过滤后的数据"+that.filterNewProductList);
						  
						},
					})
					
			},
			goToDetail:function(e)
			{
			 console.log("你好,我获取的产品的id是"+e.currentTarget.dataset.productid);
				uni.navigateTo({
					url:"/pages/pro/proSee?productId="+e.currentTarget.dataset.productid
				}) 
				 
			},		
			tap:function(url)
			{
				uni.navigateTo({
					url:url
				});
			},
			goUrl2:function(e)
			{
				console.log("你好,我得到的url是"+e.currentTarget.dataset.url);
				let url=e.currentTarget.dataset.url;
				let invitebonus=e.currentTarget.dataset.invitebonus;
				console.log("你好,得到的invitebonus是"+invitebonus);
				uni.navigateTo({
					url:url+"?invitebonus="+invitebonus
				});
			},
			goUrl:function(e)
			{
				console.log("你好,我得到的url是"+e.currentTarget.dataset.url);
				let url=e.currentTarget.dataset.url;
				uni.navigateTo({
					url:url
				});
			},
			makePhoneCall:function()
			 {
				 
				uni.showModal({
				    title: '温馨提示',
				    content: '是否拨打客服电话',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							
							uni.makePhoneCall({
							     phoneNumber: '13327313408' //仅为示例
							 });
							
							
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				}); 
				 
				 
				 
			},
			goProblemPage:function()
			{
				console.log("你好,你点击了这个按钮!!!");
				uni.navigateTo({
					url:"../../pages/user/commonProblem"
				})
			},
			
			centerClick1:function(e)
			{
				console.log("点击了。。。");
				this.index=-1;
			},
			centerClick4:function(e)
			{
				console.log("点击了。。。");
				this.index=-1;
			},
			centerClick3:function(e)
			{
				console.log("点击了。。。");
				this.index=-1;
			},
			centerClick2:function(e)
			{
				console.log("点击了。。。");
				this.index=-1;
			},
			centerClick5:function(e)
			{
				console.log("点击了。。。");
				this.index=-1;
			},
			centerClick6:function(e)
			{
				console.log("点击了。。。");
				this.index=-1;
			},
			clickTap:function(e)
			{
				this.showFlag=!this.showFlag;
				this.index=e.currentTarget.dataset.index;
				//e.cancelBubble();
				console.log("你好,你点击的索引是"+this.index);
			},
			limit(limit){
				var size = "";
				size = (limit/(1024 * 1024)).toFixed(2);//转MB
				var sizeStr = size + "";                        //转成字符串
				var index = sizeStr.indexOf(".");                    //获取小数点处的索引
				var dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
				if(dou == "00"){                                //判断后两位是否为00，如果是则删除00
					return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
				}
				return size;
			},
			//更换店铺图片
			changeImg(){
				console.log("你好,被点击了-----");
				let that=this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function (res) {
						if(that.limit(res.tempFiles[0].size)>3){
							uni.showToast({
								title:"图片太大",
								icon:"none"
							})
							return
						}
				        that.$ajax({
							uploadFile:true,
							formData:{
								'fileName':"/marchant/",
							},
							filePath:res.tempFilePaths[0],
							success(d){
								that.uploadImg(d)
								that.shopObj.disPlayImg=d;
								uni.setStorage({
									key:"shopObj",
									data:JSON.stringify(that.shopObj)
								})
							}
						})
						
				
					},
				});
			},
			// 
			// 
			// 从相册选择6张图
			// prevMyImg:function(e)
			// {
			// 	console.log("你好");
			// 	console.log("你好,点击了图片预览的按钮!");
			// 	console.log("相关的图片的信息是"+this.textInfo.imgs[0]);
			// 	console.log("相关的图片的信息是"+this.textInfo.imgs[1]);
			// 	console.log("相关的图片的信息是"+this.textInfo.imgs[2]);
			// 	console.log("相关的图片的信息是"+this.textInfo.imgs[3]);
			// 	console.log("相关的图片的长度是"+this.textInfo.imgs.length);
			// 	 this.index=-1;
			// 	 let that=this;
			// 	         // 预览图片
			// 		 uni.previewImage({
			// 			 urls: that.textInfo.imgs,
			// 			 longPressActions: {
			// 				 // itemList: ['发送给朋友', '保存图片', '收藏'],
			// 				 itemList: ['发送给朋友', '保存图片', '收藏'],
			// 				 success: function(data) {
			// 					 console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
			// 				 },
			// 				 fail: function(err) {
			// 					 console.log(err.errMsg);
			// 				 }
			// 			 }
			// 		 });	
			// 	
			// },
			// 
			
		  prevMyImg(res){  
				var  myindex = res.currentTarget.id;  
				console.log("你好,当前的id是"+myindex);
				
				uni.previewImage({  
					urls:this.textInfo.imgs,  
					current:myindex  
				})  
			} ,
			uploadImg(src){
				let that=this;
				that.$ajax({
					url:"/system_manager/setLogo",
					data:{
						displayImg: src,
						shopId:that.shopObj.shopId
					},success(d){
						console.log(d);
					}
				})
			},
			urlCode(e){
				let type=parseInt(Math.random()*2,10);
				uni.navigateTo({
					url: e.currentTarget.dataset.url+"?type="+type
				})
			},
			url(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			url89:function(e)
			{
				//1c 2b 3a
				let that=this;
				console.log("当前的level是"+that.shopObj.level);
				uni.navigateTo({
					url: e.currentTarget.dataset.url+"?level="+that.shopObj.level
				})
			},
			url2(e)
			{
				let that=this;
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			changeDown(e) {
				this.isDown = !this.isDown
			},
			isExistsOfflinePayQR(){
				let that=this;
				that.$ajax({
					url:"/merchant/isExistsOfflinePayQR",
					data:{
						merchantId:that.shopObj.merchantId
					},
					success(d){
						that.isPayQR=d;
					}
				})
			}
		},
		onShow() {
			let that=this;	
			that.isDown = false;
			that.index=0;
			that.$ajax({
				url:"/token/get",
				method:"POST",
				data:{
					merchantId:that.shopObj.merchantId
				},success(d){
					uni.setStorage({
						key:"Token",
						data:d
					})
					that.$ajax({
						url:"/home/index",
						data:{
							level: that.shopObj.level,
							merchantId: that.shopObj.merchantId,
							shopId: that.shopObj.shopId
						},success(d){		
							that.textInfo=d;
							
							console.log("你好,这是首页的商品图片的信息");
							console.log("你好,这是首页的所有的信息"+d);
							
							that.isExistsOfflinePayQR()
						}
					})
				}
			})
		},
		onLoad() {
			let that=this;
		
			uni.getStorage({
				key:"shopObj",
				success(res){
					console.log(res)
					that.shopObj=JSON.parse(res.data);
					that.merchantId=that.shopObj.merchantId;
					console.log("你好,我获取的shopObj是"+that.shopObj)
					console.log("你好,我获取的mechardId是"+that.shopObj.merchantId);
					console.log(that.shopObj)
					if (!that.shopObj.shopId) {
						uni.showModal({
							title: '未登录',
							content: '登录失效，需要登录后才能继续',
							/**
							 * 如果需要强制登录，不显示取消按钮
							 */
							showCancel: !that.forcedLogin,
							success: (res) => {
								if (res.confirm) {
									// /**
									//  * 如果需要强制登录，使用reLaunch方式
									//  */
									if (that.forcedLogin) {
										uni.reLaunch({
											url: '../login/login'
										});
									} else {
										uni.reLaunch({
											url: '../login/login'
										});
									}
								}
							}
						});
					}
				}
			})	
			
				that.searchIndexData();
			
			
		}
	}
</script>

<style scoped>
	* {
		box-sizing: border-box;
	}
	.newTextDesc{
		margin-top:30upx!important;
	}
	
	.addNewView{
       width:266upx; 
	   min-height:140upx;
		padding:8upx 10upx;
		border:1px solid rgba(0,0,0,0.18);
		position:absolute;
		z-index:10;
		font-size:28upx;
		color:rgba(0,0,0,0.66);
		background:#fff;
		/* left:-5px; */
		border-radius:20upx;
		top:-100upx;
	}
	#addNewView4,#addNewView8{
		left:-120upx;
	}

	/* .addNewView:nth-of-type(1)
	{
		margin-left:80upx;
	}
	.addNewView:nth-of-type(5)
	{
		margin-left:80upx;
	}
 */
  /*  .addNewView:nth-of-type(4)
	{
		position:relative;
		right:100upx;
	} */
	.botText{
		width:100%;
		height:80upx;
		display:flex;
		align-items:center;
		margin-top:0upx;
		background:#f2f2f2!important;
	}
	
	.botTextInner{
		width:240upx;
		margin:0 auto;
		height:80upx;
		display:block;
		/* flex-direction:row; */
		/* background:green!important; */
	}
	.botTextInnerLeft{
		height:80upx;
		float:left;
		font-size:26upx;
		width:49%;
		text-align:left;
/* 		background: #2ED3B2; */
        line-height:80upx;
		color:rgba(0,0,0,0.86);
	}
	.botTextInnerMiddle{
		width:2%;
		height:80upx;
	}
	.borderText{
		width:1px;
		display:inline-block;
		height:30upx;
		margin-top:25upx;
		background:rgba(0,0,0,0.18)!important;
	}
	.botTextInnerRight{
		height:80upx;
		width:49%;
		line-height:80upx;
		float:right;
		display:block;
/* 		background: #007AFF; */
	    text-align:right; 
       
		font-size:26upx;
		color:rgba(0,0,0,0.86);
		}
	.content {
		padding: 0;
		background: #f2f2f2;
	}

	.img image{
		width:160upx;
		height:160upx;
	}
	.content>view {
		background: #fff;
	}

	.add {
		width: 30upx;
		height: 30upx;
	}

	.system {
		width: 35upx;
		height: 35upx;
	}

	.content .uni-page-head {
		box-sizing: border-box;
		height: 128upx;
		background: rgb(15, 174, 255);
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		text-align: center;		
		padding: 20upx 30upx 0;
		z-index: 10000;
		color: #fff;
	}

	.uni-page-head .r {
		margin-top: 30upx;
	}
	.uni-page-head .r>view{
		display: inline-block;
		width: 60upx;
	}
	.uni-page-head .r .down {
		background: #fff;
		color: #333;
		position: absolute;
		width: 200upx;
		right: 20upx;
		top: 130upx;
		border-radius: 10upx;
		-webkit-box-shadow: 2upx 2upx #eee;
		box-shadow: 4upx 8upx #eee;
	}

	.uni-page-head .down>view {
		line-height: 80upx;

	}

	.uni-page-head .down .border {
		border-bottom: 1px solid #eee;
	}

	.uni-page-head .up {
		display: block;
		width: 0;
		height: 0;
		border-width: 0px 12upx 16upx;
		border-style: solid;
		border-color: transparent transparent #fff;
		position: absolute;
		top: -16upx;
		left: 100upx;
	}

	.uni-page-head>view {
		display: inline-block;
	}

	.uni-page-head .logo {
		width: 52upx;
		margin-top: 14upx;
		height: 52upx;
	}
	.uni-page-head .center {
		line-height: 58upx;
	}

	.shopInfo {
		margin-top: 128upx;
		padding: 10upx 30upx;
		padding-top: 16upx;
		border-bottom: 1px solid #eee;
	}

	.shopInfo>view {
		display: inline-block;
		vertical-align: top;
		font-size: 28upx;
	}

	.shopInfo image {
		width: 80upx;
		height: 80upx !important;
		margin-right: 20upx;
	}

	.shopInfo .r {
		color: #ee3535;
	}

	.proList {
		padding: 20upx 30upx;
		display: flex;
	}

	.proList>view {
		flex: 1;
		height: 160upx;
		margin-right: 10upx;
	}

	.proList>view image {
		width: 160upx;
		height:160upx;
	}

	.textInfo>view {
		padding: 10upx 30upx;
	}

	.textInfo>view>view {
		width:160upx;
		display: inline-block;
		margin-right: 10upx;
		text-align: center;
	}

	.textInfo .text {
		font-weight: 500;
		color: #333;
		font-size: 26upx;
		margin-top: 20upx;
	}

	.content .banner {
		background: #e2e2e2;
		padding: 20upx 0;
	}

	.banner image {
		width: 100%;
	}

	.enter {
		padding-bottom: 40upx;
	}

	.enter>view {
		display: flex;
	}

	.enter>view>view {
		flex: 1;
		text-align: center;
	}

	.enter .enter_item {
		height: 160upx;
		/* background:red; */
		width: 160upx;
		margin: 36upx auto 0;
		border-radius: 10upx;
		text-align: center;
		position:relative;
	}

	.enter .enter_item .image1 {
		width: 60upx;
		height: 60upx !important;
		margin-top: 20upx;
		position:absolute;
		top:50%;
		margin-top:-30upx;
		left:50%;
		margin-left:-30upx;
	}

	.enter .enter_item text {
		display: block;
		color: #fff;
	}

	.bg1 {
		background: #2ED3B2;
	}

	.bg2 {
		background: #4A9AEE;
	}

	.bg3 {
		background: #E65555;
	}

	.bg4 {
		background: #FFA318;
	}

	.bg5 {
		background: #C458E7;
	}

	.bg6 {
		background: #4ECD72;
	}
	.bg7{
		background:#fA8A47;
	}
	.bg8{
		 background:#4A9AEE;
	}

 


	.content .msg {
		height: 136upx;
		padding-top: 36upx;
		background: #E2E2E2;
	}

	.msg>view {
		height: 100upx;
		background: #fff;
		padding: 0 30upx;

	}

	.msg image {
		width: 72upx;
		height: 72upx;
		margin-top: 14upx;
		margin-right: 22upx;
		background: red;
		vertical-align: middle;
	}

	.msg>view>view {
		display: inline-block;
		font-size: 24upx;
		vertical-align: middle;
	}

	.msg .h5 {
		font-size: 28upx;
	}
		
	.rightImgAb {
		/* width:22px;
		height:22px; */
		position:absolute;
		z-index:300;
		right:10upx;
		top:10upx;	
	}
	.rightTextMsg{
		position: relative;
		left:60upx;
		}
		
/* 	.rightTextMsg{
		background:red;
		width:400upx;
	} */
</style>
