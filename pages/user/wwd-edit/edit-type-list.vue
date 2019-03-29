<template>
    <view class="uni-column uni-flex uni-flex-item  background-color">
        <view class="uni-list  background-color-after-none background-color-before-none">
            <view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right"  @click="$utils.n.ngt('/pages/user/wwd-edit/wwd-edit-basic')">
                    基本信息
                </view>
            </view>

            <view class="uni-list-cell-divider background-color-after-none background-color-before-none">
            </view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right"  @click="$utils.n.ngt('/pages/user/wwd-edit/wwd-edit-album')">
                    相册
                </view>
            </view>

            <view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right" @click="$utils.n.ngt('/pages/user/wwd-edit/wwd-edit-tag')">
                    标签信息
                </view>
            </view>
            <view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right" @click="goMyDetail">
                    我的资料详情页
                </view>
            </view>
            <view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
        </view>
    </view>
</template>

<script>
    import uniBadge from "@/components/uni-badge.vue";
    export default {
        components:{uniBadge},
        data () {
            return {
                inviteCode:null
            }
        },
        computed: {
        },
        methods: {
            goMyDetail () {
                let self = this
                self.$http.get('/wwd/user/current').then( res => {
                    let content = res.data.data.content
                    self.$utils.n.ngt('/pages/detail/detail?wwdUserId=' + content.id)
                })
            }
        },
        watch:{
        },
        onLoad(){
        }
    }
</script>

<style>

</style>
