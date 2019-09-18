<template>
	<view class="content" style="overflow-x:hidden;">
		 <!-- 阴影层弹出框 -->
		 
		<view  class="kkkkkk" style="width:100%;height:100%;z-index:100;background:rgba(0,0,0,0.16);position:fixed;top:0;left:0;right:0;" v-if="showTheModal">

			 <view class="fixedCtn" ref="modal[index]" v-for="(item,index)  in  proctListName3" :key="index">
				<!-- 这里的属性不固定
				 -->
				<!-- <view>{{item.specName}}</view> -->
				 <view class="shopInfo" style="width:90%;margin-left:5%;" v-for="(i,index) in item.specName" :key="index">
						<view class="flexbox" >
							<text class="viewBot1 myviewBot1">{{i.name}}</text>
							<input class="shopNameCls viewBot2  wviewBot2" style="width:200upx"  type="text" @input="chagnge100" v-model="i.value"  maxlength="50"/>
						</view>		
				 </view>
				
							
				    <view class="shopInfo" style="width:90%;margin-left:5%;">
							<view class="flexbox" >
								<text class="viewBot1 myviewBot1">{{productpriceText}}</text>
								<input class="shopNameCls viewBot2  wviewBot2" style="width:200upx" @input="getPPValue"  type="number" v-model="productpriceValue"  maxlength="50"/>
							</view>		
				     </view>
                            
					<view class="shopInfo" style="width:90%;margin-left:5%;">
							<view class="flexbox" >
								<text class="viewBot1 myviewBot1">{{marketpriceText}}</text>
								<input class="shopNameCls viewBot2  wviewBot2" style="width:200upx" @input="getMPValue" type="number" v-model="marketpriceValue"  maxlength="50"/>
							</view>		
					</view>
					
					<view class="shopInfo" style="width:90%;margin-left:5%;">
						<view class="flexbox" >
							<text class="viewBot1 myviewBot1">{{productstockText}}</text>
							<input class="shopNameCls viewBot2  wviewBot2" style="width:200upx"  @input="getPSValue" type="number" v-model="productstockValue"  maxlength="50"/>
						</view>		
					</view>				 
								 
				
				    <view class="step3">
				     	<text style="font-size:30upx;margin-left:5%">{{productpicText}}</text>
							<view class="right" style="margin-left:30%;">
								<view class="imgs">
									<image :src="scaleImgs"></image>
									<!-- <view @tap="delScaleImg(index,1)" class="del">删除</view> -->
								</view>
								<image src="../../static/capital/my_add_image@2x.png"  @tap="scaleImgsChoose(1)" v-if="scaleImgs.length<2" ></image>
							</view>
							
							<view class="textInfo" style="">
								<text>上传商品图片,图片支持jpg,gif,png格式,最多5张,</text>
								<text class="color">建议使用尺寸200x200像素以上</text>
							</view>
				     </view>

					 <view class="botTwoChoose">
						   <view class="botTwoChooseLeft" @click="cancelSet">取消设置</view>
						   <view class="botTwoChooseMid"></view>
						   <view class="botTwoChooseRight"  
							
							:data-specname="JSON.stringify(item.specName)" 
							:data-productpictext="productpicText"
							:data-productstocktext="productstockText"
							:data-marketpricetext="marketpriceText"
							:data-productpricetext="productpriceText"
							:data-productpricevalue="productpriceValue"
							:data-productstockvalue="productstockValue"
							:data-marketpricevalue="marketpriceValue"
							:data-productpicvalue="scaleImgs"

							 @click="saveScale">保存规格</view>
					 </view>
	<!-- 			     
				   	  marketPrice  productStock  productPic -->
				
				
				
				
			 </view>
			
			
		</view>
		
		<view class="shopInfo">
			<view>
				<text>商品名称</text>
				<input type="text" v-model="shopName" placeholder="商品名称长度至少3个字符，最长50个汉字" />
			</view>
			<!-- <view style="height:auto;">
				<text>商品简介</text>
				<textarea maxlength="100000000"  v-model="shopIntr"  contenteditable="true" placeholder="填写商品简介"></textarea>
			</view> -->
		</view>
		
		
		
		<view class="step2">
			<view>
				<text>商品分类</text>
		
				<picker  :range="shopClassify"  @change="shopClassifyChange" >
					<view class="ellipsis">
						<text class="yticon icon-xia caIco"></text> 
						<view class="uni-icon-arrowdown" style="color:red;font-size:30upx;"></view>			
					{{shopClassify[shopIndex]||"分类"}}
					   <!-- <text class=""></text> -->
					</view>	
					<!-- <uni-icon type="arrowdown" size="18" color="#999"></uni-icon> -->
				</picker>
				
				<picker  :range="twoCate" @change="twoCateFun" range-key="catename">
					
					<view class="ellipsis">{{twoCate[twoIndex].catename||"分类"}}</view>
					<!-- <uni-icon type="arrowdown" size="18" color="#999"></uni-icon> -->
				</picker>
				
				<picker  :range="threeCate" :data-cateid="threeCate[threeIndex].cateid" @change="threeCateFun" range-key="catename">
					<view class="ellipsis">{{threeCate[threeIndex].catename||"分类"}}</view>
					<!-- <view>{{threeIndex}}</view> -->
					<!-- <uni-icon type="arrowdown" size="18" color="#999"></uni-icon> -->
				</picker>
			</view>
			<view>
				<text>商品品牌</text>
				<picker  style="border:1px solid rgba(0,0,0,0.16)" :range="shopBrand" :data-brandid="shopBrand[shopBrandIndex].brandId"  @change="shopBrandChange" range-key="brandName" v-if="shopBrand.length>0">
					
					<view class="ellipsis">{{shopBrand[shopBrandIndex].brandName||"分类"}}</view>
				<!-- 	<uni-icon type="arrowdown" size="18" color="#999"></uni-icon> -->
				</picker>
				<view v-else style="display:inline-block;vertical-align:middle;margin-left:30upx;" v-show="showBrandFlag">
					<view>分类</view>
				</view>
				
				<input type="text" class="otherBrand" placeholder="请输入商品品牌"  v-model="typeBrandName" style="" v-if="shopBrand[shopBrandIndex].brandId==-1">
			</view>
			<view>
				<text>商品产地</text>
				<picker  :range="provinceList" @change="provinceListChange" range-key="proName">
					<view class="ellipsis">{{provinceList[provinceIndex].proName||"请选择"}}</view>
					<!-- <uni-icon type="arrowdown" size="18" color="#999"></uni-icon> -->
				</picker>
				<picker  :range="cityList" @change="cityListChange" range-key="proName">
					<view class="ellipsis">{{cityList[cityIndex].proName||"请选择"}}</view>
					<!-- <uni-icon type="arrowdown" size="18" color="#999"></uni-icon> -->
				</picker>
			</view>
		</view>
		
		<view class="step3">
			<view>
				<text>商品售价</text>
				<input type="number" v-model="price" />
				<text>元</text>
			</view>
			<view>
				<text>市场售价</text>
				<input type="number" v-model="shopPrice" />
				<text>元</text>
			</view>
			
			<!-- that.specName=that.proctListName[0].specName;
			that.productPrice=that.proctListName[0].productMoney.name;
			that.marketPrice=that.proctListName[0].agoraMoney.name;
			that.productStock=that.proctListName[0].stock.name;
			that.productPic=that.proctListName[0].specImg.name; -->
			<!-- 新增的list列表 -->
		
		   <view  v-for="(item,index) in scaleList1" :key="index">
				<view class="scaleText1" style="">规格设置</view>
				
				
				<view class="scaleText2" style="padding-top:20upx;position:relative;" v-if="showTheNewFlag">
					  
                       <view class="closeModal" :data-closeindex1="index" @click="closeModal">
						   &times;
					   </view>
					  
					   <!-- 未定属性 -->
					  <view class="scaleText3" style="" v-for="(i,index2) in item.specName" :key="index2">
							<text class="scaleText4" style="">{{i.name}}</text>
							<input class="scaleText5" type="text" v-model="i.value"  style="width:62%;">
					   </view>
					  
						<!-- 商品价格 -->
						<view class="scaleText3" style="">
							<text class="scaleText4" style="">{{item.productMoney.name}}</text>
							<input class="scaleText5" type="text" v-model="item.productMoney.value"  style="width:62%;">
						</view>
						<!-- 市场售价 -->
						<view class="scaleText3" style="">
							<text class="scaleText4" style="">{{item.agoraMoney.name}}</text>
							<input class="scaleText5" type="text" v-model="item.agoraMoney.value" style="width:62%;">
						</view>
						<!-- 商品库存 -->
						<view class="scaleText3" style="">
							<text class="scaleText4" style="">{{item.stock.name}}</text>
							<input class="scaleText5" type="text" v-model="item.stock.value" style="width:62%;">
						</view>
						<!-- 商品图片 -->
						<view class="step3">
						 	<text style="font-size:26upx;margin-left:20upx;">{{item.specImg.name}}</text>
								<view class="right">
									<view class="imgs" style="" :class="[scaleImgs.length>0?'imgClass2':'imgClass1']">
										<image :src="item.specImg.value"></image>
										<!-- <view @tap="delScaleImg(index,1)" class="del">删除</view> -->
									</view>
									<image src="../../static/capital/my_add_image@2x.png" @tap="scaleImgsChoose(index,1)" v-if="scaleImgs.length<2" ></image>
								</view>
								
								<view class="textInfo" style="margin-top:-20upx">
									<text>上传商品图片,图片支持jpg,gif,png格式,最多5张,</text>
									<text class="color">建议使用尺寸200x200像素以上</text>
								</view>
						 </view>
				</view>
			</view>

			<view class="step3" style="margin-top:30upx;">
				<view class="flexbox">
					<text class="viewBot1" style="font-size:26upx;">规格设置</text>
				
					<view class="inline viewBot2" @click="perfectScale" >
						<view class="scaleSetView" v-if="showTheBtn" style="font-size:26upx;margin-left:-50upx;">完善规格</view>
					</view>
				</view>
			</view>
			
			
			
			
			
			
		
			<view class="step3 flexboxdiv" >
				<view class="payWay" style="font-size:26upx;">支付方式</view>
			    <view class="uni-list choosePayWay" style="margin-left:-40upx;font-size:26upx;">
			    	<view class="uni-list-cell">
			    		<view class="">
			    			<picker class="bhnkk bhnkk3" @change="bindPickerChange2" :value="index2" :range="array4">
			    				<view class="uni-input">{{array4[index2]}}</view>
								<!-- <view>{{index2}}</view> -->
			    			</picker>
			    		</view>
			    	</view>
			    </view>
				
				<view v-if="myFlag1000" style="display:inline-block;vertical-align:middle;font-size:20upx;">商品交易成功后,用户无时光豆奖励</view>
			    
				
				<!-- <view v-if="myFlag1001" style="display:inline-block;vertical-align:middle;font-size:20upx;">即原有的联盟经费,规则相同</view> -->
				
				
			</view>
			
			
			
			<view style="margin-top:20upx;" v-if="index2==1">
				<text>联盟经费</text>
				<view class="inline">
					<view class="btn" :class="{active:productRatio==0}" @tap="proRatio(0)">8%</view>
					<view class="btn" :class="{active:productRatio==1}" @tap="proRatio(1)">15%</view>
					<view>该商品交易成功后,平台按比例奖励用户时光豆;8%,奖励交易金额的30%;15%,奖励交易金额的100%;</view>
				</view>
			</view>
			
			
			<view class="step3" style="margin-top:10upx;">
					<view class="flexbox">
						<text class="viewBot1 newviewBot1" style="font-size:26upx;">分享佣金</text>
						<input class="shopNameCls newviewBot2 " style="width:320upx!important;margin-left:-30upx;"  type="text" v-model="sharingofEmployment" maxlength="50"/>%
					</view>
					<view class="tiptext" style="font-size:26upx;position:relative;left:-30upx;">非必填项,用户分享该商品完成交易,根据该佣金比例获取佣金</view>
			 </view>	
			

			<view>
				<text>商品图片</text>
				<view class="right">
					<view class="imgs" v-for="(item,index) in proImgs" v-if="proImgs.length>0" :key="index">
						<image :src="item"></image>
						<view @tap="del(index,1)" class="del">删除</view>
					</view>
					<image src="../../static/capital/my_add_image@2x.png" @tap="proImgsChoose2(1)" v-if="proImgs.length!=5" ></image>
				</view>
				
				<view class="textInfo">
					<text>上传商品图片,图片支持jpg,gif,png格式,最多只能上传5张,</text>
					<text class="color">建议使用尺寸800x800像素以上,大小不超过1M的正方形图片;</text>
				</view>
			</view>
		</view>
		<view class="step4">
			<view>
				<text>商品重量</text>
				<input type="number" v-model="proWeight" />
				<text>克</text>
			</view>
			<view>
				<text style="display:inline-block;vertical-align:middle;">是否包邮</text>
				<!-- <view class="smallItem" >
					  <view class="smallItemLeft">
							  <checkbox-group class="inlines"    @change="myExpressFun1">
									<label>
										<checkbox :checked="mycheck1" value="mycheck1"  />
									</label>	
							  </checkbox-group>
					  </view>
					  <view class="smallItemRight">包邮</view>
				</view>
				
				<view class="smallItem" >
					  <view class="smallItemLeft">
							  <checkbox-group class="inlines"    @change="myExpressFun1">
									<label>
										<checkbox :checked="mycheck2" value="mycheck2"  />
									</label>	
							  </checkbox-group>
					  </view>
					  <view class="smallItemRight">不包邮</view>
				</view>
				
				<view class="smallItem" >
					  <view class="smallItemLeft">
							  <checkbox-group class="inlines"    @change="myExpressFun1">
									<label>
										<checkbox :checked="mycheck3" value="mycheck3"  />
									</label>	
							  </checkbox-group>
					  </view>
					  <view class="smallItemRight">邮付到费</view>
				</view> -->
				
				 <view class="uni-list" style="display:inline-block;vertical-align:middle;margin-left:30upx;">
						<radio-group @change="radioChange">
							<label style="margin-left:60upx;" class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
								<view>
									<radio :value="item.value" :checked="index === current" />
									<text>{{item.name}}</text>
								</view>
								
							</label>
						</radio-group>
				</view>
				
				</br>
				
				<text style="margin-left:120upx;">非包邮商品,请到管理后台上传</text>
				
			</view>
			<view>
				<text class="left">商品库存</text>
				<input type="number" v-model="skoce" class="input"/>
			</view>
			<view>
				<text class="left">关键词</text>
				<input type="text" v-model="keyWord" class="input"/>
			</view>
			<view>
				<text>商品详情</text>
				<view class="inlines">
				<!-- 	<textarea v-model="shopDetails" placeholder="商品详情文字说明" /> -->
					<view class="right" style="margin-left:80upx;margin-top:30upx;">
						<view class="imgs" v-for="(item,index) in proDetailsImg" v-if="proDetailsImg.length>0" :key="index">
							<image :src="item" mode="widthFix"></image>
							<view @tap="del(index,2)" class="del">删除</view>
						</view>
						<image src="../../static/capital/my_add_image@2x.png" @tap="proImgsChoose(2)" class="up"></image>
					</view>
					<view style="position:relative;left:90upx;top:20upx;">
						<text>温馨提示:编辑商品建议去管理后台,商品详情请上传图片,图片支持jpg,gif,png格式,</text>
						<text class="color">大小不超过1M;</text>
					</view>
				
				</view>
				
			</view>
			
			
			<view class="step3" style="position: relative;top:20upx;">
					<view class="flexbox">
						<text class="viewBot1 newviewBot1">定时销售</text>
						<checkbox-group class="inlines" @change="expressFun2">
							<label>
								<checkbox value="1" :checked="setTimeSell" color="#EE3535"/>非必填项,若未选择,则无限制
							</label>
						</checkbox-group>
					</view>
			</view>
			
			<!-- 以下内容是在条件满足时才会显示 -->
					 
					 <view v-if="setTimeSell">
						 		 
					 <view class="shopInfo">
							<view class="flexbox">
								<text class="viewBot1 myviewBot1">开始时间</text>
								
								<view @click="onShowDatePicker('datetime')" style="border:1px solid rgba(0,0,0,0.18)">
									{{timerStartTime}}
								</view>
							
								
								<!-- <view>
									  <view class="uni-list">
									     <view class="uni-list-cell">
									         <view class="uni-list-cell-db" >
									             <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
									                 <view class="uni-input" style="width:200upx!important;border:none;">{{date}}</view>
									             </picker>
									         </view>
									     </view>
									 </view>
								</view>	 -->
							</view>		
					    </view>
						
					 <view class="shopInfo">
							<view class="flexbox">
								<text class="viewBot1 myviewBot1">结束时间</text>
							
							
							     <view @click="onShowDatePicker21('datetime')" style="border:1px solid rgba(0,0,0,0.18)">
							     	{{timerEndTime}}
							     </view>
							
							
							<!--    <date-picker @change="change"></date-picker> -->

								<!-- <view>
									  <view class="uni-list">
									     <view class="uni-list-cell">
									         <view class="uni-list-cell-db">
									             <picker mode="date" :value="date3" :start="startDate3" :end="endDate3" @change="bindDateChange3">
									                 <view class="uni-input" style="width:300upx;border:none;">{{date3}}</view>
									             </picker>
									         </view>
									     </view>
									 </view>
								</view>	 -->
							</view>		
						</view>
							
					 <view class="shopInfo">
							<view class="flexbox">
								<text class="viewBot1 myviewBot1">销售价格</text>
								<input class="shopNameCls viewBot2 wviewBot2" style="width:160upx"  type="number" v-model="timerMoney"  maxlength="50"/>
								<text style="position:relative;left:-50upx;">元</text>
							</view>		
					 </view>
						
					 <view class="shopInfo">
							<view class="flexbox">
								<text class="viewBot1 myviewBot1">销售数量</text>
								<input class="shopNameCls viewBot2  wviewBot2" style="width:200upx"  type="number" v-model="timerSaleCount"  maxlength="50"/>
							</view>		
					</view>	

					   
			       </view>
			
			
			
			
			
			
		</view>
		<button @tap="save">保存</button>
		
		
		
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		
	
	    <mx-date-picker :show="showPicker21" :type="type21" :value="value21" :show-tips="true" :begin-text="'入住'" :end-text="'离店'" :show-seconds="true" @confirm="onSelected21" @cancel="onSelected21" />
		
		
	</view>
