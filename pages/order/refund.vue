<template>
	<view class="content">
		<view class="info">
			<view>
				<text>用户昵称:</text>
				<text class="color">{{refunObj.nickName||""}}</text>
			</view>
			<view>
				<text>退款单号:</text>
				<text class="color">{{refunObj.refundNo}}</text>
			</view>
			<view>
				<text>退款金额:</text>
				<text class="color">￥{{refunObj.refundMoney}}</text>
			</view>
			<view>
				<text>申请时间:</text>
				<text class="color">{{refunObj.refundApplyTime}}</text>
			</view>
			<view>
				<text>退款说明:</text>
				<text class="color">{{refunObj.refundDesc}}</text>
			</view>
			<view>
				<text>商品图片:</text>
				<view class="img">
					<image :src="item" :key="index" v-for="(item,index) in refunObj.refundImgs" ></image>
				</view>
			</view>
		</view>
		<view class="step1" v-if="step==0">
			<view>
				<view class="title">官方旗舰店处理意见</view>
				<view class="redio">
					<text>审核结果:</text>
					<radio-group @change="radioChange" class="redioGroup">
						<label class="radio"><radio value="1" :checked="examine=='1'" color="#EE3535"/>同意</label>
						<label class="radio"><radio value="2" :checked="examine=='2'" color="#EE3535"/>驳回</label>	
					</radio-group>
				</view>
				<view v-if="examine=='2'" class="reject">
					<text>驳回原因:</text>
					<textarea v-model="Reject" placeholder="请说明驳回的详细原因" />
				</view>
			</view>
			<view v-if="examine=='1'">
				<view class="title">
					<text>商家退货地址信息</text>
					<text class="r" @tap="editAddress()">修改退货地址</text>
				</view>
				<view class="expro">
					<view>
						<view>
							<text>收货人:</text>
							<text class="color">{{shopAddress.receiver}}</text>
						</view>
						<view class="r">
							<text>联系电话:</text>
							<text class="color">{{shopAddress.receiverPhone}}</text>
						</view>
					</view>
					<view class="address">
						<text>收货地址:</text>
						<view class="addre">
							<text class="color">
								{{shopAddress.province+shopAddress.city+shopAddress.area+shopAddress.receiverAddress}}
							</text>
						</view>
						
					</view>
				</view>
			</view>
			<button @tap="refundAudit">确认</button>
		</view>
		<view class="step" v-if="step>0&&step<4">
			<view class="title">
				<view>店铺处理意见</view>
			</view>
			<view class="list">
				<view>
					<text>是否同意:</text>
					<text class="color">{{refundState[step]}}</text>
				</view>
				<view>
					<text>处理时间:</text>
					<text class="color">{{refunObj.processTime}}</text>
				</view>
			</view>
			<view class="list">
				<view>
					<text>快递公司:</text>
					<text class="color">{{refunObj.expressName}}</text>
				</view>
				<view>
					<text>快递单号:</text>
					<text class="color">{{refunObj.expressNo}}</text>
				</view>
			</view>
			<view class="list">
				<view class="line">
					<text>收货人:</text>
					<text class="color">{{refunObj.receiver}}</text>
				</view>
				<view class="r">
					<text>联系电话:</text>
					<text class="color">{{refunObj.receiverPhone}}</text>
				</view>
				<view>
					<text>收货地址:</text>
					<view class="addre">
						<text class="color">{{refunObj.receiverAddr}}</text>
					</view>
				</view>
			</view>
			<button @tap="refundOk" v-if="step==3">确认退款</button>
		</view>
		<view class="step" v-if="step==4">
				<view class="title">
				<view>店铺处理意见</view>
			</view>
			<view class="list">
				<view>
					<text>是否同意:</text>
					<text class="color">{{refundState[step]}}</text>
				</view>
				<view>
					<text>处理时间:</text>
					<text class="color">{{refunObj.processTime}}</text>
				</view>
			</view>
			<view class="list">
				<view>
					<text>快递公司:</text>
					<text class="color">{{refunObj.expressName}}</text>
				</view>
				<view>
					<text>快递单号:</text>
					<text class="color">{{refunObj.expressNo}}</text>
				</view>
			</view>
			<view class="list">
				<view>
					<text>是否退款:</text>
					<text class="color">已退款</text>
				</view>
				<view>
					<text>退款金额:</text>
					<text class="color">￥{{refunObj.refundMoney}}</text>
				</view>
				<view>
					<text>退款时间:</text>
					<text class="color">{{refunObj.refundTime}}</text>
				</view>
				<view>
					<text>商城备注:</text>
					<text class="color">支付原路退还</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				shopobj:{},
				shopAddress:{},
				refunObj:{},
				refundState:["申请中","同意","拒绝","处理中","完成"],
				orderLineId:"",
				step:1,//当前步骤
				examine:"1",//审核结果
				Reject:"",//驳回原因
			}
		},
		methods:{
			init(){
				let that=this;
				that.$ajax({
					url:"/order/refundDetail",
					data:{
						orderLineId:that.orderLineId
					},success(d){
						if(!d){
							uni.showToast({
								title:"退款信息获取失败",
								icon:"none"
							})
							return
						}
						if(d.refundImgs){
							d.refundImgs=d.refundImgs.split(",")
						}
						that.refunObj=d;
						that.step=d.refundState;
						if(that.step==0){
							that.searchAddress()
						}
					}
				})
			},
			radioChange(e){
				this.examine=e.detail.value;
				this.Reject="";
			},
			//修改地址
			editAddress(){
				uni.navigateTo({
					url:"/pages/system/addAddress"
				})
			},
			//查询商家地址
			searchAddress(){
				let that=this;
				that.$ajax({
					url:"/merchant/returnAddress",
					data:{
						merchantId:that.shopobj.merchantId,
					},success(d){
						that.shopAddress=d
					}
				})
			},
			//退款审核
			refundAudit(){
				let that=this;
				that.$ajax({
					url:"/order/refundAudit",
					data:{
						desc:that.Reject||"",
						infoId:that.shopAddress.infoId,
						managerId:that.shopobj.managerId,
						merchantId:that.shopobj.merchantId,
						orderId:that.refunObj.orderId,
						orderLineId:that.refunObj.orderLineId,
						refundId:that.refunObj.refundId,
						state:that.examine,
					},
					success(d){
						that.init();
					}
				})
			},
			//退款
			refundOk(){
				let that=this;
				uni.showModal({
					title: '温馨提示',
					content: '是否确定退款',
					success: function (res) {
						if (res.confirm) {
							that.$ajax({
								url:"/order/refund",
								data:{
									orderId: that.refunObj.orderId,
									orderLineId: that.refunObj.orderLineId
								},
								success(d){
									that.init()
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 预览图片
			previewImage(index){
				uni.previewImage({
					current:index,
					urls: this.refunObj.refundImgs,
					loop:true,
					longPressActions: {
						itemList: [],
						success: function (res) {
							console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						},
						fail: function (res) {
							console.log(res.errMsg);
						}    
					}
				});
			}
		},
		onNavigationBarButtonTap(e){
			let that=this;
			if(that.refunObj.phone){
				uni.makePhoneCall({
					phoneNumber: that.refunObj.phone,
					fail(err){
						uni.showToast({
							title:err,
							icon:"none"
						})
					}
				});
			}else{
				uni.showToast({
					title:"用户没有填写手机号码"
				})
			}
		
		},
		onLoad(e){
			let that=this;
			that.orderLineId=e.id||"";
			uni.getStorage({
				key:"shopObj",
				success(res){
					that.shopobj=JSON.parse(res.data);
				}
			})
		},
		onShow(){
			this.init();
		}
	}
</script>

<style scoped>
	.content{
		background: #f2f2f2;
		padding: 0;
	}
	.info{
		background: #fff;
		margin-bottom: 20upx;
		padding: 30upx;
		font-size: 24upx;
		color:#999;
	}
	.info .color{
		color:#333;
		margin-left: 10upx;
	}
	.info>view{
		margin-bottom: 10upx;
	}
	.info .img{
		display: inline-block;
	}
	.info image{
		display: inline-block;
		vertical-align: text-top;
		width:64upx;
		height: 64upx;
		margin-left: 10upx;
	}
	.step1>view{
		background: #fff;
		padding: 30upx;
		padding-bottom: 0;
		margin-bottom: 20upx;
	}
	.step1{
		font-size: 24upx;
	}
	.redio{
		margin-left: 30upx;
		padding-bottom: 20upx;
	}
	.redio text{
		color:#999;
	}
	.step1 label{
		margin-right: 20upx;
	}
	.redioGroup{
		display: inline-block;
		margin-left: 20upx;
	}
	.uni-radio-wrapper{
		width:28upx;
		height:28upx;
	}
	.step1 .title{
		font-size: 28upx;
		color:#333;
		border-left:5upx solid #EE3535;
		padding-left:24upx;
		margin-bottom: 24upx;
	}
	.expro{
		color:#999;
	}
	.expro .color{
		color:#333;
		margin-left: 10upx;
	}
	.addre{
		width:586upx;
		vertical-align: text-top;
		display: inline-block;
	}
	.expro>view>view{
		display: inline-block;
	}
	.address{
		padding: 10upx 0 30upx 0;
	}
	button{
		width:574upx;
		height:75upx;
		line-height: 75upx;
		text-align: center;
		color:#fff;
		background: #2D93FF;
		border:none;
		margin-top: 40upx;
		outline: none;
		border-radius: 20upx;
	}
	.title .r{
		font-size: 22upx;
		color:#2D93FF;
		padding: 13upx 27upx;
		border:1px solid #2D93FF;
		border-radius: 50upx;
	}
	.reject{
		color:#999;
		padding-left: 25upx;
		padding-bottom: 30upx;
	}
	.reject textarea{
		border-bottom: 1px solid #eee;
		vertical-align: text-top;
		font-size: 24upx;
		width:560upx;
		color:#333;
		display: inline-block;
	}
	.step>view{
		background: #fff;
		color:#999;
		font-size: 24upx;
	}
	.step .title{
		padding: 30upx;
		color:#333;
		padding-bottom: 0;
		font-size: 28upx;
	}
	.step .title view{
		border-left:5upx solid #EE3535;
		padding-left: 10upx;
	}
	.step .list{
		padding-left: 40upx;
		padding-bottom: 20upx;
		border-bottom: 1px solid #eee;
	}
	.step .list>view{
		padding-top: 20upx;
		padding-right: 30upx;
	}
	.step .list .color{
		color:#333;
	}
	.line{
		display: inline-block;
	}
	.step .addre{
		width:560upx;
	}
</style>
