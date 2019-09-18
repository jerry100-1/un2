<template>
	<view class="content">
		<view>
			<view class="title">店铺信息</view>
			<view>
				<text>店铺名称</text>
				<input type="text" v-model="shopName" />
			</view>
			<!-- <view>
				<text>店铺图标</text>
				<image :src="upSrc||defSrc" class="addImg"  @tap="proImgsChoose"></image>
				<text class="grey">非必填,若未上传,则显示默认图标</text>
			</view> -->
			<view class="border">
				<text>行业类别</text>
				<picker :range="marchantType" @change="shopChange" range-key="typename">
					<view>{{marchantType[shopIndex].typename}}</view>
					<!-- <uni-icon type="arrowdown" size="18" color="#999"></uni-icon> -->
				</picker>
			</view>
			<!-- <view class="border">
				<text>线下支付</text>
				<picker class="" ref="mypicker"  :range="front" @change="frontChange">
					<view>{{front[frontIndex]}}</view>
				</picker>
			</view> -->
		<!-- 	<view class="border" v-if="frontIndex==0">
				<text>联盟经费</text>
				<picker class="pci"  :range="linepayratio" @change="linepayratioChange">
					<view>{{linepayratio[linepayratioIndex]}}</view>
				</picker>
			</view> -->
			<view class="border isFront">
				<text>实体店铺</text>
				<picker class="pci"  :range="isFrontArr" @change="isFrontArrChange">
					<view>{{isFrontArr[isFrontArrIndex]}}</view>
				</picker>
				<uni-icon type="location" size="18" @tap="map" v-show="isFrontArrIndex==0"></uni-icon>
				<text class="position" @tap="map" v-show="isFrontArrIndex==0">定位</text>
			</view>
			<view>
				<text>客服电话</text>
				<input type="number" v-model="cusPhone"/>
			</view>
			<!-- <view>
				<text>客服QQ</text>
				<input type="number" v-model="qq"/>
			</view> -->
			<view>
				<text>客服微信</text>
				<input type="text" v-model="cusWX" />
			</view>
			<view>
				<text>登录账号</text>
				<input type="text" v-model="cusNum" @blur="checkUserName"/>
				<text>密码:123456</text>
			</view>
		</view>
		
		<!-- 门店信息 -->
		<view>
			<view class="title">门店信息</view>
			<view>
				<text>门店名称</text>
				<input type="text" v-model="companyName" />
			</view>
			<view>
				<text style="visibility:hidden;">说明文字</text>
				<view style="" class="newShopColumn">
                   门店场所,提交门店名称,线上商品/服务交易,填写线上店铺名称
				</view>
			</view>
			<view>
				<text>商户简称</text>
				<input type="text" v-model="businessAbbreviation" />
			</view>
			
			<view>
				<text>门店地址</text>
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
				<input type="text" style="margin-left:120upx;" v-model="shopAddress" placeholder="请输入详细地址"/>
			</view>
			<view>
				<text>联系人</text>
				<input style="margin-left:100upx;" type="text" v-model="contactsName" />
			</view>
			<view>
				<text>联系电话</text>
				<input style="margin-left:80upx;"  v-model="contactsPhone" maxlength="11"/>
			</view>
			
			<view>
				<text>身份证姓名</text>
				<input style="margin-left:50upx;" type="text" v-model="IDCardName" />
			</view>
			
			<view>
				<text>身份证号码</text>
				<input style="margin-left:40upx;" type="text" v-model="IDCardNumber" maxlength="20"/>
			</view>
			
			
			<view>
				<text>身份证有效期</text>
				<input type="text" v-model="validateIDTime"/>
			</view>
		
			
			
			
			
		</view>
		
		<!-- 门店信息 -->
		<view>
			<view class="title">商户信息</view>
			<view>
				<text class="inlineTextBn inlineTextBn1">商户身份</text>
				<view class="uni-list inlineTextBn inlineTextBn2" style="border:none;">
					  <view class="uni-list-cell">
						  <view class="uni-list-cell-db mylist"  style="width:300upx;border:none;">
							  <picker   @change="bindPickerChanges" range-key="name"  :data-id="objectArray[index].id" :value="index" :range="objectArray">
								 <text  class="uni-input" style="width:300upx;">{{objectArray[index].name}}</text>
								 <!-- 还是建议用input保存,可能picker更新不及时 -->
								<!-- <input type="text" :value="objectArray[index].id" hidden/> -->
								<text  class="addArrow iconfont icon-xiangxiajiantou"></text>
								
								
							 </picker>
						  </view>
					  </view>
				 </view>
			</view>
			
			<view v-if="myflag1">
				<text class="firstLine1" style="">说明文字</text>
				<view class="firstLine">
					申请入驻成功的微信小微商户，通过乐驿享的扫脸支付设备进行线下收款（该商户身份在乐驿享可上传商品，但无法线上支付交易），订单交易成功后，微信收取0.38%-0.6%手续费，剩余销售金额全部归属商户，即时到账至商户的收款微信账号；
				</view>
				
			</view>
			
			<view v-if="myflag2">
				<text class="firstLine1" style="">说明文字</text>
				<view class="firstLine">
					特约商户自收款,申请入驻成功的微信特约商户,通过乐驿享的扫脸支付设备进行线下收款,通过乐驿享开店进行线上交易
					,订单交易成功后,联盟经费支付给乐驿享平台作跨界盈利分配,微信收取0.38%，0.6%手续费(用户分享雇佣及时到账)
			        剩余销售金额全部归属商户,及时到账至商户的收款微信账号
			
				</view>
				
			</view>
			
			<view v-if="myflag3">
				<text class="firstLine1" style="">说明文字</text>
				<view class="firstLine">
					特约商户代收款
					由乐驿享官方特约商户进行代收款；商户通过乐驿享的扫脸支付设备进行线下收款，通过乐驿享开店进行线上交易，订单交易成功后，普通支付的微信手续费由商户承担，联盟支付的联盟经费支付给乐驿享平台作跨界盈利分配（微信手续费由乐驿享承担），（用户分享佣金即时到账），剩余销售金额全部归属商户，商户发起提现，T+0到账；
			
				</view>
				
			</view>
			
			
			<view style="margin-top:20upx;">
				<text>微信费率</text>
				<input style="margin-left:20upx;" type="number" v-model="weixinfeilv" maxlength="11"/>%
			</view>
			
			<view>
				 <text class="inlineTextBn inlineTextBn1">线下支付</text>
				 <view  v-if="!myFlag100" class="uni-list inlineTextBn inlineTextBn2" style="border:none;">
					  <view class="uni-list-cell">
						  <view class="uni-list-cell-db mylist"  style="width:300upx;border:none;">
							  <picker ref="mypicker1" :class="[myflag1==true? 'noneClass':'displayClass']"   @change="bindPickerChanges3" range-key="name"  :data-id="objectArray3[index3].id" :value="index3" :range="objectArray3">
								 <text class="uni-input" style="width:300upx;">{{objectArray3[index3].name}}</text>
								  <text  class="addArrow iconfont icon-xiangxiajiantou" style="margin-left:100upx;"></text>
								 <!-- 还是建议用input保存,可能picker更新不及时 -->
								<!-- <input type="text" :value="objectArray[index].id" hidden/> -->
							 </picker>
						  </view>
					  </view>
				  </view>
				  
				  
				  <view v-if="myFlag100" class="uni-list inlineTextBn inlineTextBn2" style="border:none;">
				  	  需要
				  </view>
				  
				  
				  
				  
				 
			</view>
			
			<view>
				<text class="firstLine1" style="visibility:hidden;">说明文字</text>
				<view class="firstLine firstLine3">
					  因产品或服务属于线下及时支付,联盟商家与用户不产生物流过程的交易收款,视同为交易及时完成,
					  销售收入及时到账
				</view>
			</view>
			
			
			
			
			<view ref="zhifuView" v-if="isFront==1">
				<text class="inlineTextBn inlineTextBn1">支付方式</text>
				<view v-if="!myFlag101" class="uni-list inlineTextBn inlineTextBn2" style="border:none;">
					  <view class="uni-list-cell">
						  <view class="uni-list-cell-db mylist"  style="width:300upx;border:none;">
							  <picker ref="mypicker2"   @change="bindPickerChanges2" range-key="name"  :data-bindid="objectArray2[index2].id" :value="index2" :range="objectArray2">
								 <text  class="uni-input" style="width:300upx;">{{objectArray2[index2].name}}</text>
								 <text  class="addArrow iconfont icon-xiangxiajiantou" style="margin-left:60upx;"></text>
								 <!-- 还是建议用input保存,可能picker更新不及时 -->
								<!-- <input type="text" :value="objectArray[index].id" hidden/> -->
							 </picker>
						  </view>
					  </view>
				 </view>
				 
				 
				 <view v-if="myFlag101" class="uni-list inlineTextBn inlineTextBn2" style="border:none;">
				 	 普通支付
				  </view>
				 
				 
			</view>
			
			
			<view v-if="myflag4&&isFront==1">
				<text class="firstLine1" style="visibility:hidden;">说明文字</text>
				<view class="firstLine firstLine3">
					 联盟支付
					 联盟支付，即订单交易成功后，联盟经费支付给乐驿享平台，微信收取0.38%-0.6%手续费，剩余销售金额全部归属商户；
				</view>
			</view>
			<view v-if="myflag5&&isFront==1">
				<text class="firstLine1" style="visibility:hidden;">说明文字</text>
				<view class="firstLine firstLine3">
					 普通支付
					普通支付，即订单交易成功后，微信收取0.38%-0.6%手续费，剩余销售金额全部归属商户；
				</view>
			</view>
			
			
			<!-- 对应特约商户自收款内容 -->
			<view v-if="myflag2">
				
	              <!-- 入驻微信的商户全称 -->
				  <view style="margin-top:20upx;display:none;">
				  	<text>入驻微信的商户全称</text>
				  	<input style="margin-left:20upx;"  v-model="settledName"/>
				  </view>
				  
				  <!-- 入驻微信的商户全称 -->
				  <view style="margin-top:40upx;display:none;">
				  	<text>微信分配的商户号</text>
				  	<input style="margin-left:40upx;"  v-model="assignNumber"/>
				  </view>
				  
				  <!-- 入驻微信的商户全称 -->
				  <view style="margin-top:40upx;display:none;">
				  	<text>微信支付密钥</text>
				  	<input style="margin-left:90upx;"  v-model="paymentKey"/>
				  </view>
				  
				 
			</view>
			
			
			<view ref="lianmenView" v-if="(myflag2||myflag3)&&isFront==1&&myflag7">
				  <view style="margin-top:40upx;">
				  		<text class="inlineTextBn inlineTextBn1">联盟经费</text>
				  		<view class="uni-list inlineTextBn inlineTextBn2" style="border:none;">
				  			  <view class="uni-list-cell">
				  				  <view class="uni-list-cell-db mylist"  style="width:300upx;border:none;">
				  					  <picker   @change="bindPickerChanges4" range-key="name"  :data-bindid="objectArray4[index4].id" :value="index2" :range="objectArray4">
				  						 <text class="uni-input" style="width:300upx;">{{objectArray4[index4].name}}</text>
										 <text  class="addArrow iconfont icon-xiangxiajiantou" style="margin-left:120upx;"></text>
				  						 <!-- 还是建议用input保存,可能picker更新不及时 -->
				  						<!-- <input type="text" :value="objectArray[index].id" hidden/> -->
				  					 </picker>
				  				  </view>
				  			  </view>
				  		 </view>
				  </view>
				
				
			</view>
			
			
			
			
			
			
			
			
		
		</view>
		
		
		
		
		
		
		
		
		<button  @tap="url">下一步</button>
	</view>
