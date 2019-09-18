<template>
	<view class="content">
		<view>
			<text>收货人</text>
			<input type="text" v-model="shopAddress.receiver" placeholder="请输入姓名"/>
		</view>
		<view>
			<text>手机号码</text>
			<input type="number" v-model="shopAddress.receiverPhone" placeholder="请输入手机号码"/>
		</view>
		<view>
			<text>选择地区</text>
			<picker  :range="shopAddressP" @change="shopAddressPChange" range-key="proName">
				<view>{{shopAddressP[pIndex].proName}}</view>
			</picker>
			<picker   :range="shopAddressC" @change="shopAddressChange" range-key="proName">
				<view>{{shopAddressC[cIndex].proName}}</view>
			</picker>
			<picker  :range="shopAddressX" @change="shopAddressXChange" range-key="disName">
				<view>{{shopAddressX[xIndex].disName}}</view>
			</picker>
		</view>
		<view>
			<text>详细地址</text>
			<input type="text" placeholder="街道门牌信息" v-model="shopAddress.receiverAddress">
		</view>
<!-- 		<view>
			<text>邮政编码</text>
			<input type="number" placeholder="选填" v-model="postalCode">
		</view>
		<view>
			<text class="auto">设置默认地址</text>
			<switch checked @change="switch1Change" class="r"/>
		</view> -->
		<button @tap="Confirm">保存</button>

	</view>
</template>

<script>
	export default {
		data(){
			return{
				shopAddress:{},//原地址信息
				shopObj:{},
				shopAddressP:[{proName:""}],//地址省
				pIndex:0,
				shopAddressC:[{proName:""}],//地址市
				cIndex:0,
				shopAddressX:[{proName:""}],//地址
				xIndex:0,
                themeColor: '#007AFF',
				userNmae:"",
				phone:"",
				address:"",
				def:"1",//默认1是2不是
				postalCode:"",//邮政编码
			}
		},
		methods:{
			//默认的选择
			switch1Change(e){
				if(e.detail.value){
					//默认
					this.def=1
				}else{
					this.def=2
				}
			},
			//城市的选择
			shopAddressXChange(e){
				this.xIndex=e.detail.value
			},
			searchX(init){
				let that=this;
				that.$ajax({
					url:"/shopProduct/getCommonAddressDistrictList",
					data:{
						cityCode:that.shopAddressC[that.cIndex].code
					},success(d){
						that.shopAddressX=d;
						if(init){
							console.log(10000)
							for(let i in d){
								if(d[i].code==that.shopAddress.areaCode){
									that.xIndex=i;
									break;
								}
							}
						}
					}
				})
			},
			shopAddressChange(e){
				this.cIndex=e.detail.value;
				this.searchX();
			},
			searchC(init){
				let that=this;
				that.$ajax({
					url:"/shopProduct/getCommonAddressCityList",
					data:{
						proCode:that.shopAddressP[that.pIndex].code
					},success(d){
						that.shopAddressC=d;
						if(init){
							for(let i in d){
								if(d[i].code==that.shopAddress.cityCode){
									that.cIndex=i;
									break;
								}
							}
							that.searchX(init);
						}else{
							that.searchX();
						}
						
					}
					
				})
			},
			shopAddressPChange(e){
				this.pIndex=e.detail.value;
				this.searchC();
			},
			searchP(init){
				let that=this;
				that.$ajax({
					url:"/shopProduct/getCommonAddressProvinceList",
					success(d){
						that.shopAddressP=d;
						if(init){
							for(let i in d){
								if(d[i].code==that.shopAddress.provinceCode){
									that.pIndex=i;
									break;
								}
							}
							that.searchC(init)
						}else{
							that.searchC()
						}
					}
				})
			},
			
			
			
			
			checkPhone(phone){
				if(!(/^1[3456789]\d{9}$/.test(phone))){
					return false;
				}
				return true
			},
			//保存
			Confirm(){
				let that=this;
				if(that.shopAddress.receiver&&that.shopAddress.receiverPhone&&that.shopAddress.receiverAddress){
					if(!that.checkPhone(that.shopAddress.receiverPhone)){
						uni.showToast({
							title:"请填写正确的手机号码",
							icon:"none"
						})
						return
					}
					that.$ajax({
						url:"/merchant/modityReturnAddress",
						data:{
							areaCode: that.shopAddressX[that.xIndex].code,
							cityCode: that.shopAddressC[that.cIndex].code,
							infoId: that.shopAddress.infoId,
							provinceCode: that.shopAddressP[that.pIndex].code,
							receiver: that.shopAddress.receiver,
							receiverAddress: that.shopAddress.receiverAddress,
							receiverPhone: that.shopAddress.receiverPhone
						},success(d){
							uni.navigateBack({
								delta: 1
							});
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
					that.shopAddress=d;
					that.searchP(1)
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
	.content>view{
		line-height: 90upx;
		padding: 0 30upx;
		background: #fff;
		border-bottom:1px solid #eee;
		vertical-align: middle;
	}
	.content>view text{
		display: inline-block;
		width:150upx;
	}
	.content>view input,.content>view .input{
		display: inline-block;
		margin-left: 20upx;
		width:400upx;
		vertical-align: middle;
	}
	.content>view .auto{
		width:auto;
	}
	button{
		width:525upx;
		height:72upx;
		text-align: center;
		line-height: 72upx;
		background: #ee3535;
		color:#fff;
		border-radius: 20upx;
		margin-top: 40upx;
	}
	picker{
		vertical-align: middle;
		display: inline-block;
		width:160upx;
		padding-left: 10upx;
		margin-right: 10upx;
		border-radius: 20upx;
		height: 60upx;
		line-height:60upx;
		position: relative;
		border:1px solid #eee;
	}
	picker view{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
</style>
