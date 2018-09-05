<template>
	<div class='view-content'>
		<el-card class="box-card"  >
		  <div slot="header" class="clearfix">
			<el-form :inline="true"  class="demo-form-inline" style='width:70%;'>
			 
			  <el-form-item  style='' class='ttsearch' >
			  	<el-input v-model="SelectData" placeholder='标题搜索' ></el-input>
			  </el-form-item>
			      <el-form-item >
				    <el-select v-model="Status" placeholder="请选择" style='text-align:center;width:100px;'>
				      <el-option style='text-align:center;' label="--状态--" value="2"></el-option>
				      <el-option style='text-align:center;' label="上架" value="1"></el-option>
				      <el-option style='text-align:center;' label="下架" value="0"></el-option>
				    </el-select>
				  </el-form-item>
			  <el-form-item >
			    <el-button type="primary"  @click="onSubmit">查询</el-button>
			  </el-form-item>
			  <el-form-item >
			    <el-button type="primary" @click="add">添加</el-button>
			  </el-form-item>			  
			</el-form>
		  </div>
		</el-card>
		<el-card class="box-card1" >
		  <div slot="header" class="clearfix">
			<el-table :data="tableData" border style="width:auto">
			    <el-table-column prop="TITLE" label="标题" width="200">
			    	<template slot-scope="scope">
			    		<a :href="scope.row.URL" target="_blank">{{scope.row.TITLE}}</a>
			    	</template>
			    </el-table-column>
			    <el-table-column label="时间" width="">
			    	<!-- <template slot-scope="scope">
 :change='timeChange(scope.row.timeRange,scope)'
			    		<span >[{{scope.row.START_TIME}}]</span><span style='font-weight:800;text-align:center;'>至</span><span > [{{scope.row.END_TIME}}]</span>
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
			    <el-table-column prop="POSITION" label="位置" width="200">

			    </el-table-column>					
			    <el-table-column prop="status" label="状态" width='180'>
			    	<template slot-scope="scope">
					<el-switch
					  v-model="scope.row.STATUS"
					  active-color="#409EFF"
					  inactive-color="#909399"
					  	@change="buttonChange(scope.row.STATUS,scope)"
					  >
					</el-switch>
			    	</template>
			    </el-table-column>
        <el-table-column prop="SORT" label="排序"  width="180" >
            <template slot-scope="scope" style='position:relative;'>
                <div v-if='scope.row.Price'><el-button style='border:1px;' @click="ChangePrice(scope,this)"><i class="el-icon-edit"></i>{{scope.row.SORT}}</el-button></div>
                <div v-else >
                   <el-input style='text-align:center;border:1px solid #ccc;border-radius:6px;' v-model='scope.row.SORT'  @blur="Blur(scope)" @focus="focus(scope)" ></el-input>
                </div>
             
            </template>
        </el-table-column>
			    <el-table-column prop="status" label="操作"  width='300'>
					<template slot-scope="scope">
			        	<el-button  type="primary"  v-on:click="edit(scope)" size="small">编辑</el-button>
			       		<el-button type="danger" size="small"  @click="del(scope.$index,scope.row,tableData)">删除</el-button>
			     	</template>
			    </el-table-column>
			</el-table>	  
		  </div>
		</el-card>
		  <div class="block">
		    <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="currentPage4" :page-sizes="[10,20,40,60,80,100]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total1">
		    </el-pagination>
 		 </div>
	</div>
