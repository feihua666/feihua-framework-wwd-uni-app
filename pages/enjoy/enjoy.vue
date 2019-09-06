<template>
	<view class=" fh-width-100 background-color">
		<view class="fh-width-100">
			<uni-segmented-control :current="segmentedControl.current" :values="segmentedControl.items" v-on:clickItem="onClickItem" styleType="text"></uni-segmented-control>
		</view>
		<view class="content">
			<view v-show="segmentedControl.current === 0">
				<view class="uni-list background-color-after-none background-color-before-none">
					<template v-for=" item in listData1">
						<view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
						<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
							<view class="uni-list-cell-navigate uni-navigate-right"   @click="$utils.n.ngt('/pages/detail/detail?wwdUserId=' + item.id)">
								<view class="uni-media-list-logo">
									<image :src="$config.file.getDownloadUrl(getPic(item.id,1))"></image>
								</view>
								<view class="uni-media-list-body">
									<view class="uni-media-list-text-top">{{item.nickname}}</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">
										<fh-dict-text type="gender" :val="item.gender"></fh-dict-text> 
										<text class="enjoy-date">{{enjoyedTime1[item.id]}}</text>
									</view>
								</view>
							</view>
						</view>
					</template>
				</view>
			</view>
			<view v-show="segmentedControl.current === 1">
				<view class="uni-list background-color-after-none background-color-before-none">
					<template v-for=" item in listData2">
						<view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
						<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
							<view class="uni-list-cell-navigate uni-navigate-right"   @click="$utils.n.ngt('/pages/detail/detail?wwdUserId=' + item.id)">
								<view class="uni-media-list-logo">
									<image :src="$config.file.getDownloadUrl(getPic(item.id,2))"></image>
								</view>
								<view class="uni-media-list-body">
									<view class="uni-media-list-text-top">{{item.nickname}}</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">
										<fh-dict-text type="gender" :val="item.gender"></fh-dict-text> 
										<text class="enjoy-date">{{enjoyedTime1[item.id]}}</text>
									</view>
								</view>
							</view>
						</view>
					</template>
				</view>
			</view>
			<view v-show="segmentedControl.current === 2">
				<view class="uni-list background-color-after-none background-color-before-none">
					<template v-for=" item in listData3">
						<view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
						<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
							<view class="uni-list-cell-navigate uni-navigate-right"   @click="$utils.n.ngt('/pages/detail/detail?wwdUserId=' + item.id)">
								<view class="uni-media-list-logo">
									<image :src="$config.file.getDownloadUrl(getPic(item.id,3))"></image>
								</view>
								<view class="uni-media-list-body">
									<view class="uni-media-list-text-top">{{item.nickname}}</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">
										<fh-dict-text type="gender" :val="item.gender"></fh-dict-text> 
										<text class="enjoy-date">{{enjoyedTime1[item.id]}}</text>
									</view>
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
    import fhDictText from '@/fh-components/fh-dict-text.vue';
    export default {
        components: {
            uniSegmentedControl,
            fhDictText
        },
		data() {
			return {
                segmentedControl:{
                    current:0,
					items:[
					    '对谁有意思',
					    '对我有意思',
					    '互相有意思'
					],
				},
                listData1: [],
                listPic1: [],
				enjoyedTime1: {},
                listData2: [],
                listPic2: [],
				 enjoyedTime2: {},
                listData3: [],
                listPic3: [],
				enjoyedTime3: {}
			};
		},
		onLoad(){
            this.loadData()
		},
        onPullDownRefresh(){
            console.log('onPullDownRefresh');
            this.loadData(true)
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
                            return item.picUrl
                        }
                    }
                } else if (index == "2") {
                    for(let i=0;i<this.listPic2.length;i++){
                        let item = this.listPic2[i]
                        if(wwdUserId == item.wwdUserId){
                            return item.picUrl
                        }
                    }
                }else if (index == "3") {
                    for(let i=0;i<this.listPic3.length;i++){
                        let item = this.listPic3[i]
                        if(wwdUserId == item.wwdUserId){
                            return item.picUrl
                        }
                    }
                }

                return null
            },
            loadData: function (pulldownRefresh) {
                let self = this
				let index = this.segmentedControl.current + 1
    //             if (index == "1"){
    //                 if(self.listData1.length > 0){
    //                     return
				// 	}
    //             } else if (index == "2") {
    //                 if(self.listData2.length > 0){
    //                     return
    //                 }
    //             }else if (index == "3") {
    //                 if(self.listData3.length > 0){
    //                     return
    //                 }
    //             }else{
    //                 return
				// }
                this.$http.get('/wwd/user/current/enjoys/' + (this.segmentedControl.current + 1)).then(function (response) {

                    if(pulldownRefresh){
                        uni.stopPullDownRefresh();
					}
                    let content = response.data.data.content
                    let listPic = response.data.data.pic
				
					let enjoyedTime = response.data.data.enjoyedTime
                    if (index == "1"){
                        self.listData1 = content
                        self.listPic1 = listPic
						self.enjoyedTime1 = enjoyedTime
                    } else if (index == "2") {
                        self.listData2 = content
                        self.listPic2 = listPic
						self.enjoyedTime2 = enjoyedTime
                    }else if (index == "3") {
                        self.listData3 = content
                        self.listPic3 = listPic
						self.enjoyedTime3 = enjoyedTime
                    }
                }).catch(function () {
                    if(pulldownRefresh){
                        uni.stopPullDownRefresh();
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
.enjoy-date{
	float: right;
    margin-right: 20px;
}
</style>
