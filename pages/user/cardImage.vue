<template>
	<view class="fh-width-100">
		<view  v-if="cardinfo">
			<image class="fh-width-100" mode="widthFix" :src="imageUrl" @tap="$utils.pic.pvi(imageUrl)"></image>
		</view>
		<view class="uni-center" v-else>
			还没有卡片点击下方的按钮生成吧
		</view>
		<view class="uni-list fh-width-100" v-if="advance">
			<view class="uni-list-cell-divider background-color-after-none background-color-before-none">
				选择1张作为主图
			</view>
			<view class="fh-padding-30">
				<view class="uni-flex fh-flex-wrap">
					<view v-for="(item,index) in picData" @tap="mainSelect(item,index)"  :key="index" class="image-item-view" >
						<image class="fh-width-100 fh-height-100"
							   :src="$config.file.getDownloadUrl(item.picThumbUrl) + '?x-oss-process=image/resize,h_528/auto-orient,1'"
							   mode="aspectFill"></image>
						<view v-if="item.mainSelect" style="background-color: #fff;width:24px;height: 24px;border-radius:50%;position:absolute;left:3px;top:3px;">
							<text class="uni-icon uni-icon-checkmarkempty"></text>
						</view>

					</view>
				</view>
			</view>
			<view class="uni-list-cell-divider background-color-after-none background-color-before-none">
				选择3张作为副图
			</view>
			<view class="fh-padding-30">
				<view class="uni-flex fh-flex-wrap">
					<view v-for="(item,index) in picData" @tap="normalSelect(item,index)"  :key="index" class="image-item-view" >
						<image class="fh-width-100 fh-height-100"
							   :src="$config.file.getDownloadUrl(item.picThumbUrl) + '?x-oss-process=image/resize,h_528/auto-orient,1'"
							   mode="aspectFill"></image>
						<view v-if="item.normalSelect" style="background-color: #fff;width:24px;height: 24px;border-radius:50%;position:absolute;left:3px;top:3px;">
							<text class="uni-icon uni-icon-checkmarkempty"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-center">
			<text @tap="showAdvance" style="margin-bottom: 10px;color: #1e9eff">高级选项</text>
		</view>
		<view class="fh-padding-30">
			<button type="primary"  v-if="wwdUserId" :loading="generateLoading" @tap="generate">{{cardinfo ? '重新': ''}}生成卡片</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                picData:[],
			    advance: false,
			    generateLoading:false,
				cardinfo:null,
				wwdUserId: null
			};
		},
		onLoad(){
		    this.loadData()
		    this.loadWwdUser()
		},
		computed:{
		    imageUrl(){
		        return this.$config.file.getDownloadUrl(this.cardinfo.picOriginUrl)
			}
		},
		methods:{
		    loadData(){
		        let self = this
				this.$http.get('/wwd/user/current/card').then(function (res) {
                    let content = res.data.data.content
                    self.cardinfo = content
                })
			},
            loadWwdUser(){
                let self = this
                self.$http.get('/wwd/user/current').then( res => {
                    let content = res.data.data.content
					self.wwdUserId = content.id
                })
            },
			showAdvance () {
		        this.advance = !this.advance
				if (this.advance) {
				    this.loadPicData()
				}
			},
            mainSelect(item, index) {
		        for (let i = 0; i< this.picData.length; i++) {
                    this.picData[i].mainSelect = false
                    this.picData.splice(i,1,this.picData[i])
				}
                item.mainSelect = !this.picData[index].mainSelect
                this.picData.splice(index,1,item)
			},
            normalSelect(item, index) {
                item.normalSelect = !this.picData[index].normalSelect
                this.picData.splice(index,1,item)

		        let count = 0
                for (let i = 0; i< this.picData.length; i++) {
                    if (this.picData[i].normalSelect) {
                        count ++
					}
                }
                if (count > 3) {
                    item.normalSelect = !this.picData[index].normalSelect
                    this.picData.splice(index,1,item)
                    uni.showToast({
                        icon:'none',
                        title:'抱歉，目前最多支持3张哦'
                    })
				}

			},
            loadPicData:function(){
                let self = this;
                //加载图片
                this.$http.get('/wwd/user/current/pic', { orderby: 'create_at' ,t:new Date().getTime()}).then(function (res) {
                    let content = res.data.data.content
                    self.picData = content
                }).catch(function () {
                    self.picData = []
                    uni.showToast({
                        icon:'none',
                        title:'您的相册中还没有图片，快去上传吧'
                    })
                })
            },
			// 生成卡片
			generate(){
                let self = this
                this.generateLoading = true
                let mainSelect = []
                let normalSelect = []
                for (let i = 0; i< this.picData.length; i++) {
                    if (this.picData[i].mainSelect) {
                        mainSelect.push(this.picData[i].id)
                    }
                    if (this.picData[i].normalSelect) {
                        normalSelect.push(this.picData[i].id)
                    }
                }
				let p = {
                    sceneStr: 'card_wwdUserId_' + self.wwdUserId , // 前缀不能变后台有用到
					which: self.$config.which,
                    mainPicSelectedIds: mainSelect,
                    normalPicSelectedIds: normalSelect
				}

                this.$http.post('/wwd/user/generatecard',p).then(function (res) {
                    let content = res.data.data.content
                    self.cardinfo = content
                    self.generateLoading = false

                    uni.showToast({
                        icon:'none',
                        title:'卡片生成成功'
                    })
                }).catch(function (res) {
                    self.generateLoading = false

                    uni.showToast({
                        icon:'none',
                        title:'卡片生成失败，请确认信息是否完整!'
                    })
                })
            }
		}
	}
</script>

<style>
.image-item-view{
	margin: 10upx;
	display: inline-block;
	position: relative;
	width:150upx;
	height:150upx;
	background-color: #eee;
	cursor: pointer;
	color: #ddd;
}
</style>
