<template>
    <view class="content">
		<view class="img-group">
			<image src="../../static/app_icon/app_icon@96x96.png" alt="" class="logo"></image>
		</view>
        <view class="input-group">
            <view class="input-row border">
				<image src="../../static/login/account.png" alt="" mode="widthFix"></image>
				<text class="title">账号</text>
                <m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
            </view>
            <view class="input-row">
				<image src="../../static/login/password.png" alt="" mode="widthFix"></image>
				<text class="title">密码</text>
                <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
        </view>
		 <view class="action-row">
			<checkbox-group @change="checkboxChange">
				<label class="checkbox"><checkbox :checked="isCheck" :value="remember"/>记住帐户</label>
			</checkbox-group>
		    <navigator url="../pwd/pwd" class="r">忘记密码</navigator>
		</view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="bindLogin">登录</button>
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
            return {
                account: '',
                password: '',
				remember:"1",
				checkArr:[],
				isCheck:false,//是否记住帐户
            }
        },

        methods: {

			checkboxChange(e){
				this.checkArr=e.detail.value;
				
				console.log("你好,当前的detail是"+e.detail.value);
			},
            bindLogin() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                if (!this.account) {
                    uni.showToast({
                        icon: 'none',
                        title: '请填写帐号'
                    });
                    return;
                }
                if (!this.password.length) {
                    uni.showToast({
                        icon: 'none',
                        title: '请填写密码'
                    });
                    return;
                }
                /**
                 * 下面简单模拟下服务端的处理
                 * 检测用户账号密码是否在已注册的用户列表中
                 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
                 */
                const data = {
                    accountName: this.account,
                    password: this.password
                };
				let that=this;
				if(this.checkArr.length>0){
					uni.setStorage({
						key:"accountName",
						data:that.account
					})
				}else{
					
				}
		
				//登录
				this.$ajax({
					url:"/system_manager/login",
					method:"POST",
					data:data,
					success:function(d){
						console.log("用户登录了----------------------------------");
						console.log("wo获取的d的数据是------"+d);
						
						that.$ajax({
							url:"/token/get",
							method:"POST",
							data:{
								merchantId:d.merchantId
							},success(req){
								console.log(req,"s");
								uni.setStorageSync("Token",req);
								uni.setStorage({
									key:"shopObj",
									data:JSON.stringify(d)
								})
								uni.setStorageSync('phone', d.phone||"")
								uni.reLaunch({
								    url: '../main/main',
								})
							}
						})
						
						
					}
				})
            }
        },
        onReady() {
			 
        
        },
		onLoad(){
			let that=this;
			uni.getStorage({
				key:"accountName",
				success(res){
					that.account=res.data||"";
					console.log(this,res)
				}
			})
		}
    }
</script>

<style scoped>
	.img-group{
		text-align: center;
		width:100%;
	}
    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
		margin-top: 20upx;
    }
	.logo{
		width:240upx;
		height:240upx;
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
    .input-group image{
		width: 32upx;
		height: 32upx;
		vertical-align: middle;
		margin-top: 34upx;
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
	uni-image{
		width:480upx;
	}
</style>
