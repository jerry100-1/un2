<template>	
	<view>

	   <view class="content">
		   
		   <view class="" style="height:60upx;width:100%;background:#00BFFF;position:fixed;top:0;z-index:10;overflow:hidden;">
				<view  style="width:25%;color:#fff;float:left">
				<!-- 	<image src="../../static/logo@2x.png" alt="" class="logo" style="width:52upx;
		margin-top:0upx;
		height: 52upx;"></image> -->
		  <!-- <view class="uni-icon-arrowdown" style="color:red;font-size:30upx;"></view> -->
				<!-- <strong><icon type="success" size="26"/></strong>
				 <view class="uni-icon-arrowdown" style="color:red;font-size:30upx;"></view> -->
		       	 <!-- <image src="../../static/addImg/icon_home1.png" mode=""></image>	 -->
				 <!-- &lt; -->
				   <!-- <image src="" mode=""></image> -->
				   <text class="iconfont icon-xiangzuojiantou" style="font-size:150%;position:relative;top:15upx;"  @click="goBack"></text>
				   <!-- <image @click="goBack" class="leftArrowImg" src="../../static/wwe.png" mode="" style="margin-top:10upx"></image> -->
				   <!-- <i class="uni-btn-icon"></i> -->
				</view>
				<view  style="float:left;width:50%;height:60upx;margin-top:-10upx;text-align:center;line-height:80upx;color:#fff;font-size:30upx;">
					商户简介
				</view>
			
			   <view @tap="firstAddMed" style="float:right;width:25%;height:80upx;margin-top:10upx;color:#fff;text-align:center;font-size:30upx;"   class="rightTextMsg">
				   保存
			   </view>
			  
		   </view>
		   
		   
			<view style="margin-top:110upx;">
					<view class="title">店铺信息</view>
					
					<view class="shopItemRespe">
						<text style="display:inline-block;vertical-align:middle;">店铺名称</text>
						<input type="text" class="InputShuRu" v-model="shopName"   style="display:inline-block;vertical-align:middle;width:60%;"/>
					</view>
					
					<view class="shopItemRespe">
						<text style="display:inline-block;vertical-align:middle;">实体店铺</text>
						
						<view class="uni-list" style="display:inline-block;vertical-align:middle;margin-left:30upx;border:1px solid rgba(0,0,0,0.26);padding:5upx 60upx;">
							   <view class="uni-list-cell">
								   <view class="uni-list-cell-db">
									   <picker @change="bindPickerChange" :value="index" :range="array">
										   <view class="uni-input" style="display:inline-block;vertical-align:middle;">{{array[index]}}</view>
										   <text class="iconfont icon-iconset0417" style="display:inline-block;vertical-align:middle;margin-left:50upx;margin-top:5upx"></text>
									   </picker>
								  </view>
							  </view>
			            </view>
							
						<!-- <select class="shopStatus">
							<option value="有">有</option>
							<option value="无">无</option>
						</select> -->
					</view>
					<!-- 公司地址 -->
					<view class="shopItemRespe">
						<text style="display:inline-block;vertical-align:middle;">门店地址</text>
					  
					  <picker class="ssqpicker"   :range="shopAddressP" @change="shopAddressPChange" range-key="proName">
						<view style="display:inline-block;vertical-align:middle;">{{shopAddressP[pIndex].proName}}</view>
						<text  class="iconfont icon-iconset0417" style="display:inline-block;vertical-align:middle;margin-left:6upx;margin-top:5upx"></text>
					  </picker>
					  <picker class="ssqpicker"   :range="shopAddressC" @change="shopAddressChange" range-key="proName">
						<view style="display:inline-block;vertical-align:middle;">{{shopAddressC[cIndex].proName}}</view>
						<text  class="iconfont icon-iconset0417" style="display:inline-block;vertical-align:middle;margin-left:6upx;margin-top:5upx"></text>
					  </picker>
					  <picker class="ssqpicker"   :range="shopAddressX" @change="shopAddressXChange" range-key="disName">
						<view style="display:inline-block;vertical-align:middle;">{{shopAddressX[xIndex].disName}}</view>
						<text  class="iconfont icon-iconset0417" style="display:inline-block;vertical-align:middle;margin-left:6upx;margin-top:5upx"></text>
					  </picker>
					  
					  
					  <uni-icon type="location" size="16" @tap="map" v-show="isFrontArrIndex==0"></uni-icon>
					  <text class="position" @tap="map" v-show="isFrontArrIndex==0" style="font-size:20upx;">定位</text>
					 
					  
					
					</view>
					
					<view class="shopItemRespe">
						<text style="display:inline-block;vertical-align:middle;">详细地址</text>
						<input class="InputShuRu" type="text" v-model="detailAddress"  style="display:inline-block;vertical-align:middle;width:60%"/>
					</view>
					
					<view class="shopItemRespe">
						<text style="display:inline-block;vertical-align:middle;">人均消费</text>
						<input class="InputShuRu" type="number" v-model="personConsume"  style="display:inline-block;vertical-align:middle;width:60%;"/>元
					</view>
					
					<view class="shopItemRespe" style="padding-bottom:40upx">
						<view style="display:block;float:left;">营业时间</view>
							
						<view class="uni-list lefttime" style="display:inline-block;float:left;">
							<view class="uni-list-cell">
								<view class="uni-list-cell-db" >
									<picker mode="time" :value="time1" start="09:01" end="23:01"  @change="bindTimeChange">
										<view class="uni-input">{{time1}}</view>
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
	
					</view>
					
				
					
					<view class="shopItemRespe" style="margin-top:40upx">
						<text style="display:inline-block;vertical-align:middle;">客服电话</text>
						<input class="InputShuRu" type="number" v-model="phoneNum" style="display:inline-block;vertical-align:middle;width:60%;"/>
					</view>
					
					<view class="shopItemRespe">
						<text style="display:inline-block;vertical-align:middle;">客服微信</text>
						<input class="InputShuRu" type="text" v-model="customWeiXin" style="display:inline-block;vertical-align:middle;width:60%;"/>
					</view>
						
					<view class="shopItemRespe">
						<text>店铺整体图标</text>
						<image :src="upSrc||defSrc" class="addImg"  @tap="proImgsChoose"></image>
						<text class="grey">上传正方形图片,大小不超过1M</text>
					</view>
					
					
					<!-- <view class="shopItemRespe">
						<text>店内环境照片</text>
						<image :src="upSrc2||defSrc2" class="addImg"  @tap="proImgsChoose2"></image>
						<text class="grey">上传正方形图片,大小不超过1M</text>
					</view> -->
					
					
					
					<view style="margin-top:20upx;">
						<text>店内环境照片</text>
						<view class="right" style="margin-left:100upx;">
							<view  class="imgs" v-for="(item,index) in proImgs" v-if="proImgs.length>0" :key="index">
								<image  :src="item"></image>
								<view @tap="del(index,1)" class="del">删除</view>
							</view>
							<image style="display:inline-block;width:160upx;height:160upx;" src="../../static/capital/my_add_image@2x.png" @tap="proImgsChoose3(1)" ></image>
						</view>
						
						<view class="textInfo" style="margin-left:120upx;margin-right:60upx;margin-top:20upx;">
							<text>上传商品图片,图片支持jpg,gif,png格式</text>
							<text class="color">建议使用尺寸800x800像素以上,大小不超过1M的正方形图片;</text>
						</view>
					</view>
					
					
					
					
					
					
					
					
					
					
					
					
				</view>
			
	    </view>		
	
	        <view class="content" style="margin-top:-20upx;">
				<view>
					<view class="title">门店服务</view>
					
					<view class="WrapSmallShop">
						<!-- 空调是否开放 -->
						  <view class="smallItem" >
							  <view class="smallItemLeft">
									  <checkbox-group class="inlines"    @change="expressFun1">
												<label>
													<checkbox :checked="check1" value="cb1"  />
												</label>
											
									  </checkbox-group>
									
							  </view>
							  <view class="smallItemRight">空调开放</view>
						  </view>
						 <!-- 是否支持wifi -->
						  <view class="smallItem" >
								  <view class="smallItemLeft">
										  <checkbox-group class="inlines"    @change="expressFun2">
													<label>
														<checkbox :checked="check2" value="cb2"  />
													</label>
												
										  </checkbox-group>
										
								  </view>
								  <view class="smallItemRight">支持wifi</view>
						  </view> 
						  
						  <!-- 是否支持手机充电 -->
						   <view class="smallItem" >
								  <view class="smallItemLeft">
										  <checkbox-group class="inlines"    @change="expressFun3">
													<label>
														<checkbox :checked="check3" value="cb3"  />
													</label>
												
										  </checkbox-group>
										
								  </view>
								  <view class="smallItemRight">手机充电</view>
						  </view> 
						  
						  <!-- 是否支持快递包邮 -->
						  <view class="smallItem" >
								  <view class="smallItemLeft">
										  <checkbox-group class="inlines"    @change="expressFun4">
													<label>
														<checkbox :checked="check4" value="cb4"  />
													</label>
												
										  </checkbox-group>
										
								  </view>
								  <view class="smallItemRight">送货到家</view>
						  </view> 
						  
						  
						  <!-- 是否有停车位 -->
						  <view class="smallItem" >
								  <view class="smallItemLeft">
										  <checkbox-group class="inlines"    @change="expressFun5">
													<label>
														<checkbox :checked="check5" value="cb5"  />
													</label>
												
										  </checkbox-group>
										
								  </view>
								  <view class="smallItemRight">停车位</view>
						  </view>
						  
						 <!-- 是否提供发票 -->
						  <view class="smallItem" >
								  <view class="smallItemLeft">
										  <checkbox-group class="inlines"    @change="expressFun6">
													<label>
														<checkbox :checked="check6" value="cb6"  />
													</label>
												
										  </checkbox-group>
										
								  </view>
								  <view class="smallItemRight">提供发票</view>
						  </view> 
						 
					</view>
				</view>
				
				
		</view>
	
	
	
	        <view class="content" style="margin-top:-20upx;">
				<view>
					<view class="title">商户介绍</view>
					<view class="shopItemRespe">
						<text>商户介绍</text>
						<textarea maxlength="100000000"  style="font-size:30upx;" class="shItRespeTextArea"  v-model="customerDescribtion" />
					</view>
											
				</view>	
	       					
	       </view> 
	
	
			 <view class="content" style="margin-top:-20upx;">
					<view>
						<view class="title">分店信息</view>
						<view class="rigText" @click="addBranchStore" >
							新增分店
						</view>
						
						
				<view   class="wrapAllShopArray" id="wrapAllShopArray" v-for="(item,index100) in marchantBranchStroe" :key="index100">	

						
						<!-- <view class="shopItemRespe">
							<text>信息如下:</text>
							<view style="float:right;width:80upx;height:40upx;background:#00BFFF;color:#fff;text-align:center;line-height:40upx;" :data-index100="index100" @click="delTheImg">删除</view>
						</view> -->
						
						<view class="shopItemRespe">
							<text style="display:inline-block;vertical-align:middle;">店铺名称</text>
							<input class="InputShuRu" style="display:inline-block;vertical-align:middle;width:60%;" type="text"  v-model="item.storeName"/>
						</view>
						
						
						<!-- 公司地址 -->
						<view class="shopItemRespe">
							<text>分店地址</text>
							<br>
							<view style="display:flex;flex-direction:row;align-items:center;">
								<view style="flex:1;white-space:nowrap;">
								   <input class="InputShuRu" type="text"  v-model="item.storeProvince" style="display:inline-block;vertical-align:middle;"/>
								   <text style="font-size:30upx;display:inline-block;vertical-align:middle;">省</text>
								</view>
								<view style="flex:1;white-space:nowrap;">
									<input class="InputShuRu" type="text" v-model="item.storeCity" style="display:inline-block;vertical-align:middle;"/>
								  <text style="font-size:30upx;display:inline-block;vertical-align:middle;">市</text>
								</view>
								<view style="flex:1;white-space:nowrap;">
									<input class="InputShuRu" type="text"  v-model="item.stroeArea" style="display:inline-block;vertical-align:middle;"/>
								  <text style="font-size:30upx;display:inline-block;vertical-align:middle;">区</text>
								</view>
							</view>
							<!-- <picker class="ssqpicker"   :range="shopAddressP2" @change="shopAddressPChange2" range-key="proName">
									<view>{{shopAddressP2[pIndex2].proName}}</view>
							</picker>
							<picker class="ssqpicker"   :range="shopAddressC2" @change="shopAddressChange2" range-key="proName">
									<view>{{shopAddressC2[cIndex2].proName}}</view>
							</picker>
							<picker class="ssqpicker"   :range="shopAddressX2" @change="shopAddressXChange2" range-key="disName">
									<view>{{shopAddressX2[xIndex2].disName}}</view>
							</picker> -->
						</view>
						
						
						<view class="shopItemRespe">
							<text style="display:inline-block;vertical-align:middle;">分店详细地址</text>
							<input class="InputShuRu" type="text" style="display:inline-block;vertical-align:middle;width:60%;" v-model="item.storeAddress" />
						</view>
						

						<view class="shopItemRespe">
							<text style="display:inline-block;vertical-align:middle;">客服电话</text>
							<input class="InputShuRu" type="text" v-model="item.storeServicePhone" style="display:inline-block;vertical-align:middle;width:60%;"/>
						</view>

					    <view style="border:1px dashed #00BFFF;margin-top:40upx;"></view>
					
				</view>		
					
					
					
					
					
					</view>	
					
					
					
			 </view>			
	       
	
	
	
		</view>	
	
