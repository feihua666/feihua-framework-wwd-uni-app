<template>
	<view class="fh-width-100">
        <!-- 固定在顶部的导航栏 -->
        <uni-nav-bar fixed="true" :left-container="false" :right-container="false">
            <view class="uni-flex fh-align-items-center fh-justify-content-center fh-height-100  fh-width-100">
                <view class="fh-search-view uni-flex fh-align-items-center" @tap="goSearch">
                    <view class="uni-swiper-msg">
                        <view class="uni-swiper-msg-icon  uni-flex fh-align-items-center">
                            <uni-icon type="search" size="22" color="#666666"></uni-icon>
                        </view>
                        <view v-if="searchForm.keyword">{{searchForm.keyword}}</view>
                        <swiper v-else vertical="true" autoplay="true" circular="true" interval="9000">
                            <swiper-item>
                                搜索心仪的TA
                            </swiper-item>
                            <swiper-item>
                                点击搜索
                            </swiper-item>
                        </swiper>
                    </view>

                </view>

            </view>

        </uni-nav-bar>
        <!-- 使用非原生导航栏后需要在页面顶部占位 -->
        <view style="height:80px;"></view>
		<fh-loadmore ref="loadmoreref">
            <view style="margin-top:10px;" class="uni-card" v-for="(item,index) in listData" :key="index">
                <view class="uni-card-header uni-card-media">
                    <image class="uni-card-media-logo" :src="$config.file.getDownloadUrl(photo[item.wwdUserDto.userId])"></image>
                    <view class="uni-card-media-body">
                        <text class="uni-card-media-text-top">
                            <text class="iconfont" :class="$utils.genderIcon(item.wwdUserDto.gender)"> {{item.wwdUserDto.nickname}}</text>

                        </text>
                        <text class="uni-card-media-text-bottom">
                            <text class=' iconfont icon-weizhi'></text> {{item.wwdUserAreaDto.nowProvinceName}} {{item.wwdUserAreaDto.nowCityName}}</text>
                    </view>
                </view>
                <view class="uni-card-content fh-image-view">
                    <image @tap="previewImage($config.file.getDownloadUrl(pic.picOriginUrl))" lazy-load mode="aspectFill" v-for="(pic,i) in item.wwdUserPicDtos" v-if="pic.type == 'main'" :src="$config.file.getDownloadUrl(pic.picOriginUrl)" class="image height100"></image>
                </view>
                <view class="uni-card-footer">
                    <view>
                        <text class=' iconfont icon-shengri'> {{$utils.dateFomat(item.wwdUserDto.birthDay)}}</text>
                    </view>
                    <view><text class="iconfont icon-shengao"> {{item.wwdUserDto.height}}</text></view>
                    <view class="uni-card-link"><navigator :url="'/pages/detail/detail?wwdUserId=' + item.wwdUserDto.id">详情</navigator></view>
                </view>
            </view>
        </fh-loadmore>
	</view>
</template>

<script>
    import {
        mapState
    } from 'vuex'
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
            ...mapState(['forcedLogin', 'hasLogin','userinfo'])
        },
		data() {
			return {
			    // 列表信息
                listData: [],
                //列表头像信息
                photo:null,
                searchForm: {
                    includePic: true,
                    keyword:'', // 查询关键字
                }
			}
		},
		onLoad() {
            console.log('onLoad index')
            if (!this.hasLogin) {
                if(this.forcedLogin){
                    uni.navigateTo({
                        url: '/pages/login/login'
                    });
                }
            }
            let self = this
            this.$bus.$off('indexSearch')
            this.$bus.$on('indexSearch',(data) => {
                this.doSearch(data)
            })
		},
        onReady() {
        console.log('onLoad index')
        if (!this.hasLogin) {
           /* if(this.forcedLogin){
                uni.navigateTo({
                    url: '/pages/login/login'
                });
            }*/
        }else{
            this.loadData(true)
        }
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
                let self = this
                if(!this.$refs.loadmoreref){
                    return
                }
                this.$refs.loadmoreref.loadData('/wwd/users',{
                    pullDownRefresh:!!pullDownRefresh,
                    data: self.searchForm,
                    success:function (res) {
                        let content = res.data.data.content
                        if(pullDownRefresh){
                            self.listData = content
                        }else{
                            self.listData = self.listData.concat(content);
                        }
                        self.photo = res.data.data.photo
                    }
                })
            },

            doSearch(data){
                this.searchForm.keyword = data.keyword
                this.loadData(true)
            },
            goSearch(){
                uni.navigateTo({
                    url: '/pages/search/search?searchType=index&keyword=' + this.searchForm.keyword
                });
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
        height: 480upx;
        overflow: hidden;
    }

    .uni-card{
        box-shadow: 0 -2px 15px rgba(0, 0, 0, .3);
    }
    .image {
        width: 100%;
    }
</style>
