<template>
	<view class="uni-flex uni-flex-item uni-column">
		<view class="fh-search-view uni-flex fh-width-100 fh-padding-30 fh-justify-content-space-between" >
			<view style="width:70%;">
				<input type="text" focus class="uni-input fh-padding-0"  placeholder="关键字" v-model="form.keyword" @confirm="doSearch"
					   placeholder-class="placeholder-class" confirm-type="search">
			</view>
			<view style="width:25%;" class="uni-link">
				<text style="margin-right: 10px;"  @tap="doSearch">搜索</text>
				<text  @tap="resetSearch">重置</text>
			</view>

		</view>
		<view class="fh-height-100">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate">
						性别
						<text @tap="showDictPicker(form.gender,'gender','gender')">{{$dictUtils.getLabelByValue('gender',form.gender,'不限')}}</text>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate">
						年龄
							<picker mode="date" :value="form.ageStart" start="1960-01-01" :end="$utils.nowDate()"   @change="onAgeStartChange">
								<text>{{form.ageStart || '不限'}}</text>
							</picker>
							-
							<picker mode="date" :value="form.ageEnd" start="1960-01-01" :end="$utils.nowDate()"   @change="onAgeEndChange">
								<text>{{form.ageEnd || '不限'}}</text>
							</picker>


					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate">
						学历
						<text @tap="showDictPicker(form.education,'education_level','education')">{{$dictUtils.getLabelByValue('education_level',form.education,'不限')}}</text>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate">
						目前在
						<text @tap="showAreaPicker(areaIds.now,'now')">{{areaLabel.now || '不限'}}</text>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate">
						家乡在
						<text @tap="showAreaPicker(areaIds.home,'home')">{{areaLabel.home || '不限'}}</text>
					</view>
				</view>
			</view>

			<view v-if="oldKeywordList.length>0">
				<view class="uni-flex fh-justify-content-space-between fh-padding-30">
					<text>历史搜索</text>
					<view>
						<uni-icon type="trash" @tap="oldDelete"></uni-icon>
					</view>
				</view>
				<view style="padding: 10px;">
					<view class="tag-view fh-width-100">
						<uni-tag size="small" style="overflow: hidden;margin:0 4px; "  v-for="key in oldKeywordList"  :text="keywordText(key)" @tap="keyworkRestore(key)"></uni-tag>
					</view>
				</view>
			</view>
		</view>
		<fh-dict-picker ref="fhDictPicker" :type="dictPicker.type" :value-default="dictPicker.valueDefault" @onConfirm="onDictPickerConfirm"></fh-dict-picker>
		<fh-area-picker ref="fhAreaPicker" @onConfirm="onAreaPickerConfirm" :picker-value-default="areaPicker.valueDefault"></fh-area-picker>
	</view>
</template>

