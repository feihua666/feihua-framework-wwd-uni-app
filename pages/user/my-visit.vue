<template>
	<fh-loadmore  class="fh-width-100  background-color" ref="loadmoreref">
		<view class="uni-list background-color-after-none background-color-before-none">
			<template v-for=" item in listData">
				<view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right"   @click="$utils.n.ngt('/pages/detail/detail?wwdUserId=' + item.wwdUserId)">
						<view class="uni-media-list-logo">
							<image :src="$config.file.getDownloadUrl(item.wwdUserPic)"></image>
						</view>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{item.wwdUserName}}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">
								<fh-dict-text type="gender" :val="item.wwdUserGender"></fh-dict-text>
								<text class="visit-date">{{item.updateAt}}</text>
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
                searchForm: {
					orderable: true,
					orderby: 'update_at-desc',
					visitWwdUserId: ''
                }
			};
		},
        onPullDownRefresh(){
            this.loadData(true)
        },
        onReachBottom() {
            this.loadData()
        },
		onLoad(option){
			this.init(option.flag)
		},
        onReady(){
           
		},
		methods:{
			init: function(flag){
				let self = this
				self.$http.get('/wwd/user/current').then(function (res) {
					
					let content = res.data.data.content
					self.searchForm.visitWwdUserId = content.id
					self.loadData(true)
				})
			},
            updateRead(wwdUserId){
                this.$http.put('/wwd/user/visit/read/'+wwdUserId).then(function (res) {
                })
            },
            loadData:function(pullDownRefresh){
                let self = this
                if(!this.$refs.loadmoreref){
                    return
                }
                this.$refs.loadmoreref.loadData('/wwd/user/visits',{
                    pullDownRefresh:!!pullDownRefresh,
                    data: self.searchForm}).then(function (res) {
                    let content = res.data.data.content
                    if(pullDownRefresh){
                        self.listData = content
                    }else{
                        self.listData = self.listData.concat(content);
                    }
                })
            }
		}
	}
</script>

<style>
	.visit-date{
		float: right;
		margin-right: 20px;
	}
</style>
