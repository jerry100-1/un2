<template>
    <view class="content">
		<view class="type" >
			<view class="border imgs" @click="chanege" data-type="1"  v-bind:class="{ active: type==1 }">
				<image src="../../static/user/icon1_a.png" mode="scaleToFill" v-if="type!=1"></image>
				<image src="../../static/user/icon1_hover.png" mode="scaleToFill" v-if="type==1"></image>
				<view>用户</view>
			</view>
			<view class="imgs" @click="chanege" data-type="2" v-bind:class="{ active: type!=1 }">
				<image src="../../static/user/icon2_a.png" alt="" mode="scaleToFill" v-if="type==1"></image>
				<image src="../../static/user/icon2_hover.png" mode="scaleToFill" v-if="type!=1"></image>
				<view>评价</view>
			</view>
		</view>
		<view v-if="type==1" class="box">
			<view class="list">
				<view class="item_list">
					<image src="../../static/user/icon01.png" mode="widthFix"></image>
					<view>
						<text>7日内新增消费用户 <text class="color"> {{obj.sevenDayNewUserNum||0}}</text> 人</text>
					</view>
				</view>
				<view class="item_list">
					<image src="../../static/user/icon02.png" mode="widthFix"></image>
					<view>
						<text>总消费用户 <text class="color"> {{obj.allConsumptionUserNum||0}}</text> 人</text>
					</view>
				</view>
				<view class="item_list">
					<image src="../../static/user/icon03.png" mode="widthFix"></image>
					<view>
						<text>7日平均客单价 <text class="color"> {{obj.sevenDayUserConsumptionPrice||0}}</text> 元</text>
						<text>30日平均客单价 <text class="color"> {{obj.thirtyDayUserConsumtionPrice||0}}</text> 元</text>
					</view>
				</view>
				<view class="item_list">
					<image src="../../static/user/icon04.png" mode="widthFix"></image>
					<view>
						<text>回头客 <text class="color"> {{obj.returnCustomer||0}}</text> 人</text>
						<text>7日回头客 <text class="color"> {{obj.sevenDayReturnCustomer||0}}</text> 人</text>
					</view>
				</view>
				<view class="item_list">
					<image src="../../static/user/icon05.png" mode="widthFix"></image>
					<view>
						<text>新人礼包领取用户数 <text class="color"> {{obj.allNoviceGiftBag||0}}</text> 人</text>
						<text>线下领取用户数 <text class="color"> {{obj.offlineNoviceGiftBag||0}}</text> 人</text>
					</view>
				</view>
			</view>
			<view class="banner">
				<image src="../../static/user/userAdminBanner_02.jpg" mode="widthFix"></image>
			</view>
			<view class="list">
				<view class="item_list" @click="url" data-url="/pages/user/userList1">
					<image src="../../static/user/icon06.png" mode="widthFix"></image>
					<view>
						<text>商家直推邀请用户 <text class="color"> {{obj.merchantDirectUserNum||0}}</text> 人</text>
						<text>当月新增邀请 <text class="color"> {{obj.monthMerchantDirectUserNum||0}}</text> 人</text>
					</view>
					<image src="../../static/reight.png" mode="scaleToFill" class="r"></image>
				</view>
				<view class="item_list" @click="url" data-url="/pages/user/userList2">
					<image src="../../static/user/icon07.png" mode="widthFix"></image>
					<view>
						<text>直推用户邀请用户 <text class="color"> {{obj.userDirectUserNum||0}}</text> 人</text>
						<text>当月新增邀请 <text class="color"> {{obj.monthUserDirectUserNum||0}}</text> 人</text>
					</view>
					<image src="../../static/reight.png" mode="scaleToFill" class="r"></image>
				</view>
				
				<!-- 商家直属注册用户总数 -->
				<view class="item_list" @click="url109" data-url="/pages/user/userList4" :data-data100="obj.merchantDirectUserRegisterNum"
				  :data-data101="obj.sevenDayMerchantDirectUserRegisterNum">
					<image src="../../static/user/icon08.png" mode="widthFix"></image>
					<view>
						<text>商家直属注册用户 <text class="color"> {{obj.merchantDirectUserRegisterNum||0}}</text> 人</text>
						<text>7日新增邀请<text class="color"> {{obj.sevenDayMerchantDirectUserRegisterNum||0}}</text> 人</text>
					</view>
					<image src="../../static/reight.png" mode="scaleToFill" class="r"></image>
				</view>
				
				
				<!-- 下级渠道关联用户总数 -->
				<view class="item_list" @click="url" data-url="/pages/user/userList3" v-if="shopObj.level!=3">
					<image src="../../static/user/icon09.png" mode="widthFix"></image>
					<view>
						<text>下级渠道关联用户总数 <text class="color"> {{obj.lowerLevelDirectUserNum||0}}</text> 人</text>
						<text>当月新增邀请 <text class="color"> {{obj.monthLowerLevelDirectUserNum||0}}</text> 人</text>
					</view>
					<image src="../../static/reight.png" mode="scaleToFill" class="r"></image>
				</view>
				
				
				<!-- 下级渠道关联注册用户总数 -->
				<view class="item_list" @click="url2" data-url2="/pages/user/userList5"  v-if="shopObj.level!=3"   :data-data1="obj.lowerLevelDirectUserRegisterNum"
				   :data-data2="obj.sevenDayLowerLevelDirectUserRegisterNum">
					<image src="../../static/user/icon02.png" mode="widthFix"></image>
					<view>
						<text>下级渠道关联注册用户总数 <text class="color"> {{obj.lowerLevelDirectUserRegisterNum||0}}</text> 人</text>
						<text>7日新增邀请<text class="color"> {{obj.sevenDayLowerLevelDirectUserRegisterNum||0}}</text> 人</text>
					</view>
					<image src="../../static/reight.png" mode="scaleToFill" class="r"></image>
				</view>
				
				
			</view>
		</view>
		<view v-else class="box">
			<view class="assessType">
				<view v-bind:class="{active:assessType==6}" data-type="6" @click="assessTypeF">全部</view>
				<view v-bind:class="{active:assessType==5}" data-type="5" @click="assessTypeF">非常好</view>
				<view v-bind:class="{active:assessType==4}" data-type="4" @click="assessTypeF">好评</view>
				<view v-bind:class="{active:assessType==3}" data-type="3" @click="assessTypeF">一般</view>
				<view v-bind:class="{active:assessType==2}" data-type="2" @click="assessTypeF">差</view>
			</view>
			<view v-if="assessList&&assessList.length>0">
				<view class="assessList">
					<view class="asseess_item_lsit" v-for="item in assessList" :key="item.evalId">
						<view class="proInfo">
							<view class="h5">{{item.productName}}</view>
							<view>
								<text class="color">￥{{item.productMoney}}</text>
								<text class="r orderTime">{{item.orderTime||""}}</text>
							</view>
						</view>
						<view>
							<image :src="item.avatar" class="headImg"></image>
							<text class="userName">{{item.nickName}}</text>
							<uni-rate disabled="true" v-model="item.description" size="18" color="#eee" active-color="#ee3535"></uni-rate>
							<text class="r time">{{item.createTime}}</text> 
						</view>
						<view>
							<text class="assessContent">用户评价:{{item.descContent||""}}</text>
						</view>
						<view class="img">
							<image :src="i" v-for="(i,index) in item.images" v-if="item.images!='' " :key="index"></image>
							<button type="primary" @click="isReplyOk(item.evalId)" v-if="item.replyStatus==1">回复</button>
						</view>
						<view class="foot" v-if="item.replyStatus==2">
							<text>商家回复:{{item.reply}}</text>
						</view>
					</view>
				</view>
				<uni-load-more :status="status"></uni-load-more>
			</view>
			<view class="no" v-else>
				<image src="../../static/noData.png" class="noData"></image>
				<view>暂无数据</view>
			</view>
			<view class="reply" v-show="isReply">
				<view>
					<textarea placeholder="请输入回复内容" fixed="true" @confirm="replyConfirm" v-model="replyContent"></textarea>
					<view class="btn">
						 <button @click="isReplyOk(-1)">取消</button>
						 <button class="ok" @click="replyOk">确定</button>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>

	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default {
		components: {uniLoadMore,uniRate},
	    data() {
			return{
				shopObj:{},
				status:"loading",//加载状态
				a:"",
				obj:{
					sevenDayUserConsumptionPrice:0,
					sevenDayLowerLevelDirectUserNum:0,
				},//用户信息
				type:1,//判断当前激活的内容1为用户，2为评价
				assessType:6,//评价类别5 非常好 4 好评 3 一般 1 或 2 差评 其他 全部
				assessList:[],//评价列表
				isReply:false,//是否回复
				replyContent:"",//回复内容
				pageNo:1,
				pageAll:2,
				evalId:"",//评价id
			}
		},
		methods: {
			url109:function(e)
			{
				console.log("你好,获取的商家直属注册用户数据1是"+e.currentTarget.dataset.data100);
				console.log("你好,获取的商家直属注册用户数据2是"+e.currentTarget.dataset.data101);
				
				uni.navigateTo({
					url:"/pages/user/userList4?data100="+e.currentTarget.dataset.data100+"&data101="+e.currentTarget.dataset.data101
				})
				
			},
			url(e){
				console.log("你好,我获取的下级渠道关联注册用户总数是"+e.currentTarget.dataset.data1);
				console.log("你好,我获取的7日内新增下级渠道注册关联用户总数是"+e.currentTarget.dataset.data2);
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			},
			url2(e){
				let url2=e.currentTarget.dataset.url2;
				console.log("你好,我获取的下级渠道关联注册用户总数是"+e.currentTarget.dataset.data1);
				console.log("你好,我获取的7日内新增下级渠道注册关联用户总数是"+e.currentTarget.dataset.data2);
				uni.navigateTo({
					url:"/pages/user/userList5?data1="+e.currentTarget.dataset.data1+"&data2="+e.currentTarget.dataset.data2
				})
			},
			//头部内容切换
			chanege(e){
				this.type=e.currentTarget.dataset.type
				console.log(this.type)
				if(this.type){
					this.assessInit()
				}
			},
			assessInit(){
				let that=this;
				if(that.pageNo<=that.pageAll){
					this.$ajax({
						url:"/memberManager/memberManagerCommentIndex",
						method:"POST",
						data:{
							pageNo:that.pageNo,
							searchData:{
								commentType:that.assessType,
								shopId:that.shopObj.shopId
							}
						},
						success(d){
							that.pageNo=that.pageNo*1+1;
							that.pageAll=d.totalPage;
							if(that.pageNo==2){
								that.assessList=d.lists||[];
							}else{
								let arr=that.assessList;
								that.assessList=that.assessList.concat(d.lists)
							}
							
							if(that.pageNo>that.pageAll){
								that.status="noMore"
							}
						}
					})
								
				}
			},
			initData(){
				this.pageNo=1;
				this.pageAll=2;
				this.status="loading";
				this.assessList=[];
				
			},
			//评价类别切换
			assessTypeF(e){
				this.assessType=e.currentTarget.dataset.type*1;
				this.initData();
				this.assessInit();
			},
			//回复内容输入完成
			replyConfirm(e){
				console.log(e.detail.value)
				this.replyContent=e.detail.value;
			},
			//回复框的显示和隐藏
			isReplyOk(index){
				this.isReply=!this.isReply;
				if(index){
					this.evalId=index
				}
				console.log(this)
			},
			//回复完成
			replyOk(){
				var that=this;
				console.log( that.evalId)
				this.$ajax({
					url:"/memberManager/memberManagerCommentReply",
					method:"POST",
					data:{
						evalId: that.evalId,
						reply: that.replyContent,
						shopId: that.shopObj.shopId
					},
					success(d){
						that.isReply=!that.isReply;
						console.log(1)
						for(let i in that.assessList){
							if(that.evalId==that.assessList[i].evalId){
								that.assessList[i].replyStatus=2;
								that.assessList[i].reply=that.replyContent;
								that.replyContent="";
								return false
							}
						}
					}
				})
			},
		},
		onLoad(){
			var that=this;
			uni.getStorage({
				key:"shopObj",
				success(res){
					that.shopObj=JSON.parse(res.data);
					//level c-1 b-2 a-3
					console.log("当前的用户级别是"+that.shopObj.level);
				}
			})
			this.$ajax({
				url:"/memberManager/memberManagerIndex",
				method:"POST",
				data:{
					merchantId:that.shopObj.merchantId
				},
				success(d){
					
					that.obj=d
					console.log("你好,这是用户管理首页的所有数据"+d);
					
				}
			})
		},
		onReachBottom(){
			//上拉加载
			if(this.type!=1){
				this.assessInit()
			}
		}
	}
