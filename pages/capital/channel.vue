<template>
	<view class="content">
		<view v-if="channelList.length>0">
			<view class="top">
				<view class="money">渠道收入金额:<text class="color">￥{{money||0}}元</text> </view>
			</view>
			<view class="list">
				<view class="item_list" v-for="(item,index) in channelList" :key="index">
					<view>
						<text>入驻日期:{{item.createTime}}</text>
						<text class="r">入驻成功</text>
					</view>
					<view class="box">
						<view>
							<image :src="item.displayImg"></image>
						</view>
						<view class="left">
							<view class="title">{{item.shopName}}</view>
							<view>
								<text>商户等级:{{item.gradeName}} （{{item.gradeName=="C"?'事业部':item.gradeName=="B"?'互信版':item.gradeName=="A2"?'互爱版':'愉悦版'}}）</text>
								<text class="color r">￥{{item.paymentMoney}}</text>
							</view>
							<view>
								<text>联系人:{{item.contactsName}}</text>
							</view>
							<view>
								<text>联系电话:{{item.contactsPhone}}</text>
							</view>
						</view>
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
				money:"",
				status:"loading",
				shopObj:{},
				channelList:[],
				pageNo:1,
				pageAll:2,
			}
		},
		methods:{
			search(){
				let that=this;
				if(that.pageNo<=that.pageAll){
					that.$ajax({
						url:"/fund/searchChannelRevenueForPage",
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
								that.channelList=d.lists
							}else{
								let arr=that.channelList;
								that.channelList=that.channelList.concat(d.lists)
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
		background: #f2f2f2;
		padding: 0;
	}
	.color{
		color:#EE3535;
	}
	.top{
		line-height: 88upx;
		padding: 0 30upx;
	}
	.item_list{
		height: 280upx;
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
	.left>view{
		margin-bottom: 15upx;
	}
	.title{
		display: -webkit-box;
		margin: 0 auto;
		overflow: hidden;
	}

</style>
