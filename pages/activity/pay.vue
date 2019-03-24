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
		</view>
	</view>
	<view class=" fh-padding-30"><button v-on:click="doPay()" type="primary" :loading="payLoading">去支付</button></view>
</view>
</template>

<script>
	import  payUtil from "@/common/payUtil.js"
	export default {
		data() {
			return {
				payLoading: false,
				activity: {
				    id: '',
                    totalFee: '',
                    priceDesc: '',
                    startTime: '',
                    endTime: '',
                    addr: '',
                    headcountDesc: ''
				}
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
		    self.activity.id = options.id
			self.getDetail()
		},
		methods: {
			getDetail() {
				let self = this
                self.$http.get('/wwd/activity/' + self.activity.id, {
                    success: function (response) {
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
                            self.activity.priceDesc = content.price + ' 元/人'

						}else{
                            self.activity.priceDesc = '男：'+ content.malePrice+' 元/人，'+'女：' + content.femalePrice + ' 元/人'
						}
                        self.activity.totalFee = ''
						// TODO 该支付的费用 判断自定义性别
                        self.$http.get('/wwd/user/current', {
                            success: res => {
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
                            }
                        })
                    }
                })
			},
			// 支付
			doPay() {
				let self = this
				let payForm = {}
                	payForm.id = self.activity.id
					//商品描述
					payForm.desc = '活动报名费用'
                	payForm.which = self.$config.which
					//// 订单结果通知, 微信主动回调此接口
					payForm.notifyUrl = self.$config.hostApi + '/wwd/activity/order/success'

				if(!self.payLoading){
					self.payLoading = true
					self.$http.post('/wwd/activity/' + self.activity.id + '/order',{
					data: payForm,
					success:function (response) {
						let content = response.data.data.content
						if(content){
							// 调起微信支付
							payUtil.onBridgeReady(content,function(res){
                                self.payLoading = false
								if(res.err_msg == "get_brand_wcpay_request:ok" ){
								  // 使用以上方式判断前端返回,微信团队郑重提示：
										//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                    uni.showToast({
                                        title:"支付完成",
                                        icon:'none'
                                    })
									uni.navigateBack()
								  }
							})

						}else{
                            uni.showToast({
                                title:"未获取到预支付信息",
                                icon:'none'
                            })
						}
					},
					fail:function (response) {
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
					},
						complete:function () {

                        }
					})
				}

			},
			setTotalFee(fee){
                this.activity.totalFee = fee
                console.log(this.activity.totalFee);
            }
		}
	}
</script>

<style>
	.uni-card {
		width: 100%;
	}
</style>
