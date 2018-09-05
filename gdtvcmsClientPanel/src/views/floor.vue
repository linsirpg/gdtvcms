<template>
	<div style="padding-top:35px;" id='floor'>
<el-form class="demo-table-expand fl" inline  :model="floor" >
  <el-form-item label='楼层标题' props = 'Title' class='fl' style='width:100%;text-align:center;'>
       <el-input v-model="floor.Title" ></el-input>
  </el-form-item>
  <el-form-item label='楼层模板' props = 'value1' class='fl' style='width:100%;text-align:center;'>
	  	<el-select v-model="value1" placeholder="请选择活动区域" style='float:left;'>
	      <el-option label="水平模板" value="0"></el-option>
	      <el-option label="垂直模板" value="1"></el-option>
	    </el-select>
  </el-form-item>
  <el-form-item label='楼层图片' props = 'endTime'  style='width:100%;text-align:center;'>
    <template>
      <el-upload class="upload-demo" ref="upload" action="/server/file" :on-success='handleSuccess' :file-list="fileList" list-type="picture">
        <el-button size="small" type="primary" style='float:left;'>点击上传</el-button>
        <div slot="tip" class="el-upload__tip"  style='float:left;'>只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </template>
  </el-form-item>
   <el-form-item  props = 'endTime'  style='width:100%;text-align:right;' v-show='DataShow'>
   		<div style='width:100%;' id="seach">
			<el-form >	
			  <el-form-item >
			  	<el-input v-model="SelectData" placeholder='标题搜索'></el-input>
			  </el-form-item>
			  <el-form-item style='text-align:left;'>
			    <el-button type="primary" @click='Select'>查询</el-button>
			    <!-- <el-button type="primary" @click='clear'>取消</el-button> -->
			  </el-form-item>				
			</el-form>
		</div>
  </el-form-item>
  <el-form-item label='楼层商品'  class='floor'  style='width:100%;text-align:center;' v-show='DataShow'>
      <template slot-scope="scope">
          <el-table :data="floorGoods" border style="width: 100%">
		    <el-table-column prop="productNo" label="商品编码" width="110">
		    	<template slot-scope="scope">
		    		<a :href="floorGoods[scope.$index].url" target="_blank">{{floorGoods[scope.$index].productNo}}</a>{{floorGoods[scope.$index].title}}
		    	</template>
		    </el-table-column>		 
<!-- 		    <el-table-column prop="title" label="商品标题" width="180">
		    </el-table-column> -->
		    <el-table-column prop="memo" label="商品描述" width="200">
		    </el-table-column>
		    <el-table-column prop="salePrice" label="商品价格" width="100">
		    </el-table-column>
		    <el-table-column prop="sort" label="商品排序" width="100">
		    </el-table-column>
		    <el-table-column prop="status" label="商品状态" width="100">
		    </el-table-column>
<!-- 		    <el-table-column prop="" label="商品图片" width="100">
		    </el-table-column> -->
		    <el-table-column prop="" label="操作" width="200">
		      <template slot-scope="scope">
		        <el-button @click="removegood(scope.row,scope.$index,floorGoods)" type="danger"  size="small">删除</el-button>
		        <el-button type="primary" @click="edit1(scope.row)"  size="small">编辑</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
      </template>     
  </el-form-item>
   <el-form-item label=' v-show='DataShow' ' props = 'endTime' style='box-sizing: border-box;width:100%;padding-top:30px;padding-left:15%;padding-right:10%;'>
     <div class="block" style='text-aling:center;box-sizing:border-box;padding-left:30%;' v-show='DataShow'>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[floorGoodLimit]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="floorGoodCount">
    </el-pagination>
  </div>
  </el-form-item>
  <el-form-item label='  ' style='box-sizing:border-box;width:100%;padding-top:30px;padding-left:10%;padding-right:10%;'>
        <el-button type="primary" @click='back()' style='float:left; '>返回</el-button>
        <el-button type="primary" @click='savefloor()' style='float:right; '>保存楼层</el-button>
        <el-button type="primary" @click='add()' style='float:right;'  v-show='DataShow'>添加商品</el-button>
  </el-form-item>

</el-form>	

