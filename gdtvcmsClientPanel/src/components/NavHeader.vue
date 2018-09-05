<template >
	<div class='container'  v-if = "isShow">
		<div class='NavTop'>
			<div style='float:left;'>后台管理</div>
			<div style='float:right;position:relative;'>
				<el-dropdown @command="handleCommand" trigger="click">
				  <el-button type="button"  style='background:#23262e;border:none;color:white;'>
				    {{name}}
				  </el-button>
				  <el-dropdown-menu slot="dropdown"   >
				    <el-dropdown-item  command="b">退出</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>

		</div>

		<div class='NavList'>
			<el-row class="tac">
			  <el-col :span="24">
    <el-menu :default-openeds="['1']"  background-color="#545c64"
			      text-color="#fff">
      <el-submenu index = '1' >
        <template slot="title"><i class="el-icon-menu"></i>CMS</template>
			  	<el-menu-item index = '1'  >
			        
			    	<router-link tag='div' to='/home'  slot="title"><span>专场</span></router-link>
			    </el-menu-item>
			      <el-menu-item index = '2' >
			        
			        <router-link tag='div' to='/describe' slot="title"><span>产品标签</span></router-link>
			      </el-menu-item>			    
	      <el-menu-item index = '3' >
	        	<router-link tag='div' to='/article' slot="title"><span>文章列表</span></router-link>
	      </el-menu-item>
	      <!-- <el-menu-item index = '4' > -->
	        	<!-- <router-link tag='div' to='/ProductList' slot="title"><span>产品列表</span></router-link> -->
	      <!-- </el-menu-item>			 -->
	      <el-menu-item index = '5' >
	        	<router-link tag='div' to='/preset' slot="title"><span>产品预设</span></router-link>
	      </el-menu-item>		
	      <el-menu-item index = '6' >
	        	<router-link tag='div' to='/shophome' slot="title"><span>商城首页</span></router-link>
	      </el-menu-item>	
	      <el-menu-item index = '7' >
	        	<router-link tag='div' to='/statistics' slot="title"><span>数据统计</span></router-link>
	      </el-menu-item>			  					
      </el-submenu>
    </el-menu>
			  </el-col>
			</el-row>			
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
	export default{
		data(){
			return {
				index:1,
				isShow: false
			}
		},
		watch: {
			show () {
				
			}
		},
		computed:{
			name:function(){
				return this.$store.state.name
			},
			show:function () {
				this.isShow = this.$store.state.isShow
				return this.$store.state.isShow
			}			
		},
		methods:{
      handleCommand(command) {
				var This = this;
				this.isShow = this.$store.state.isShow = false
        	axios.get('/server/logout').then(function(){
        		This.$router.push({name:'Login'})
        	})
     	 }
		}
	}
</script>
<style type="text/css">
	.NavTop{
		height:60px;
		width:100%;
		background-color:#23262e;
		position:fixed;
		top:0;
	}
	.NavList{
		position:fixed;
		left:0;
		width:10%;
		/* height:; */
		top:60px;
		bottom:0;
		background-color:#393d49;
		overflow:hidden;
	}
	.NavTop div{
		height:60px;
		width:100px;
		font-size:16px;
		color:white;
		text-align:center;
		line-height:60px;
	}
	.el-button--primary{
		/*background:#23262e;*/
		border:none;
		color:white;
	}
	.container{
		overflow:hidden;
		margin:0;
		padding:0;
		width:100%;
	}
	.container{
		overflow:hidden;
	}
	.el-col ul{
		border:0;
	}
	.el-submenu .el-menu-item{
		min-width:10%;
	}
</style>