<template>
    <view class="content">
		<view class="img-group">
			<image src="../../static/logo@2x.png" alt="" class="logo"></image>
		</view>
        <view class="input-group dis">
			<view class="border">
				<image src="../../static/login/phone@2x.png" alt="" mode="widthFix"></image>
				<text class="title">手机号码</text>
				<input type="number" maxlength="11" v-model="phone" placeholder="请输入手机号"/>

			</view>
			<view class="border m-input-input">
				<image src="../../static/login/identifying-code@2x.png" alt="" mode="widthFix"></image>
				<text class="title">验证码</text>
				<text type="primary" class="getCode r" @click="sendCode">{{codeSend?time+"s":"获取验证码"}}</text>
				<input type="text" v-model="code" placeholder="请输入验证码"><input/>
			</view>
            <view class="border">
				<image src="../../static/login/password.png" alt="" mode="widthFix"></image>
				<text class="title">修改密码</text>
				<input type="password"  v-model="passwordNew" placeholder="请输入密码"/>
            </view>
            <view class="border">
				<image src="../../static/login/password.png" alt="" mode="widthFix"></image>
				<text class="title">确认密码</text>
				<input type="password"  v-model="password" placeholder="请输入密码"/>
            </view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="bindLogin">确认修改</button>
        </view>
    </view>
</template>

<script>

    import {
        mapState,
        mapMutations
    } from 'vuex'
    import mInput from '../../components/m-input.vue'

    export default {
        components: {
            mInput
        },
        data() {
            return {
               phone:"",
			   code:"",
			   passwordNew:"",
			   password:"",
			   codeSend:false,
			   time:60,
            }
        },
        methods: {
			checkPhone(phone){
				if(!(/^1[3456789]\d{9}$/.test(phone))){
					return false;
				}
				return true
			},
			checkboxChange(e){
				this.checkArr=e.detail.value;
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
					console.log(that.time)
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
						phone:that.phone,
						type:"SMS_161591480"
					},
					success(d){
						
					}
				})
			},
            bindLogin() {
				let that=this;
				if(that.phone&&that.code&&that.password&&that.passwordNew){
					if(that.password!=that.passwordNew){
						uni.showToast({
							title:"两次输入的密码不一致",
							icon:"none"
						})
						return
					}
					that.$ajax({
						url:"/system/retrievePassword",
						data:{
							code:that.code,
							phone:that.phone,
							smsType:"SMS_161591480",
							newPassword:that.password,
							type:0
						},success(d){
							uni.showToast({
								title:"操作成功",
								icon:"none"
							})
							setTimeout(function(){
								uni.reLaunch({
									url: '../login/login'
								});
							},1500)
						}
					})
				}else{
					uni.showToast({
						title:"请输入完整的信息",
						icon:"none"
					})
				}
            },

		},
        onReady() {

        }
    }
</script>

<style scoped>
	.logo{
		width:240upx;
		height:240upx;
	}
	.img-group{
		text-align: center;
		width:100%;
		padding-top: 80upx;
	}
	.border *{
		vertical-align: middle;
	}
	.border .title{
		width:130upx;
		display: inline-block;
		margin:20upx 20upx 20upx 0;
	}
	.border{
	    overflow: hidden;
		height:84upx;
		border-bottom: 1px solid #eee;
	}
	.border.getCode{
		width:240upx;
	}
	.border input{
		width:200upx;
		display: inline-block;
		vertical-align: middle;
	}

    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
		margin-top: 20upx;
    }

    .action-row navigator {
        color: #007aff;
        padding: 0 20upx;
    }
    .oauth-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
	.getCode{
		line-height: 60upx;
		border-left: 1px solid #eee;
		height: 60upx;
		margin-top: 10upx;
		padding-left:10upx;
		width:172upx;
		display: inline-block;
		text-align: center;
	}
    .input-group image{
		width: 32upx;
		height: 32upx;
		vertical-align: middle;
		margin-right: 20upx;
	}
    .oauth-image {
        width: 100upx;
        height: 100upx;
        border: 1upx solid #dddddd;
        border-radius: 100upx;
        margin: 0 40upx;
        background-color: #ffffff;
    }

    .oauth-image image {
        width: 60upx;
        height: 60upx;
        margin: 20upx;
    }
	.input-group::before{
		background: none;
	}

</style>
