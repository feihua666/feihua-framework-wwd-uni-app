<template>
	<view style="width: 100%;">
		<view class="banner">
			<image class="banner-img" mode="aspectFill" :src="$config.file.getDownloadUrl(activity.titleUrl) + '?x-oss-process=image/resize,h_528/auto-orient,1'"></image>
			<!-- <view class="banner-title">{{activity.title}}</view> -->
		</view>
		<view class="fh-padding-30">
			<text class="article-author">{{activity.author}}</text>
			<text class="article-text">创建于</text>
			<text class="article-time">{{activity.updateAt}}</text>
		</view>
		<view class=" fh-padding-30">
			<view class="font-size-lg view-line-height"><text>{{activity.title}}</text></view>
			<view class="font-size-sm view-line-height"><text>活动开始时间：{{$utils.date.getDateWeek(activity.startTime)}}</text></view>
			<view class="font-size-sm view-line-height"><text>活动结束时间：{{$utils.date.getDateWeek(activity.endTime)}}</text></view>
			<view class="font-size-sm view-line-height"><text>活动人数：{{activity.headcountDesc}}</text></view>
			<view class="font-size-sm view-line-height"><text>报名费用：{{activity.priceDesc}}</text></view>
			<view class="font-size-sm view-line-height"><text>支付方式：<fh-dict-text class="font-size-sm" type="wwd_pay_type" :val="activity.payType"></fh-dict-text></text></view>
			<view class="font-size-sm view-line-height"><text>活动地点：{{activity.addr}}</text></view>

		</view>
		<view class="article-content activity-detail-content-img-width100 uni-center">
			<view v-html="activity.content"></view>
		</view>

		<view class="fh-padding-30" style="width: 90%;">

			<button v-if="participate" disabled>已报名</button>
			<template v-else>
				<button v-if="activity.status == 'signing' && (activity.headcountRule == 'unlimited' || isCustomNotFull)" class="btn-submit" @tap="goSignup" type="primary">我要报名</button>
			</template>
		</view>
		<view class="fh-padding-30" v-if="participates.length >0" style="border-top: 1px solid #ccc;width: 90%;">
			<view class="font-size-sm view-line-height" style="color: red;"><text>{{activity.signDesc}}</text></view>
		</view>
		 <view class="fh-padding-30">
		    <view class="icon-item" v-for="(item,index) in participates" :key="index" @tap="$utils.n.ngt('/pages/detail/detail?wwdUserId=' + item.wwdUserDto.id)" style="display: inline-block;width: 20%;">
				<image class="uni-grid-9-image" :src="$config.file.getDownloadUrl(item.baseUserDto.photo)" style="border-radius: 50%;width: 50px;height: 50px;"></image>
		    </view>
		</view>

		<fh-wx-share-h5 ref="fhwxshare" :share-content="shareContent"></fh-wx-share-h5>
	</view>
</template>

<script>
	import fhDictText from '@/fh-components/fh-dict-text.vue';
    import fhWxShareH5 from '@/fh-components/fh-wx-share-h5.vue';
	export default {
        components: {
            fhDictText, fhWxShareH5
        },
		data() {
			return {
				femaleCount: 0,
				maleCount: 0,
				activity: {},
				participateForm: {
					orderable: true,
					orderby: 'update_at-asc',
					pageable: false,
					wwdActivityId: null,
					payStatus: 'paid,offline_pay',
					status: 'normal,alternate'
				},
				participates: [],
				participate: true,
                wwdUser: {}
			}
		},
		computed: {
		    // 标识限制男女人数是否不满
            isCustomNotFull () {
                if (this.activity.headcountRule == 'custom'){
                    if('male' == this.wwdUser.gender){
                        if(parseInt(this.maleCount) <  parseInt(this.activity.headcountMale)){
                            return true
						}
                    }else if('female' == this.wwdUser.gender){
                        if(parseInt(this.femaleCount) <  parseInt(this.activity.headcountFemale)){
                            return true
                        }
                    }
				}
                return false
			},
            shareContent () {
                return  {
                    title: this.activity.title,
                    desc: this.activity.introduced,
                    imgUrl: this.$config.file.getDownloadUrl(this.activity.titleUrl) + '?x-oss-process=image/resize,h_528/auto-orient,1',
                    link: this.$config.host + '/uni-app/#/pages/activity/detail?id=' + this.activity.id,
                    type:'汪汪队活动详情',
                    contentId:this.activity.id,
                    contentName:this.activity.title
                }
			}
		},
		onLoad(options) {
			let self = this
		    self.activity.id = options.id
			self.participateForm.wwdActivityId = options.id
			self.getDetail()
			self.loadWwdUser()
		},
        onShow(){
            let self = this
            self.isParticipate()
		},
		methods: {
			goSignup() {
				uni.navigateTo({
				    url: '/pages/activity/signup?activityId=' + this.activity.id + '&requireIdCard=' + this.activity.requireIdCard + '&payType=' + this.activity.payType
				})
			},
			getDetail() {
				let self = this
                self.$http.get('/wwd/activity/' + self.activity.id).then(function (response) {
                    let content = response.data.data.content
                    self.activity = content
                    let headcountDesc = ''
                    if(content.headcount==0 || (content.headcountMale + content.headcountFemale) == 0){
                        headcountDesc = '不限人数'
                    }else{
                        headcountDesc = content.headcountRule == 'unlimited' ? content.headcount : (content.headcountMale + content.headcountFemale) + ' 人'
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

                    // 记录页面访问
                    self.$http.pageViewRecord({
                        url:window.location.href,
                        type:'汪汪队用户详情',
                        contentId:content.id,
                        contentName:content.title
                    })
                })
			},
			isParticipate(){
                let self = this
                self.$http.get('/wwd/activity/' + self.activity.id + '/participate').then(function (res) {
                    let content = res.data.data.content
                    if('paid' == content.payStatus || 'offline_pay' == content.payStatus){
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
			},
            loadWwdUser(){
                let self = this
                self.$http.get('/wwd/user/current').then( res => {
                    let content = res.data.data.content
                    self.wwdUser = content
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
