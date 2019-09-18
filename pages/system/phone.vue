<template>
	<view class="content">
		<view class="top" v-if="disabled">
			<view>{{shopObj.shopName}}</view>
			<view class="title">已认证手机 {{phones}} </view>
		</view>
		<view class="item_list">
			<text>{{disabled?'更换手机':'安全手机'}}</text>
			<input type="number" displayable v-model="phone" placeholder="请输入手机号" maxlength="11"/>
		</view>
		<view class="item_list">
			<text class="title">验证码</text>
			<input class="m-input" type="text" clearable focus v-model="code" placeholder="请输入验证码"/>
			<view type="primary" class="getCode r" @click="sendCode">{{codeSend?time+"s":"获取验证码"}}</view>
		</view>
		<view>
			<button @click="sava">{{disabled?'确认更换':'绑定安全手机'}}</button>
		</view>
		<view class="info">
			<view class="text">
				<text><text class="color">* </text> 温馨提示:</text>
			</view>
			<view>1, 绑定认证手机成功后,30日内不能再次更换;</view>
			<view>2,若待绑定的手机号码已注册,则无法使用该手机进行更换。</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				shopObj:{},
				phone:"",
				phones:"",
				code:"",
				codeSend:false,
				time:60,
				disabled:false,//falsey为绑定手机，true为更换
	        }
	    },
		methods: {
			checkPhone(phone){
				if(!(/^1[3456789]\d{9}$/.test(phone))){
					return false;
				}
				return true
			},
			sendCode(){
			 	var that=this
			 	if(that.codeSend){
			 		return;
			 	}
				if(!that.checkPhone(that.phone)){
					uni.showToast({
						title:"请填写正确的手机号码",
						icon:"none"
					})
					return
				}
			 	that.codeSend=true;
			 	var t=setInterval(function(){
			 		that.time-=1;
			 		if(that.time==0){
			 			that.codeSend=false;
			 			that.time=60;
			 			clearInterval(t)
			 		}
			 	},1000)
			 	this.$ajax({
			 		url:"/sms",
					data:{
						phone: that.phone,
						type: "SMS_161591477"
					}
			 	})
			},
			sava(){
				let that=this;
				if(!this.code||!this.phone){
					uni.showToast({
					    icon: 'none',
					    title: '请输入完整的信息'
					});
					return;
				}
				that.$ajax({
					url:"/system/bindPhone",
					data:{
						code: that.code,
						managerId: that.shopObj.managerId,
						phone: that.phone,
						type: "SMS_161591477"
					},success(){
						uni.showToast({
							title:"操作成功,请重新登录",
							icon:"none"
						})
						setTimeout(function(){
							uni.reLaunch({
								url: '/pages/login/login'
							});
						},1000)
					}
				})
			}
		},
		 onReady() {
			 if(uni.getStorageSync("phone")){
				this.phone=uni.getStorageSync("phone")||"";
				this.phones=uni.getStorageSync("phone")||""
				this.disabled=true
			 }
		},
		onLoad(){
			let that=this;
			uni.getStorage({
				key:"shopObj",
				success(res){
					that.shopObj=JSON.parse(res.data);
				}
			})
		}
	}
</script>

<style scoped>
	.top{
		background: #fff;
		height:128upx;
		box-sizing: border-box;
		padding: 30upx;
		font-size: 28upx;
		color:#333;
		margin-bottom: 40upx;
	}
	.top .title{
		font-size: 24upx;
		color:#999;
	}
	.content{
		background: #F2F2F2;
		padding: 0;
	}
	.item_list{
		border-bottom: 1px solid #eee;
		padding:0 30upx;
		box-sizing: border-box;
		height: 76upx;
		line-height: 76upx;
		background: #fff;
	}
	.item_list text{
		display: inline-block;
		width: 150upx;
	}
	.item_list input{
		display: inline-block;
		vertical-align: middle;
		width:280upx;
	}
	.getCode{
		line-height: 46upx;
		border-left: 1px solid #eee;
		height: 46upx;
		margin-top: 10upx;
		padding-left:10upx;
		width:160upx;
		text-align: center;
		display: inline-block;
	}
	button{
		margin-top: 82upx;
		width:574upx;
		line-height: 75upx;
		background: #2D93FF;
		border-radius: 50upx;
		color:#fff;
	}
	.info{
		margin-top: 100upx;
		padding: 0 30upx;
		font-size: 24upx;
	}
	.info view{
		margin-bottom: 10upx;
	}
	.info text{
		font-size: 28upx;
	}
	.color{
		color:#ee3535;
	}
</style>
