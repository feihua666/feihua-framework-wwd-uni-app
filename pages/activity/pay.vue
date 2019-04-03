<template>
<view class="uni-card">
	<view class="uni-card-header"><text>您的报名支付费用：{{activity.totalFee}} 元</text></view>
	<view class="uni-card-content">
		<view class="uni-card-content-inner">
			<view>
				<view class="uni-title"><text>活动开始时间：{{activity.startTime}}</text></view>
				<view class="uni-title"><text>活动结束时间：{{activity.endTime}}</text></view>
				<view class="uni-title"><text>活动人数：{{activity.headcountDesc}}</text></view>
				<view class="uni-title"><text>报名费用：{{activity.priceDesc}}</text></view>
				<view class="uni-title"><text>活动地点：{{activity.addr}}</text></view>
			</view>
			<view>
				<checkbox-group class="uni-flex" name="loves" @change="change">
					<checkbox value="agreement" checked  /><navigator url="/pages/agreement/agreement"><text class="uni-link"> 活动相关协议</text></navigator>
				</checkbox-group>
			</view>
		</view>
	</view>
	<view class=" fh-padding-30"><button v-on:click="doPay()" :disabled="!agreement" type="primary" :loading="payLoading">去支付</button></view>
</view>
</template>

<script>
	import  payUtil from "@/utils/payUtil.js"
	export default {
		data() {
			return {
				agreement: true,
				payLoading: false,
				activity: {
				    id: '',
                    totalFee: '',
                    priceDesc: '',
                    startTime: '',
                    endTime: '',
                    addr: '',
                    headcountDesc: ''
				},
                participateId:''
			}
		},
		onShareAppMessage() {
			let self = this
			return {
				title: self.activity.title,
				path: '/pages/activity/detail?id=' + self.activity.id
			}
		},
		onLoad(options) {
			let self = this
		    self.activity.id = options.activityId
			self.participateId = options.participateId
			self.getDetail()
		},
		watch :{
		},
		methods: {
            change(e){
                if(e.detail.value.length > 0){
                    this.agreement = true
				}else{
                    this.agreement = false
				}
            },
			getDetail() {
				let self = this
                self.$http.get('/wwd/activity/' + self.activity.id).then(function (response) {

                    let content = response.data.data.content
                    self.activity.startTime = content.startTime
                    self.activity.endTime = content.endTime
                    self.activity.addr = content.addr

                    let headcountDesc = ''
                    if(content.headcount==0){
                        headcountDesc = '不限人数'
                    }else{
                        headcountDesc = content.headcount + ' 人'
                    }
                    if(content.headcountDesc){
                        self.activity.headcountDesc = headcountDesc + ' (' + content.headcountDesc + ')'
                    }else{
                        self.activity.headcountDesc= headcountDesc
                    }

                    if(content.malePrice == content.femalePrice){
                        self.activity.priceDesc = content.malePrice + ' 元/人'
                    }else{
                        self.activity.priceDesc = '男：'+ content.malePrice+' 元/人，'+'女：' + content.femalePrice + ' 元/人'
                    }
                    self.activity.totalFee = ''
                    // TODO 该支付的费用 判断自定义性别
                    self.$http.get('/wwd/user/current').then(function (res) {
                        let wwdusercontent = res.data.data.content
                        if('male' == wwdusercontent.gender){
                            self.activity.totalFee = content.malePrice
                            self.setTotalFee(content.malePrice)
                        }else if('female' == wwdusercontent.gender){
                            self.activity.totalFee = content.femalePrice
                            self.setTotalFee(content.femalePrice)
                        }else{
                            uni.showToast({
                                title:"未能匹配到支付金额，请确认已填写性别",
                                icon:'none'
                            })
                        }
                    })
                })
			},
			// 支付
			doPay() {
				let self = this
				if(!self.agreement){
					   uni.showToast({
					    title:"请同意相关活动协议后继续",
					    icon:'none'
					})
					return
				}
				let payForm = {}
                	payForm.participateId = self.participateId
					//商品描述
					payForm.desc = '活动报名费用'
                	payForm.which = self.$config.which
					//// 订单结果通知, 微信主动回调此接口
					payForm.notifyUrl = self.$config.hostApi + '/wwd/activity/participate/order/success'

				if(!self.payLoading){
					self.payLoading = true
					self.$http.post('/wwd/activity/participate/order',payForm).then(function (response) {

                        let content = response.data.data.content
                        if(content){
                            // 调起微信支付
                            payUtil.onBridgeReady(content,function(res){
                                self.payLoading = false
                                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                                    // 使用以上方式判断前端返回,微信团队郑重提示：
                                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                    uni.showToast({
                                        title:"支付成功",
                                        icon:'none'
                                    })
                                    uni.navigateBack({
                                        delta: 2
                                    });
                                }
                            })

                        }else{
                            uni.showToast({
                                title:"未获取到预支付信息",
                                icon:'none'
                            })
                        }
                    }).catch(function (response) {

                        let code = response.data.code
                        let status = response.statusCode
                        if(status == 404){
                            if('wxopenid_no' == code){
                                uni.showToast({
                                    title:"未获取到openid",
                                    icon:'none'
                                })
                            }else if('fee_no' == code){
                                uni.showToast({
                                    title:"未能匹配到支付金额，请确认已填写性别",
                                    icon:'none'
                                })
                            }else{
                                uni.showToast({
                                    title:"活动不存在",
                                    icon:'none'
                                })
                            }
                        }else if(status == 409){
                            if('payStatus=paid' == code){
                                uni.showToast({
                                    title:"你已支付，请勿重复支付",
                                    icon:'none'
                                })
                            }
                        }
                        self.payLoading = false
                    })
				}

			},
			setTotalFee(fee){
                this.activity.totalFee = fee
            }
		}
	}
</script>

<style>
	.uni-card {
		width: 100%;
	}
</style>
