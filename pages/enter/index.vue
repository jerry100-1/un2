<template>
	<view class="content">
		<view class="banner">
			<image src="../../static/capital/banner.jpg" mode="widthFix"></image>
		</view>
		<view class="nav">
			<view :class="{ active: enterType==2 }" @tap="typeChange(2)">
				<text>入驻成功</text>
			</view>
			<view :class="{ active: enterType==1 }" @tap="typeChange(1)">
				<text>待审核</text>
			</view>
			<view :class="{ active: enterType==3 }" @tap="typeChange(3)">
				<text>审核失败</text>
			</view>
		</view>
		<view class="search">
			<view v-if="shopObj.level!=3" >
				<picker mode="selector" :range="level" @change="confirmLevel" range-key="text" >
					<view type="text"  placeholder="商户级别" class="level">{{level[levelIndex].text}}</view>
				</picker>
			</view>
			<view>
				<input type="text" value="" placeholder="商户名称" v-model="searchContent"/>
			</view>
			<view @tap="searchName">
				<text>搜索</text>
			</view>
		</view>
		<view class="list">
			<view v-if="dataList.length>0">
				<view class="item_list" v-for="(item,index) in dataList" :key="index">
					<view class="title">
						<text>入驻日期:{{item.createdTime}}</text> 
						<text class="r color" v-if="enterType!=3">{{enterType==2?'入驻成功':'待审核'}}</text>
						<text class="r gear" v-if="enterType==3" >审核失败</text>
						<text class="r buler" v-if="enterType==3" @tap="statShow(item.checkNote)">查看原因</text>
					</view>
					<view class="shopInfo" style="display:flex;">
						<view class="logoImg" style="width:150upx">
							<image :src="item.displayImg"></image>
						</view>
						<view style="display:flex;flex-wrap:wrap;flex:1;">
							<view style="margin-left:15upx;width:100%;">
								<text style="width:40%;float:left;display:inline-block;vertical-align:middle;height:40upx;line-height:40upx;text-overflow:ellipsis;">{{item.companyName}}</text>
								<text style="font-size:120%;color:red;width:50%;float:right;text-align:right;display:inline-block;vertical-align:middle;height:40upx;line-height:40upx;">
									{{item.ditchId==4?'C(运营商)':item.ditchId==3?'B (渠道商)':item.ditchId==2?'A(联盟商家)':'A(联盟商家)'}}
								</text>
							</view>
							<view style="margin-left:15upx;margin-top:10upx;">行业类别:{{item.typeName}}</view>
							<!-- <view style="margin-left:15upx;">实体店:有</view> -->
						     <view style="margin-left:15upx;margin-top:10upx;">
								<text class="fixWidth">实体店铺:&nbsp;&nbsp;{{item.existsShop==1?'有':'无'}}</text>
								<uni-icon type="location" size="18" v-if="shopObj.merchantId==item.marchantId&&item.existsShop==1" @tap="map"></uni-icon>
							</view>
							<!-- <view style="margin-left:15upx;">商户等级:{{item.ditchId==4?'C(事业部)':item.ditchId==3?'B (互信版)':item.ditchId==2?'A2(互爱版)':'A1(愉悦版)'}}</view> -->
							<view style="width:100%;flex-direction:row;display:flex;flex-wrap:nowrap;margin-top:10upx;">
								<view style="margin-left:15upx;width:40%;white-space: nowrap;">联系人:{{item.contactsName}}</view>
								<text style="margin-left:15upx;width:60%;display:flex;flex-wrap:nowrap;">
									联系电话:{{item.contactsPhone}}
									<button type="primary" class="subcomit" v-if="enterType==3" @tap="sub(item.marchantId)">重新提交</button>
								</text>
							</view>
							<!-- <view>增加的{{item.shopIdentity}}</view> -->
							<view style="margin-left:15upx;margin-top:10upx;">商户身份:&nbsp;{{item.shopIdentity | formateItem}}    
							               
