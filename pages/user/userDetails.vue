
<template>
	<view class="content">
		<view class="list">
			<view>
				<text>时光豆可用量:</text>
				<text class="color">{{dataObj.timeMoney||"0"}}</text>
			</view>
			<view>
				<text>时光豆消费量:</text>
				<text class="color">{{dataObj.useTimeMoney||"0"}}</text>
			</view>
			<view>
				<text>爱心值总量:</text>
				<text class="color">{{dataObj.loveValue||"0"}}</text>
			</view>
		</view>
		<view class="list">
			<view>
				<text>联盟消费金额:</text>
				<text class="color">{{dataObj.allianceMonetary||"0"}}</text>
				<text>元</text>
			</view>
			<view>
				<text>B2C消费金额:</text>
				<text class="color">{{dataObj.b2cMonetary||"0"}}</text>
				<text>元</text>
			</view>
		</view>
		<view class="list">
			<view>
				<text>新手礼包:</text>
				<text class="color">{{dataObj.xslbAvailable==0?'未领取':'已领取'}}</text>
			</view>
			<view v-if="dataObj.xslbAvailable==1">
				<text>领取方式:</text>
				<text class="color">{{dataObj.isOnLine==0?'线下':'线上'}}</text>
			</view>
		</view>
		<view class="list">
			<view>
				<text>邀请码:</text>
				<text class="color">{{dataObj.invitationCode||"0"}}</text>
			</view>
			<view>
				<text>邀请用户数:</text>
				<text class="color">{{dataObj.invitationUserNumber||"0"}}</text>
			</view>
			<view>
				<text>消耗总金额:</text>
				<text class="color">{{(dataObj.allInvitationUserMonetary).toFixed(2)||"0"}}</text>
				<text>元</text>
			</view>
			<view>
				<text>时光豆获得总量:</text>
				<text class="color">{{dataObj.allInvitationCountTimeBean||"0"}}</text>
			</view>
		</view>
		<view class="list">
			<view>
				<text>本月已坚持签到:</text>
				<text class="color">{{dataObj.monthlySignInNumber||"0"}}</text>
				<text>天</text>
			</view>
			<view>
				<text>累计获得时光豆:</text>
				<text class="color">{{dataObj.signInGetTimeBeanNumber||"0"}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:"",
				dataObj:{
					timeMoney:"",
					useTimeMoney:1,
					loveValue:0,
					allianceMonetary:"",
					b2cMonetary:"",
					xslbAvailable:0,
					isOnLine:"",
					invitationCode:"",
					invitationUserNumber:"",
					allInvitationUserMonetary:"",
					allInvitationCountTimeBean:"",
					monthlySignInNumber:"",
					signInGetTimeBeanNumber:""
				}
			}
		},
		methods: {
			searchData() {
				let that=this;
				that.$ajax({
					url:"/memberManager/searchMemberDetails",
					data:{
						mid:that.id
					},success(d){
						that.dataObj=d;
						console.log(d)
					}
				})
			}
		},
		onLoad(e){
			this.id=e.id;
			this.searchData()
		}
	}
</script>

<style lang="less" scoped>
	.content{
		padding: 0;
		background:#f2f2f2;
	}
	.list{
		background: #fff;
		padding:30upx;
		margin-bottom: 20upx;
		font-size: 26upx;
		view{
			margin-bottom: 10upx;
		}
		.color{
			color:#ee3535;
		}
	}
</style>
