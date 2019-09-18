<template>
	
	<view>
	
	
	   <view class="content">
			<view>
					<view class="title">店铺信息</view>
					
					<view class="shopItemRespe">
						<text>店铺名称</text>
						<input type="text" class="InputShuRu" v-model="shopName" />
					</view>
					
					<view class="shopItemRespe">
						<text>实体店铺</text>
						<select class="shopStatus">
							<option value="有">有</option>
							<option value="无">无</option>
						</select>
					</view>
					<!-- 公司地址 -->
					<view class="shopItemRespe">
						<text>公司地址</text>
						<picker style="" class="ssqpicker"  :range="shopAddressP" @change="shopAddressPChange" range-key="proName">
							<view>{{shopAddressP[pIndex].proName}}</view>
							<!-- <text class="yticon icon-xia caIco" style=""></text> -->
						</picker>
						
						<picker class="ssqpicker"  :range="shopAddressC" @change="shopAddressChange" range-key="proName">
							<view>{{shopAddressC[cIndex].proName}}</view>
						</picker>
						<picker class="ssqpicker" :range="shopAddressX" @change="shopAddressXChange" range-key="disName">
							<view>{{shopAddressX[xIndex].disName}}</view>
						</picker>
					</view>
					
					<view class="shopItemRespe">
						<text>详细地址</text>
						<input class="InputShuRu" type="text" v-model="detailAddress" />
					</view>
					
					<view class="shopItemRespe">
						<text>人均消费</text>
						<input class="InputShuRu" type="text" v-model="consume" />元
					</view>
					
					<view class="shopItemRespe">
						<view style="display:block;float:left;">营业时间</view>
							
						<view class="uni-list lefttime" style="display:inline-block;float:left;">
							<view class="uni-list-cell">
								<view class="uni-list-cell-db" >
									<picker mode="time" :value="time" start="09:01" end="23:01" @change="bindTimeChange">
										<view class="uni-input">{{time}}</view>
									</picker>
								</view>
							</view>
						</view>					
						
						<view style="display:inline-block;float:left;margin-left:20upx;margin-right:20upx;">--</view>

						<view class="uni-list righttime" style="display:inline-block;float:left;">
							<view class="uni-list-cell">
								<view class="uni-list-cell-db" >
									<picker mode="time" :value="time2" start="09:01" end="23:01" @change="bindTimeChange2">
										<view class="uni-input">{{time2}}</view>
									</picker>
								</view>
							</view>
						</view>
	=
					</view>
					
					
					<view class="shopItemRespe">
						<text>客服电话</text>
						<input class="InputShuRu" type="text" v-model="phoneNum" />元
					</view>
					
					<view class="shopItemRespe">
						<text>客服微信</text>
						<input class="InputShuRu" type="text" v-model="customWeiXin" />元
					</view>
						
					<view class="shopItemRespe">
						<text>店铺整体图标</text>
						<image :src="upSrc||defSrc" class="addImg"  @tap="proImgsChoose"></image>
						<text class="grey">非必填,若未上传,则显示默认图标</text>
					</view>
					
					
					<view class="shopItemRespe">
						<text>店内环境照片</text>
						<image :src="upSrc||defSrc" class="addImg"  @tap="proImgsChoose2"></image>
						<text class="grey">非必填,若未上传,则显示默认图标</text>
					</view>
				</view>
			
	    </view>		
	
	        <view class="content" style="margin-top:-20upx;">
				<view>
					<view class="title">门店服务</view>
					
					<view class="WrapSmallShop">
						  <view class="smallItem" >
							  <view class="smallItemLeft">
									  <checkbox-group class="inlines" @change="expressFun">
									      <label>
									          <checkbox value="1" :checked="expressConfig==1" color="#EE3535"/>是
									      </label>
									  </checkbox-group>
									
							  </view>
							  <view class="smallItemRight">空调开放</view>
						  </view>
						  <view class="smallItem">
							   <view class="smallItemLeft">
									 <!-- <uni-icon type="circle" size="26" class="uniICon" color="#999" @tap="isCheckChange" v-if="isCheck"></uni-icon>
									 <uni-icon @tap="isCheckChange" class="uniICon" type="checkbox-filled" size="26" color="#ee3535" v-else></uni-icon> -->
							         <checkbox-group class="inlines" @change="expressFun">
							             <label>
							                 <checkbox value="1" :checked="expressConfig==1" color="#EE3535"/>是
							             </label>
							         </checkbox-group>
							   
							   </view>
							   <view class="smallItemRight">空调开放</view>
						  </view>
						  <view class="smallItem">
							   <view class="smallItemLeft">
								<!-- <uni-icon type="circle" size="26" class="uniICon" color="#999" @tap="isCheckChange" v-if="isCheck"></uni-icon>
								 <uni-icon @tap="isCheckChange" class="uniICon" type="checkbox-filled" size="26" color="#ee3535" v-else></uni-icon> -->
							         <checkbox-group class="inlines" @change="expressFun">
							             <label>
							                 <checkbox value="1" :checked="expressConfig==1" color="#EE3535"/>是
							             </label>
							         </checkbox-group>
							  
							  </view>
							  <view class="smallItemRight">空调开放</view>
						  </view>
						  <view class="smallItem">
								   <view class="smallItemLeft">
									 <!-- <uni-icon type="circle" size="26" class="uniICon" color="#999" @tap="isCheckChange" v-if="isCheck"></uni-icon>
									 <uni-icon @tap="isCheckChange" class="uniICon" type="checkbox-filled" size="26" color="#ee3535" v-else></uni-icon> -->
								        <checkbox-group class="inlines" @change="expressFun">
								            <label>
								                <checkbox value="1" :checked="expressConfig==1" color="#EE3535"/>是
								            </label>
								       </checkbox-group>
								  
								  </view>
								  <view class="smallItemRight">空调开放</view>
						  </view>
						  <view class="smallItem">
								   <view class="smallItemLeft">
									 <!-- <uni-icon type="circle" size="26" class="uniICon" color="#999" @tap="isCheckChange" v-if="isCheck"></uni-icon>
									 <uni-icon @tap="isCheckChange" class="uniICon" type="checkbox-filled" size="26" color="#ee3535" v-else></uni-icon> -->
								       <checkbox-group class="inlines" @change="expressFun">
								           <label>
								               <checkbox value="1" :checked="expressConfig==1" color="#EE3535"/>是
								           </label>
								       </checkbox-group>
								 
								 
								  </view>
								  <view class="smallItemRight">空调开放</view>
						  </view>
						  <view class="smallItem">
							   <view class="smallItemLeft">
								 <!-- <uni-icon type="circle" size="26" class="uniICon" color="#999" @tap="isCheckChange" v-if="isCheck"></uni-icon>
								 <uni-icon @tap="isCheckChange" class="uniICon" type="checkbox-filled" size="26" color="#ee3535" v-else></uni-icon> -->
							       <checkbox-group class="inlines" @change="expressFun">
							           <label>
							               <checkbox value="1" :checked="expressConfig==1" color="#EE3535"/>是
							           </label>
							       </checkbox-group>
							  
							  </view>
							  <view class="smallItemRight">空调开放</view>
						  </view>
					</view>
				</view>
				
				
		</view>
	
	
	
	        <view class="content" style="margin-top:-20upx;">
				<view>
					<view class="title">商户介绍</view>
					<view class="shopItemRespe">
						<text>商户介绍</text>
						<textarea value="" class="shItRespeTextArea" placeholder="" v-model="customerDescribtion" />
					</view>
											
				</view>	
	       					
	       </view> 
	
	
			 <view class="content" style="margin-top:-20upx;">
					<view>
						<view class="title">客户介绍</view>
						<view class="rigText">
							新增分店
						</view>
						
						<view class="shopItemRespe">
							<text>店铺名称</text>
							<input class="InputShuRu" type="text" v-model="shopNameMsg" />元
						</view>
						
						
						<!-- 公司地址 -->
						<view class="shopItemRespe">
							<text>门店地址</text>
							<picker style="" class="ssqpicker"  :range="shopAddressP" @change="shopAddressPChange" range-key="proName">
								<view>{{shopAddressP[pIndex].proName}}</view>
								<!-- <text class="yticon icon-xia caIco" style=""></text> -->
							</picker>
							
							<picker class="ssqpicker"  :range="shopAddressC" @change="shopAddressChange" range-key="proName">
								<view>{{shopAddressC[cIndex].proName}}</view>
							</picker>
							<picker class="ssqpicker" :range="shopAddressX" @change="shopAddressXChange" range-key="disName">
								<view>{{shopAddressX[xIndex].disName}}</view>
							</picker>
						</view>
						
						<view class="shopItemRespe">
							<text>详细地址</text>
							<input class="InputShuRu" type="text" v-model="detailAddress" />
						</view>
						
						
						<view class="shopItemRespe">
							<text>客服电话</text>
							<input class="InputShuRu" type="text" v-model="customerPhone" />
						</view>
						
						
						
						
					</view>	
					
					
					
			 </view>			
	       
	
	
	
		</view>	
	
