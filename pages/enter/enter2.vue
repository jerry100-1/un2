<template>
	<view class="content">
		<view class="top">
			<view class="title">商户资质</view>
			<view class="imgs">
				<view>
					<text>商户资质</text>
				</view>
				<view class="imgsText">
					<view  @tap="proImgsChoose(3)">
						<image :src="idCardA||iaSrc"></image>
						<text>上传</text>
					</view>
					<view  @tap="proImgsChoose(2)">
						<image :src="idCardB||ibSrc"></image>
						<text>上传</text>
					</view>
					<view @tap="proImgsChoose(1)">
						<image :src="businessLicence||bSrc"></image>
						<text>上传</text>
					</view>
					
					
				</view>
			
				<view style="margin-top:20upx;display:none">
					<text>商品图片</text>
					<view class="right" style="margin-left:100upx;">
						<view  class="imgs" v-for="(item,index) in proImgs" v-if="proImgs.length>0" :key="index">
							<image  :src="item"></image>
							<view @tap="del(index,1)" class="del">删除</view>
						</view>
						<image style="display:inline-block;" src="../../static/capital/my_add_image@2x.png" @tap="proImgsChoose2(1)" v-if="proImgs.length!=5" ></image>
					</view>
					
					<view class="textInfo" style="margin-left:120upx;margin-right:60upx;margin-top:20upx;">
						<text>上传商品图片,图片支持jpg,gif,png格式,最多只能上传5张,</text>
						<text class="color">建议使用尺寸800x800像素以上,大小不超过1M的正方形图片;</text>
					</view>
				</view>
				
			</view>
			
			<view>
				<text>店铺图标</text>
				<image :src="upSrc||defSrc" class="addImg"  @tap="proImgsChoose(6)"></image>
				<text class="grey">非必填,若未上传,则显示默认图标</text>
			</view>
			
			
			
			
			<view>
				<text>门店门头照片</text>
				<view  @tap="proImgsChoose(4)" class="eleCell1" style="">
					<image class="eleCell2" style="width:380upx!important;" :src="mendianmentou||defSrc"></image>
					<text class="eleCell3" style="">门店场所,提供门店门口照片,要求招牌清晰可见;线上商品/服务交易;提交店铺首页截图.</text>
				</view>
			</view>
			
	
			<view>
				<text>店内环境照片</text>
				<view  @tap="proImgsChoose(5)" class="eleCell1" style="">
					<image class="eleCell2"  style="width:380upx!important;" :src="dianneihuanjing||defSrc"></image>
					<text class="eleCell3">门店场所,提供店内环境照片;线上商品/服务交易;提供店铺管理后台截图.</text>
				</view>
			</view>

			<view>
				<text>社会信用统一编号</text>
				<input type="text" v-model="societyId" />
			</view>
			
			
		</view>
		<view class="bank">
			<view class="title">银行信息</view>
			<view>
				<text>银行开户名</text>
				<input type="text" v-model="bankEnrollName" />
			</view>
			<view>				
				<text>银行帐号</text>
				<input type="number" v-model="mainBankNum">
			</view>
			<view>
				<text>开户支行</text>
				<input type="text" v-model="bankName">
			</view>
			<view>
				<text>支行所在地</text>
				<picker :range="bankP" @change="bankPChange" range-key="proName">
					<view>{{bankP[bpIndex].proName}}</view>
				</picker>
				<picker :range="bankC" @change="bankChange" range-key="proName">
					<view>{{bankC[bpCndex].proName}}</view>
				</picker>

			</view>
		</view>
		<view class="take">
			<view class="title">
				<text>退货信息</text>
				<text class="r" @tap="voluation">同公司地址</text>
			</view>
			<view>
				
				
				<text>收货地址</text>
				<picker :range="takeP" @change="takePChange" range-key="proName">
					<view>{{takeP[tpIndex].proName}}</view>
				</picker>
				<picker :range="takeC" @change="takeCChange" range-key="proName">
					<view>{{takeC[tcIndex].proName}}</view>
				</picker>
				<picker :range="takeX" @change="takeXChange" range-key="disName">
					<view>{{takeX[txIndex].disName}}</view>
				</picker>
				详细地址:<input type="text" v-model="takeAddress" class="bankAddress"/>
			</view>
			<view>
				<text>收件人</text>
				<input type="text" v-model="takeContactsName" maxlength="5"/>
			</view>
			<view>
				<text>联系电话</text>
				<input type="number" v-model="takeContactsPhone" maxlength="11"/>
			</view>
		</view>
		<view>
			<view class="title">客户留言</view>
			<textarea v-model="checkNote" placeholder="请输入您的留言" />
		</view>
		<view class="foot">
			<checkbox-group @change="checkboxChange" class="" style="display:inline-block;vertical-align:middle;">
				<label class="checkbox"><checkbox :checked="isCheck" />
					<text class="text">我同意</text>
				</label>
			</checkbox-group>
			<text @tap="url" class="color" style="display:inline-block;vertical-align:middle;">《乐驿享·生活圈商户入驻协议》</text>
			<button @tap="save">立即申请入驻</button>
		</view>
	</view>
