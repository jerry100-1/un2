<template>
	<view class="content">
		 
		   <view class="shopInfo">
				<view class="flexbox">
					<text class="viewBot1">商品名称</text>
					<input class="shopNameCls viewBot2"  type="text" v-model="shopName" placeholder="" maxlength="50"/>
				</view>
				<view class="tiptext">商品名称长度至少3个字符, 最长50个汉字</view>
		   </view>
		   
		   	<view class="step2" style="margin-top:-50upx">
		   	<view class="wrapBelowText1">
		   		<text class="belowTextTitle">商品分类</text>	   
		   		<picker class="belowTextPicker"  :range="shopClassify"  @change="shopClassifyChange" >
		   			<view class="ellipsis">
		   					<text class="yticon icon-xia caIco"></text> 
		   				<view class="uni-icon-arrowdown" style="color:red;font-size:30upx;"></view>
		   				
		   			{{shopClassify[shopIndex]||"分类"}}
		   			   <!-- <text class=""></text> -->

		   			</view>
		   			
		   			<!-- <uni-icon type="arrowdown" size="18" color="#999"></uni-icon> -->
		   		</picker>		   		
		   		<picker class="belowTextPicker"   :range="twoCate" @change="twoCateFun" range-key="catename">
		   			<view class="ellipsis">{{twoCate[twoIndex].catename||"分类"}}</view>
		   			<!-- <uni-icon type="arrowdown" size="18" color="#999"></uni-icon> -->
		   		</picker>
		   		<picker class="belowTextPicker"   :range="threeCate" @change="threeCateFun" range-key="catename">
		   			<view class="ellipsis">{{threeCate[threeIndex].catename||"分类"}}</view>
		   			<!-- <uni-icon type="arrowdown" size="18" color="#999"></uni-icon> -->
		   		</picker>
		   	</view>
		   	<view>
		   		<text class="belowTextTitle">商品品牌</text>
		   		<picker class="belowTextPicker"  :range="shopBrand" @change="shopBrandChange" range-key="brandname">
		   			<view class="ellipsis">{{shopBrand[shopBrandIndex].brandname||"分类"}}</view>
		   		<!-- 	<uni-icon type="arrowdown" size="18" color="#999"></uni-icon> -->
		   		</picker>
		   	</view>
		  
			<view>
		   		<text class="belowTextTitle">商品产地</text>
		   		<picker   class="belowTextPicker" :range="provinceList" @change="provinceListChange" range-key="proName">
		   			<view  class="ellipsis">{{provinceList[provinceIndex].proName||"请选择"}}</view>
		   			<!-- <uni-icon type="arrowdown" size="18" color="#999"></uni-icon> -->
		   		</picker>
		   		<picker class="belowTextPicker"  :range="cityList" @change="cityListChange" range-key="proName">
		   			<view class="ellipsis">{{cityList[cityIndex].proName||"请选择"}}</view>
		   			<!-- <uni-icon type="arrowdown" size="18" color="#999"></uni-icon> -->
		   		</picker>
		   	</view>
		
			<view class="step3" style="margin-top:40upx;">
				<view class="flexbox">
					<text class="viewBot1 newviewBot1">商品售价</text>
					<input class="shopNameCls newviewBot2  viewBot2" style="width:320upx!important;"  type="number" v-model="price" placeholder="" maxlength="50"/>
				</view>
				<view class="tiptext">必填项,商品实际销售价格,如果商品存在规格,该价格现实最低价格</view>
				<view class="flexbox">
					<text class="viewBot1 newviewBot1">市场定价</text>
					<input class="shopNameCls newviewBot2 viewBot2"  type="number" v-model="shopPrice" placeholder="" maxlength="50"/>
				</view>
				<view class="tiptext">非必填项,此价格仅为市场参考售价,请根据实际情况认真填写</view>
				
		    </view>
			<view class="step3">
				<view class="flexbox">
					<text class="viewBot1" style="font-size:30upx;">规格设置</text>
					<view class="inline viewBot2">
						<view class="scaleSetView">完善规格</view>
					</view>
				</view>
			</view>
			
			<view class="step3 flexboxdiv">
				<view class="payWay">支付方式</view>
			    <view class="uni-list choosePayWay">
			    	<view class="uni-list-cell">
			    		<view class="">
			    			<picker class="bhnkk bhnkk3" @change="bindPickerChange2" :value="index2" :range="array4">
			    				<view class="uni-input">{{array4[index2]}}</view>
			    			</picker>
			    		</view>
			    	</view>
			    </view>
			    
			</view>
			
			
			
			<view class="step3">
					<view class="flexbox">
						<text class="viewBot1" style="font-size:30upx;">联盟经费</text>
						<view class="inline viewBot2">
							<view class="btn" :class="{active:productRatio==0}" @tap="proRatio(0)">8%</view>
							<view class="btn" :class="{active:productRatio==1}" @tap="proRatio(1)">15%</view>
							<view>该商品交易成功后,平台按比例奖励用户时光豆;8%,奖励交易金额的30%;15%,奖励交易金额的100%;</view>
						</view>
					</view>
			</view>
			
			
			
			<view class="step3" style="margin-top:10upx;">
					<view class="flexbox">
						<text class="viewBot1 newviewBot1">分享雇金</text>
						<input class="shopNameCls newviewBot2 " style="width:320upx!important;"  type="text" v-model="sharingofEmployment" placeholder="" maxlength="50"/>%
					</view>
					<view class="tiptext">非必填项,用户分享该商品完成交易,根据该佣金比例获取佣金</view>
		     </view>	
			 
			 
			<view class="step3">
			 	<text style="font-size:30upx;">商品图片</text>
			 	<view class="right" style="margin-left:15upx;">
			 		<view class="imgs" v-for="(item,index) in proImgs" v-if="proImgs.length>0" :key="index">
			 			<image :src="item"></image>
			 			<view @tap="del(index,1)" class="del">删除</view>
			 		</view>
			 		<image src="../../static/capital/my_add_image@2x.png" @tap="proImgsChoose(1)" v-if="proImgs.length!=5" ></image>
			 	</view>
			 	
			 	<view class="textInfo" style="">
			 		<text>上传商品图片,图片支持jpg,gif,png格式,最多只能上传5张,</text>
			 		<text class="color">建议使用尺寸800x800像素以上,大小不超过1M的正方形图片;</text>
			 	</view>
			 </view>
			 
			 <view style="width:100%;height:30upx;padding-right:14px;margin-left:-14px;background:rgba(0,0,0,0.08);">
				 
			 </view>
			 
			 <view class="step3" style="margin-top:10upx;">
			 		<view class="flexbox">
			 			<text class="viewBot1 newviewBot1">商品重量</text>
			 			<input class="shopNameCls newviewBot2 " style="width:320upx!important;"  type="number" v-model="proWeight"  placeholder="" maxlength="50"/>克
			 		</view>
			  </view>
			  
			  
			 <view class="step3" style="margin-top:10upx;">
			  		<view class="flexbox">
			  			<text class="viewBot1 newviewBot1">最高可购数</text>
			  			<input class="shopNameCls newviewBot2 " style="width:320upx!important;"  type="text" v-model="shopName" placeholder="" maxlength="50"/>
			  		</view>
			   </view>
			 
			 
			 <view class="step3" style="margin-top:10upx;">
					<view class="flexbox">
						<text class="viewBot1 newviewBot1">是否包邮</text>
						<checkbox-group class="inlines" @change="expressFun3">
						    <label>
						        <checkbox value="1" :checked="isPackage==1" color="#EE3535"/>是
						    </label>
						</checkbox-group>
					</view>
			 </view>
			 
			
			 <view class="shopInfo">
					<view class="flexbox">
						<text class="viewBot1 myviewBot1">商品库存</text>
						<input class="shopNameCls viewBot2"  type="number" v-model="skoce" placeholder="" maxlength="50"/>
					</view>
				
			  </view>
			  
			 <view class="shopInfo">
					<view class="flexbox">
						<text class="viewBot1 myviewBot1">关键词</text>
						<input class="shopNameCls viewBot2"  type="text" v-model="keyWord" placeholder="用于用户搜索,多个关键词,用逗号隔开" maxlength="50"/>
					</view>
			  				
			   </view>
			  
	 
			 <view class="shopInfo">
					<view class="flexbox">
						<text class="viewBot1 myviewBot1">商品详情</text>
						<textarea class="eletextarea" placeholder="商品详情文字说明" name="" id="" cols="30" rows="10"></textarea>
					</view>
			  				
			   </view>
			   
			   
			 <view class="step3">
			   	<text style="font-size:30upx;visibility: hidden;">商品图片</text>
					<view class="right" style="margin-left:15upx;">
						<view class="imgs" v-for="(item,index) in proImgs" v-if="proImgs.length>0" :key="index">
							<image :src="item"></image>
							<view @tap="del(index,1)" class="del">删除</view>
						</view>
						<image src="../../static/capital/my_add_image@2x.png" @tap="proImgsChoose(1)" v-if="proImgs.length!=5" ></image>
					</view>
					
					<view class="textInfo" style="">
						<text>上传商品图片,图片支持jpg,gif,png格式,最多只能上传5张,</text>
						<text class="color">建议使用尺寸800x800像素以上,大小不超过1M的正方形图片;</text>
					</view>
			   </view>
			   
			   
			 <view class="step3" style="margin-top:10upx;">
					<view class="flexbox">
						<text class="viewBot1 newviewBot1">是否包邮</text>
						<checkbox-group class="inlines" @change="expressFun">
							<label>
								<checkbox value="1" :checked="expressConfig==2" color="#EE3535"/>非必填项,若未选择,则无限制
							</label>
						</checkbox-group>
					</view>
			   </view>
			   
			   
			    <view class="step3" style="margin-top:10upx;">
						<view class="flexbox">
							<text class="viewBot1 newviewBot1">定时销售</text>
							<checkbox-group class="inlines" @change="expressFun2">
								<label>
									<checkbox value="1" :checked="setTimeSell==1" color="#EE3535"/>非必填项,若未选择,则无限制
								</label>
							</checkbox-group>
						</view>
			   </view>
			   
			 <!-- 以下内容是在条件满足时才会显示 -->  
			 
			 <view v-if="timeSeller">
				 
		<!--------------------------------------------------------- -->			 
			 <view class="shopInfo">
					<view class="flexbox">
						<text class="viewBot1 myviewBot1">开始时间</text>
						<view>
							  <view class="uni-list">
							     <view class="uni-list-cell">
							         <view class="uni-list-cell-db">
							             <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							                 <view class="uni-input" style="width:300upx;border:none;">{{date}}</view>
							             </picker>
							         </view>
							     </view>
							 </view>
						</view>	
					</view>		
			    </view>
				
			 <view class="shopInfo">
					<view class="flexbox">
						<text class="viewBot1 myviewBot1">结束时间</text>
						<view>
							  <view class="uni-list">
							     <view class="uni-list-cell">
							         <view class="uni-list-cell-db">
							             <picker mode="date" :value="date3" :start="startDate3" :end="endDate3" @change="bindDateChange3">
							                 <view class="uni-input" style="width:300upx;border:none;">{{date3}}</view>
							             </picker>
							         </view>
							     </view>
							 </view>
						</view>	
					</view>		
				</view>
					
			 <view class="shopInfo">
					<view class="flexbox">
						<text class="viewBot1 myviewBot1">销售价格</text>
						<input class="shopNameCls viewBot2 wviewBot2" style="width:200upx"  type="number" v-model="sellerPrice" placeholder="" maxlength="50"/>元
					</view>		
			 </view>
				
			 <view class="shopInfo">
					<view class="flexbox">
						<text class="viewBot1 myviewBot1">销售数量</text>
						<input class="shopNameCls viewBot2  wviewBot2" style="width:200upx"  type="number" v-model="sellerNumber" placeholder="" maxlength="50"/>
					</view>		
			</view>	
				
	<!--------------------------------------------------------- -->
			   
	       </view>
			   
			
			<view style="width:100%;height:100%;background:rgba(0,0,0,0.16);position:fixed;top:0;left:0;right:0;display:none;">
				 <view class="fixedCtn">
					   <view class="shopInfo" style="margin-top:60upx;width:90%;margin-left:5%;">
					   		<view class="flexbox" >
					   			<text class="viewBot1 myviewBot1">颜色分类</text>
					   			<input class="shopNameCls viewBot2  wviewBot2" style="width:200upx"  type="number" v-model="sellerNumber" placeholder="" maxlength="50"/>
					   		</view>		
					   </view>
						   
						 <view class="shopInfo" style="width:90%;margin-left:5%;">
								<view class="flexbox" >
									<text class="viewBot1 myviewBot1">材质</text>
									<input class="shopNameCls viewBot2  wviewBot2" style="width:200upx"  type="number" v-model="sellerNumber" placeholder="" maxlength="50"/>
								</view>		
						 </view>	
								
								
					    <view class="shopInfo" style="width:90%;margin-left:5%;">
									<view class="flexbox" >
										<text class="viewBot1 myviewBot1">商品售价</text>
										<input class="shopNameCls viewBot2  wviewBot2" style="width:200upx"  type="number" v-model="sellerNumber" placeholder="" maxlength="50"/>
									</view>		
					     </view>
						
						<view class="shopInfo" style="width:90%;margin-left:5%;">
								<view class="flexbox" >
									<text class="viewBot1 myviewBot1">市场定价</text>
									<input class="shopNameCls viewBot2  wviewBot2" style="width:200upx"  type="number" v-model="sellerNumber" placeholder="" maxlength="50"/>
								</view>		
						</view>
									 
						
						<view class="shopInfo" style="width:90%;margin-left:5%;">
							<view class="flexbox" >
								<text class="viewBot1 myviewBot1">商品库存</text>
								<input class="shopNameCls viewBot2  wviewBot2" style="width:200upx"  type="number" v-model="sellerNumber" placeholder="" maxlength="50"/>
							</view>		
						</view>				 
									 
					
					    <view class="step3">
					     	<text style="font-size:30upx;margin-left:5%">商品图片</text>
								<view class="right" style="margin-left:30%;">
									<view class="imgs" v-for="(item,index) in proImgs" v-if="proImgs.length>0" :key="index">
										<image :src="item"></image>
										<view @tap="del(index,1)" class="del">删除</view>
									</view>
									<image src="../../static/capital/my_add_image@2x.png" @tap="proImgsChoose(1)" v-if="proImgs.length!=5" ></image>
								</view>
								
								<view class="textInfo" style="">
									<text>上传商品图片,图片支持jpg,gif,png格式,最多只能上传5张,</text>
									<text class="color">建议使用尺寸800x800像素以上,大小不超过1M的正方形图片;</text>
								</view>
					     </view>
						 
						 
						 <view class="botTwoChoose">
							   <view class="botTwoChooseLeft">取消设置</view>
							   <view class="botTwoChooseMid"></view>
							   <view class="botTwoChooseRight">保存规格</view>
						 </view>
					     
					    
					    				 
									 
									 
								
						   
						   
				
					
				 </view>
				
				
			</view>
			
			
			
			
			  
		   </view>
		   
		   
		   
		   
		   
		   <button @tap="save" type="primary">发布</button>
		   
		   
		  
		   
		</view>
	
	
