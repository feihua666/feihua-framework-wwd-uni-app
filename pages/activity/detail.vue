<template>
	<view style="width: 100%;">
		<view class="banner">
			<image class="banner-img" mode="aspectFill" :src="$config.file.getDownloadUrl(activity.titleUrl)"></image>
			<!-- <view class="banner-title">{{activity.title}}</view> -->
		</view>
		<view class="fh-padding-30">
			<text class="article-author">{{activity.author}}</text>
			<text class="article-text">创建于</text>
			<text class="article-time">{{activity.updateAt}}</text>
		</view>
		<view class=" fh-padding-30">
			<view class="font-size-lg view-line-height"><text>{{activity.title}}</text></view>
			<view class="font-size-sm view-line-height"><text>活动开始时间：{{activity.startTime}}</text></view>
			<view class="font-size-sm view-line-height"><text>活动结束时间：{{activity.endTime}}</text></view>
			<view class="font-size-sm view-line-height"><text>活动人数：{{activity.headcountDesc}}</text></view>
			<view class="font-size-sm view-line-height"><text>报名费用：{{activity.priceDesc}}</text></view>
			<view class="font-size-sm view-line-height"><text>活动地点：{{activity.addr}}</text></view>

		</view>
		<view class="article-content">
			<rich-text :nodes="activity.content"></rich-text>
		</view>

		<view class="fh-padding-30">
			<button v-if="!participate && activity.status == 'signing'" class="btn-submit" @tap="goSignup" type="primary">我要报名</button>
			<button v-if="participate" disabled>已报名</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				activity: {},
				participate:true
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
        onShow(){
            let self = this
            self.isParticipate()
		},
		methods: {
			goSignup() {
				uni.navigateTo({
				    url: '/pages/activity/signup?activityId=' + this.activity.id
				})
			},
			getDetail() {
				let self = this
                self.$http.get('/wwd/activity/' + self.activity.id).then(function (response) {
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
                        self.activity.priceDesc = '男：'+ content.malePrice+' 元/人，'+'女：'+content.femalePrice+' 元/人'
                    }else{
                        self.activity.priceDesc = content.price + ' 元/人'
                    }
                    uni.setNavigationBarTitle({
                        title: self.activity.title
                    })
                })
			},
			isParticipate(){
                let self = this
                self.$http.get('/wwd/activity/' + self.activity.id + '/participate').then(function (res) {
                    let content = res.data.data.content
                    if('paid' == content.payStatus){
                        self.participate = true
                    }else{
                        self.participate = false
                    }
                }).catch(function () {
                    self.participate = false
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
