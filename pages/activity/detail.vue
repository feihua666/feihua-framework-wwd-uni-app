<template>
	<view style="width: 100%;">
		<view class="banner">
			<image class="banner-img" mode="aspectFill" :src="$config.file.getDownloadUrl(activity.titleUrl) + '?x-oss-process=image/auto-orient,1/resize,h_528'"></image>
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
		<view class="article-content activity-detail-content-img-width100 uni-center">
			<view v-html="activity.content"></view>
		</view>

		<view class="fh-padding-30" style="width: 90%;">
			<button v-if="!participate && activity.status == 'signing'" class="btn-submit" @tap="goSignup" type="primary">我要报名</button>
			<button v-if="participate" disabled>已报名</button>
		</view>
		<view class=" fh-padding-30" v-if="participates.length >0" style="border-top: 1px solid #ccc;width: 90%;">
			<view class="font-size-sm view-line-height" style="color: red;"><text>{{activity.signDesc}}</text></view>
		</view>
		 <view class="uni-padding-wrap">
		    <view class="icon-item" v-for="(item,index) in participates" :key="index" @tap="$utils.n.ngt('/pages/detail/detail?wwdUserId=' + item.wwdUserDto.id)" style="display: inline-block;width: 20%;">
				<image class="uni-grid-9-image" :src="$config.file.getDownloadUrl(item.baseUserDto.photo)" style="border-radius: 50%;width: 50px;height: 50px;"></image>
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				femaleCount: 0,
				maleCount: 0,
				activity: {},
				participateForm: {
					orderable: true,
					orderby: 'update_at-desc',
					pageable: false,
					wwdActivityId: null,
					payStatus: 'paid',
					status: 'normal,alternate'
				},
				participates: [],
				participate: true
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
			self.participateForm.wwdActivityId = options.id
			self.getDetail()
			
		},
        onShow(){
            let self = this
            self.isParticipate()
		},
		methods: {
			goSignup() {
				uni.navigateTo({
				    url: '/pages/activity/signup?activityId=' + this.activity.id + '&requireIdCard=' + this.activity.requireIdCard
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

                    if(content.malePrice == content.femalePrice){
                        self.activity.priceDesc = content.malePrice + ' 元/人'
                    }else{
                        self.activity.priceDesc = '男：'+ content.malePrice+' 元/人，'+'女：' + content.femalePrice + ' 元/人'
                    }
                    uni.setNavigationBarTitle({
                        title: self.activity.title
                    })
					self.getParticipates()
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
			},
			getParticipates(){
                let self = this
                self.$http.get('/wwd/participates',self.participateForm).then(function (res) {
                    let content = res.data.data.content
					self.participates = content
					if(content && content.length > 0){
						let maleCount = 0
						let femaleCount = 0
						for(let i = 0; i< content.length; i++){
							if(content[i].wwdUserDto.gender == 'male'){
								maleCount ++
							}else if (content[i].wwdUserDto.gender == 'female'){
								femaleCount ++
							}
						}
						self.maleCount = maleCount
						self.femaleCount = femaleCount
						if(self.activity.headcountRule && self.activity.headcountRule=='custom'){
							self.activity.signDesc = ['已报名人数：男 ',maleCount,'/',self.activity.headcountMale,' 人; 女 ',femaleCount,'/',self.activity.headcountFemale ,'人'].join('')
						}else{
							self.activity.signDesc = ['已报名人数：男 ',maleCount,'人; 女 ',femaleCount,'人'].join('')
						}
					}
                }).catch(function () {
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
	.uni-padding-wrap{
		border-top: 1px solid #ccc;
		padding: 6px 5px 0 13px;
		margin-bottom: 10px;
	}

</style>
