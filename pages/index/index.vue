<template>
	<view class="fh-width-100 background-color">
        <!-- 固定在顶部的导航栏 -->
        <uni-nav-bar fixed="true" class="box-shadow-none" :left-container="false" :right-container="false">
            <view class="uni-flex fh-align-items-center fh-justify-content-center fh-height-100  fh-width-100">
                <view class="fh-search-view uni-flex fh-align-items-center" @tap="goSearch">
                    <view class="uni-swiper-msg">
                        <view class="uni-swiper-msg-icon  uni-flex fh-align-items-center">
                            <uni-icon type="search" size="22" color="#666666"></uni-icon>
                        </view>
                        <view v-if="searchForm.keyword">{{searchForm.keyword}}</view>
                        <swiper v-else vertical="true" autoplay="true" circular="true" interval="9000">
                            <swiper-item class="font-size-sm">
                                点击搜索
                            </swiper-item>
                        </swiper>
                    </view>

                </view>

            </view>

        </uni-nav-bar>
        <!-- 使用非原生导航栏后需要在页面顶部占位 -->
        <view style="height:50px;"></view>
		<fh-loadmore ref="loadmoreref" class="background-color">
            <view style="margin-top:10px;" class="uni-card box-shadow-none" v-for="(item,index) in listData" :key="index">
                <view class="uni-card-header uni-card-media">
                    <image class="uni-card-media-logo" :src="$config.file.getDownloadUrl(photo[item.wwdUserDto.userId])"></image>
                    <view class="uni-card-media-body">
                        <text class="uni-card-media-text-top">
                            <text class="iconfont" :class="$utils.genderIcon(item.wwdUserDto.gender)">
                            </text>
                            <text class="fh-inline-space-10"></text>
                            {{item.wwdUserDto.nickname}}
                        </text>
                        <text class="uni-card-media-text-bottom font-size-sm">
                            <text class=' iconfont icon-weizhi'></text>
                            <text class="fh-inline-space-10"></text>
                            {{item.wwdUserAreaDto.nowProvinceName}} {{item.wwdUserAreaDto.nowCityName}}
                        </text>
                    </view>
                </view>
                <view class="uni-card-content fh-image-view">
                    <image @tap="previewImage($config.file.getDownloadUrl(pic.picOriginUrl) + '?x-oss-process=image/auto-orient,1')" lazy-load mode="aspectFill" v-for="(pic,i) in item.wwdUserPicDtos" v-if="pic.type == 'main'" :src="$config.file.getDownloadUrl(pic.picOriginUrl) + '?x-oss-process=image/auto-orient,1/resize,h_528'" class="image height100"></image>
                </view>
                <view class="uni-card-footer" >
                    <view class="font-size-sm">
                        <text class=' iconfont icon-shengri'></text>
                        <text class="fh-inline-space-10"></text>
                        {{$utils.date.dateFomat(item.wwdUserDto.birthDay)}}
                    </view>
                    <view class="font-size-sm"><text class="iconfont icon-shengao"></text><text class="fh-inline-space-10"></text>{{item.wwdUserDto.height}}</view>
                    <view class="uni-card-link"><navigator :url="'/pages/detail/detail?wwdUserId=' + item.wwdUserDto.id">详情</navigator></view>
                </view>
            </view>
        </fh-loadmore>
	</view>
</template>

<script>
    import uniNavBar from '@/components/uni-nav-bar.vue'
    import uniIcon from '@/components/uni-icon.vue'
    import fhLoadmore from '@/fh-components/fh-loadmore.vue'
	export default {
        components: {
            uniNavBar,
            fhLoadmore,
            uniIcon
        },
        computed: {
        },
		data() {
			return {
			    // 列表信息
                listData: [],
                //列表头像信息
                photo:{},
                searchForm: {
                    includePic: true,
                    keyword:'',
                    gender:'',
                    ageStart:'',
                    ageEnd:'',
                    education:'',
                    homeProvinceId:'',
                    homeCityId:'',
                    homeDistrictId:'',
                    nowProvinceId:'',
                    nowCityId:'',
                    nowDistrictId:''
                }
			}
		},
		onLoad() {
            console.log('onLoad index')

		},
        onReady(){
            this.pageLogical()
        },
        onPullDownRefresh(){
            console.log('onPullDownRefresh');
            this.loadData(true)
        },
        onReachBottom() {
            this.loadData()
        },
        methods: {
            previewImage:function(url){
                if(url)
                uni.previewImage({urls:[url]})
            },
            loadData:function(pullDownRefresh){
                console.log('loaddata')
                let self = this
                if(!this.$refs.loadmoreref){
                    return
                }
                this.$refs.loadmoreref.loadData('/wwd/users',{
                    pullDownRefresh:!!pullDownRefresh,
                    data: self.searchForm}).then(function (res) {
                    let content = res.data.data.content
                    if(pullDownRefresh){
                        self.listData = content
                    }else{
                        self.listData = self.listData.concat(content);
                    }
                    for(let key in res.data.data.photo){
                        self.photo[key] = res.data.data.photo[key]
                    }
                }).catch(function (res) {
                    let status = res.statusCode
                    if(status == 404){
                        self.listData = []
                    }
                })
            },

            doSearch(data){
                for(let key in  data){
                    this.searchForm[key]=data[key]||''
                }
                this.loadData(true)
            },
            goSearch(){
                this.$bus.$off('indexSearch')
                this.$bus.$on('indexSearch',(data) => {
                    this.doSearch(data)
                })
                uni.navigateTo({
                    url: '/pages/index/search?searchType=index&keyword=' + this.searchForm.keyword
                });
            },

            // 以下是页面跳转相关逻辑 ***************************
            pageLogical(){
                let self = this
                let splashShowed = this.$storageUtils.getSync('splashShowed')
                // 先判断引导页是否需要展示，如果需要展示，展示引导页
                if(!splashShowed){
                    uni.reLaunch({
                        url:'/pages/splash/splash'
                    })
                }else{
                    this.$http.hasLogin().then(function () {
                        // 已登录
                        self.pageLogical_hasLogin()
                    }).catch(function (res) {
                        console.log(res);
                        // 未登录
                        if(self.$config.forcedLogin){
                            uni.reLaunch({
                                url: '/pages/login/login'
                            });
                        }
                    })
                }
            },
            pageLogical_hasLogin(){
                console.log('pageLogical_hasLogin')
                let self = this
                self.$http.getCurrentUserinfo().then(function (userinfo) {
                    // 已经登录，判断是否被邀请
                    // 跳转到邀请页面
                    if(uni.getStorageSync('invited' + userinfo.id)){
                        self.loadData(true)
                        return
                    }

                    self.$http.get('/wwd/user/current/invited').then(function (res) {
                        // 有数据，已被邀请
                        self.loadData(true)
                        uni.setStorageSync('invited' + userinfo.id,true)
                    }).catch(function () {
                        // 跳转到输入邀请码页面
                        uni.reLaunch({
                            url: '/pages/invitation/invitation'
                        });
                    })
                })

            }
		},
        watch:{
        }
	}
</script>

<style>

    .fh-search-view {
        width: 50%;
        display: flex;
        background-color: #e7e7e7;
        height: 30px;
        border-radius: 15px;
        padding: 0 4%;
        flex-wrap:nowrap;
        margin:7px 0;
        line-height:30px;
    }
    swiper{
        font-size: 16px;
    }

    .fh-image-view {
        height: 440upx;
        overflow: hidden;
    }

    .uni-card{
        box-shadow: 0 -2px 15px rgba(0, 0, 0, .3);
    }
    .image {
        width: 100%;
    }
</style>
