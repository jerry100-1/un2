<template>
	<view class="content">
		<view class="input-row border">
			<text class="title">原密码</text>
			<input type="password" v-model="oldPassword" placeholder="6-16位数字、字母、符号">
		</view>
		<view class="input-row border">
			<text class="title">新密码</text>
			<input type="password" v-model="password" placeholder="请输入新密码">
		</view>
		<view class="input-row border">
			<text class="title">确认密码</text>
			<input type="password" v-model="passwordok" placeholder="请再次输入新密码 ">
		</view>
		<view>
			<button type="primary" @tap="sava">确认修改</button>
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
				oldPassword:"",
				password:"",
				passwordok:"",
			}
		},
		methods:{
			sava(){
				let that=this;
				if(that.passwordok!=that.password){
					uni.showToast({
						title:"两次输入的密码不一致",
						icon:"none"
					})
					return
				}
				that.$ajax({
					url:"/system/changePassword",
					data:{
						type:0,
						managerId:that.shopObj.managerId,
						newPassword:that.password,
						originalPassword:that.oldPassword
					},success(d){
						uni.showToast({
							title:"修改成功",
							icon:"none"
						})
						that.code="";
						that.password="";
						that.passwordok="";
						that.oldPassword="";
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1500);
					}
				})
			}
		},
		onLoad(){
			var that=this;
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
	input{
		width:400upx;
		padding: 20upx 0;
		vertical-align: middle;
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
</style>
