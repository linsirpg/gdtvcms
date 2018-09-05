<template>
    <div>
 		 <el-card class="box-card"  >
		  <div slot="header" class="clearfix">
			<el-form :inline="true"  class="demo-form-inline" style='width:70%;'>
			  <el-form-item  style='' class='ttsearch'>
			  	<el-input v-model="SelectData" placeholder='标题搜索'></el-input>
			  </el-form-item>
			  <el-form-item  style='' class='ttsearch'>
			  	<el-input v-model="SelectKind" placeholder='kind搜索'></el-input>
			  </el-form-item>              
			  <el-form-item >
			      <el-form-item >
				    <el-select v-model="Status" placeholder="请选择" style='text-align:center;width:100px;'>
				      <el-option style='text-align:center;' label="--状态--" value="2"></el-option>
				      <el-option style='text-align:center;' label="上架" value="1"></el-option>
				      <el-option style='text-align:center;' label="下架" value="0"></el-option>
				    </el-select>
				</el-form-item>
			  </el-form-item>	
			  <el-form-item >
			    <el-button type="primary" @click='onSubmit()'>查询</el-button>
			  </el-form-item>
			  <!-- <el-form-item >
			    <el-button type="primary" >添加</el-button>
			  </el-form-item>	 -->
 			  <el-form-item >
            <el-upload
            class="upload-demo"
            action="/public/presetExcel"
            :on-success='handleSuccess'
            >
            </el-upload>
			  </el-form-item>	           	
 			  <el-form-item >
            <el-upload
            class="upload-demo"
            action="/public/UpdateProductRef"
            :on-success='handleSuccess'
            >
            </el-upload>
			  </el-form-item>	      	  
			</el-form>
		  </div>
		</el-card>    
        <el-card class="box-card1"  style='text-align:center;'>   
          <el-table :data="tableData" border style="width: 100%">
        <el-table-column  label="信息" >
          <template slot-scope="scope">
            <a :href="tableData[scope.$index].url" target="_blank">{{tableData[scope.$index].title}}[{{tableData[scope.$index].productNo}}]</a>
          </template>
        </el-table-column>
        <el-table-column  label="relationCode"  prop="relationCode">
          
        </el-table-column>        
        <el-table-column prop="memo"  label="描述" width="300">
            <template slot-scope='scope'>
                            <div v-if='scope.row.memo'>
                  {{scope.row.memo}}
                </div>
                <div v-else>
                    未设置
                </div>
          </template>        
        </el-table-column>
    <el-table-column prop="imageUrl" label="图片" width='220'>
          <template slot-scope='scope'>
                            <div v-if='scope.row.imageUrl'>
                  <img :src="JSON.parse(scope.row.imageUrl)[0].ServerUrl+JSON.parse(scope.row.imageUrl)[0].FilePath" alt="" style='width:200px;'>
                </div>
                <div v-else>
                    未设置
                </div>
          </template>
    </el-table-column>
        <el-table-column prop="salePrice"  label="价格" width="100"   >
            <template slot-scope="scope">
                <div v-if='scope.row.salePrice'>
                  {{scope.row.salePrice}}
                </div>
                <div v-else>
                    未设置
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"  width="180" >
            <template slot-scope="scope" style='position:relative;'>
                <div v-if='scope.row.Price'><el-button style='border:1px;' @click="ChangePrice(scope,this)"><i class="el-icon-edit"></i>{{scope.row.sort}}</el-button></div>
                <div v-else >
                   <el-input style='text-align:center;border:1px solid #ccc;border-radius:6px;' v-model='scope.row.sort'  @blur="Blur(scope)" @focus="focus(scope)" ></el-input>
                </div>
             
            </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
            <template slot-scope="scope">
            <el-switch
            v-model="scope.row.status"
            active-color="#409EFF"
            inactive-color="#909399"
              @change="buttonChange(scope.row.status,scope)"
            >
          </el-switch>            
            </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit1(scope.row)"  size="small">编辑</el-button>
            <el-button @click="removegood(scope.row,scope.$index,tableData)" type="danger"  size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        </el-card>
		  <div class="block">
		    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10,20,40,60,80,100]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total1">
		    </el-pagination>
 		 </div>	
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      SelectData: "",
      Status: "2",
      SelectKind: "",
      limit: 10,
      total1: null,
      currentPage4: 0,
      offset: "0",
      limit: 10,
      tableData: [],
      PresetValue:'1'
    };
  },
  watch: {
    offset: function() {
      this.GetSArticleInfo(this.offset, this.limit);
    },
    limit:function(){
  this.GetSArticleInfo(this.offset, this.limit);
    },
    SelectData: function(old) {
      if (old) {
      } else {
        this.SelectData = "";
        this.GetSArticleInfo(this.offset, this.limit);
      }
    },
    SelectKind: function(old) {
      if (old) {
      } else {
        this.SelectKind = "";
        this.GetSArticleInfo(this.offset, this.limit);
      }
    }
  },
  created() {
    this.GetSArticleInfo(this.offset, this.limit);
  },
  methods: {
    buttonChange(num, item) {
      var num1 = "";
      if (num) {
        num1 = 1;
      } else {
        num1 = 0;
      }

      axios
        .get("/server/Goodstatus?status=" + num1 + "&Id=" + item.row.recid)
        .then(function(res) {});
    },
		  del(index,item,all) {
		  		var This = this;
		        this.$confirm('此操作将永久删除该专题, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
				var arr = [];
       			
		        axios.get('/productlist/DestroyPreset?RECID='+item.recid).then(function(res){
		        	This.GetSArticleInfo(This.offset,This.limit)
		        	 all.splice(index,1)
		        })
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		      },    
    GetSArticleInfo(offset, limit) {
      var This = this;
      axios
        .get(
          "/productlist/GetProductlist?offset=" +
            offset +
            "&limit=" +
            limit +
            "&title=" +
            this.SelectData +
            "&status=" +
            this.Status +
            "&kind=" +
            this.SelectKind
        )
        .then(function(res) {
          This.total1 = res.data.count;
			      	for(var i = 0; i <res.data.rows.length;i++){
			      		res.data.rows[i].Price = true
			      		if(res.data.rows[i].status == 1){
			      			res.data.rows[i].status = true
			      		}else{
			      			res.data.rows[i].status = false
			      		}
			      	}          
          var obj = res.data.rows;
          console.log(obj)
          This.tableData = obj;
        });
    },
    handleSizeChange(size) {
      this.limit = size
    },
    handleCurrentChange(currentPage) {
      this.offset = (currentPage - 1) * this.limit;
    },
    onSubmit() {
      this.GetSArticleInfo(this.offset, this.limit);
    },
    handleSuccess(response, flielist) {
        if(response =='ok'){
          this.GetSArticleInfo(this.offset, this.limit);
        }
    },
  }
};
</script>
<style>
a {
  text-decoration: none;
  color: #5a5e66;
}
.cell {
  text-align: center;
}
.box-card .el-card__body {
  display: none;
}
.box-card1 .el-card__body{
  display:block;
}
.el-switch {
  height: 23px;
  line-height: 23px;
}
</style>


