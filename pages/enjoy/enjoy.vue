<template>
	<view class=" fh-width-100">
		<view class="fh-width-100">
			<uni-segmented-control :current="segmentedControl.current" :values="segmentedControl.items" v-on:clickItem="onClickItem" styleType="text"></uni-segmented-control>
		</view>
		<view class="content">
			<view v-show="segmentedControl.current === 0">
				<view class="uni-list">
					<template v-for=" item in listData1">
						<view class="uni-list-cell-divider"></view>
						<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
							<view class="uni-list-cell-navigate uni-navigate-right"   @click="$utils.ngt('/pages/detail/detail?wwdUserId=' + item.id)">
								<view class="uni-media-list-logo">
									<image :src="$config.file.getDownloadUrl(getPic(item.id,1).picUrl)"></image>
								</view>
								<view class="uni-media-list-body">
									<view class="uni-media-list-text-top">{{item.nickname}}</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">{{$dictUtils.getLabelByValue('gender',item.gender)}}</view>
								</view>
							</view>
						</view>
					</template>
				</view>
			</view>
			<view v-show="segmentedControl.current === 1">
				<view class="uni-list">
					<template v-for=" item in listData2">
						<view class="uni-list-cell-divider"></view>
						<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
							<view class="uni-list-cell-navigate uni-navigate-right"   @click="$utils.ngt('/pages/detail/detail?wwdUserId=' + item.id)">
								<view class="uni-media-list-logo">
									<image :src="$config.file.getDownloadUrl(getPic(item.id,1).picUrl)"></image>
								</view>
								<view class="uni-media-list-body">
									<view class="uni-media-list-text-top">{{item.nickname}}</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">{{$dictUtils.getLabelByValue('gender',item.gender)}}</view>
								</view>
							</view>
						</view>
					</template>
				</view>
			</view>
			<view v-show="segmentedControl.current === 2">
				<view class="uni-list">
					<template v-for=" item in listData3">
						<view class="uni-list-cell-divider"></view>
						<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
							<view class="uni-list-cell-navigate uni-navigate-right"   @click="$utils.ngt('/pages/detail/detail?wwdUserId=' + item.id)">
								<view class="uni-media-list-logo">
									<image :src="$config.file.getDownloadUrl(getPic(item.id,1).picUrl)"></image>
								</view>
								<view class="uni-media-list-body">
									<view class="uni-media-list-text-top">{{item.nickname}}</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">{{$dictUtils.getLabelByValue('gender',item.gender)}}</view>
								</view>
							</view>
						</view>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import uniSegmentedControl from '@/components/uni-segmented-control.vue';

    export default {
        components: {
            uniSegmentedControl
        },
		data() {
			return {
                segmentedControl:{
                    current:0,
					items:[
					    '对谁有意思',
					    '对我有意思',
					    '真的有意思'
					],
				},
                listData1: [],
                listPic1: [],
                listData2: [],
                listPic2: [],
                listData3: [],
                listPic3: []
			};
		},
		onLoad(){
            this.loadData()
		},
		methods:{
            onClickItem(index) {
                if (this.segmentedControl.current !== index) {
                    this.segmentedControl.current = index;
                }
                this.loadData()
            },
            getPic(wwdUserId,index){
                if (index == "1"){
                    for(let i=0;i<this.listPic1.length;i++){
                        let item = this.listPic1[i]
                        if(wwdUserId == item.wwdUserId){
                            return item
                        }
                    }
                } else if (index == "2") {
                    for(let i=0;i<this.listPic2.length;i++){
                        let item = this.listPic2[i]
                        if(wwdUserId == item.wwdUserId){
                            return item
                        }
                    }
                }else if (index == "3") {
                    for(let i=0;i<this.listPic3.length;i++){
                        let item = this.listPic3[i]
                        if(wwdUserId == item.wwdUserId){
                            return item
                        }
                    }
                }

                return null
            },
            loadData: function () {
                let self = this
				let index = this.segmentedControl.current + 1
                if (index == "1"){
                    if(self.listData1.length > 0){
                        return
					}
                } else if (index == "2") {
                    if(self.listData2.length > 0){
                        return
                    }
                }else if (index == "3") {
                    if(self.listData3.length > 0){
                        return
                    }
                }else{
                    return
				}
                this.$http.get('/wwd/user/current/enjoys/' + (this.segmentedControl.current + 1), {
                    data: {},
                    success: function (response) {

                        let content = response.data.data.content
                        let listPic = response.data.data.pic
                        if (index == "1"){
                                self.listData1 = content
                                self.listPic1 = listPic
                        } else if (index == "2") {
                            self.listData2 = content
                            self.listPic2 = listPic
                        }else if (index == "3") {
                            self.listData3 = content
                            self.listPic3 = listPic
                        }
                    }
                })
            }
		}
	}
</script>

<style>
.text{
	width:100%;
}
</style>
