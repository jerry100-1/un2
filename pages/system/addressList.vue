<template>
	<view class="content">
		<radio-group @change="radioChange">
			<view class="list">
				<view>
					<text>收货人:{{shopAddress.receiver}}</text>
					<text class="r">{{shopAddress.receiverPhone}}</text>
				</view>
				<view class="border">
					<text>收货地址:{{shopAddress.province+shopAddress.city+shopAddress.area+shopAddress.receiverAddress}}</text>
				</view>
				<view class="bottom">
					<radio  :checked="def==1?true:false" color="#EE3535" value="0"/>
					<text>默认地址</text>
					<view class="r">
						<label @click="edit" data-type="1">
							<image src="../../static/img/my_edit@2x.png" ></image>
							<text>编辑</text>
						</label>
						<!-- <label @click="del" data-type="1">
							<image src="../../static/img/my_delete@2x.png" ></image>
							<text>删除</text>
						</label> -->
						
					</view>
				</view>
			</view>
		</radio-group>
	<!-- 	<button class="add" @click="url" data-url="/pages/system/addAddress">添加新地址</button> -->
	</view>
</template>

<script>
	export default {
		data() {
		    return {
				shopAddress:{},
				shopObj:{},
				def:1,
			}
		},
		methods: {
			radioChange(e){
				//选中的值
				console.log(e.detail.value)
			},
			edit(e){
				uni.navigateTo({
					url:"/pages/system/addAddress"
				})
			},
			del(e){
				console.log(e)
			},
			url(e){
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
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
		},
		onShow(){
			let that=this;
			that.$ajax({
				url:"/merchant/returnAddress",
				data:{
					merchantId:that.shopObj.merchantId,
				},success(d){
					that.shopAddress=d
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
	.list{
		background: #fff;
		font-size: 26upx;
		margin-bottom: 20upx;
	}
	.list>view{
		padding:30upx 30upx 0;
		margin-bottom: 20upx;
	}
	.list>view.bottom{
		padding-bottom: 30upx;
	}
	.list .border{
		padding-top: 0;
		border-bottom: 1px solid #eee;
		padding-bottom: 20upx;
		margin-bottom: 0;
	}
	.list .border text{
		height: 72upx;
		line-height: 1.4;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.list label{
		margin-right: 20upx;
	}
	.list image{
		width:28upx;
		height:28upx;
		vertical-align: middle;
		margin-right: 10upx;
	}
	.add{
		width:525upx;
		border-radius: 20upx;
		height:72upx;
		text-align: center;
		background: #EE3535;
		color:#fff;
		font-size: 28upx;
	}
</style>
