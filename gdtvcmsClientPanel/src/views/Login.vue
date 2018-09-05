<template>
	<div class="login">
		<el-form v-if="!isSuccess" :model="form" ref="form" label-width="60px" :rules="rules" class="form">
			<h3>LOGIN</h3>
			<el-form-item label="账号" prop="account">
				<el-input v-model="form.account"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="login">登陆</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'Login',
		name: 'Login',
		data: function() {
			return {
				isSuccess: false,
				rules: {
					"account": [
						{ required: true, message: '请输入账号', trigger: 'blur' },
					],
					"password": [
						{ required: true, message: '请输入密码', trigger: 'blur' },
					],
				},
				form: {
					account: 'admin',
					password: ''
				}
			};
		},
		computed: {
		},
		methods: {
			login: function () {
				let This = this;
				axios.post('/server/login',{username:This.form.account ,password:This.form.password}).then(function(res){
						// console.log(res)
					if(res.data.code == 0){
						This.$store.state.name = res.data.name
						This.open(res.data.mess)
						setTimeout(function(){
							This.$router.push('/home')
						},500)
					}else{
						This.open(res.data.mess)
					}
				})
			},
	      open(a) {
	        const h = this.$createElement;

	        this.$notify({
	          title: '登录提示',
	          message: h('i', { style: 'color: teal'}, a),
	           duration: 1000
	        });
	      },
		}
}
</script>
<style type="text/css">
	  .el-submenu .el-menu-item{
    min-width:10%;
  }
</style>
<style lang="sass" scoped>
	.login
		position: fixed
		left: 0
		top: 0
		width: 100%
		height: 100%
		overflow: auto
		background: #555 url('../assets/login/bg.jpg') no-repeat fixed top
		background-size: cover
		z-index: 2000
		form
			position: fixed
			top: 50%
			left: 50%
			width: 320px
			height: 230px
			margin-top: -165px
			border-radius: 5px
			margin-left: -160px
			z-index: 3000
			padding: 15px
			background-color: rgba(255,255,255,0.5)
			h3
				text-align: center
				color: #fff
</style>
