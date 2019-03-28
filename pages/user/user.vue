<template>
    <view class="uni-column uni-flex uni-flex-item">
        <view class="uni-list">
            <view class="uni-list-cell-divider"></view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right"   @click="$utils.n.ngt('/pages/user/userinfo')">
                        <view class="uni-media-list-logo">
                            <image v-if="userinfo && userinfo.photo" :src="$config.file.getDownloadUrl(userinfo.photo)"></image>
                        </view>
                        <view class="uni-media-list-body" v-if="userinfo">
                            <view class="uni-media-list-text-top">{{userinfo.nickname}}</view>
                            <view class="uni-media-list-text-bottom uni-ellipsis">{{userinfo.account}}</view>
                        </view>
                </view>
            </view>
            <view class="uni-list-cell-divider"></view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right"  @click="$utils.n.ngt('/pages/user/wwd-edit/edit-type-list')">
                    编辑资料
                </view>
            </view>

            <view class="uni-list-cell-divider"></view>
            <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate" @tap="$utils.copy(inviteCode)">
                    我的邀请码
                    <text>{{inviteCode}}</text>
                </view>
            </view>
            <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right"  @click="$utils.n.ngt('/pages/user/invitedFriends')">
                    我邀请的朋友
                </view>
            </view>
			<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
			    <view class="uni-list-cell-navigate uni-navigate-right" @click="$utils.n.ngt('/pages/participate/participate')">
			        我的活动
			    </view>
			</view>

            <view class="uni-list-cell-divider">
            </view>
            <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right" @click="$utils.n.ngt('/pages/user/cardImage')">
                    我的卡片
                </view>
            </view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right"  @click="$utils.n.ngt('/pages/user/textInfo')">
                    复制我的信息
                </view>
            </view>

            <view class="uni-list-cell-divider"></view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right" @click="$utils.n.ngt('/pages/enjoy/enjoy')">
                    有意思
                </view>
            </view>
            <view class="uni-list-cell-divider"></view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right"  @click="$utils.n.ngt('/pages/setting/setting')">
                    设置
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
                inviteCode:null,
                userinfo: null
            }
        },
        computed: {
        },
        methods: {
            // 加载邀请码
            loadInviteCode(){
                let self = this
                //获取邀请码
                this.$http.get('/wwd/user/current/invitation').then(function (res) {
                    let content = res.data.data.content
                    self.inviteCode = content[0].code
                })
            }
        },
        watch:{
        },
        onLoad(){
            let self = this
            self.$http.getCurrentUserinfo().then(function (content) {
                self.userinfo = content
            })
            this.loadInviteCode()
        }
    }
</script>

<style>

</style>
