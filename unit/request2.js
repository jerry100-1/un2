const md5 = require('@/js_sdk/js-md5');
const ajax2 = (opt) => {
	
	if(opt.uploadFile){
		uni.showLoading({
			title: '上传中'
		});
		uni.uploadFile({
			url:"http://192.168.1.166:9996/lyx_business/commonUpload/upload",
			fileType:"image",
			formData:opt.formData,
			filePath:opt.filePath,
		    name:"file",
			success(d){
				var data=JSON.parse(d.data);
				console.log(data);
				if(data.code==200){
					opt.success(data.data);
				}else{
					uni.showToast({
						title: data.msg,
						icon:"none"
					});
				}
			},
			complete(d){
				uni.hideLoading();
			}
		})
		return
	}
    opt = opt || {};
    opt.url = opt.url || '';
	let token="";
	uni.getStorage({
		"key":"Token",
		success: function (res) {
			token=res.data
		}
	})
	let timestamp=(new Date()).valueOf()
    let sign=md5("v2.0"+timestamp+token);
    opt.method = opt.method || 'POST';
    opt.header = opt.header || {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin":"*",
		//"Content-Type":"application/x-www-form-urlencoded"
    };
    opt.success = opt.success || function () {};
    uni.request({
		//66,65,62,http://192.168.1.164:9996/http://120.79.26.124:9995测试地址。http://120.79.26.124:9997正式地址
        // url: "http://192.168.1.166:9996/lyx_business" + opt.url,
		url:"http://192.168.1.166:9996/lyx_business"+opt.url,
        data: {
			"sign": sign,
			"t":opt.data,
			"timestamp": timestamp,
			"token":token||"",
			"version": "v2.0"
		},
        method: opt.method,
        header: opt.header,
        dataType: 'json',
        success: function (res) {
			if(res.data.code==200){
				opt.success(res.data.data);
			}else{
				if(opt.error){
					opt.error();
				}
				
				if(res.data.code==-5||res.data.code==-8){
					uni.showToast({
					    title: "登录失效,请重新登录",
						icon:"none"
					});
					
					//token失效或登录失效
// 					setTimeout(function(){
// 						uni.reLaunch({
// 							url:"/pages/login/login"
// 						})
// 					},2000)
				}else{
					uni.showToast({
					    title: res.data.msg,
						icon:"none"
					});
				}
			}
        },
        fail: function () {
            uni.showToast({
                title: '请稍后重试',
				icon:"none"
            });
        },
		complete:function(){
			
		}
    })
}
export default ajax2
