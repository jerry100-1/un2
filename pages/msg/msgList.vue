<template>
	<view class="content">
		<view class="msgType">
			<view class="list">
				<view>
					<!-- <view class="item_list" @click="msgTypeChange" data-type="1">
						<image src="../../static/user/message_icon1.png"></image>
						<text :class="{active:msgType==1}">交易物流</text>
					</view>
					<view class="item_list" @click="msgTypeChange" data-type="2">
						<image src="../../static/user/message_icon2.png"></image>
						<text :class="{active:msgType==2}">订单消息</text>
					</view> -->
					<view class="item_list" @click="msgTypeChange" data-type="3">
						<image src="../../static/user/message_icon3.png"></image>
						<text :class="{active:msgType==3}">系统消息</text>
					</view>
					<view class="item_list" @click="msgTypeChange" data-type="4">
						<image src="../../static/user/message_icon4.png"></image>
						<text :class="{active:msgType==4}">入账通知</text>
					</view>
				</view>
			</view>
			<view class="whiteBg"></view>
		</view>
		<view class="box">
			<view class="list" v-if="msgList&&msgList.length>0">
				<view class="item" v-for="(item,index) in msgList" :key="index">
					<view class="title">{{item.createTime||""}}</view>
					<view class="item_list">
						<view class="item_con">
							<view v-if="msgType==3">
								<image :src="item.resources||def" class="proImg" ></image>
							</view>
							<view v-else>
								<image :src="item.val.productImg" class="proImg" ></image>
							</view>
							<view class="msg_item">
								<view class="msgText" v-if="item.title">{{item.title||""}}</view>
								<view v-if="item.val"> 交易时间:{{item.val.createTime||""}}</view>
								<view class="msgtitle" v-if="item.val">交易商品:{{item.val.productName||""}}</view>
								<view v-if="item.val"> 交易金额:￥{{item.val.payPrice||""}}</view>
								<view v-if="item.val"> 订单状态:{{msgTypeArr[item.msgType]||""}}</view>
						   <!-- <view class="proName" v-if="msgType==2"> 2019流苏刺绣百搭四季披肩 杜嘉班纳同款 限量1000份 </view> -->
								<view v-if="item.val"> 商品价格:￥{{item.val.productPrice||""}}</view>
								<view v-if="item.comment">附加消息:{{item.comment}}</view>
							</view>
						</view>
						<!-- <view class="footer" v-if="msgType==1" :data-img="item.resources" :data-expresscompany="item.val.expressCompany" :data-trackingnumber="item.val.trackingNumber" @tap="seeDetails">
							<text>查看详情</text>
							<image src="../../static/reight.png"></image>
						</view> -->
						<view class="footer" v-if="msgType==2&&item.orderType==3" @tap="order(3)">
							<text>订单发货</text>
							<image src="../../static/reight.png"></image>
						</view>
						<view class="footer" v-if="msgType==2&&item.orderType==7" @tap="order(-1)">
							<text>立即退款</text>
							<image src="../../static/reight.png"></image>
						</view>
					</view>
				</view>
				<uni-load-more :status="status"></uni-load-more>
			</view>
			<view class="no" v-else>
				<image src="../../static/noData.png" class="noData"></image>
				<view>暂无数据</view>
			</view>
		</view>
	</view>
</template>


<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {uniLoadMore},
		data() {
			return{
				msgTypeArr:["","","","","","","","系统","b2c时光豆入账","联盟商家时光豆入账消息","赠送时光豆入账","联盟商家销售入账","联盟商家分红入账","b2c分红入账"],
				orderTypeArr:["待付款","","失效","未发货","已发货","","","申请退款","退款成功","","","","待评价","交易完成","交易取消"],
				status:"loading",
				shopObj:{},
				msgList:[],//消息列表
				msgType:3,//消息类别,
				pageNo:1,
				pageAll:2,
				def:"/static/pro/down.png"
			}
		},
		methods: {
			msgTypeChange(e){
				this.msgType=e.currentTarget.dataset.type;
				this.pageNo=1;
				this.pageAll=2;
				this.msgList=[];
				this.search()
			},
			//查看详情按钮
			seeDetails(e){
				let that=this;
				if(that.msgType==1){
					//物流详情
					uni.navigateTo({
						url:"/pages/order/logistics?expressNo="+e.currentTarget.dataset.expresscompany+"&expressName="+e.currentTarget.dataset.trackingnumber+"&img="+e.currentTarget.dataset.img
					})
				}
			},
			//跳转订单
			order(index){
				uni.navigateTo({
					url:"/pages/order/orderList?orderType="+index
				})
			},
			search(){
				let that=this;
				if(that.pageNo<=that.pageAll){
					that.$ajax({
						url:"/systemMessage/message",
						data:{
							pageNo:that.pageNo,
							searchData: {
							  merchantId:that.shopObj.merchantId,
							  msgType:that.msgType
							}
						},
						success(d){
							that.pageNo=that.pageNo*1+1;
							that.pageAll=d.totalPage
							if(d.lists){
								for(var i=0,len=d.lists.length;i<len;i++){
									if(d.lists[i].val){
										d.lists[i].val=JSON.parse(d.lists[i].val)
										console.log(d.lists[i].val)
									}
								}
							}
							
							if(that.pageNo==2){
								that.msgList=d.lists
							}else{
								let arr=that.msgList;
								that.msgList=that.msgList.concat(d.lists)
							}
							if(that.pageNo>that.pageAll){
								that.status="noMore"
							}
							console.log(that.msgList)
						}
					})
				}
				
			},
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
			this.search()
		}
	}
</script>

<style scoped>
	.content{
		padding: 0;
		background: #f2f2f2;
	}
	.msgType{
		position: fixed;
		width:100%;
		height:196upx;
		overflow: hidden;
		margin-bottom: 20upx;
		z-index: 2;
	}
	.msgType .active{
		color:#EE3535;
	}
	.whiteBg{
		height:76upx;
		width:100%;
		background: #fff;
	}
	.msgType .list{
		 background: rgb(15, 174, 255);
		 height:120upx;
	}
	.msgType .list>view{
		width:687upx;
		border-radius: 10upx;
		background: #fff;
		margin: 0 auto;
		display: flex;
		padding-top: 25upx;
	}
	.msgType .list .item_list{
		flex:1;
		text-align: center;
	}
	.msg_item>view{
		width: 500upx;
	}
	.msgType .list image{
		width:82upx;
		height:82upx;
		display: block;
		margin: 0 auto;
		border-radius: 50%;
	}
	.box{
		margin-top: 200upx;
	}
	.box .title{
		background: transparent;
		color:#333;
		line-height: 80upx;
		text-align: center;
	}
	.box .item_list{
		background: #fff;
		margin-bottom: 20upx;
	}
	.item_con{
		padding: 30upx;
	}
	.box .item_list>view>view{
		display: inline-block;
		vertical-align: top;
	}
	.box .item_list image{
		width:14upx;
		height:26upx;
		margin-left: 10upx;
		display: inline-block;
	}
	.box .item_list .proImg{
		width:126upx;
		height:126upx;
		margin-right: 28upx;
		border:1px solid #eee;
		z-index: 1;
	}
	.msgText{
		font-size: 34upx;
		color:#333;
		font-weight: 600;
		margin-left: -16upx;
	}
	.footer{
		height: 62upx;
		line-height: 62upx;
		border-top:1px solid #eee;
		text-align: center;
	}
	.proName{
		font-size:32upx;
		color:#333;
		display:-webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical;
		overflow:hidden;
		text-overflow:ellipsis;
		height:80upx;
        width:520upx;
	}
</style>
