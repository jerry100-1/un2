<template>
	
	
	<view class="content" style="overflow-x:hidden;">
		<view class="" style="background:#fff;">
             <!-- {{dataInfo.withdrawableCash}} -->
			<view class="titleOfEarning" style="">可提现金额（元）</view>
			<view class="innerOfEarning" style="">
				<view class="wrapTheView" style="">
					 <view class="leftView" style="">
						 <view style="margin-left:30upx;">销售收入<text style="color:red">￥{{dataInfo.salesRevenue||0}}</text></view>
					 </view>
					 <view class="rightView" style="">
						 <view class="rightViewInner" style=""
						 @tap="change" data-type="1" :data-money="dataInfo.salesRevenue||0">立即提现</view>
					 </view>
				</view>
				
				
				<view class="wrapTheView" style="">
					 <view class="leftView" style="">
						 <view style="margin-left:30upx;">用户返佣<text style="color:red">￥{{dataInfo.taxableAmountOfDividends||0}}</text></view>
					 </view>
					 <view class="rightView" style="">
						 <view style="" class="rightViewInner"
						 @tap="change" data-type="2" :data-money="dataInfo.taxableAmountOfDividends||0">立即提现</view>
					 </view>
				</view>
				

				<view class="wrapTheView" style="">
					 <view class="leftView" style="">
						 <view style="margin-left:30upx;">注册奖励<text style="color:red">￥{{dataInfo.registerWithdrawal||0}}</text></view>
					 </view>
					 <view class="rightView" style="">
						 <view style="" class="rightViewInner"
						 @tap="clickTap" data-type="3" :data-money="dataInfo.registerWithdrawal||0">立即提现</view>
					 </view>
				</view>
				
				
				
				<view class="wrapTheView" style="">
					 <view class="leftView" style="flex:4;height:100upx;">
						 <view style="margin-left:30upx;">交易补贴<text style="color:red">￥{{dataInfo.dealSubsidyWithdrawal||0}}</text></view>
					 </view>
					 <view class="rightView" style="flex:2;height:100upx;">
						 <view style="" class="rightViewInner"
						 @tap="clickTap" data-type="4" :data-money="dataInfo.dealSubsidyWithdrawal||0">立即提现</view>
					 </view>
				</view>
				
				
				<view class="wrapTheView2" style="height:140upx;width:100%;display:flex;border-top:1px solid rgba(0,0,0,0.16);flex-direction:column;align-items:center;justify-content:center;">
					   <view style="color:rgba(0,0,0,0.68);font-size:28upx;margin-bottom:10upx;">
						   1.各模块可提现金额分别满100元方可分别提现.
					   </view>
					   <view style="color:rgba(0,0,0,0.68);font-size:28upx;margin-top:10upx;">
						   2.提现申请审核通过,资金在T+0的工作日内到账
					   </view>
				</view>
				
				
			
				
				
				
			</view>
		</view>
		
		
		
		<view class="settle">
			<view>
				<view>
					<text>待结算（元）</text>
				</view>
				<view class="r">
					<text class="color">￥{{dataInfo.waitingForSettlement||0}}</text>
					<uni-icon type="arrowdown" size="20" color="#999"></uni-icon>
				</view>
			</view>
			<view class="info" :data-url="'/pages/capital/settlement?type=1&money='+dataInfo.transactionIng+'&money1='+dataInfo.settlementIng" @tap="url">
				<view>
					<text>交易中</text>
					<text class="subtitle">所有已支付尚未确认收货的订单金额</text>
				</view>
				<view class="r">
					<text class="color">￥{{dataInfo.transactionIng||0}}</text>
					<uni-icon type="arrowright" size="20" color="#999"></uni-icon>
				</view>
			</view>
			<view class="info" :data-url="'/pages/capital/settlement?type=2&money='+dataInfo.transactionIng+'&money1='+dataInfo.settlementIng" @tap="url">
				<view >
					<text>结算中</text>
					<text class="subtitle">关联用户在第三方平台交易的订单金额</text>
				</view>
				<view class="r">
					<text class="color">￥{{dataInfo.settlementIng||0}}</text>
					<uni-icon type="arrowright" size="20" color="#999" ></uni-icon>
					
				</view>
			</view>
			<view :data-url="'/pages/capital/cashOutList?money='+dataInfo.hasBeenPresented||0" @tap="url">
				<view>
					<text>已提现（元）</text>
				</view>
				<view class="r">
					<text>￥{{dataInfo.hasBeenPresented||0}}</text>
					<uni-icon type="arrowright" size="20" color="#999" ></uni-icon>
				</view>
			</view>
		</view>
		<view class="income">
			<view :data-url="'/pages/capital/channel?money='+dataInfo.channelRevenue||0" @tap="url">
				<text>渠道总收入（元）</text>
				<view class="r">
					<text>￥{{dataInfo.channelRevenue||0}}</text>
					<uni-icon type="arrowright" size="20" color="#999" class="r"></uni-icon>
				</view>
			</view>
			<view :data-url="'/pages/capital/sales?money='+dataInfo.allSalesRevenue" @tap="url">
				<text>销售总收入（元）</text>
				<view class="r">
					<text>￥{{dataInfo.allSalesRevenue||0}}</text>
					<uni-icon type="arrowright" size="20" color="#999" class="r"></uni-icon>
				</view>
			</view>
			<view @tap="url" :data-url="'/pages/capital/userReturn?money='+dataInfo.allTaxableAmountOfDividends||0" >
				<text>用户总返佣（元）</text>
				<view class="r">
					<text>￥{{dataInfo.allTaxableAmountOfDividends||0}}</text>
					<uni-icon type="arrowright" size="20" color="#999" class="r"></uni-icon>
				</view>
			</view>
		
			<view @tap="url100" :data-registerrewardtotalamount="dataInfo.registerRewardTotalAmount" :data-url="'/pages/capital/amountOfRegistration' " >
				<text>注册奖励总金额（元）</text>
				<view class="r">
					<text>￥{{dataInfo.registerRewardTotalAmount||0}}</text>
					<uni-icon type="arrowright" size="20" color="#999" class="r"></uni-icon>
				</view>
			</view>
			
			<view @tap="url101" :data-dealsubsidytotalamount="dataInfo.dealSubsidyTotalAmount" :data-url="'/pages/capital/jiaoyitotal'">
				<text>交易手续费补贴总金额（元）</text>
				<view class="r">
					<text>￥{{dataInfo.dealSubsidyTotalAmount||0}}</text>
					<uni-icon type="arrowright" size="20" color="#999" class="r"></uni-icon>
				</view>
			</view>
			
			
			
			<view @tap="url102" :data-sharecommissiontotalamount="dataInfo.shareCommissionTotalAmount" :data-url="'/pages/capital/shareMoneyTotal'" >
				<text>分享佣金发放总金额（元）</text>
				<view class="r">
					<text>￥{{dataInfo.shareCommissionTotalAmount||0}}</text>
					<uni-icon type="arrowright" size="20" color="#999" class="r"></uni-icon>
				</view>
			</view>
			

			
		</view>
		<view class="footer" @tap="urlBank" data-url="/pages/capital/bank">
			<text>我的结算账户</text>
			<uni-icon type="arrowright" size="20" color="#999" class="r"></uni-icon>
		</view>
		<uni-popup :show="isShow" position="middle" mode="fixed">
			<view class="mode">
				<view class="modeTitle">
	<!-- 			{{capitalType==1?'销售收入提现':"用户返佣提现"}} -->
			<!-- 	{{capitalType==1? "销售收入提现":capitalType==2?'用户返佣提现':capitalType==3?"注册奖励提现":"交易补贴提现"}} -->
				 {{capitalType|formateText}}
				 </view>
	
				<view class="money">
					<text>提现金额</text>
					<input type="number" v-model="money"/>
					<text>取现密码</text>
					<input type="password" v-model="pwd"/>
					<view>当前可提现金额为￥{{withdrawMoney||0}}元</view>
				</view>
				<view class="btn">
					<button class="ok" type="primary" @tap="cashOut">提现</button>
					<button type="primary" @tap="change" data-type="1">取消</button>
				</view>
				<view class="infoT">提示:可提现金额满￥100元方可提现。</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniIcon,
			uniPopup
		},
		data(){
			return{
				shopObj:"",
				dataInfo:{},
				isShow:false,
				capitalType:1,//提现类型1为销售提现，2为用户返佣
				money:"",//提现金额
				pwd:"",//取现密码
				withdrawMoney:"",
			}
		},
		filters:{
			formateText:function(item)
			{
				//formateText 销售收入提现 用户返佣提现 注册奖励提现 交易补贴提现
			  if(item.capitalType==1)
			  {
				  return "销售收入提现";
			  }else if(item.capitalType==2)
			  {
				  return "用户返佣提现";
			  }else if(item.capitalType==3)
			  {
				  return "注册奖励提现";
			  }else{
				  return "交易补贴提现";
			  } 
			
			}
		},
		methods: {
			
			url100:function(e)
			{
				console.log("你好,获取的参数url是"+e.currentTarget.dataset.url);
				console.log("你好,获取的参数registerrewardtotalamount是"+e.currentTarget.dataset.registerrewardtotalamount);
				 uni.navigateTo({
				   url:e.currentTarget.dataset.url+"?registerrewardtotalamount="+e.currentTarget.dataset.registerrewardtotalamount
				 });
			},
	
			url101:function(e)
			{
				console.log("你好,获取的参数url是"+e.currentTarget.dataset.dealsubsidytotalamount);
				console.log("你好,获取的参数url是"+e.currentTarget.dataset.url);
				uni.navigateTo({
					url:e.currentTarget.dataset.url+"?dealsubsidytotalamount="+e.currentTarget.dataset.dealsubsidytotalamount
				})
			},
			url102:function(e)
			{
			    console.log("你好,获取的参数sharecommissiontotalamount是"+e.currentTarget.dataset.sharecommissiontotalamount);
				console.log("你好,获取的参数url是"+e.currentTarget.dataset.url);
				uni.navigateTo({
					url:e.currentTarget.dataset.url+"?sharecommissiontotalamount="+e.currentTarget.dataset.sharecommissiontotalamount
				})
			},
			
			clickTap:function()
			{
				// uni.showToast({
				// 	title:"请到管理后台提现",
				// 	content:"请到管理后台提现"
				// });
				uni.showModal({
					title:"请到管理后台提现",
					content:"请到管理后台提现"
				})
			},
			change(e){
				
				
				this.withdrawMoney=e.currentTarget.dataset.money||"";
				if(!this.isShow){
					if(this.withdrawMoney<100){
						uni.showToast({
							title:"可提现金额须大于或等于100",
							icon:"none"
						})
						
						// uni.showToast({
						// 	title:"请到管理后台完成提现",
						// 	icon:"none"
						// });
						
						
						return
					}
				}
				this.isShow=!this.isShow;
				this.pwd="";
				this.money="";
				this.capitalType=e.currentTarget.dataset.type
			},
			cashOut(){
				let that=this;
				if(that.money&&that.pwd){
					if(that.money<100){
						 // uni.showToast({
						 // 	title:"请到管理后台完成提现",
						 // 	icon:"none"
						 // });
						uni.showToast({
							title:"提现金额须大于或等于100",
							icon:"none"
						})
						return
					}
					that.$ajax({
						url:"/fund/withdrawMoney",
						data:{
							cashInPassword:that.pwd,
							marchantId:that.shopObj.merchantId,
							price:that.money,
							type:that.capitalType
						},success(d){
							let num=that.withdrawMoney-that.money;
							let m=that.money*1+that.dataInfo.hasBeenPresented*1;
							if(that.capitalType==1){
								that.dataInfo.salesRevenue=num.toFixed(2);
							}else if(that.capitalType==2){
								//以下语句新增----------------------------
								that.dataInfo.taxableAmountOfDividends=num.toFixed(2);
							}else if(that.capitalType==3)
							{
								that.dataInfo.registerRewardTotalAmount=num.toFixed(2);
								//registerRewardTotalAmount  dealSubsidyTotalAmount
								//registerWithdrawal  dealSubsidyWithdrawal
							}else{
								that.dataInfo.registerRewardTotalAmount=num.toFixed(2);
							}
							that.dataInfo.hasBeenPresented=m.toFixed(2);
							that.isShow=!that.isShow;
							uni.showToast({
								title:"提现申请提交成功",
								icon:"none"
							})
						}
					})
				}else{
					uni.showToast({
						title:"请输入提现的金额或密码",
						icon:"none"
					})
				}
			},
			url(e){
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			},
			urlBank(e){
				let that=this;
				uni.navigateTo({
					url:e.currentTarget.dataset.url+"?type="+that.dataInfo.isBindingBankCard
				})
			}
		},
		onLoad(){
			var that=this;
			uni.getStorage({
				key:"shopObj",
				success(res){
					that.shopObj=JSON.parse(res.data);
				}
			})
		},
		onShow(){
			var that=this
			this.$ajax({
				url:"/fund/searchMarchantFundIndex",
				methods:"POST",
				data:{
					marchantId:that.shopObj.merchantId
				},
				success(d){
					
					console.log("这是资金版块的首页返回的所有的数据"+d);
					
					that.dataInfo=d
				}
			})
		}
	}
