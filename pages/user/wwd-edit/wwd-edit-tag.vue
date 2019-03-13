<template>

	<view class="uni-list fh-width-100">

		<view class="uni-list-cell-divider">
			标签信息
		</view>
		<view class="uni-list-cell" @tap="$utils.ngt('/pages/user/wwd-edit/tag-edit?type='+item.type + '&id=' + item.id)" :class="{'uni-list-cell-last':index == tagsBind.length -1}" hover-class="uni-list-cell-hover" v-for="(item,index) in tagsBind">
			<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
				{{item.name}}
				<text >{{item.value}}</text>
			</view>
		</view>

	</view>
</template>

<script>

    export default {
        components: {
        },
		data() {
			return {
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
		},
		methods:{

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
            }
		},
		onLoad(){
			this.loadTags()
            this.$bus.$off('loadTags')
            this.$bus.$on('loadTags',(data) => {
                this.loadTags()
            });
		},
		watch:{
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