</template>

<script>
	// import uniIcon from "../../components/uni-icon/uni-icon.vue"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"

	var that="";
	export default{
		data(){
			return{
				upSrc:"",
				defSrc:"../../static/capital/my_add_image@2x.png",
				consume:"",
			    shopName:"",	
				shopAddressP:[{proName:""}],//公司地址省
				pIndex:0,
				shopAddressC:[{proName:""}],//公司地址市
				cIndex:0,
				shopAddressX:[{proName:""}],//公司地址
				xIndex:0,
				isCheck:false,
				phoneNum:"",
				customerDescribtion:"",
				detailAddress:"",
				time: '12:01',
				time2:"09:10",
				customWeiXin:"",
				customerPhone:"",
				shopNameMsg:"",
			}
		},
		onShow:function()
		{
			
		},
		onLoad(e){
			if(e.id){
				this.marchantId=e.id
			}
			that=this;
			if(that.marchantId){
				that.$ajax({
					url:"/channelManagementRest/getSelectMarchantInfo",
					data:{
						marchantId:that.marchantId
					},success(d){
						that.shopName=d.shopName;
						that.upSrc=d.displayImg;
						that.cusPhone=d.servicePhone;
						that.qq=d.qq;
						that.cusWX=d.weixin;
						that.cusNum=d.accountName||"";
						that.companyName=d.companyName;
						that.shopAddress=d.address;
						that.contactsName=d.contactsName;
						that.contactsPhone=d.contactsPhone;
						that.frontIndex=d.isFront*1-1;
						that.existsShop=d.existsShop||0;
						that.latitude=d.latitude||"",//纬度
						that.longitude=d.longitude||"",//经度
						that.linepayratioIndex=d.linePayRatio==80?0:1;
						//that.typeMapper(d.marchantType)
						that.ProvinceList(d);
					}
				})
							
			}else{
				//that.typeMapper()
				that.ProvinceList();
			}
		},
		components:{
			uniIcon
		},
		methods:{
			expressFun(e){
				this.expressConfig=e.detail.value.length==1?1:2
			},
			isCheckChange:function()
			{
				that.isCheck=!that.isCheck;
			},
			 bindTimeChange: function(e) {
			    this.time = e.target.value
			},
			 bindTimeChange2: function(e) {
			    this.time2 = e.target.value
			},
			limit(limit){
				var size = "";
				size = (limit/(1024 * 1024)).toFixed(2);//转MB
				var sizeStr = size + "";                        //转成字符串
				var index = sizeStr.indexOf(".");                    //获取小数点处的索引
				var dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
				if(dou == "00"){                                //判断后两位是否为00，如果是则删除00
					return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
				}
				return size;
			},
			//店铺图片选择
			proImgsChoose(){
				let that=this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function (res) {
						console.log(that.limit(res.tempFiles[0].size))
						if(that.limit(res.tempFiles[0].size)>1){
							uni.showToast({
								title:"图片大小不能超过1M",
								icon:"none"
							})
							return
						}
						that.$ajax({
							uploadFile:true,
							formData:{
								'fileName':"/marchant/",
							},
							filePath:res.tempFilePaths[0],
							success(d){
								that.upSrc=d
							}
						})
					}
				});
			},
			//店铺图片选择
			proImgsChoose2(){
				let that=this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function (res) {
						console.log(that.limit(res.tempFiles[0].size))
						if(that.limit(res.tempFiles[0].size)>1){
							uni.showToast({
								title:"图片大小不能超过1M",
								icon:"none"
							})
							return
						}
						that.$ajax({
							uploadFile:true,
							formData:{
								'fileName':"/marchant/",
							},
							filePath:res.tempFilePaths[0],
							success(d){
								that.upSrc=d
							}
						})
					}
				});
			},
			
			
			shopAddressPChange(e){
				let that=this;
				that.pIndex=e.detail.value;
				that.searchCity();
			},
			shopAddressChange(e){
				let that=this;
				that.cIndex=e.detail.value;
				that.searchCity();
			},
			shopAddressXChange(e){
				this.xIndex=e.detail.value;
			},
			
			searchX(obj){
				let that=this;
			
				that.$ajax({
					url:"/shopProduct/getCommonAddressDistrictList",
					data:{
						cityCode:that.shopAddressC[that.cIndex].code
					},
					success(d){
						that.shopAddressX=d;
						if(obj){
							for(let i in d){
								if(obj.companyArea==d[i].code){
									that.xIndex=i;
									break;
								}
							}
						}
					}
				})
			},
			
			/**
			 * 查询市
			 * */
			searchCity(obj){
				let that=this;
				that.$ajax({
					url:"/shopProduct/getCommonAddressCityList",
					data:{
						proCode:that.shopAddressP[that.pIndex].code
					},
					success(d){
						that.shopAddressC=d;
						if(obj){
							for(let i in d){
								if(obj.companyCity==d[i].code){
									that.cIndex=i;
									break;
								}
							}
						}
						that.searchX(obj);
					}
				})
			},
			ProvinceList(obj){
				let that=this;
				that.$ajax({
					url:"/shopProduct/getCommonAddressProvinceList",
					success(d){
						that.shopAddressP=d;
						if(obj){
							for(let i in d){
								if(obj.companyProvince==d[i].code){
									that.pIndex=i;
									break;
								}
							}
						}
						that.searchCity(obj)
					}
				})
			},
			
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.WrapSmallShop{
		width:100%;
		height:150upx;
	    // background:red;
		display:flex;
		align-items:center;
		flex-wrap: wrap;
	}
	.smallItem{
		width:33.3%;
		height:100upx;
        // background:green;
		display:flex;
		align-items: center;
		justify-content:center;
	}
	.smallItemLeft{
		display:inline-block;
		margin-right:8upx;
		vertical-align:middle;
	}
	.smallItemRight{
		display:inline-block;
		margin-left:8upx;
		vertical-align:middle;
	}
	.shopItemRespe{
		margin-top:40upx;
		clear:both;
	}
	.lefttime{
		border-bottom:1px solid rgba(0,0,0,0.26);
		margin-left:10upx;
	}
	.righttime{
		border-bottom:1px solid rgba(0,0,0,0.26);
		margin-left:10upx;
	}
	.addImg{
		width:100upx;
		height:100upx;
		vertical-align: top;
		margin-right: 10upx;
		margin-left:20upx;
	}
	.grey{
		color:#999;
		vertical-align: bottom;
		position: relative;
		bottom: -32px;
	}
	
	.content{
		padding: 0;
		background: #F2F2F2;
	}
	.ssqpicker{
		display:inline-block;
		margin-left:30upx;
		border:1px solid rgba(0,0,0,0.18);
		padding:12upx 8upx;
	}
	.InputShuRu{
		text-indent:20upx;
		width:90%;
	}
	.shopStatus{
		margin-left:30upx;
		height:50upx;
	}
	.content>view{
		background: #fff;
		padding:30upx;
		margin-bottom: 40upx;
	}
	.border picker{
		width:500upx;
	}
	.content>view>view{
		margin-bottom: 20upx;
		font-size: 26upx;
	}
	.title{
		padding-left: 17upx;
		border-left:5upx solid #EE3535;
		font-size: 28upx;
		color:#333;
		float:left;
	}
	.rigText{
		float:right;
		font-size:28upx;
		color:red;
		background:rgba(0,0,0,0.08);
		border-radius:10upx;
		padding:10upx 20upx;
	}
	input{
		width:400upx;
		border-bottom:1px solid #eee;
		display: inline-block;
		vertical-align: middle;
		margin-left:10upx;
	}
	.selectShopH{
		margin-left:20upx;
	}
	.shItRespeTextArea{
		border-bottom: 1px solid rgba(0,0,0,0.18);
		width:90%;
		height:280upx;
		float:right;
	}
</style>
