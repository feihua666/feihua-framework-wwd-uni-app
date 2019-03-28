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
				self.$http.getDictByValue('gender',self.wwdUser.wwdUserDto.gender).then(function (dict) {
                    self.copyMyinfo.push('性别：' + dict.name)
                })
                self.copyMyinfo.push('家乡：' + self.wwdUser.userArea.homeProvinceName +' ' + self.wwdUser.userArea.homeCityName +' '+ self.wwdUser.userArea.homeDistrictName)
                self.copyMyinfo.push('目前在：' + self.wwdUser.userArea.nowProvinceName +' ' + self.wwdUser.userArea.nowCityName +' ' + self.wwdUser.userArea.nowDistrictName)
                self.copyMyinfo.push('出生日期：' + self.$utils.date.dateFomat(self.wwdUser.wwdUserDto.birthDay))
                self.$http.getDictByValue('married_status',self.wwdUser.wwdUserDto.maritalStatus).then(function (dict) {
                    self.copyMyinfo.push('婚姻状况：' + dict.name)
                })
                self.copyMyinfo.push('身高：' + self.wwdUser.wwdUserDto.height)
                self.copyMyinfo.push('体重：' + self.wwdUser.wwdUserDto.weight)
                self.$http.getDictByValue('education_level',self.wwdUser.wwdUserDto.education).then(function (dict) {
                    self.copyMyinfo.push('学历：' + dict.name)
                })
                self.$http.getDictByValue('has_hourse_status',self.wwdUser.wwdUserDto.hasHourse).then(function (dict) {
                    self.copyMyinfo.push('房：' + dict.name)
                })
                self.$http.getDictByValue('has_car_status',self.wwdUser.wwdUserDto.hasCar).then(function (dict) {
                    self.copyMyinfo.push('车：' + dict.name)
                })

                self.copyMyinfo.push('职业：' + self.wwdUser.wwdUserDto.profession)
                self.$http.getDictByValue('smoking_status',self.wwdUser.wwdUserDto.smoking).then(function (dict) {
                    self.copyMyinfo.push('抽烟：' + dict.name)
                })
                self.$http.getDictByValue('drinking_status',self.wwdUser.wwdUserDto.drinking).then(function (dict) {
                    self.copyMyinfo.push('喝酒：' + dict.name)
                })
				self.copyMyinfo.push('自我描述：' + self.wwdUser.wwdUserDto.description)
                self.copyMyinfo.push('理想类型：' + self.wwdUser.wwdUserDto.standard)

            },
            //加载详细基本信息，复制我的信息用
            loadWwdUserDto(){
                let self = this
                self.$http.get('/wwd/user/current').then(function (response) {
                    let content = response.data.data.content
                    self.wwdUser.wwdUserDto = content
                })
            },
            //加载区域，家乡和当前所在地，复制我的信息用
            loadArea(){
                let self = this
                self.$http.get('/wwd/user/current/area').then(function (response) {
                    let content = response.data.data.content
                    self.wwdUser.userArea = content
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