</script>

<style scoped>
	.titleOfEarning{
		height:100upx;width:100%;line-height:100upx;margin-left:30upx;
	}
	.innerOfEarning{
		display:flex;flex-direction:column;height:544upx;
	}
	.wrapTheView{
		height:100upx;width:100%;display:flex;border-top:1px solid rgba(0,0,0,0.16);flex-direction:row;align-items:center;line-height:100upx;
	}
	.leftView{
		flex:4;height:100upx;
	}
	.rightView{
		flex:2;height:100upx;
	}
	.rightViewInner{
		width:160upx;height:60upx;background:red;color:#fff;font-size:30upx;line-height:60upx;border-radius:10upx;text-align:center;margin-top:20upx;
	}
	
	
	.content{
		background: #f2f2f2;
		padding: 0;
	}
	.top{
		background: #fff;
		position: fixed;
		width:100%;
	}
	.top>text{
		padding:0 30upx;
		display: block;
		box-sizing: border-box;
		font-size: 30upx;
		line-height: 72upx;
		border-bottom:1px solid #eee;
	}
	.top>view{
		display: flex;
		align-items: center;
		justify-content:center;
		width:100%;
	/* 	height:172upx */
	
	}
	.top>view>view{
		font-size: 30upx;
		height:100%;
		text-align: center;
		
	}
	.top>view>view>view{
		padding-top: 35upx;
	}
	.top>view text{
		color:#EE3535;
	}
	.top button{
		width:268upx;
		height: 54upx;
		line-height: 54upx;
		background: #EE3535;
		color:#fff;
		border-radius: 50upx;
		margin-top: 26upx;
		font-size: 28upx;
	}
	.borderRight{
		border-right: 1px solid #eee;
	}
	.settle{
		margin-top: 42upx;
		background: #fff;
		margin-bottom: 20upx;
	}
	.settle>view{
		padding: 36upx 30upx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
	}
	.settle .info{
		padding: 20upx 30upx;
		position: relative;
	}
	.r text{
		color:#999;
	}
	.settle>view>view .color{
		color:#EE3535;
	}
	.settle .subtitle{
		font-size: 20upx;
		display: block;
		color:#666;
	}

	.settle .info .r{
		padding-top: 20upx;
	}

	.settle>view>view{
		display: inline-block;
	}
	.income{
		margin-bottom: 20upx;
	}
	.income>view{
		background: #fff;
		border:1px solid #eee;
		padding: 0 30upx;
		height:100upx;
		line-height: 100upx;
	}
	.income>view .uni-icon,.footer .uni-icon{
		margin-top: 30upx;
	}
	.footer{
		line-height: 100upx;
		background: #fff;
		border-bottom: 1px solid #eee;
		padding: 0 30upx;
	}
	.mode{
		width:617upx;
		height:600upx;
		border-radius: 30upx;
		background: #fff;
	}
	.modeTitle{
		text-align: center;
		width:100%;
		margin-top: 20upx;
	}
	.money{
		margin-top: 50upx;
	}
	.money>text{
		margin-left: 50upx;
	}
	.money input{
		border-bottom:1px solid #eee;
		display: inline-block;
		width:335upx;
		margin-left:40upx
	}
	.money view{
		margin-top: 20upx;
		font-size: 26upx;
		margin-left: 214upx;
	}
	.btn{
		margin-top: 40upx;
		width: 100%;
		text-align: center;
	}
	.mode button{
		width:229upx;
		height:60upx;
		font-size: 28upx;
		line-height: 60upx;
		display: inline-block;
		border-radius: 50upx;
		background: #eee;
		color:#333;
		border:none;
	}
	.mode .ok{
		background: #EE3535;
		color:#fff;
		margin-right: 30upx;
	}
	uni-button:after{
		border:none;
	}
	.infoT{
		width: 100%;
		text-align: center;
		margin: 20upx auto;
		font-size: 20upx;
	}
</style>
