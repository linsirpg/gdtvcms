<template>
	<div class="layout">
		<div class="layout-header">
			<div class="logo">
				<router-link :to="{name: 'Home'}">{{logo}}</router-link>
			</div>
		</div>
		<div class="layout-nav">
			<layout-nav :data="navData"></layout-nav>
		</div>
		<div class="layout-container">
			<!-- <div class="layout-breadcrumb"></div> -->
			<div class="layout-content">
				<slot></slot>
			</div>
			<div class="layout-fooder"></div>
		</div>
	</div>
</template>

<script>

import Nav from './Nav.vue'

export default {
	name: 'LayoutDefault',
	computed: {
		logo: function () {
			return this.$store.state.logo;
		},
		navData: function () {
			return this.$store.state.navData;
		}
	},
	components: {
		'layout-nav': Nav
	}
}
</script>

<style lang="sass" scoped>

	$headerHeight: 60px;
	$navWidth: 200px;

	.layout-header,
	.layout-nav
		position: fixed
		z-index: 10
		left: 0
		box-sizing: border-box

	.layout-header
		top: 0
		width: 100%
		height: $headerHeight
		background-color: #23262e
		.logo
			display: inline-block
			height: $headerHeight
			line-height: $headerHeight
			color: #fff
			padding: 0 20px
			a
				color: #fff
				text-decoration: none
	
	.layout-container
		margin: $headerHeight 0 0 $navWidth

	.layout-breadcrumb
		height: 35px
		line-height: 35px
		background-color: #efefef
	
	.layout-nav
		top: $headerHeight
		width: $navWidth
		bottom: 0
		margin: auto
		background-color: #393d49
		overflow-y: auto
	.layout-content	
		padding: 15px

</style>