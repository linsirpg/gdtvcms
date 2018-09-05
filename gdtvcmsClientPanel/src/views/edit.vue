<template>
	<div class='edit'>
<!-- 		<router-link :to="{name:'scsp'}">专题</router-link>
		<router-link :to="{name:'floor'}">楼层</router-link>
		<router-link :to="{name:'data'}">商品</router-link> -->
	    <transition name="fade" mode="out-in">
	      <router-view></router-view>
	    </transition>
<!-- 		<el-card class="box-card Esteps" style='width:80%;margin:0 auto;' >
			<el-steps :active="active" finish-status="success">
			  	<el-step title="楼层" @click='show()'></el-step>
			  	<el-step title="专题"></el-step>
			  	<el-step title="数据"></el-step>
			</el-steps>
		</el-card> -->
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
	export default{
		created(){
		},
		methods:{

		},
		data(){
			return{
				active:0,
			}
		}
	}
</script>
<style type="text/css">
	.Esteps{
		position:fixed;
		bottom:0;
		left:15%;
	}
	.content{
		z-index:-10;
	}
		.el-submenu .el-menu-item{
		min-width:10%;
	}
</style>