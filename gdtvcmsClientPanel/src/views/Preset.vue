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
            <el-button  type="primary">EXCEL导入</el-button>
            </el-upload>

			    
			  </el-form-item>	           	
 			  <el-form-item >
            <el-upload
            class="upload-demo"
            action="/public/UpdateProductRef"
            :on-success='handleSuccess'
            >
            <el-button  type="primary">修改ProductRef</el-button>
            </el-upload>

			    
			  </el-form-item>	      	  
			</el-form>
		  </div>
		</el-card>    
        <el-card class="box-card1"  style='text-align:center;'>   
			<el-table :data="tableData" border style="width:auto">
			    <el-table-column prop="name" label="信息">
                    <template slot-scope="scope">
                        <a :href="tableData[scope.$index].url" target="_blank">{{tableData[scope.$index].name}}[{{tableData[scope.$index].productNo}}]</a>
                    </template>
			    </el-table-column>
			    <el-table-column prop="memo" label="描述" width="200">
			    </el-table-column>    
			    <el-table-column prop="kind" label="kind" width="200">
			    </el-table-column>                                   
			    <el-table-column label="时间" width="">
			    	<template slot-scope="scope">
			    		<span >[{{scope.row.startTime}}]</span><span style='font-weight:800;text-align:center;'>至</span><span > [{{scope.row.endTime}}]</span>
			    	</template>
			    </el-table-column>
			    <!-- <el-table-column prop="status" label="状态" width='150'>
			    	<template slot-scope="scope"> -->
					<!-- <el-switch
					  v-model="scope.row.status"
					  active-color="#409EFF"
					  inactive-color="#909399"
					  	@change="buttonChange(scope.row.status,scope)"
					  >
					</el-switch> -->
      <!-- <el-select v-model="tableData[scope.$index].status" placeholder="状态" style='float:left;'>
        <el-option label="失效" value="0"></el-option>
        <el-option label="未加载" value="1"></el-option>
        <el-option label="加载完" value="9"></el-option>
      </el-select>
			    	</template>
			    </el-table-column> -->
			    <el-table-column prop="status" label="操作"  width='300'>
					<template slot-scope="scope">
			        	<!-- <el-button  type="primary"  size="small">编辑</el-button> -->
			       		<el-button type="danger"  @click="del(scope.$index,scope.row,tableData)" size="small">删除</el-button>
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
       			
		        axios.get('/presetproduct/DestroyPreset?RECID='+item.recid).then(function(res){
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
          "/presetproduct/GetpresetProduct?offset=" +
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
          var obj = res.data.rows;
          for (var i = 0; i < res.data.rows.length; i++) {
            if (res.data.rows[i].startTime) {
              obj[i].startTime = res.data.rows[i].startTime
                .split(".")[0]
                .split("T")
                .join(" ");
            } else {
              obj[i].startTime = "未设置";
            }
            if (res.data.rows[i].endTime) {
              obj[i].endTime = res.data.rows[i].endTime
                .split(".")[0]
                .split("T")
                .join(" ");
            } else {
              obj[i].endTime = "未设置";
            }
            // res.data.rows[i].status =  (res.data.rows[i].status).toString()
            // console.log(typeof res.data.rows[i].status)
            
            // if (res.data.rows[i].status == 1) {
            //   = true;
            // } else {
            //   res.data.rows[i].status = false;
            // }
          }
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


