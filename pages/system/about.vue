<template>
	<view class="content">
		<view class="box">
			<view class="logo">
				<image src="../../static/logo@2x.png"></image>
			</view>
			<view class="textInfo">湖南智联产业生态圈:顶层以“智融天下,联创未来”的创业价值观 ,汇聚大量创业者的力量,以成人达己之心,融合全社会资源,透过“轻资产,轻运营,小团队,大渠道,强用户”的路径,构建集各行各业于一体的产业生态圈,实现项目,股东,渠道,用户之间互为转化,站在项目供应的角度,向全社会提供产品或服务,以实现全体参与者一定利益回报为商业诉求;</view>
			<view class="textInfo two">底层做时光生活圈,站在满足用户横向需求的角度,以构建用户信任关系为商业诉求,融合足够多的产品或服务商家,透过重新定义商家和用户的信任关系和利益关联,在时间和空间上颠覆传统的终端零售形式,满足用户物质价值和精神文化,生活方式的需求,构建轻松,愉悦,互爱,互信的乐享时光生活圈,成就共享,共生,利他,利己的智联商业新世界!</view>
			<view class="list">
				<text>软件版本</text>
				<text class="r">1.2.4</text>
			</view>
			<view class="list" @tap="phone">
				<text>客服电话</text>
				<image src="../../static/reight.png" class="r"></image>
				<text class="r">0731-83185198</text>
			</view>
			<view class="list">
				<text>官方网站</text>
				<text class="r">www.hnlxyj.com</text>
			</view>
			<view class="list">
				<text>隐私条款</text>
				<image src="../../static/reight.png" class="r"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		methods:{
			phone(){
				uni.makePhoneCall({
					phoneNumber:"0731-83185198"
				})
			}
		}
	}
</script>

<style scoped>
	.content{
		background: #f2f2f2;
		padding: 0;
	}
	.box{
		background: #fff;
		padding: 30upx 30upx 0 30upx;
	}
	.logo{
		width:155upx;
		height:155upx;
		border-radius: 20upx;
		margin: 60upx auto;
		border:1px solid #eee;
		box-shadow:1px 1px 1px #eee;
		padding: 6upx;
	}
	.logo image{
		width:100%;
		height:100%;
	}
	.textInfo{
		text-indent: 60upx;
		font-size: 24upx;
		line-height: 1.8;
	}
	.two{
		margin-bottom: 20upx;
	}
	.list{
		border-top:1px solid #eee;
		line-height: 88upx;
		padding:0 30upx;
	}
	.list image{
		width:14upx;
		height:26upx;
		margin-left: 10upx;
		margin-top: 30upx;
	}
	.border{
		border-bottom: 1px solid #eee;
	}
</style>
