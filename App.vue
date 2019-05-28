<script>
	export default {
		onLaunch: async function () {
            console.log('App Launch')
            let code = this.$utils.getUrlParam(null,'code')
            uni.setStorageSync('weixincode',code)
        },
		onShow: function () {
			console.log('App Show')
            let self = this
            this.$http.hasLogin().then(function () {
                self.$http.get('/wwd/user/current/invited').then(function (res) {
                    // 有数据，已被邀请
                }).catch(function (res) {
                    if (res && res.statusCode == 404) {
                        // 跳转到输入邀请码页面
                        uni.reLaunch({
                            url: '/pages/invitation/invitation'
                        });
                    }
                })
            }).catch(function () {
                let hash = window.location.hash
                if(hash && hash.substring(1).indexOf('/pages') == 0 && hash.substring(1) != '/pages/login/login'){
                    uni.setStorageSync('navigateToPage',hash.substring(1))
                    uni.reLaunch({
                        url:'/pages/index/index'
                    })
                }
            })
		},
		onHide: function () {
			console.log('App Hide')
		},
        methods:{
        },
        watch:{
        }
	}
</script>
<style lang="scss">

	/*每个页面公共css */
    /* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
    @import './uni.css';
    /* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/
    @import url('./iconfont.css');

    body,
        /* page 标签暂时不知道是哪里出现 todo */
    page {
        min-height: 100%;
        display: flex;
    }

    /* #ifdef MP-BAIDU */
    page {
        width: 100%;
        height: 100%;
        display: block;
    }

    /* swan 是百度 小程序的xml文件*/
    swan-template {
        width: 100%;
        min-height: 100%;
        display: flex;
    }
    /* #endif */

    button[size=mini][loading]:before{
        width:25upx !important;
        height:25upx !important;
    }

    .fh-padding-30{
        padding:30upx;
    }
    .fh-padding-right-30{
        padding-right:30upx;
    }
    .fh-padding-left-30{
        padding-left:30upx;
    }
    .fh-padding-top-30{
        padding-top:30upx;
    }
    .fh-padding-bottom-30{
        padding-bottom:30upx;
    }
    .fh-margin-right-30{
        margin-right:30upx;
    }
    .fh-margin-left-30{
        margin-left:30upx;
    }
    .fh-margin-top-30{
        margin-top:30upx;
    }
    .fh-margin-bottom-30{
        margin-bottom:30upx;
    }
    .fh-padding-0{
        padding:0;
    }
    .fh-justify-content-center{
        justify-content: center;
    }
    .fh-flex-wrap{
        flex-wrap: wrap;
    }
    .fh-align-items-center{
        align-items: center;
    }
    .fh-justify-content-space-between{
        justify-content:space-between;
    }
    .fh-height-100{
        height: 100%;
    }
    .fh-width-100{
        width: 100%;
    }
    .fh-text-align-right{
        text-align: right;
    }
    .fh-inline-space-5{
        display: inline-block;
        width: 5px;
    }
    .fh-inline-space-10{
        display: inline-block;
        width: 10px;
    }
    .fh-inline-space-15{
        display: inline-block;
        width: 15px;
    }


    .box-shadow-none{
        box-shadow: none !important;
    }
    .background-color, .uni-app--showtabbar uni-page-wrapper:after{
        background-color: #f8f8f8;
    }
    .background-color-before-none:before, .background-color-after-none:after{
        background-color: unset !important;
    }

    .uni-card-footer:before, .uni-card-header:after{
        background-color: rgba(227, 227, 227, 0.16);
    }


    .font-size-sm{
        font-size: 24upx;
    }
    .font-size-md{
        font-size: 28upx;
    }
    .font-size-lg{
        font-size: 40upx;
    }

    .view-line{
        width:100%;
        height: 2px;
        border: 0;
        background-color: #f8f8f8;
    }
    .view-line-height{
        line-height: 2;
    }
    /* activity-detail-content-img-width100 活动富文本内容图片专用 */
    .activity-detail-content-img-width100 img{
        max-width: 100% !important;
    }
</style>
