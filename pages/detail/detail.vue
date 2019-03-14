<template>
	<view class="fh-width-100">
		<swiper class="swiper"  :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
			<swiper-item v-for="pic in wwdUser.picUrls">
				<image @tap="previewImage($config.file.getDownloadUrl(pic.picOriginUrl))" mode="aspectFill" :src="$config.file.getDownloadUrl(pic.picOriginUrl)" class="fh-height-100 fh-width-100"></image>
			</swiper-item>
		</swiper>
		<!-- 基本信息 -->
		<view class="fh-padding-30">
			<view><text class="iconfont" :class="$utils.genderIcon(wwdUser.wwdUserDto.gender)"><text class="fh-inline-space-10"></text>{{wwdUser.wwdUserDto.nickname}}</text></view>
			<view>
				<text class='iconfont icon-shengri fh-margin-right-30'><text class="fh-inline-space-10"></text>{{$utils.dateFomat(wwdUser.wwdUserDto.birthDay)}}</text>
				<text class='iconfont icon-xingzuo fh-margin-right-30'><text class="fh-inline-space-10"></text>{{$dictUtils.getLabelByValue('constellation_type',wwdUser.wwdUserDto.constellation)}}</text>
				<text class='iconfont icon-shengao fh-margin-right-30'><text class="fh-inline-space-10"></text>{{wwdUser.wwdUserDto.height}}</text>
				<text class='iconfont icon-tizhong fh-margin-right-30'><text class="fh-inline-space-10"></text>{{wwdUser.wwdUserDto.weight}}</text>
			</view>
			<view>
				<text class='iconfont icon-daxuemingcheng'><text class="fh-inline-space-10"></text>{{$dictUtils.getLabelByValue('education_level',wwdUser.wwdUserDto.education)}} {{wwdUser.wwdUserDto.college}} {{wwdUser.wwdUserDto.major}}</text>
			</view>
			<view>
				<text class='iconfont icon-weizhi'><text class="fh-inline-space-10"></text>{{wwdUser.userArea.nowProvinceName}} {{wwdUser.userArea.nowCityName}} {{wwdUser.userArea.nowDistrictName}}</text>
			</view>
			<view>
				<text class='iconfont icon-fl-jia'><text class="fh-inline-space-10"></text>{{wwdUser.userArea.homeProvinceName}} {{wwdUser.userArea.homeCityName}} {{wwdUser.userArea.homeDistrictName}}</text>
			</view>
		</view>
		<view class="fh-padding-30">
			<view>生活信息</view>
			<view>
				<view class="uni-flex uni-row">
					<text class='iconfont icon-cheliang uni-flex-item '><text class="fh-inline-space-10"></text>{{$dictUtils.getLabelByValue('has_car_status',wwdUser.wwdUserDto.hasCar)}}</text>
					<text class='iconfont icon-icon-test1 uni-flex-item'><text class="fh-inline-space-10"></text>{{$dictUtils.getLabelByValue('has_hourse_status',wwdUser.wwdUserDto.hasHourse)}}</text>
				</view>
				<view class="uni-flex uni-row">
					<text class='iconfont icon-chouyan uni-flex-item '><text class="fh-inline-space-10"></text>{{$dictUtils.getLabelByValue('smoking_status',wwdUser.wwdUserDto.smoking)}}</text>
					<text class='iconfont icon-hejiu uni-flex-item'><text class="fh-inline-space-10"></text>{{$dictUtils.getLabelByValue('drinking_status',wwdUser.wwdUserDto.drinking)}}</text>
				</view>
				<view class="uni-flex uni-row">
					<text class='iconfont icon-qianmoney125 uni-flex-item '><text class="fh-inline-space-10"></text>{{wwdUser.wwdUserDto.monthSalary}}</text>
					<text class='iconfont icon-qianmoney113 uni-flex-item'><text class="fh-inline-space-10"></text>{{wwdUser.wwdUserDto.yearSalary}}</text>
				</view>
			</view>
		</view>
		<view class="fh-padding-30">
			<view>标签信息</view>
			<view>
				<view v-for="tag in wwdUser.tags">
					<text class='iconfont' :class="tagIcon(tag.type)"> {{$dictUtils.getLabelsByValues(tag.type,tag.content)}}</text>
				</view>
			</view>
		</view>
		<view class="fh-padding-30">
			<view>个人介绍</view>
			<view>
				<text>{{wwdUser.wwdUserDto.description}}</text>
			</view>
		</view>
		<view class="fh-padding-30">
			<view>择偶标准</view>
			<view>
				<text>{{wwdUser.wwdUserDto.standard}}</text>
			</view>
		</view>
		<view class="fh-padding-30">
			<button type="primary" @tap="enjoy" :loading="enjoyLoading"  v-if="'married' != wwdUser.wwdUserDto.maritalStatus && isEnjoy">有意思</button>
		</view>
	</view>
</template>

<script>
	export default {
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
                self.$http.post('/wwd/user/current/enjoy/' + this.wwdUserId, {
                    success: function(response){
                        self.isEnjoy = false
                        uni.showToast({
                            title:'恭喜您已表示了对TA有意思',
                            icon:'none'
                        })

                    },
					complete:function () {
						self.enjoyLoading = false
                    }
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
                self.$http.get('/wwd/user/'+ self.wwdUserId +'/pic',{
                    success:function (response) {
                        let content = response.data.data.content
                        self.wwdUser.picUrls = content
                    }
                })
			},
			//加载详细基本信息
			loadWwdUserDto(){
                let self = this
                self.$http.get('/wwd/user/' + self.wwdUserId, {
                    success: function (response) {
                        let content = response.data.data.content
						self.wwdUser.wwdUserDto = content
						self.wwdUser.photo = response.data.data.photo
                    }
                })
			},
			//加载区域，家乡和当前所在地
			loadArea(){
                let self = this
                self.$http.get('/wwd/user/' + self.wwdUserId +'/area', {
                    success: function (response) {
                        let content = response.data.data.content
                        self.wwdUser.userArea = content
                    }
                })
			},
			//加载是否已对他/她有意思
			loadEnjoy(){
                let self = this
                self.$http.get('/wwd/user/current/enjoy/' + self.wwdUserId, {
                    success: function (response) {
                        let content = response.data.data.content
                        // 存在数据表示已有意思
                        if (content){
                        }
                        //不存在数据，可以点击有意思
                        else{
                            self.isEnjoy = true
                        }
                    },
                    fail: res=>{
                        // 不存在，可以点击有意思
                        let status = res.statusCode
                        if (status ==404 ){
                            self.isEnjoy = true
                        }
                    }
                })
			},
            loadTags: function () {
                let self = this
                self.$http.get('/wwd/user/' + self.wwdUserId +'/tags', {
                    success: function (res) {
                        let tagContent = res.data.data.content
                        self.wwdUser.tags = tagContent
                    }
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
