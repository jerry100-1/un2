<template>
	<view class="content">
		<view> 
			<textarea value="" placeholder="请提交您的意见与反馈，我们会尽快解决！"  v-model="content" @confirm="confirm"/>
			<button type="primary" @click="sava">确认提交</button>
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
			return{
				content:"",
			}
		},
		methods: {
			confirm(e){
				console.log(e)
			},
			sava(){
				uni.showToast({
					title:"提交成功"
				})
				this.content=""
			}
		}
	}
</script>

<style scoped>
	.content{
		background: #f2f2f2;
		padding: 0;
	}
	textarea{
		background: #fff;
		width:100%;
		box-sizing: border-box;
		margin-bottom: 60upx;
		padding: 30upx;
	}
	button{
		width:574upx;
		height:75upx;
		text-align: center;
		line-height: 75upx;
		font-size: 30upx;
		background: #2D93FF;
		border-radius: 50upx;
	}
</style>
