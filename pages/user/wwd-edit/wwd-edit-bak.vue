<template>

	<view class="uni-list fh-width-100">
		<view class="uni-list-cell-divider">
			我的图片
		</view>
		<view class="fh-padding-30">
			<fh-image-upload :images="images" :count="5" path="/wwd" :on-delete="deleteImage" :on-upload-success="onImageUpload"></fh-image-upload>
		</view>
		<view class="uni-list-cell-divider">
			基本信息
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				婚姻状况
				<text @tap="showDictPicker(form.wwdUser.maritalStatus,'married_status','maritalStatus')">{{$dictUtils.getLabelByValue('married_status',form.wwdUser.maritalStatus,'未填写')}}</text>
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
				<text @tap="showDictPicker(form.wwdUser.gender,'gender','gender')">{{$dictUtils.getLabelByValue('gender',form.wwdUser.gender,'未填写')}}</text>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				生日
				<picker mode="date" :value="$utils.dateFomat(form.wwdUser.birthDay) || '1990-01-01'" start="1960-01-01" :end="$utils.nowDate()" @change="onBirthdayChange">
					<text>{{$utils.dateFomat(form.wwdUser.birthDay) || '未填写'}}</text>
				</picker>

			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				星座
				<text @tap="showDictPicker(form.wwdUser.constellation,'constellation_type','constellation')">{{$dictUtils.getLabelByValue('constellation_type',form.wwdUser.constellation,'未填写')}}</text>
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
				<text @tap="showDictPicker(form.wwdUser.education,'education_level','education')">{{$dictUtils.getLabelByValue('education_level',form.wwdUser.education,'未填写')}}</text>
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
				<text @tap="showDictPicker(form.wwdUser.hasCar,'has_car_status','hasCar')">{{$dictUtils.getLabelByValue('has_car_status',form.wwdUser.hasCar,'未填写')}}</text>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				房
				<text @tap="showDictPicker(form.wwdUser.hasHourse,'has_hourse_status','hasHourse')">{{$dictUtils.getLabelByValue('has_hourse_status',form.wwdUser.hasHourse,'未填写')}}</text>

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
				<text @tap="showDictPicker(form.wwdUser.smoking,'smoking_status','smoking')">{{$dictUtils.getLabelByValue('smoking_status',form.wwdUser.smoking,'未填写')}}</text>
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate">
				喝酒
				<text @tap="showDictPicker(form.wwdUser.drinking,'drinking_status','drinking')">{{$dictUtils.getLabelByValue('drinking_status',form.wwdUser.drinking,'未填写')}}</text>
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
			标签信息
		</view>
		<view class="uni-list-cell" @tap="$utils.ngt('/pages/user/wwd-edit/tag-edit?type='+item.type + '&id=' + item.id)" :class="{'uni-list-cell-last':index == tagsBind.length -1}" hover-class="uni-list-cell-hover" v-for="(item,index) in tagsBind">
			<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
				{{item.name}}
				<text >{{item.value}}</text>
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
    export default {
        components: {
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
				wwdUserDictAttr:'',
				areaPickerType:'',
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
				},
				picData:[],
				tags:[],
				tagsBind:[
					{
					    type:'nature_type',
                        name:'性格',
						value:''
					},
					{
					    type:'hobby_type',
                        name:'爱好',
                        value:''
                    },
					{
					    type:'food_type',
            			name:'美食',
                        value:''
					},
                    {
                        type:'movie_type',
            			name:'电影',
                        value:''
					},
                    {
                        type:'trip_type',
            			name:'旅行',
                        value:''
					},
                    {
                        type:'sport_type',
            			name:'运动',
                        value:''
                    }
				]
			};
		},
		computed:{
            images(){
                let i = []
				for(let j=0;j<this.picData.length;j++){
				    i.push(this.picData[j].picOriginUrl)
				}
				return i
			}
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
            // 删除
            deleteImage(index){
                let self = this
                let picId = this.picData[index].id;
                this.$http.delete('/wwd/user/current/pic/' + picId,{
                    success:function(res) {
                        self.loadPicData()
                    }
                })
			},
            onImageUpload(res){
                let self = this
                var data = JSON.parse(res.data);
                let content = data.data.content
                // 更新图片
                self.$http.post('/wwd/user/current/pic',{
                    data:{
                        url:content.path,
                        type:'picItem',
                        sequence:self.picData.length + 1,
						t:new Date().getTime()
                    },
                    success:res => {
                        // 添加完成
                        self.loadPicData()
                    }
                })
			},
            loadPicData:function(){
                let self = this;
                //加载图片
                this.$http.get('/wwd/user/current/pic', {
                    data: { orderby: 'sequence' ,t:new Date().getTime()},
                    success: function (res) {
                        let content = res.data.data.content
                        self.picData = content
                    },
					fail:function () {
                        self.picData = []
                    }
                })
            },
			loadWwdUser(){
                let self = this
                self.$http.get('/wwd/user/current', {
                    success: res => {
                        let content = res.data.data.content
						self.form.wwdUser = content
                    }
                })
			},
            //加载区域，家乡和当前所在地
            loadArea(){
                let self = this
                self.$http.get('/wwd/user/current/area', {
                    success: function (response) {
                        let content = response.data.data.content
                        self.userArea = content
                    }
                })
            },
            loadTags: function () {
                let self = this
                self.$http.get('/wwd/user/current/tags', {
                    success: function (res) {
                        let tagContent = res.data.data.content
                        self.tags = tagContent
                    }
                })
            },
            tagName(type){
                let r = ''
                switch (type) {
                    case 'nature_type':
                        r = '性格'
                        break
                    case 'hobby_type':
                        r = '爱好'
                        break
                    case 'food_type':
                        r = '美食'
                        break
                    case 'movie_type':
                        r = '电影'
                        break
                    case 'trip_type':
                        r = '旅行'
                        break
                    case 'sport_type':
                        r = '运动'
                        break
                }
                return r
            },
			// 保存
			save(){
                //if (!this.checkForm()) return
                let self = this
                let data = this.form.wwdUser
                data.nowAreaIds = this.form.nowAreaIds
                data.homeAreaIds = this.form.homeAreaIds

				this.saveLoading = true
                this.$http.put('/wwd/user/current', {
                    data: data,
                    success: function (res) {
                        uni.showToast({
                            title: '保存成功',
                            icon:'none'
                        })
                        self.saveLoading = false
                    }
                })
			}
		},
		onLoad(){
            this.loadPicData()
            this.loadWwdUser()
			this.loadArea()
			this.loadTags()

            this.$bus.$off('loadTags')
            this.$bus.$on('loadTags',(data) => {
                this.loadTags()
            });
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
			},
            tags(){
                for(let i = 0;i<this.tags.length;i++){
                    for(let j = 0;j<this.tagsBind.length;j++){
                        if(this.tags[i].type == this.tagsBind[j].type){
                            this.tagsBind[j].value = this.$dictUtils.getLabelsByValues(this.tags[i].type,this.tags[i].content)
                            this.tagsBind[j].id = this.tags[i].id
							this.$set(this.tagsBind,j,this.tagsBind[j])
						}
					}
				}
			}
		}
	}
</script>

<style>

</style>
