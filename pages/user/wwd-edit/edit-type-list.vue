<template>
    <view class="uni-column uni-flex uni-flex-item">
        <view class="uni-list">
            <view class="uni-list-cell-divider"></view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right"  @click="$utils.n.ngt('/pages/user/wwd-edit/wwd-edit-basic')">
                    基本信息
                </view>
            </view>

            <view class="uni-list-cell-divider">
            </view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right"  @click="$utils.n.ngt('/pages/user/wwd-edit/wwd-edit-album')">
                    相册
                </view>
            </view>

            <view class="uni-list-cell-divider"></view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right" @click="$utils.n.ngt('/pages/user/wwd-edit/wwd-edit-tag')">
                    标签信息
                </view>
            </view>

            <view class="uni-list-cell-divider"></view>
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
        },
        watch:{
        },
        onLoad(){
        }
    }
</script>

<style>

</style>
