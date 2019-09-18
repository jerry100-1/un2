<template>
	<view class="content">
		<view v-if="dataList.length>0">
			<view class="top">
				<view class="money">用户返佣总金额:<text class="color">￥{{money}}元</text> </view>
				<view class="head">
					<view>交易用户</view>
					<view>交易金额</view>
					<view>订单来源</view>
					<view>交易日期</view>
					<view>返佣金额</view>
				</view>
			</view>
			<view class="list">
				<view class="item_list" v-for="(item,index) in dataList" :key="index">
					<view>{{item.transactionUser||""}}</view>
					<view>￥{{item.transactionAmount||"0"}}</view> 
					<view>{{statusArr[item.transactionChannel]}}</view>
					<view>{{item.createTime||""}}</view>
					<view>￥{{item.taxableAmountOfDividends||"0"}}</view>
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
				statusArr:["","淘宝","","京东","","联盟商家","免费商城","拼多多"],
				money:"",
				status:"loading",
				shopObj:{},
				dataList:[],
				pageNo:1,
				pageAll:2,
			}
		},
		methods:{
			search(){
				let that=this;
				if(that.pageNo<=that.pageAll){
					that.$ajax({
						url:"/fund/searchAllTaxableAmountOfDividendsForPage",
						data:{
							pageNo:that.pageNo,
							pageSize:20,
							searchData: {
							  marchantId: that.shopObj.merchantId
							},
						},
						success(d){
							console.log(d)
							that.pageNo=that.pageNo*1+1;
							that.pageAll=d.totalPage
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
		onReachBottom(){
			this.search()
		},
		onLoad(e){
			this.money=e.money||0
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
		},	
	}
</script>

<style scoped>
	.content{
		padding: 0;
		background: #f2f2f2;
	}
	.color{
		color:#EE3535;
	}
	.top{
		position: fixed;
		width:100%;
	}
	.money{
		padding: 0 30upx;
	}
	.top>view{
		line-height: 100upx;
		background: #f3f3f3;
	}
	.top .head{
		background: #dfdfdf;
		line-height: 84upx;
		display: flex;
		padding: 0 20upx;
	}
	.top .head>view{
		flex:1;
		text-align: center;
	}
	.list{
		margin-top: 186upx;
	}
	.item_list{
		padding: 0 20upx;
		display: flex;
		background: #fff;
	}
	.item_list>view{
		flex:1;
		font-size: 24upx;
		line-height: 80upx;
		text-align: center;
	}
</style>
