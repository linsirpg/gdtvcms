/*
* @Author: acer
* @Date:   2017-09-28 10:38:03
* @Last Modified by:   acer
* @Last Modified time: 2017-12-19 19:18:31
*/

import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		statisticsData:[],
		isShow: false,
		addproductInfo:null,
		addproductInfoflag:[false],
		name:"",
		recid:'',
		logo: 'CMS',
		show:true,
		floorGoodCount:0,
		floorGoodLimit:'10',
		floorGoodOffset:'0',
		specitalPorject:{
			recid:'',
			title:'',
			startTime:'',
			endTime:'',
			navigationConfig:[],
		},
		KIND:'',
		//专题楼层 单个
		floor:{
			Title:'',
		},
		Index:'',
		// 专题楼层商品
		floorGoods:[],
		Code:'',
		query:{
			id:null,
		},
		// 新添加的楼层的code
		floorCode:'',
	},
	getters: {
	},
	mutations: {
		getGoods:function(state,Id){
			let This = this;
			      axios.get('/server/GetSpecialSubject?RECID='+Id)
			      .then(function(res){
			      	// console.log(res.data)
			        state.specitalPorject = res.data
					// console.log(state.specitalPorject)
			})			
		},
		getCodeGoods:function(state,obj){
			let This = this
			 axios.get('/server/GetCodeGoodsPagination?offset='+state.floorGoodOffset+"&limit="+state.floorGoodLimit+'&code='+state.Code+'&title='+obj.title+"&Status="+obj.Status)
	            .then(function(res){  
			      	for(var i = 0; i <res.data.rows.length;i++){
			      		res.data.rows[i].Price = true
			      		if(res.data.rows[i].status == 1){
			      			res.data.rows[i].status = true
			      		}else{
			      			res.data.rows[i].status = false
			      		}
			      	}
	                state.floorGoods =res.data.rows;
	                state.floorGoodCount = res.data.count;
	                // console.log(111)
	           })			
		}
	},
	actions: {
		GetGoods:function({commit,dispatch},obj){
			commit('getGoods',obj.id)
		},
		GetCodeGoods:function({commit,dispatch},obj){
				commit("getCodeGoods",obj)		
		}
	},
});
export default store