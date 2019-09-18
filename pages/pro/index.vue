<template>
	<view class="content">
		<view class="top">
			<view :class="{active:type==1}" @tap="init(1)">全部商品</view>
			<view :class="{active:type==2}" @tap="init(2)">待审核商品</view>
			<view :class="{active:type==3}" @tap="init(3)">未通过商品</view>
		</view>
		<view class="box">
			<view class="list" v-if="proList&&proList.length>0">
				<view class="item_list" v-for="item in proList" :key="item.productId">
					<view class="info">
						<view class="proImg">
							<image :src="item.productImg"></image>
						</view>
						<view class="right">
							<view class="h5">{{item.productName}}</view>
							<view class="color price">¥{{item.productMinMoney}} <text class="r" @tap="seeReason(item.productNote)" >{{statusArr[item.isOnSale]}}</text></view>
							<view class="boxInfo">
								<view>
									<view class="left">
										<text>30日销量</text>
										<text class="color">{{item.productMonthSaleSum}}</text>
									</view>
									<view>
										<text>30日成交额</text>
										<text class="color">{{item.productMonthMoneySum}}</text>
									</view>
								</view>
								<view>
									<view class="left left2">
										<text>库存</text>
										<text class="color">{{item.sumStock}}</text>
									</view>
									<view class="right2" style="text-overflow:ellipsis;white-space:nowrap;">
										<text style="position:relative;left:40upx;">上架日期</text>
										<text style="position:relative;left:40upx;" class="color">{{item.createdTime.substr(0,10)}}</text>
									</view>
								</view>
								
								<view>
									<view class="left left2">
										<text></text>
									<!-- 	<text class="color">{{item.payMent==1?"联盟支付":"普通支付"}}</text> -->
									<text class="color">{{item.payMent==1?"联盟支付":"普通支付"}}</text>
									<text>{{item.productRatio}}%</text>
									
									</view>
									<view class="right2">
										<text style="position:relative;left:40upx;">分享佣金</text>
										<text class="color" style="position:relative;left:40upx;">{{item.commissionRatio}}%</text>
									</view>
								</view>
								
								
								
							</view>
						</view>
					</view>
					<view class="foot">
						<view @tap="seePro(item.productId)" v-if="item.isOnSale<5">
							<image src="../../static/pro/pro_icon1.png" class="size1"></image>
							<text>预览</text>
						</view>
						<view v-else>
							<image src="../../static/pro/pro_icon1-1.png" class="size1"></image>
							<text>隐藏</text>
						</view>
						<view @tap="edit(item.productId)">
							<image src="../../static/pro/pro_icon2.png" class="size2"></image>
							<text>编辑</text>
						</view>
						<view @tap="isSalesChange(item.productId,item.productMonthSaleSum)"  v-if="item.isOnSale==1">
							<image src="../../static/pro/pro_icon9.png" class="size2"></image>
							<text>销量</text>
						</view>
						<view @tap="hidePopup(item.productId)" v-if="item.isOnSale==1">
							<image src="../../static/pro/pro_icon3.png" class="size3"></image>
							<text>分享</text>
						</view>
						<!-- 不能分享 -->
						<view v-if="item.isOnSale==4||item.isOnSale==6">
							<image src="../../static/pro/pro_icon3-1.png" class="size3"></image>
							<text>分享</text>
						</view>
						<view @tap="stock(item.productId)" v-if="item.isOnSale==3">
							<image src="../../static/pro/pro_icon6.png" class="size6"></image>
							<text>补货</text>
						</view>
						
						<view  @tap="delStateChange(1,item.productId,item.isOnSale)" v-if="item.isOnSale==2||item.isOnSale==5">
							<image src="../../static/pro/pro_icon7.png" class="size5"></image>
							<text>撤销</text>
						</view>
						<view v-if="item.isOnSale==3||item.isOnSale==1" @tap="proStatusFun(item.isOnSale,item.productId)">
							<image src="../../static/pro/pro_icon4.png" class="size4"></image>
							<text>下架</text>
						</view>
						<view v-if="item.isOnSale==4" @tap="proStatusFun(item.isOnSale,item.productId)">
							<image src="../../static/pro/pro_icon4-1.png" class="size4"></image>
							<text>上架</text>
						</view>
						<view  @tap="delStateChange(2,item.productId,item.isOnSale)" v-if="item.isOnSale==2||item.isOnSale==5">
							<image src="../../static/pro/pro_icon8.png" class="size4"></image>
							<text>删除</text>
						</view>
						<view v-if="item.isOnSale==6" @tap="proStatusFun(item.isOnSale,item.productId)">
							<image src="../../static/pro/pro_icon5.png" class="size6"></image>
							<text>提交</text>
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
		<!-- 撤销，删除 -->
		<uni-popup :show="delIsShow" position="middle" mode="fixed">
			<view class="mode">
				<view class="modeBox">
					<text class="title">{{delState==1?'确定要撤销此商品吗?':'确定要删除此商品吗?'}} </text>
				</view>
				<view class="btns">
					<text @tap="delStateChange">取消</text>
					<text class="color" @tap="commit">{{delState==1?'确定':'删除'}}</text>
				</view>
			</view>
		</uni-popup>
		<!-- 查看原因 -->
		<uni-popup :show="isReason" position="middle" mode="fixed">
			<view class="mode">
				<view class="modeBoxs">
					<text class="titles">{{Reason}} </text>
				</view>
				<view class="btns">
					<text @tap="seeReason('原因')" class="btn">取消</text>
				</view>
			</view>
		</uni-popup>
		<!-- 修改库存 -->
		<uni-popup :show="stockShow" position="middle" mode="fixed">
			<view class="mode">
				<view class="modeBox">
					<text>库存</text>
					<input type="number" v-model="stockNum" placeholder="新增库存数量"/>
				</view>
				<view class="btns">
					<text @tap="stock">取消</text>
					<text class="color" @tap="commitStock">确定</text>
				</view>
			</view>
		</uni-popup>
		<!-- 海报 -->
		<uni-popup :show="shareShow" position="middle" mode="fixed">
			<view class="shareMode">
				<image src="../../static/capital/address.jpg" mode="widthFix"></image>
				<view>
					<view class="h5">花花公子男鞋2018秋冬季潮鞋aj1板鞋韩版男士鞋韩版男士运动休闲鞋</view>
					<view>
						<text class="price">
							￥199
						</text>
						<view class="r">
							<text>预送 <text class="price">209</text>时光豆</text>
						</view>
					</view>
					<view class="shopInfo">
						<image src="../../static/bank.png" class="shopLogo"></image>
						<text>女鞋·全球购</text>
						<image src="../../static/bank.png" class="qrcode r"></image>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 分享 -->
		<uni-popup :show="showPopupBottomShare" position="bottom">
			<view class="shareMode">
				<view class="bottom-content">
					<view class="bottom-content-box" v-for="(item, index) in bottomData" :key="index" @tap="shareFun" :data-index="index">
						<view class="bottom-content-image">
							<image :src="item.src"></image>
						</view>
						<view class="bottom-content-text">{{ item.text }}</view>
					</view>
				</view>
				<view class="bottom-btn" @click="hidePopup">取消分享</view>
			</view>
		</uni-popup>
		<!-- 销量 -->
		<uni-popup :show="isSales" position="middle" mode="fixed">
			<view class="mode">
				<view class="title">
					销量修改
				</view>
				<view class="modeBoxs">
					<text class="title">30日内销量: {{productMonthSaleSum||0}}</text>
					<view>
						<text>新增月销量:</text>
						<input type="number" v-model="selesNum">
					</view>
				</view>
				<view class="btns">
					<text @tap="isSalesChange">取消</text>
					<text class="color" @tap="sales">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

	
