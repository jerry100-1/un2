<template>
	<view class="content">
		<view class="top" style="flex-direction:row;">
			<image src="../../static/user/icon08.png"></image>
			<view>
				<view><text class="font_X">商家直属注册用户总数 {{registerData1||0}} 人 </text> </view>
				
				<view style="display:flex;flex-direction:row;">
					<view style="color:rgba(0,0,0,0.48)">7日新增邀请 <text class="color">{{registerData2||0}}</text> 人</view>
					<view class="subtitle"> <text style="visibility:hidden;">你好</text>   </view>
				</view>
				
			</view>
		</view>
		<view class="list" v-if="userList&&userList.length>0">
			
			<view class="item_list">
				<view>
					<text>用户绑定信息</text>
					<text>注册时间</text>
					<!-- <text>渠道商</text> -->
				</view>
				<view v-for="(item,index) in userList" :key="index">
					<text>{{item.mobile==null?item.wxAccount:item.mobile}}</text>
					<text>{{item.registerDate.substr(0,10)}}</text>
					<!-- <text v-if="item.mobile">{{item.inviterMarchantName||"暂无名称"}}</text> -->
				
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
				userList:[],
				registerData1:"",
				registerData2:""
			}
		},
		
		methods:{
			search(){
				let that=this;
				if(that.pageNo<=that.pageAll){
					that.$ajax({
						url:"/memberManager/merchantDirectUserRegisterNumForPage",
						data:{
							pageNo:that.pageNo,
							pageSize:20,
							searchData: {
							  merchantId: that.shopObj.merchantId
							},
						},
						success(d){
							console.log("你好,这是商家直属注册用户列表的返回数据!");
							that.pageNo=that.pageNo*1+1;
							that.pageAll=d.totalPage
							console.log(d);
							if(that.pageNo==2){
								that.userList=d.lists
							}else{
								let arr=that.userList;
								that.userList=that.userList.concat(d.lists)
							}
							console.log(that.userList)
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
		onLoad:function(e)
		{
			let that=this;	
			console.log("你好,我在本页面获取的上家直属注册用户总数是"+e.data100);
			that.registerData1=e.data100;
			that.registerData2=e.data101;
			console.log("你好,我在本页面获取的7日新增直属注册用户数是"+e.data101);
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
				url:"/memberManager/merchantDirectUserRegisterNumTop",
				data:{
					merchantId:that.shopObj.merchantId
				},
				success(d){
					that.topObj=d;
					console.log("这是商家直属注册用户头部返回的数据"+d);
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
		width:100%;
	}
	.item_list>view>text{
		flex:1;
		text-align: center;
	}
</style>
