
<template>
    <!-- 活动报名 -->
    <view class="uni-column uni-flex uni-flex-item ">
        <view class="uni-input-group">
            <view class="uni-input-row">
                <text class="uni-label">姓名：</text>
                <input type="text" focus clearable v-model="form.name" placeholder="请输入姓名"></input>
            </view>
			<view class="uni-input-row">
				<text class="uni-label">性别：</text>
				<view v-if="wwdUser.gender =='male' || wwdUser.gender =='female' ">
					<fh-dict-text :type="'gender'" :val="wwdUser.gender" text="未填写"></fh-dict-text>
				</view>
				<view v-else @tap="showDictPicker(form.gender,'gender','gender')">
					<fh-dict-text :type="'gender'" :val="form.gender" text="未填写"></fh-dict-text>
				</view>
			</view>
            <view class="uni-input-row">
                <text class="uni-label">手机号：</text>
                <input type="text" clearable v-model="form.mobile" placeholder="手机号"></input>
            </view>
            <view v-if="requireIdCard == 'Y'" class="uni-input-row">
                <text class="uni-label">身份证：</text>
                <input type="text" clearable v-model="form.idCardNo" placeholder="身份证号（仅买保险用）"></input>
            </view>
            <view  class="uni-input-row">
                <checkbox-group class="uni-flex" name="loves" @change="change">
                    <checkbox value="agreement"  >
                    <text class="uni-link">将该信息同步到我的资料中</text>
                    </checkbox>
                </checkbox-group>
            </view>
			<fh-dict-picker ref="fhDictPicker" :type="dictPicker.type" :value-default="dictPicker.valueDefault" @onConfirm="onDictPickerConfirm"></fh-dict-picker>
			
        </view>
        <view class="fh-padding-30">
            <button type="primary" :loading="btnLoading" @tap="signup">下一步</button>
        </view>
		 <text v-if="!wwdUser.gender || wwdUser.gender =='unknown'" class="info-text">备注：性别更改将会同步到个人资料</text>
    </view>
</template>

<script>
    //来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
    import  graceChecker from "@/utils/graceChecker.js";
	import fhDictText from '@/fh-components/fh-dict-text.vue';
	import fhDictPicker from '@/fh-components/fh-dict-picker.vue';

    export default {
        components: {
			fhDictText,
			fhDictPicker
        },
        data() {
            return {
				dictPicker:{
				    type:null,
				    valueDefault:null
				},
                btnLoading:false,
                form:{
					name: '',
                    gender: '',
                    mobile: '',
                    idCardNo: '',
                    activityId: '',
                    saveToInfo: 'N'
                },
                requireIdCard: 'N',
                wwdUser: {}
            }
        },
        onLoad (options) {
            this.form.activityId = options.activityId
            this.requireIdCard = options.requireIdCard
            this.loadWwdUser()
        },
        computed: {
        },
        methods: {
			 // showdictpicker
			showDictPicker(valueDefault,type,wwdUserDictAttr){
			    this.wwdUserDictAttr = wwdUserDictAttr
				this.dictPicker.type = type
				// 先给空值触发变化
				this.dictPicker.valueDefault = null
				this.dictPicker.valueDefault = valueDefault
			
			    this.$refs.fhDictPicker.show()
			},
			onDictPickerConfirm(obj){
			    this.form[this.wwdUserDictAttr] = obj.value
			},
            change(e){
                if(e.detail.value.length > 0){
                    this.form.saveToInfo = 'Y'
                }else{
                    this.form.saveToInfo = 'N'
                }
            },
            loadWwdUser(){
                let self = this
                self.$http.get('/wwd/user/current').then( res => {
                    let content = res.data.data.content
                    self.wwdUser = content
                    self.form.name = self.wwdUser.name
                    self.form.mobile = self.wwdUser.mobile
                    self.form.idCardNo = self.wwdUser.idCardNo
					self.form.gender = self.wwdUser.gender
                })
            },
            signup() {

                if(!this.checkRegistForm()){
                    return;
                }
                let self = this
                self.btnLoading = true
                self.$http.post('/wwd/participate/user/current',self.form).then(function (res) {
                    let content = res.data.data.content
                    uni.showToast({
                        icon: 'none',
                        title: '恭喜报名成功'
                    });
                    self.btnLoading = false
                    uni.navigateTo({
                        url: '/pages/activity/pay?participateId=' + content.id + '&activityId=' + self.form.activityId
                    })
                }).catch(function (res) {
                    let statusCode = res.statusCode
                    let _data = res.data.data;
                    if(statusCode == 409){
                        if(_data.code == 'headcount=enough'){
                            uni.showToast({
                                icon: 'none',
                                title: '报名人数已满'
                            });
                        }else if(_data.code == 'payStatus=paid'){
                            uni.showToast({
                                title:"你已支付，请勿重复支付",
                                icon:'none'
                            })
                        }else if(_data.code == 'headcountRule=invalie'){
                            uni.showToast({
                                title:"未设置人数规则",
                                icon:'none'
                            })
                        }
                    }else if(statusCode == 404){
                        uni.showToast({
                            icon: 'none',
                            title: '活动不存在'
                        });
                    }
                    self.btnLoading = false
                })
            },
            checkRegistForm(){
                let rule = [
                    {name:"name", checkType : "notnull", checkRule:"",  errorMsg:"请填写姓名"},
					{name:"gender", checkType : "notnull", checkRule:"",  errorMsg:"请填写性别"},
                    {name:"mobile", checkType : "mobile", checkRule:"",  errorMsg:"请填写正确格式手机号"}
                ];
                if(this.requireIdCard == 'Y'){
                    rule.push({name:"idCardNo", checkType : "notnull", checkRule:"",  errorMsg:"该活动必填身份证号"})
                }
                let checkRes = graceChecker.checkForm(this.form, rule);
                return checkRes
            }
        }
    }
</script>

<style>

    .uni-input-row .uni-label{
        width:26%;
    }
    .uni-input-row input{
        width:100%;
		text-align: right;
    }
	.info-text{
		padding: 16px;
		color: red;
	}
</style>
