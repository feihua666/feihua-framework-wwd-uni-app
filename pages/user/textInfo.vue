<template>
	<view class="fh-width-100 fh-padding-30">

		<view v-for="item in copyMyinfo">{{item}}</view>
		<view class="fh-padding-30">
			<button type="primary" @tap="doCopyMyinfo">复制我的信息</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                // 复制我的信息
                copyMyinfo:[],
                wwdUser:{
                    wwdUserDto:null,
                    userArea:null
                }
			};
		},
		onLoad(){
		    this.loadWwdUserDto()
		    this.loadArea()
		},
		computed:{
		},
		methods:{
            doCopyMyinfo(){
                if(this.copyMyinfo.length > 0){
                    this.$utils.copy(this.copyMyinfo.join('\n'))
                }
            },
            doAppendCopyInfo(){
                let self = this
				this.copyMyinfo=[]
                self.copyMyinfo.push('姓名：' + self.wwdUser.wwdUserDto.nickname)
                self.copyMyinfo.push('性别：' + self.$dictUtils.getLabelByValue('gender',self.wwdUser.wwdUserDto.gender))
                self.copyMyinfo.push('家乡：' + self.wwdUser.userArea.homeProvinceName +' ' + self.wwdUser.userArea.homeCityName +' '+ self.wwdUser.userArea.homeDistrictName)
                self.copyMyinfo.push('目前在：' + self.wwdUser.userArea.nowProvinceName +' ' + self.wwdUser.userArea.nowCityName +' ' + self.wwdUser.userArea.nowDistrictName)
                self.copyMyinfo.push('出生日期：' + self.$utils.dateFomat(self.wwdUser.wwdUserDto.birthDay))
                self.copyMyinfo.push('婚姻状况：' + self.$dictUtils.getLabelByValue('gender',self.wwdUser.wwdUserDto.gender))
                self.copyMyinfo.push('身高：' + self.wwdUser.wwdUserDto.height)
                self.copyMyinfo.push('体重：' + self.wwdUser.wwdUserDto.weight)
                self.copyMyinfo.push('学历：' + self.$dictUtils.getLabelByValue('education_level',self.wwdUser.wwdUserDto.education))
                self.copyMyinfo.push('房：' + self.$dictUtils.getLabelByValue('has_hourse_status',self.wwdUser.wwdUserDto.hasHourse))
                self.copyMyinfo.push('车：' + self.$dictUtils.getLabelByValue('has_car_status',self.wwdUser.wwdUserDto.hasCar))
                self.copyMyinfo.push('职业：' + self.wwdUser.wwdUserDto.profession)
                self.copyMyinfo.push('抽烟：' + self.$dictUtils.getLabelByValue('smoking_status',self.wwdUser.wwdUserDto.smoking))
                self.copyMyinfo.push('喝酒：' + self.$dictUtils.getLabelByValue('drinking_status',self.wwdUser.wwdUserDto.drinking))
                self.copyMyinfo.push('自我描述：' + self.wwdUser.wwdUserDto.description)
                self.copyMyinfo.push('理想类型：' + self.wwdUser.wwdUserDto.standard)

            },
            //加载详细基本信息，复制我的信息用
            loadWwdUserDto(){
                let self = this
                self.$http.get('/wwd/user/current', {
                    success: function (response) {
                        let content = response.data.data.content
                        self.wwdUser.wwdUserDto = content
                    }
                })
            },
            //加载区域，家乡和当前所在地，复制我的信息用
            loadArea(){
                let self = this
                self.$http.get('/wwd/user/current/area', {
                    success: function (response) {
                        let content = response.data.data.content
                        self.wwdUser.userArea = content
                    }
                })
            }
		},
		watch:{
		    'wwdUser.wwdUserDto'(){
		        if(this.wwdUser.wwdUserDto && this.wwdUser.userArea){
		            this.doAppendCopyInfo()
				}
			},
            'wwdUser.userArea'(){
                if(this.wwdUser.wwdUserDto && this.wwdUser.userArea){
                    this.doAppendCopyInfo()
                }
            }
		}
	}
</script>

<style>

</style>
