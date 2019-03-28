(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-password-forget"],{"2fcb":function(e,r,t){var n=t("54c4");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=t("4f06").default;i("ceb82158",n,!0,{sourceMap:!1,shadowMode:!1})},"43aa":function(e,r,t){"use strict";e.exports={error:"",check:function(e,r){for(var t=0;t<r.length;t++){if(!r[t].checkType)return!0;if(!r[t].name)return!0;if(!r[t].errorMsg)return!0;if(!e[r[t].name])return this.error=r[t].errorMsg,!1;switch(r[t].checkType){case"string":var n=new RegExp("^.{"+r[t].checkRule+"}$");if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"int":n=new RegExp("^(-[1-9]|[1-9])[0-9]{"+r[t].checkRule+"}$");if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"between":if(!this.isNumber(e[r[t].name]))return this.error=r[t].errorMsg,!1;var i=r[t].checkRule.split(",");if(i[0]=Number(i[0]),i[1]=Number(i[1]),e[r[t].name]>i[1]||e[r[t].name]<i[0])return this.error=r[t].errorMsg,!1;break;case"betweenD":n=/^-?[1-9][0-9]?$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;i=r[t].checkRule.split(",");if(i[0]=Number(i[0]),i[1]=Number(i[1]),e[r[t].name]>i[1]||e[r[t].name]<i[0])return this.error=r[t].errorMsg,!1;break;case"betweenF":n=/^-?[0-9][0-9]?.+[0-9]+$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;i=r[t].checkRule.split(",");if(i[0]=Number(i[0]),i[1]=Number(i[1]),e[r[t].name]>i[1]||e[r[t].name]<i[0])return this.error=r[t].errorMsg,!1;break;case"same":if(e[r[t].name]!=r[t].checkRule)return this.error=r[t].errorMsg,!1;break;case"notsame":if(e[r[t].name]==r[t].checkRule)return this.error=r[t].errorMsg,!1;break;case"email":n=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"phoneno":n=/^1[0-9]{10,10}$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"zipcode":n=/^[0-9]{6}$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"reg":n=new RegExp(r[t].checkRule);if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"in":if(-1==r[t].checkRule.indexOf(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"notnull":if(null==e[r[t].name]||e[r[t].name].length<1)return this.error=r[t].errorMsg,!1;break}}return!0},isNumber:function(e){var r=/^-?[1-9][0-9]?.?[0-9]*$/;return r.test(e)},checkForm:function(e,r){var t=this.check(e,r);return!!t||(uni.showToast({title:this.error,icon:"none"}),!1)}}},"54c4":function(e,r,t){r=e.exports=t("2350")(!1),r.push([e.i,".uni-input-row .uni-label[data-v-96b478ba]{width:30%}.uni-input-row.fh-code[data-v-96b478ba]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.uni-input-row.fh-code .uni-label[data-v-96b478ba]{width:40%}.uni-input-row uni-input[data-v-96b478ba]{width:100%}",""])},"81d0":function(e,r,t){"use strict";var n=t("2fcb"),i=t.n(n);i.a},"8b9c":function(e,r,t){"use strict";var n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("v-uni-view",{staticClass:"uni-column uni-flex uni-flex-item "},[t("v-uni-view",{staticClass:"uni-input-group"},[t("v-uni-view",{staticClass:"uni-input-row"},[t("v-uni-text",{staticClass:"uni-label"},[e._v("邮箱：")]),t("v-uni-input",{attrs:{type:"text",focus:"",clearable:"",placeholder:"请输入邮箱"},model:{value:e.form.email,callback:function(r){e.$set(e.form,"email",r)},expression:"form.email"}})],1),t("v-uni-view",{staticClass:"uni-input-row fh-code"},[t("v-uni-text",{staticClass:"uni-label uni-flex"},[e._v("验证码：")]),t("v-uni-input",{staticClass:"uni-flex",attrs:{type:"text",clearable:"",placeholder:"请输入验证码"},model:{value:e.form.code,callback:function(r){e.$set(e.form,"code",r)},expression:"form.code"}}),t("v-uni-view",{staticClass:"uni-flex"},[t("v-uni-button",{staticStyle:{"white-space":"nowrap"},attrs:{type:"primary",loading:e.sendLoading,disabled:e.time>0,size:"mini"},on:{click:function(r){r=e.$handleEvent(r),e.sendCode(r)}}},[e._v(e._s(e.reFetch)+"获取"+e._s(e.showTime))])],1)],1),t("v-uni-view",{staticClass:"uni-input-row"},[t("v-uni-text",{staticClass:"uni-label"},[e._v("新密码：")]),t("v-uni-input",{attrs:{type:"password",clearable:"",placeholder:"请输入新密码"},model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}})],1)],1),t("v-uni-view",{staticClass:"fh-padding-30"},[t("v-uni-button",{staticClass:"primary",attrs:{type:"primary",loading:e.findLoading},on:{click:function(r){r=e.$handleEvent(r),e.findPassword(r)}}},[e._v("提交")])],1)],1)},i=[];t.d(r,"a",function(){return n}),t.d(r,"b",function(){return i})},"9cae":function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n=t("2f62"),i=a(t("43aa"));function a(e){return e&&e.__esModule?e:{default:e}}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.forEach(function(r){o(e,r,t[r])})}return e}function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var c={components:{},data:function(){return{form:{email:"",code:"",password:""},sendLoading:!1,findLoading:!1,hasFetch:!1,time:-1,setTime:null}},computed:s({},(0,n.mapState)(["regs"]),{reFetch:function(){return this.hasFetch?"重新":""},showTime:function(){return this.time>0?" "+this.time:""}}),beforeDestroy:function(){clearInterval(this.setTime)},methods:{sendCode:function(){if(this.checkFormEmail()){var e=this;e.sendLoading=!0,e.$http.post("/base/user/sendcode",{data:{type:"email",identifier:e.form.email},success:function(r){uni.showToast({icon:"none",title:"已发送重置邮件至注册邮箱，请注意查收。",duration:3e3}),e.time=60,e.setTime=setInterval(function(){e.time=e.time-1,e.time<0&&clearInterval(e.setTime)},1e3),e.hasFetch=!0},fail:function(e){uni.showToast({icon:"none",title:"发送验证码失败，请查检邮箱是否正确",duration:3e3})},complete:function(r){e.sendLoading=!1}})}},findPassword:function(){if(this.checkForm()){var e=this;e.findLoading=!0,e.$http.put("/base/user/password/forget/find",{data:{type:"email",identifier:e.form.email,password:e.form.password,code:e.form.code},success:function(e){uni.navigateBack({delta:1})},fail:function(e){var r=e.statusCode;400==r?uni.showToast({icon:"none",title:"验证码不正确"}):404==r&&uni.showToast({icon:"none",title:"邮箱不存在"})},complete:function(r){e.findLoading=!1}})}},checkFormEmail:function(){var e=[{name:"email",checkType:"email",checkRule:"",errorMsg:"请输入正确的邮箱"}],r=i.default.checkForm(this.form,e);return r},checkForm:function(){var e=[{name:"email",checkType:"email",checkRule:"",errorMsg:"请输入正确的邮箱"},{name:"code",checkType:"notnull",checkRule:"",errorMsg:"请输入验证码"},{name:"password",checkType:"reg",checkRule:this.regs.password,errorMsg:"密码8~16字母数字组合"}],r=i.default.checkForm(this.form,e);return r}}};r.default=c},b8b3:function(e,r,t){"use strict";t.r(r);var n=t("8b9c"),i=t("fe48");for(var a in i)"default"!==a&&function(e){t.d(r,e,function(){return i[e]})}(a);t("81d0");var s=t("2877"),o=Object(s["a"])(i["default"],n["a"],n["b"],!1,null,"96b478ba",null);r["default"]=o.exports},fe48:function(e,r,t){"use strict";t.r(r);var n=t("9cae"),i=t.n(n);for(var a in n)"default"!==a&&function(e){t.d(r,e,function(){return n[e]})}(a);r["default"]=i.a}}]);