</template>

<script>
	import datePicker from '@/components/date-picker/date-picker.vue';
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
    import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import { pathToBase64, base64ToPath } from '@/js_sdk/gsq-image-tools/image-tools/index.js'
	export default{
		components: {
			uniIcon,
			MxDatePicker,
			ruiDatePicker,
			datePicker
		},
		data(){
			const currentDate = this.getDate({
			    format: true
			})
			return{
				typeBrandName:"",//商品品牌
				showCaledar: false,
				dateStr: '',
				showPicker: false,
				date: '2019/01/01',
				time: '15:00:12',
				datetime: '2019/01/01 15:00:12',
				range: ['2019/01/01','2030/01/06'],
				rangetime: ['2019/01/08 14:00','2019/01/16 13:59'],
				type: 'rangetime',
				value: '',
				imgClass1:".imgClass1",
				imgClass2:".imgClass2",
				showTheBtn:true,
				showPicker21: false,
				date21: '2019/01/01',
				showBrandFlag:true,//当选择商品
				type21: 'rangetime',
				value21:'',
                myFlag1000:true,
				showTheNewFlag:false,
				myFlag1001:false,				
				isreq:false,
				shopObj:{},
				date1: currentDate,
				date3: currentDate,
				time2: '12:01',
				value100:"",
				isCheck:false,
				initNum:[0,0,0],//是否第一次选(分类，品牌，城市)
				cateId2:"",//编辑时二级分类
				cateId3:"",
				sellerNumber:"",
				productProperties:[],
				specName:[],
				scaleSetDiv:true,//规格设置div
				sellerPrice:"",
				skoce:"",
				showTheModal:false,
				sellerStock:"",
				showTheShadow:true,
				brandId:"",
				check1:false,
				mycheck1:false,
				mycheck2:false,
				mycheck3:false,
				produceCity:"",		
				productpriceValue:"",//商品售价具体值
				marketpriceValue:"",//市场定价具体值
				productstockValue:"",//商品库存具体值
				productpicValue:"",//商品图片具体值	
				productpicText:"规格图片",//商品图片-------标题文本
				productpriceText:"商品售价",//商品售价-----标题文本
				marketpriceText:"市场定价",//市场售价----标题文本
				productstockText:"商品库存",//市场库存---标题文本

				produceProvince:"",
				proId:"",//商品id
				shopName:"",//商品名
				index2:0,
				expressConfig:1,//是否包邮1包邮2不包邮3邮费到付
				setTimeSell:false,//是否定时销售 1定时销售 2非定时销售
				sharingofEmployment:0,
				isPackage:2,
				proctListName2:null,
				proctListName3:null,
				proctListName:[],
				// newProctListName:[],
				timeSeller:false,
				array4: [
					"普通支付",
					"联盟支付"
				],
				proWeight:0,//商品重量
				keyWord:"",//关键词
				proImgs:[],//商品图片
				shopDetails:"",//商品详情
				proDetailsImg:[],//商品详情图片
				shopBrand:[{brandname:""}],//商品品牌
				shopBrandIndex:0,//
				shopClassify:["联盟商家"],//商品分类
				shopIndex:0,//商品分类选中下标
				twoCate:[{catename:""}],//商品二级分类
				twoIndex:0,
				cateId:"",//商品规格的id
				productRatio:0,//联盟经费0为8%,1为15%
				threeCate:[{catename:""}],//商品三级分类
				threeIndex:0,
				productMoney:"",
				agoraMoney:"",
				specImg:"",
				shopIntr:"",//商品简介
				shopPrice:"",//商品市场价
				price:"",//商品价格
				stock:"",//商品库存
				scaleImgs:"",//规格图片
				
				provinceList:[{proName:""}],//省
				provinceIndex:0,//
				cityList:[{proName:""}],//市
				cityIndex:0,//
				payment:2,//表示普通支付
				newProctListName:[{
					"specName":[],
					"productMoney":{
						"name":"",
						"value":""
					},
					"agoraMoney":{
						"name":"",
						"value":""
					},
					"stock":{
						"name":"",
						"value":""
					},
					"specImg":{
						"name":"",
						"value":"" //暂时为空
					}
				}],
				isExpress1:0,// 包邮
				isExpress2:0, //不包邮
				isExpress3:0, //包邮到付,
				
				      items: [  {
				                    value: '1',
				                    name: '包邮'
				                }
				                
				            ],
				current: 0,
				timerStartTime:"2019-09-04 12:08:09",
				timerEndTime:"2019-12-04 12:08:09",
				timerMoney:"", 
				timerSaleCount:"",
				isTimer:2,
				weight:"",
				jsonArraySpec:null,//商品数组
				
				scaleList1:[],
					

			}
		},
		computed:{
			
			 startDate() {
				let that=this;
				return that.getDate('start');
			},
			endDate() {
				let that=this;
				return that.getDate('end');
			},
			startDate3() {
				let that=this;
				return that.getDate('start');
			},
			endDate3() {
				let that=this;
				return that.getDate('end');
			}
		},
		methods:{
			closeModal:function(e)
			{
				let that=this;
				console.log("----点击删除按钮之后的索引是"+e.currentTarget.dataset.closeindex1);
				that.scaleList1.splice(e.currentTarget.dataset.closeindex1,1);
			},
			perfectScale:function()
			{
				let that=this;
				let arrspecName=that.scaleList1[0].specName;
				arrspecName.forEach(item=>{
					item.value="";
				})
				
				console.log("你好,你点击了完善规格按钮!");
				that.scaleList1.push({
						"specName":arrspecName,
						"productMoney":{
							"name":that.scaleList1[0].productMoney.name,
							"value":""
						},
						"agoraMoney":{
							"name":that.scaleList1[0].agoraMoney.name,
							"value":""
						},
						"stock":{
							"name":that.scaleList1[0].stock.name,
							"value":""
						},
						"specImg":{
							"name":that.scaleList1[0].specImg.name,
							"value":"" //
						}
					})
					
				
			},
			

			chagnge100(e){
				console.log();
			},
			getPPValue:function(e)
			{
				let that=this;
				console.log("你好,当前的商品售价是"+e.target.value);
				that.productpriceValue=e.target.value;
			},
			getMPValue:function(e)
			{
				let that=this;
				console.log("你好,当前的市场售价是"+e.target.value);
				that.marketpriceValue=e.target.value;
			},
			getPSValue:function(e)
			{
				let that=this;
				console.log("你好,当前的市场库存是"+e.target.value);
				that.productstockValue=e.target.value;
			},
			

		   change({choiceDate,dayCount}) {
					//参数解释
					//1.choiceDate 时间区间（开始时间和结束时间）
					//2.dayCount 共多少晚
		
					console.log(choiceDate, dayCount);
					console.log('入住从 ' + choiceDate[0].re + '  到 ' + choiceDate[1].re + '  共 ' + dayCount + ' 晚');
				},
			//开始时间
			bindChange:function(e)
			{
				//console.log("你好,选择的时间是"+e.detail.value);
				console.log("你好,你选择的时间是"+e.currentTarget.dataset.mytime);
			},
		   onShowDatePicker(type){//显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
		   },
		   onSelected(e) {//选择
			this.showPicker = false;
			if(e) {
				this[this.type] = e.value; 
				//选择的值
				this.timerStartTime=e.value;
				this.timerStartTime=this.timerStartTime.replace(/\//g,'-');
				console.log("开始时间是"+this.timerStartTime);	
				console.log('value => '+ e.value);
				//原始的Date对象
				console.log('date => ' + e.date);
			}
		   },
		   
		   
		   onShowDatePicker21(type21){//显示
							this.type21 = type21;
							this.showPicker21= true;
							this.value21 = this[type21];
		   },
		   onSelected21(e) {//选择
				this.showPicker21 = false;
				if(e) {
					this[this.type21] = e.value; 
					//选择的值
							this.timerEndTime=e.value;
							this.timerEndTime=this.timerEndTime.replace(/\//g,'-');
							console.log("结束时间是"+this.timerEndTime);	
							console.log('value => '+ e.value);
							//原始的Date对象
							console.log('date => ' + e.date21);
				}
		   },
			   

			    radioChange: function(evt) {
				        let that=this;
			            for (let i = 0; i < this.items.length; i++) {
			                if (this.items[i].value === evt.target.value) {
			                    this.current = i;
			                    break;
			                }
			            }
						console.log("你好,单选框的index是"+evt.detail.value);
						
						if(evt.detail.value==1)
						{
							that.expressConfig=1;//表示支持包邮
						}else if(evt.detail.value==2)
						{
							that.expressConfig=2;//表示选择的是不包邮
						}else if(evt.detail.value==3)
						{
							that.expressConfig=3;//表示支持的是邮费到付
						}
						console.log("你好,当前的expressConfig是"+that.expressConfig);
						
						
			        },
			
			myExpressFun1(e){
			 let that=this;
				console.log("你好，当前的选中的状态是"+e.detail.value.length); 
				//表示空调被选中
				 if(e.detail.value.length !=0){  
					 that.isExpress1=1;
					 console.log("包邮复选框选中了！"); 
					  that.mycheck1=true;
					  that.mycheck2=false;
					  that.mycheck3=false;
					  console.log("此时isExpress1的值是"+that.isExpress1);
					
				}  else{ //表示空调没有被选中
				     that.mycheck1=false;
					 that.isExpress1=0;
					
					 console.log("包邮复选框没有选中！");
					 console.log("此时isExpress1的值是"+that.isExpress1);
				}
			},
			
			myExpressFun2(e){
			  let that=this;
				console.log("你好，当前的选中的状态是"+e.detail.value.length); 
				//表示空调被选中
				 if(e.detail.value.length !=0){  
					 
					  that.mycheck1=false;
					  that.mycheck2=true;
					  that.mycheck3=false;
					  
					   that.isExpress1=2;
					 console.log("不包邮复选框选中了！");  
					 console.log("此时isExpress1的值是"+that.isExpress1);
					
				}  else{ //表示空调没有被选中
				     that.mycheck2=false;
					 that.isExpress1=0;
					 console.log("不包邮复选框没有选中！");
					 console.log("此时isExpress1的值是"+that.isExpress1);
				}
			},
			
			myExpressFun3(e){
			  let that=this;
				console.log("你好，当前的选中的状态是"+e.detail.value.length); 
				//表示空调被选中
				 if(e.detail.value.length !=0){  
					 that.isExpress1=3;
					 that.mycheck1=false;
					 that.mycheck2=false;
					 that.mycheck3=true;
					 
					 console.log("包邮到付复选框选中了！");  
					 console.log("此时isExpress1的值是"+that.isExpress1);
					
				}  else{ //表示空调没有被选中
				     that.mycheck3=false;
					 that.isExpress1=0;
					 console.log("包邮到付复选框没有选中！");
					 console.log("此时isExpress1的值是"+that.isExpress1);
				}
			},
				
         	closeTheShadowDiv:function(e)
			{
				
				//console.log("你好,你点击的索引是"+index);
				let that=this;
				console.log("你好,当前的scaleList的长度是"+that.scaleList1.length);
				console.log(e.currentTarget.dataset.closeindex);
				//let myindex=e.currentTarget.dataset.closeindex;
				console.log("你好,你点击了关闭按钮!!!");
			
			   //that.$set(that.scaleList1,that.scaleList1.splice(e.currentTarget.dataset.closeindex,1));
			 //that.scaleList1.splice(that.scaleList1.indexOf(index),1);
			 
			   that.scaleList1.splice(e.currentTarget.dataset.closeindex,1);
		
			    console.log("你好,你点击的索引是"+e.currentTarget.dataset.closeindex);

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
			bindPickerChange2: function(e) {
				let that=this;
				// console.log('picker发送选择改变，携带值111为', that.array[e.target.value])
				console.log('picker发送选择改变，携带值为', that.array4[e.target.value])
				that.index2 = e.target.value;
				console.log("你好,选择的index2是"+that.index2);
				if(that.index2==0)
				{
					that.payment=2;//表示普通支付
					that.myFlag1000=true;
				    that.myFlag1001=false;
				}else if(that.index2==1)
				{
					that.payment=1;//表示联盟支付
					that.myFlag1001=true;
					that.myFlag1000=false;
				}
				
				//that.carNumFull=that.carNumStart.concat(that.carNumEnd);
			},
			
			bindPickerChange: function(e) {
				let that=this;
			    console.log('picker发送选择改变，携带值为', e.target.value)
			    that.index = e.target.value
			},
			bindPickerChanges: function(e) {
				let that=this;
			    that.index = e.detail.value
			    console.log('可以传data-xx:xx',e.currentTarget.dataset.index,'\n默认传过来的是下标：',e.detail.value,'\n也可以传普通json传过来的id等：',e.currentTarget.dataset.id);
			},
			bindDateChange: function(e) {
				let that=this;
			    that.date1= e.target.value
				console.log("你好,你选择的时间是"+that.date1);
				that.timerStartTime=that.date1; 
			},
			bindDateChange3:function(e)
			{
				let that=this;
				
				
				
				that.date3 = e.target.value
				
				console.log("你好,你选择的时间3是"+that.date3);
			
				that.timerEndTime=that.date3;
				
			},
			bindTimeChange: function(e) {
				let that=this;
			    that.time = e.target.value
			},
			getDate(type) {
			    const date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
			
			    if (type === 'start') {
			        year = year - 60;
			    } else if (type === 'end') {
			        year = year + 2;
			    }
			    month = month > 9 ? month : '0' + month;;
			    day = day > 9 ? day : '0' + day;
			    return `${year}-${month}-${day}`;
			},	
			
			shopBrandChange:function(e)
			{
			
				
				let that=this;
			    console.log("你好,你选择的商品品牌的索引是"+e.detail.value);
				that.shopBrandIndex=e.detail.value;
				
				if(that.shopBrandIndex==0){
					console.log("你好,你选择的索引是0");
					that.showBrandFlag=true;
				}
				
				console.log("你好,你选择的品牌的id是"+e.currentTarget.dataset.brandid);
				
				
			},
			
			improveStandard:function()
			{
			   console.log("你好,你点击了完善规格按钮10000!!!");	
				let that=this;
				that.productpriceText="商品售价";
				that.productpicText="规格图片";
				that.marketpriceText="市场定价";
				that.productstockText="商品库存";

			},
			cancelSet:function()
			{
				console.log("你好,你点击了取消设置按钮");
				let that=this;
				this.showTheModal=false;
			},
			saveScale:function(e)
			{	
				console.log("你好,你点击了保存规格按钮!!!");
				let that=this;
				if(e.currentTarget.dataset.productpricevalue==""){
					uni.showToast({
						title:"请填写商品售价",
						content:"请填写商品售价"
					});
					return;
				}
				
				
				if(e.currentTarget.dataset.productstockvalue==""){
					uni.showToast({
						title:"请填写商品库存",
						content:"请填写商品库存"
					});
					return;
				}
				
				if(e.currentTarget.dataset.marketpricevalue==""){
					uni.showToast({
						title:"请填写市场定价",
						content:"请填写市场定价"
					});
					return;
				}
				
				if(e.currentTarget.dataset.productpicvalue==""){
					uni.showToast({
						title:"请选择商品图片",
						content:"请选择商品图片"
					});
					return;
				}
				that.showTheModal=false;
				
				//console.log("你好,获得的imgsrc是"+e.currentTarget.dataset.imgsrc);//图片文本
				that.productpicText=e.currentTarget.dataset.productpicText; //商品图片文本
				that.productstockText=e.currentTarget.dataset.productstockText;//商品库存标题文本
				that.productpriceText=e.currentTarget.dataset.productpriceText;//商品售价标题文本
				that.marketpriceText=e.currentTarget.dataset.marketpriceText;//市场定价标题文本
				console.log("你好,获得的值1是"+e.currentTarget.dataset.productpricevalue);//商品售价具体值
				console.log("你好,获得的值2是"+e.currentTarget.dataset.marketpricevalue);//市场定价具体值
				console.log("你好,获得的值3是"+e.currentTarget.dataset.productstockvalue);//商品库存具体值
				console.log("你好,获得的值4是"+e.currentTarget.dataset.productpicvalue);//商品图片具体值
				console.log("你好,获得的值5是"+e.currentTarget.dataset.productpricetext);//商品售价具体值
				console.log("你好,获得的值6是"+e.currentTarget.dataset.marketpricetext);//市场定价具体值
				console.log("你好,获得的值7是"+e.currentTarget.dataset.productstocktext);//商品库存具体值
				console.log("你好,获得的值8是"+e.currentTarget.dataset.productpictext);//商品图片具体值
				console.log(e);
				console.log("你好,获得的值9是"+e.currentTarget.dataset.specname);//商品图片具体值
				that.proctListName2.push({
					// "specName":(e.currentTarget.dataset.valuelist).toString(),
					"specName":JSON.parse(e.currentTarget.dataset.specname),
					"productMoney":{
						"name":e.currentTarget.dataset.productpricetext,
						"value":e.currentTarget.dataset.productpricevalue
					},
					"agoraMoney":{
						"name":e.currentTarget.dataset.marketpricetext,
						"value":e.currentTarget.dataset.marketpricevalue
					},
					"stock":{
						"name":e.currentTarget.dataset.productstocktext,
						"value":e.currentTarget.dataset.productstockvalue
					},
					"specImg":{
						"name":e.currentTarget.dataset.productpictext,
						"value":e.currentTarget.dataset.productpicvalue //暂时为空
					}
				});
		          console.log("that.productpriceValue是"+that.productpriceValue);
		       	  that.productpriceValue=e.currentTarget.dataset.productpricevalue;
		       	  that.marketpriceValue=e.currentTarget.dataset.marketpricevalue;
		       	  that.productstockValue=e.currentTarget.dataset.productstockvalue;
		       	  that.scaleImgs=e.currentTarget.dataset.productpicvalue;
	
				
				console.log(that.proctListName2,"dfd");
				console.log("你好,没有截取之前proctListName2的长度是"+that.proctListName2.length);
				// that.proctListName.push(that.productStockText);
				 //that.proctListName.push(that.proctListName);
				 console.log("添加成功!!!");
				 that.proctListName2=that.proctListName2.splice(0,1);
				 console.log("你好,截取之后proctListName2的长度是"+that.proctListName2.length);
			     console.log(that.proctListName2);
				 console.log("dangqain"+that.newProctListName);
				 console.log(that.proctListName2,that.specName2,"yyyyyyyyyyyyyyyy");
				 
				// this.showTheShadow=false;
				that.showTheShadow=true;
			},
			//省
			provinceListChange(e){
				this.provinceIndex=e.detail.value;
				this.citySearch();
			},
			//市
			cityListChange(e){
				this.cityIndex=e.detail.value
			},
			//联盟经费的改变
			proRatio(index){
				this.productRatio=index
				console.log("你好,我选择的是"+this.productRatio);
			},
			//查询市
			citySearch(){
				let that=this;
				that.$ajax({
					url:"/shopProduct/getCommonAddressCityList",
					method:"POST",
					data:{
						proCode:that.provinceList[that.provinceIndex].code
					},
					success(d){
						that.cityList=d;
						if(that.initNum[2]==0){
							that.initNum[2]=1
							for(let i in d){
								if(that.produceCity==d[i].code){
									that.cityIndex=i;
									break;
								}
							}
						}
					}
				})
			},
			getBytesLength (str) {
			  var num = str.length; //先用num保存一下字符串的长度（可以理解为：先假设每个字符都只占用一个字节）
			  for (var i = 0; i < str.length; i ++) { //遍历字符串
				if (str.charCodeAt(i) > 255) { //判断某个字符是否占用两个字节，如果是，num再+1
				  num ++;
				}
			  }
			  return num; //返回最终的num，既是字符串总的字节长度
			},
			
			//规格图片选择
			scaleImgsChoose(index,type){
				
				console.log("//////"+index);
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
				  				'fileName':"/product/",
				  			},
				  			filePath:res.tempFilePaths[0],
				  			success(d){
								console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^"+d);
				  				that.scaleList1[index].specImg.value=d
				  			    //that.shopEnvironment=d;
				  				console.log("你好,上传商品规格图片照片成功!!!!!!!!!!!!!!!!!");
				  			}
				  		})
				  	}
				  });
				
				
				
				
			},
			//商品图片选择
			proImgsChoose2(type){
				let that=this;
				
				if(type==1&&that.proImgs.length>4){
					uni.showToast({
					    title:"商品图片最多上传五张",
						icon:"none"
					});
					return
				}
				
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function (res) {
						if(that.limit(res.tempFiles[0].size)>3){
							uni.showToast({
								title:"图片太大",
								icon:"none"
							})
							return
						}
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
									
									console.log("66666666666666666666666666666666666666666666666666你好,当前的proImgs的长度是"+that.proImgs.length);
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
	
			//商品图片选择
			proImgsChoose(type){
				let that=this;
				
				if(type==1&&that.proImgs.length>4){
					uni.showToast({
					    title:"商品图片最多上传五张",
						icon:"none"
					});
					return
				}
				
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function (res) {
						if(that.limit(res.tempFiles[0].size)>3){
							uni.showToast({
								title:"图片太大",
								icon:"none"
							})
							return
						}
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
								}else{
									//商品详情图
									that.proDetailsImg.push(d)
								}
							}
						})
						

					},
				});
			},
			
			//商品图片上传
		
			uploadImg(base64,type){
				let that=this;
				uni.showLoading({
					title: '加载中'
				});
				that.$ajax({
					url:"/commonUpload/upload",
					method:"POST",
					data:{
						// base64Img:base64,
						file:base64,
						fileName:"/product/",
						//artworkMaster:0
					},success(d){
						console.log(d);
						uni.hideLoading();
						
					}
				})
			},
			//图片的删除
			del(index,type){
				let that=this;
				console.log(index)
				if(type==1){
					//商品图片
					 that.proImgs.splice(index, 1);
				}else{
					
					//商品详情图
					that.proDetailsImg.splice(index, 1);
				}
			},
			//删除商品规格图片
			delScaleImg:function()
			{
				let that=this;
				// console.log(index)
				if(type==2){
					//商品图片
					 that.scaleImgs.splice(index, 1);
				}else{
					
					//商品详情图
					that.scaleImgs.splice(index, 1);
				}
			},


			//邮费
			expressFun(e){
				this.expressConfig=e.detail.value.length==1?1:2
			},
			//商品一级分类
			shopClassifyChange(e){
				this.shopIndex=e.detail.value
			},
			// expressFun(e){
			// 	that.expressConfig=e.detail.value.length==1?1:2
			// },
			expressFun2(e)
			{
				let that=this;
				console.log("当前的checkbox的值是"+e.detail.value);
				
				if(e.detail.value.length !=0){
				      //that.isWifi=1;
					  
					 console.log("第二个复选框选中了！");  
					 that.setTimeSell=true;
					 that.isTimer=1;
					
				}  else{ //表示空调没有被选中
					  //that.isWifi=0;
					 console.log("第二个复选框没有选中！");
					 that.setTimeSell=false;
					  that.isTimer=2;
				}

			},
		
			isCheckChange:function()
			{
			    let that=this;
				that.isCheck=!that.isCheck;
			},	
			
			
			
			//商品三级查询
			selectThree(cid){
				let that=this;
				that.$ajax({
					url:"/shopProduct/getByThreeCate",
					method:"POST",
					data:{
						cateSource: 5,
						cid: cid
					},
					success(d){
						that.threeCate=d;
						if(that.initNum[0]==0){
							that.initNum[0]=1
							for(let i in that.threeCate){
								if(that.cateId3==that.threeCate[i].cateid){
									console.log(i,"i");
									that.threeIndex=i;
									that.threeCateFun("",that.threeCate[i].cateid)
									break;
								}
							}
						}else{
							that.threeCateFun()
						}
						
					}
				})
			},
			//商品二级分类
			twoCateFun(e){
				let that=this;
				that.twoIndex=e.detail.value;
				that.selectThree(that.twoCate[that.twoIndex].cid)
			},
		   //商品三级分类
			threeCateFun(e,id){
				console.log(14);
				let that=this;
				if(e&&e.detail.value){
					this.threeIndex=e.detail.value;
					that.cateId=e.currentTarget.dataset.cateid;
				}else if(id){
					that.cateId=id;
				}else{
					this.threeIndex=0;
					that.cateId=that.threeCate[that.threeIndex].cateid
				}
				
				const md5 = require('@/js_sdk/js-md5');
				let token="";
				uni.getStorage({
					"key":"Token",
					success: function (res) {
						token=res.data
					}
				})
				let timestamp=(new Date()).valueOf()
				let sign=md5("v2.0"+timestamp+token);
				
				uni.request({
				  	url:that.$ybtUrl+"/shopProduct/getProductCateSpec",
					method:"POST",
					data:{	
							t:{
								cateId:that.threeCate[that.threeIndex].cateid,
							},
							"sign":sign,
							"timestamp": timestamp,
							"token":token||"",
							"version": "v2.0"	
					 	},
					header:{
						"Content-Type": "application/json",
					},
					dataType: 'json',
					success: function (res){
						console.log("恭喜5893457834");
						console.log(res);
						console.log(res.data.code);
						if(res.data.code==200)
						{
						    // uni.showToast({
						    // 	title:"恭喜，有规格了",
						    // 	content:"恭喜，有规格了"
						    // });	
							that.proctListName2=[];
							that.proctListName3=res.data.data;
							that.scaleList1=res.data.data;
							that.showTheBtn=true;
							
							that.showTheNewFlag=true;
							that.getSelectShopProductBrand()
						}else{
							uni.showToast({
								title:res.data.msg,
								content:"你好,暂时没有规格"
							});
							that.proctListName2=[];
							that.productpriceText="";
							that.marketpriceText="";
							that.productstockText="";
							that.productpicText="";
							that.showTheBtn=false;
							that.showTheNewFlag=false;
							
							that.getSelectShopProductBrand()
							return;
							
							
						}	
					}	
						
				})
				
				
				
			},
			getSelectShopProductBrand(){
			
				let that=this;
				that.$ajax({
					url:"/shopProduct/getSelectShopProductBrand",
					method:"POST",
					data:{
						cateId3:that.threeCate[that.threeIndex].cateid
					},
					success(res){
						that.shopBrand=res;
						
						console.log("你好,得到的shopBrand的长度是"+that.shopBrand.length);
						
						console.log("你好,得到的shopBrand是----------------------"+that.shopBrand);
						
						// console.log("/////////////////你好,当前的brandid是"+d.brandid);
						//console.log("dfd"+that.shopBrand.filter((item)=>item.brandname=="其它"));
						// for(var i=0;i<d.length;i++)
						// {
						// 	if(d[i].brandname=="其它")
						// 	{
						// 		console.log("尊敬的客户,你好,你已经选择了品牌中的其它类型!!!!!!!!!!");
						// 		that.showBrandFlag=true;	
						// 	}
						// }		
						if(that.initNum[1]==0){
							that.initNum[1]=1;
							for(let i in res){
								if(that.brandId==res[i].brandid){
									that.shopBrandIndex=i;
									break;
								}
							}
						}
						
					}
				})
				
			},
			//初始化
			init(type){
				//console.log("-------------------------"+that.threeCate[that.threeIndex].cateid);
				
				let that=this;
				console.log(that.threeCate,"1");
				
				//查询二级分类
				that.$ajax({
					url:"/shopProduct/getByTwoCate",
					method:"POST",
					data:{
						cateId:3
					},
					success(d){
						that.twoCate=d;
						if(that.initNum[0]==0){
							for(let i in that.twoCate){
								if(that.cateId2==that.twoCate[i].cateid){
									that.twoIndex=i;
									that.selectThree(that.twoCate[that.twoIndex].cid)
									break;
								}
							}
						}else{
							that.selectThree(that.twoCate[that.twoIndex].cid)
						}
						
					}
				})
				
				//查询省
				that.$ajax({
					url:"/shopProduct/getCommonAddressProvinceList",
					method:"POST",
					success(d){
						
						console.log("这是查询省的接口8888888888888888"+d);
						
						that.provinceList=d;
						if(that.initNum[2]==0){
							for(let i in d){
								if(that.produceProvince==d[i].code){
									that.provinceIndex=i;
									break;
								}
							}
						}
						that.citySearch()
					}
				})
				
			},
			//保存
			save(){
				let that=this;
				console.log(0);
				console.log("你好,当前的scaleList的长度是"+that.scaleList1.length);
				
			    console.log("你好,提交的scaleList是"+that.scaleList1);
				
				console.log("that.shopName是"+that.shopName);
				console.log("that.shopPrice是"+that.shopPrice);
				console.log("that.proImgs.length是"+that.proImgs.length);
				console.log("that.skoce是"+that.skoce);
				console.log("that.proDetailsImg.length是"+that.proDetailsImg.length);	
				console.log("你好,提交之前的数据是"+JSON.stringify(that.proctListName2).toString());
				console.log("你好,提交之前的cateId1是"+that.cateId1);
				console.log("你好,提交之前的cateId2是"+that.twoCate[that.twoIndex].cateid);
				console.log("你好,提交之前的cateId3是"+that.threeCate[that.threeIndex].cateid);
				console.log("你好,提交之前的商品的id是%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"+that.shopBrand[that.shopBrandIndex].brandId);
				console.log("你好,提交之前的商品的name是%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"+that.shopBrand[that.shopBrandIndex].brandName);
				console.log("你好,提交之前的商品的typeBrandName是%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"+that.typeBrandName);
				if(!that.shopName||!that.price||!that.shopPrice||that.proImgs.length==0||!that.skoce||that.proDetailsImg.length==0){
					uni.showToast({
						title:"请填写完整的信息",
						icon:"none"
					})
					return
				}
				if(that.isreq){
					return
				}
				
				
				
				
				
				that.isreq=true
				that.$ajax({
					url:"/shopProduct/saveShopProduct",
					method:"POST",
					data:{
						brandId:that.shopBrand[that.shopBrandIndex].brandId,//商品的品牌id
						brandName:(that.shopBrand[that.shopBrandIndex].brandId==-1)?(that.typeBrandName):(that.shopBrand[that.shopBrandIndex].brandName),//如果brandid为-1,则说明用户选择的是其它,此时传的是品牌是用户输入的品牌名称,如果不为-1,brandid和brandname传入
						cateId1: 3,//商品的一级id
						cateId2: that.twoCate[that.twoIndex].cateid,//商品的二级id
						cateId3: that.threeCate[that.threeIndex].cateid,//商品的三级的id
						expressConfig: that.expressConfig,//是否包邮的标志位
						keyWord: that.keyWord,//关键字
						originalImg: that.proImgs,//商品的图片
						produceCity: that.cityList[that.cityIndex].code,//商品产地市
						produceProvince: that.provinceList[that.provinceIndex].code,//商品产地省
						productDescribeImg: that.proDetailsImg,//商品详情图片
						productId: that.proId||"",//商品的id
						productName: that.shopName||"",//商品的名字
						productRatio: that.productRatio==0?8:15,//联盟经费
						// productTitle: that.shopIntr,//商品简介
						productmMinMoney: Number(that.price*1),
						shopId: that.shopObj.shopId,
						sumStock: Number(that.skoce*1),
						weight: Number(that.proWeight),
						payMent:that.payment,
						agoraMoney:Number(that.shopPrice),
						isTimer:that.isTimer,
					    jsonArraySpec:JSON.stringify(that.scaleList1).toString()||null,
						//jsonArraySpec:that.scaleList1||[],
						timerStartTime:that.timerStartTime||"2019-01-01 12:01:23",//定时销售开始时间
						timerEndTime:that.timerEndTime||"2019-08-01 12:01:23" ,//定时销售结束时间
						timerMoney:Number(that.timerMoney),//定时销售价格
						timerSaleCount:Number(that.timerSaleCount) ,//定时销售数量
						commissionRatio:Number(that.sharingofEmployment) ,//分享的雇金
						
					},
					success(d){
						that.isreq=false;
						uni.showToast({
							title:"操作成功",
							icon:"none"
						})
						// setTimeout(function() {
						// 	uni.navigateBack({
						// 		delta: 1
						// 	});
						// }, 1500);
						
					},
					error(){
						that.isreq=false;
					}
				})
			}
		},
	
	
		onLoad(e){
			let that=this;
		  // console.log("初始化的数据如下:"+this.shopBrand[this.shopBrandIndex].brandname);
			
			console.log("你好,当前的expressConfig是"+that.expressConfig);
			
			// console.log("你好,刚开始时候的cateId是:"+that.threeCate[that.threeIndex].cateid);
			 
			uni.getStorage({
				key:"shopObj",
				success(res){
					that.shopObj=JSON.parse(res.data);
				}
			});
			
			
			/*that.$ajax({
				url:"/shopProduct/getProductCateSpec",
				method:"POST",
				data:{
					cateId:"43676"
				},
				success(d){
					console.log("根据商品三级id拿到完善规格的相关的数据!"+d);
				   // console.log("完善规格的相关的数据如下!"+JSON.parse(d));
					
					that.proctListName3=d;
					console.log(that.proctListName3,"ds");
					//console.log("这是agoraMoney"+that.proctListName2[0].agoraMoney.name);
				 //    that.proctListName3.forEach(item=>{
					// 	item.specName=JSON.stringify(item.specName)
					// })
					console.log(that.proctListName3);
				   //that.specName=that.proctListName3[0].specName;
					
					
					console.log("数据一请求,首先拿到that.specName--"+that.specName)
					
					// that.productpriceText=that.proctListName3[0].productMoney.name;
					// that.marketpriceText=that.proctListName3[0].agoraMoney.name;
					// that.productstockText=that.proctListName3[0].stock.name;
					// that.productpicText=that.proctListName3[0].specImg.name;
					// 
					// that.productpriceValue=that.proctListName2[0].productMoney.value;
					// that.marketpriceValue=that.proctListName2[0].agoraMoney.value;
					// that.productstockValue=that.proctListName2[0].stock.name;
					// that.productpicValue=that.proctListName2[0].specImg.name;
					
					// productPrice:"",//商品售价
					// marketPrice=:"",//市场定价
					// productStock:"",//商品库存
					// productPic:"",//商品图片
				}
			})
			*/
			if(e.proId){
				this.proId=e.proId;
				uni.setNavigationBarTitle({
					title: '商品编辑'
				});
				this.$ajax({
					url:"/shopProduct/getUpdateProduct",
					method:"POST",
					data:{
						productId:that.proId
					},
					success(d){
						console.log(d)
						console.log("你好,得到的d是"+d);
						console.log("你好,此条语句执行了");
						console.log("你好,得到的commision是"+d.commissionRatio);
						that.proImgs=d.originalImg;
						//that.proctListName2=d.listArray;
						
						console.log("页面初始化的时候的scaleList1是"+d.listArray);
						that.scaleList1=d.listArray;
						that.shopName=d.productName||"";
						that.skoce=d.sumStock||"";
						that.shopIntr=d.productTitle||"";
						that.keyWord=d.keyWord||"";
						that.price=d.productmMinMoney||"";
						that.productRatio=d.productRatio==15?1:0;
						that.expressConfig=d.expressConfig;
						that.proWeight=d.weight;
						that.cateId2=d.cateId2;
						that.cateId3=d.cateId3;
						//that.setTimeSell=true;
						that.isTimer=d.isTimer;
						that.payment=d.payMent;
						
						
						console.log("你好,得到的payment是"+that.payment);
						if(that.payment=1) //表示联盟支付
						{
							that.index2=1;
						}else
						{
							that.index2=0; //表示普通支付
						}
						console.log("你好,得到的isTimer是"+that.isTimer);
						
						if(that.isTimer==1)
						{
							that.setTimeSell=true;
						}else{
							that.setTimeSell=false;
						}
						
						that.timerEndTime=d.timerEndTime||"2019-01-01 12:01:12";;
						that.timerMoney=d.timerMoney;
						that.timerSaleCount=d.timerSaleCount
						that.timerStartTime=d.timerStartTime||"2019-01-01 12:01:12";
						
						that.brandId=d.brandId;
						that.shopPrice=d.agoraMoney||"";
						that.produceCity=d.produceCity;
						that.produceProvince=d.produceProvince;
						
						that.sharingofEmployment=d.commissionRatio;
						
						var imgReg = /<img.*?(?:>|\/>)/gi;
						var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
						var arr = [];
						if(d.productDescribe){
							arr=d.productDescribe.match(imgReg)
						}
						console.log(arr,"arr")
						// that.$ajax({
						// 	url:"/shopProduct/getByTwoCate",
						// 	method:"POST",
						// 	data:{
						// 		cateId:3
						// 	},
						// 	success(d){
						// 		that.twoCate=d;
						// 		console.log(that.initNum,"dfas");
						// 		if(that.initNum[0]==0){
						// 			for(let i in that.twoCate){
						// 				if(that.cateId2==that.twoCate[i].cateid){
						// 					that.twoIndex=i;
						// 					break;
						// 				}
						// 			}
						// 		}
						// 		that.selectThree(that.twoCate[that.twoIndex].cid)
						// 	}
						// })
						for (var i = 0; i < arr.length; i++) {
							var src = arr[i].match(srcReg);
							console.log(src,"111")
							 //获取图片地址
							that.proDetailsImg.push(src[1])
						}
						that.init(1)
					}
				})				
			}else{
				that.initNum=[1,1,1];
				that.init()
			}
		}
	
	
	}
