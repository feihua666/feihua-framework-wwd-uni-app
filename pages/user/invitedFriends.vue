<template>
	<fh-loadmore  class="fh-width-100" ref="loadmoreref">
		<view class="uni-list">
			<template v-for=" item in listData">
				<view class="uni-list-cell-divider"></view>
				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right"   @click="$utils.ngt('/pages/detail/detail?wwdUserId=' + item.id)">
						<view class="uni-media-list-logo">
							<image :src="$config.file.getDownloadUrl(getPic(item.id).picUrl)"></image>
						</view>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{item.nickname}}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">{{$dictUtils.getLabelByValue('gender',item.gender)}}</view>
						</view>
					</view>
				</view>
			</template>
		</view>
	</fh-loadmore>
</template>

<script>
    import fhLoadmore from '@/fh-components/fh-loadmore.vue'
	export default {
        components: {
            fhLoadmore
        },
		data() {
			return {
                listData: [],
                listPic: [],
                searchForm: {
                }
			};
		},
        onPullDownRefresh(){
            this.loadData(true)
        },
        onReachBottom() {
            this.loadData()
        },
		onLoad(){

		},
        onReady(){
            this.loadData(true)
		},
		methods:{
            getPic(wwdUserId){
                for(let i=0;i<this.listPic.length;i++){
                    let item = this.listPic[i]
                    if(wwdUserId == item.wwdUserId){
                        return item
                    }
                }
                return null
            },
            loadData:function(pullDownRefresh){
                let self = this
                if(!this.$refs.loadmoreref){
                    return
                }
                this.$refs.loadmoreref.loadData('/wwd/myfriends',{
                    pullDownRefresh:!!pullDownRefresh,
                    data: self.searchForm,
                    success:function (res) {
                        let content = res.data.data.content
                        let listPic = res.data.data.pic
                        if(pullDownRefresh){
                            self.listData = content
                            self.listPic = listPic
                        }else{
                            self.listData = self.listData.concat(content);
                            self.listPic = self.listPic.concat(listPic);
                        }
                    }
                })
            }
		}
	}
</script>

<style>

</style>
