<template>
	<view class="content">
		<view class="list">
			<view class="item_list" v-if="type==2">
				<view>
					<image src="../../static/bank.png" mode=""></image>
				</view>
				<view>
					<view class="info">
					{{bankObj.bankName}}
						<text class="card">储蓄卡</text>
					</view>
					<view class="cardNum">
						{{bankObj.mainBankNum}}
					</view>
				</view>
			</view>
			<view class="btn">
				<button class="change" @tap="change(bankObj.bankEnrollName)">更换银行卡</button>
			<!-- 	<button @tap="isShowChange">解绑银行卡</button> -->
			</view>
			<uni-popup :show="isShow" position="middle" mode="fixed">
				<view class="mode">
					<view class="info">
						解绑后将无法正常提现,且提现方式将默认改为手动提现,是否确认解绑提现银行卡?
					</view>
					<view class="btns">
						<text @tap="isShowChange">取消</text>
						<text class="border" @tap="untying">确定</text>
					</view>
				</view>
			</uni-popup>
		</view> 
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
				bankObj:{
					mainBankNum:"",
					bankEnrollName:""
				},
				shopObj:{},
				type:"",// 1 不绑定 2 绑定
				isShow:false,
			}
		},
		methods:{
			isShowChange(){
				this.isShow=!this.isShow
			},
			//解绑
			untying(){
				console.log("解绑")
			},
			//更换银行卡
			change(obj){
				uni.navigateTo({
					url:"/pages/capital/changeBank?userName="+obj
				})
			}
		},
		onLoad(e){
			var that=this;
			that.type=e.type;
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
				url:"/fund/searchBankCard",
				data:{
					marchantId:that.shopObj.merchantId
				},success(d){
					that.bankObj=d;
				}
			})
		}
		
	}
</script>

<style scoped>
	.content{
		background: #f3f3f3;
		padding: 0;
	}
	.item_list{
		width:670upx;
		background: -webkit-linear-gradient(left, #5DA3D8, #4067BD ); /* Safari 5.1 - 6.0 */
		margin: 40upx auto;
		border-radius: 20upx;
		padding: 40upx;
		padding-bottom: 80upx;
		box-sizing: border-box;
	}

	.item_list>view{
		display: inline-block;
		vertical-align: top;
		color:#fff;
		font-size: 36upx;
	}
	.item_list image{
		width:72upx;
		height:72upx;
		margin-right: 20px;
		border-radius: 50%;
	}
	.card{
		display: block;
		font-size: 24upx;
	}
	.cardNum text{
		margin-right: 20upx;
		margin-top: 50upx;
		display: inline-block;
	}
	button{
		width:670upx;
		line-height: 72upx;
		text-align: center;
		color:#fff;
		background: #bbb;
		border-radius: 10upx;
		font-size: 30upx;
	}
	.change{
		background: #EE3535;
		margin-bottom: 20upx;
	}
	.btn button:after{
		border:none;
	}
	.uni-popup{
		background: transparent;
	}
	.mode{
		box-sizing: border-box;
		width: 616upx;
		height:331upx;
		background: #fff;
		color:#333;
		overflow: hidden;
		border-radius: 10upx;
	}
	.mode .info{
		padding: 30upx;
		line-height: 1.5;
	}
	.mode .btns{
		display: flex;
		margin-top: 52upx;
		width:100%;
		background: #f4f4f4;
	}
	.mode text{
		flex:1;
		text-align: center;
		display: inline-block;
		line-height:80upx;
		border-radius:none;
		display: inline-block;
	}
	.mode text.border{
		border-left:1px solid #ddd;
	}
</style>
