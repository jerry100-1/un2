<template>
	<view class="content">
		<view class="top">
			<view :class="{active:orderType==-1}" @tap="orderChange(-1)">
				<text>全部</text>
			</view>
			<view :class="{active:orderType==0}" @tap="orderChange(0)">
				<text>待付款</text>
			</view>
			<view :class="{active:orderType==3}" @tap="orderChange(3)">
				<text>待发货</text>
			</view>
			<view :class="{active:orderType==4}" @tap="orderChange(4)">
				<text>待收货</text>
			</view>
			<view :class="{active:orderType==8}" @tap="orderChange(8)">
				<text>退款</text>
			</view>
			<view :class="{active:orderType==12}" @tap="orderChange(12)">
				<text>线下订单</text>
			</view>
		</view>
		<view class="list" v-if="orderList&&orderList.length>0">
			<view class="item_list" v-for="(item,index) in orderList" :key="index">
				<view>
					<view>
						<text v-if="item.state==13||item.state==12">完成日期:{{item.confirmTime||item.state==13?item.createTime:""}}</text>
						<text v-if="item.state==8||item.state==7">退款日期:{{item.refundTime||""}}</text>
						<text v-if="item.state==14">关闭日期:{{item.confirmTime||""}}</text>
						<text v-if="item.state==4">发货日期:{{item.deliveryTime||""}}</text>
						<text v-if="item.state==3">支付日期:{{item.payTime||""}}</text>
						<text v-if="item.state==2||item.state==0">下单日期:{{item.createTime||""}}</text>
						<text v-if="orderType==8">申请日期：{{item.refundApplyTime||""}}</text>
						<text class="r color" v-if="item.state==13||item.state==12">交易成功</text>
						<text class="r color" v-if="item.state==8||item.state==7">{{item.state==8?'退款成功':'申请退款'}}</text>
						<text class="r color" v-if="item.state==14">交易关闭</text>
						<text class="r color" v-if="item.state==4">待收货</text>
						<text class="r color" v-if="orderType==8">{{item.refundState==0?'申请中':item.refundState==1?'同意':item.refundState==2?'拒绝':item.refundState==3?'处理中':'已完成'}}</text>
						<text class="r color" v-if="item.state==3">未发货</text>
						<text class="r color" v-if="item.state==0">待付款</text>
						<text class="r color" v-if="item.state==2">失效</text>
					</view>
					<view class="foot">
						<view v-if="orderType!=12">
							<image :src="item.productImg||defaultSrc"></image>
						</view>
						<view v-else>
							<image src="../../static/pro/down.png"></image>
						</view>
						<view class="right">
							<view class="h5">{{item.productName}}</view>
							<view class="h6">
								<text class="price">￥ {{item.productPrice}}</text>
								<text class="r">X{{item.tradeNum||item.refundNum}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="item">
					<text>共{{item.tradeNum||item.refundNum}}件商品  合计:</text>
					<text class="price">￥{{item.payPrice||item.productPrice}} <text v-if="orderType!=12">（含运费￥{{item.postage}}）</text></text>
				</view>
				<view class="item" v-if="orderType!=12">
					<text class="btn" @tap="assess(item.orderLineId,item.productImg)"  v-if="item.state==13">查看评价</text>
					<text class="btn" v-if="item.state==3||item.state==0||item.state==4||item.state==12" @tap="seeDetails(item.orderId)">查看详情</text>
					<text class="btn" v-if="item.state==14||item.state==2" @tap="delOrder(item.orderId,item.orderLineId)">删除订单</text>
					<text class="btn" v-if="orderType==8" @tap="seeRefund(item.orderLineId)">查看详情</text>
					<text class="btn" v-if="item.state==0||item.state==3" @tap="makePhoneCall(item.phone)">联系用户</text>
					<text class="btn" @tap="isShowChange(item.orderId,item.orderLineId,item)"  v-if="item.state==3">立即发货</text>
					<text class="btn" @tap="seeRefund(item.orderLineId)" v-if="item.state==7||item.state==8">退款退货</text>
					<text class="btn" @tap="logistics(item.expressName,item.expressNo,item.productImg)" v-if="item.state==4">查看物流</text>
					<text class="btn" v-if="item.state==12">待评价</text>
				</view>
			</view>	
			<uni-load-more :status="status"></uni-load-more>
		</view>
		<view class="no" v-else>
			<image src="../../static/noData.png" class="noData"></image>
			<view>暂无数据</view>
		</view>
		<uni-popup :show="isShow" position="middle" mode="fixed">
			<view class="mode">
				<view class="foot">
					<view>
						<image :src="logisticeObj.productImg"></image>
					</view>
					<view class="right">
						<view class="h5">{{logisticeObj.productName}}</view>
						<view class="h6">
							<text class="price">￥ {{logisticeObj.productPrice}}</text>
							<text class="r">X{{logisticeObj.tradeNum}}</text>
						</view>
					</view>
				</view>
				<view class="userInfo">
					<view class="title">用户信息</view>
					<view>
						<text>收货人:{{logisticeObj.address.name||""}}</text>
						<text class="r">手机号码:{{logisticeObj.address.phone||""}}</text>
					</view>
					<view>
						<text>收货地址:</text>
						<text class="right">{{logisticeObj.address.area+logisticeObj.address.address||""}}</text>
					</view>
					<view>
						<text>订单留言:</text>
						<text class="right">{{logisticeObj.comment||""}}</text>
					</view>
				</view>
				<view class="expo">
					<view>
						<text>快递公司</text>
						<picker mode="selector" :range="logisticeArr" @change="logisticeArrChange">
							<view>{{logisticeArr[logisIndex]}}</view>
						</picker>
					</view>
					<view>
						<text>快递单号</text>
						<input type="text" v-model="expressNo">
					</view>
				</view>
				<view class="btns">
					<text class="border" @tap="isShowChange('')">关闭</text>
					<text class="color" @tap="expoConfim">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		components: {uniLoadMore,uniPopup},
		data(){
			return{
				status:"loading",
				pageNo:1,
				pageAll:2,
				shopObj:"",
				orderList:[],//订单数据
				isShow:false,//模态框的显示
				orderType:"-1",//订单类型
				expressNo:"",
				logisIndex:0,
				orderId:"",
				logisticeObj:{
					address:{
						name:"",
						area:"",
						phone:"",
						address:""
					}
				},//发货模态框显示的信息
				orderLineId:"",
				logisticeArr:["圆通速递","中通速递","申通","顺丰","韵达快运","运通快递","京东物流","aae全球专递","安捷快递",
								"安信达快递","彪记快递","bht","百福东方国际物流","中国东方(COE)","长宇物流","大田物流","德邦物流",
								"dhl","dpex","d速快递","递四方","ems快递","fedex","飞康达物流","凤凰快递","飞快达","港中能达物流",
								"广东邮政物流","共速达","汇通快运","恒路物流","华夏龙物流","海红","海外环球","佳怡物流","京广速递",
								"急先达","佳吉物流","加运美物流","金大物流","嘉里大通","晋越快递","快捷速递","联邦快递","联昊通物流",
								"龙邦物流","立即送","乐捷递","民航快递","美国快递","门对门","OCS","配思货运","全晨快递","全峰快递",
								"全际通物流","全一快递","如风达","三态速递","盛辉物流","速尔物流","盛丰物流","赛澳递","天地华宇","天天快递",
								"tnt","ups","万家物流","文捷航空速递","伍圆","万象物流","新邦物流","信丰物流","亚风速递","一邦速递","优速物流",
								"邮政包裹挂号信","邮政国际包裹挂号信","远成物流","源伟丰快递","元智捷诚快递","越丰物流","源安达","银捷速递",
								"宅急送","中铁快运","中邮物流","忠信达","芝麻开门","国通快递"
							]
			}
		},
		methods:{
			//导航订单的切换
			orderChange(e){
				let that=this;
				that.orderType=e;
				that.pageNo=1;
				that.pageAll=2;
				that.status="loading";
				that.orderList=[];
				that.search();
			},
			//联系用户
			makePhoneCall(phone){
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			//快递公司
			logisticeArrChange(e){
				this.logisIndex=e.detail.value
			},
			//
			isShowChange(orderId,orderLineId,item){
				this.isShow=!this.isShow;
				if(orderId){
					this.orderId=orderId;
					this.orderLineId=orderLineId;
					item.address=JSON.parse(item.address)
					this.logisticeObj=item;
	
				}
			},
			//发货
			expoConfim(){
				let that=this;
				if(that.expressNo){
					that.$ajax({
						url:"/order/delivery",
						data:{
							expressName:that.logisticeArr[that.logisIndex],
							expressNo:that.expressNo,
							orderId:that.orderId,
							orderLineId:that.orderLineId,
							shopName:that.shopObj.shopName
						},success(d){
							uni.showToast({
								title: "发货成功",
								icon:"none"
							})
							for(let i in that.orderList){
								if(that.orderId==that.orderList[i].orderId){
									that.orderList.splice(i, 1);
									break;
								}
							}
							that.isShow=!that.isShow;
							that.expressNo="";
						}
					})
				}else{
					uni.showToast({
					    title: "请填写快递单号",
						icon:"none"
					});
				}
			},
			//查看评价
			assess(index,img){
				uni.navigateTo({
					url:"assess?id="+index+"&img="+img
				})
			},
			//查看物流
			logistics(expressName,expressNo,img){
				uni.navigateTo({
					url:"logistics?expressName="+expressName+"&expressNo="+expressNo+"&img="+img
				})
			},
			//查看详情
			seeDetails(id){
				uni.navigateTo({
					url:"orderDetails?id="+id
				})
			},
			//查看退款详情
			seeRefund(id){
				this.refund(id)
			},
			//退款退货
			refund(id){
				uni.navigateTo({
					url:"refund?id="+id
				})
			},
			//删除订单
			delOrder(orderId,orderLineId){
				let that=this;
				uni.showModal({
					title: '温馨提示',
					content: '是否确定删除',
					success: function (res) {
						if (res.confirm) {
							that.$ajax({
								url:"/order/del",
								data:{
									orderId: orderId,
									orderLineId: orderLineId
								},
								success(d){
									for(let i in that.orderList){
										if(orderId==that.orderList[i].orderId){
											that.orderList.splice(i, 1);
											break;
										}
									}
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//查询数据
			search(){
				let that=this;
				if(that.pageNo<=that.pageAll){
					let list=[that.orderType];
					let url="/order/list"
					// 状态集合0待付款2失效3未发货4已发货7申请退款8退款成功12待评价13交易完成14交易取消(传数值)
					if(that.orderType==8){
						url="/order/refundList"
					}
					if(that.orderType==12){
						url="/order/offlineList";
						list=null
					}
					if(that.orderType==-1){
						list=[2,13,14,12]
					}
					that.$ajax({
						url:url,
						data:{
							pageNo:that.pageNo,
							searchData:{
								list:list,
								shopId:that.shopObj.shopId,
							}
						},
						success(d){
							that.pageNo=that.pageNo*1+1;
							that.pageAll=d.totalPage;
							if(that.pageNo==2){
								that.orderList=d.lists
							}else{
								let arr=that.orderList;
								that.orderList=that.orderList.concat(d.lists)
							}
							if(that.pageNo>that.pageAll){
								that.status="noMore"
							}
						}
					})
				}
			}
		},
		onLoad(e){
			var that=this;
			that.orderType=e.orderType||-1;
			that.orderType*=1;
			uni.getStorage({
				key:"shopObj",
				success(res){
					that.shopObj=JSON.parse(res.data);
				}
			})
		},
		onShow(){
			this.search()
		},
		//上拉加载
		onReachBottom(){
			this.search()
		}
	}
</script>

<style scoped>
	.content{
		background: #f2f2f2;
		padding: 0;
	}
	.top{
		background: #fff;
		line-height: 86upx;
		display: flex;
		position:  fixed;
		width: 100%;
		height:86upx;
		z-index: 10000;
	}
	.top>view{
		flex:1;
		text-align: center;
		font-size: 28upx;
		border-bottom: 1px solid transparent;
	}
	.top>view.active{
		border-bottom: 1px solid #007AFF;
		color:#007AFF;
	}
	.list{
		margin-top: 106upx;
	}
	.item_list{
		margin-bottom: 20upx;
		background: #fff;
		font-size: 22upx;
	}
	.color{
		color:#EE3535;
	}
	image{
		width:164upx;
		height:164upx;
		border:1px solid #eee;
		margin-right: 20upx;
	}
	.foot>view{
		display: inline-block;
		vertical-align:top;
		margin-top: 20upx;
	}
	.right{
		width:478upx;
	}
	.h5{
		color:#333;
		display:-webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical;
		overflow:hidden;
		text-overflow:ellipsis;
		height:80upx;
	}
	.h6{
		margin-top: 60upx;
	}
	.price{
		color:#f90;
	}
	.item_list>view{
		padding: 30upx;
		border-bottom: 1px solid #eee;
	}
	.item{
		text-align: right;
	}
	.btn{
		display: inline-block;
		border-radius: 50upx;
		width:136upx;
		height:48upx;
		line-height: 48upx;
		border:1px solid #ddd;
		text-align: center;
		margin-left: 10upx;
	}
	.mode{
		width:660upx;
		background: #fff;
		overflow: hidden;
		box-shadow:0px 0px 21upx 0px rgba(0, 0, 0, 0.21);
		border-radius: 20upx;
	}
	.userInfo{
		padding: 30upx;
		border-bottom: 1px solid #eee;
	}
	.userInfo>view{
		margin-bottom: 10upx;
	}
	.userInfo .right{
		display: inline-block;
		
		margin-left: 10upx;
	}
	.userInfo text{
		font-size: 26upx;
		vertical-align: text-top;
	}
	.mode .foot{
		padding: 30upx;
		border-bottom: 1px solid #eee;
	}
	.mode .foot .right{
		width:400upx;
	}
	.mode .h6{
		margin-top: 50upx;
	}
	.expo{
		padding: 30upx;
	}
	.mode input,.mode picker{
		margin-left: 20upx;
		display: inline-block;
		vertical-align: middle;
		width:350upx;
		border-bottom: 1px solid #eee;
	}
	.mode .btns{
		line-height: 90upx;
		height: 90upx;
		background: #f4f4f4;
		font-size: 26upx;
	}
	.mode .btns text{
		display: inline-block;
		width:328upx;
		text-align: center;
	}
	.mode .btns text.border{
		border-right:1px solid #ddd;
	}
</style>
