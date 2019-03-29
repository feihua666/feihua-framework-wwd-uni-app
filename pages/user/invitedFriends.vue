<template>
	<fh-loadmore  class="fh-width-100  background-color" ref="loadmoreref">
		<view class="uni-list background-color-after-none background-color-before-none">
			<template v-for=" item in listData">
				<view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right"   @click="$utils.n.ngt('/pages/detail/detail?wwdUserId=' + item.id)">
						<view class="uni-media-list-logo">
							<image :src="$config.file.getDownloadUrl(getPic(item.id).picUrl)"></image>
						</view>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{item.nickname}}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">
								<fh-dict-text type="gender" :val="item.gender"></fh-dict-text>
							</view>
						</view>
					</view>
				</view>
			</template>
		</view>
	</fh-loadmore>
</template>

<script>
    import fhLoadmore from '@/fh-components/fh-loadmore.vue'
    import fhDictText from '@/fh-components/fh-dict-text.vue';

    export default {
        components: {
            fhLoadmore,
            fhDictText
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
                    data: self.searchForm}).then(function (res) {
                    let content = res.data.data.content
                    let listPic = res.data.data.pic
                    if(pullDownRefresh){
                        self.listData = content
                        self.listPic = listPic
                    }else{
                        self.listData = self.listData.concat(content);
                        self.listPic = self.listPic.concat(listPic);
                    }
                })
            }
		}
	}
</script>

<style>

</style>
