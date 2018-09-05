<template>
	<div class='view-content'>
		<el-card class="box-card"  >
		  <div slot="header" class="clearfix">
			<el-form :inline="true" :model="formInline" class="demo-form-inline" style='width:70%;'>
			  <el-form-item  style='' class='ttsearch'>
			  	<el-input v-model="SelectData" placeholder='标题搜索'></el-input>
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
			    <el-button type="primary" @click="onSubmit">查询</el-button>
			  </el-form-item>
			  <el-form-item >
			    <el-button type="primary" @click="add">添加</el-button>
			  </el-form-item>	  
				<el-form-item id="Excel">
				            <el-upload
            class="upload-demo"
            action="/public/Excel"
            :on-success='handleSuccess1'
            >
            <el-button  type="primary" >EXCEL导入</el-button>
            </el-upload>
				</el-form-item>
  			  <el-form-item >
			    <el-button type="primary" @click="OPEN">CMS数据同步</el-button>
			  </el-form-item>	  
  			  <el-form-item >
			    <el-button type="primary" @click='ExcelDownLoad' >专场模板下载</el-button>
			  </el-form-item>	  
			</el-form>
		  </div>
		</el-card>
		<el-card class="box-card1" >
		  <div slot="header" class="clearfix">
			<el-table :data="tableData" border style="width:auto">
			    <el-table-column prop="recid" label="ID" width="80">
			    </el-table-column>
			    <el-table-column prop="title" label="标题" width="200">
					<template slot-scope="scope"> 
						<a :href="`https://dvcms.weixinmvp.com/Mass/180312specialactivity/#!/home/${scope.row.recid}`" target="_blank">{{scope.row.title}}</a>
					</template>
			    </el-table-column>
			    <el-table-column prop="thumbnailUrl" label="图片" width="160">
			 		<template slot-scope="scope">
                <div v-if='scope.row.thumbnailUrl'>
  			       	 	<img v-bind:src="scope.row.thumbnailUrl">
                </div>
                <div v-else>
                    未设置
                </div>
			     	</template>
			    </el-table-column>
			    <el-table-column label="时间" width="">
			    	<!-- <template slot-scope="scope">
			    		<span >[{{scope.row.startTime}}]</span><span style='font-weight:800;text-align:center;'>至</span><span > [{{scope.row.endTime}}]</span>
			    	</template> -->
       		    	<template slot-scope="scope">
			    	
                  <el-date-picker
                    v-model="scope.row.timeRange"
                    :change='timeChange(scope.row.timeRange,scope)'
                    type="datetimerange"
                    range-separator="至"
                    value-format='yyyy-MM-dd HH:mm:ss'
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
			    	</template>             
            
			    </el-table-column>
	
	

			    <el-table-column prop="status" label="状态" width='100'>
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
			    <el-table-column prop="status" label="操作"  width='300'>
					<template slot-scope="scope">
			       		<el-button type="primary" size="small" @click='preview(scope)' >预览</el-button>
			        	<el-button  type="primary"  v-on:click="edit(scope)" size="small">编辑</el-button>
			       		<el-button type="danger" size="small"  @click="del(scope.$index,scope.row,tableData)">删除</el-button>
			     	</template>
			    </el-table-column>
			</el-table>	  
		  </div>
		</el-card>
		  <div class="block">
		    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10,20,40,60,80,100]" :page-size="limit" :current-page="currentPage4" layout="total, sizes, prev, pager, next, jumper" :total="total1">
		    </el-pagination>
 		 </div>	

<el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" style='max-width:540px;left:50%;margin-left:-5%;height:800px;overflow:hidden;' :center= true :modal = false>
  <iframe :src='iFrameUrl' width='100%;' style='height:800px;border:0px;'></iframe>
</el-dialog>     
	</div>
