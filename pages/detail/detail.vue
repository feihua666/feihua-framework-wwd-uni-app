<template>
	<view class="fh-width-100">
		<swiper class="swiper"  :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
			<swiper-item v-for="pic in wwdUser.picUrls">
				<image @tap="previewImage($config.file.getDownloadUrl(pic.picOriginUrl))" mode="aspectFill" :src="$config.file.getDownloadUrl(pic.picOriginUrl) + '?x-oss-process=image/resize,h_528/auto-orient,1'" class="fh-height-100 fh-width-100"></image>
			</swiper-item>
		</swiper>
		<!-- 基本信息 -->
		<view class="fh-padding-30 ">
			<view class="uni-flex fh-justify-content-space-between">
				<view>
					<text class="iconfont" :class="$utils.genderIcon(wwdUser.wwdUserDto.gender)">
						<text class="fh-inline-space-10"></text>
						{{wwdUser.wwdUserDto.nickname}}
					</text>
				</view>

				<fh-dict-text class="font-size-sm" type="married_status" :val="wwdUser.wwdUserDto.maritalStatus"></fh-dict-text>
			</view>
			<view class="view-line"></view>
			<view  class="view-line-height">
				<text class='iconfont icon-shengri fh-margin-right-30'>
					<text class="fh-inline-space-10"></text>
					<text class=" font-size-sm">
						{{$utils.date.dateFomat(wwdUser.wwdUserDto.birthDay)}}
					</text>
				</text>
				<text class='iconfont icon-xingzuo fh-margin-right-30'><text class="fh-inline-space-10"></text>
					<fh-dict-text class=" font-size-sm" type="constellation_type" :val="wwdUser.wwdUserDto.constellation"></fh-dict-text>
				</text>
				<text class='iconfont icon-shengao fh-margin-right-30'>
					<text class="fh-inline-space-10"></text>
					<text class=" font-size-sm">
						{{wwdUser.wwdUserDto.height}}
					</text>

				</text>
				<text class='iconfont icon-tizhong fh-margin-right-30'>
					<text class="fh-inline-space-10"></text>

					<text class=" font-size-sm">
						{{wwdUser.wwdUserDto.weight}}
					</text>
				</text>
			</view>
			<view class="view-line-height">
				<text class='iconfont icon-daxuemingcheng'><text class="fh-inline-space-10"></text>
					<fh-dict-text class=" font-size-sm" type="education_level" :val="wwdUser.wwdUserDto.education"></fh-dict-text>

					<text class=" font-size-sm">
						{{wwdUser.wwdUserDto.college}} {{wwdUser.wwdUserDto.major}}
					</text>
				</text>
			</view>
			<view class="view-line-height">
				<text class='iconfont icon-weizhi'><text class="fh-inline-space-10"></text>

					<text class=" font-size-sm">
						{{wwdUser.userArea.nowProvinceName}} {{wwdUser.userArea.nowCityName}} {{wwdUser.userArea.nowDistrictName}}
					</text>
				</text>
			</view>
			<view class="view-line-height">
				<text class='iconfont icon-fl-jia'><text class="fh-inline-space-10"></text>

					<text class=" font-size-sm">
						{{wwdUser.userArea.homeProvinceName}} {{wwdUser.userArea.homeCityName}} {{wwdUser.userArea.homeDistrictName}}
					</text>
				</text>
			</view>
		</view>
		<view class="fh-padding-30">
			<view>生活信息</view>
			<view class="view-line"></view>
			<view>
				<view class="uni-flex uni-row view-line-height">
					<text class='iconfont icon-cheliang uni-flex-item '><text class="fh-inline-space-10"></text>
						<fh-dict-text class=" font-size-sm" type="has_car_status" :val="wwdUser.wwdUserDto.hasCar"></fh-dict-text>
					</text>
					<text class='iconfont icon-icon-test1 uni-flex-item'><text class="fh-inline-space-10"></text>
						<fh-dict-text class=" font-size-sm" type="has_hourse_status" :val="wwdUser.wwdUserDto.hasHourse"></fh-dict-text>
					</text>
				</view>
				<view class="uni-flex uni-row view-line-height">
					<text class='iconfont icon-chouyan uni-flex-item '><text class="fh-inline-space-10"></text>
						<fh-dict-text class=" font-size-sm" type="smoking_status" :val="wwdUser.wwdUserDto.smoking"></fh-dict-text>
					</text>
					<text class='iconfont icon-hejiu uni-flex-item'><text class="fh-inline-space-10"></text>
						<fh-dict-text class=" font-size-sm" type="drinking_status" :val="wwdUser.wwdUserDto.drinking"></fh-dict-text>
					</text>
				</view>
				<view class="uni-flex uni-row view-line-height">
					<text class='iconfont icon-qianmoney125 uni-flex-item '>
						<text class="fh-inline-space-10"></text>

						<text class=" font-size-sm">
							{{wwdUser.wwdUserDto.monthSalary}}
						</text>
					</text>
					<text class='iconfont icon-qianmoney113 uni-flex-item'>
						<text class="fh-inline-space-10"></text>
						<text class=" font-size-sm">
							{{wwdUser.wwdUserDto.yearSalary}}
						</text>

					</text>
				</view>
			</view>
		</view>
		<view class="fh-padding-30">
			<view>标签信息</view>
			<view class="view-line"></view>
			<view>
				<view v-for="tag in wwdUser.tags" class="view-line-height">
					<text class='iconfont' :class="tagIcon(tag.type)">
					</text>
					<text class="fh-inline-space-10"></text>
					<fh-dict-text class=" font-size-sm" style="margin-right: 3px;" v-if="tag.content" v-for="dictValue in tag.content.split(',')" :type="tag.type" :val="dictValue"></fh-dict-text>

				</view>
			</view>
		</view>
		<view class="fh-padding-30">
			<view>个人介绍</view>
			<view class="view-line"></view>
			<view>
				<text class=" font-size-sm">{{wwdUser.wwdUserDto.description}}</text>
			</view>
		</view>
		<view class="fh-padding-30">
			<view>择偶标准</view>
			<view class="view-line"></view>
			<view>
				<text class=" font-size-sm">{{wwdUser.wwdUserDto.standard}}</text>
			</view>
		</view>
		<view class="fh-padding-30">
			<button type="primary" @tap="enjoy" :loading="enjoyLoading"  v-if="'married' != wwdUser.wwdUserDto.maritalStatus && isEnjoy">有意思</button>
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
				wwdUserId:null,
				//是否可以对他有意思
				isEnjoy:false,
				enjoyLoading:false,
				wwdUser:{
                    picUrls:[],
                    wwdUserDto:{},
                    photo:null,
                    userArea:{},
                    tags: []
				}
			};
		},
		computed:{
		    picUrls_computed(){
		        let urls = []
				for(let i=0;i < this.wwdUser.picUrls.length;i++){
				    let pic = this.wwdUser.picUrls[i]
					urls.push(this.$config.file.getDownloadUrl(pic.picOriginUrl))
				}
				return urls;
			},
            shareContent () {
                return  {
                    title: this.wwdUser.wwdUserDto.nickname,
                    desc: this.wwdUser.wwdUserDto.description,
                    imgUrl: this.$config.file.getDownloadUrl(this.wwdUser.photo),
                    type:'汪汪队用户详情',
                    contentId:this.wwdUser.wwdUserDto.id,
                    contentName:this.wwdUser.wwdUserDto.name
                }
            }
		},
		onLoad(options){
		    this.wwdUserId = options.wwdUserId

			this.loadPic()
			this.loadWwdUserDto()
			this.loadArea()
			this.loadTags()
			this.loadEnjoy()
		},
		methods:{
            // 有意思按钮
            enjoy:function(){
                let self = this
                uni.showModal({
                    title: '有意思',
                    content: '请三思，不能儿戏！',
                    showCancel: true,
                    success: function(res){
                        if (res.confirm) {
                           self.doEnjoy()
                        }
                    }
                });
            },
			doEnjoy(){
                let self = this
                // 发起对他有意思
				self.enjoyLoading = true
                self.$http.post('/wwd/user/current/enjoy/' + this.wwdUserId).then(function (res) {
                    self.isEnjoy = false
                    uni.showToast({
                        title:'恭喜您已表示了对TA有意思',
                        icon:'none'
                    })
                    self.enjoyLoading = false
                })
			},
		    tagIcon(type){
		        let r = ''
		        switch (type) {
					case 'nature_type':
					    r = 'icon-smileface'
					    break
                    case 'hobby_type':
                        r = 'icon-xingquaihao'
                        break
                    case 'food_type':
                        r = 'icon-shiwu'
                        break
                    case 'movie_type':
                        r = 'icon-dianying'
                        break
                    case 'trip_type':
                        r = 'icon-lvhang'
                        break
                    case 'sport_type':
                        r = 'icon-yundong101'
                        break
                }
                return r
			},
            previewImage:function(url){
                if(url)
                    uni.previewImage({
						current:url,
						urls:this.picUrls_computed,
						indicator:'number'
                    })
            },
		    //加载图片
		    loadPic(){
		        let self = this
                self.$http.get('/wwd/user/'+ self.wwdUserId +'/pic').then(function (response) {
                    let content = response.data.data.content
                    self.wwdUser.picUrls = content
                })
			},
			//加载详细基本信息
			loadWwdUserDto(){
                let self = this
                self.$http.get('/wwd/user/' + self.wwdUserId).then(function (response) {
                    let content = response.data.data.content
                    self.wwdUser.wwdUserDto = content
                    self.wwdUser.photo = response.data.data.photo
					// 记录页面访问
					self.$http.pageViewRecord({
                        url:window.location.href,
                        type:'汪汪队用户详情',
                        contentId:content.id,
                        contentName:content.name
					})
                })
			},
			//加载区域，家乡和当前所在地
			loadArea(){
                let self = this
                self.$http.get('/wwd/user/' + self.wwdUserId +'/area').then( function (response) {
                    let content = response.data.data.content
                    self.wwdUser.userArea = content
                })
			},
			//加载是否已对他/她有意思
			loadEnjoy(){
                let self = this
                self.$http.get('/wwd/user/current/enjoy/' + self.wwdUserId).then(function (response) {
                    let content = response.data.data.content
                    // 存在数据表示已有意思
                    if (content){
                    }
                    //不存在数据，可以点击有意思
                    else{
                        self.isEnjoy = true
                    }
                }).catch( res=>{
                    // 不存在，可以点击有意思
                    let status = res.statusCode
                    if (status ==404 ){
                        self.isEnjoy = true
                    }
                })
			},
            loadTags: function () {
                let self = this
                self.$http.get('/wwd/user/' + self.wwdUserId +'/tags').then(function (res) {
                    let tagContent = res.data.data.content
                    self.wwdUser.tags = tagContent
                })
            }
		}
	}
</script>

<style>
	.swiper {
		height: 480upx;
	}
	.swiper-item {
		display: block;
		height: 480upx;
		height: 480upx;
		text-align: center;
	}
</style>
