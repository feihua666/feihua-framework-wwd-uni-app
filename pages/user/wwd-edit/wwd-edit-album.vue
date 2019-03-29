<template>

	<view class="uni-list fh-width-100">
		<view class="uni-list-cell-divider background-color-after-none background-color-before-none">
			主图
		</view>
		<view class="fh-padding-30">
			<fh-image-upload :images="images.main" path="/wwd" item-style="width:100%;height:220px;" :on-delete="deleteImage" :on-upload-success="onImageUploadMain"></fh-image-upload>
		</view>
		<view class="uni-list-cell-divider background-color-after-none background-color-before-none">
			其它图片（8张）
		</view>
		<view class="fh-padding-30">
			<fh-image-upload :images="images.normal" :count="8" path="/wwd" :show-all-add="true" :on-delete="deleteImage" :on-upload-success="onImageUploadNormal"></fh-image-upload>
		</view>
	</view>
</template>

<script>
    import fhImageUpload from '@/fh-components/fh-image-upload.vue'
    export default {
        components: {
            fhImageUpload,
        },
		data() {
			return {
				picData:[]
			};
		},
		computed:{
            images(){
                let mainImages = []
                let normalImages = []
				for(let j=0;j<this.picData.length;j++){
				    let temp = {}
				    temp.id = this.picData[j].id
				    temp.thumbUrl = this.picData[j].picThumbUrl
				    temp.originUrl = this.picData[j].picOriginUrl
				    if('main' == this.picData[j].type){
                        mainImages.push(temp)
					}else{
                        normalImages.push(temp)
					}
				}
				return {main:mainImages,normal:normalImages}
			}
		},
		methods:{
            // 删除
            deleteImage(item){
                let self = this
                this.$http.delete('/wwd/user/current/pic/' + item.id).then(function(res) {
                    self.loadPicData()
                })
			},
			onImageUploadMain(res){
                this.onImageUpload(res,'main')
			},
			onImageUploadNormal(res){
                this.onImageUpload(res,'normal')
			},
            onImageUpload(res,type){
                let self = this
                var data = JSON.parse(res.data);
                let content = data.data.content
                // 更新图片
                self.$http.post('/wwd/user/current/pic',{
                    url:content.path,
                    type:type,
                    sequence:self.picData.length + 1,
                    t:new Date().getTime()
                }).then(res => {
                    // 添加完成
                    self.loadPicData()
                })
			},
            loadPicData:function(){
                let self = this;
                //加载图片
                this.$http.get('/wwd/user/current/pic', { orderby: 'create_at' ,t:new Date().getTime()}).then(function (res) {
                    let content = res.data.data.content
                    self.picData = content
                }).catch(function () {
                    self.picData = []
                })
            }
		},
		onLoad(){
            this.loadPicData()
		},
		watch:{
		}
	}
</script>

<style>

</style>
