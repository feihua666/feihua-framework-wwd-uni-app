<template>
	<view>
		<view class="banner">
			<image class="banner-img" :src="$config.file.getDownloadUrl(activity.titleUrl)"></image>
			<view class="banner-title">{{activity.title}}</view>
		</view>
		<view class="article-meta">
			<text class="article-author">{{activity.author}}</text>
			<text class="article-text">发表于</text>
			<text class="article-time">{{activity.updateAt}}</text>
		</view>
		<view class="article-content">
			<rich-text :nodes="activity.content"></rich-text>
		</view>
		<view class="article-bottom">
			<view class="uni-card">
				<view class="uni-card-header"></view>
				<view class="uni-card-content">
					<view class="uni-card-content-inner">
						<view>
							<view class="uni-title"><text>活动时间：{{$utils.dateFomat(activity.startTime)}}-{{$utils.dateFomat(activity.endTime)}}</text></view>
							<view class="uni-title"><text>活动人数：{{activity.headcount}}</text></view>
							<view class="uni-title"><text>报名费用：{{activity.priceDesc}}</text></view>
							<view class="uni-title"><text>活动地点：{{activity.addr}}</text></view>
						</view>
					</view>
				</view>
				<view class="uni-card-footer"><button class="btn-submit" formType="submit" type="primary">我要报名</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activity: {}
			}
		},
		onShareAppMessage() {
			let self = this
			return {
				title: self.activity.title,
				path: '/pages/activity/detail?activityId=' + self.activity.activityId
			}
		},
		onLoad(options) {
			let self = this
		    self.activity.activityId = options.activityId
	

			self.getDetail()
		},
		methods: {
			getDetail() {
				let self = this
                self.$http.get('/wwd/activity/' + self.activity.activityId, {
                    success: function (response) {
                        let content = response.data.data.content
						self.activity = content
						
						if(self.activity.payRule =='2'){
							self.activity.priceDesc = '男：'+ content.malePrice+'/人，'+'女：'+content.femalePrice+'/人'
						}else{
							self.activity.priceDesc = content.price + '/人'
						}
						uni.setNavigationBarTitle({
							title: self.activity.title
						})
                    }
                })
			}
		}
	}
</script>

<style>
	.banner {
		height: 360upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
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

	.article-content {
		padding: 0 30upx;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
	.uni-title {
		padding: 3px 0;
	}
</style>
