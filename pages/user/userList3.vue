<template>
	<view class="content">
		<view class="top">
			<image src="../../static/user/icon09.png"></image>
			<view>
				<view><text class="font_X">关联用户 {{topObj.lowerLevelDirectUserNum}} 人 </text></view>
				<view class="subtitle">当月新增邀请 <text class="color">{{topObj.monthLowerLevelDirectUserNum}}</text> 人    30日新增邀请 <text class="color">{{topObj.thirtyDayLowerLevelDirectUserNum}}</text> 人</view>
			</view>
		</view>
		<view class="list" v-if="userList&&userList.length>0">
			
			<view class="item_list">
				<view>
					<text>手机号码</text>
					<text>注册时间</text>
					<text>渠道商</text>
				</view>
				<view v-for="(item,index) in userList" :key="index">
					<text>{{item.mobile||"暂未提供"}}</text>
					<text>{{item.registerDate?item.registerDate.substr(0,10):""}}</text>
					<text style="font-size:20upx;">{{item.inviterLevel?item.inviterMarchantName+"("+item.inviterLevel+")":"暂未提供"}}</text>
				</view>
			</view>
			<uni-load-more :status="status"></uni-load-more>
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
		data() {
			return{
				status:"loading",
				topObj:{},
				pageNo:1,
				pageAll:2,
				userList:[]
			}
		},
		methods:{
			search(){
				let that=this;
				if(that.pageNo<=that.pageAll){
					that.$ajax({
						url:"/memberManager/lowerLevelDirectUserNumForPage",
						data:{
							pageNo:that.pageNo,
							pageSize:20,
							searchData: {
							  merchantId: that.shopObj.merchantId
							},
						},
						success(d){
							that.pageNo=that.pageNo*1+1;
							that.pageAll=d.totalPage
							console.log(d);
							if(that.pageNo==2){
								that.userList=d.lists
							}else{
								let arr=that.userList;
								that.userList=that.userList.concat(d.lists)
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
		onShow(){
			let that=this;
			uni.getStorage({
				key:"shopObj",
				success(res){
					that.shopObj=JSON.parse(res.data);
				}
			})
			that.$ajax({
				url:"/memberManager/lowerLevelDirectUserNumTop",
				data:{
					merchantId:that.shopObj.merchantId
				},
				success(d){
					that.topObj=d;
					that.search()
				}
			})
		}
			
	}
</script>

<style scoped>
	.content{
		background: #f9f9f9;
		padding: 0;
	}
	.top{
		position: fixed;
		width:100%;
		padding: 30upx;
		background: #fff;
	}
	.top image{
		width:72upx;
		height:72upx;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 30upx;
	}
	.subtitle{
		font-size: 20upx;
		color:#999;
	}
	.color{
		color:#EE3435;
	}
	.top{
		font-size: 24upx;
	}
	.font_X{
		font-size: 28upx;
		margin-right: 10upx;
	}
	.top>view{
		vertical-align: middle;
		display: inline-block;
	}
	.list{
		margin-top: 172upx;
	}
	.item_list>view{
		background: #fff;
		height:80upx;
		line-height: 80upx;
		border-top:1px solid #eee;
		padding: 0 40upx;
		box-sizing: border-box;
		display: flex;
		width:750upx;
	}
	.item_list>view>text{
		flex:1;
		text-align: center;
		overflow:hidden; //超出的文本隐藏
		text-overflow:ellipsis; //溢出用省略号显示
		white-space:nowrap; //溢出不换行
	}
</style>
