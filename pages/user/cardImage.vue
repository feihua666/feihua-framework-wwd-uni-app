<template>
	<view class="fh-width-100">
		<view  v-if="cardinfo">
			<image class="fh-width-100" mode="widthFix" :src="imageUrl" @tap="$utils.pic.pvi(imageUrl)"></image>
		</view>
		<view class="uni-center" v-else>
			还没有卡片点击下方的按钮生成吧
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
			// 生成卡片
			generate(){
                let self = this
                this.generateLoading = true
				let p = {
                    sceneStr: 'card_wwdUserId_' + self.wwdUserId , // 前缀不能变后台有用到
					which: self.$config.which
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

</style>
