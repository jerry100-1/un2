<template>
	<view class="content">
		<view v-if="dataList.length>0" >
			<view class="top">
				<view class="money">注册奖励总金额:<text class="color">￥{{invitebonus?invitebonus:registerrewardtotalamount}}元</text> </view>
				<view class="head">
					<view>注册日期</view>
					<view>微信信息</view>
					<view>用户身份</view>
					<view>奖励金额</view>
					<view>归属商户</view>
				</view>
			</view>
			<!-- 备注,datalist1是假的数据，其实是dataList -->
			<view class="list">
				<!-- <view style="font-size:30upx;width:100%;text-align:center;" v-if="dataList.length>0">暂无数据</view> -->
				<view class="item_list" v-for="(item,index) in dataList" :key="index">
					<view>{{(item.createTime).substr(0,10)||"暂无时间"}}</view>
					<view>{{item.wxAccount||"暂无信息"}}</view> 
					<view>{{item.identity|formateIdentift()}}</view>
					<view>{{item.amout||"暂无金额"}}</view>
					<view>{{item.phone||"暂无数据"}}</view>
				</view>
				<!-- <uni-load-more :status="status"></uni-load-more> -->
			</view>
		</view>
		<view class="no" v-else>
			<image src="../../static/noData.png" class="noData"></image>
			<view>暂无数据</view>
		</view>
	</view>
</template>

<script>
	var that="";
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
				invitebonus:"",
				registerrewardtotalamount:"" //注册奖励总金额
			}
		},
		filters:{
			formateIdentift:function(item)
			{
				//c  1--运营商  b  2--渠道商  a  3-联盟商家
				if(item==1)
				{
					return "运营商";
				}else if(item==2)
				{
					return "渠道商";
					
				}else{
					return "联盟商家"
				}
				
			},
		},
		methods:{
			
			search(){
				let that=this;
				if(that.pageNo<=that.pageAll){
					that.$ajax({
						url:"/fund/registeredRewardDetailForPage",
						data:{
							pageNo:that.pageNo,
							pageSize:20,
							searchData: {
							  marchantId: that.shopObj.merchantId
							},
						},
						success(d){
							console.log("你好,这是注册奖励总金额查询出来的结果----------------");
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
			that.search()
		},
		onLoad(e){
			that=this;
			that.money=e.money||0
			console.log("这是从首页带过来的数据"+e.invitebonus);
			that.invitebonus=e.invitebonus;
			
			that.registerrewardtotalamount=e.registerrewardtotalamount;
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
