<template>
	<view class="content">
		<view class="input-row border">
			<text class="title">取现密码</text>
			<input type="password" v-model="password" placeholder="6-16位数字、字母、符号">
		</view>
		<view class="input-row border">
			<text class="title">确认密码</text>
			<input type="password" v-model="passwordok" placeholder="请再次取现密码 ">
		</view>
		<view class="input-row border">
			<text class="title">手机号码</text>
			<text class="phone">{{phone}}</text>
		</view>
		<view class="input-row">
			<text class="title">验证码</text>
			<input type="text" v-model="code"  placeholder="请输入验证码">
			<view type="primary" class="getCode" @click="sendCode">{{codeSend?time+"s":"获取验证码"}}</view>
		</view>
		<view>
			<button type="primary" @click="sava">确认</button>
		</view>
	</view>
</template>

<script>
	import mInput from '../../components/m-input.vue'
	 export default {
	    components: {
	        mInput
	    },
	    data() {
			return{
				shopObj:{},
				password:"",
				passwordok:"",
				phone:"",
				code:"",
				time:60,
				codeSend:false,
				disabled:true,
			}
		},
		methods:{
			checkPhone(phone){
				if(!(/^1[3456789]\d{9}$/.test(phone))){
					return false;
				}
				return true
			},
			sava(){
				let that=this;
				if(that.code&&that.password&&that.passwordok){
					if(that.password!=that.passwordok){
						uni.showToast({
							title:"两次输入的密码不一样",
							icon:"none"
						})
						return
					}
					that.$ajax({
						url:"/system/changePassword",
						data:{
							code:that.code,
							merchantId:that.shopObj.merchantId,
							newPassword:that.password,
							phone:that.phone,
							smsType:"SMS_161591480",
							type:1
						},
						success(d){
							uni.showToast({
								title:"修改成功",
								icon:"none"
							})
							that.code="";
							that.password="";
							that.passwordok="";
							setTimeout(function() {
								uni.navigateBack({
									delta:1
								})
							}, 1500);
							
						}
					})
				}else{
					uni.showToast({
						title:"请填写完整的信息",
						icon:"none"
					})
				}
			},
			sendCode(){
				var that=this
				if(this.codeSend){
					return;
				}
				if(!that.checkPhone(that.phone)){
					uni.showToast({
						title:"请填写正确的手机号码",
						icon:"none"
					})
				}
				this.codeSend=true;
				var t=setInterval(function(){
					that.time-=1;
					if(that.time==0){
						that.codeSend=false;
						that.time=60;
						clearInterval(t)
					}
				},1000)
				that.$ajax({
					url:"/sms",
					data:{
						phone:that.phone,
						type:"SMS_161591480",
					},success(d){
						console.log(d)
					}
				})
			}
		},
		onReady() {
			if(uni.getStorageSync("phone")){
				this.phone=uni.getStorageSync("phone");
				console.log(this.phone)
			}else{
				uni.showModal({
					title: '提示',
					content: '当前还没有安全手机,是否去添加',
					cancelText:"返回",
					confirmText:"去添加",
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({
								url:"/pages/system/phone"
							})
						} else if (res.cancel) {
							 uni.navigateBack({
								 delta:1
							 })
						}
					}
				});
			}
		},
		onLoad(e){
			let that=this;
			console.log(e.existsCashCode)
			if(e.existsCashCode=="true"){
				//修改
				uni.setNavigationBarTitle({
					title: '修改取现密码'
				});
			}else{
				uni.setNavigationBarTitle({
					title: '设置取现密码'
				});
			}
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
	.content{
		background: #f2f2f2;
		padding: 0;
	}
	.input-row{
		background: #fff;
		padding: 0 30upx;
		border-bottom: 1px solid #eee;
	}
	button{
		width:574upx;
		height:76upx;
		line-height: 76upx;
		text-align: center;
		background: #2D93FF;
		border-radius: 50upx;
		margin: 120upx auto;
	}
	.border input{
		width:400upx;
	}
	input{
		width:320upx;
		padding: 20upx 0;
		vertical-align: middle;
	}
	.getCode{
		line-height: 80upx;
		border-left: 1px solid #eee;
		height: 80upx;
		margin-top: 10upx;
		padding-left:10upx;
		width:172upx;
		text-align: center;
	}
	.phone{
		padding-top: 20upx;
		line-height: 30px;
	}
</style>
