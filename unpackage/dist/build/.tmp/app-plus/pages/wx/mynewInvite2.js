(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wx/mynewInvite2"],{"0af4":function(t,e,n){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{type:2,src:""}},methods:{go1:function(){t.navigateTo({url:"../../pages/wx/mynewInvite1"})},go2:function(){t.navigateTo({url:"../../pages/wx/mynewInvite2"})},go3:function(){t.navigateTo({url:"../../pages/wx/mynewInvite3"})},service:function(){t.navigateTo({url:"/pages/enter/service"})},save:function(){t.showLoading({title:"图片保存中..."});var e=this,a="",i=0,o=0;0==this.type?(a="../../static/invite/invite_1.png",i=80,o=140):(a="../../static/invite/invite_2.png",i=80,o=210);e.src;this.type=parseInt(2*Math.random(),10);var s=t.createCanvasContext("myCanvas");s.drawImage(a,0,0,this.windowWidth,this.windowHeight),s.drawImage(e.src,i,o,90,90),s.draw(!1,function(){t.canvasToTempFilePath({canvasId:"myCanvas",success:function(a){e.tempFilePath=a.tempFilePath,t.getImageInfo({src:e.tempFilePath,success:function(a){console.log(n("图片信息：",JSON.stringify(a)," at pages\\wx\\mynewInvite2.vue:108")),e.type=e.type,t.saveImageToPhotosAlbum({filePath:a.path,success:function(){e.type=e.type,t.showToast({title:"图片保存成功",icon:"none",duration:2200})},fail:function(){t.hideLoading(),t.showToast({title:"保存失败，请稍后重试",icon:"none"})}})}})}})})}},onLoad:function(e){var n=this;t.getStorage({key:"shopObj",success:function(t){var e=JSON.parse(t.data);n.src="https://wx.hnlxyj.com/user/share/qrCode?block=1&width=800&height=800&url=http://www.hnlxyj.com/wx/register/enter.html?marchantId="+e.merchantId}}),this.type=e.type}};e.default=a}).call(this,n("6e42")["default"],n("0de9")["default"])},"19fe":function(t,e,n){"use strict";n.r(e);var a=n("0af4"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a},"336b":function(t,e,n){"use strict";n.r(e);var a=n("39dd"),i=n("19fe");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("6d1b");var s=n("2877"),c=Object(s["a"])(i["default"],a["a"],a["b"],!1,null,"58f4e7a3",null);e["default"]=c.exports},"39dd":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},"44c7":function(t,e,n){},"6d1b":function(t,e,n){"use strict";var a=n("44c7"),i=n.n(a);i.a}},[["6948","common/runtime","common/vendor"]]]);