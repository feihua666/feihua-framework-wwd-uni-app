<template>
	<view class="fh-width-100 background-color">
	<view class="uni-list background-color-after-none background-color-before-none">
		<template v-for=" item in listData">
			<view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
			<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate" @click="selectBtnClick(item)">
					<view class="uni-media-list-logo">
						<image :src="$config.file.getDownloadUrl(item.baseUserDto.photo)"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.wwdUserDto.nickname}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">
							<fh-dict-text type="gender" :val="item.wwdUserDto.gender"></fh-dict-text>
							<text class="visit-date" v-if="item.selected"><fh-uni-tag inverted="true" type="danger" size="small" :text="'已选'+item.level"></fh-uni-tag></text>
							
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
    import fhUniTag from '@/fh-components/uni-tag.vue';
    export default {
        components: {
            fhDictText,
			fhUniTag
        },
		data() {
			return {
                listData: [],
				activityId: null,
				wwdUser: {
                    wwdUserId: null,
					gender: null
				},
				selectedWwdUser: []
			};
		},
        onPullDownRefresh(){
            this.getSelected()
        },
        onReachBottom() {
        },
		onLoad(option){

            this.activityId = option.activityId
            this.wwdUser.wwdUserId = option.wwdUserId
            this.wwdUser.gender = option.gender
            this.getSelected()
		},
        onReady(){

		},
		methods:{
            getParticipates(){
                let self = this
				let keepGender = ''
				if (this.wwdUser.gender == 'male'){
                    keepGender = 'female'
				}else if (this.wwdUser.gender == 'female'){
                    keepGender = 'male'
                }else {
                    uni.showToast({
                        icon: 'none',
                        title: '您的性别不匹配，请修改个人资料后再试'
                    });
				    return
				}
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
					let temp = []
                    if(content && content.length > 0){
                        for(let i = 0; i< content.length; i++){
                            if(content[i].wwdUserDto.gender == keepGender){
								
                                if (self.selectedWwdUser.length>0) {
									self.selectedWwdUser.forEach(function(v){
										if(content[i].wwdUserDto.id == v.selectedWwdUserId){
											content[i].selected = true
											content[i].level = v.level || ''
											return false
										}
									})
								}

                                temp.push(content[i])
                            }
                        }
                    }
                    self.listData = temp
                }).catch(function () {
                })
            },
			getSelected(){
                let self = this
				let form = {
                    activityId: self.activityId,
                    wwdUserId: self.wwdUser.wwdUserId
				}
				self.$http.get('/wwd/activityMutualElection/userMutualElections',form)
					.then(function (res) {
						let content = res.data.data.content
						self.selectedWwdUser = content
                        uni.stopPullDownRefresh();
						self.getParticipates()

                    }).catch(() => {
                    	self.selectedWwdUser = []
                    	uni.stopPullDownRefresh();
						self.getParticipates()

					})
			},
            selectBtnClick(item) {

                let self = this
                // 点击已选择的不提示
				console.log(item)
				if(item.selected){
					uni.showModal({
					    title: '您是否要取消选择',
					    content: item.wwdUserDto.nickname,
					    showCancel: true,
					    success: (res) => {
					        if (res.confirm) {
					            // 如果有选择的更新，没有选择的添加
								let id  = ''
								self.selectedWwdUser.forEach(function(v){
									if(v.selectedWwdUserId == item.wwdUserDto.id){
										id = v.id 
										return false
									}
								})
					            self.$http.delete('/wwd/activityMutualElection/userMutualElection/'+ id).then(function () {
					                // 保存完成，重新加载数据
					                uni.showToast({
					                    icon: 'none',
					                    title: '您的取消选择已提交'
					                });
					                self.getSelected()
					            }).catch(() => {
					                // 保存完成，重新加载数据
					                uni.showToast({
					                    icon: 'none',
					                    title: 'sorry,互选已结束'
					                });
					            })
				
					        }
					    }
					});
				} else if (self.selectedWwdUser.length >= 2){
					uni.showToast({
					    icon: 'none',
					    title: '您的选择达到上限'
					});
                    return
				}else {
					uni.showModal({
					    title: '您的选择是',
					    content: item.wwdUserDto.nickname,
					    showCancel: true,
					    success: (res) => {
					        if (res.confirm) {
					            // 如果有选择的更新，没有选择的添加
					            let form = {
					                activityId: self.activityId,
					                wwdUserId: self.wwdUser.wwdUserId,
					                selectedWwdUserId: item.wwdUserDto.id
					            }
								form.level = 'A'
								if(self.selectedWwdUser.length == 1 && self.selectedWwdUser[0].level == 'A'){
									form.level = 'B'
								}
					            self.$http.post('/wwd/activityMutualElection/userMutualElection',form).then(function () {
					                // 保存完成，重新加载数据
					                uni.showToast({
					                    icon: 'none',
					                    title: '您的选择已提交'
					                });
					                self.getSelected()
					            }).catch(() => {
					                // 保存完成，重新加载数据
					                uni.showToast({
					                    icon: 'none',
					                    title: 'sorry,互选已结束'
					                });
					            })
					        }
					    }
					});
				}
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
