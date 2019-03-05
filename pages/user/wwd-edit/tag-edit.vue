<template>
	<fh-dict-checkbox-group @onChange="checkboxChange" :type="type" :max="5" :value-default="tagSelected"></fh-dict-checkbox-group>
</template>

<script>
    import fhDictCheckboxGroup from '@/fh-components/fh-dict-checkbox-group.vue';

    export default {
        components: {
            fhDictCheckboxGroup
        },
		data() {
			return {
			    tagList:[],
                tagSelected:[], //已选择的
                tagSelf:null,    //自定义的
                addOrUpdate:null,
                isUpdateChange:false, //标记是否有修改
			    type:null,
				id:null
			};
		},
        onBackPress() {
            let self = this
			self.save(function () {
                self.$bus.$emit('loadTags');
            })
        },
		methods:{
            checkboxChange(obj){
		        this.isUpdateChange = true
		        this.tagSelected = obj.values
			},
		    loadTags(){
                // 加载标签
				let self = this
                this.$http.get('/wwd/user/current/tag/' + self.type,{
                    success: function(res) {
                        let _content = res.data.data.content
                        let selected = []
                        if (_content.content){
                            selected = _content.content.split(',')
                        }
                            self.tagSelf = _content.selfContent
                            self.tagSelected = selected
                    }
                })
			},
            // 保存
            save:function(success){
                let self = this
                let arrayStr = this.tagSelected.join(',')
                let data = {
                    content: arrayStr,
                    selfContent: self.tagSelf
                }
                if (self.isUpdateChange){
                    if (!this.id){
                        self.$http.post('/wwd/user/current/tag/' + self.type, {
                            data:data,
                            success: success
                        })
                    } else if (!!this.id) {
						self.$http.put('/wwd/user/current/tag/' + self.type, {
							data: data,
							success: success
						})
                    }
                }

            }
		},
		onLoad(options){
		    this.type = options.type
		    this.id = options.id
			this.tagList = this.$dictUtils.getDictByType(this.type)
			this.loadTags()
		}
	}
</script>

<style>

</style>
