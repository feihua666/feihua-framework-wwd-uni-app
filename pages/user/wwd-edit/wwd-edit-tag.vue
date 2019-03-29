<template>

	<view class=" fh-width-100 background-color">
		<view class="uni-list fh-width-100  background-color-after-none background-color-before-none">

			<view class="uni-list-cell-divider background-color-after-none background-color-before-none">
				标签信息
			</view>
			<view class="uni-list-cell" @tap="$utils.n.ngt('/pages/user/wwd-edit/tag-edit?type='+item.type + '&id=' + item.id)"
				  :class="{'uni-list-cell-last':index == tagsBind.length -1}"
				  hover-class="uni-list-cell-hover"
				  v-for="(item,index) in tagsBind">
				<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
					{{item.name}}
					<text >{{item.value}}</text>
					<template v-for="tag in tags" v-if="tag.type == item.type && tag.content">
						<view>
							<fh-dict-text style="margin-right: 3px;" v-for="dictValue in tag.content.split(',')" :type="tag.type + ''" :val="dictValue" text=""></fh-dict-text>
						</view>
					</template>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
    import fhDictText from '@/fh-components/fh-dict-text.vue';

    export default {
        components: {
            fhDictText
        },
		data() {
			return {
				tags:[],
				tagsBind:[
					{
					    type:'nature_type',
                        name:'性格'
					},
					{
					    type:'hobby_type',
                        name:'爱好'
                    },
					{
					    type:'food_type',
            			name:'美食'
					},
                    {
                        type:'movie_type',
            			name:'电影'
					},
                    {
                        type:'trip_type',
            			name:'旅行'
					},
                    {
                        type:'sport_type',
            			name:'运动'
                    }
				]
			};
		},
		computed:{
		},
		methods:{

            loadTags: function () {
                let self = this
                self.$http.get('/wwd/user/current/tags').then(function (res) {
                    let tagContent = res.data.data.content
                    self.tags = tagContent
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
		}
	}
</script>

<style>

</style>
