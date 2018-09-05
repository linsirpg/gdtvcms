<template>
	<li v-if="data.child" v-auth-accesses="data.auth" :class="[`nav-parent-${parent}`, `nav-${parent}-${index}`, {'nav-open': open}]">
		<span @click="open=!open">{{data.title}}</span>
		<i class="more-icon"></i>
		<ul v-show="open">
			<nav-group 
				v-for="(item, itemIndex) in data.child" 
				:parent="`${parent}-${index}`" 
				:index="index" 
				:data="item" :key="itemIndex">
			</nav-group>
		</ul>
	</li>
	<li v-else v-auth-accesses="data.auth" :class="[`nav-parent-${parent}`, `nav-${parent}-${index}`]">
		<router-link :to="data.to">{{data.title}}</router-link>
	</li>
</template>

<script>


import store from '../../store'

export default {
	name: 'LayoutDefaultNavGroup',
	data() {
		return {
			open: false,
		}
	},
	props: {
		index: {
			type: Number,
			required: true
		},
		parent: {
			type: String,
			default: '0'
		},
		data: {
			type: Object,
			required: true
		}
	},
	beforeCreate: function() {
		this.$options.components['nav-group'] = require('./NavGroup.vue').default
	}
}
</script>

<style lang="sass" scoped>

li
	position: relative
	ul
		padding: 0
		margin: 0
		list-style-type: none
		padding-left: 20px
	a, span
		color: #cfcfcf
		display: block
		text-decoration: none
		height: 35px
		line-height: 35px
		text-overflow: ellipsis
		overflow: hidden
		white-space: nowrap
		background: #393d49
		padding: 0 20px
		cursor: pointer
		&:hover
			color: #fff
	.more-icon
		position: absolute
		top: 9px
		right: 10px
		font-size: 0
		width: 0
		height: 0
		line-height: 0
		content: ''
		border-style: dashed dashed solid
		border-color: transparent transparent #fff
		border-width: 6px
		overflow: hidden
		transition: all .2s
		font-style: normal
	&.nav-open
		> .more-icon
			top: 15px
			border-color: #fff transparent transparent
	&.nav-parent-0
		> a,
		> span
			height: 45px
			line-height: 45px
			background: #4E5465
		> .more-icon
			top: 14px
		&.nav-open
			> .more-icon
				top: 20px
	.router-link-active
		color: #fff


</style>