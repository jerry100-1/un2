<template>
	<view class="content">
		<view class="top">
			<view class="title">请绑定真实姓名为 {{userName}}的储蓄卡</view>
			<view>62开头,有银联标识的储蓄卡提现更及时</view>
		</view>
		<view class="list">
			<view>
				<text class="left">银行卡号</text>
				<input type="number" placeholder="请谨慎填写您的银行卡号" v-model="bankNO"/>
			</view>
			<view>
				<text class="left">开户银行</text>
				<input type="text" placeholder="请填写您的开户银行" v-model="bankName"/>
			</view>
			<view>
				<text class="left">取现密码</text>
				<input type="password" placeholder="请校验您的取现密码" v-model="pwd"/>
			</view>
			<view>
				<text class="left">安全手机</text>
				<input type="number" v-model="phone" disabled />
			</view>
			<view class="code">
				<text class="left">验证码</text>
				<input type="number" placeholder="请填写您的验证码" v-model="code" />
				<view type="primary" class="getCode" @tap="sendCode">{{codeSend?time+"s":"获取验证码"}}</view>
			</view>
			
		</view>
		<view class="btns">
			<button type="primary" @tap="save">确认</button>
			<text class="r"  @tap="isShowChange">支持的银行卡列表</text>
		</view>
		<view class="info">
			<text>注意:</text>
			<view>1,仅可使用储蓄卡，请不要填写信用卡</view>
			<view>2,绑定62开头、有银联标志的储蓄卡，提现更及时</view>
			<view>3,绑定储蓄卡的持卡人需与原卡所用姓名一致</view>
			<view>4,未设置取现密码，不能更换银行卡信息</view>
		</view>
		<uni-popup :show="isShow" position="middle" mode="fixed">
			<view class="mode">
				<view>
					<text>银行卡列表</text>
				</view>
				<view class="box">
					<view>
						<text>工商银行</text>
						<text>农业银行</text>
						<text>中国银行</text>
					</view>
					<view>
						<text>建设银行</text>
						<text>交通银行</text>
						<text>招商银行</text>
					</view>
					<view>
						<text>邮储银行</text>
						<text>中信银行</text>
						<text>光大银行</text>
					</view>
					<view>
						<text>广发银行</text>
						<text>兴业银行</text>
						<text>民生银行</text>
					</view>
					<view>
						<text>浦发银行</text>
						<text>平安银行</text>
						<text>华夏银行</text>
					</view>
				</view>
				<view class="footer" @tap="isShowChange">
					<text>我知道了</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data(){
			return{
				phone:"",
				code:"",
				shopObj:{},
				bankNO:"",
				bankName:"",
				pwd:"",
				userName:"",
				isShow:false,
				time:60,
				codeSend:false,
			}
		},
		methods:{
			isShowChange(){
				this.isShow=!this.isShow
			},
			sendCode(){
				var that=this
				if(this.codeSend){
					return;
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
						type:"SMS_168820823",
					},success(d){
						console.log(d)
					}
				})
			},
			save(){
				let that=this;
				if(that.bankNO&&that.bankName&&that.pwd){
					that.$ajax({
						url:"/fund/updateBankCard",
						data:{
							bankName:that.bankName,
							mainBankNum:that.bankNO,
							cashInPassword:that.pwd,
							code:that.code,
							phone:that.phone,
							type:"SMS_168820823",
							marchantId:that.shopObj.merchantId
						},
						success(d){
							uni.showToast({
								title:"修改成功",
								icon:"none"
							})
							setTimeout(function(){
								uni.navigateBack({
									delta:1
								})
							},2000)
						}
					})
				}else{
					uni.showToast({
						title:"请填写完整的信息",
						icon:"none"
					})
				}
			}
		},
		onLoad(e){
			let that=this;
			that.userName=e.userName
			uni.getStorage({
				key:"shopObj",
				success(res){
					that.shopObj=JSON.parse(res.data);
				}
			})
			
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
	}
</script>

<style scoped>
	.content{
		background: #f2f2f2;
		padding: 0;
	}
	.content>.top{
		padding-top: 92upx;
		text-align: center;
		height:242upx;
		box-sizing: border-box;
		font-size: 24upx;
		color:#999;
	}
	.top .title{
		font-size: 36upx;
		color:#333;
	}
	.list{
		background: #fff;
		padding: 30upx;
	}
	.list>view{
		line-height:69upx
	}
	.list input{
		font-size: 24upx;
		width:540upx;
		vertical-align: middle;
		margin-left: 10upx;
		display: inline-block;
		border-bottom: 1px solid #eee;
	}
	.left{
		display: inline-block;
		width:130upx;
	}
	.code input{
		display: inline-block;
		width:360upx;
		border:none;
	}
	.getCode{
		border-left: 1px solid #eee;
        display: inline-block;
		padding-left:10upx;
		width:172upx;
		font-size: 24upx;
		text-align: center;
	}
	button{
		width:666upx;
		height:72upx;
		line-height: 72upx;
		text-align: center;
		background: #EE3535;
		color:#fff;
		margin-top: 80upx;
		font-size: 30upx;
		border-radius: 20upx;
	}
	button:after{
		border:none;
	}
	.btns text{
		margin-right: 30upx;
		color:#2D93FF;
		font-size: 24upx;
		margin-top: 36upx;
		text-decoration:underline;
		margin-bottom: 50upx;
	}
	.info{
		padding: 0 30upx;
		line-height: 1.5;
		font-size: 24upx;
	}
	.mode{
		width:612upx;
		height:666upx;
		border-radius: 30upx;
		background: #fff;
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 30upx;
		text-align: center;
	}
	.box>view{
		padding: 0 30upx;
		border-bottom: 1px solid #eee;
		display: flex;
		line-height: 98upx;
	}
	.box>view text{
		flex: 1;
		text-align: center;
		font-size: 30upx;
	}
	.footer{
		background: #f4f4f4;
		line-height: 94upx;
		color:#333;
		font-size: 36upx;
	}
</style>