</script>

<style scoped>
	*{
		box-sizing: border-box;
	}
	.content{
		padding: 0;
		background: #e9e9e9;
	}
	.type{
		background: #fff;
		display: flex;
		position: fixed;
		width: 100%;
		z-index: 1000;
	}
	.type>.imgs{
		padding-top:25upx;
		vertical-align: middle;
	}
	.imgs view{
		display: inline-block;
		vertical-align: middle;
	}
	.box{
		margin-top: 120upx;
	}
	.type .active{
		border-bottom:6upx solid #2D93FF;
		color:#2D93FF;
	}
	.foot{
		border-top:1px solid #eee;
		padding-top: 20upx;
		font-size: 26upx;
		color:#333;
	}
	.time{
		font-size: 24upx;
		margin-top: 20upx;
	}
	.orderTime{
		font-size: 24upx;
	}
	.type>view{
		flex:1;
		text-align: center;
		border-bottom:6upx solid transparent;
		padding-bottom: 25upx;
	}
	.type image{
		vertical-align: middle;
		margin-right: 10upx;
		width:36upx;
		height:40upx;
	}
	.border{
		border-right:1px solid #eee;
	}
	.list{
		margin-top: 20upx;
	}
	.item_list{
		height:100upx;
		box-sizing: border-box;
		padding: 14upx 30upx;
		background: #fff;
		width:750upx;
		border-bottom:1px solid #eee;
	}
	.item_list image{
		width:72upx;
		height:72upx;
		vertical-align: middle;
		margin-right: 20upx;
		
	}
	.item_list .r{
		width: 14upx;
		height:26upx;
		margin-top: 20upx;
		margin-right: 40upx;
	}
	.item_list view{
		display: inline-block;
		vertical-align: middle;
	}
	.item_list view text{
		display: block;
		font-size: 28upx;
	}
	.item_list view text:nth-child(2){
		color:#999;
		font-size: 24upx;
	}
	.banner{
		width:750upx;
		margin-top:20upx;
	}
	.banner image{
		width:100%;
	}
	.proInfo{
		border-bottom: 1px solid #eee;;
		margin-bottom: 20upx;
	}
	.item_list view .color{
		color:#ee3535;
		display: inline;
	}
	.assessType{
		padding: 0 30upx;
	}
	.assessType view{
		width:110upx;
		height:48upx;
		line-height: 48upx;
		text-align: center;
		display: inline-block;
		margin-top: 20upx;
		margin-right: 10upx;
		background: #fff;
		color:#333;
		font-size: 24upx;
		border-radius: 20upx;
	}
	.assessContent{
		width:100%;
		font-size:28upx;
		color:#333;
		display:-webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical;
		overflow:hidden;
		text-overflow:ellipsis;
		height:80upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
	}
	.h5{
		font-size: 26upx;
		color:#333;
		margin-bottom: 20upx;
	}
	.gear{
		color:#999;
		font-size: 24upx;;
	}
	.color{
		color:#EE3535;
	}
	.proInfo{
	}
	.assessType view.active{
		color:#fff;
		background: #EE3435;
	}
	.asseess_item_lsit{
		background: #fff;
		width:750upx;
		padding: 30upx;
		box-sizing: border-box;
		margin-top: 20upx;
	}
	.headImg{
		width:60upx;
		height:60upx;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 20upx;
	}
	.userName{
		font-size: 30upx;
		color:#333;
	}
	.img image{ 
		width:160upx;
		height:160upx;
		margin-right: 20upx;	
	}
	.img button{
		width:106upx;
		height:48upx;
		line-height: 48upx;
		font-size: 24upx;
		color:#fff;
		display: inline-block;
		border-radius: 50upx;
	}
	.uni-rate{
		display: inline-block;
		vertical-align: middle;
		margin-left: 20upx;
		width:180upx;
	}
	.reply{
		width: 100%;
		height:100%;
		background: rgba(0,0,0,.5);
		position: fixed;
		z-index:10000;
		top:0;
		left:0;
	}
	.reply>view{
		position: absolute;
		top:417upx;
		left:102upx;
		width:543upx;
		height:494upx;
		background: #fff;
		border-radius: 20upx;
		overflow: hidden;
	}
	.reply .btn{
		height:94upx;
		line-height: 94upx;
		background: #eee;
		font-size: 36upx;
		color:#333;
		position: absolute;
		bottom: 0;
		width: 100%;
	} 
	uni-button:after {
		border:none;
	}
	.reply button{
		width:50%;
		display: inline-block;
		border:none;
		
	}
	.reply textarea{
		height:350upx;
		margin: 30upx;
		border-bottom: 1px solid #eee;
		width:483upx;
	}
	.reply .ok{
		border-left:1px solid #eee;
		color:#EE3535;
		
	}
</style>
