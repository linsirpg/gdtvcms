<template>
	<ul>
		<nav-group v-for="(item, index) in data" :index="index" :data="item" :key="index"></nav-group>
	</ul>
</template>

<script>

import NavGroup from './NavGroup.vue'

export default {
	name: 'LayoutDefaultNav',
	props: {
		data: {
			type: Array,
			required: true
		}
	},
	components: {
		'nav-group': NavGroup
	}
}
</script>

<style lang="sass" scoped>
	ul
		padding: 0
		margin: 0
		list-style-type: none

</style>