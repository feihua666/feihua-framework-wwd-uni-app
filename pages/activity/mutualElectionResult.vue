<template>
	<view class="fh-width-100 background-color">
	<view class="uni-list background-color-after-none background-color-before-none">
		<view class="uni-center">海选展示</view>
		<template v-for=" item in selectedData">
			<view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
			<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate" v-if="item.wwdUser">
					<view class="uni-media-list-logo">
						<image :src="$config.file.getDownloadUrl(item.wwdUser.baseUserDto.photo)"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.wwdUser.wwdUserDto.nickname}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">
							<fh-dict-text type="gender" :val="item.wwdUser.wwdUserDto.gender"></fh-dict-text>
						</view>
					</view>
				</view>
				<!-- 被选择的-->
				<view class="uni-list-cell-navigate" v-if="item.selectedWwdUser">
					<view class="uni-media-list-logo">
						<image :src="$config.file.getDownloadUrl(item.selectedWwdUser.baseUserDto.photo)"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.selectedWwdUser.wwdUserDto.nickname}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">
							<fh-dict-text type="gender" :val="item.selectedWwdUser.wwdUserDto.gender"></fh-dict-text>
						</view>
					</view>
				</view>
			</view>
		</template>
		<view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
		<view class="uni-center uni-list-cell-last">互选展示</view>
		<template v-for=" item in selectedData" v-if="item.equalSelect">
			<view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
			<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate" v-if="item.wwdUser">
					<view class="uni-media-list-logo">
						<image :src="$config.file.getDownloadUrl(item.wwdUser.baseUserDto.photo)"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.wwdUser.wwdUserDto.nickname}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">
							<fh-dict-text type="gender" :val="item.wwdUser.wwdUserDto.gender"></fh-dict-text>
						</view>
					</view>
				</view>
				<!-- 被选择的-->
				<view class="uni-list-cell-navigate" v-if="item.selectedWwdUser">
					<view class="uni-media-list-logo">
						<image :src="$config.file.getDownloadUrl(item.selectedWwdUser.baseUserDto.photo)"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.selectedWwdUser.wwdUserDto.nickname}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">
							<fh-dict-text type="gender" :val="item.selectedWwdUser.wwdUserDto.gender"></fh-dict-text>
						</view>
					</view>
				</view>
			</view>
		</template>
	</view>
	</view>
</template>

<script>
    import fhDictText from '@/fh-components/fh-dict-text.vue';

    export default {
        components: {
            fhDictText
        },
        data() {
            return {
                participates: [],
				selectedResult: [],
                activityId: null
            };
        },
		computed: {
            participateMap () {
                let map = {}
                if(!this.participates) {
                    return map
                }
                for (let i = 0; i < this.participates.length; i++) {
                    map[this.participates[i].wwdUserId] = this.participates[i]
				}
                return map
			},
			selectedData () {
                let temp = []
                if(!this.selectedResult) {
                    return temp
				}
                for (let i = 0; i < this.selectedResult.length; i++) {
                    let tObj = {
                        wwdUser: this.participateMap[this.selectedResult[i].wwdUserId],
                        selectedWwdUser: this.participateMap[this.selectedResult[i].selectedWwdUserId],
                        equalSelect: false
                    };
                    if (tObj.wwdUser && tObj.wwdUser.wwdUserDto.gender == 'male') {
                        // 判断他是否选了我
                        for (let j = 0; j < this.selectedResult.length; j++) {
                            if ((this.participateMap[this.selectedResult[j].wwdUserId].wwdUserDto.gender == 'female') &&
								this.selectedResult[j].wwdUserId == this.selectedResult[i].selectedWwdUserId &&
                                this.selectedResult[j].selectedWwdUserId == this.selectedResult[i].wwdUserId) {
                                tObj.equalSelect = true
                                break
                            }
                        }
					}

                    temp.push(tObj)
                }
                return temp
			}
		},
        onPullDownRefresh(){
            this.getSelectedResult()
        },
        onReachBottom() {
        },
        onLoad(option){
            this.activityId = option.activityId
            this.getSelectedResult()
        },
        onReady(){

        },
        methods:{
            getParticipates(){
                let self = this
                let participateForm = {
                    orderable: true,
                    orderby: 'update_at-asc',
                    pageable: false,
                    wwdActivityId: this.activityId,
                    payStatus: 'paid,offline_pay',
                    status: 'normal,alternate'
                }
                self.$http.get('/wwd/participates',participateForm).then(function (res) {
                    let content = res.data.data.content
                    self.participates = content
                }).catch(function () {
                })
            },
            getSelectedResult(){
                let self = this
                let form = {
                    activityId: self.activityId
                }
                self.$http.get('/wwd/activityMutualElection/userMutualElections',form)
                    .then(function (res) {
                        let content = res.data.data.content
                        self.selectedResult = content
                        uni.stopPullDownRefresh();
                        self.getParticipates()
                    }).catch(() => {
                    self.selectedResult = []
                    uni.stopPullDownRefresh();
                    self.getParticipates()
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