<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		components: {uniLoadMore,uniPopup},
		data(){
			return{
				shopObj:{},
				isReason:false,
				Reason:"",//原因
				isSales:false,//修改销量的显示和隐藏
				reason:"",//驳回原因
				selesNum:"",//新增月销量
				type:1,//1查询全部商品,2代审核,3未通过
				status:"loading",
				delState:1,//1为撤销，2为删除
				delIsShow:false,//撤销,删除弹框的显示
				stockShow:false,//库存弹框的显示
				stockNum:"",//库存数量
				shareShow:false,//分享
				statusArr:["","出售中","待审核","已售罄","已下架","查看原因","已撤销"],//商品状态
				showPopupBottomShare:false,
				proList:[],
				proStatus:"",//商品状态
				bottomData:[
					{
						src:"../../static/shareImg/info_weibo@2x.png",
						text:"微博"
					},
					{
						src:"../../static/shareImg/info_wechat@2x.png",
						text:"微信"
					},
					{
						src:"../../static/shareImg/info_friends@2x.png",
						text:"朋友圈"
					}
					// {
					// 	src:"../../static/shareImg/info_qq@2x.png",
					// 	text:"QQ"
					// },
					// {
					// 	src:"../../static/shareImg/info_qqzone@2x.png",
					// 	text:"QQ空间"
					// }
				],
				pageNo:1,
				proId:"",//操作的商品id
				pageAll:2,
				productMonthSaleSum:""
			}
		},
		methods:{
			//查看原因
			seeReason(productNote){
				console.log(productNote)
				if(productNote){
					let that=this;
					that.isReason=!that.isReason;
					that.Reason=productNote;
				}
				
			},
			//修改销量的的显示
			isSalesChange(id,num){
				this.selesNum="";
				if(id){
					this.productMonthSaleSum=num
					this.proId=id;
				}else{
					this.proId="";
				}
				this.isSales=!this.isSales;
			},
			//销量的修改
			sales(){
				let that=this;
				if(that.selesNum){
					that.$ajax({
						url:"/shopProduct/updateShopProductIsOnSale",
						data:{
							isOnSale:7,
							productId:that.proId,
							shopId:that.shopObj.shopId,
							sumStock:that.selesNum
						},success(d){
							that.isSales=!that.isSales;
							
							uni.showToast({
								title:"修改成功",
								icon:"none"
							})
						}
					})
				}else{
					uni.showToast({
						title:"请输入要修改的月销量",
						icon:none,
					})
				}
			},
			//撤销，删除弹框的显示
			delStateChange(index,id,status){
				this.delState=index;
				this.proId=id;
				this.proStatus=status;
				this.delIsShow=!this.delIsShow;
			},
			//库存弹框的显示
			stock(id){
				this.proId=id;
				this.stockShow=!this.stockShow
			},
			//分享隐藏
			hidePopup(index){
				this.showPopupBottomShare=!this.showPopupBottomShare;
				if(index){
					this.proId=index
				}
			},
			//预览
			seePro(index){
				uni.navigateTo({
					url:"/pages/pro/proSee?productId="+index
				})
			},
			//分享
			shareFun(e){
				let that=this;
				var index=e.currentTarget.dataset.index*1;
				let img="";
				let title="";
				let summary="";
				let href="http://www.hnlxyj.com/wx/html/mall/details.html?id="+that.proId;
				for(let i in that.proList){
					if(that.proId==that.proList[i].productId){
						img=that.proList[i].productImg;
						summary=that.proList[i].productName;
						break;
					}
				}
				switch(index){
					case 0:
						//微博
						uni.share({
							provider: "sinaweibo",
							type: 0,
							href: href||"",
							title: title||"",
							summary: summary||"",
							imageUrl: img||"",
							success: function (res) {
								console.log("success:" + JSON.stringify(res));
							},
							fail: function (err) {
								uni.showToast({
									title:"请安装微博后再分享",
									icon:"none"
								})
								console.log("fail:" + JSON.stringify(err));
							}
						});
						break;
					case 1:
						//微信
						uni.share({
							provider: "weixin",
							scene: "WXSceneSession",
							type: 0,
							href: href||"",
							title: title||"",
							summary: summary||"",
							imageUrl: img||"",
							success: function (res) {
								console.log("success:" + JSON.stringify(res));
							},
							fail: function (err) {
								uni.showToast({
									title:"请安装微信后再分享",
									icon:"none"
								})
								console.log("fail:" + JSON.stringify(err));
							}
						});
						break;
					case 2:
						//朋友圈
						uni.share({
							provider: "weixin",
							scene: "WXSenceTimeline",
							type: 0,
							href: href,
							title: title,
							summary: summary,
							imageUrl: img,
							success: function (res) {
								console.log("success:" + JSON.stringify(res));
							},
							fail: function (err) {
								uni.showToast({
									title:"请安装微信后再分享",
									icon:"none"
								})
								console.log("fail:" + JSON.stringify(err));
							}
						});
						break;
					case 3:
						//QQ
						uni.share({
							provider: "qq",
							type: 3,
							href: href,
							title: title,
							summary: summary,
							imageUrl: img,
							success: function (res) {
								console.log("success:" + JSON.stringify(res));
							},
							fail: function (err) {
								console.log("fail:" + JSON.stringify(err));
							}
						});
						break;
					case 4:
						//QQ空间
						uni.share({
							provider: "qq",
							type: 3,
							href: href,
							title: title,
							summary: summary,
							imageUrl: img,
							success: function (res) {
								console.log("success:" + JSON.stringify(res));
							},
							fail: function (err) {
								console.log("fail:" + JSON.stringify(err));
							}
						});
						break;
				}
			},
			commit(){
				let that=this;
				//1撤销，2删除弹框的显示
				if(that.delState==1){
					that.proStatusFun(that.proStatus,that.proId);
					this.delIsShow=!this.delIsShow;
				}else{
					that.$ajax({
						url:"/shopProduct/deleteShopduct",
						method:"POST",
						data:{
							productId:that.proId
						},success(d){
							that.delIsShow=!that.delIsShow;
							for(let i in that.proList){
								if(that.proId==that.proList[i].productId){
									 that.proList.splice(i, 1);
									 break;
								}
							}
							uni.showToast({
								title:"删除成功",
								icon:"none"
							})
						}
						
					})
				}
			},
			//商品状态的修改
			proStatusFun(index,proId){
				let that=this;
				this.$ajax({
					url:"/shopProduct/updateShopProductIsOnSale",
					method:"POST",
					data:{
						isOnSale:index,
						productId:proId,
						shopId:that.shopObj.shopId
					},
					success(d){
						for(let i in that.proList){
							if(proId==that.proList[i].productId){
								that.proList[i].isOnSale=d.isOnSale
							}
						}
					}
				})
			},
			commitStock(){
				//库存提交
				let that=this;
				this.stockShow=!this.stockShow
				this.$ajax({
					url:"/shopProduct/updateShopProductsumStock",
					method:"POST",
					data:{
						productId:that.proId,
						sumStock:that.stockNum
					},success(d){
						for(let i in that.proList){
							if(that.proId==that.proList[i].productId){
								that.proList[i].sumStock=d.sumStock;
								that.proList[i].isOnSale=d.isOnSale;
								return false;
							}
						}
					}
				})
			},
			init(index){
				this.type=index;
				this.pageNo=1;
				this.pageAll=2;
				this.status="loading";
				this.search()
			},
			//查询数据
			search(){
				let that=this;
				if(that.pageNo<=that.pageAll){
					this.$ajax({
						url:"/shopProduct/selectShopProduct",
						method:"POST",
						data:{
							shopId:that.shopObj.shopId,
							type:that.type,
							pageNo:that.pageNo
						},
						success(d){
							that.pageNo=that.pageNo*1+1;
							that.pageAll=d.totalPage;
							if(that.pageNo==2){
								that.proList=d.lists||[]
							}else{
								let arr=that.proList;
								that.proList=that.proList.concat(d.lists)
							}
							if(that.pageNo>that.pageAll){
								that.status="noMore"
							}
						},
					})
				}	
			},
			//编辑商品
			edit(index){
				uni.navigateTo({
					url:"/pages/pro/proAdd?proId="+index
				})
			}
		},
		//下拉加载
		onReachBottom(){
			this.search()
		},
		onLoad(){
			let that=this;
			uni.getStorage({
				key:"shopObj",
				success(res){
					that.shopObj=JSON.parse(res.data);
				}
			})
		},
		onShow(){
			this.init(1);
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url:"/pages/pro/proAdd"
			})
		}
	}
