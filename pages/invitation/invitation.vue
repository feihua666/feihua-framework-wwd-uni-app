<template>
    <view class="uni-column uni-flex uni-flex-item ">
        <view class="uni-input-group">
            <view class="uni-input-row">
                <text class="uni-label">邀请码：</text>
                <input type="text" focus clearable v-model="form.inviteCode" placeholder="请输入账号"></input>
            </view>
        </view>
        <view class="fh-padding-30">
            <button type="primary" :loading="inviteBtnLoading" @tap="doAcceptInvited">确认</button>
        </view>
        <view class="uni-row uni-flex fh-padding-30 fh-justify-content-center">
            <button type="primary" size="mini" @tap="logoutBtnClick">返回到登录</button>
        </view>
        <view class="uni-flex uni-flex-item uni-column fh-padding-30">
            <view class="uni-center">邀请码详细规则</view>
            <view>1.邀请码为公众号用户专属码，请和您的推荐人确认邀请码</view>
            <view>2.属于您个人的邀请码，请进入公众号点击左上角个人头像进行查看 <text style="font-style: normal;color: red">(初次使用可点击完善信息进行个人信息编辑，完成后可在卡片页展示)</text></view>
            <view>3.一个用户只能绑定一个邀请码</view>
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
                inviteBtnLoading:false,
                form:{
                    inviteCode: ''
                }
            }
        },
        methods: {
            doAcceptInvited() {

                if(!this.checkRegistForm()){
                    return;
                }
                let self = this
                self.inviteBtnLoading = true
                self.$http.post('/wwd/user/acceptInvited',self.form).then(function (res) {
                    uni.showToast({
                        icon: 'none',
                        title: '恭喜被邀请成功'
                    });
                    self.inviteBtnLoading = false
                    uni.reLaunch({
                        url:'/pages/index/index'
                    })
                }).catch(function (res) {
                    let statusCode = res.statusCode
                    let _data = res.data.data;
                    if(statusCode == 404){
                        uni.showToast({
                            icon: 'none',
                            title: '邀请码不正确'
                        });
                    }else if(statusCode == 409){
                        uni.showToast({
                            icon: 'none',
                            title: '您已经被邀请过，请勿重复接收邀请'
                        });
                    }
                    self.inviteBtnLoading = false
                })
            },
            checkRegistForm(){
                let rule = [
                    {name:"inviteCode", checkType : "notnull", checkRule:"",  errorMsg:"请输入邀请码"}
                ];
                let checkRes = graceChecker.checkForm(this.form, rule);
                return checkRes
            },
            logoutBtnClick() {
                let self = this
                uni.showModal({
                    title: '输入邀请码才可继续使用',
                    content: '确认要退出吗',
                    /**
                     * 如果需要强制登录，不显示取消按钮
                     */
                    showCancel: true,
                    success: (res) => {
                        if (res.confirm) {
                            uni.removeStorageSync('wxLoginAuto')
                            uni.removeStorageSync('wxLogin')
                            //退出登录
                            self.$http.post('/logout').then(function () {
                                /**
                                 * 如果需要强制登录跳转回登录页面
                                 */
                                if (self.$config.forcedLogin) {
                                    uni.navigateTo({
                                        url: '/pages/login/login',
                                    });
                                }else{
                                    uni.reLaunch({
                                        url: '/pages/index/index',
                                    });
                                }
                            })
                        }
                    }
                });
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
