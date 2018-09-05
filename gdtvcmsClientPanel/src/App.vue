<template>
	<div class='div'>
		<NavHeader ></NavHeader>
		<div class='content'>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import NavHeader from '@/components/NavHeader'

export default {

	name: 'app',
	components: {
		NavHeader,
	},
}
</script>

<style >
	body{
		margin:0;
	}
	html{
	}
	.content{
		top:60px;
		position:absolute;
		left:11%;
		margin:0 auto;
		z-index:-1;
		width:88%;
		box-sizing:border-box;
	}
	.div{
		width:90%;
		height:auto;
		overflow:hidden;
	}
	.el-submenu .el-menu-item{
		min-width:10%;
	}
</style>