</script>

<style scoped>
	.content{
		background: #f2f2f2;
		padding: 0;
	}
	.top{
		position: fixed;
		width:100%;
		height:86upx;
		line-height: 86upx;
		background: #fff;
		padding: 0 30upx;
		z-index: 100000;
	}
	.top>view{
		display: inline-block;
		margin-right: 40upx;
		border-bottom:4upx solid transparent;
	}
	.top>view.active{
		color:#2D93FF;
		border-bottom-color:#2D93FF;
	}
	.box{
		margin-top: 106upx;
	}
	.mode>.title{
		width:100%;
		text-align: center;
		font-size: 28upx;
		margin-top: 30upx;
	}
	.modeBoxs{
		font-size: 24upx;
		padding: 30upx;
	}
	.modeBoxs>view{
		margin-top: 20upx;
		vertical-align: text-top;
	}
	.modeBoxs>view input{
		vertical-align: middle;
	}
	.item_list{
		background: #fff;
		margin-bottom: 20upx;
	}
	.item_list 	.info{
		padding: 30upx;
	}
	.proImg image{
		width:164upx;
		height:164upx;
	}
	.foot{
		border-top:1px solid #eee;
		display: flex;
		padding: 20upx 0;
	}
	.foot>view{
		text-align: center;
		flex:1;
		color:#333;
	}
	.foot image{
		display: block;
		margin: 0 auto;
	}
	.info>view{
		vertical-align: text-top;
		font-size: 24upx;
		margin-left:20upx;
		display: inline-block;
	}
	.right{
		width: 478upx;
	}
	.h5{
		display:-webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical;
		overflow:hidden;
		text-overflow:ellipsis;
		height:70upx;
		font-size: 26upx;
	}
	.color{
		color:#EE3535;
	}
	.price{
		margin: 5upx 0;
	}
	.boxInfo>view{
		margin-bottom: 5upx;
	}
	.boxInfo .color{
		margin-left: 5upx;
	}
	.boxInfo>view>view{
		display: inline-block;
	}
	.boxInfo .left{
		width:200upx;
/* 		background: #00BFFF; */
	}
	.left2{
		float:left;
		width:150upx!important;
		display:inline-block;
	}
	.right2{
		width:320upx;
		float:right;	
		display:inline-block;
/* 		background: pink; */
	}
	.item_list .gray{
		color:#999;
	}
	/*预览*/
	.size1{
		width:43upx;
		height:28upx;
	}
	/*编辑*/
	.size2{
		width:26upx;
		height:26upx;
	}
	/*分享,提交*/
	.size3{
		width:27upx;
		height: 28upx;
	}
	/*下架,上架*/
	.size4{
		width:29upx;
		height:28upx;
	}
	/*不分享*/
	.size5{
		width:29upx;
		height: 29upx;
	}
	/*补货*/
	.size6{
		width:26upx;
		height:28upx;
	}
	.mode{
		width:616upx;
		background: #fff;
		font-size: 36upx;
		color:#333;
		overflow: hidden;
		border-radius: 20upx;
	}
	.mode input{
		display: inline-block;
		width:400upx;
		border-bottom: 1px solid #eee;
		text-align: left;
		vertical-align: text-top;
		margin-left: 10upx;
		font-size: 26upx;
	}
	.modeBox{
		text-align: center;
		line-height: 202upx;
		height:202upx;
	}
	.modeBoxs .titles{
		display: inline-block;
		width:100%;
		text-align: center;
	}

	.btns{
		line-height: 94upx;
		background: #f4f4f4;
	}
	.btns text{
		display: inline-block;
		width:306upx;
		text-align: center;
	}

	.btns .btn{
		width:100%;
		text-align: center;
	}



	.btns .color{
		border-left:1px solid #ddd;
		color:#ee3535;
	}
	.shareMode{
		width:548upx;
		color:#999;
		overflow: hidden;
		background: #fff;
		border-radius: 20upx;
	}
	.shareMode>view{
		padding: 30upx;
		padding-bottom: 0;
	}
	.shareMode>view>view{
		margin-bottom: 10upx;
	}
	.shareMode>image{
		width:548upx;
	}
	.shareMode .price{
		color:#ee3535;
	}
	.shopLogo{
		width:82upx;
		height:82upx;
		vertical-align: middle;
		border:1px solid #eee;
	}
	.shopInfo{
		padding-left: 20upx;
		background:#f8f8f8;
		height:124upx;
		color:#333;
	}
	.shopInfo text{
		margin-top: 16upx;
		margin-left: 20upx;
		display: inline-block;
	}
	.bottom-content-image{
		height:100upx;
	}
	.qrcode{
		border:1px solid #eee;
		width:120upx;
		height:120upx;
	}
	.shareMode{
		border-radius: 0;
		width:100%;
		background: #fff;
	}
	.shareMode image{
		width:91upx;
		height:91upx;
		margin: 0 auto;
	}
	.bottom-content{
		display: flex;
	}
	.bottom-content>view{
		flex:1;
		text-align: center;
	}
	.bottom-btn{
		background: #f9f9f9;
		color:#333;
	}
</style>