<script>
    import uniTag from '@/components/uni-tag.vue'
    import UniIcon from "../../components/uni-icon";
    import fhDictPicker from '@/fh-components/fh-dict-picker.vue';
    import fhAreaPicker from '@/fh-components/fh-area-picker.vue';
    const keyPrefix = 'index'
    export default {
        components: {
            UniIcon,
            uniTag,
            fhDictPicker,
            fhAreaPicker
        },
	    computed:{
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
                formDictAttr:null,
                areaPicker:{
                	valueDefault:[]
            	},
            	areaPickerType:null,
                areaLabel:{
                    now:'',
                    home:''
                },
                areaIds:{
                    now:[],
					home:[]
				},
				form:{
                    keyword:'',
					gender:null,
					ageStart:'',
					ageEnd:'',
                    education:null,
                    homeProvinceId:null,
                    homeCityId:null,
                    homeDistrictId:null,
                    nowProvinceId:null,
                    nowCityId:null,
                    nowDistrictId:null
				},
                oldKeywordList:[],
				//上个页面的参数
				option:null
			};
		},
        onLoad(option) {

	        this.option = option
	        this.form.keyword = option.keyword
			this.form.isSearch = false

            this.loadOldKeyword();
        },
		methods:{
            showDictPicker(valueDefault,type,formDictAttr){
                this.formDictAttr = formDictAttr
                this.dictPicker.type = type
                // 先给空值触发变化
                this.dictPicker.valueDefault = null
                this.dictPicker.valueDefault = valueDefault

                this.$refs.fhDictPicker.show()
            },
            onDictPickerConfirm(obj){
                this.form[this.formDictAttr] = obj.value
            },
            onAreaPickerConfirm(obj){
                if('now' ==  this.areaPickerType){
                    this.areaLabel.now = obj.label.join(' ')
                    this.areaIds.now = obj.cityCode
					this.form.nowProvinceId = this.areaIds.now[0]
					this.form.nowCityId = this.areaIds.now[1]
					this.form.nowDistrictId = this.areaIds.now[2]
                }else if('home' ==  this.areaPickerType){
                    this.areaIds.home = obj.cityCode
                    this.areaLabel.home = obj.label.join(' ')
                    this.form.homeProvinceId = this.areaIds.home[0]
                    this.form.homeCityId = this.areaIds.home[1]
                    this.form.homeDistrictId = this.areaIds.home[2]
                }
            },
            showAreaPicker(valueDefault,type){
                this.areaPickerType = type
                this.areaPicker.valueDefault = valueDefault
                this.$refs.fhAreaPicker.show()
            },
            onAgeStartChange(e){
                console.log(e);
                this.form.ageStart = e.detail.value
				if(!this.form.ageEnd){
                    this.form.ageEnd = this.form.ageStart
				}
                //this.makeSureAgeStartGtAgeEnd()
            },
            onAgeEndChange(e){
                this.form.ageEnd = e.detail.value
                if(!this.form.ageStart){
                    this.form.ageStart = this.form.ageEnd
                }
				//this.makeSureAgeStartGtAgeEnd()
            },
			makeSureAgeStartGtAgeEnd(){
                if(this.form.ageStart && this.form.ageEnd){
                    if(this.form.ageStart > this.form.ageEnd){
                        let temp = this.form.ageStart
                        this.form.ageStart = this.form.ageEnd
                        this.form.ageEnd = temp
                    }
                }
			},
	        doSearch(){
	            // 执行
				let temp = {}
				temp.form = this.form
				temp.areaIds = this.areaIds
				temp.areaLabel= this.areaLabel
                this.saveKeyword(temp)

                this.$bus.$emit('indexSearch',this.form)
                uni.navigateBack({
                    delta: 1
                })
			},
            //加载历史搜索,自动读取本地Storage
            loadOldKeyword() {
                uni.getStorage({
                    key: keyPrefix + 'OldKeys',
                    success: (res) => {
                        let OldKeys = JSON.parse(res.data);
                        this.oldKeywordList = OldKeys;
                    }
                });
            },
            //清除历史搜索
            oldDelete() {
                uni.showModal({
                    content: '确定清除历史搜索记录？',
                    success: (res) => {
                        if (res.confirm) {
                            console.log('用户点击确定');
                            this.oldKeywordList = [];
                            uni.removeStorage({
                                key: keyPrefix + 'OldKeys'
                            });
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            //保存关键字到历史记录
            saveKeyword(keyword) {
                if(!this.keywordText(JSON.stringify(keyword))){
                    return
				}
                uni.getStorage({
                    key: keyPrefix + 'OldKeys',
                    success: (res) => {
                        let OldKeys = JSON.parse(res.data);
                        let findIndex = OldKeys.indexOf(JSON.stringify(keyword));
                        if (findIndex == -1) {
                            OldKeys.unshift(JSON.stringify(keyword));
                        } else {
                            OldKeys.splice(findIndex, 1);
                            OldKeys.unshift(JSON.stringify(keyword));
                        }
                        //最多10个纪录
                        OldKeys.length > 10 && OldKeys.pop();
                        uni.setStorage({
                            key: keyPrefix + 'OldKeys',
                            data: JSON.stringify(OldKeys)
                        });
                        this.oldKeywordList = OldKeys; //更新历史搜索
                    },
                    fail: (e) => {
                        let OldKeys = [JSON.stringify(keyword)];
                        uni.setStorage({
                            key: keyPrefix + 'OldKeys',
                            data: JSON.stringify(OldKeys)
                        });
                        this.oldKeywordList = OldKeys; //更新历史搜索
                    }
                });
            },
			keywordText(obj){
                obj = JSON.parse(obj);
                let r = '';

				r += (obj.form.keyword ||'')

				r += (this.$dictUtils.getLabelByValue('gender',obj.form.gender,''))

				if(obj.form.ageStart && obj.form.ageEnd){
                    r += (obj.form.ageStart + '-'+ obj.form.ageEnd)
                }

				r += (this.$dictUtils.getLabelByValue('education_level',obj.form.education,''))

				r += obj.areaLabel.now
				r += obj.areaLabel.home
                return r;
			},
            keyworkRestore(obj){
                obj = JSON.parse(obj);
                this.form = obj.form
				this.areaLabel = obj.areaLabel
				this.areaIds = obj.areaIds
			},
            resetSearch(){
                for(let key in this.form){
                    this.form[key] = ''
				}
                this.areaIds.now=[]
                this.areaIds.home=[]
                this.areaLabel.now=''
                this.areaLabel.home=''
			}
		}
	}
</script>

<style lang="scss">
.fh-search-view{
	background-color: $uni-bg-color-grey;
}
</style>
<style>

</style>
