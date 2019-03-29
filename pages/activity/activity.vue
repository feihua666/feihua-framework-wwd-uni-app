<template>
	<view class="fh-width-100 background-color">
        <!-- 固定在顶部的导航栏 -->
       <!-- <uni-nav-bar fixed="true" :left-container="false" :right-container="false">
            <view class="uni-flex fh-align-items-center fh-justify-content-center fh-height-100  fh-width-100">
                <view class="fh-search-view uni-flex fh-align-items-center" @tap="goSearch">
                    <view class="uni-swiper-msg">
                        <view class="uni-swiper-msg-icon  uni-flex fh-align-items-center">
                            <uni-icon type="search" size="22" color="#666666"></uni-icon>
                        </view>
                        <view v-if="searchForm.keyword">{{searchForm.keyword}}</view>
                        <swiper v-else vertical="true" autoplay="true" circular="true" interval="9000">
                            <swiper-item>
                                搜索活动
                            </swiper-item>
                            <swiper-item>
                                点击搜索
                            </swiper-item>
                        </swiper>
                    </view>

                </view>

            </view>

        </uni-nav-bar>-->
        <!-- 使用非原生导航栏后需要在页面顶部占位 -->
        <!--<view style="height:40px;"></view>-->
		<fh-loadmore ref="loadmoreref" class="background-color">
            <view style="margin-top:10px;" class="uni-card box-shadow-none" v-for="(item,index) in listData" :key="index">
                	<view class="uni-card-content uni-list-cell">
						<navigator class="fh-width-100" :url="'/pages/activity/detail?id=' + item.id">
						<view class="uni-media-list">
							<view class="uni-media-list-logo">
								<image  :src="$config.file.getDownloadUrl(item.titleUrl) + '?x-oss-process=image/auto-orient,1/resize,h_528'"></image>
							</view>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top font-size-md">{{item.title}}</view>
								<view class="uni-media-list-text-body uni-text  font-size-sm">{{$utils.date.dateFomatWeek(item.startTime)}}</view>
								<view class="uni-media-list-text-bottom uni-ellipsis font-size-sm"><text>{{item.introduced}}</text></view>
							</view>
						</view>
						</navigator>
                	</view>
                	<view class="uni-card-footer">
                		<view class="uni-card-link">{{item.wwdParticipateDtos?item.wwdParticipateDtos.length:'0'}}/{{item.headcount=='0'?'不限人数':item.headcount}} 人 </view>
                		<view class="uni-card-link">
                            <fh-uni-tag inverted="true" type="danger" size="small">
                                <fh-dict-text :type="'activity_status'" :val="item.status"  text="不限"></fh-dict-text>
                            </fh-uni-tag>
                        </view>
                		<view class="uni-card-link"><navigator :url="'/pages/activity/detail?id=' + item.id"><uni-tag text="我要报名" inverted="true" type="warning" size="small"></uni-tag></navigator></view>
                	</view>
            </view>
        </fh-loadmore>
	</view>
</template>

<script>
    import uniNavBar from '@/components/uni-nav-bar.vue'
    import uniIcon from '@/components/uni-icon.vue'
    import fhLoadmore from '@/fh-components/fh-loadmore.vue'
	import uniTag from '@/components/uni-tag.vue'
    import fhDictText from '@/fh-components/fh-dict-text.vue';
    import fhUniTag from '@/fh-components/uni-tag.vue';
	export default {
        components: {
            uniNavBar,
            fhLoadmore,
            uniIcon,
			uniTag,
            fhUniTag,
            fhDictText
        },
        computed: {
        },
		data() {
			return {
			    // 列表信息
                listData: [],
                searchForm: {
                    includePic: true,
					status: 'signing,signfull',
                    keyword:'', // 查询关键字
                }
			}
		},
		onLoad() {
            let self = this
            this.$bus.$off('activitySearch')
            this.$bus.$on('activitySearch',(data) => {
                this.doSearch(data)
            })
		},
        onReady() {
            this.loadData(true)
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
                this.$refs.loadmoreref.loadData('/wwd/activitys',{
                    pullDownRefresh:!!pullDownRefresh,
                    data: self.searchForm
                }).then(function (res) {
                    let content = res.data.data.content
                    if(pullDownRefresh){
                        self.listData = content
                    }else{
                        self.listData = self.listData.concat(content);
                    }
                }).catch(function (res) {
                    let status = res.statusCode
                    if(404 == status){
                        uni.showToast({
                            title:'没有匹配数据',
                            icon:'none'
                        })
                    }
                })
            },

            doSearch(data){
                this.searchForm.keyword = data.keyword
                this.loadData(true)
            },
            goSearch(){
                uni.navigateTo({
                    url: '/pages/search/search?keyPrefix=activity&emitEvent=activitySearch&keyword=' + this.searchForm.keyword
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
		padding: 1px;
        height: 135px;
		width: 135px;
        overflow: hidden;
    }
	.uni-media-list-logo {
		height: 80px;
		width: 80px;
		margin-right: 8px;
	}
	.uni-media-list-body{
		height: 65px;
	}
    .uni-card{
        box-shadow: 0 -2px 15px rgba(0, 0, 0, .3);
    }
    .image {
        width: 100%;
    }
</style>
