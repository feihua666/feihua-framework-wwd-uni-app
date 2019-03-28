<template>
	<view class="fh-width-100">
		<view  v-if="cardinfo">
			<image class="fh-width-100" mode="widthFix" :src="imageUrl" @tap="$utils.pic.pvi(imageUrl)"></image>
		</view>
		<view class="uni-center" v-else>
			还没有卡片点击下方的按钮生成吧
		</view>
		<view class="fh-padding-30">
			<button type="primary" :loading="generateLoading" @tap="generate">{{cardinfo ? '重新': ''}}生成卡片</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			    generateLoading:false,
				cardinfo:null
			};
		},
		onLoad(){
		    this.loadData()
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
			// 生成卡片
			generate(){
                let self = this
                this.generateLoading = true
                this.$http.post('/wwd/user/generatecard').then(function (res) {
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
