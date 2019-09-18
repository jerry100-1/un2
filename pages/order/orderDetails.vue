<template>
	<view class="content">
		 <view>
      <view id="state">
        <text class="state">{{statArr[orderInfo.state]}}</text>
        <text v-if="orderInfo.state==3">请务必确认收货地址正确</text>
				<text v-if="orderInfo.state==0">30分钟之后未付款自动取消订单</text>
				<text v-if="orderInfo.state==4">发货时请确认用户的收货地址正确</text>
				<text  v-if="orderInfo.state==4">7天之后系统将自动5星好评</text>
      </view>
      <view class="address" >
        
        <view>
          <view class="info">
            <text>收货人:</text>
            <text class="userName">{{orderInfo.address.name}}</text>
            <text class="r">{{orderInfo.address.phone}}</text>
          </view>
          <view class="addressInfo">
            <image src="http://www.hnlxyj.com/wx/image/my/my_address@2x.png"></image>
            <view>
              <text>收货地址:</text>
              <text>{{orderInfo.address.area}}{{orderInfo.address.address}}</text>
            </view>
          </view>
        </view>
      </view>
      <view id="comInfo" >
        <view class="comInfo">
          <view class="nav">
            <image :src="shopObj.disPlayImg" mode="widthFix"></image>
            <text>{{orderInfo.shopName}}</text>
          </view>
        </view>
        <view class="Info">
          <view class="left">
            <image :src="orderInfo.productImg"></image>
          </view>
          <view class="right ">
            <view class="h5 ">{{orderInfo.productName}}</view>
            <view class="price">
              <text class="unit ">￥</text>
              <text>{{orderInfo.productPrice}}</text>
              <text class="r ">X{{orderInfo.tradeNum}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="ul ">
      <view class="li ">
        <text>商品总价:</text>
        <text class="r ">￥{{orderInfo.productPrice*orderInfo.tradeNum}}</text>
      </view>
      <view class="li ">
        <text>快递运费:</text>
        <text class="r ">￥{{orderInfo.postage||0}}</text>
      </view>
      <view class="li ">
        <text>优惠金额:</text>
        <text class="r ">￥{{orderInfo.couponDiscount||0}}</text>
      </view>
      <view class="li">
        <text>订单总价:</text>
        <text class="r ">￥{{orderInfo.payPrice}}</text>
      </view>
    </view>
    <view class="footer ">
      <text>实付款:</text>
      <text class="r ">￥{{orderInfo.payPrice}}</text>
    </view>
  
    <view class="orderInfo ">
      <view>订单信息</view>
      <view class="ol ">
        <view class="li "><text>支付方式:</text> <text>微信</text></view>
        <view class="li "><text>预送时光豆:</text> <text>{{orderInfo.timeBean}}</text></view>
        <view class="li ">
          <text>订单编号:</text> 
          <text id="text ">{{orderInfo.orderId}}</text>
        </view>
        <view class="li "><text>创建时间:</text> <text>{{orderInfo.createTime}}</text></view>
        <view class="li "><text>付款时间:</text> <text>{{orderInfo.payTime||""}}</text></view>
      </view>
    </view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				statArr:["待付款","","失效","未发货","已发货","","","申请退款","退款成功","","","","待评价","交易完成","交易关闭"],
				orderInfo:"",
				orderId:"",
				shopObj:{}
			}
		},
		onLoad(e){
				let that=this;
				that.orderId=e.id;
				uni.getStorage({
					key:"shopObj",
					success(res){
						that.shopObj=JSON.parse(res.data);
						console.log(that.shopObj)
					}
				})
		},
		onShow(){
			let that=this;
			that.$ajax({
				url:"/order/detail",
				data:{
					orderId:that.orderId
				},success(d){
					d.address=JSON.parse(d.address)
					that.orderInfo=d;
					console.log(that.orderInfo)
				}
			})
		}
	}
</script>

<style scoped>
	#state{
    height:110upx;
    line-height: 110upx;
    padding: 0 30upx;
    background: #f90;
    color:#fff;
    font-size: 24upx;
	}
.content{
    background: #f2f2f2;
    margin-top: 0;
		padding: 0;
}
.state{
    font-size: 36upx;
    margin-right: 20upx;
}
.addressInfo>view{
	display: inline-block;
}
.address {
    padding: 30upx 30upx 0 20upx;
    height: 160upx;
    background: #fff;
    margin-bottom: 20upx;
    font-size: 24upx;
}
.address>view{
  display: inline-block;
  vertical-align: middle;
  width:650upx;
}
image{
  display: inline-block;
}
.address image{
  width:36upx;
  height:36upx;
  vertical-align: middle;
  margin-right: 10upx;
}
.address .info {
    padding: 0 20upx 10upx 0upx;
}
.icon {
    margin-right: 0;
}
.addressInfo>div {
    display: inline-block;
    width: 580upx;
    vertical-align: top;
    display: -webkit-box;
    line-height: 1.4;
    height: 60upx;
    float: right;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 32upx;
}
.comInfo {
    margin-top: 20upx;
}
#comInfo,.ul{
  background: #fff;
  padding: 0 30upx;
}

.comInfo .nav {
    height: 80upx;
    padding:20upx;
    font-size: 26upx;
    color: #333;
    background: #fff;
}
.comInfo .nav image {
    width: 40upx;
    vertical-align: middle;
    margin-right: 20upx;
}
.comInfo .Info {
    background: #fff;
    padding: 10upx 30upx;
    border-bottom: 1px solid #eee;
}
#comInfo .left {
    display: inline-block;
    width: 160upx;
    margin-right: 20upx;
}
#comInfo .right {
  display: inline-block;
    width: 500upx;
    vertical-align: top;
}
#comInfo .left>image {
    width: 160upx;
    height:160upx;
}
h5 {
    font-size: 24upx;
    color: #333;
    display: block;
    display: -webkit-box;
    margin: 0 auto;
    line-height: 1.4;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
.suk {
    font-size: 22upx;
    color: #999;
    margin:10upx 0 40upx;
}
.price {
    color: #ee3535;
}
.unit {
    font-size: 22upx;
}
#comInfo .ul>.li{
    line-height: 66upx;
    background: #fff;
    padding: 0 30upx;
    font-size: 28upx;
    color:#333;
}
#comInfo .footer{
    border-top: 1px solid #eee;
    line-height:80upx;
    background: #fff;
    padding: 0 30upx;
    text-align: right;
}
.footer .r{
    color:#ee3535;
}
.orderInfo{
    margin-top:10upx;
    background: #fff;
    padding: 0 30upx;
}
.orderInfo>view{
    font-size: 36upx;
    color:#333;
    font-weight: 600;
    line-height: 60upx;
    padding: 10upx 0;
}
.orderInfo .li{
    line-height: 60upx;
}
.orderInfo .li>text:first-child{
    display: inline-block;
    width:180upx;
}
.orderInfo .ol{
    color:#999;
    font-size: 32upx;
    font-weight: 500;
}
.footer,#footer{
    padding-right: 30upx;
    line-height: 100upx;
    background: #fff;

    text-align: right;
}
#footer{
  margin-top: 10upx;
}
button{
    display: inline-block;
    width: 200upx;
    line-height: 50upx;
    text-align: center;
    border-radius:50upx;
    font-size: 32upx;
    outline: none;
    background: transparent;
    border:1px solid #eee;
    margin-left: 10upx;
}
</style>