</template>

<script>
	var that="";
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import { pathToBase64, base64ToPath } from '@/js_sdk/gsq-image-tools/image-tools/index.js'
	export default{
		components: {
			uniIcon,
		},
		data(){
			return{
				myFlag100:true,
				myFlag101:true,
				changeid:"",
				//marchantId:"",//修改的id
				upSrc:"",
				myflag1:true,
				myflag2:false,
				myflag3:false,
				myflag4:false,
				myflag5:true,
				myflag6:false,
				myflag7:false,
				defSrc:"../../static/capital/my_add_image@2x.png",
				contactsPhone:"",//联系电话
				contactsName:"",//联系人
				shopAddressP:[{proName:""}],//公司地址省
				pIndex:0,
				shopAddressC:[{proName:""}],//公司地址市
				cIndex:0,
				shopAddressX:[{proName:""}],//公司地址
				xIndex:0,
				companyName:"",//公司名称
				shopAddress:"",//公司详细地址
				qq:"",//客服QQ
				shopName:"",//店铺名称
				cusNum:"",//登录账号
				cusWX:"",//客服微信
				cusPhone:"",//客服电话
				linepayratio:"80",//联盟经费
				linepayratioIndex:0,//联盟下标
				front:["需要","不需要"],//线下支付
				frontIndex:0,
				existsShop:1,
				latitude:"",//纬度
				longitude:"",//经度
				index:0,
				index2:1,
				businessIdentity:1,
				businessAbbreviation:"",
				index3:0,
				index4:0,
				isFrontArr:["有","无"],
				     objectArray: [
					  {
						 id: 0,
						 name: '小微商户自收款'
					  },
					   {
						id: 1,
						name: '特约商户自收款'
					   },
					  {
						id: 2,
						name: '特约商户代收款'
					  }
					
			         ],
				    objectArray2:[
						{
							id:0,
							name:"联盟支付"
						},
						{
							id:1,
							name:"普通支付"
						}
					],
					objectArray3:[
						{
							id:0,
							name:"需要"
						},
						{
							id:1,
							name:"不需要"
						}
					],
					objectArray4:[
						{
							id:0,
							name:"8%"
						},
						{
							id:1,
							name:"15%"
						}
					],
				isFrontArrIndex:0,
				merchantId:"",
				marchantType:[{typename:""}],//行业类别
				shopIndex:0,//种类下标
				isFront:1,//线下支付是否需要
				linePayRatio:"80",//联盟经费
				weixinfeilv:"",//微信费率
				payment:2,//支付方式
				paymentKey:"",//微信支付密钥
				IDCardName:"",//身份证姓名
				IDCardNumber:"",//身份证号码
				validateIDTime:"",//身份证有效期
				validateTime:"",//身份证有效期
				assignNumber:"",//微信分配的商户号
				settledName:""//入驻商户的微信全称
			}
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url:"service"
			})
		},
		methods:{
			//定位
			map(){
				let that=this;
				uni.chooseLocation({
					success: function (res) {
						// console.log('位置名称：' + res.name);
						// console.log('详细地址：' + res.address);
						// console.log('纬度：' + res.latitude);
						// console.log('经度：' + res.longitude);
						setTimeout(function() {
							uni.showToast({
								title:"定位成功",
								icon:"none"
							})
						}, 200);
						
						that.latitude=res.latitude;//纬度
						that.longitude=res.longitude;//经度
					}
				})
			},
			//检测用户名是否存在
			checkUserName(e){
			
				let that=this;
				that.$ajax({
					url:"/channelManagementRest/checkExistsAccountName",
					data:{
						accountName:e.detail.value,
						marchantId:that.marchantId||null
					},
					success(d){
						
					}
				})
			},
			
			   bindPickerChanges: function(e) {
				   
				  that.index = e.detail.value
				  console.log("当前的index是"+that.index);
				  //that.changeid=e.target.id;
				 console.log("你好,currentTarget方式获取的id是"+e.currentTarget.dataset.id);
				  
				  //that.index6= e.detail.value
				console.log("你好,当前的id是"+that.objectArray[that.index].id);
				  //that.newKuaiCompaNum=that.objectArray2[that.index6].no;
				  //that.kuaidiName=that.objectArray2[e.target.value].com;
				  		  
				  if(e.detail.value==0)
				  {
					  that.myflag1=true;
					  that.myflag2=false;
					  that.myflag3=false;
					  //选择的是小微商户自收款的用户身份
					  console.log("你好,你选择的是小微商户自收款");
					  that.businessIdentity=1;
					  that.isFront=1;//如果是小微商户自收款,则线下支付必须要,所以that.isFront必须为1
					  that.index3=0;
					  that.payment=2;//支付方式必须改为普通支付
					  that.index2=1;
					  that.myFlag100=true;
					  that.myFlag101=true;
					  // that.$nextTick(function(){
					  // 	that.$refs.mypicker1.disabled="disabled";
					  // });
					  // that.$nextTick(function(){
					  // 	that.$refs.mypicker2.disabled="disabled";
					  // });
					 
				  }else if(e.detail.value==1){
					  that.myflag1=false;
					  that.myflag2=true;
					  that.myflag3=false;
					  that.myflag6=true;
					  that.myFlag100=false;
					  that.myFlag101=false;
					  //选择的是特约商户自收款的用户身份
					  console.log("你好,你选择的是特约商户自收款");
					  that.businessIdentity=2;
					  
				  }else if(e.detail.value==2){
					  that.myflag1=false;
					  that.myflag2=false;
					  that.myflag3=true;
					  that.myflag6=true;
					  that.myFlag100=false;
					  that.myFlag101=false;
					  //选择的是特约商户代收款的身份
					  console.log("你好,你选择的是特约商户代收款");
					that.businessIdentity=3;
				  }
				 // console.log('可以传data-xx:xx',e.currentTarget.dataset.index,'\n默认传过来的是下标：',e.detail.value,'\n也可以传普通json传过来的id等：',e.currentTarget.dataset.id);
			 },
			 bindPickerChanges2: function(e) {
			 				   
					  that.index2= e.detail.value
					 console.log("当前的index是"+that.index2);
					 
					  //that.changeid=e.target.id;
					 console.log("你好,currentTarget方式获取的id是"+e.currentTarget.dataset.bindid);
					  
					  //that.index6= e.detail.value
				     console.log("你好,当前的id是"+that.objectArray2[that.index2].id);
				  //that.newKuaiCompaNum=that.objectArray2[that.index6].no;
				  //that.kuaidiName=that.objectArray2[e.target.value].com;	       
				  if(that.index2==0) //说明选择的是联盟支付
				  {
					  console.log("你好,你选择的是联盟支付!!!");
				      that.myflag4=true;
					  that.myflag5=false;
					  that.payment=1;
					  that.myflag6=false;
					  that.myflag7=true;
					  that.linePayRatio="80";
					  
					  console.log("当前的联盟经费是"+that.linePayRatio);
					  
				  }else{//说明选择的是普通支付
				      console.log("你好,你选择的是普通支付!!!");
					  that.myflag4=false;
					  that.myflag5=true;
					  that.payment=2;
					  that.myflag6=true;
					  //当选择的是普通支付的时候,是没有联盟经费的,所以that.myflag7=false,此时联盟经费不显示,并且联盟经费为""
					  that.myflag7=false;
					  that.linePayRatio="0";
					 console.log("当前的联盟经费是"+that.linePayRatio);
				  }
			 				 // console.log('可以传data-xx:xx',e.currentTarget.dataset.index,'\n默认传过来的是下标：',e.detail.value,'\n也可以传普通json传过来的id等：',e.currentTarget.dataset.id);
			 },
			 
			 bindPickerChanges3:function(e) {
			 				   
					 that.index3= e.detail.value
				     console.log("当前的index是"+that.index3);
				  //that.changeid=e.target.id;
				     console.log("你好,currentTarget方式获取的id是"+e.currentTarget.dataset.bindid);			 					  //that.index6= e.detail.value
					 console.log("你好,当前的id是"+that.objectArray3[that.index3].id);
					// 如果选择的是需要线下支付(that.index3==0),则将that.isFront赋值为1,如果不需要,则赋值为2,
					if(that.index3==0)
					{
						console.log("选择的是需要线下支付");
						that.isFront=1;
					}else if(that.index3==1)
					{
						that.isFront=2;
						console.log("选择的是不需要线下支付");
					}
					
					
					

			 },
			 
			 bindPickerChanges4: function(e) {
				   
					 that.index4= e.detail.value
					 console.log("当前的index是"+that.index4);
				  //that.changeid=e.target.id;
					// console.log("你好,currentTarget方式获取的id是"+e.currentTarget.dataset.bindid);			 					  //that.index6= e.detail.value
					 console.log("你好,当前的id是"+that.objectArray4[that.index4].id);
					 if(that.index4==0)
					 {
						 that.linePayRatio="80";
						 console.log("当前的联盟经费是"+that.linePayRatio);
					 }else{
						 that.linePayRatio="150";
						  console.log("当前的联盟经费是"+that.linePayRatio);	
					 }
					 
			 
			 },
			 
			
			//实体店铺的选择
			isFrontArrChange(e){
				console.log("你好,你选择的是"+e.detail.value);
				
				this.isFrontArrIndex=e.detail.value;
				if(e.detail.value==1){
					this.latitude="";//纬度
					this.longitude="";//经度
				}
				if(e.detail.value==0)
				{
					that.existsShop=1;//表示有实体店铺
					console.log("选择的是有实体店铺");
				}else if(e.detail.value==1)
				{
					console.log("选择的是没有实体店铺");
					that.existsShop=2;//表示没有实体店铺
				}
				// this.existsShop=this.isFrontArrIndex;
			},
			//联盟经费修改
			linepayratioChange(e){
				this.linepayratioIndex=e.detail.value;
			},
			shopAddressPChange(e){
				let that=this;
				that.pIndex=e.detail.value;
				that.searchCity();
			},
			// frontChange(e){
			// 	this.frontIndex=e.detail.value;
			// },
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
			checkPhone(phone){
				if(!(/^1[3456789]\d{9}$/.test(phone))){
					return false;
				}
				return true
			},
			/**
			 * 
			* 查询县/区
			* 
			* */
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
			shopAddressChange(e){
				let that=this;
				that.cIndex=e.detail.value;
				that.searchCity();
			},
			shopAddressXChange(e){
				this.xIndex=e.detail.value;
			},
			url(){
				let that=this;
				if(that.shopName&&that.cusPhone&&that.cusNum&&that.contactsName&&that.contactsPhone&&that.shopAddress&&that.companyName){
					if(!that.checkPhone(that.contactsPhone)){
						uni.showToast({
							title:"请填写正确的手机号码",
							icon:"none"
						})
						return
					}
					let obj={
						accountName:that.cusNum||"",//登陆账号1
						address:that.shopAddress,//门店的详细地址2
						companyArea:that.shopAddressX[that.xIndex].code,//门店地址区code3
						companyCity:that.shopAddressC[that.cIndex].code,//门店地址市code4
						companyName:that.companyName,//门店名称,区分于店铺名称5
						companyProvince:that.shopAddressP[that.pIndex].code,//门店地址省code67
						contactsName:that.contactsName,//门店联系人7
						contactsPhone:that.contactsPhone,//门店联系电话8
						existsShop:that.existsShop,//是否有实体店铺9
						servicePhone:that.cusPhone,//客服电话10
						weixin:that.cusWX,//客服微信 11
						shopName:that.shopName,//店铺名称 12
						//displayImg:that.upSrc,//店铺图标13
						shopSN:that.businessAbbreviation,//商户简称14
						idName:that.IDCardName,//身份证姓名15
						idNumber:that.IDCardNumber,//身份证号码16
						idValidTime:that.validateIDTime,//身份证有效期	17		
						marchantType:that.marchantType[that.shopIndex].marchanttypeid,//18 商户经营类型
						linePayRatio:that.linePayRatio,//联盟经费 19
						latitude:that.latitude,//纬度 20
						longitude:that.longitude,//经度 21
						shopIdentity:that.businessIdentity ,//商户身份22
						isFront:that.isFront  ,//线下支付是否需要23
						payment:that.payment,//支付方式 24
						wxServiceFee:that.weixinfeilv,//微信费率25
						wxShopName:that.settledName,//入驻微信的商户全称26
						wxMchid:that.assignNumber,//微信分配的商户号27
						wxPaykey:that.paymentKey //微信支付密钥28
					// 	proName:that.shopAddressP[that.pIndex].proName,//门店地址省名name
					// 	
					// 	cityName:that.shopAddressP[that.pIndex].proName,//门店地址市name
					// 	
					// 
					// 	areaName:that.shopAddressP[that.pIndex].disName,//门店地址区name
					// 
						// linePayRatio:that.linepayratioIndex==0?80:150,
						
					}
					console.log("提交之前的店铺名称shopName是"+that.shopName);//1
					console.log("提交之前的行业类别marchantType是"+that.marchantType[that.shopIndex].marchanttypeid);//2
					console.log("提交之前的displayImg是"+that.upSrc);//3
					console.log("提交之前的客服电话servicePhone是"+that.cusPhone);//4
					console.log("提交之前的客服微信weixin是"+that.cusWX);//5
					console.log("提交之前的是否有实体店铺existsShop是"+that.existsShop);//6
					console.log("提交之前实体店铺的经度longitude是"+that.longitude);//7
					console.log("提交之前实体店铺的纬度latitude是"+that.latitude);//8
					console.log("提交之前的商户简称businessAbbreviation是"+that.businessAbbreviation);//9
					console.log("提交之前的门店地址省companyProvince是"+that.shopAddressP[that.pIndex].code);//10
					console.log("提交之前的门店地址市companyCity是"+that.shopAddressC[that.cIndex].code);//11
					console.log("提交之前的门店地址区companyArea是"+that.shopAddressX[that.xIndex].code);//12
					console.log("提交之前的门店地址companyName是"+that.companyName);//13
					console.log("提交之前的门店详细地址address是"+that.shopAddress);//14
					console.log("提交之前的身份证姓名idName是"+that.IDCardName);//15
					console.log("提交之前的身份证号码idNumber是"+that.IDCardNumber);//16
					console.log("提交之前的身份证有效期idValidTime是"+that.validateIDTime);//17
					console.log("提交之前的联系人contactsName是"+that.contactsName);//18
					console.log("提交之前的联系电话contactsPhone是"+that.contactsPhone);//19
					console.log("提交之前的登陆账号accountName是"+that.cusNum);//20
					console.log("提交之前的线下支付是否需要isFront是"+that.isFront);//21
					console.log("提交之前的支付方式payment是"+that.payment);//22
					// console.log("提交之前的proName是"+that.shopAddressP[that.pIndex].proName);
					// console.log("提交之前的cityName是"+that.shopAddressC[that.cIndex].proName);
					// console.log("提交之前的areaName是"+that.shopAddressP[that.pIndex].disName);
					// console.log("提交之前的微信费率wxServiceFee是"+that.weixinfeilv);
				    console.log("提交之前的微信费率wxServiceFee是"+that.weixinfeilv);//23
					console.log("提交之前的联盟经费linePayRatio是"+that.linePayRatio);//24
					console.log("提交之前的商户身份shopIdentity是"+that.businessIdentity);//25
					console.log("提交之前的wxServiceFee是"+that.weixinfeilv);//26
					console.log("提交之前的wxShopName是"+that.settledName);//27
					console.log("提交之前的wxPaykey是"+that.paymentKey);//28
					console.log("提交之前的wxMchid是"+that.assignNumber);//29
					
					
					if(that.shopName==""||that.cusPhone==""||that.cusWX==""||that.businessAbbreviation==""
					||that.companyName==""||that.shopAddress==""||that.IDCardName==""||that.IDCardNumber==""||that.validateIDTime==""
					||that.contactsName==""||that.contactsPhone==""||that.cusNum==""||that.weixinfeilv=="")
					{
						uni.showToast({
							title:"请保证信息填写完整",
							content:"请保证信息填写完整"
						});
						return;
					}
					
		
					
					obj=JSON.stringify(obj)
					uni.navigateTo({
						url:"enter2?obj="+obj+"&merchantId="+that.merchantId
					})
				}else{
					uni.showToast({
						title:"请填写完整的信息",
						icon:"none"
					})
				}
				
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
			//商品品类
			shopChange(e){
				this.shopIndex=e.detail.value;
				
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
			typeMapper(index){
				let that=this
				
				that.$ajax({
					url:"/channelManagementRest/getSelectMarchantTypeMapper",
					success(d){
						that.marchantType=d;
						if(index){
							for(let i in d){
								
								if(index==d[i].marchanttypeid){
									
									that.shopIndex=i;
									break;
								}
							}
						}
					}
				})
			}
		},
	     
		 onLoad(e){
		 			if(e.id){
		 				this.marchantId=e.id
		 			}
		 			 that=this;
					 // if(that.businessIdentity==1)
					 // {
						//  that.$nextTick(function(){
						//  	that.$refs.mypicker1.disabled="disabled";
						//  });
						//  that.$nextTick(function(){
						//  	that.$refs.mypicker2.disabled="disabled";
						//  });
					 // }
					 if(that.businessIdentity==1)
					 {
						 that.myFlag100=true;
						 that.myFlag101=true;
					 }
					 if(that.isFront==1)
					 {
						 console.log("你好,你选择的是需要线下支付");
					 }
					 // if(that.isFront==1)
					 // {
						//  that.$nextTick(function(){
						//  	that.$refs.lianmenView.style.display="none";
						//  	that.$refs.zhifuView.style.display="none";
						//  })
					 // }
					 
		 			if(that.marchantId){
		 				that.$ajax({
		 					url:"/channelManagementRest/getSelectMarchantInfo",
		 					data:{
		 						marchantId:that.marchantId
		 					},success(d){
		 						that.shopName=d.shopName;
		 						that.upSrc=d.displayImg;
		 						that.cusPhone=d.servicePhone;
		 						//that.qq=d.qq;
		 						that.cusWX=d.weixin;
		 						that.cusNum=d.accountName||"";
		 						that.companyName=d.companyName;
		 						that.companyProvince=d.companyProvince;
		 						that.companyCity=d.companyCity;
		 						that.companyArea=d.companyArea;
		 						that.shopAddress=d.address;
		 						that.contactsName=d.contactsName;
		 						that.contactsPhone=d.contactsPhone;
		 						that.frontIndex=d.isFront*1-1;
		 						that.existsShop=d.existsShop;
		 						that.latitude=d.latitude||"",//纬度
		 						that.longitude=d.longitude||"",//经度
		 						that.linepayratioIndex=d.linePayRatio==80?0:1;
		 						that.businessAbbreviation=d.shopSN //商户简称
		 						that.IDCardName=d.idName //身份证姓名
		 						that.IDCardNumber=d.idNumber //身份证号码
		 						that.validateIDTime=d.idValidTime //身份证有效期
		 						that.payment=d.payment
		 						that.weixinfeilv=d.wxServiceFee
		 						that.businessIdentity=d.shopIdentity
		 						that.isFront=d.isFront
		 						that.linePayRatio=d.linePayRatio
		 						that.settledName=d.wxShopName
		 						that.assignNumber=d.wxMchid
		 						that.paymentKey=d.wxPaykey
		 						that.typeMapper(d.marchantType)
		 						that.ProvinceList(d);
		 					}
		 				})
		 							
		 			}else{
		 				that.typeMapper()
		 				that.ProvinceList();
		 			}
		 		}
	
	
	
	
	
	}
</script>

<style scoped>
	.noneClass{
	
	}
	.displayClass{
		/* display:block; */
	}
	.addArrow{
		display:inline;
		vertical-align:middle;
		position:relative;
		top:-5upx;
	}
	.content{
		padding: 0;
		background: #F2F2F2;
	}
	.content>view{
		background: #fff;
		padding:30upx;
		margin-bottom: 40upx;
	}
	.mylist > picker{
		border:none;
		border:1px solid rgba(0,0,0,0.18);
		width:260upx;
	}
	.border picker{
		width:500upx;
	}
	.content>view>view{
		margin-bottom: 20upx;
		font-size: 26upx;
	}
	.newShopColumn{
		color:rgba(0,0,0,0.66);margin-left:100upx;margin-right:80upx;margin-top:-30upx;
	}
	.title{
		padding-left: 17upx;
		border-left:5upx solid #EE3535;
		font-size: 28upx;
		color:#333;
	}
	.firstLine{
		font-size:28upx;
		display:inline-block;
		vertical-align:middle;
		color:rgba(0,0,0,0.48);
		margin-left:130upx;
		margin-top:-40upx;
	}
	.firstLine1{
		display:inline-block;
		vertical-align:middle;
		visibility:hidden;
	}
	.firstLine2{
		margin-top:15upx;
		display:inline-block;
		border:1px solid rgba(0,0,0,0.26);
		width:200upx;
		height:50upx;
		line-height:50upx;
		margin-left:20upx;
		border-radius:10upx;
		text-align:center;
		vertical-align:middle;
	}
	input{
		width:400upx;
		border-bottom:1px solid #eee;
		display: inline-block;
		vertical-align: middle;
	}
	.addImg{
		width:100upx;
		height:100upx;
		vertical-align: top;
		margin-right: 10upx;
	}
	.grey{
		color:#999;
		vertical-align: bottom;
		position: relative;
		bottom: -32px;
	}
	.content text{
		margin-right: 10upx;
	}
	picker view{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	picker{
		vertical-align: middle;
		display: inline-block;
		width:160upx;
		padding-left: 10upx;
		margin-right: 10upx;
		border-radius: 10upx;
		height: 60upx;
		line-height:60upx;
		position: relative;
		border:1px solid #eee;
	}
	.uni-icon{
		position: absolute;
		top:15upx;
		right: 20upx;
	}
	picker input{
		border:none;
	}
	.isFront{
		position: relative;
	}
	.isFront picker{
		width:380upx;
	}
	.isFront .uni-icon{
		right:140upx;
	}
	.isFront .position{
		margin-left: 40upx;
	}
	button{
		width: 525upx; 
		height:72upx;
		line-height: 72upx;
		font-size: 30upx;
		text-align: center;
		background: #EE3535;
		color:#fff;
		outline: none;
		border:none;
		margin-bottom: 20upx;
	}
	uni-button:after,uni-button:before{
		border:none;
	}
	.inline>view{
		display: inline-block;

		margin-bottom: 20upx;
	}
    .inline>view view{
		width:118upx;
		line-height: 60upx;
	}
	.inlineTextBn{
		display:inline-block;
		vertical-align:middle;
	}
	.inlineTextBn2{
		margin-left:20upx;
	}
</style>
