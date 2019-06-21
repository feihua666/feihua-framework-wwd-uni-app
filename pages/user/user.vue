<template>
    <view class="uni-column uni-flex uni-flex-item background-color">
        <view class="uni-list  background-color-after-none background-color-before-none">
            <view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
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
            <view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right"  @click="$utils.n.ngt('/pages/user/wwd-edit/edit-type-list')">
                    编辑资料
                </view>
            </view>

            <view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
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
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
			    <view class="uni-list-cell-navigate uni-navigate-right"  @click="$utils.n.ngt('/pages/user/visit')">
			        谁看过我
					<uni-badge v-if="visit.nRead>0" :text="'+'+visit.nRead" type="danger"></uni-badge>
			    </view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
			    <view class="uni-list-cell-navigate uni-navigate-right"  @click="$utils.n.ngt('/pages/user/my-visit')">
			        我看过谁
			    </view>
			</view>
			<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
			    <view class="uni-list-cell-navigate uni-navigate-right" @click="$utils.n.ngt('/pages/user/participate/participate')">
			        我的活动
			    </view>
			</view>

            <view class="uni-list-cell-divider background-color-after-none background-color-before-none">
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

            <view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right" @click="$utils.n.ngt('/pages/enjoy/enjoy')">
                    有意思
                </view>
            </view>
            <template v-if="hasActivityManagePermission">
            <view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right" @click="$utils.n.ngt('/pages/enjoy/enjoy')">
                    活动管理
                </view>
            </view>
            </template>
            <view class="uni-list-cell-divider background-color-after-none background-color-before-none"></view>
            <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                <view class="uni-list-cell-navigate uni-navigate-right"  @click="$utils.n.ngt('/pages/setting/setting')">
                    设置
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
                inviteCode:null,
                userinfo: null,
				visit: {
					yRead:0,
					nRead:0
				},
                // 是否有活动管理功能权限
                hasActivityManagePermission: false
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
            },
			//加载访问统计
			loadVisitCount(){
				let self = this
				  this.$http.get('/wwd/user/visit/count').then(function (res) {
				    let content = res.data.data.content
				    self.visit = content
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
            this.$http.hasPermission('activityManage').then(function (res) {
                self.hasActivityManagePermission = true
            })
        },
		onShow(){
			this.loadVisitCount()
		}
    }
</script>

<style>
	.uni-list-cell-navigate text,.uni-badge{
		margin-right: 20px;
	}
</style>
