<template>
	<view class="content">
		<view v-if="assessInfo">
			<view class="list">
				<view>
					<image :src="img"></image>
				</view>
				<view>
					<uni-rate disabled="true" v-model="assessInfo.description" color="#eee" active-color='#ee3535'></uni-rate>
				</view>
				<view class="r">{{assessInfo.description<2?"差":assessInfo.description==2?'一般':assessInfo.description?"好":"非常好"}}</view>
			</view>
			<view class="list">
				<image src="http://www.hnlxyj.com/wx/image/my/my_logistics@2x.png"></image>
				<view>
					<uni-rate disabled="true" v-model="assessInfo.logistics"  color="#eee" active-color='#ee3535'></uni-rate>
				</view>
				<view class="r">{{assessInfo.logistics<2?"差":assessInfo.logistics==2?'一般':assessInfo.logistics?"好":"非常好"}}</view>
			</view>
			<view class="list">
				<image src="http://www.hnlxyj.com/wx2/image/my/server.png"></image>
				<view>
					<uni-rate disabled="true" v-model="assessInfo.service" color="#eee"  active-color='#ee3535'></uni-rate>
				</view>
				<view class="r">{{assessInfo.service<2?"差":assessInfo.service==2?'一般':assessInfo.service?"好":"非常好"}}</view>
			</view>
			<view>
				<view>用户评价:</view>
				<text>{{assessInfo.descContent}}</text>
			</view>
			<view class="img">
				<image :src="item" v-for="(item,index) in assessInfo.imgs" :key="index"></image>
				<view class="btn" @tap="isShowChange" v-if="assessInfo.replyStatus==1">回复</view>
			</view>
			<view v-if="assessInfo.replyStatus!=1" class="reply">
				<view>商家回复:</view>
				{{assessInfo.reply}}
			</view>
			<uni-popup :show="isShow" position="middle" mode="fixed">
				<view class="mode">
					
					<view class="text">
						<textarea v-model="assessBox" placeholder="评论回复" />
					</view>
					<view class="btns">
						<view @tap="isShowChange">取消</view>
						<view class="color" @tap="ok">确定</view>
					</view>
				</view>
			</uni-popup>
		</view>
		
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		components: {uniRate,uniPopup},
		data(){
			return{
				id:0,
				isShow:false,
				assessBox:"",
				assessInfo:"",
				img:"",
				shopObj:"",
			}
		},
		methods:{
			isShowChange(){
				this.isShow=!this.isShow;
				this.assessBox="";
			},
			ok(){
				let that=this;
				if(that.assessBox){
					this.$ajax({
						url:"/memberManager/memberManagerCommentReply",
						method:"POST",
						data:{
							evalId: that.assessInfo.evalId,
							reply: that.assessBox,
							shopId: that.shopObj.shopId
						},
						success(d){
							that.assessInfo.reply=that.assessBox;
							that.isShow=!that.isShow;
							that.assessInfo.replyStatus=2
						}
					})
				}else{
					uni.showToast({
						title:"请输入要回复的内容",
						icon:"none"
					})
				}
			}
		},
		onLoad(e){
			let that=this;
			that.id=e.id;
			that.img=e.img;
			uni.getStorage({
				key:"shopObj",
				success(res){
					that.shopObj=JSON.parse(res.data);
				}
			})
			that.$ajax({
				url:"/order/showOrderEvaluate",
				data:{
					orderLineId:e.id
				},success(d){
					
					if(d&&d.imgs){
						d.imgs=d.imgs.split(",")
					}
					that.assessInfo=d;
				}
			})
		}
	}
</script>

<style scoped>
	.content{
		padding: 0;
	}
	.content>view>view{
		padding: 30upx;
	}
	.content .list{
		height:114upx;
		line-height: 114upx;
		border-bottom:1px solid #eee;
		padding: 0 30upx;
	}
	.list>view{
		display: inline-block;
		vertical-align: middle;
	}
	.reply{
		border-top:1px solid #eee;
	}
	.list image{
		vertical-align: middle;
		width:60upx;
		height:60upx;
		margin-right: 32upx;
	}
	.list .r{
		color:#999;
		font-size: 30upx;
	}
	.img .btn{
		display: inline-block;
		width: 106upx;
		height: 48upx;
		line-height: 48upx;
		font-size: 24upx;
		color: #fff;
		display: inline-block;
		-webkit-border-radius:50upx;
		border-radius:50upx;
		background: #007aff;
		text-align: center;
	}
	.img image{
		border:1px solid #eee;
		width:160upx;
		height:160upx;
		margin: 40upx 20upx 0 0;
	}
	.mode{
		width:543upx;
		height:456upx;
		overflow: hidden;
		border-radius: 30upx;
		background: #fff;
	}
	.text{
		width: 543upx;
		padding: 30upx;
		box-sizing: border-box;
	}
	textarea{
		width:100%;
		border-bottom: 1px solid #eee;
	}
	.btns{
		background: #f4f4f4;
		line-height: 94upx;
	}
	.btns>view{
		display: inline-block;
		width:271upx;
		text-align: center;
		color:#333;
		font-size: 36upx;
	}
	.mode .color{
		color:#EE3535;
		border-left:1px solid #ddd;
	}
</style>