</template>

<script>
	// import uniIcon from "../../components/uni-icon/uni-icon.vue"
		// import {uniIcon,uniCard,uniPagination,uniCalendar,uniCollapse,uniCollapseItem,uniDrawer} from '@dcloudio/uni-ui'
	
	import uniIcon from "@/components/uni-icon/uni-icon.vue"

	var that="";
	export default{
		data(){
			return{
				
				isFrontArrIndex:0,
				
				upSrc:"",
				defSrc:"../../static/capital/my_add_image@2x.png",
				upSrc2:"",
				defSrc2:"../../static/capital/my_add_image@2x.png",
				consume:"",
			    shopName:"",
				
				
				proImgs:[],//店内环境照片
				
				
				shopAddress:{},//原地址信息
				shopObj:{},
				shopObj2:{},
				check1:false,
				check2:false,
				check3:false,
				check4:false,
				check5:false,
				check6:false,
				mychoose1:0,
				mychoose2:0,
				mychoose3:0,
				mychoose4:0,
				mychoose5:0,
				mychoose6:0,
				hasShopOrNot:1,//是否有实体店铺
				shopAddressP:[{proName:""},{code:""}],//公司地址省
				pIndex:0,
				shopAddressC:[{proName:""},{code:""}],//公司地址市
				cIndex:0,
				shopAddressX:[{proName:""},{code:""}],//公司地址
				xIndex:0,
				fenShopName:"",//分店店铺名称
				shopAddressP2:[{proName:""},{code:""}],//分店地址省
				pIndex2:0,
				shopAddressC2:[{proName:""},{code:""}],//分店地址市
				cIndex2:0,
				shopAddressX2:[{proName:""},{code:""}],//分店地址区
				xIndex2:0,
				index: 0,
				submitProvince:"",//省----表示省
				submitProvinceCode:"",
				submitCity:"",//市---------表示市
				submitCityCode:"",
				submitArea:"",//区--------表示区
				submitAreaCode:"",
				marchantIntroduceId:"",
			    personConsume:"",//人均消费
				array: ['有', '无'],
				isCheck:false,
				expressConfig:1,
				expressConfig1:"",
				marchantBranchStroe:[
					{
						"storeName":"",
						"storeAddress":"",
						"storeServicePhone":"",
						"storeProvince":"",
						"storeCity":"",
						"stroeArea":""
					}
					
				],
	
				expressConfig2:"",
				expressConfig3:"",
				expressConfig4:"",
				expressConfig5:"",
				expressConfig6:"",
				expressConfigArray:[],
				phoneNum:"",
				customerDescribtion:"",
				detailAddress:"",//详细地址
				time1: '12:01',
				time2:"09:10",
				customWeiXin:"",
				customerPhone:"",
				shopNameMsg:"",//分店店铺名称
				shopPictures:"",//门店门头照片
				shopEnvironment:"",//店内环境照片
				isAirConditioner:0,//门店服务-空调
				isDelivery:0,//门店服务--送货到家
				isInvoices:0,//门店服务--提供发票
				isMobileCharge:0,//门店服务,手机充电
				isPacking:0,//门店服务停车位
				isWifi:0 ,//门店服务wifi
				fencustomerPhone:"" ,//分店客户电话	
				storeProvinceCode:"",
				storeCityCode:"",
				stroeAreaCode:"",
				storeProvince:"",//分店省
				storeCity:"",//分店市
				stroeArea:"",//分店区
				storeAddress:"",
				
				latitude:"",//店铺经度
				longitude:"",//店铺纬度
				
				
			}
		},

		onShow(){
			// let that=this;
			// that.$ajax({
			// 	url:"/merchant/returnAddress",
			// 	data:{
			// 		merchantId:that.shopObj.merchantId,
			// 	},success(d){
			// 		that.shopAddress=d;
			// 		console.log(d,"d");
			// 		that.searchP(1)
			// 	}
			// })
		},
		onLoad(e){		

			that=this;
			
			that.time=new Date().getTime()
			//let that=this;
			uni.getStorage({
				key:"shopObj",
				success(res){
						console.log(res)
						that.shopObj=JSON.parse(res.data);
						that.merchantId=that.shopObj.merchantId;
						console.log("你好,我获取的shopObj是"+that.shopObj)
						console.log("你好,我获取的mechardId是"+that.shopObj.merchantId);
				
					}
					
			});
			if(e.id){
				this.marchantId=e.id
			}
			that.getTheShopMsg();
			// uni.getStorage({
			// 	key:"shopObj",
			// 	success(res){
			// 		that.shopObj=JSON.parse(res.data);
			// 	}
			// })
		    console.log("********************你好,得到的upSrc*************是"+that.upSrc);
			// console.log("********************你好,得到的upSrc2是***************"+that.upSrc2);
			
		},
		components:{
			uniIcon
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
						console.log("你好,定位的经度是"+that.latitude);
						console.log("你好,定位的纬度是"+that.longitude);
					}
				})
			},
			
			
			
			
			
			delTheImg:function(e)
			{
				console.log("你好,当前的index是"+e.currentTarget.dataset.index100);
				console.log("你好,你点击了删除按钮");
				that.marchantBranchStroe.splice(e.currentTarget.dataset.index100,1);
			},
			addBranchStore:function()
			{
				if(that.marchantBranchStroe.length>4)
				{
					uni.showToast({
						title:"最多5个",
						content:"最多5个"
					});
					//yubaotangreturn;
				}else{
					that.marchantBranchStroe.unshift({
						"storeName":"",
						"storeAddress":"",
						"storeServicePhone":"",
						"storeProvince":"",
						"storeCity":"",
						"stroeArea":""
					});
					console.log("xinzengzhihoudayinkankan"+that.marchantBranchStroe.length);
					console.log("xinzengzhihoudayinkankan"+that.marchantBranchStroe);
					
				}	
				for(var i=0;i<that.marchantBranchStroe.length;i++)
				{
					console.log("mingzishi ----"+that.marchantBranchStroe[i].storeName);
				}
				
				
				     console.log("你点击了新增分店按钮!"+that.marchantBranchStroe.length);   
				           //动态创建第1个view
			// 			   var vw1=document.createElement("view");//动态创建第1个view
			// 	  　　　　//设置 div 属性，如 id
			// 	  　　　　   vw1.setAttribute("class", "shopItemRespe");//动态创建上面元素的类名
			// 				var vwt1=document.createElement("text");//动态创建文本框
			// 				vwt1.innerHTML = "店铺名称";//设置文本框的值是 "店铺名称"
			// 				var vbr1=document.createElement("br");//动态创建文本框
			// 				var wasa=document.getElementById("wrapAllShopArray");//获取父级元素
			// 				wasa.parentNode.appendChild(vw1);//将第1个动态创建的元素添加到父级元素中
			// 				vw1.parentNode.appendChild(vwt1);
			// 				var vwin1=document.createElement("input"); //动态创建文本框
			// 				vwin1.type="text";//设置文本框的类型
			// 				// vwin.class="InputShuRu";//设置文本框的类名
			// 				vw1.parentNode.appendChild(vwin1);
			// 				vw1.parentNode.appendChild(vbr1);
			// 				vwin1.setAttribute("class","InputShuRu");
			// 				// vwin.value="动态添加的文本框"; 
			// 			
			// 		        //动态创建第2个view
			// 				var vw2=document.createElement("view");//动态创建第2个view
			// 				　　　　//设置 div 属性，如 id
			// 				vw2.setAttribute("class", "shopItemRespe");//动态创建上面元素的类名
			// 				
			// 				var vwt2=document.createElement("text");//动态创建文本框
			// 				vwt2.innerHTML = "分店地址";//设置文本框的值是 "店铺名称"
			// 				var vbr2=document.createElement("br");//动态创建文本框
			// 				var vwin2=document.createElement("input"); //动态创建文本框
			// 				vwin2.type="text";//设置文本框的类型
			// 				// vwin.class="InputShuRu";//设置文本框的类名
			// 				vwin2.setAttribute("class","InputShuRu");
			// 				// vwin.value="动态添加的文本框"; 
			// 				wasa.parentNode.appendChild(vw2);//将第1个动态创建的元素添加到父级元素中
			// 				vw2.parentNode.appendChild(vwt2); 		
			// 				vw2.parentNode.appendChild(vwin2);
			// 				vw2.parentNode.appendChild(vbr2);
			// 				//动态创建第3个view
			// 				var vw3=document.createElement("view");//动态创建第3个view
			// 				//设置 view 属性，如 id
			// 				vw3.setAttribute("class", "shopItemRespe");//动态创建上面元素的类名
			// 				var vwt3=document.createElement("text");//动态创建文本框
			// 				vwt3.innerHTML = "客服电话";//设置文本框的值是 "店铺名称"
			// 				var vbr3=document.createElement("br");//动态创建文本框
			// 				var vwin3=document.createElement("input"); //动态创建文本框
			// 				vwin3.type="text";//设置文本框的类型
			// 				// vwin.class="InputShuRu";//设置文本框的类名
			// 				vwin3.setAttribute("class","InputShuRu");
			// 				// vwin.value="动态添加的文本框"; 
			// 				wasa.parentNode.appendChild(vw3);//将第3个动态创建的元素添加到父级元素中
			// 				vw3.parentNode.appendChild(vwt3); 		
			// 				vw3.parentNode.appendChild(vwin3);
			// 				vw3.parentNode.appendChild(vbr3);
			// 
			// 		         var br4=document.createElement("br");//动态创建文本框
			// 		         wasa.parentNode.appendChild(br4);//将第3个动态创建的元素添加到父级元素中
			// 		
					//         var ssf=document.getElementsByClassName("wrapAllShopArray")[0];         
     //                        var newli=ssf.cloneNode(true);
					//         document.body.parentNode.appendChild(newli);
					// 
					
					// <view class="shopItemRespe">
					// 	<text>分店地址</text>
					// 	<input class="InputShuRu" type="text"  value="第一家分店地址"/>
					// </view>
					// 
					// 
					
					
					
					
				
		  // 　　　　div.innerHTML = "js 动态添加div";
		  // 　　　　parent.appendChild(div);			   
				 
			   
			},
			 bindPickerChange: function(e) {         
				  this.index = e.target.value	  
				  console.log('你好,picker发送选择改变，携带值为', e.target.value);
				  console.log('你好,picker发送选择改变，携带值转化为字符串是', that.array[e.target.value]);
			       //如果选择的是有实体店铺,将变量赋值为1,否则赋值为2
				   //1有2无
				   if(this.index==0)
					 {
						 that.hasShopOrNot=1;//表示有实体店铺
					 }else if(this.index==1)
					 {
						 that.hasShopOrNot=2;//表示无实体店铺
					 }
			  },
			
			  getTheShopMsg:function()
			  {
				  that.$ajax({
				  	url:"/channelManagementRest/getSelectMarchantIntroduce",
				  	data:{
				     marchantId:that.shopObj.merchantId
				  	},success(d){
				         console.log("第一次请求展示数据信息数据接口成功!!!");
						 
						 console.log("你好,这是拿到分店的省区的code,省是"+d.storeProvince);
						 console.log("你好,这是拿到分店的市区的code,市是"+d.storeCity);
						 console.log("你好,这是拿到分店的辖区的code,辖是"+d.stroeArea);
						 
				  		 console.log(d);
						 that.shopName=d.shopName||"";
						 that.hasShopOrNot=d.entityShop;//有无实体店铺
						 if(d.entityShop==1)
						 {
							 that.hasShopOrNot=1;
							 that.index=0;
						 }else{
							 that.hasShopOrNot=2;
							 that.index=1;
						 }
						 that.shopAddress=d
						 that.marchantBranchStroe=JSON.parse(d.marchantBranchStroe)||[];
                         console.log("nihao------------------------"+that.marchantBranchStroe.length);
						// that.marchantBranchStroe =that.marchantBranchStroe;
						//console.log(that.marchantBranchStroe[0],"dfd");
						 console.log(typeof that.marchantBranchStroe);
						 that.submitProvinceCode=d.province;
						 that.submitCityCode=d.city;
						 that.submitAreaCode=d.area;
						 that.marchantIntroduceId=d.marchantIntroduceId;
						 that.isAirConditioner=d.isAirConditioner||0;
						 that.isDelivery=d.isDelivery||0;
						 that.isInvoices=d.isInvoices||0;
						 that.isMobileCharge=d.isMobileCharge||0;
						 that.isPacking=d.isPacking||0;
						 that.isWifi=d.isWifi||0;
						 //获取分店信息
						 console.log("你好,我拿到的provinceCode是"+d.province);
						 console.log("你好,我拿到的cityCode是"+d.city);
						 console.log("你好,我拿到的areaCode是"+d.area);
						 // that.shopAddressP[that.pIndex].code=d.province;
						 // that.shopAddressC[that.cIndex].code=d.city;
						 // that.shopAddressX[that.xIndex].code=d.area;
						 // that.shopAddressP.code=d.province;
						 // that.shopAddressP.code=d.city;
						 // that.shopAddressP.code=d.area;
						 // that.storeProvinceCode=d.storeProvince;
						 // that.storeCityCode=d.storeCity;
						 // that.stroeAreaCode=d.stroeArea;
						 that.storeAddress=d.storeAddress||"";
						 that.storeProvinceCode=d.storeProvince;
						 that.storeCityCode=d.storeCity;
						 that.stroeAreaCode=d.stroeArea;
						 //that.marchantBranchStroe=JSON.parse(d.marchantBranchStroe);
						 
						 
						 //空调是否开放
						 if(that.isAirConditioner==1)
						 {
							 that.check1=true;
						 }else{
							 that.check1=false;
						 }
						 if(that.isWifi==1)
						 {
						 	that.check2=true;
						 }else{
						 	that.check2=false;
						 }
						 if(that.isMobileCharge==1)
						 {
						 	that.check3=true;
						 }else{
						 	that.check3=false;
						 }
						 if(that.isDelivery==1)
						 {
						 	that.check4=true;
						 }else{
						 	that.check4=false;
						 }
						 if(that.isPacking==1)
						 {
						 	that.check5=true;
						 }else{
						 	that.check5=false;
						 }
						 if(that.isInvoices==1)
						 {
						 	that.check6=true;
						 }else{
						 	that.check6=false;
						 }
						 that.upSrc=d.storesPicture;
						// that.shopPictures=that.upSrc;
						// that.upSrc2=d.stopPrice;//店内环境照片
						 	 console.log("你好,页面初始化的时候得到的proImgs是"+d.stopPrice);
						// that.proImgs=JSON.parse(d.stopPrice)||[];
						//that.proImgs=JSON.parse(d.stopPrice)||[];
						 //that.shopEnvironment=that.upSrc2;
					      that.proImgs=d.stopPrice;
                         console.log("%%%%%%%%%%%得到的upSrc是"+that.upSrc);
						 console.log("%%%%%%%%%%%得到的upSrc2是"+that.upSrc2);
						 that.personConsume=d.perConserme||"";//人均消费
						 that.time1=d.businessHoursStart||"12:01";
						 that.time2=d.businessHoursEnd||"09:12";
						 that.detailAddress=d.address||"";
						 that.phoneNum=d.servicePhone||"";
						 that.longitude=d.longitude||"";
						 that.latitude=d.latitude||"";
						 that.customWeiXin=d.serviceWeixin||"";
						 that.customerDescribtion=d.introduce||"";
						 that.fenShopName=d.storeName||"";
						 that.fencustomerPhone=d.storeServicePhone||"";						
						 that.searchP(d);
						 //that.searchP2(d)

				  	}
				  })
			  },
			  firstAddMed:function()
			  {	  
				  
				  console.log(that.marchantBranchStroe,"dsfa");
				  // areaCode: that.shopAddressX[that.xIndex].code,
				  // cityCode: that.shopAddressC[that.cIndex].code,
				  // infoId: that.shopAddress.infoId,
				  // provinceCode: that.shopAddressP[that.pIndex].code,
				console.log("你好---获取的省份name是-------"+that.shopAddressX[that.xIndex].disName);
				console.log("你好---获取的省份name是-------"+that.shopAddressC[that.cIndex].proName);
				console.log("你好----获取的省份name是------"+that.shopAddressP[that.pIndex].proName);
				console.log("你好---获取的省份code是-------"+that.shopAddressX[that.xIndex].code);
				console.log("你好---获取的省份code是-------"+that.shopAddressC[that.cIndex].code);
				console.log("你好----获取的省份code是------"+that.shopAddressP[that.pIndex].code);			  
				console.log("店铺提交之前的省是"+that.shopAddressP[that.pIndex].proName);
				console.log("店铺提交之前的市是"+that.shopAddressC[that.cIndex].proName);
				console.log("店铺提交之前的区是"+that.shopAddressX[that.xIndex].disName);	
				console.log("店铺提交之前的submitProvinceCode是"+that.shopAddressP[that.pIndex].code);
				console.log("店铺提交之前的submitCityCode是"+that.shopAddressC[that.cIndex].code);
				console.log("店铺提交之前的submitAreaCode是"+that.shopAddressX[that.xIndex].code);  
				// console.log("分店提交之前的省是"+that.storeProvince);
				// console.log("分店提交之前的市是"+that.storeCity);
				// console.log("分店提交之前的区是"+that.stroeArea);	
				console.log("分店提交之前的storeProvince是"+that.shopAddressP2[that.pIndex2].proName);
				console.log("分店提交之前的storeCity是"+that.shopAddressC2[that.cIndex2].proName);
				console.log("分店提交之前的stroeArea是"+that.shopAddressX2[that.xIndex2].disName); 
				console.log("分店提交之前的storeProvinceCode是"+that.shopAddressP2[that.pIndex2].code);
				console.log("分店提交之前的storeCityCode是"+that.shopAddressC2[that.cIndex2].code);
				console.log("分店提交之前的stroeAreaCode是"+that.shopAddressX2[that.xIndex2].code); 
				console.log("%%%%%%%%%%%上传的upSrc是"+that.upSrc);
				console.log("%%%%%%%%%%%上传的upSrc2是"+that.upSrc2);	
		        console.log("你好,提交之前的marchantBranchStroe的length是"+that.marchantBranchStroe.length);
					
					for(var i=0;i<that.marchantBranchStroe.length;i++)
					{
						              if(that.marchantBranchStroe[i].storeName=="")
						              {
						              	uni.showToast({
						              		title:"请填写分店名称",
						              		content:"请填写分店名称"
						              	});
						              	return;
						              }
						              if(that.marchantBranchStroe[i].storeAddress=="")
						              {
						              	uni.showToast({
						              		title:"请填写分店详细地址",
						              		content:"请填写分店详细地址"
						              	});
						              	return;
						              }
						              if(that.marchantBranchStroe[i].storeServicePhone=="")
						              {
						              	uni.showToast({
						              		title:"请填写分店联系方式",
						              		content:"请填写分店联系方式"
						              	});
						              	return;
						              }
						              if(that.marchantBranchStroe[i].storeProvince=="")
						              {
						              	uni.showToast({
						              		title:"请填写分店所在省",
						              		content:"请填写分店所在省"
						              	});
						              	return;
						              }
						              if(that.marchantBranchStroe[i].storeCity=="")
						              {
						              	uni.showToast({
						              		title:"请填写分店所在市",
						              		content:"请填写分店所在市"
						              	});
						              	return;
						              }
						              if(that.marchantBranchStroe[i].stroeArea=="")
						              {
						              	uni.showToast({
						              		title:"请填写分店所在区",
						              		content:"请填写分店所在区"
						              	});
						              	return;
						              }
					}
					
				  if(that.shopName=="")
				  {
						  uni.showToast({
							title:"请填写店铺名称!",
							content:"请填写店铺名称!"
						  })
						  return;
				  }
				  if(that.hasShopOrNot=="")
				  {
						uni.showModal({
							title:"请选择是否有实体店铺",
							content:"请选择是否有实体店铺"
						})
				  }
				  if(that.detailAddress=="")
				  {
					  uni.showToast({
						title:"请填写店铺详细地址!",
						content:"请填写店铺详细地址!"
					  })
					  return;
				  }
				  if(that.latitude==""||that.longitude=="")
				  {
						 uni.showToast({
							title:"请进行定位!",
							content:"请进行定位!"
						 })
						 return;
					  
				  }
				  
				  
				  if(that.personConsume=="")
				  {
						  uni.showToast({
							title:"请填写人均消费金额!",
							content:"请填写人均消费金额!"
						  })
						  return;
				  }
				  if(that.time1=="")
				  {
						  uni.showToast({
							title:"请选择营业开始时间!",
							content:"请选择营业开始时间!"
						  })
						  return;
				  }
				  if(that.time2=="")
				  {
						  uni.showToast({
							title:"请选择营业结束时间!",
							content:"请选择营业结束时间!"
						  })
						  return;
				  }
	
				  if(that.phoneNum=="")
				  {
						  uni.showToast({
							title:"请填写客服电话!",
							content:"请填写客服电话!"
						  })
						  return;
				  }
				  if(that.customWeiXin=="")
				  {
						  uni.showToast({
							title:"请填写客服微信!",
							content:"请填写客服微信!"
						  })
						  return;
				  }
				  if(that.upSrc=="")
				  {
						  uni.showToast({
							title:"请上传店铺整体图标!",
							content:"请上传店铺整体图标!"
						  })
						  return;
				  }
			
				  if(that.proImgs=="")
				  {
						  uni.showToast({
							title:"请上传店内环境照片!",
							content:"请上传店内环境照片!"
						  })
						  return;
				  }
				  if(that.customerDescribtion=="")
				  {
					  uni.showToast({
							title:"请填写商户介绍!",
							content:"请填写商户介绍!"
					  })
					  return;
				  }
				//   if(that.fenShopName=="")
				//   {
				// 		  uni.showToast({
				// 				title:"请填写分店店铺名称!",
				// 				content:"请填写分店店铺名称!"
				// 		  })
				// 		  return;
				//   }
				// 
				//   if(that.fenShopName=="")
				//   {
				// 		uni.showToast({
				// 			title:"请填写分店店铺名称!",
				// 			content:"请填写分店店铺名称!"
				// 		})
				// 		return;
				//   }
				  // if(that.fencustomerPhone=="")
				  // {
						// uni.showToast({
						// 	title:"请填写分店客服电话!",
						// 	content:"请填写分店客服电话!"
						// })
						// return;
				  // }
				  // 
				  // if(that.storeAddress=="")
				  // {
						// uni.showToast({
						// 	title:"请填写分店地址!",
						// 	content:"请填写分店地址!"
						// })
						// return;
				  // }
				  
		// 		console.log("你好,这个方法被成功执行到第一行了--------------------");
		// 		console.log("第一个需要提交的参数是shopName,它的值是"+that.shopName);  
		// 		console.log("第二个需要提交的参数是hasShopOrNot,它的值是"+that.hasShopOrNot);  	
		// 		console.log("第三个需要提交的参数是submitProvince,它的值是"+that.submitProvince);
		// 		console.log("第四个需要提交的参数是submitCity,它的值是"+that.submitCity) 
		// 		console.log("第五个需要提交的参数是submitArea,它的值是"+that.submitArea) 
		// 		console.log("第六个需要提交的参数是detailAddress,它的值是"+that.detailAddress);
		// 		console.log("第七个需要提交的参数是personConsume,它的值是"+that.personConsume);
		// 		console.log("第8个需要提交的参数是time1,它的值是"+that.time1);
		// 		console.log("第9个需要提交的参数是time2,它的值是"+that.time2);
		// 		console.log("第10个需要提交的参数是phoneNum,它的值是"+that.phoneNum);
		// 		console.log("第11个需要提交的参数是customWeiXin,它的值是"+that.customWeiXin);
		// 		console.log("第12个需要提交的参数是shopEnvironment,它的值是"+that.shopEnvironment);
		// 		console.log("第13个需要提交的参数是shopPictures,它的值是"+that.shopPictures);	
		// 
		//         console.log("第十四个需要提交的参数是marchantBranchStroe"+that.marchantBranchStroe);
		
		
		console.log("*****************你好,提交的店内环境照片是*******************"+JSON.stringify(that.proImgs));
		
		
		
		
		
				that.$ajax({
					url:"/channelManagementRest/addOrUpdatemarchantIntroduce",
					data:{
					marchantIntroduceId:that.marchantIntroduceId||null,
					shopName:that.shopName, //店铺信息-店铺名称
					entityShop:that.hasShopOrNot,  //实体店铺--有还是无
					province:that.shopAddressP[that.pIndex].code, //门店地址--省
					city:that.shopAddressC[that.cIndex].code, //门店地址--市
					area:that.shopAddressX[that.xIndex].code,//门店地址-区
					latitude:that.latitude,//经度
					longitude:that.longitude,//纬度
					address:that.detailAddress, //门店详细地址
					perConserme:that.personConsume,			 //人均消费
					businessHoursStart:that.time1||"2019-01-01 12:00:00",//营业时间--营业开始时间
					businessHoursEnd:that.time2||"2019-05-06 15:06:12",//营业时间--营业结束时间
					servicePhone:that.phoneNum,	//客服电话
					serviceWeixin:that.customWeiXin,//客服微信
					storesPicture:that.upSrc,	//门店照片
					stopPrice:that.proImgs,//店内环境照片
					isAirConditioner:that.isAirConditioner, //空调是否开放
					isWifi:that.isWifi, //是否支持wifi
					isMobileCharge:that.isMobileCharge,//是否支持手机充电
					isDelivery:that.isDelivery, //是否送货到家
					isPacking:that.isPacking, //是否提供停车位
					isInvoices:that.isInvoices, //是否提供发票
					introduce:that.customerDescribtion,//商户介绍
					storeName:that.fenShopName,//分店信息--店铺名称
					// storeProvince:that.shopAddressP2[that.pIndex2].code,//分店省、
					// storeCity:that.shopAddressC2[that.cIndex2].code,//分店市
					// stroeArea:that.shopAddressX2[that.xIndex2].code,//分店区
					marchantBranchStroe:(JSON.stringify(that.marchantBranchStroe)),
					storeAddress:that.storeAddress,//分店地址
					storeServicePhone:that.fencustomerPhone,			 //分店客服电话
				    marchantId:that.shopObj.merchantId
					},success(d){
						uni.showToast({
							title:"操作成功!",
							content:"操作成功!"
						});
						  uni.navigateTo({
						  	url:"/pages/main/main"
						  })
                         console.log("所有信息填写完整后发送后台接口请求成功了!");
						 console.log(d);
					}
				})
				
				
			  },
			
			goBack:function()
			{
				uni.navigateTo({
						url:"../main/main"
				})
			},
			expreClick:function(e)
			{
				console.log("当前的e是"+e);	
				console.log("当前的id是"+e.target.id);
			},
			expressFun1(e){
 
				console.log("你好，当前的选中的状态是"+e.detail.value.length); 
				//表示空调被选中
				 if(e.detail.value.length !=0){  
                      that.isAirConditioner=1;
					 console.log("第一个复选框选中了！");  
					
                }  else{ //表示空调没有被选中
					  that.isAirConditioner=0;
					 console.log("第一个复选框没有选中！");
				}
// 				 that.expressConfig1=e.currentTarget.dataset.expressonfig;
// 				 that.expressConfigArray.push(that.expressConfig1);
// 				 console.log("你好,当前的expressConfig是"+that.expressConfig);
// 				 console.log("当前的expressConfigArray含有的内容是"+that.expressConfigArray);
// 				 console.log("---------------------------------------------------");
// 				 console.log("你好,当前的expresson是"+e.target.expresson);
				// this.expressConfig=e.detail.value.length==1?1:2
			},
			expressFun2(e){
				 // that.expressConfig2=e.currentTarget.dataset.expressonfig;
				 // that.expressConfigArray.push(that.expressConfig2);
				 // console.log("你好,当前的expressConfig是"+that.expressConfig);
				 // console.log("当前的expressConfigArray含有的内容是"+that.expressConfigArray);
				 // console.log("---------------------------------------------------");
				 // console.log("你好,当前的expresson是"+e.target.expresson);
				// this.expressConfig=e.detail.value.length==1?1:2
				
				console.log("你好，当前的选中的状态是"+e.detail.value.length);
				 if(e.detail.value.length !=0){  
				      that.isWifi=1;
					 console.log("第二个复选框选中了！");  
					
				}  else{ //表示空调没有被选中
					  that.isWifi=0;
					 console.log("第二个复选框没有选中！");
				}

			},
			expressFun3(e){
				 // that.expressConfig2=e.currentTarget.dataset.expressonfig;
				 // that.expressConfigArray.push(that.expressConfig2);
				 // console.log("你好,当前的expressConfig是"+that.expressConfig);
				 // console.log("当前的expressConfigArray含有的内容是"+that.expressConfigArray);
				 // console.log("---------------------------------------------------");
				 // console.log("你好,当前的expresson是"+e.target.expresson);
				// this.expressConfig=e.detail.value.length==1?1:2
				//表示空调被选中
				console.log("你好，当前的选中的状态是"+e.detail.value.length);
				//表示空调被选中
				 if(e.detail.value.length !=0){  
				      that.isMobileCharge=1;
					 console.log("第三个复选框选中了！");  
					
				}  else{ //表示空调没有被选中
					  that.isMobileCharge=0;
					 console.log("第三个复选框没有选中！");
				}
			
			},
			expressFun4(e){
				 // that.expressConfig2=e.currentTarget.dataset.expressonfig;
				 // that.expressConfigArray.push(that.expressConfig2);
				 // console.log("你好,当前的expressConfig是"+that.expressConfig);
				 // console.log("当前的expressConfigArray含有的内容是"+that.expressConfigArray);
				 // console.log("---------------------------------------------------");
				 // console.log("你好,当前的expresson是"+e.target.expresson);
				// this.expressConfig=e.detail.value.length==1?1:2
				console.log("你好，当前的选中的状态是"+e.detail.value.length);
				//表示空调被选中
				 if(e.detail.value.length !=0){  
				      that.isDelivery=1;
					 console.log("第四个复选框选中了！");  
					
				}  else{ //表示空调没有被选中
					  that.isDelivery=0;
					 console.log("第四个复选框没有选中！");
				}
			
			},
			expressFun5(e){
				 // that.expressConfig2=e.currentTarget.dataset.expressonfig;
				 // that.expressConfigArray.push(that.expressConfig2);
				 // console.log("你好,当前的expressConfig是"+that.expressConfig);
				 // console.log("当前的expressConfigArray含有的内容是"+that.expressConfigArray);
				 // console.log("---------------------------------------------------");
				 // console.log("你好,当前的expresson是"+e.target.expresson);
				// this.expressConfig=e.detail.value.length==1?1:2
				console.log("你好，当前的选中的状态是"+e.detail.value.length);
				//表示空调被选中
				 if(e.detail.value.length !=0){  
				      that.isPacking=1;
					 console.log("第五个复选框选中了！");  
					
				}  else{ //表示空调没有被选中
					  that.isPacking=0;
					 console.log("第五个复选框没有选中！");
				}
			
			},
			expressFun6(e){
				 // that.expressConfig2=e.currentTarget.dataset.expressonfig;
				 // that.expressConfigArray.push(that.expressConfig2);
				 // console.log("你好,当前的expressConfig是"+that.expressConfig);
				 // console.log("当前的expressConfigArray含有的内容是"+that.expressConfigArray);
				 // console.log("---------------------------------------------------");
				 // console.log("你好,当前的expresson是"+e.target.expresson);
				// this.expressConfig=e.detail.value.length==1?1:2
				console.log("你好，当前的选中的状态是"+e.detail.value.length);
				//表示空调被选中
				 if(e.detail.value.length !=0){  
				      that.isInvoices=1;
					 console.log("第六个复选框选中了！");  
					
				}  else{ //表示空调没有被选中
					  that.isInvoices=0;
					 console.log("第六个复选框没有选中！");
				}
			
			},

			isCheckChange:function()
			{
				that.isCheck=!that.isCheck;
			},
			 bindTimeChange: function(e) {
			    that.time1 = e.target.value
			   console.log("获取的时间1是"+  that.time1);
			
			},
			 bindTimeChange2: function(e) {
			    that.time2 = e.target.value
				 console.log("获取的时间2是"+  that.time2);
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
			//店铺整体图标选择
			proImgsChoose(){
				// let that=this;
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

								//that.shopPictures=d
								console.log("你好,上传成功门店照片!!!!!!!!!!!!!!!!!");
								console.log("门店门头照片地址是"+d);

								//that.shopPictures=d;
								console.log("门店门头照片地址是"+that.shopPictures);
							}
						})
					}
					
					
				});
			},
			
			
			
			//商品图片选择
			proImgsChoose3(type){
				let that=this;
				
				// if(type==1&&that.proImgs.length>4){
				// 	uni.showToast({
				// 	    title:"商品图片最多上传五张",
				// 		icon:"none"
				// 	});
				// 	return
				// }
				
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function (res) {
						// if(that.limit(res.tempFiles[0].size)>3){
						// 	uni.showToast({
						// 		title:"图片太大",
						// 		icon:"none"
						// 	})
						// 	return
						// }
			            that.$ajax({
							uploadFile:true,
							formData:{
								'fileName':"/product/",
							},
							filePath:res.tempFilePaths[0],
							success(d){
								if(type==1){
									//商品图片
									that.proImgs.push(d);
									
									console.log("你好,当前的proImgs的长度是"+that.proImgs.length);
									console.log(that.proImgs);
								}else{
									//商品详情图
									that.proDetailsImg.push(d)
								}
							}
						})
						
					
					},
				});
			},
			
			
			del(index,type){
				let that=this;
				console.log(index)
				if(type==1){
					//商品图片
					 that.proImgs.splice(index, 1);
					 console.log("你好,当前的proImgs的长度是"+that.proImgs.length);
					 console.log(that.proImgs);
				}else{
					
					//商品详情图
					that.proDetailsImg.splice(index, 1);
				}
			},
			
		
			
			//店内环境图标选择
			proImgsChoose2(){
				// let that=this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function (res) {
						console.log(that.limit(res.tempFiles[0].size))
						// if(that.limit(res.tempFiles[0].size)>1){
						// 	uni.showToast({
						// 		title:"图片大小不能超过1M",
						// 		icon:"none"
						// 	})
						// 	return
						// }
						that.$ajax({
							uploadFile:true,
							formData:{
								'fileName':"/marchant/",
							},
							filePath:res.tempFilePaths[0],
							success(d){
								that.upSrc2=d
							    //that.shopEnvironment=d;
								console.log("你好,上传店内环境照片成功!!!!!!!!!!!!!!!!!");
								console.log("店内环境照片地址是"+d);
								console.log("店内环境照片地址是"+that.shopEnvironment);
							}
						})
					}
				});
			},
			
			//关于店铺的三级联动
			//省市区三级联动
			//城市的选择
			shopAddressXChange(e){
				that.xIndex=e.detail.value
			},
			searchX(init){
				that.$ajax({
					url:"/shopProduct/getCommonAddressDistrictList",
					data:{
						cityCode:that.shopAddressC[that.cIndex].code
					},success(d){
						that.shopAddressX=d;
						if(init){
							console.log(10000)
							for(let i in d){
								if(d[i].code==that.shopAddress.area){
									that.xIndex=i;
									break;
								}
							}
						}
					}
				})
			},
			shopAddressChange(e){
				that.cIndex=e.detail.value;
				that.searchX();
			},
			searchC(init){
			
				that.$ajax({
					url:"/shopProduct/getCommonAddressCityList",
					data:{
						proCode:that.shopAddressP[that.pIndex].code
					},success(d){
						that.shopAddressC=d;
						if(init){
							for(let i in d){
								if(d[i].code==that.shopAddress.city){
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
				that.pIndex=e.detail.value;
				that.searchC();
			},
			searchP(init){
				that.$ajax({
					url:"/shopProduct/getCommonAddressProvinceList",
					success(d){
						that.shopAddressP=d;
						if(init){
							console.log("dfsad");
							for(let i in d){
								if(d[i].code==that.shopAddress.province){
									that.pIndex=i;
									break;
								}
							}
							console.log(that.pIndex);
							that.searchC(init)
						}else{
							that.searchC()
						}
					}
				})
			},
			
            //关于分店的省市区的三级联动
            //省市区三级联动
            //城市的选择
            // shopAddressXChange2(e){
            // 	that.xIndex2=e.detail.value
            // },
            // searchX2(init){
            // 	that.$ajax({
            // 		url:"/shopProduct/getCommonAddressDistrictList",
            // 		data:{
            // 			cityCode:that.shopAddressC2[that.cIndex2].code
            // 		},success(d){
            // 			that.shopAddressX2=d;
            // 			if(init){
            // 				console.log(10000)
            // 				for(let i in d){
            // 					if(d[i].code==that.marchantBranchStroe.stroeArea){
            // 						that.xIndex2=i;
            // 						break;
            // 					}
            // 				}
            // 			}
            // 		}
            // 	})
            // },
            // shopAddressChange2(e){
            // 	that.cIndex2=e.detail.value;
            // 	that.searchX2();
            // },
            // searchC2(init){
            // 
            // 	that.$ajax({
            // 		url:"/shopProduct/getCommonAddressCityList",
            // 		data:{
            // 			proCode:that.shopAddressP2[that.pIndex2].code
            // 		},success(d){
            // 			that.shopAddressC2=d;
            // 			if(init){
            // 				for(let i in d){
            // 					if(d[i].code==that.marchantBranchStroe.storeCity){
            // 						that.cIndex2=i;
            // 						break;
            // 					}
            // 				}
            // 				that.searchX2(init);
            // 			}else{
            // 				that.searchX2();
            // 			}
            // 			
            // 		}
            // 		
            // 	})
            // },
            // shopAddressPChange2(e){
            // 	that.pIndex2=e.detail.value;
            // 	that.searchC2();
            // },
            // searchP2(init){
            // 	that.$ajax({
            // 		url:"/shopProduct/getCommonAddressProvinceList",
            // 		success(d){
            // 			that.shopAddressP2=d;
            // 			if(init){
            // 				console.log("dfsad");
            // 				for(let i in d){
            // 					if(d[i].code==that.marchantBranchStroe.storeProvince){
            // 						that.pIndex2=i;
            // 						break;
            // 					}
            // 				}
            // 				console.log(that.pIndex2);
            // 				that.searchC2(init)
            // 			}else{
            // 				that.searchC2()
            // 			}
            // 		}
            // 	})
            // },
            
            













			
			
		}
	}
</script>

<style lang="scss" scoped>
	.leftArrowImg{
		width:42upx;
		height:42upx;
	}
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
		padding:4upx 12upx;
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
	
	.imgs{
		// width:100upx;
		// height:200upx;
		margin: 16upx 0;
	}
	input{
		width:520upx;
	}
	.top input{
		width:460upx;
	}
	.imgs view{
		display: inline-block;
		vertical-align: top;
	}
	.imgsText text{
		display: block;
		text-align: center;
		width:166upx;
		line-height: 43upx;
		color:#fff;
		font-size: 20upx;
		background: #2D93FF;
		margin-left: 24upx;
	}
	
	
	
	
</style>