</template>

<script>
	var that="";
	import { pathToBase64, base64ToPath } from '@/js_sdk/gsq-image-tools/image-tools/index.js'
	export default{
		data(){
			return{
				marchantId:null,//修改的id
				prevObj:{},
				bank:[],//支付
				bankIndex:0,
				proImgs:[],//商品图片
				proDetailsImg:[],//商品详情图片
				takeP:[{proName:""}],//退货省
				tpIndex:0,
				takeC:[{proName:""}],//退货市
				upSrc:"",//店铺logo
				tcIndex:0,
				takeX:[{proName:""}],//退货区
				txIndex:0,//
				bankP:[{proName:""}],//银行省
				bpIndex:0,
				bankC:[{proName:""}],//银行市
				bpCndex:0,
				defSrc:"../../static/capital/my_add_image@2x.png",
				takeContactsName:"",//收货联系人
				takeAddress:"",//收货地址
				takeContactsPhone:"",//收货联系电话
				businessLicence:"",//营业执照
				bSrc:"http://www.hnlxyj.com/wx/image/my/my_join_business_licence@2x.png",
				idCardB:"",//身份证反面
				ibSrc:"http://www.hnlxyj.com/wx/image/my/my_join_idback@2x.png",
				idCardA:"",//身份证正面
				iaSrc:"http://www.hnlxyj.com/wx/image/my/my_join_idside@2x.png",
				societyId:"",//社会信用统一编号
				bankEnrollName:"",//银行开户名
				mainBankNum:"",//银行帐号
				bankName:"",//开户支行
				checkNote:"",//留言
				isCheck:false,//是否同意协议
				shopObj:{},
				mendianmentou:"" ,//门店门头照片
				dianneihuanjing:""//店内环境照片
			}
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url:"service"
			})
			
		},
		methods:{
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
			
			//店铺图片选择
			proImgsChoose(type){
				let that=this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function (res) {
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
								if(type==1){
									that.businessLicence=d
								}else if(type==2){
									that.idCardB=d
								}else if(type==3){
									that.idCardA=d
								}else if(type==4){
									that.mendianmentou=d;
								}else if(type==5)
								{
									that.dianneihuanjing=d;
								}else if(type==6)
								{
									that.upSrc=d;
								}
							}
						})
						// //转base64
						// pathToBase64(res.tempFilePaths[0])
						//   .then(base64 => {
						// 	  that.uploadImg(base64,type)
						//   })
						//   .catch(error => {
						// 	console.error(error)
						//   })
					}
				});
			},
			//店铺图片上传
			uploadImg(base64,type){
				let that=this;
				that.$ajax({
					url:"/commonUpload/upload",
					method:"POST",
					data:{
						base64Img:base64,
						fileName:"/marchant/",
						artworkMaster:1
					},success(d){
						if(type==1){
							that.businessLicence=d
						}else if(type==2){
							that.idCardB=d
						}else if(type==3){
							that.idCardA=d
						}else if(type==4){
							that.mendianmentou=d;
						}else if(type==5)
						{
							that.dianneihuanjing=d;
						}else if(type==6)
						{
							that.upSrc=d;
						}
					}
				})
			},
			
			
			
			
			
			
			
			
			
			//商品图片上传
		// 	uploadImg(base64,type){
		// 		let that=this;
		// 		uni.showLoading({
		// 			title: '加载中'
		// 		});
		// 		that.$ajax({
		// 			url:"/commonUpload/upload",
		// 			method:"POST",
		// 			data:{
		// 				// base64Img:base64,
		// 				file:base64,
		// 				fileName:"/product/",
		// 				//artworkMaster:0
		// 			},success(d){
		// 				console.log(d);
		// 				uni.hideLoading();
		// 				
		// 			}
		// 		})
		// 	},
		// 	//图片的删除
		// 	del(index,type){
		// 		let that=this;
		// 		console.log(index)
		// 		if(type==1){
		// 			//商品图片
		// 			 that.proImgs.splice(index, 1);
		// 		}else{
		// 			
		// 			//商品详情图
		// 			that.proDetailsImg.splice(index, 1);
		// 		}
		// 	},
		// 
			chooseLocation(){
				uni.chooseLocation({
					success: function (res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			},
			provinceList(obj){
				let that=this;
				that.$ajax({
					url:"/shopProduct/getCommonAddressProvinceList",
					success(d){
						that.takeP=d;
						that.bankP=d;
						if(obj){
							for(let i in d){
								if(obj.bankProvince==d[i].code){
									that.bpIndex=i;
									console.log(i)
									that.searchCity(1,"",obj)
								}
								if(obj.takeProvince==d[i].code){
									that.tpIndex=i;
									console.log(i)
									that.searchCity(2,"",obj)
								}
							}
						}else{
							that.searchCity()
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
			save(){
				
				let that=this;
				console.log("你好");
				console.log("这是此页面提交的第3个参数"+that.idCardA);//身份证正面
				console.log("这是此页面提交的第2个参数"+that.idCardB);//身份证反面
				console.log("这是此页面提交的第1个参数"+that.businessLicence);//商户资质-营业执照
				console.log("这是此页面提交的第4个参数"+that.proImgs);//其他证件类型
				console.log("这是此页面提交的第5个参数"+that.mendianmentou);//门店门头照片
				console.log("这是此页面提交的第6个参数"+that.dianneihuanjing);//店内环境照片
				console.log("这是此页面提交的第7个参数"+that.societyId);//社会统一信用编号
				console.log("这是此页面提交的第8个参数"+that.bankEnrollName);//银行开户名
				console.log("这是此页面提交的第9个参数"+that.mainBankNum);//银行账号
				console.log("这是此页面提交的第10个参数"+that.bankName);//开户支行
				console.log("这是此页面提交的第11个参数"+that.bankP[that.bpIndex].proName);//支行所在省
				console.log("这是此页面提交的第12个参数"+that.bankC[that.bpCndex].proName);//支行所在市
				console.log("这是此页面提交的第13个参数"+that.takeP[that.tpIndex].proName);//收货退货所在省
				console.log("这是此页面提交的第14个参数"+that.takeC[that.tcIndex].proName);//收货退货所在市
				console.log("这是此页面提交的第15个参数"+that.takeX[that.txIndex].disName);//收货退货所在区
				console.log("这是此页面提交的第11个参数"+that.bankP[that.bpIndex].code);//
				console.log("这是此页面提交的第12个参数"+that.bankC[that.bpCndex].code);
				console.log("这是此页面提交的第13个参数"+that.takeP[that.tpIndex].code);
				console.log("这是此页面提交的第14个参数"+that.takeC[that.tcIndex].code);
				console.log("这是此页面提交的第15个参数"+that.takeX[that.txIndex].code);
				console.log("这是此页面提交的第16个参数"+that.takeAddress);//收货退货详细地址
				console.log("这是此页面提交的第17个参数"+that.takeContactsName);//收货收件人
				console.log("这是此页面提交的第18个参数"+that.takeContactsPhone);//收货联系电话
				console.log("这是此页面提交的第19个参数"+that.checkNote);//客户留言
				
				
				if(that.businessLicence==""||that.idCardB==""||that.idCardA==""||that.mendianmentou==""||that.dianneihuanjing==""
					||that.societyId==""||that.bankEnrollName==""||that.mainBankNum==""||that.bankName==""||that.bankP[that.bpIndex].proName==""
					||that.bankC[that.bpCndex].proName==""||that.takeP[that.tpIndex].proName==""||that.takeC[that.tcIndex].proName==""||that.takeX[that.txIndex].disName==""
					||that.bankP[that.bpIndex].code==""||that.bankC[that.bpCndex].code==""||that.takeP[that.tpIndex].code==""||that.takeX[that.txIndex].code==""
					||that.takeAddress==""||that.takeContactsName==""||that.takeContactsPhone=="")
				{
					uni.showToast({
						title:"请保证信息填写完整",
						content:"请保证信息填写完整"
					});
					return;
				}
				
				
				
				
	                // bankEnrollName  //银行开户号
	                // mainBankNum  //银行账号
	                // bankName   //开户支行
	                // 
	                // bankP[bpIndex].proName //支行所在地---省
	                // bankC[bpCndex].proName //支行所在地---市
	                // 
	                // takeP[tpIndex].proName //收货地址--省
	                // takeC[tcIndex].proName //收货地址--市
	                // takeX[txIndex].disName //收货地址--区
	                // takeAddress             //收货详细地址
	                // 
	                // takeContactsName        //收件人
	                // takeContactsPhone       //联系电话
	                // checkNote               //客户留言
	                
				
				
				if(that.isCheck){
					if(that.businessLicence&&that.idCardA&&that.idCardB&&that.societyId&&that.bankEnrollName&&that.mainBankNum&&that.bankName&&that.takeAddress&&that.takeContactsName&&that.takeContactsPhone){
						if(!that.checkPhone(that.takeContactsPhone)){
							uni.showToast({
								title:"请填写正确的手机号码",
								icon:"none"
							})
							return
						}
						let obj={
							accountName:that.prevObj.accountName,//1   解决
							address:that.prevObj.address, //1         解决
							bankCity:that.bankC[that.bpCndex].code,//2 解决
							bankEnrollName:that.bankEnrollName,//2 解决
							bankName:that.bankName,//2    解决
							bankProvince:that.bankP[that.bpIndex].code,//2  解决
							businessLicence:that.businessLicence,//2    解决 
							checkNote:that.checkNote,//2
							companyArea:that.prevObj.companyArea,//1
							companyCity:that.prevObj.companyCity,//1
							companyName:that.prevObj.companyName,//1
							companyProvince:that.prevObj.companyProvince,//1
							contactsName:that.prevObj.contactsName,//1
							contactsPhone:that.prevObj.contactsPhone,//1
							existsShop:that.prevObj.existsShop,//1 解决
							latitude:that.prevObj.latitude,//纬度 //1
							longitude:that.prevObj.longitude,//经度 //1
							displayImg:that.upSrc,//1  //解决
							idCardA:that.idCardA,//2 解决
							idCardB:that.idCardB,//2解决
							isFront:that.prevObj.isFront,//1  解决
							linePayRatio:that.prevObj.linePayRatio,//1  解决
							mainBankNum:that.mainBankNum,//2   解决
							id:that.shopObj.merchantId,//2 
							marchantType:that.prevObj.marchantType,//1
							servicePhone:that.prevObj.servicePhone,//1
							shopName:that.prevObj.shopName,//1
							idName:that.prevObj.idName,
							idNumber:that.prevObj.idNumber,
							idValidTime:that.prevObj.idValidTime,
							societyId:that.societyId,//2
							takeAddress:that.takeAddress,
							takeArea:that.takeX[that.txIndex].code,//2
							takeCity:that.takeC[that.tcIndex].code,//2
							takeProvince:that.takeP[that.tpIndex].code,//2
							takeContactsName:that.takeContactsName,//2
							takeContactsPhone:that.takeContactsPhone,//2
							weixin:that.prevObj.weixin,//1
							level:that.shopObj.level,	//2
							shopFrontImg:that.mendianmentou,
							shopInsideImg:that.dianneihuanjing,
							payment:that.prevObj.payment,
							shopIdentity:that.prevObj.shopIdentity,
							shopSN:that.prevObj.shopSN,
							wxServiceFee:that.prevObj.wxServiceFee,
							wxShopName:that.prevObj.wxShopName,
							wxPaykey:that.prevObj.wxPaykey,
							wxMchid:that.prevObj.wxMchid,
							otherQualification:that.proImgs
						}
						
						console.log("提交之前各项参数如下:");
						console.log("accountName:"+that.prevObj.accountName);
						console.log("address:"+that.prevObj.address);
						console.log("bankCity:"+that.bankC[that.bpCndex].code);
						console.log("bankName:"+that.bankName);
						console.log("bankProvince:"+that.bankP[that.bpIndex].code);
						
						console.log("businessLicence:"+that.businessLicence);
						console.log("checkNote:"+that.checkNote);
						console.log("companyArea:"+that.prevObj.companyArea);
						console.log("companyCity:"+that.prevObj.companyCity);
						console.log("companyName:"+that.prevObj.companyName);
						console.log("companyProvince:"+that.prevObj.companyProvince);
						
						console.log("contactsName:"+that.prevObj.contactsName);
						console.log("contactsPhone:"+that.prevObj.contactsPhone);
						console.log("existsShop:"+that.prevObj.existsShop);
						
						
						
						console.log("latitude:"+that.prevObj.latitude);
						console.log("longitude:"+that.prevObj.longitude);
						console.log("displayImg:"+that.upSrc);
						
						console.log("idCardA:"+that.idCardA);
						console.log("idCardB:"+that.idCardB);
						console.log("isFront:"+that.prevObj.isFront);
						
						
						
						console.log("linePayRatio:"+that.prevObj.linePayRatio);
						console.log("mainBankNum:"+that.mainBankNum);
						console.log("marchantId:"+that.shopObj.marchantId);
						
						
						console.log("marchantType:"+that.prevObj.marchantType);
			            console.log("servicePhone:"+that.prevObj.servicePhone);
						console.log("shopName:"+that.prevObj.shopName);
						console.log("societyId:"+that.societyId);
						console.log("takeAddress:"+that.takeAddress);
						console.log("takeCity:"+that.takeC[that.tcIndex].code);
						console.log("takeProvince:"+that.takeP[that.tpIndex].code);
						console.log("takeArea:"+that.takeX[that.txIndex].code);
						console.log("takeAddress:"+that.takeAddress);
						
						console.log("takeContactsName:"+that.takeContactsName);
						console.log("takeContactsPhone:"+that.takeContactsPhone);
						console.log("weixin:"+that.prevObj.weixin);
						console.log("shopFrontImg:"+that.mendianmentou);
						console.log("shopInsideImg:"+that.dianneihuanjing);

						console.log("payment:"+that.prevObj.payment);
						console.log("shopIdentity:"+that.prevObj.shopIdentity);
						console.log("wxServiceFee:"+that.prevObj.wxServiceFee);
						console.log("wxShopName:"+that.prevObj.wxShopName);
						console.log("wxPaykey:"+that.prevObj.wxPaykey);
						console.log("wxMchid:"+that.prevObj.wxMchid);
                        console.log("level:"+that.shopObj.level);
						console.log("otherQualification:"+that.proImgs);
						
						
						
						that.$ajax({
							url:"/channelManagementRest/addOrUpdateMarchantInfo",
							data:obj,
							success(d){
								var title="申请成功"
								if(that.marchantId){
									title="修改成功"
								}
								uni.showToast({
									title:title,
									icon:"none"
								}),
								setTimeout(function(){
									uni.navigateBack({
										delta:2
									})
								},2000)
							}
						})
						
					}else{
						uni.showToast({
							title:"请填写完整的信息",
							icon:"none"
						})
					}
				}else{
					uni.showToast({
						title:"请同意协议"
					})
				}
			},
			bankPChange(e){
				that.bpIndex=e.detail.value;
				that.searchCity(1)
			},
			bankChange(e){
				that.bpCndex=e.detail.value;
			},
			takePChange(e){
				that.tpIndex=e.detail.value;
				that.searchCity(2)
			},
			takeCChange(e){
				that.tcIndex=e.detail.value;
			},
			takeXChange(e){
				that.txIndex=e.detail.value;
			},
			//查询市
			searchCity(type,def,obj){
				let that=this;
				var code="";
				if(type==1){
					//银行
					code=that.bankP[that.bpIndex].code
				}else{
					//退货
					code=that.takeP[that.tpIndex].code
				}
				that.$ajax({
					url:"/shopProduct/getCommonAddressCityList",
					data:{
						proCode:code
					},
					success(d){
						if(def){
							for(let i in d){
								if(that.prevObj.companyCity==d[i].code){
									that.tcIndex=i;
								}
							}
						}
						if(obj){
							console.log("obj",d)
							for(let i in d){
								if(obj.takeCity==d[i].code){
									that.tcIndex=i
								}
								if(obj.bankCity==d[i].code){
									that.bpCndex=i
								}
							}
						}
						if(type==1){
							that.bankC=d;
						}else if(type==2){
							that.takeC=d;
							that.searchX(def,obj);
						}else{
							that.bankC=d;
							that.takeC=d;
							that.searchX(def,obj);
						}
						
					}
				})
			},
			//查询区
			searchX(def,obj){
				let that=this;
				that.$ajax({
					url:"/shopProduct/getCommonAddressDistrictList",
					data:{
						cityCode:that.takeC[that.tcIndex].code
					},
					success(d){
						that.takeX=d;
						if(def){
							for(let i in d){
								if(that.prevObj.companyArea==d[i].code){
									that.txIndex=i;
								}
							}
						}
						if(obj){
							for(let i in d){
								if(obj.takeArea==d[i].code){
									that.txIndex=i;
								}
							}
						}
					}
				})
			},
			//同公司地址
			voluation(){
				let that=this;
				console.log(that.prevObj);
				for(let i in that.takeP){
					if(that.prevObj.companyProvince==that.takeP[i].code){
						that.tpIndex=i;
						that.takeContactsName=that.prevObj.contactsName,//收货联系人
						that.takeAddress=that.prevObj.address,//收货地址
						that.takeContactsPhone=that.prevObj.contactsPhone,//收货联系电话
						that.searchCity(2,1);
					}
				}
			},
			//是否同意协议
			checkboxChange(e){
				if(e.detail.value.length>0){
					this.isCheck=true;
				}else{
					this.isCheck=false;
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
			// proImgsChoose(type){
			// 	let that=this;
			// 	uni.chooseImage({
			// 		count: 1, //默认9
			// 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 		success: function (res) {
			// 			if(that.limit(res.tempFiles[0].size)>1){
			// 				uni.showToast({
			// 					title:"图片大小不能超过1M",
			// 					icon:"none"
			// 				})
			// 				return
			// 			}
			// 			that.$ajax({
			// 				uploadFile:true,
			// 				formData:{
			// 					'fileName':"/marchant/",
			// 				},
			// 				filePath:res.tempFilePaths[0],
			// 				success(d){
			// 					if(type==1){
			// 						that.businessLicence=d
			// 					}else if(type==2){
			// 						that.idCardB=d
			// 					}else if(type==3){
			// 						that.idCardA=d
			// 					}else if(type==4){
			// 						that.mendianmentou=d;
			// 					}else if(type==5)
			// 					{
			// 						that.dianneihuanjing=d;
			// 					}else if(type==6)
			// 					{
			// 						that.upSrc=d;
			// 					}
			// 				}
			// 			})
			// 			// //转base64
			// 			// pathToBase64(res.tempFilePaths[0])
			// 			//   .then(base64 => {
			// 			// 	  that.uploadImg(base64,type)
			// 			//   })
			// 			//   .catch(error => {
			// 			// 	console.error(error)
			// 			//   })
			// 		}
			// 	});
			// },
			// //店铺图片上传
			// uploadImg(base64,type){
			// 	let that=this;
			// 	that.$ajax({
			// 		url:"/commonUpload/upload",
			// 		method:"POST",
			// 		data:{
			// 			base64Img:base64,
			// 			fileName:"/marchant/",
			// 			artworkMaster:1
			// 		},success(d){
			// 			if(type==1){
			// 				that.businessLicence=d
			// 			}else if(type==2){
			// 				that.idCardB=d
			// 			}else if(type==3){
			// 				that.idCardA=d
			// 			}else if(type==4){
			// 				that.mendianmentou=d;
			// 			}else if(type==5)
			// 			{
			// 				that.dianneihuanjing=d;
			// 			}else if(type==6)
			// 			{
			// 				that.upSrc=d;
			// 			}
			// 		}
			// 	})
			// },
			//图片的删除
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
			url(){
				console.log(0)
				uni.navigateTo({
					url:"web_view"
				})
				return false
			}
		},
		onLoad(e){
			that=this;
			let obj=JSON.parse(e.obj);
			console.log("你好,这是从上个页面传过来的数据-------");
			console.log("上个页面拿过来的店铺名称shopName是"+obj.shopName);//1
			console.log("上个页面拿过来的行业类别marchantType是"+obj.marchantType);//2
			//console.log("上个页面拿过来的displayImg是"+obj.displayImg);//3
			console.log("上个页面拿过来的客服电话servicePhone是"+obj.servicePhone);//4
			console.log("上个页面拿过来的客服微信weixin是"+obj.weixin);//5
			console.log("上个页面拿过来的是否有实体店铺existsShop是"+obj.existsShop);//6
			console.log("上个页面拿过来的经度longitude是"+obj.longitude);//7
			console.log("上个页面拿过来的纬度latitude是"+obj.latitude);//8
			console.log("上个页面拿过来的商户简称businessAbbreviation是"+obj.shopSN);//9
			console.log("上个页面拿过来的门店地址省companyProvince是"+obj.companyProvince);//10
			console.log("上个页面拿过来的门店地址市companyCity是"+obj.companyCity);//11
			console.log("上个页面拿过来的门店地址区companyArea是"+obj.companyArea);//12
			console.log("上个页面拿过来的门店地址市companyName是"+obj.companyName);//13
			console.log("上个页面拿过来的门店详细地址address是"+obj.address);//14
			console.log("上个页面拿过来的身份证姓名idName是"+obj.idName);//15
			console.log("上个页面拿过来的身份证号码idNumber是"+obj.idNumber);//16
			console.log("上个页面拿过来的身份证有效期idValidTime是"+obj.idValidTime);//17
			console.log("上个页面拿过来的联系人contactsName是"+obj.contactsName);//18
			console.log("上个页面拿过来的联系电话contactsPhone是"+obj.contactsPhone);//19
			console.log("上个页面拿过来的登陆账号accountName是"+obj.accountName);//20
			console.log("上个页面拿过来的线下支付是否需要isFront是"+obj.isFront);//21
			console.log("上个页面拿过来的支付方式payment是"+obj.payment);//22
			console.log("上个页面拿过来的微信费率wxServiceFee是"+obj.wxServiceFee);//23
			console.log("上个页面拿过来的联盟经费linePayRatio是"+obj.linePayRatio);//24
			console.log("上个页面拿过来的商户身份shopIdentity是"+obj.shopIdentity);//25
			console.log("上个页面拿过来的wxServiceFee是"+obj.wxServiceFee);//26
			console.log("上个页面拿过来的wxShopName是"+obj.wxShopName);//27
			console.log("上个页面拿过来的wxPaykey是"+obj.wxPaykey);//28
			console.log("上个页面拿过来的wxMchid是"+obj.wxMchid);//29

		    console.log("********************************这是从上个页面传过来的数据-------"+obj.address);	
			
			uni.getStorage({
							key:"shopObj",
							success(res){
								that.shopObj=JSON.parse(res.data);
							}
						})
						that.prevObj=obj;
						if(e.marchantId){
							that.marchantId=e.marchantId;
							that.$ajax({
								url:"/channelManagementRest/getSelectMarchantInfo",
								data:{
									marchantId:that.marchantId
								},success(d){
									that.businessLicence=d.businessLicence;
									that.mendianmentou=d.shopFrontImg;
									that.dianneihuanjing=d.shopInsideImg;
									that.proImgs=d.otherQualification;
									that.idCardB=d.idCardB;
									that.idCardA=d.idCardA;
									that.upSrc=d.displayImg;
									that.societyId=d.societyId;
									that.bankEnrollName=d.bankEnrollName;
									that.mainBankNum=d.mainBankNum;
									that.bankName=d.bankName;
									that.takeAddress=d.takeAddress;
									that.takeContactsName=d.takeContactsName;
									that.takeContactsPhone=d.takeContactsPhone;
									that.checkNote=d.checkNote;
									that.provinceList(d)
								}
							})
						}else{
							that.provinceList()
			}
			
			
			
		
		}
	}
</script>

<style scoped>
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
	
	
	
	.del{
		font-size: 20upx;
		line-height: 36upx;
		text-align: center;
		margin-left:-60upx;
		 position:absolute;
		width:60upx;
		background:#666;
		color:#fff;
	}
	
	.eleCell1{
		display:flex!important;flex-direction:row!important;
	}
	.eleCell2{
		display:inline-block!important;
		margin-top:20upx!important;
		width:380upx!important;
		overflow:hidden;
		height:170upx;
		vertical-align:middle!important;
		margin-left:130upx!important;
	}
	.eleCell3{
		display:inline-block;
		color:rgba(0,0,0,0.56);
		vertical-align:middle;line-height:64upx;margin-top:5upx!important;margin-left:20upx;
	}
	
	.content{
		padding: 0;
		background: #f2f2f2;
	}
	.content>view{
		background: #fff;
		margin-bottom: 20upx;
		padding: 30upx;
		font-size: 26upx;
	}
	.content>view>view{
		margin-bottom: 20upx;
	}
	.imgs{
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
	.content image{
		width: 166upx;
		height:166upx;
		margin-left: 24upx;
		vertical-align: text-top;
		display: inline-block;
	}
	.content .title{
		font-size: 28upx;
		color:#333;
		border-left:5px solid #EE3535;
		padding-left: 10upx;
	}
	input{
		display: inline-block;
		border-bottom: 1px solid #eee;
		margin-left: 20upx;
	}
	.r{
		display: inline-block;
		width:162upx;
		height:48upx;
		line-height: 48upx;
		color:#2D93FF;
		border: 1px solid #2D93FF;
		border-radius: 50upx;
		text-align: center;
		font-size: 22upx;
	}
	.inline{
		display: inline-block;
	}
	picker{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		border:1px solid #eee;
		border-radius: 20upx;
		line-height: 60upx;
		height:60upx;
		width:150upx;
		padding-left: 10upx;
		display: inline-block;
		vertical-align: middle;
		margin-left: 20upx;
	}
	picker view{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.bankAddress{
		width: 500upx;
		margin-left: 160upx;
	}
	.take text,.bank text{
		display: inline-block;
		width:140upx;
	}
	textarea{
		width:684upx;
		height:140upx;
		background:#f5f5f5;
		border-radius: 10upx;
		box-sizing: border-box;
		padding: 20upx;
	}
	.content .foot{
		background: #f2f2f2;
	}
	.foot .text{
		vertical-align: middle;
	}
	.color{
		color:#ee3535;
	}
	uni-checkbox .uni-checkbox-input{
		background: #f2f2f2;
	}
	button{
		width:525upx;
		height:72upx;
		text-align: center;
		line-height: 72upx;
		color: #fff;
		background: #EE3535;
		border:none;
		outline: none;
		border-radius: 10upx;
		font-size: 30upx;
		margin: 20upx auto;
		border:none;
		outline: none;
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
		width: 100%;
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
	
	
</style>
