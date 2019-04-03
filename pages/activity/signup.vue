
<template>
    <!-- 活动报名 -->
    <view class="uni-column uni-flex uni-flex-item ">
        <view class="uni-input-group">
            <view class="uni-input-row">
                <text class="uni-label">姓名：</text>
                <input type="text" focus clearable v-model="form.name" placeholder="请输入姓名"></input>
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
        </view>
        <view class="fh-padding-30">
            <button type="primary" :loading="btnLoading" @tap="signup">下一步</button>
        </view>
    </view>
</template>

<script>
    //来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
    import  graceChecker from "@/utils/graceChecker.js"
    export default {
        components: {
        },
        data() {
            return {
                btnLoading:false,
                form:{
                    name: '',
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
    }
</style>