</script>

<style scoped>
	*{
		margin:0px;
		padding:0px;
	}
		.closeModal{
				width:60upx;
				height:60upx;
				background:red;
				color:#fff;
				border-radius:50%;
				position:absolute;
				top:-20upx;
				right:-20upx;
				font-size:200%;
				text-align:center;
				line-height:60upx;
			}
	page{
		overflow-x:hidden;
		box-sizing: border-box;
	}
	
	.scaleText1{
		vertical-align:text-top;display:inline-block;
	}
	.scaleText2{
		vertical-align:text-top;display:inline-block;width:83%;min-height:360upx;background:rgba(0,0,0,0.18);border-radius:20upx;margin-left:10upx;
	}
	.scaleText3{
		width:100%;height:60upx;margin-top:0upx;
	}
	.scaleText4{
		margin-left:20upx;display:inline-block;vertical-align:baseline;
	}
	.scaleText5{
		border-bottom:1px solid rgba(0,0,0,0.18);width:60%;display:inline-block;vertical-align:baseline;
	}
	
	
	
	
	.mystep3Text{
		margin-top:30upx;
	}
	.text101{
		font-size:26upx;
	}
	.text102{
		width:100%;background:rgba(0,0,0,0.16);position:relative;left:10upx;border-radius:20upx;
		padding:10upx 20upx;min-height:300upx;
	}
	.text103{
		width:120upx;height:120upx;flex-shrink:0;
	}
	.text104{
		flex:1;height:340upx;text-align:left;position:relative;top:0upx;color:rgba(0,0,0,0.36);align-items:center;
		background:yellow;
	}
	.text105{
		height:50upx;font-size:28upx;flex:1;width:100%;
	}
	.text106{
		height:50upx;font-size:28upx;flex:1;width:100%;
	}
	.text107{
		height:50upx;font-size:28upx;flex:1;width:100%;
	}
	.text108{
		height:50upx;font-size:28upx;flex:1;width:100%;
	}
	.text109{
		width:50upx;height:50upx;border-radius:50%;background:red;position:absolute;top:-30upx;right:40upx;
		text-align:center;color:#fff;line-height:50upx;font-size:150%;
	}
	
	.otherBrand{
		border:1px solid rgba(0,0,0,0.16);
		font-size:26upx;
		display:inline-block;
		vertical-align:middle;
		height:60upx;
		margin-left:30upx;
		text-indent:30upx;
	}
	.test{
		text-align: center;
		padding: 10px 0;
	}
	button{
		margin: 20upx;
		font-size: 28upx;
	}

	.WrapSmallShop{
		width:100%;
		height:150upx;
	    /* background:red; */
		display:flex;
		align-items:center;
		flex-wrap: wrap;
	}
	.smallItem{
		width:33.3%;
		height:100upx;
	     /* background:green; */
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
	
	.fixedCtn{
		width:80%;
		height:760upx;
		background:#fff;
		position:absolute;
		left:0px;
		top:50%;
		overflow:hidden;
		border-radius:20upx;
		margin-top:-400upx;
		margin-left:6%;
		z-index:1000;
	}
	.botTwoChoose{
		width:100%;
		height:80upx;
		background: rgba(0,0,0,0.08);
		position:absolute;
		bottom:0px;
		left:0px;
		display:flex;
		flex-direction:row;
		align-items:center;
		/* justify-content:space-between; */
	}
	.botTwoChooseLeft{
		font-size:30upx;
		width:50%;
		float:left;
		text-align:center;
	}
	.botTwoChooseMid{
		width:1px;
		height:80upx;
		background:rgba(0,0,0,0.18);
	}
	.botTwoChooseRight{
		font-size:30upx;
		width:50%;
		float:right;
		margin-left:-1px;
		text-align:center;
	}
	/* .wrapModalView{
		width:100%;
		height:100%;
		position:fixed;
		top:0px;
		left:0px;
		right:0px;
		background:red;
		z-index:0;
	} */
	
	.inlines{
		font-size:30upx;
	}
	.eletextarea{
		border-bottom:1px solid rgba(0,0,0,0.16);
		margin-top:15upx;
		margin-left:-5upx;
	}
	.flexboxdiv{
		display:flex;
		align-items:center;
	}
	.payWay{
		width:150upx;
		font-size:30upx;
	}
	.choosePayWay{
		flex-grow:1;
		font-size:30upx;
	}
	
	.scaleSetView{
		background:#ED3535;
		color:#fff;
		width:180upx;
		height:54upx;
		line-height:54upx;
		border-radius:8upx;
		text-align:center;
		font-size:30upx;
		
	}
	.newviewBot1{
		font-size:30upx;
	}
	.newviewBot2{
		width:300upx;
	}
	.content{
		background: #f2f2f2;
		padding: 0;
	}
	.flexbox{
		display:flex;
	}
	.viewBot1{
		width:150upx;
	}
	.tiptext{
		font-size:30upx;
		color:rgba(0,0,0,0.35);
		margin-left:150upx;
		margin-top:10upx;
	}
	.belowTextTitle{
		color:rgba(0,0,0,0.96);
		font-size:30upx;
	}
	.belowTextPicker{
		color:rgba(0,0,0,0.66);
		font-size:28upx;
	}
	.imgClass1{
		margin-left:0upx;
		margin-top:15upx;
	}
	.imgClass2{
		margin-left: 120upx;
		margin-top:15upx;
	}
	
	.viewBot2{
	    flex-grow:1;
		padding-bottom:5upx;
	}
	.viewBot1,.viewBot2{
		display:inline-block;
		vertical-align:middle;
	}
	.content>view{
		padding: 30upx;
		background: #fff;
		font-size: 36upx;
		margin-bottom: 20upx;
	}
	.step2>view{
		margin-bottom: 20upx;
	}
	.step2 picker{
		width:160upx;
		
	}
	.uni-icon{
		margin-top: -40upx;
	}
	.ellipsis{
		line-height:60upx;
		width:120upx;
		display: inline-block;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	picker{
		display: inline-block;
		width: 500upx;
		margin-left: 20upx;
		vertical-align: middle;
		border:1px solid #eee;
		padding-left: 10upx;
		border-radius: 20upx;
	}
	.shopNameCls{
		border-bottom:1px solid rgba(0,0,0,0.12);
	}
	.step2>view{
		margin-bottom: 20upx;
	}
	.step2 picker{
		width:160upx;
		
	}
	.uni-icon{
		margin-top: -40upx;
	}
	.ellipsis{
		line-height:60upx;
		width:120upx;
		display: inline-block;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	picker{
		display: inline-block;
		width: 500upx;
		margin-left: 20upx;
		vertical-align: middle;
		border:1px solid #eee;
		padding-left: 10upx;
		border-radius: 20upx;
	}
	.shopInfo{
		margin-top:30upx;
	}
	.shopInfo>view{
		margin-bottom: 20upx;
	}
	.shopInfo input{
		display: inline-block;
		width:550upx;
		border-bottom: 1px solid #eee;
		vertical-align: middle;
		margin-left: 20upx;
		font-size: 24upx;
	}
	textarea{
		display: inline-block;
		width:550upx;
		height:auto;
		font-size: 26upx;
		margin-left: 20upx;
		vertical-align: text-top;
		border-bottom:1px solid #eee;
	}
	button{
		width:525upx;
		height:72upx;
		text-align: center;
		background: #EE3535;
		line-height: 72upx;
		color:#fff;
		margin: 35upx auto 50upx;
		border-radius: 20upx;
		font-size: 28upx;
	}
	.step3>view{
		margin-bottom: 10upx;
	}
	.inline{
		display: inline-block;
		width: 560upx;
		font-size: 22upx;
		vertical-align: text-top;
		margin-left: 10px;
		color:#999;
	}
	.step3 .btn{
		display: inline-block;
		width:105upx;
		height: 48upx;
		line-height: 48upx;
		border-radius: 10upx;
		background: #f3f3f3;
		color:#666;
		margin-bottom: 20upx;
		text-align: center;
		margin-right: 20upx;
	} 
	.right{
		display: inline-block;
		width: 520upx;
		vertical-align: text-top;
	}
	.step3 .btn.active{
		background: #EE3535;
		color:#fff;
	}
	.step3 input,.step4 input{
		width:160upx;
		margin: 0 20upx;
		vertical-align: middle;                                                                                                             
		display: inline-block;
		border-bottom: 1px solid #eee;
	}
	
	.color{
		color:#EE3535;
	}
	.step3 .textInfo{
		margin-top: 20upx;
		margin-left: 120upx;
		color:#999;
		font-size: 18upx;
	}
	.step3 image,.step4 image{
		margin-left: 20upx;
		display: inline-block;
		width:110upx;
		vertical-align: top;
	}
	.step3 image{
		height:110upx;
	}
	.step4 image{
		width:520upx;
	}
	.step4 .up{
		width:110upx;
		height:110upx;
	}
	.step4>view{
		margin-bottom: 20upx;
	}
	.step4 .inline{
		color:#333;
		vertical-align: inherit;
	}
	.left{
		display: inline-block;
		width: 106upx;
	}
	.step4 .input{
		width:520upx
	}
	.step4 .inlines{
		display: inline-block;
		margin-right: 20upx;
		margin-left: 20upx;
		font-size: 18upx;
		color:#999;
		vertical-align:middle;
	}
	.step4 .inlines textarea{
		margin-bottom: 20upx;
	}
	.imgs{
		display: inline-block;
		vertical-align: middle;
		margin-bottom: 20upx;
	}
	.del{
		font-size: 20upx;
		line-height: 36upx;
		text-align: center;;
		background: #ddd;
		width:116upx;
		margin-left: 20upx;
		margin-top: 10upx;
	}
	.myviewBot1{
		font-size:30upx;
	}
	.wviewBot2{
		width:240upx;
	}
	
	
	
	.content{
		background: #f2f2f2;
		padding: 0;
	}
	.content>view{
		padding: 30upx;
		background: #fff;
		font-size: 26upx;
		margin-bottom: 20upx;
	}
	.step2>view{
		margin-bottom: 20upx;
		font-size: 26upx;
	}
	.step2 picker{
		width:160upx;
		
	}
	.uni-icon{
		margin-top: -40upx;
	}
	.ellipsis{
		line-height:60upx;
		width:120upx;
		display: inline-block;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.payWay{
		display:inline-block;
		vertical-align: middle;
	}
	.bhnkk3{
		display:inline-block;
		vertical-align: middle;
	}
	picker{
		display: inline-block;
		width: 500upx;
		margin-left: 20upx;
		vertical-align: middle;
		border:1px solid #eee;
		padding-left: 10upx;
		border-radius: 20upx;
	}
	.bhnkk3{
		width:160upx!important;
	}
	.flexbox{
		display:flex;
	}
	.flexboxdiv{
		display:flex;
		margin-top:40upx;
	}
	.choosePayWay{
		flex-grow:1;
		font-size:30upx;
	}
	.viewBot1{
		width:150upx;
	}
	.newviewBot1{
		font-size:30upx;
	}
	.newviewBot2{
		width:300upx;
	}
	.content{
		background: #f2f2f2;
		padding: 0;
	}
	.flexbox{
		display:flex;
	}
	.viewBot1{
		width:150upx;
	}
	
	.shopInfo{
		margin-top:30upx;
	}
	.shopInfo>view{
		margin-bottom: 20upx;
	}
	.shopInfo input{
		display: inline-block;
		width:550upx;
		border-bottom: 1px solid #eee;
		vertical-align: middle;
		margin-left: 20upx;
		font-size: 24upx;
	}
	
	
	.tiptext{
		font-size:30upx;
		color:rgba(0,0,0,0.35);
		margin-left:150upx;
		margin-top:10upx;
	}
	.scaleSetView{
		background:#ED3535;
		color:#fff;
		width:180upx;
		height:44upx;
		line-height:44upx;
		border-radius:8upx;
		text-align:center;
		font-size:30upx;		
	}
	
	.shopInfo>view{
		margin-bottom: 20upx;
	}
	.shopInfo input{
		display: inline-block;
		width:550upx;
		border-bottom: 1px solid #eee;
		vertical-align: middle;
		margin-left: 20upx;
		font-size: 24upx;
	}
	textarea{
		display: inline-block;
		width:550upx;
		height:160upx;
		font-size: 26upx;
		margin-left: 20upx;
		vertical-align: text-top;
		border-bottom:1px solid #eee;
	}
	button{
		width:525upx;
		height:72upx;
		text-align: center;
		background: #EE3535;
		line-height: 72upx;
		color:#fff;
		margin: 35upx auto 50upx;
		border-radius: 20upx;
		font-size: 28upx;
	}
	.step3>view{
		margin-bottom: 10upx;
	}
	.inline{
		display: inline-block;
		width: 560upx;
		font-size: 22upx;
		vertical-align: text-top;
		margin-left: 10px;
		color:#999;
	}
	.step3 .btn{
		display: inline-block;
		width:105upx;
		height: 48upx;
		line-height: 48upx;
		border-radius: 10upx;
		background: #f3f3f3;
		color:#666;
		margin-bottom: 20upx;
		text-align: center;
		margin-right: 20upx;
	} 
	.right{
		display: inline-block;
		width: 520upx;
		vertical-align: text-top;
	}
	.step3 .btn.active{
		background: #EE3535;
		color:#fff;
	}
	.step3 input,.step4 input{
		width:160upx;
		margin: 0 20upx;
		vertical-align: middle;                                                                                                             
		display: inline-block;
		border-bottom: 1px solid #eee;
	}
	
	.color{
		color:#EE3535;
	}
	.step3 .textInfo{
		margin-top: 20upx;
		margin-left: 120upx;
		color:#999;
		font-size: 18upx;
	}
	.step3 image,.step4 image{
		margin-left: 20upx;
		display: inline-block;
		width:110upx;
		vertical-align: top;
	}
	.step3 image{
		height:110upx;
	}
	.step4 image{
		width:520upx;
	}
	.step4 .up{
		width:110upx;
		height:110upx;
	}
	.step4>view{
		margin-bottom: 20upx;
	}
	.step4 .inline{
		color:#333;
		vertical-align: inherit;
	}
	.left{
		display: inline-block;
		width: 106upx;
	}
	.step4 .input{
		width:520upx
	}
	.step4 .inlines{
		display: inline-block;
		margin-right: 20upx;
		margin-left: 20upx;
		font-size: 18upx;
		color:#999;
		vertical-align:middle;
	}
	.step4 .inlines textarea{
		margin-bottom: 20upx;
	}
	.imgs{
		display: inline-block;
		vertical-align: middle;
		margin-bottom: 20upx;
	}
	.del{
		font-size: 20upx;
		line-height: 36upx;
		text-align: center;;
		background: #ddd;
		width:116upx;
		margin-left: 20upx;
		margin-top: 10upx;
	}
	.scaleSetDivLeft{
		width:200upx;
		height:200upx;
		background:red;
	}
</style>
