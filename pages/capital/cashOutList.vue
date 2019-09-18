<template>
	<view class="content">
		<view v-if="cashList.length>0">
			<view class="top">
				<view class="money">已提现金额:<text class="color">￥{{money||0}}元</text> </view>
				<view class="head">
					<view>提现日期</view>
					<view>收入来源</view>
					<view>提现金额</view>
					<view>提现状态</view>
				</view>
			</view>
			<view class="list">
				<view class="item_list" v-for="item in cashList" :key="item.distillId">
					<view>{{item.takeOutTime}}</view>
					<view>{{item.freeSource|formateFreeSource()}}</view>
					<view>￥{{item.distillMoney||0}}</view>
					<view>{{item.distillState==4?'已完成':'待审核'}}</view>
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
				money:"",
				status:"loading",
				shopObj:{},
				cashList:[],
				pageNo:1,
				pageAll:2,
			}
		},
		filters:{
			formateFreeSource:function(item)
			{
				if(item.freeSource==1)
				{
					return "销售提现";
				}else if(item.freeSource==2)
				{
					return "返佣提现";
				}else if(item.freeSource==3)
				{
					return "注册奖励提现";
				}else
				{
					return "交易补贴提现";
				}
			}
		},
		methods:{
			search(){
				let that=this;
				if(that.pageNo<=that.pageAll){
					that.$ajax({
						url:"/fund/searchHasBeenPresentedForPage",
						data:{
							pageNo:that.pageNo,
							pageSize:20,
							searchData: {
							  marchantId: that.shopObj.merchantId
							},
						},
						success(d){
							that.pageNo=that.pageNo*1+1;
							that.pageAll=d.totalPage
							if(that.pageNo==2){
								that.cashList=d.lists
							}else{
								let arr=that.cashList;
								that.cashList=that.cashList.concat(d.lists)
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
	}
	.top .head>view{
		flex:1;
		text-align: center;
	}
	.list{
		margin-top: 186upx;
	}
	.item_list{
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
