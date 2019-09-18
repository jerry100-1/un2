<template>
	<view class="content">
		<view @tap="url" data-url="/pages/system/phone">
			<text>安全手机</text>
			<image src="../../static/reight.png" class="r"></image>
			<text class="r" v-if="shopObj.phone">已设置</text>
		</view>
		<view @tap="url" data-url="/pages/system/loginPwd">
			<text>登录密码</text>
			<image src="../../static/reight.png" class="r"></image>
			<text class="r">已设置</text>
		</view>
		<view @tap="url" :data-url="'/pages/system/pwd?existsCashCode='+existsCashCode">
			<text>取现密码</text>
			<image src="../../static/reight.png" class="r"></image>
			<text class="r" v-if="existsCashCode">已设置</text>
		</view>
		<view @tap="url" data-url="/pages/system/addressList">
			<text>地址管理</text>
			<image src="../../static/reight.png" class="r"></image>
			<text class="r">已设置</text>
		</view>
		<view class="top" @tap="clear">
			<text>清理缓存</text>
			<image src="../../static/reight.png" class="r"></image>
			<text class="r">{{currentSize}}KB</text>
		</view>
		<view data-url="/pages/system/feedback" @tap="url">
			<text>意见反馈</text>
			<image src="../../static/reight.png" class="r"></image>
		</view>
		<view data-url="/pages/system/about" @tap="url">
			<text>关于我们</text>
			<image src="../../static/reight.png" class="r"></image>
		</view>
		<view>
			<text>当前版本</text>
			
			<image src="../../static/reight.png" class="r"></image>
			<text class="r">1.2.4</text>
		</view>
		<view class="btn">
			<button @tap="exit">退出帐号</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		    return {
				existsCashCode:false,
				shopObj:{},
				currentSize:0
			}
		},
		methods: {
			url(e){
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			},
			clear(){
				uni.clearStorageSync();
				uni.showToast({
					title:"清理成功,请重新登录",
					icon:"none"
				})
				setTimeout(function() {
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}, 2000);
			},
			exit(){
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
		},
		onLoad(){
			let that=this;
			uni.getStorageInfo({
				success: function (res) {
					that.currentSize=res.currentSize
				}
			});
			uni.getStorage({
				key:"shopObj",
				success(res){
					that.shopObj=JSON.parse(res.data);
				}
			})
		},
		onShow(){
			let that=this;
			that.$ajax({
				url:"/system_manager/existsCashCode",
				data:{
					merchantId:that.shopObj.merchantId
				},success(d){
					that.existsCashCode=d
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
	.content view{
		line-height: 76upx;
		background: #fff;
		padding: 0 30upx;
		width:100%;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
	}
	image{
		width: 14upx;
		height: 26upx;
		margin-top: 24upx;
		margin-left: 20upx;
	}
	.top{
		margin-top: 40upx;
	}
	.content .btn{
		margin-top: 40upx;
		background: transparent;
	}
	.content button{
		width:574upx;
		height:75upx;
		line-height: 75upx;
		background:rgba(45,147,255,1);
		border-radius:30upx;
		color:#fff;
	}
	.r{
		font-size: 24upx;
		color:#999;
	}
</style>
