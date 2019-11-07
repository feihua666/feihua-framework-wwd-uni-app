<template>
	<view>
		<web-view :src="redirectUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				redirectUrl: ''
			}
		},
		onLoad(option) {
			this.loadBanner(option.id)
		},
		methods: {
			loadBanner: function(id) {
				let self = this
				self.$http.get('/wwd/banner/'+ id).then(function(res) {
						self.redirectUrl = res.data.data.content.redirectUrl
					});
			}
		}
	}
</script>

<style>

</style>
