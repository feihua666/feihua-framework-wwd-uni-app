<template>
		<view class="uni-list">
			<view class="uni-list-cell-divider"></view>
			<view class="uni-list-cell uni-list-cell-last uni-list-cell-pd">
				<view class="uni-list-cell-db">展示到列表</view>
				<switch :checked="showInList" @change="setShowInList"/>
			</view>
			<view class="uni-list-cell-divider"></view>
		</view>
</template>

<script>
	export default {
	    computed:{
		},
		data() {
			return {
                showInList:false,
                isverified:false,
                wwdUser:null
			};
		},
		onLoad(){
	        this.loadWwdUser()
		},
		methods:{
		    loadWwdUser(){
		        let self = this
                self.$http.get('/wwd/user/current',{
                    success: res => {
                        let content = res.data.data.content
                        self.wwdUser = content
                    }
                })
			},
            setShowInList:function(e){
                let self = this
                if (!this.isverified) {
                    this.showInList = false
                    uni.showToast({
						icon:'none',
                        title: '请先完善资料哦'
                    })
                    return
                }
                self.$http.put('/wwd/user/current/showinlist',{
                    data: {
                        showInList: self.showInList == true ? 'N' : 'Y'
                    },
                    fail: function (res){
                        let status = res.statusCode
                        if (status == 409 && self.data.showInList){
                            uni.showToast({
                                icon:'none',
                                title: '先完善资料才能开启哦'
                            })
                        }
                    }
                })
            }
		},
		watch:{
	        wwdUser(){
                this.showInList = this.wwdUser.showInList == 'Y'?true:false
                this.isverified = this.wwdUser.isverified == 'Y'?true:false
			}
		}
	}
</script>

<style>

</style>
