<template>
	<view style="width: 100%;">
		<view class="article-content">
			<text class="article-author">
				1、靠谱单身活动主要以个人或参与组队活动记录辅助，为自己或团队活动提高效率，方便查询；
			</br>2、请仔细了解活动行程、强度及风险，恐高、高血压等不宜参加户外活动者请慎重报名，如果因身体原因导致活动中发生意外，靠谱单身活动不承担责任；
			</br>3、参与者在景区自由游玩时请注意人身和财产安全，出现问题后及时联系带队人员协商解决，如因个人失误造成的损失和意外，需由参与者个人承担；
			</br>4、网站在线报名时，确保需要填写的信息（如姓名、身份证号码、联系电话等）真实有效，以便成功购买保险，如果因提供错误信息导致购买保险无效，风险由自己承担；
			</br>5、报名后，活动开始前1天12点后不能退出，退出者不退还预付费（可自行找替补，预付费私下结算）;
			</br>6、报名后，如已支付活动费用，因其他原因需要退款，可联系客服处理;
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad(options) {
		},
        onShow(){
		},
		methods: {
			
		}
	}
</script>

<style>
	.article-content{
		padding: 8px;
	}
	.article-meta {
		padding: 20upx 40upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26upx;
		line-height: 50upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
	}
</style>
