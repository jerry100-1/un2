<template>
	<view class="content">
		<view class="a">
			<view class="banner">
				<swiper class="swiper"  autoplay indicator-dots="true">
					<swiper-item v-for="(i,index) in proImgs" :key="index">
						<view class="swiper-item uni-bg-red">
							<image :src="i.originalmedia" mode="widthFix"></image>
						</view>
					</swiper-item>
					
				</swiper>
			</view>
			<view class="proInfo" v-if="proObj.shopProduct">
				<view>
					<text class="color">￥{{proObj.shopProduct.productmminmoney||0}}</text>
					<text class="agoramoney">￥{{proObj.shopProduct.agoramoney||0}}</text>
					<view class="r">
						<image src="../../static/dou.png" mode=""></image>
						<text>购买预获 <text class="color">{{proObj.timeBean||0}}</text> 时光豆</text>
					</view>
					<view class="title">
						<view class="h5">{{proObj.shopProduct.productname}}</view>
						<view class="r share">
							<image src="../../static/pro/pro_icon3.png"></image>
							<text>分享</text>
						</view>
					</view>
						<view class="add1" style="">新增分享的佣金12元</view>		
						</view>
				
					<view class="foot">
						<view>新增快递:10元</view>
						<view>
							月销  {{proObj.monthSales||0}}
						</view>
						<view>
							{{proObj.productLess.produceprovince||""}}{{proObj.productLess.producecity||""}}
						</view>
					</view>
				</view>
				
			</view>
			<view class="list" >
				<text>优惠</text>
				<text class="add2">店铺优惠券</text>
				<view class="r">
					<text>领券</text>
					<uni-icon type="arrowright" size="16"></uni-icon>
				</view>
			</view>
			<view class="list">
				<text>选择</text>
				<view class="r">
					<text>数量</text>
					<uni-icon type="arrowright" size="16"></uni-icon>
				</view>
			</view>
			<view class="assess">
				<view class="list">
					<text>商品评价({{proObj.evaluationSum}})</text>
					<view class="r color">
						<text>查看全部</text>
						<uni-icon type="arrowright" size="16"></uni-icon>
					</view>
				</view>
				
				<view v-if="proObj.evaluationList">
					<view v-for='(item,index) in proObj.evaluationList' :key="index">
						<view>
							<image :src="item.userHead"></image>
							<text class="userName">{{item.mName}}</text>
							<uni-rate disabled="true" v-model="item.description" size="18"></uni-rate>
						</view>
						<view class="box">
							<text>{{item.descContent}}</text>
						</view>
					</view>
					
				</view>
			</view>
			<view class="detailInfo">
				<view class="list">商品详情</view>
				<view class="box" v-if="proObj.productLess">
					<u-parse :content="proObj.productLess.productdescribe" />
				</view>
				
			</view>
		</view>
	</view>
	
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import uniRate from "@/components/uni-rate/uni-rate.vue" 
	export default {
	    components: {uniIcon,uParse,uniRate},
		data(){
			return{
				proObj:{},
				proImgs:[],
				proId:"",
				shopObj:{},
				marchantId:"",
			}
		},
		onLoad(e){
			console.log("你好,预览页面得到的productId是"+e.productId);
			this.proId=e.productId;
			let that=this;
			uni.getStorage({
				key:"shopObj",
				success(res){
					console.log(res)
					that.shopObj=JSON.parse(res.data);
					that.merchantId=that.shopObj.merchantId;
					console.log("你好,我获取的shopObj是"+that.shopObj)
					console.log("你好,我获取的mechardId是"+that.shopObj.merchantId);
					console.log(that.shopObj)
					if (!that.shopObj.shopId) {
						uni.showModal({
							title: '未登录',
							content: '登录失效，需要登录后才能继续',
							/**
							 * 如果需要强制登录，不显示取消按钮
							 */
							showCancel: !that.forcedLogin,
							success: (res) => {
								if (res.confirm) {
									// /**
									//  * 如果需要强制登录，使用reLaunch方式
									//  */
									if (that.forcedLogin) {
										uni.reLaunch({
											url: '../login/login'
										});
									} else {
										uni.reLaunch({
											url: '../login/login'
										});
									}
								}
							}
						});
					}
				}
			})	
			
			
			
			
			
		
		},
		onShow(){
			let that=this;
			this.$ajax({
				url:"/shopProduct/selectProductDetails",
				method:"POST",
				data:{
					productId:that.proId,
					shopId:that.shopObj.shopId,
					pageNo:1,
					type:1,
				},
				success(d){
					that.proImgs=[{originalmedia:d.shopProduct.originalimg}]
					let arr=that.proImgs;
		
					that.proImgs=arr.concat(d.productMedia||[])
					console.log("这是预览页面的数据信息----");
					console.log(d);
					that.proObj=d
					//console.log("909090"+that.proObj.productLess.productdescribe);
					console.log("9090909"+d.shopProduct.originalimg);
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.content{
		background: #f2f2f2;
		padding: 0;
	}
	.a{
		padding-bottom: 120upx;
	}
	.uni-rate{
		display: inline-block;
		vertical-align: middle;
		margin-left: 10upx;
	}
	.add1{
		background:#ee3535;
		padding:12upx 20upx;
		max-width:240upx;
		font-size:24upx;
		color:#fff;
		border-radius:30upx;
		width:auto;
		margin-top:20upx;
		margin-bottom:20upx;
		text-align:center;
	}
	.add2{
		width:140upx;
		height:30upx;
		background:#ee3535;
		color:#fff;
		padding:4upx 20upx;
		border-radius:20upx;
		margin-left:20upx;
		font-size:20upx;
	}
	.swiper{
		height:750upx !important;
	}
	.swiper-item image{
		width:100%;
	}
	.agoramoney{
		font-size: 24upx;
		color:#999;
		text-decoration:line-through
	}
	.proInfo{
		background: #fff;
		padding: 30upx;
		font-size: 32upx;
		color:#333;
		margin-bottom: 20upx;
		.foot{
			display: flex;
			view{
				flex:1;
				font-size: 24upx;
			}
		}
		image{
			width:48upx;
			height:48upx;
			vertical-align: middle;
			margin-right: 10upx;
		}
		.h5{
			margin-top: 20upx;
			width: 580upx;
			font-weight: 600;
			display: inline-block;
			color: #1a1a1a;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.title{
			position:relative;
		}
	}
	.color{
		color:#EE3535;
	}
	.share{
		width:110upx;
		height:48upx;
		line-height:48upx;
		font-size:22upx;
		background:#f4f4f4;
		color:#999;
		border-top-left-radius:100upx;
		border-bottom-left-radius:100upx;
		padding:0 0 0 10upx;
		position:absolute;
		top:0;
		right:-30upx;
		image{
			width:40upx;
			height:40upx;
			vertical-align: middle;
		}
	}
	.list{
		line-height: 88upx;
		margin-bottom: 20upx;
		padding:0 30upx;
		background: #fff;
		font-size: 28upx;
		color:#999;
	}
	.assess{
		font-size: 32upx;
		color:#333;
		background: #fff;
		>view{
			padding: 0 30upx;
		}
		image{
			width:42upx;
			height:42upx;
			border:1px solid #eee;
			margin-right: 10upx;
			border-radius: 50%;
			vertical-align: middle;
		}
		.box{
			margin-top: 10upx;
			padding-bottom: 30upx;
			font-size: 28upx;
		}
		.userName{
			color:#999;
			font-size: 28upx;
		}
	}
	.detailInfo{
		margin-top: 20upx;
		.list{
			text-align: center;
			color:#333;
			padding: 0;
		}
		.box{
			width:690upx;
			padding: 0 30upx;
			*{
				width:100%;
			}
		}
		image{
			float: left;
		}
	}
	.footer{
		background: #fff;
		height:100upx;
		position: fixed;
		width:100%;
		bottom: 0;
		box-sizing: border-box;
		view{
			display: inline-block;
			vertical-align: text-top;
		}
		image{
			width:40upx;
			display: block;
			height:40upx;
			margin: 0 auto;
		}
		.icon{
			text-align: center;
			width: 310upx;
			background: #fff;
			box-sizing: border-box;
			height: 100upx;
		    padding: 20upx;
			>view{
				display: flex;
				view{
					flex:1;
					text-align: center;
					font-size: 22upx;
					margin-right: 20upx;
				}
			}
		}
		.add{
			line-height: 100upx;
			width: 220upx;
			color: #fff;
			font-size: 28upx;
			background: #f90;
			text-align: center;
		}
		.down{
			width:220upx;
			background: #EE3535;
			color:#fff;
			line-height:100upx;
			text-align: center;
			font-size: 28upx;
		}
	}
	.box image{
		float:left;
	}
</style>