</template>
<script type="text/javascript">
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      Status: "2",
      value3: true,
      total1: null,
      offset: "0",
      dialogTitle:'121212',
      limit: 10,
      // iFrameUrl: "http://dvcms.weixinmvp.com/Mass/180312specialactivity/#!/home/302",
      iFrameUrl: "/specialactivity/#!/home/302",
      dialogTableVisible: false,
      formInline: {
        user: "",
        region: ""
      },
      SelectData: "",
      tableData: [],
      currentPage4: 1
    };
  },
  methods: {
    preview (data) {
      this.iFrameUrl = "/specialactivity/#!/home/"+data.row.recid
      this.dialogTitle = data.row.title
      this.dialogTableVisible = true
    },
    timeChange(item,scope){
      var This = this;
      if(this.tableData[scope.$index].startTime != this.tableData[scope.$index].timeRange[0] || this.tableData[scope.$index].endTime != this.tableData[scope.$index].timeRange[1]){

          var param = {
              startTime:this.tableData[scope.$index].timeRange[0],
              endTime:this.tableData[scope.$index].timeRange[1]
          }
            axios
              .post("/server/UpdateSpecialSubject", {
                RECID: scope.row.recid,
                param: param
              })
              .then(function(res) {
                scope.row.startTime = This.tableData[scope.$index].timeRange[0]
                scope.row.endTime = This.tableData[scope.$index].timeRange[1]
              });
      }
    },
    change(item) {
      var num = "";
      if (item.row.status) {
        num = 0;
        item.row.status = false;
      } else {
        num = 1;
        item.row.status = true;
      }

      axios
        .get("/server/status?status=" + num + "&Id=" + item.row.recid)
        .then(function() {});
    },
    cancel() {
      this.SelectData = "";
      this.GetSpecialSubjectPagination(this.offset, this.limit);
    },
    GetSpecialSubjectPagination(offset, limit) {
      var This = this;
      axios
        .get(
          "/server/GetSpecialSubjectPagination?offset=" +
            offset +
            "&limit=" +
            limit +
            "&title=" +
            this.SelectData +
            "&Status=" +
            this.Status
        )
        .then(function(res) {
          This.total1 = res.data.count;
          let obj = res.data.rows;
          for (var i = 0; i < res.data.rows.length; i++) {
            if (JSON.parse(res.data.rows[i].thumbnailUrl).length >= 1) {
              obj[i].thumbnailUrl =
                JSON.parse(res.data.rows[i].thumbnailUrl)[0].ServerUrl +
                JSON.parse(res.data.rows[i].thumbnailUrl)[0].FilePath;
            } else {
              obj[i].thumbnailUrl = "";
            }
            if (res.data.rows[i].startTime) {
              // obj[i].startTime = moment(res.data.rows[i].startTime)
              //   .utc()
              //   .format("YYYY-MM-DD HH:mm:ss");
            } else {
              obj[i].startTime = "未设置";
            }
            if (res.data.rows[i].endTime) {
              // obj[i].endTime = moment(res.data.rows[i].endTime)
              //   .utc()
              //   .format("YYYY-MM-DD HH:mm:ss");
            } else {
              obj[i].endTime = "未设置";
            }
            if (res.data.rows[i].status == 1) {
              res.data.rows[i].status = true;
            } else {
              res.data.rows[i].status = false;
            }
          }
          This.tableData = obj;
        });
    },
    onSubmit() {
      this.GetSpecialSubjectPagination(this.offset, this.limit);
    },
    handleSizeChange(size) {
      this.limit = size;
    },
    handleCurrentChange(currentPage) {
      this.offset = (currentPage - 1) * this.limit;
    },
    del(index, item, all) {},
    edit(item) {
      this.$store.state.show = true;
      var arr = window.location.href.split("#")[0] + "#/edit/" + item.row.recid;
      window.open(arr);
      this.$store.dispatch("GetGoods", { id: item.row.recid });
    },
    handleSuccess1(request) {
      this.GetSpecialSubjectPagination(this.offset, this.limit);
      this.open3();
    },
    open3() {
      this.$notify({
        title: "成功",
        message: "数据导入成功",
        type: "success"
      });
    },
    add() {
      sessionStorage.setItem("id", "");
      this.$store.state.show = false;
      let obj = {
        recid: "",
        title: "",
        startTime: "",
        endTime: "",
        navigationConfig: "[]"
      };
      this.$store.state.specitalPorject = obj;
      var arr = window.location.href.split("#")[0] + "#/edit";
      window.open(arr);
    },
    OPEN() {
      var href = "https://cms.weixinmvp.com/api/Product/Synchro";
      window.open(href);
    },
    buttonChange(num, item) {
      var num1 = "";
      if (num) {
        num1 = 1;
      } else {
        num1 = 0;
      }
      axios
        .get("/server/status?status=" + num1 + "&Id=" + item.row.recid)
        .then(function() {});
    },
    ExcelDownLoad(){
      window.location.href =location.origin+ '/template/spectialTemplate.xlsx'
    },
    del(index, item, all) {
      var This = this;
      this.$confirm("此操作将永久删除该专题, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });

          var arr = [];
          for (var i = 0; i < JSON.parse(item.navigationConfig).length; i++) {
            arr.push(JSON.parse(item.navigationConfig)[i].Code);
          }
          axios
            .get("/server/DestroySpecialSubject?RECID=" + item.recid)
            .then(function(res) {
              This.GetSpecialSubjectPagination(This.offset, This.limit);
            });
          axios
            .get("/server/deleteGoods?CodeArr=" + JSON.stringify(arr))
            .then(function(res) {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  },
  watch: {
    offset: function() {
      this.GetSpecialSubjectPagination(this.offset, this.limit);
    },
    limit() {
      this.GetSpecialSubjectPagination(this.offset, this.limit);
    },
    SelectData: function(old) {
      if (old) {
        // this.onSubmit()
      } else {
        this.SelectData = "";
        this.GetSpecialSubjectPagination(this.offset, this.limit);
      }
    }
  },
  created() {
    this.offset = "0";
    this.GetSpecialSubjectPagination(this.offset, this.limit);
  }
};
</script>
<style type="text/css" scope>
element.style {
  left: 200px;
}
body .el-date-range-picker {
  left: 200px;
}
body .el-picker-panel {
  left: 200px;
}
body .el-popper {
  left: 200px;
}
.box-card {
  width: 100%;
}
.view-content {
  width: 98%;
  box-sizing: border-box;
  margin: 0 auto;
}
.el-card__body {
  display: none;
}
.demo-form-inline .el-form-item {
  margin-bottom: 8px;
}
.cell img {
  width: 80px;
  height: 40px;
}
.block {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.cell {
  text-align: center;
}
.el-table__body {
  margin: 0 auto;
}
.view-content .block {
  width: 50%;
  padding: 30px;
}
.ttsearch .el-form-item__content {
  width: 100%;
}
.el-submenu .el-menu-item {
  min-width: 10%;
}
.el-switch {
  height: 23px;
  line-height: 23px;
}
a {
  text-decoration: none;
  color: #5a5e66;
}
#Excel .el-upload-list {
  display: none;
}
.el-dialog{
  width:100%;
  height:1000px;
  max-height:1000px;
  padding:0;
  margin:0;
}
</style>
