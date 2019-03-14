<template>
<view class="uni-card">
	<view class="uni-card-header"><text>您的报名支付费用：{{activity.totalFee}} 元</text></view>
	<view class="uni-card-content">
		<view class="uni-card-content-inner">
			<view>
				<view class="uni-title"><text>活动时间：{{$utils.dateFomat(activity.startTime)}}-{{$utils.dateFomat(activity.endTime)}}</text></view>
				<view class="uni-title"><text>活动人数：{{activity.headcountDesc}}</text></view>
				<view class="uni-title"><text>报名费用：{{activity.priceDesc}}</text></view>
				<view class="uni-title"><text>活动地点：{{activity.addr}}</text></view>
			</view>
		</view>
	</view>
	<view><button v-on:click="doPay()" type="primary" :disabled="payLoading">去支付</button></view>
</view>
</template>

<script>
	import  payUtil from "@/common/payUtil.js"
	export default {
		data() {
			return {
				payLoading: false,
				activity: {}
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
						self.activity = content
					
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
						
						if(self.activity.payRule =='2'){
							self.activity.priceDesc = '男：'+ content.malePrice+'/人，'+'女：'+content.femalePrice+'/人'
						}else{
							self.activity.priceDesc = content.price + '/人'
						}
						// TODO 该支付的费用 判断自定义性别
						self.activity.totalFee = content.price
                    }
                })
			},
			// 支付
			doPay() {
				let self = this
				let payForm = {}
					//商品描述
					payForm.body = '活动报名费用'
					//标价金额
					payForm.totalFee = self.activity.totalFee
					//// 订单结果通知, 微信主动回调此接口
					payForm.notifyUrl = ''
					
				if(!self.payLoading){
					self.payLoading = true
					self.$http.formpost('/pay/wxpay/unifiedOrder',{
					data: payForm,
					success:function (response) {
						let content = response.data.data.content
						if(content){
							// 调起微信支付
							payUtil.onBridgeReady(content,function(){
								if(res.err_msg == "get_brand_wcpay_request:ok" ){
								  // 使用以上方式判断前端返回,微信团队郑重提示：
										//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
								  } 
							})
							
						}
					},
					fail:function (response) {}
					})
				}
			
			}
		}
	}
</script>

<style>
	.uni-card {
		width: 100%;
	}
</style>
