<template>

	<view class="uni-list fh-width-100">
		<view class="uni-list-cell-divider">
			基本信息
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				婚姻状况
				<view @tap="showDictPicker(form.wwdUser.maritalStatus,'married_status','maritalStatus')">
					<fh-dict-text :type="'married_status'" :val="form.wwdUser.maritalStatus" text="未填写"></fh-dict-text>
				</view>

			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				微信号
				<input class="fh-text-align-right" v-model="form.wwdUser.wechatNumber" placeholder="未填写"/>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				姓名
				<input class="fh-text-align-right" v-model="form.wwdUser.name" placeholder="未填写"/>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				性别
				<view v-if="form.wwdUser.gender =='male' || form.wwdUser.gender =='female' ">
					<fh-dict-text :type="'gender'" :val="form.wwdUser.gender" text="未填写"></fh-dict-text>
				</view>
				<view v-else @tap="showDictPicker(form.wwdUser.gender,'gender','gender')">
					<fh-dict-text :type="'gender'" :val="form.wwdUser.gender" text="未填写"></fh-dict-text>
				</view>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				生日
				<picker mode="date" :value="$utils.date.dateFomat(form.wwdUser.birthDay) || '1990-01-01'" start="1960-01-01" :end="$utils.date.nowDate()" @change="onBirthdayChange">
					<text>{{$utils.date.dateFomat(form.wwdUser.birthDay) || '未填写'}}</text>
				</picker>

			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				星座
				<view @tap="showDictPicker(form.wwdUser.constellation,'constellation_type','constellation')">
					<fh-dict-text :type="'constellation_type'" :val="form.wwdUser.constellation" text="未填写"></fh-dict-text>
				</view>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				学校
				<input class="fh-text-align-right" v-model="form.wwdUser.college" placeholder="未填写"/>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				专业
				<input class="fh-text-align-right" v-model="form.wwdUser.major" placeholder="未填写"/>

			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				学历
				<view @tap="showDictPicker(form.wwdUser.education,'education_level','education')">
					<fh-dict-text :type="'education_level'" :val="form.wwdUser.education" text="未填写"></fh-dict-text>
				</view>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				职业
				<input class="fh-text-align-right" v-model="form.wwdUser.profession" placeholder="未填写"/>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				车
				<view @tap="showDictPicker(form.wwdUser.hasCar,'has_car_status','hasCar')">
					<fh-dict-text :type="'has_car_status'" :val="form.wwdUser.hasCar" text="未填写"></fh-dict-text>
				</view>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				房
				<view @tap="showDictPicker(form.wwdUser.hasHourse,'has_hourse_status','hasHourse')">
					<fh-dict-text :type="'has_hourse_status'" :val="form.wwdUser.hasHourse" text="未填写"></fh-dict-text>
				</view>

			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				月薪
				<input class="fh-text-align-right" v-model="form.wwdUser.monthSalary" placeholder="未填写"/>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				年薪
				<input class="fh-text-align-right" v-model="form.wwdUser.yearSalary" placeholder="未填写"/>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				身高
				<input class="fh-text-align-right" v-model="form.wwdUser.height" placeholder="未填写"/>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				体重
				<input class="fh-text-align-right" v-model="form.wwdUser.weight" placeholder="未填写"/>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				抽烟
				<view @tap="showDictPicker(form.wwdUser.smoking,'smoking_status','smoking')">
					<fh-dict-text :type="'smoking_status'" :val="form.wwdUser.smoking" text="未填写"></fh-dict-text>
				</view>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				喝酒
				<view @tap="showDictPicker(form.wwdUser.drinking,'drinking_status','drinking')">
					<fh-dict-text :type="'drinking_status'" :val="form.wwdUser.drinking" text="未填写"></fh-dict-text>
				</view>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				目前在
				<text @tap="showAreaPicker(form.nowAreaIds,'now')">{{userAreaLabel.now}}</text>
			</view>
		</view>
		<view class="uni-list-cell uni-list-cell-last">
			<view class="uni-list-cell-navigate">
				家乡在
				<text @tap="showAreaPicker(form.homeAreaIds,'home')">{{userAreaLabel.home}}</text>
			</view>
		</view>

		<view class="uni-list-cell-divider">
			个人介绍
		</view>
		<view class="uni-list-cell">
			<textarea auto-height v-model="form.wwdUser.description" placeholder="未填写"/>

		</view>
		<view class="uni-list-cell-divider">
			择偶标准
		</view>
		<view class="uni-list-cell">
			<textarea auto-height v-model="form.wwdUser.standard" placeholder="未填写"/>
		</view>
		<view class="fh-padding-30">
			<button type="primary" @tap="save" :loading="saveLoading">保存</button>
		</view>
		<fh-dict-picker ref="fhDictPicker" :type="dictPicker.type" :value-default="dictPicker.valueDefault" @onConfirm="onDictPickerConfirm"></fh-dict-picker>
		<fh-area-picker ref="fhAreaPicker" @onConfirm="onAreaPickerConfirm" :picker-value-default="areaPicker.valueDefault"></fh-area-picker>
	</view>