<!-- 							     <text class="modifyBtn" style="margin-top:3upx;" v-if="shopObj.merchantId==item.marchantId&&item.existsShop==1&&(item.shopIdentity==1||item.shopIdentity==3)" >修改</text> -->
							      
								 <picker style="margin-top:3upx;" mode="selector" :data-identity="item.shopIdentity" :range="identityArray" @change="shopIdentityChange" class="edit" v-if="shopObj.merchantId==item.marchantId&&item.existsShop==1&&(item.shopIdentity==1||item.shopIdentity==3)">
								 	  <view>修改</view>
								 </picker>  
							
							
							
							</view>
						
							
							
							<view class="isFront" style="margin-left:15upx;margin-top:10upx;">
								<text class="fixWidth">线下支付:{{item.isFront==1?'需要':'不需要'}}</text>
								<picker style="margin-left:-10upx;" mode="selector" :data-identity="item.shopIdentity" :range="isFrontArr" @change="isFrontArrChange" class="edit" v-if="shopObj.merchantId==item.marchantId">
									<view>修改</view>
								</picker>
							</view>
							<view style="margin-left:15upx;margin-top:15upx;" v-if="item.isFront==1">
								<text class="fixWidth" style="white-space:nowrap;">支付方式:{{item.payment==1?"联盟支付":"普通支付"}}</text>
								<picker style="margin-left:10upx;"  mode="selector" :data-identity="item.shopIdentity" :range="paymentArray" @change="changePayment" class="edit" v-if="shopObj.merchantId==item.marchantId">
									<view>修改</view>
								</picker>
						
							</view>
							<view class="isFront" style="margin-left:15upx;"  v-if="item.isFront==1&&(item.shopIdentity==2||item.shopIdentity==3)&&item.payment==1">
								<text  class="fixWidth" style="margin-top:15upx;">联盟经费:{{item.linePayRatio==150?'15%':'8%'}}</text>
								<picker style="margin-left:-30upx;" :data-identity="item.shopIdentity" mode="selector" :range="allianceFunds" @change="confirmFunds" class="edit" v-if="shopObj.merchantId==item.marchantId">
									<view>修改</view>
								</picker>
							</view>
							
							
							<view style="margin-left:15upx;color:#f38989;visibility:hidden;">
								这段文字不起作用
							</view>
							<view v-if="item.shopIdentity==1" style="margin-left:15upx;color:#f38989;padding-bottom:5upx;">
								备注:商户身份可修改升级！
							</view>
							<view v-if="item.shopIdentity==2" style="margin-left:15upx;color:#f38989;padding-bottom:5upx;">
								备注:支付方式和联盟经费可修改！
							</view>
							<view v-if="item.shopIdentity==3" style="margin-left:15upx;color:#f38989;padding-bottom:5upx;">
								备注:商户身份、支付方式和联盟经费可修改！
							</view>
							
						</view>
					</view>
					<view class="item" v-if="item.ditchId>2&&shopObj.merchantId==item.marchantId">
						<view v-if="item.ditchId>3">
							<text>10个全额B类,已招募 <text class="color">{{item.b}}</text>个,剩余可招募<text class="color">{{item.bsurplus}}</text>个</text>
						</view>
						<view :class="{marginTop:item.ditchId>3}">
							<text>10000个全额A类,已招募 <text class="color">{{item.a1}}</text>个,剩余可招募<text class="color">{{item.surplus}}</text>个</text>
						</view>
					</view>
					<view class="item" v-if="item.ditchId>1">
						<text>直属渠道数:</text>
						<text v-if="item.ditchId>3">B</text>
						<text class="color" v-if="item.ditchId>3">{{item.bChannelC}}个</text>
					<!-- 	<text class="marginLeft" v-if="item.ditchId>2">A2</text>
						<text class="color" v-if="item.ditchId>2">{{item.a2ChannelC}}个</text> -->
						<text class="marginLeft" v-if="item.ditchId>1">A</text>
						<text class="color" v-if="item.ditchId>1">{{item.a1ChannelC}}个</text>
					</view>
					<view class="item">
						<view>
							<text>直属用户数:</text>
							<text class="color">{{item.userCount}}个</text>
							<view class="r">
								<text>总用户数:</text>
								<text class="color">{{item.userSum}}个</text>
							</view>
						</view>
						
					</view>
					<view class="item">
						<text>销售商品数:</text>
						<text class="color">{{item.productSum}}个</text>
					</view>	
				</view>
				<uni-load-more :status="status"></uni-load-more>
			</view>
			<view class="no" v-else>
				<image src="../../static/noData.png" class="noData"></image>
				<view>暂无数据</view>
			</view>
		</view>
		<uni-popup :show="isShow" position="middle" mode="fixed">
			<view class="mode">
				<view class="title">
					<text>审核失败原因</text>
				</view>
				<view class="box">
					<text>{{checkNote}}</text>
				</view>
				<view class="foot" @tap="statShow">
					<text>我知道了</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components:{
			wPicker,
			uniPopup,
			uniLoadMore,
			uniIcon
		},
		data(){
			return{
				shopObj:"",
				pageNo:1,
				pageAll:2,
				marchantId:"",
				shopIdentity:"",
				status:"loading",//加载状态
				enterType:2,//入驻状态1待审核2入住成功3审核失败
				allianceFunds:["8%","15%"],//联盟经费
				level:"",
				usinessIdentity:["小微商户自收款","特约商户自收款","特约商户代收款"],
				identityArray:["小微商户自收款","特约商户自收款","特约商户代收款"],
				isFrontArr:["需要","不需要"],
				paymentArray:["联盟支付","普通支付"],
				checkNote:"",//失败原因
				levelIndex:0,
				dataList:[],
				isShow:false,
				searchContent:"",
			}
		},
		filters:{
			formateItem(item)
			{
				
				if(item==1)
				{
					return "小微商户自收款";
				}else if(item==2)
				{
					return "特约商户自收款";
				}else if(item==3)
				{
					return "特约商户代收款";
				}else
				{
					return "暂无用户身份"; 
					
				}
			},
		},
		methods:{
			
			map(){
				let that=this;
				uni.chooseLocation({
					success: function (res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						that.$ajax({
							url:"/channelManagementRest/updateGeographicPosition",
							data:{
								latitude: res.latitude,
								longitude: res.longitude,
								shopId: that.shopObj.shopId
							},success(d){
								uni.showToast({
									title:"修改成功",
									icon:"none"
								})
							}
						})
					}
				})
			},
			//线下支付
			isFrontArrChange(e){
				console.log(e)
				console.log("选择线下支付是否需要变更之前的的用户身份是"+e.currentTarget.dataset.identity);
				let that=this;
				that.$ajax({
					url:"/channelManagementRest/updateLineIsFront",
					data:{
						marchantId:that.shopObj.merchantId,
						isFront:e.detail.value*1+1,
						shopIdentity:e.currentTarget.dataset.identity
					
					},
					success(d){
						that.dataList[0].isFront=d.isFront;
						that.shopObj.isFront=d.isFront;
						uni.setStorageSync('shopObj', JSON.stringify(that.shopObj))
					}
				})
			},
			changePayment(e)
			{
				console.log("兄台,你好,你选择的是"+e.detail.value);
				console.log("你好,获取的用户身份是"+e.currentTarget.dataset.identity);
				let that=this;
				that.$ajax({
					url:"/channelManagementRest/updatePayment",
					data:{
	                    payment:e.detail.value==0?1:2,
						marchantId: that.shopObj.merchantId,
						shopIdentity:e.currentTarget.dataset.identity
					},
					success(d){
						console.log(d);
						console.log("你好,你选择的支付方式是"+d.payment);
						//that.dataList[0].linePayRatio=d.linePayRatio
					that.dataList[0].payment=d.payment;
					
					}
				})
				
				
			},
			//修改用户身份
			shopIdentityChange(e)
			{
				let that=this;
				// console.log("你好,你选择的用户身份是"+e.currentTarget.dataset.identity);
				console.log("你好,你选择的用户身份的索引是"+e.detail.value);
				if(e.detail.value==0)
				{
					that.shopIdentity=1;
				}else if(e.detail.value==1)
				{
					that.shopIdentity=2;
				}else if(e.detail.value==2){
					that.shopIdentity=3;
				}
				
				that.$ajax({
					url:"/channelManagementRest/updateshopIdentity",
					data:{
						marchantId: that.shopObj.merchantId,
						shopIdentity:that.shopIdentity
					},
					success(d){
						console.log(d)
						that.dataList[0].shopIdentity=d.shopIdentity
					}
				})

			},
			//上面导航的切换
			typeChange(index){	
				this.enterType=index;
				this.init()
				this.search()
			},
			//重新提交
			sub(id){
				uni.navigateTo({
					url:"enter1?id="+id
				})
			},
			//数据初始代
			init(){
				let that=this;
				that.pageNo=1;
				that.pageAll=2;
				that.dataList=[];
				that.status="loading"
			},
			//查找
			searchName(){
				this.init();
				this.search();
			},
			//联盟经费的选择
			confirmFunds(e){
				console.log("你好,联盟经费变动前该用户的身份是"+e.currentTarget.dataset.identity);
				let that=this;
				that.$ajax({
					url:"/channelManagementRest/updateLinePayRatio",
					data:{
						linePayRatio:e.detail.value==1?150:80,
						marchantId: that.shopObj.merchantId,
						shopIdentity:e.currentTarget.dataset.identity
					},
					success(d){
						console.log(d)
						that.dataList[0].linePayRatio=d.linePayRatio
					}
				})
			},
			//级别的选择
			confirmLevel(e){
				this.levelIndex=e.detail.value;
			},
			statShow(msg){
				if(msg!=null){
					this.checkNote=msg
				}
				this.isShow=!this.isShow;
			},
			//查询
			search(){
				let that=this;
				console.log(that.shopObj)
				if(that.pageNo<=that.pageAll){
					console.log(5-that.levelIndex)
					that.$ajax({
						url:"/channelManagementRest/channelManagement",
						data:{
							ditchId:that.level[that.levelIndex].index,
							marchantId:that.shopObj.merchantId,
							pageNo:that.pageNo,
							name:that.searchContent,
							type:that.enterType
						},success(d){
							that.pageNo=that.pageNo*1+1;
							that.pageAll=d.totalPage;
							if(that.pageNo==2){
								that.dataList=d.lists||[];
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
			//上拉加载
			this.search()
		},
		onLoad(){
			var that=this;
			uni.getStorage({
				key:"shopObj",
				success(res){
					that.shopObj=JSON.parse(res.data);

					that.merchantId=that.shopObj.merchantId;
					console.log("你好,我获取的shopObj是"+that.shopObj)
					console.log("你好,我获取的mechardId是"+that.shopObj.merchantId);
					
					//1c2b3a
					if(that.shopObj.level==1){
						that.level=[{
								text:"全部直属",
								index:""
							},{
								text:"B(渠道商)",
								index:"3"
							},{
								text:"A(联盟商家)",
								index:"2"
							}]
					}else if(that.shopObj.level==2){
						that.level=[{
								text:"全部",
								index:""
							},{
								text:"A(联盟商家)",
								index:"2"
							}]
					}else if(that.shopObj.levelName="A"){
						that.level=[{
							index:""
						}]
					}else{
						that.level=[{
							index:""
						}]
					}
				}
			})
			that.search()
		},
		onNavigationBarButtonTap(e){
			if(this.shopObj.level==3){
				uni.showToast({
					title:"您当前的级别不够，请去升级",
					icon:"none"
				})
				return 
			}
			uni.navigateTo({
				url:"enter1?merchantId="+this.shopObj.merchantId
			})
		}
	}
</script>

<style scoped>
	.content{
		padding: 0;
		background: #f2f2f2;
	}
	.banner image{
		width:100%;
	}
	.shopInfo view .isFront{
		height:46upx;
	}
	.marginTop{
		margin-top: -52upx;
	}
	.nav{
		background: #fff;
		margin: 20upx 0;
		padding-left: 30upx;
		line-height: 90upx;
	}
	.modifyBtn{
		padding:5upx 15upx;
		background:#2D93FF;
		border-radius:5upx;
		margin-left:40upx;
		position:relative;
		top:8upx;
		color:#fff;
		font-size:26upx;
	}
	.nav>view{
		font-size: 30upx;
		margin-right: 30upx;
		display: inline-block;
	}
	.fixWidth{
		width:180upx;
		display: inline-block;
	}
	.subcomit{
		display: inline-block;
		width:114upx;
		line-height: 48upx;
		background: #EE3535;
		color:#fff;
		font-size: 22upx;
		padding: 0;
		vertical-align: middle;
		margin-left: 10upx;
		border-radius: 20upx;;
	}
	.nav view{
		border-bottom: 6upx solid transparent;
	}
	.nav view.active{
		color:#2D93FF;
		border-bottom-color: #2D93FF;
	}
	.search{
		padding: 0 15upx;
	}
	.search>view{
		display: inline-block;
		vertical-align: top;
	}
	.search picker{
		background: #fff;
		border:1px solid #eee;
		width:160upx;
		height: 60upx;
		margin-right: 20upx;
	}
	.search input{
		width:380upx;
		height:60upx;
		line-height: 60upx;
		padding-left: 10upx;
		margin-right: 10upx;
		background: #fff;
		font-size: 24upx;
		border:1px solid #eee;
	}
	.color{
		color:#EE3535;
	}
	.search text{
		display: inline-block;
		width: 100upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		background:#2D93FF;
		color:#fff;
		font-size: 24upx;
	}
	.item_list{
		background: #fff;
		margin-top: 25upx;
		padding-top: 24upx;
	    border-top:1px solid #eee;
		color:#333;
		font-size: 24upx;
	}
	.item_list>view{
		padding: 0 26upx 0 42upx;	
	}
	.shopInfo{
		margin-top: 20upx;
		border-bottom:1px solid #eee;
	}
	.shopInfo>view{
		vertical-align: top;
		display: inline-block;
	}
	.level{
		text-align: center;
		line-height: 60upx;
	}
	.level view{
		display: inline-block;
	}
	.shopInfo .logoImg{
		width:160upx;
		height:160upx;
		margin-right: 22upx;
	}
	.shopInfo image{
		width: 160upx;
		height:160upx;
		
	}
	.shopInfo>view>view{
		margin-bottom: 6upx;
	}
	.shopInfo>view>view text{
		margin-right: 10upx;
	}
	.edit{
		display: inline-block;
		width:78upx;
		height:48upx;
		line-height: 48upx;
		text-align: center;
		color:#fff;
		background: #2D93FF;
		border-radius: 50upx;
		margin-bottom: 20upx;
	}
	.item{
		line-height: 88upx;
		border-bottom: 1px solid #eee;
	}
	.item .marginLeft{
		margin-right: 10upx;
		margin-left: 20upx;
	}
	.search .level{
		width:100%;
		font-size: 24upx;
	}
	.buler{
		color:#007AFF;
		margin-right: 20upx;
	}
	.gear{
		color:#999;
	}
	.mode{
		width:614upx;
		
		border-radius: 20upx;
		background: #fff;
	}
	.mode .title{
		font-size: 30upx;
		color:#333;
		width: 100%;
		text-align: center;
		margin-top: 36upx;
		margin-bottom: 44upx;
		font-weight: 600;
	}
	.mode .box{
		padding: 0 30upx;
		line-height: 1.5;
	}
	.mode .foot{
		margin-top: 60upx;
		line-height: 94upx;
		background: #f4f4f4;
		width: 100%;
		text-align: center;
		color:#333;
		border-bottom-left-radius: 20upx;
		border-bottom-right-radius: 20upx;
		font-size: 36upx;
	}
</style>