</template>
<script type="text/javascript">
import axios from "axios";
export default {
  created() {
    this.Getpaging();
  },
  data() {
    return {
      tableData: [],
      SelectData: "",
      Status: "2",
      offset: "0",
      total1: null,
      limit: 10,
      currentPage4: 1
    };
  },
  methods: {
    timeChange(item, scope) {
      var This = this;
      if (
        this.tableData[scope.$index].START_TIME !=
          this.tableData[scope.$index].timeRange[0] ||
        this.tableData[scope.$index].END_TIME !=
          this.tableData[scope.$index].timeRange[1]
      ) {
        var param = {
          START_TIME: this.tableData[scope.$index].timeRange[0],
          END_TIME: this.tableData[scope.$index].timeRange[1]
        };
        axios
          .post("/describe/UpdateCMSTAG", {
            RECID: scope.row.RECID,
            params: param
          })
          .then(function(res) {
            scope.row.START_TIME = This.tableData[scope.$index].timeRange[0];
            scope.row.END_TIME = This.tableData[scope.$index].timeRange[1];
          });
      }
    },
    Getpaging: function() {
      var Arr = [];
      var This = this;
      axios
        .get(
          "/describe/ProDec?offset=" +
            this.offset +
            "&limit=" +
            this.limit +
            "&title=" +
            this.SelectData +
            "&status=" +
            this.Status
        )
        .then(function(res) {
          This.total1 = res.data.count;
          let obj = res.data.rows;
          for (var i = 0; i < res.data.rows.length; i++) {
            Arr.push(res.data.rows[i].POSITION_CODE);
            if (res.data.rows[i].STATUS == "1") {
              res.data.rows[i].STATUS = true;
            } else {
              res.data.rows[i].STATUS = false;
            }
            if (res.data.rows[i].START_TIME) {
              // obj[i].START_TIME = res.data.rows[i].START_TIME.split(".")[0]
              //   .split("T")
              //   .join(" ");
            } else {
              obj[i].START_TIME = "未设置";
            }
            if (res.data.rows[i].END_TIME) {
              // obj[i].END_TIME = res.data.rows[i].END_TIME.split(".")[0]
              //   .split("T")
              //   .join(" ");
            } else {
              obj[i].END_TIME = "未设置";
            }
            res.data.rows[i].Price = true;
          }

          axios
            .post("/describe/getPosition", {
              position: Arr
            })
            .then(function(res) {
              for (var j = 0; j < res.data.length; j++) {
                obj[j].POSITION = res.data[j].memo;
              }
              This.tableData = obj;
            });
        });
    },
    buttonChange(num, item) {
      var num1 = "";
      if (num) {
        num1 = 1;
      } else {
        num1 = 0;
      }
      var param = {
       STATUS:num1
      };
      axios
        .post("/describe/UpdateCMSTAG", {
          RECID: item.row.RECID,
          params: param
        })
        .then(function(res) {
        });
    },
    onSubmit() {
      var Arr = [];
      var This = this;
      axios
        .get(
          "/describe/ProDec?offset=" +
            this.offset +
            "&limit=" +
            this.limit +
            "&title=" +
            this.SelectData +
            "&status=" +
            this.Status
        )
        .then(function(res) {
          This.total1 = res.data.count;
          let obj = res.data.rows;
          for (var i = 0; i < res.data.rows.length; i++) {
            Arr.push(res.data.rows[i].POSITION_CODE);
            if (res.data.rows[i].STATUS == "1") {
              res.data.rows[i].STATUS = true;
            } else {
              res.data.rows[i].STATUS = false;
            }
            if (res.data.rows[i].START_TIME) {
              // obj[i].START_TIME = res.data.rows[i].START_TIME.split(".")[0]
              //   .split("T")
              //   .join(" ");
            } else {
              obj[i].START_TIME = "未设置";
            }
            if (res.data.rows[i].END_TIME) {
              // obj[i].END_TIME = res.data.rows[i].END_TIME.split(".")[0]
              //   .split("T")
              //   .join(" ");
            } else {
              obj[i].END_TIME = "未设置";
            }
            res.data.rows[i].Price = true;
          }

          axios
            .post("/describe/getPosition", {
              position: Arr
            })
            .then(function(res) {
              for (var j = 0; j < res.data.length; j++) {
                obj[j].POSITION = res.data[j].memo;
              }
              This.tableData = obj;
            });
        });
    },
    handleCurrentChange(currentPage) {
      this.offset = (currentPage - 1) * this.limit;
    },
    handleSizeChange(size) {
      this.limit = size;
    },
    change(item) {
      var num = "";
      if (item.row.STATUS) {
        num = 0;
        item.row.STATUS = false;
      } else {
        num = 1;
        item.row.STATUS = true;
      }
      axios
        .get("/describe/status?status=" + num + "&Id=" + item.row.RECID)
        .then(function() {});
    },

    edit(item) {
      var arr =
        window.location.href.split("#")[0] + "#/PdTag/" + item.row.RECID;
      window.open(arr);
    },
    add() {
      var This = this;

      var arr = window.location.href.split("#")[0] + "#/PdTag";
      window.open(arr);
    },
    del(index, item, all) {
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
          all.splice(index, 1);
          axios
            .get("/describe/DeleteProDec?RECID=" + item.RECID)
            .then(function(res) {});

          axios
            .get("/describe/DeleteCmsProductTagRef?CODE=" + item.RECID)
            .then(function(res) {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    ChangePrice(item, This) {
      this.True = false;
      item.row.Price = false;
      var This = this;
      setTimeout(function() {
        if (!This.True) {
          item.row.Price = true;
        }
      }, 1000);
    },
    err(a, b) {
      this.$notify.error({
        title: a,
        message: b
      });
    },
    open(a, b) {
      this.$notify({
        title: a,
        message: b,
        type: "success"
      });
    },
    Blur(item) {
      var This = this;
      if (isNaN(item.row.SORT)) {
        this.err("失败", "不能包含字母，请重新输入");
      } else {
        if (this.SORT != item.row.SORT) {
          axios
            .post("/describe/status", {
              RECID: this.Good.RECID,
              SORT: this.Good.SORT
            })
            .then(function(res) {
              This.open("成功", "排序修改成功");
              item.row.Price = true;
            });
        }
        item.row.Price = true;
      }
    },
    focus(item) {
      this.Good = item.row;
      this.sort = item.row.sort;
      this.True = true;
    }
  },
  watch: {
    SelectData: function(old) {
      if (old) {
      } else {
        this.onSubmit();
      }
    },
    offset: function() {
      this.Getpaging();
    },
    limit() {
      this.Getpaging();
    }
  }
};
</script>
<style type="text/css">
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
  margin: 0 atuo;
}
.view-content .block {
  width: 50%;
  padding: 30px;
}
a {
  text-decoration: none;
  color: #5a5e66;
}
.el-form-item__content {
  width: 100%;
  margin-bottom: 0px;
}
.demo-form-inline .el-form-item {
  margin-bottom: 0;
}
.el-submenu .el-menu-item {
  min-width: 10%;
}
.el-switch {
  height: 23px;
  line-height: 23px;
}
</style>