</template>

<script>
	var that=this;
	export default{
		data()
		{
			
			const currentDate = this.getDate({
			    format: true
			})
			return{
				index: 0,
				timeSeller:false,
				date: currentDate,
				date3: currentDate,
				time: '12:01',
				isCheck:false,
				isreq:false,
				shopObj:{},
				initNum:[0,0,0],//是否第一次选(分类，品牌，城市)
				cateId2:"",//编辑时二级分类
				cateId3:"",
				sellerPrice:"",
				sellerNumber:"",
				brandId:"",
				sharingofEmployment:"",
				produceCity:"",
				produceProvince:"",
				proId:"",//商品id
				index2:0,
				isPackage:2,
				array4: [
					"联盟支付",
					"特约支付"
				],
				shopName:"",//商品名
				shopIntr:"",//商品简介
				shopPrice:"",//商品市场价
				price:"",//商品价格
				skoce:"",//商品库存
				proWeight:0,//商品重量
				expressConfig:1,//是否包邮1包邮2不包邮3邮费到付
				
				setTimeSell:1,//是否定时销售 1定时销售 2非定时销售
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
				productRatio:0,//联盟经费0为8%,1为15%
				threeCate:[{catename:""}],//商品三级分类
				threeIndex:0,
				provinceList:[{proName:""}],//省
				provinceIndex:0,//
				cityList:[{proName:""}],//市
				cityIndex:0,//
				
			}
		},
			computed:{
				 startDate() {
					return that.getDate('start');
				},
				endDate() {
					return that.getDate('end');
				},
				startDate3() {
					return that.getDate('start');
				},
				endDate3() {
					return that.getDate('end');
				}
			},
			methods:{
			bindPickerChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.target.value)
			    that.index = e.target.value
			},
			bindPickerChanges: function(e) {
			    that.index = e.detail.value
			    console.log('可以传data-xx:xx',e.currentTarget.dataset.index,'\n默认传过来的是下标：',e.detail.value,'\n也可以传普通json传过来的id等：',e.currentTarget.dataset.id);
			},
			bindDateChange: function(e) {
			    that.date = e.target.value
				console.log("你好,你选择的时间是"+that.date);
			},
			bindDateChange3:function(e)
			{
				that.date3 = e.target.value
				console.log("你好,你选择的时间3是"+that.date3);
			},
			bindTimeChange: function(e) {
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
		    bindPickerChange2: function(e) {
		    	// console.log('picker发送选择改变，携带值111为', that.array[e.target.value])
		    	console.log('picker发送选择改变，携带值为', that.array4[e.target.value])
		    	that.index2 = e.target.value;
		    	that.carNumStart = that.array4[e.target.value];
		    	//that.carNumFull=that.carNumStart.concat(that.carNumEnd);
		    	console.log("车牌号的首位是" + that.carNumStart);
		    	//that.cityName=that.array4[e.target.value];
		    },
		    		
			expressFun(e){
				that.expressConfig=e.detail.value.length==1?1:2
			},
			expressFun2(e)
			{
				console.log("当前的checkbox的值是"+e.detail.value);
				that.setTimeSell=e.detail.value==1?1:2
				if(that.setTimeSell==1)
				{
					that.timeSeller=true;
				}else{
					that.timeSeller=false;
				}
			},
			expressFun3:function(e)
			{
				
			},
			isCheckChange:function()
			{
				that.isCheck=!that.isCheck;
			},	
			
			shopBrandChange:function()
			{
				
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
			//邮费
		
			//商品一级分类
			shopClassifyChange(e){
				this.shopIndex=e.detail.value
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
								if(that.cateId2==that.threeCate[i].cateid){
									that.threeIndex=i;
									break;
								}
							}
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
			threeCateFun(e){
				this.threeIndex=e.detail.value
			},
			//初始化
			init(){
				let that=this;
				that.$ajax({
					url:"/shopProduct/getSelectShopProductBrand",
					method:"POST",
					success(d){
						that.shopBrand=d;
						if(that.initNum[1]==0){
							that.initNum[1]=1;
							for(let i in d){
								if(that.brandId==d[i].brandid){
									that.shopBrandIndex=i;
									break;
								}
							}
						}
						
					}
				})
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
									break;
								}
							}
						}
						that.selectThree(that.twoCate[that.twoIndex].cid)
					}
				})
				//查询省
				that.$ajax({
					url:"/shopProduct/getCommonAddressProvinceList",
					method:"POST",
					success(d){
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
				console.log(0)
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
						brandId: that.shopBrand[that.shopBrandIndex].brandid,
						cateId1: 3,
						cateId2: that.twoCate[that.twoIndex].cateid,
						cateId3: that.threeCate[that.threeIndex].cateid,
						expressConfig: that.expressConfig,
						keyWord: that.keyWord,
						originalImg: that.proImgs,
						produceCity: that.cityList[that.cityIndex].code,
						produceProvince: that.provinceList[that.provinceIndex].code,
						productDescribeImg: that.proDetailsImg,
						productId: that.proId||"",
						productName: that.shopName||"",
						productRatio: that.productRatio==0?8:15,
						productTitle: that.shopIntr,
						productmMinMoney: that.price*1,
						shopId: that.shopObj.shopId,
						sumStock: that.skoce*1,
						weight: that.proWeight,
						agoraMoney:that.shopPrice
					},
					success(d){
						that.isreq=false;
						uni.showToast({
							title:"操作成功",
							icon:"none"
						})
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 1500);
						
					},
					error(){
						that.isreq=false;
					}
				})
			}
		},
		onLoad(e){
			that=this;
			uni.getStorage({
				key:"shopObj",
				success(res){
					that.shopObj=JSON.parse(res.data);
				}
			})
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
						that.proImgs=d.originalImg;
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
						that.brandId=d.brandId;
						that.shopPrice=d.agoraMoney||"";
						that.produceCity=d.produceCity;
						that.produceProvince=d.produceProvince;
						var imgReg = /<img.*?(?:>|\/>)/gi;
						var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
						var arr = [];
						if(d.productDescribe){
							arr=d.productDescribe.match(imgReg)
						}
						console.log(arr)
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
											break;
										}
									}
								}
								that.selectThree(that.twoCate[that.twoIndex].cid)
							}
						})
						for (var i = 0; i < arr.length; i++) {
							var src = arr[i].match(srcReg);
							console.log(src,"111")
							 //获取图片地址
							that.proDetailsImg.push(src[1])
						}
						that.init()
					}
				})				
			}else{
				that.initNum=[1,1,1];
				that.init()
			}
		},
		onShow:function()
		{
			
		}
		
	}
	
</script>

<style>
	
	.fixedCtn{
		width:80%;
		height:760upx;
		background:#fff;
		position:absolute;
		left:0px;
		top:50%;
		border-radius:20upx;
		margin-top:-400upx;
		margin-left:10%;
		z-index:100;
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
	.myviewBot1{
		font-size:30upx;
	}
	.wviewBot2{
		width:240upx;
	}
	
</style>