<!-- 商品弹框 -->
<el-dialog title="收货地址" :visible.sync="dialogFormVisible1" id="dl">
  <el-form :model="ModelGood" inline :rules="rules" ref='ModelGood'>
    <el-form-item label="商品编码" class='short' prop='productNo'>
      <el-input v-model="ModelGood.productNo"></el-input>
    </el-form-item>
    <el-form-item label="商品价格"  class='short' prop='salePrice'>
      <el-input v-model="ModelGood.salePrice" ></el-input>
    </el-form-item>
    <el-form-item label="商品排序"  class='short' prop='sort'>
      <el-input v-model="ModelGood.sort" ></el-input>
    </el-form-item>
    <el-form-item label="商品状态"  class='short'>
	  	<el-select v-model="value" placeholder="请选择活动区域">
	      <el-option label="有效" value="1"></el-option>
	      <el-option label="无效" value="0"></el-option>
	    </el-select>
    </el-form-item>
    <el-form-item label="商品标题" >
      <el-input v-model="ModelGood.title" ></el-input>
    </el-form-item>
    <el-form-item label="商品描述" >
      <el-input v-model="ModelGood.memo" ></el-input>
    </el-form-item>
<!--     <el-form-item label="商品图片" >
      <el-input v-model="ModelGood.name" ></el-input>
    </el-form-item> -->
    <el-form-item label="商品连接" >
      <el-input v-model="ModelGood.url" ></el-input>
    </el-form-item>                
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click="save()" v-if='show'>保 存</el-button>
    <el-button type="primary" @click="comfire()" v-else>确定</el-button>
  </div>
</el-dialog>


	</div>
