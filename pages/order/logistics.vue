<template>
	<view class="content">
		<view class="pro">
			<view class="proImg">
				<image :src="img"></image>
			</view>
			<view v-if="logusticsObj.state==3">
				<view>
					<text>已签收</text>
				</view>
				<view>
					<text>签收时间:{{logusticsObj.data[0].ftime}}</text>
				</view>
			</view>
		</view>
		<view class="info">
			<view class="list" v-for="(item,index) in logusticsObj.data" :key="index">
				<view class="date dateActive">{{item.ftime}}</view>
				<view class="nextIcon">
					<view class="showIcon" :class="{showIconAct:index==0}"></view>
					<view class="line"></view>
				</view>
				<view class="detailInfo " :class="{detailInfoAct:index==0}">
					<view>{{item.context}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var that=this;
	export default{
		data(){
			return{
				logState:["在途中","已揽收","疑难","已签收","退签","同城派送中","退回","转单"],
				expressName:"",
				expressNo:"",
				img:"",
				logusticsObj:{}
			}
		},
		onLoad(e){
			that=this;
			that.img=e.img;
			that.expressName=e.expressName;
			that.expressNo=e.expressNo;
			
		},
		onShow(){
			//let that=this;
			that.$ajax({
				url:"/order/showDelivery",
				data:{
					com:that.expressName,
					nu:that.expressNo
				},
				success(d){
					that.logusticsObj=JSON.parse(d);
					console.log(that.logusticsObj)
				}
			})
		}
	}
</script>

<style scoped>
	.content{
		padding: 0;
		background: #f2f2f2;
	}
	.pro{
		background: #fff;
		padding: 30upx;
	}
	.pro>view{
		vertical-align: text-top;
		display: inline-block;
	}
	.pro image{
		border:1px solid #eee;
		margin-right:10upx;
		width:85upx;
		height:85upx;
	}

	.info {
		margin-top: 40upx;
		padding:45upx 32upx;
		box-sizing:border-box;
		background: #fff;
	}
	.info .list {
		display:flex;
		margin-bottom:70upx;
	}
	.info .list .date {
		width:90upx;
		font-size: 26upx;
		color:#999;
		text-align:center
	}
	.info .list .date text {
		display:inline-block;
		font-size:22upx;
		margin-top:22upx;
	}
	.info .list .dateActive {
		color:#24b161
	}
	.info .list .nextIcon {
		position:relative;
		width:80upx;
		text-align: center
	}
	.info .list .nextIcon .line {
		position:absolute;
		top:50upx;
		left:40upx;
		width:1px;
		height:130upx;
		border-left:1px dotted #e9e7e7
	}
	 .info .list .nextIcon .showIcon {
		margin:20upx auto 0;
		width:28upx;
		height:28upx;
		background:url('http://www.hnlxyj.com/wx/image/my/nextIcont.png')no-repeat center center;
		background-size:cover;
	}
	.info .list .nextIcon .showIconAct {
		margin:20upx auto 0;
		width:28upx;
		height:28upx;
		background:url('http://www.hnlxyj.com/wx/image/my/nextIconAct.png')no-repeat center center;
		background-size:cover;
	}
	.info .list .detailInfo {
		width:471upx;
		min-height:48upx;
		font-size:28upx;
		color:#999;
	}
	.info .list .detailInfoAct {
		color:#24b161;
	}
	.info .list .detailInfo p {
		font-size:22upx;
		line-height:24upx;
		margin-top:17upx;
	}
	.info .list .detailInfo p .tel {
		color:#ffa018
	}
</style>