</template>

<script>
    import fhImageUpload from '@/fh-components/fh-image-upload.vue'
    import fhDictPicker from '@/fh-components/fh-dict-picker.vue';
    import fhAreaPicker from '@/fh-components/fh-area-picker.vue';
    import ChatInput from "../../../components/im-chat/chatinput";
    import fhDictText from '@/fh-components/fh-dict-text.vue';

    export default {
        components: {
            fhDictText,
            ChatInput,
            fhImageUpload,
            fhDictPicker,
            fhAreaPicker
        },
		data() {
			return {
				dictPicker:{
                    type:null,
                    valueDefault:null
				},
				areaPicker:{
                    valueDefault:[]
				},
                areaPickerType:'',
                wwdUserDictAttr:'',
				saveLoading:false,
				form:{
                    wwdUser:{},
                    nowAreaIds:[],
                    homeAreaIds:[]
				},
				userArea:{},
                userAreaLabel:{
                    now:'',
                    home:''
				}
			};
		},
		computed:{
		},
		methods:{
            // showdictpicker
			showDictPicker(valueDefault,type,wwdUserDictAttr){
                this.wwdUserDictAttr = wwdUserDictAttr
				this.dictPicker.type = type
				// 先给空值触发变化
				this.dictPicker.valueDefault = null
				this.dictPicker.valueDefault = valueDefault

                this.$refs.fhDictPicker.show()
			},
            onDictPickerConfirm(obj){
                this.form.wwdUser[this.wwdUserDictAttr] = obj.value
            },
			onBirthdayChange(e){
                this.form.wwdUser.birthDay = e.detail.value
			},
            onAreaPickerConfirm(obj){
                if('now' ==  this.areaPickerType){
                    this.userAreaLabel.now = obj.label.join(' ')
                    this.form.nowAreaIds = obj.cityCode
				}else if('home' ==  this.areaPickerType){
                    this.form.homeAreaIds = obj.cityCode
                    this.userAreaLabel.home = obj.label.join(' ')
                }
			},
			showAreaPicker(valueDefault,type){
                this.areaPickerType = type
                this.areaPicker.valueDefault = valueDefault
                this.$refs.fhAreaPicker.show()
			},

			loadWwdUser(){
                let self = this
                self.$http.get('/wwd/user/current').then( res => {
                    let content = res.data.data.content
                    self.form.wwdUser = content
                })
			},
            //加载区域，家乡和当前所在地
            loadArea(){
                let self = this
                self.$http.get('/wwd/user/current/area').then(function (response) {
                    let content = response.data.data.content
                    self.userArea = content
                })
            },
			// 保存
			save(){
                //if (!this.checkForm()) return
                let self = this
                let data = this.form.wwdUser
                data.nowAreaIds = this.form.nowAreaIds
                data.homeAreaIds = this.form.homeAreaIds

				this.saveLoading = true
                this.$http.put('/wwd/user/current',data).then(function (res) {
                    uni.showToast({
                        title: '保存成功',
                        icon:'none'
                    })
                    self.saveLoading = false
                })
			}
		},
		onLoad(){
            this.loadWwdUser()
			this.loadArea()
		},
		watch:{
            userArea(){
                this.userAreaLabel.now = `${this.userArea.nowProvinceName} ${this.userArea.nowCityName} ${this.userArea.nowDistrictName}`;
                this.userAreaLabel.home = `${this.userArea.homeProvinceName} ${this.userArea.homeCityName} ${this.userArea.homeDistrictName}`;
                let nowIds = [];
                nowIds[0] = this.userArea.nowProvinceId
                nowIds[1] = this.userArea.nowCityId
                nowIds[2] = this.userArea.nowDistrictId
                this.form.nowAreaIds = nowIds
                let homeIds = []
                homeIds[0] = this.userArea.homeProvinceId
                homeIds[1] = this.userArea.homeCityId
                homeIds[2] = this.userArea.homeDistrictId
                this.form.homeAreaIds = homeIds
			}
		}
	}
</script>

<style>

</style>