</template>
<script type="text/javascript">
	import axios from 'axios'
	export default{
		data(){
		      var checkSort = (rule, value, callback) => {
		        if(isNaN(value)){
		        	 callback(new Error('请输入数字值'));
		        }else{
		        	 callback();
		        }
		      };
		      var checkSort2 = (rule, value, callback) => {
		        if(isNaN(value)){
		        	 callback(new Error('请输入数字值'));
		        }else{
		        	 callback();
		        }
		      };		   
		      var checkSort1 = (rule, value, callback) => {
			if (!value) {
        			 return callback(new Error('产品编号不能为空'));
       			}
		        if(isNaN(value)){
		        	 callback(new Error('请输入数字值'));
		        }else{
		        	 callback();
		        }
		      };
			return{
				Image:[],
				show:true,
				value:'1',
				value1:'0',
				dialogFormVisible1:false,
				Code:'',
				Good:null,
				form:{},
				fileList:[],
				DataShow:false,
				SelectData:'',
				// 单个商品对象
				ModelGood:{
					productNo:'',
					title:'',
					memo:'',
					salePrice:'',
					sort:'',
					status:'',
					url:'',
					relationCode:'',
					kind:'specialactivity'
				},
				rules:{
					sort:{ validator: checkSort, trigger: 'blur' },
					salePrice:{ validator: checkSort2, trigger: 'blur' },
					productNo:{ validator: checkSort1, trigger: 'blur' },
				},
	       		currentPage4: 1
			}
		},
		created(){
      		this.$store.dispatch('GetCodeGoods')
			if(this.floorGoods){
				this.DataShow = true
			}else{
				this.DataShow = false
			}
	        this.fileList = []
	        	var file = {};
	        	file.url = this.$store.state.floor.Image
	        	this.fileList.push(file)
	        	this.ModelGood.relationCode = this.$store.state.floor.Code;
			},
		computed:{
			floorGoodLimit:function(){
				return this.$store.state.floorGoodLimit;
			},
			floorGoodCount:function(){
				return this.$store.state.floorGoodCount;
			},
			floorGoods:function(){
				return this.$store.state.floorGoods
			},
			floor:function(){
				return this.$store.state.floor
			},
			floorGoodOffset(){
				return this.$store.state.floorGoodOffset
			}
		},
	    watch:{
	    	floorGoodOffset:function(){
	    		this.$store.dispatch('GetCodeGoods')
	    	},
	    	SelectData:function(old){
	    		if(old){
	    			// this.Select()
	    		}else{
	    			this.$store.dispatch('GetCodeGoods')
	    		}
	    	}
	    },
		methods:{
			clear(){
				this.SelectData = ''
	    		// this.$store.dispatch('GetCodeGoods')
			},
			Select(){
	      		var This = this
	      		axios.get('/server/GetByNum?Num='+this.SelectData+'&code='+this.$store.state.floor.Code)
	      			.then(function(res){
	 					This.$store.state.floorGoods =res.data
	      			})
			},
			back(){
				var This = this;
				this.$router.push({name:'scsp'})
				// if(This.$store.state.recid){
				// 	This.$store.dispatch('GetGoods',{id:This.$store.state.specitalPorject.recid})
				// }
			},
			handleCurrentChange(currentPage){
				this.$store.state.floorGoodOffset = (currentPage-1)*this.$store.state.floorGoodLimit
			},
			add(){
					setTimeout(function(){
						var Model = document.getElementsByClassName('v-modal')[0];
						var body = document.getElementsByTagName('body')[0]
						body.removeChild(Model)
					},20)
				this.show = true;
				this.dialogFormVisible1 = true;
				this.ModelGood.productNo='';
				this.ModelGood.title=''
				this.ModelGood.memo=''
				this.ModelGood.salePrice=''
				this.ModelGood.sort=''
				this.ModelGood.status=''
				this.ModelGood.url=''
				// this.ModelGood.relationCode=''	
				if(this.$store.state.floor.Code){
					this.ModelGood.relationCode = this.$store.state.floor.Code;
				}else{
					this.ModelGood.relationCode = this.$store.state.floorCode
				}
				this.ModelGood.kind ='specialactivity'

			},
			handleSuccess(response,flielist){
				this.fileList = [];
	        	var file = {};
	        	file.url =response.ServerUrl + response.FilePath
	        	this.fileList.push(file)
	        	this.Image = []
	        	this.Image.push(response)
			},
			save(){
				var This = this;
		        this.$refs['ModelGood'].validate((valid) => {
		          if (valid) {
					this.dialogFormVisible1 = false;
					this.ModelGood.status = this.value
					if(!this.ModelGood.salePrice){
						delete this.ModelGood.salePrice
					}
					if(this.ModelGood.recid){
						delete this.ModelGood.recid
					}

				axios.get('/server/addOne?param='+JSON.stringify(this.ModelGood))
					.then(function(res){
						This.open5()
					let obj = {}
					 This.$store.dispatch('GetCodeGoods')
					obj.recid = res.data.recid
					for(var attr in This.ModelGood){
						obj[attr] = This.ModelGood[attr]
					}
					if(This.$store.state.floorGoods ){
					}else{
						This.$store.state.floorGoods  = []
					}
					This.$store.state.floorGoods.push(obj)
				})
		          } else {
		            this.dialogFormVisible1 = true;
		            return;
		          }
		        });
			},
			//商品编辑
			edit1(item){

				this.show = false
				this.Good = item
				this.dialogFormVisible1 = true;
					for(var attr in item){
						this.ModelGood[attr] = item[attr]
					}
					setTimeout(function(){
						var Model = document.getElementsByClassName('v-modal')[0];
						var body = document.getElementsByTagName('body')[0]
						body.removeChild(Model)
					},20)

			},
			// 确定修改
			comfire(){
				var This = this;
		        this.$refs['ModelGood'].validate((valid) => {
		          if (valid) {
					this.dialogFormVisible1 = false;
					// this.Good 修改单条数据
					for(var attr in this.ModelGood){
						this.Good[attr] = this.ModelGood[attr]
					}
					if(this.ModelGood.salePrice){
					}else{
						delete this.ModelGood.salePrice
					}
					axios.get('/server/update?RECID='+this.Good.recid+'&param='+JSON.stringify(this.ModelGood)).then(function(res){
						This.open4()
					})
		          } else {
		            this.dialogFormVisible1 = true;
		            return;
		          }
		        });
			},
			// 商品删除
			removegood(item,index,all){




        var This = this
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
				
				var This = this;
				all.splice(index,1)
				// for(var i =0;i<this.AllGoods.length;i++){
				// 	if( this.AllGoods[i].RECID == item.RECID){
				// 		this.AllGoods.splice(i,1)
				// 	}
				// 	// console.log(this.AllGoods[i])
				// }
				axios.get('/server/deleteOne?RECID='+item.recid)
				.then(function(res){
					// This.open7()
					 This.$store.dispatch('GetCodeGoods')
				})       
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });




			},
		      open3() {
		        this.$notify({
		          title: '成功',
		          message: '楼层添加成功，返回或添加商品',
		          type: 'success'
		        });
		      },
		      open4() {
		        this.$notify({
		          title: '成功',
		          message: '楼层修改成功',
		          type: 'success'
		        });
		      },
		      open5() {
		        this.$notify({
		          title: '成功',
		          message: '商品添加成功',
		          type: 'success'
		        });
		      },
		      open6() {
		        this.$notify({
		          title: '成功',
		          message: '商品修改成功',
		          type: 'success'
		        });
		      },
		      open7() {
		        this.$notify({
		          title: '成功',
		          message: '商品删除成功',
		          type: 'success'
		        });
		      },		      		      		      
			cancel(){
				this.dialogFormVisible1 = false;
				this.ModelGood.productNo='';
				this.ModelGood.title=''
				this.ModelGood.memo=''
				this.ModelGood.salePrice=''
				this.ModelGood.sort=''
				this.ModelGood.status=''
				this.ModelGood.url=''
				this.ModelGood.relationCode=''
				this.ModelGood.relationCode = this.$store.state.floor.Code;
				this.ModelGood.kind ='specialactivity'
			},
			savefloor(){
				// 修改
				var This = this;
				this.DataShow = true
				if(this.$store.state.Index || this.$store.state.Index == '0'){
					var objArr = JSON.parse(this.$store.state.specitalPorject.navigationConfig)
					var obj = objArr[this.$store.state.Index]
					obj.Title=this.floor.Title
					obj.TempId = this.value1;
					if(this.Image.length>0){
						obj.Image = this.Image
					}
					axios.get('/server/FloorUpdate?RECID='+this.$store.state.specitalPorject.recid+'&param='+JSON.stringify(objArr)).then(function(res){
						This.open3()
						 This.$store.dispatch('GetGoods',{id:This.$store.state.specitalPorject.recid})
					})	
				}else{
					//保存
					var obj = {}
					obj.TempId = this.value1;
					obj.Title = this.floor.Title;
					obj.Image = this.Image;
					obj.Code = this.$store.state.floorCode;

					if(this.$store.state.specitalPorject.navigationConfig.length>0){
						var objArr = JSON.parse(this.$store.state.specitalPorject.navigationConfig)
					}else{

						var objArr = []
					}
					objArr.push(obj);
					var Id = null;
					if(this.$store.state.specitalPorject.recid){
						Id = this.$store.state.specitalPorject.recid
					}else{
						Id = this.$store.state.recid
					}
					axios.get('/server/FloorUpdate?RECID='+Id+'&param='+JSON.stringify(objArr)).then(function(res){
						This.open3()
						if(This.$store.state.specitalPorject.recid){
							 This.$store.dispatch('GetGoods',{id:This.$store.state.specitalPorject.recid})
						}else{
							 This.$store.dispatch('GetGoods',{id:This.$store.state.recid})

						}		


					})						
				}
			}
		}
	}
</script>
<style type="text/css">

.fl .el-form-item__content{
	width:70%;
}
#floor #dl .el-form-item{
	width:100%;
}
#floor #dl .short{
	width:48%;
}
 #dl .el-form-item__content{
	width:80%;
}
#floor .demo-table-expand label{
	width:8%;
}
#floor  .demo-table-expand .el-form-item__label{
	width:100px;
}
/*#floor .demo-table-expand .el-form-item__label{
	width:50%;
}*/
#floor #seach .el-form{
	width:100%;
}

#floor #seach .el-form .el-form-item{
	width:30%;
	float:left;
}
a{
	text-decoration:none;
	color:#5a5e66;
}
.upload-demo{
	width:60%;
}
.upload-demo img{
	width:100px;
}
#floor .upload-demo{
	position:relative;
	height:160px;
}
#floor  .el-upload .el-button{
	position:absolute;
	bottom:8px;
	left:0;
}
#floor .el-upload-list {
	position:absolute;
	top:0;
	left:0;
}
#floor .el-upload__tip{
	position:absolute;
	bottom:0;
	left:15%;
}
</style>