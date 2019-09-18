<template>
	<view>
		 <view>

			 {{assessInfo.logistics< 2 ?"差":assessInfo.logistics==2?'一般':assessInfo.logistics?"好":"非常好"}}
		 </view>
	</view>
</template>

<script>
	var that="";
	export default{
		data(){
			return{
				time:"",
				shopObj:"",
				merchantId:"",
				assessInfo:{
					logistics:2
			     }
			}
		},
		onLoad:function()
		{
           //console.log("得到的shopObj是"+uni.getStorage("shopObj").merchantId);
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
					
			})
			
		  that.getMyMechardId();
			
		},
		onShow:function()
		{
			// that.mid=that.$api.isMid()

	
			
		},
		methods:
		{
			getMyMechardId:function()
			{
				
				console.log("发送请求之前的mechardId是"+that.merchantId);	
			    // let that=this;
			    that.$ajax({
			    	url:"/channelManagementRest/getSelectMarchantIntroduce",
			    	data:{
			    		mechardId:that.merchantId
			    	},
					success(d){
			    		console.log("你好,我接受的--------------"+d);
			    	}
			    })	
			
		
			
			}
		}
	}
</script>

<style>
</style>
