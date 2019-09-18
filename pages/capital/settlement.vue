<template>
	<view class="content">
		<view class="fiex">
			<view class="border" v-bind:class="{active:type==1 }" @tap="change(1)">
				<text>交易中（元）</text>
			</view>
			<view v-bind:class="{active:type==2 }"  @tap="change(2)">
				<text>结算中（元）</text>
			</view>
		</view>
		<view v-if="dataList.length>0" class="boxs">
			<view class="top">
				<view class="money">{{type==1?'交易中订单金额':'结算中订单金额'}} : <text class="color">￥{{type==1?(money||0):(money1||0)}}元</text> </view>
			</view>
			<view class="list">
				<!-- 注意此处的高度,25号 -->
				<view class="item_list" style="height:340upx;" v-for="(item,index) in dataList" :key="index">
					<view>
						<text>订单支付时间:{{item.createTime}}</text>
						<text class="r">{{type==1?"交易中":"结算中"}}</text>
					</view>
					<view class="box">
						<view>
							<image :src="item.originalImg||item.pictUrl||srcArr[item.source]"></image>
						</view>
						<view class="left">
							<view class="title">{{item.productName||item.itemTitle||""}}</view>
							
							<view style="margin-top:-60upx;">
					<!-- 			<text class="price">{{item.payment==1?"联盟支付":"普通支付"}}</text> -->
					            <text class="price">{{item.payment==1?"联盟支付":"普通支付"}}</text>
								</br>
								<text v-if="item.payment==1">联盟经费:{{item.productRatio}}%</text>
								<text class="r" v-if="item.commissionRatio">分享佣金比例{{item.commissionRatio||""}}%</text>
							</view>
							<view>
								<text class="price">￥{{item.payMoney||item.alipayTotalPrice||""}}</text>
								<text class="r">x{{item.productNum||item.itemNum||""}}</text>
							</view>
						</view>
					</view>
					
					<view  class="wrapLookExpress" style="">
						<view class="lookExpressText" :data-tradeno="item.tradeNo" :data-trackingnumber="item.trackingNumber" :data-expresscompany="item.expressCompany" @tap="lookExpressDetail">查看物流</view>
					</view>
					
				
				   
				</view>
				
				<uni-load-more :status="status"></uni-load-more>
			</view>
		</view>
		<view class="no" v-else>
			<image src="../../static/noData.png" class="noData"></image>
			<view>暂无数据</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {uniLoadMore},
		data(){
			return{
				money:"",//交易中
				money1:"",//结算中
				srcArr:["","../../static/pro/shop1@2x.png","","../../static/pro/shop3@2x.png","","","","../../static/pro/shop7@2x.png"],
				dataList:[],//数据
				type:"1",//当前类型1为交易中2为结算中
				status:"loading",
				shopObj:{},
				pageNo:1,
				pageAll:2,
			}
		},
		onReachBottom(){
			this.search()
		},
		methods:{
			lookExpressDetail:function(e)
			{
				console.log("你好，得到的tradeNo是"+e.currentTarget.dataset.tradeno);
				console.log("你好，得到的expressCompany是"+e.currentTarget.dataset.expresscompany);
				console.log("你好，得到的trackingNumber是"+e.currentTarget.dataset.trackingnumber);
				uni.navigateTo({
					url:"/pages/order/logistics?expressName="+e.currentTarget.dataset.expresscompany+"&expressNo="+e.currentTarget.dataset.trackingnumber
				})
			},
			change(num){
				this.type=num;
				console.log("你好,这是num"+this.type);
				this.dataList=[];
				this.pageNo=1;
				this.pageAll=2;
				this.status="loading";
				this.search()
			},
			search(){
				let that=this;
				let url="";
				if(that.type==1){
					url="/fund/searchSalesRevenueForPage"
				}else{
					url="/fund/searchTransactionIngForPage"
				}
				console.log(url)
				if(that.pageNo<=that.pageAll){
					that.$ajax({
						url:url,
						data:{
							pageNo:that.pageNo,
							pageSize:20,
							searchData: {
							  marchantId: that.shopObj.merchantId
							},
						},
						success(d){
							
							console.log("你好,这是带结算接口返回的所有数据信息"+d);
							
							that.pageNo=that.pageNo*1+1;
							that.pageAll=d.totalPage
							console.log(d);
							if(that.pageNo==2){
								that.dataList=d.lists
							}else{
								let arr=that.dataList;
								that.dataList=that.dataList.concat(d.lists)
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
			this.type=e.type;
			this.money=e.money||0;
			this.money1=e.money1||0;
		},
		onShow(){
			let that=this;
			uni.getStorage({
				key:"shopObj",
				success(res){
					that.shopObj=JSON.parse(res.data);
					that.search()
				}
			})
		}
	}
</script>

<style scoped>
	.textFlex1{
		width:100%;
		height:100upx;
		display:block;
		border-top:1px solid rgba(0,0,0,0.08);
		margin-top:20upx;
	}
	.textFlex2{
		width:180upx;
		height:45upx;
		line-height:45upx;
		border:1px solid rgba(0,0,0,0.18);
		font-size:26upx;
		text-align:center;
		display:block;
		position:relative;
		top:8upx;
		float:right;
		margin-right:20upx;
		border-radius:30upx;
	}
	.textFlex3{
		width:100%;
		height:22upx;
		background:rgba(0,0,0,0.10);
		border-top:1px solid rgba(0,0,0,0.12);
		border-bottom:1px solid rgba(0,0,0,0.12);
		display:block;
		position:relative;
		top:65upx;
	}
	.content{
		background: #f2f2f2;
		padding: 0;
	}
	.wrapLookExpress{
		width:100%;
		height:60upx;
		border-top:1px solid rgba(0,0,0,0.08);
	    display:flex;
		flex-direction:row;
		justify-content:flex-end;
	}
	.lookExpressText{
		width:140upx;
		height:46upx;
		border:1px solid rgba(0,0,0,0.18);
		border-radius:26upx;
		margin-top:8upx;
		text-align:center;
		margin-right:80upx;
		line-height:46upx;
	}
	.boxs{
		margin-top: 88upx;
	}
	.border{
		border-right:1px solid #eee;
	}
	.fiex{
		width:100%;
		position: fixed;
		line-height: 86upx;
		background: #fff;
		display: flex;
		z-index: 10000;
	}
	.fiex>view{
		flex:1;
		text-align: center;
		border-bottom: 6upx solid transparent;
	}
	.fiex .active{
		color:#2D93FF ;
		border-bottom: 6upx solid #2D93FF;
	}
	.color{
		color:#EE3535;
	}
	.top{
		line-height: 88upx;
		padding: 0 30upx;
	}
	.item_list{
		height: 360upx;
		background: #fff;
		border-top:1px solid #eee;
	}
	.item_list>view{
		padding: 0 30upx;
		font-size: 22upx;
		margin-top: 25upx;
		
	}
	.item_list>view>.r{
		color:#EE3535;
	}
	.item_list image{
		width:164upx;
		
		height:164upx;
		margin-right: 18upx;
	}
	.box>view{
		display: inline-block;
		vertical-align: top;
	}
	.box .left{
		width:478upx
	}
	.title{
		height: 64upx;
		display: -webkit-box;
		margin: 0 auto;
		line-height: 1.4;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 70upx;
	}
	.price{
		color:#f90;
	}
</style>
