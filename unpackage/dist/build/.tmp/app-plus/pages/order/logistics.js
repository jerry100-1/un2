(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/logistics"],{"47ad":function(e,t,n){"use strict";var s=n("8cbe"),o=n.n(s);o.a},"542e":function(e,t,n){"use strict";n.r(t);var s=n("ae71"),o=n("c55b");for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);n("47ad");var a=n("2877"),u=Object(a["a"])(o["default"],s["a"],s["b"],!1,null,"4d55bbb0",null);t["default"]=u.exports},"77e1":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{logState:["在途中","已揽收","疑难","已签收","退签","同城派送中","退回","转单"],expressName:"",expressNo:"",img:"",logusticsObj:{}}},onLoad:function(e){this.img=e.img,this.expressName=e.expressName,this.expressNo=e.expressNo},onShow:function(){var t=this;t.$ajax({url:"/order/showDelivery",data:{com:t.expressName,nu:t.expressNo},success:function(n){t.logusticsObj=JSON.parse(n),console.log(e(t.logusticsObj," at pages\\order\\logistics.vue:57"))}})}};t.default=n}).call(this,n("0de9")["default"])},"8cbe":function(e,t,n){},ae71:function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"a",function(){return s}),n.d(t,"b",function(){return o})},c55b:function(e,t,n){"use strict";n.r(t);var s=n("77e1"),o=n.n(s);for(var r in s)"default"!==r&&function(e){n.d(t,e,function(){return s[e]})}(r);t["default"]=o.a}},[["b636","common/runtime","common/vendor"]]]);