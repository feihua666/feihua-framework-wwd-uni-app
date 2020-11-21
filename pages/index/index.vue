<template>
	<view class="fh-width-100 background-color">
		<!-- 固定在顶部的导航栏 -->
		<uni-nav-bar fixed="true" class="box-shadow-none" :left-container="false" :right-container="false">
			<view class="uni-flex fh-align-items-center fh-justify-content-center fh-height-100  fh-width-100">
				<view class="fh-search-view uni-flex fh-align-items-center" @tap="goSearch">
					<view class="uni-swiper-msg">
						<view class="uni-swiper-msg-icon  uni-flex fh-align-items-center"><uni-icon type="search" size="22" color="#666666"></uni-icon></view>
						<view v-if="searchForm.keyword">{{ searchForm.keyword }}</view>
						<swiper v-else vertical="true" autoplay="true" circular="true" interval="9000"><swiper-item class="font-size-sm">点击搜索</swiper-item></swiper>
					</view>
				</view>
			</view>
		</uni-nav-bar>
		<!-- 使用非原生导航栏后需要在页面顶部占位 -->
		<view style="height:50px;"></view>
		<view class="uni-padding-wrap" v-if="banners.length>0">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item, index) in banners" @tap="$utils.n.ngt(item.type=='页面'?('/pages/index/web-view?id=' + item.id):item.redirectUrl)" >
							<image
								lazy-load
								mode="aspectFill"
								style="height: 300px;"
								:src="$config.file.getDownloadUrl(item.titleUrl) + '?x-oss-process=image/resize,h_528/auto-orient,1'"
								class="image height100"
							></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<fh-loadmore ref="loadmoreref" class="background-color">
			<view
				style="margin-top:10px;"
				class="uni-card box-shadow-none"
				@tap="$utils.n.ngt('/pages/detail/detail?wwdUserId=' + item.wwdUserDto.id)"
				v-for="(item, index) in listData"
				:key="index"
			>
				<view class="uni-card-header uni-card-media">
					<image class="uni-card-media-logo" :src="$config.file.getDownloadUrl(photo[item.wwdUserDto.userId])"></image>
					<view class="uni-card-media-body fh-width-100">
						<view class="uni-card-media-text-top fh-width-100 uni-flex fh-justify-content-space-between">
							<text>
								<text class="iconfont" :class="$utils.genderIcon(item.wwdUserDto.gender)"></text>
								<text class="fh-inline-space-10"></text>
								{{ item.wwdUserDto.nickname }}
							</text>
							<text>
								<text style="font-size: 0.7em;color: #cccccc;" v-if="accessInfo[item.wwdUserDto.userId]">
									{{ accessInfo[item.wwdUserDto.userId].accessLasttimeText || '' }}来过
								</text>
							</text>
						</view>

						<text class="uni-card-media-text-bottom font-size-sm">
							<text class=" iconfont icon-weizhi"></text>
							<text class="fh-inline-space-10"></text>
							{{ item.wwdUserAreaDto.nowProvinceName }} {{ item.wwdUserAreaDto.nowCityName }}
							<text class="fh-inline-space-10"></text>
							<text class="iconfont icon-daxuemingcheng"></text>
							<text class="fh-inline-space-10"></text>
							{{ item.wwdUserDto.college }}
						</text>
					</view>
				</view>
				<view class="uni-card-content fh-image-view">
					<image
						lazy-load
						mode="aspectFill"
						v-for="(pic, i) in item.wwdUserPicDtos"
						v-if="pic.type == 'main'"
						:src="$config.file.getDownloadUrl(pic.picOriginUrl) + '?x-oss-process=image/resize,h_528/auto-orient,1'"
						class="image height100"
					></image>
				</view>
				<view class="uni-card-footer">
					<view class="font-size-sm">
						<text class=" iconfont icon-shengri"></text>
						<text class="fh-inline-space-10"></text>
						{{ $utils.date.dateFomat(item.wwdUserDto.birthDay) }}
					</view>
					<view class="font-size-sm">
						<text class="iconfont icon-shengao"></text>
						<text class="fh-inline-space-10"></text>
						{{ item.wwdUserDto.height }}
					</view>
					<text class="iconfont icon-tizhong fh-margin-right-30">
						<text class="fh-inline-space-10"></text>

						<text class=" font-size-sm">{{ item.wwdUserDto.weight }}</text>
					</text>
				</view>
			</view>
		</fh-loadmore>

		<fh-wx-share-h5 ref="fhwxshare" :share-content="shareContent"></fh-wx-share-h5>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar.vue';
import uniIcon from '@/components/uni-icon.vue';
import fhLoadmore from '@/fh-components/fh-loadmore.vue';
import fhDictText from '@/fh-components/fh-dict-text.vue';
import fhWxShareH5 from '@/fh-components/fh-wx-share-h5.vue';

