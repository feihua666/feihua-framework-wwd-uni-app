<template>
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
        </view>
        <view class="fh-padding-30">
            <button type="primary" :loading="btnLoading" @tap="signup">下一步</button>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    //来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
    import  graceChecker from "@/common/graceChecker.js"
    export default {
        components: {
        },
        data() {
            return {
                btnLoading:false,
                form:{
                    name: '',
                    mobile: '',
                    activityId: ''
                }
            }
        },
        computed: mapState(['regs']),
        onLoad (options) {
            this.form.activityId = options.activityId
        },
        methods: {
            signup() {

                if(!this.checkRegistForm()){
                    return;
                }
                let self = this
                self.btnLoading = true
                self.$http.post('/wwd/participate/user/current',{
                    data:self.form,
                    success:function (res) {
                        let content = res.data.data.content
                        uni.showToast({
                            icon: 'none',
                            title: '恭喜报名成功'
                        });
                        self.btnLoading = false
                        uni.navigateTo({
                            url: '/pages/activity/pay?participateId=' + content.id + '&activityId=' + self.form.activityId
                        })
                    },
                    fail:function (res) {
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
                            }
                        }else if(statusCode == 404){
                            uni.showToast({
                                icon: 'none',
                                title: '活动不存在'
                            });
                        }
                        self.btnLoading = false
                    }
                })
            },
            checkRegistForm(){
                let rule = [
                    {name:"name", checkType : "notnull", checkRule:"",  errorMsg:"请填写姓名"},
                    {name:"mobile", checkType : "reg", checkRule:this.regs.mobile,  errorMsg:"请填写正确格式手机号"}
                ];
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
