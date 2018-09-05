import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

import axios from 'axios'
const LoginPage = resolve => require(['@/views/Login'], resolve);
const ErrorPage = resolve => require(['@/views/Error'], resolve);
const HomePage = resolve => require(['@/views/home'], resolve);
const EditPage = resolve => require(['@/views/edit'], resolve);
const specialSubjectPage = resolve => require(['@/views/specialSubject'], resolve);
const FloorPage = resolve => require(['@/views/floor'], resolve);
const DataPage = resolve => require(['@/views/data'], resolve);
const DescribePage = resolve => require(['@/views/describe'], resolve);
const ProductTagPage = resolve => require(['@/views/productTag1'], resolve);
const ArticleTagPage = resolve => require(['@/views/article'], resolve);
const ProductinfoTagPage = resolve => require(['@/views/productinfo'], resolve);
const ProductList = resolve => require(['@/views/productList'], resolve);
const shophome = resolve => require(['@/views/shophome'], resolve);
const statistics = resolve => require(['@/views/statistics'], resolve);statistics

const shophomecatetory = resolve => require(['@/views/shophomecatetory'], resolve);

const shophomeproduct = resolve => require(['@/views/shophomeproduct'], resolve);

// const shophomeproduct = resolve => require(['@/views/shophomeproduct'], resolve);

const pageview = resolve => require(['@/components/statistics/ClickView'], resolve);
const HomeBanner = resolve => require(['@/components/statistics/HomeBanner'], resolve);
const hotsale = resolve => require(['@/components/statistics/hotsale'], resolve);
const Preset = resolve => require(['@/views/Preset'], resolve);
Vue.use(Router)

const router = new Router({
	routes: [
		{
			name: 'Login',
			path: '/Login',
			component: LoginPage,
			meta: { title: '登陆' },
		},{
			name: 'Error',
			path: '/Error',
			component: ErrorPage,
			meta: { title: '错误' },
		},{
			path:'/home',
			name:'Home',
			component:HomePage,
			meta:{title:"专场"}
		},{
			path:"/edit/:id?",
			component:EditPage,
			children:[
				{
					path:'',
					name:"scsp",
					component:specialSubjectPage,
					meta:{title:"专场"}
				}
			]
		},
		{
			path:'/describe',
			name:'DescribePage',
			component:DescribePage, 
			meta:{title:"产品标签"}
		},
		{
			path:'/PdTag/:id?',
			name:'ProductTagPage',
			component:ProductTagPage,
			meta:{title:"产品标签"}
		},
		{
			path:'/article',
			name:'ArticleTagPage',
			component:ArticleTagPage,
			meta:{title:"文章列表"}
		},		
		{
			path:'/ProductList',
			name:'ProductList',
			component:ProductList,
			meta:{title:"产品列表"}
		},
		{
			path:'/preset',
			name:'Preset',
			component:Preset,
			meta:{title:"产品预设"}
		},
		{
			path:'/ProductInfo/:id?',
			name:'ProductinfoTagPage',
			component:ProductinfoTagPage,
			meta:{title:"文章列表"}

		},	
		{
			path:'/shophome/:id?',
			name:'shophome',
			component:shophome,
			meta:{title:"商城首页"}

		},	
		{
			path:'/shophomeproduct/:id?',
			name:'shophomeproduct',
			component:shophomeproduct,
			meta:{title:"商城首页"}

		},
		{
			path:'/shophomecatetory/:id?',
			name:'shophomecatetory',
			component:shophomecatetory,
			meta:{title:"商城首页"}

		},
		{
			path:'/statistics',
			name:'statistics',
			component:statistics,
			meta:{title:"数据统计"},
			children: [
				{
					path: 'pageview',
          			component: pageview
				},
				{
					path: 'HomeBanner',
          			component: HomeBanner
				},
				{
					path: 'HotSale',
          			component: hotsale
				}								
			]
		},
		{
			path: '*',
			redirect: '/home'
		},

	]
});

router.beforeEach((to, from, next) => {
	if (to.name != 'Login') {
		this.a.app.$store.state.isShow = true
	}else{
		this.a.app.$store.state.isShow = false
	}
	var This = this
	axios.get('/server/getCookie').then(function(res){
		document.title = to.meta.title
		if(to.name == 'Login'){
			next()
		}else{
			if(res.data.Code == '1'){
				This.a.app.$store.state.name = res.data.name
				next()
			}else{
				next('/Login')
			}			
		}

	})
})

export default router;