export default {
	components: {
		uniNavBar,
		fhLoadmore,
		fhDictText,
		uniIcon,
		fhWxShareH5
	},
	computed: {
		shareContent() {
			let self = this;
			return {
				title: '这有一个脱单神器',
				desc: '可盐可甜的小姐姐，高薪帅气的小哥哥都在这等你来相遇！',
				imgUrl: self.$config.logo,
				type: '靠谱单身',
				contentId: self.$store.state.userinfo.id,
				contentName: self.$store.state.userinfo.nickname
			};
		}
	},
	data() {
		return {
			// 列表信息
			listData: [],
			//列表头像信息
			photo: {},
			accessInfo: {},
			searchForm: {
                pNum: 1,
                includePic: true,
                includeAccessInfo: true,
                keyword: '',
                gender: '',
                ageStart: '',
                ageEnd: '',
                education: '',
                homeProvinceId: '',
                homeCityId: '',
                homeDistrictId: '',
                nowProvinceId: '',
                nowCityId: '',
                nowDistrictId: ''
            },
			banners: [],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500
		};
	},
	onLoad() {
		console.log('onLoad index');
		this.loadBanners();
		this.initSearchForm();
	},
	onReady() {
		this.pageLogical();
	},
	onPullDownRefresh() {
		console.log('onPullDownRefresh');
		this.loadData(true);
	},
	onReachBottom() {
		this.loadData();
	},
	methods: {
		initSearchForm: function() {
			let self = this;
			self.$http.getCurrentUserinfo().then(function(content) {
				if (content) {
					if (content.gender == 'male') {
						self.searchForm.gender = 'female';
					} else if (content.gender == 'female') {
						self.searchForm.gender = 'male';
					}
				}
			});
		},
		loadBanners: function() {
			let self = this
			self.$http
				.get('/wwd/banners',{'status':'Y'})
				.then(function(res) {
					self.banners = res.data.data.content
				})
				.catch(function() {
					self.banners = []
				});
		},
		loadData: function(pullDownRefresh) {
			console.log('loaddata');
			let self = this;
			if (!this.$refs.loadmoreref) {
				return;
			}
			this.$refs.loadmoreref
				.loadData('/wwd/users', {
					pullDownRefresh: !!pullDownRefresh,
					data: self.searchForm
				})
				.then(function(res) {
					let content = res.data.data.content;
					self.searchForm.pNum = res.data.data.page.pageNo;
					if (pullDownRefresh) {
						self.listData = content;
					} else {
						self.listData = self.listData.concat(content);
					}
					for (let key in res.data.data.photo) {
						self.photo[key] = res.data.data.photo[key];
					}
					for (let key in res.data.data.accessInfo) {
						self.accessInfo[key] = res.data.data.accessInfo[key];
					}
				})
				.catch(function(res) {
					let status = res.statusCode;
					if (status == 404) {
						self.listData = [];
					}
				});
		},

		doSearch(data) {
			for (let key in data) {
				this.searchForm[key] = data[key] || '';
			}
			this.loadData(true);
		},
		goSearch() {
			this.$bus.$off('indexSearch');
			this.$bus.$on('indexSearch', data => {
				this.doSearch(data);
			});
			uni.navigateTo({
				url: '/pages/index/search?searchType=index&keyword=' + this.searchForm.keyword
			});
		},

		// 以下是页面跳转相关逻辑 ***************************
		pageLogical() {
			let self = this;
			//let splashShowed = this.$storageUtils.getSync('splashShowed')
			let splashShowed = true;
			// 先判断引导页是否需要展示，如果需要展示，展示引导页
			if (!splashShowed) {
				uni.reLaunch({
					url: '/pages/splash/splash'
				});
			} else {
				this.$http
					.hasLogin()
					.then(function() {
						// 已登录
						self.pageLogical_hasLogin();
					})
					.catch(function(res) {
						console.log(res);
						// 未登录
						if (self.$config.forcedLogin) {
							uni.reLaunch({
								url: '/pages/login/login'
							});
						}
					});
			}
		},
		pageLogical_hasLogin() {
			console.log('pageLogical_hasLogin');
			let self = this;
			self.$http.getCurrentUserinfo().then(function(userinfo) {
				// 已经登录，判断是否被邀请
				// 跳转到邀请页面
				if (uni.getStorageSync('invited' + userinfo.id)) {
					self.loadData(true);
					self.navigateToPage();
					return;
				}

				self.$http
					.get('/wwd/user/current/invited')
					.then(function(res) {
						// 有数据，已被邀请
						self.loadData(true);
						uni.setStorageSync('invited' + userinfo.id, true);
						self.navigateToPage();
					})
					.catch(function() {
						// 跳转到输入邀请码页面
						uni.reLaunch({
							url: '/pages/invitation/invitation'
						});
					});
			});
		},
		navigateToPage() {
			let page = uni.getStorageSync('navigateToPage');
			uni.removeStorageSync('navigateToPage');
			if (page) {
				this.$utils.n.ngt(page);
			}
		}
	},
	watch: {
		'searchForm.pNum'(val) {
			if (val == 1) {
				this.searchForm.orderable = false;
				this.searchForm.orderby = null;
			} else {
				this.searchForm.orderable = true;
				this.searchForm.orderby = 'update_at-desc';
			}
		}
	}
};
</script>

<style>
.fh-search-view {
	width: 50%;
	display: flex;
	background-color: #e7e7e7;
	height: 30px;
	border-radius: 15px;
	padding: 0 4%;
	flex-wrap: nowrap;
	margin: 7px 0;
	line-height: 30px;
}

.fh-image-view {
	height: 440upx;
	overflow: hidden;
}

.uni-card {
	box-shadow: 0 -2px 15px rgba(0, 0, 0, 0.3);
}
.image {
	width: 100%;
}

swiper {
	font-size: 16px;
}
.uni-padding-wrap{
	width: 97%;
	padding: 0 6px 0 6px;
}
.banner-image{
	width: 100%;
	height: 100%;
}
.swiper {
	height: 400upx;
}
.swiper-item {
	display: block;
	height: 400upx;
	line-height: 400upx;
	text-align: center;
}

.swiper-list {
	margin-top: 40upx;
	margin-bottom: 0;
}
</style>
