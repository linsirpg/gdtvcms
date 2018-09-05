<template>
	<div style='width:100%;height:auto;padding-top:35px;margin:0 auto;' class='productTag'>
  		<el-tabs v-model="activeName2" type="card"  class='one' @tab-click="handleClick"  >
    <el-tab-pane label="专题" name="first"   >
		<div style='width:70%; float:left; padding-top:30px;margin:0 auto;padding-bottom:30px; '>
		<el-form   :model="CMSTags"  class='demo-table-expand' inline >
		  <el-form-item label='标签标题' props = 'TITLE' style='width:100%;text-align:left;'>
		       <el-input v-model="CMSTags.TITLE"></el-input>
		  </el-form-item>
		  <el-form-item label='标签描述' props = 'TITLE' style='width:100%;text-align:left;'>
		       <el-input v-model="CMSTags.CONTENT"></el-input>
		  </el-form-item>
		  <el-form-item label='有效时间'   style='width:100%;text-align:left;'>
		      <div class="block">
		        <el-date-picker
		          v-model="value0"
		          type="datetime"
		          placeholder="选择日期时间">
		        </el-date-picker>
		      </div>
		      <div style='float:left;'>至</div>
		      <div class="block">
		        <el-date-picker
		          v-model="value1"
		          type="datetime"
		          placeholder="选择日期时间">
		        </el-date-picker>
		      </div>
		  </el-form-item>
  <el-form-item label="标签位置">
    <el-select v-model="Value" placeholder="选择标签位置">
      <el-option    v-for="item in List"  :label="item.memo" :value="item.positionCode" :key='item.recid'></el-option>
    </el-select>
  </el-form-item>
		  <el-form-item label='标签链接' props = 'TITLE' style='width:100%;text-align:left;'>
		       <el-input v-model="CMSTags.URL"></el-input>
		  </el-form-item>
		  <el-form-item label='标签图片'  style='width:100%;text-align:left;'>
		    <template>
		      <el-upload class="upload-demo" ref="upload" :file-list="fileList" action="/server/file"   list-type="picture" :on-success='handleSuccess'>
		        <el-button size="small" type="primary">点击上传</el-button>
		        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		      </el-upload>        
		    </template>
		  </el-form-item>
		</el-form>
		</div>
		 <el-button type="primary" style='float:right;position:absolute;right:30px;bottom:30px;box-shadow:1px 1px 1px #ccc;' @click='save()'>保存</el-button>
		    </el-tab-pane>

    <el-tab-pane label="商品" disabled v-if='show1'>
      </el-tab-pane>
    <el-tab-pane label="商品" name="two" v-else>
		<div style='width:100%; padding-top:30px;padding-bottom:30px; '>
			<el-table :data="tableData" border style="width: 100%">
			    <el-table-column prop="PRODUCT_NO" label="编号" width="180">
			    </el-table-column>
			    <el-table-column prop="SORT" label="排序" width="180">
            <template slot-scope="scope" style='position:relative;'>
              <!-- <el-button type="info" plain @click='sortClick()'>{{scope.row.sort}}</el-button> -->

                <el-button @click="ChangePrice(scope,this)" style='border:0px;' v-if='scope.row.Price'><i class="el-icon-edit"></i>{{scope.row.SORT}}</el-button>
              <el-input style='text-align:center;border:0px;' v-model='scope.row.SORT' v-else  @blur="Blur(scope)" @focus="focus(scope)" ></el-input>
            </template>
			    </el-table-column>
			    <el-table-column prop="STATUS" label="状态">
		    		 <template slot-scope="scope">
<!-- 			    		<div >
			    			<el-tag type="success" size='medium' v-if='scope.row.STATUS' >上架</el-tag>
			    			<el-tag type="warning" size='medium' v-else>下架</el-tag>
			    		</div> -->
					<el-switch
					  v-model="scope.row.STATUS"
					  active-color="#409EFF"
					  inactive-color="#909399"
					  	@change="buttonChange(scope.row.STATUS,scope)"
					  >
					</el-switch>		
			    	</template>    	
			    </el-table-column>
			    <el-table-column prop="" label="操作" >
			      <template slot-scope="scope">
			      	<!-- <el-button  type="info" size='small' @click='change(scope)'  v-if='scope.row.status'  style=''> 下架</el-button> -->
		            <!-- <el-button  type="info" size='small' @click='change(scope)'  v-else  style='font-weight:800;'>发布</el-button> -->
			        <el-button type="primary"  size="small" @click='edit(scope)'>编辑</el-button>
			        <el-button type="danger" @click='del(scope,tableData)' size="small">删除</el-button>
			      </template>
			    </el-table-column>
		  </el-table>
		</div>  
    		  <div class="block">
		    <el-pagination  @current-change="handleCurrentChange"  :current-page="currentPage4" :page-sizes="[limit]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total1">
		    </el-pagination>
 		 </div>
			   <el-button type="primary"  style='float:right;position:absolute;right:30px;bottom:30px;box-shadow:1px 1px 1px #ccc;' @click='addGood()'>添加</el-button>
	</el-tab-pane>
  		</el-tabs>

<el-dialog title="商品" :visible.sync="dialogFormVisible1" id="dl">
  <el-form :model="ModelGood"  :rules="rules" ref='ModelGood'>
    <el-form-item label="商品编码" class='short' prop='PRODUCT_NO'>
      <el-input v-model="ModelGood.PRODUCT_NO"></el-input>
    </el-form-item>
    <el-form-item label="商品排序"  class='short' prop='SORT'>
      <el-input v-model="ModelGood.SORT" ></el-input>
    </el-form-item>
    <el-form-item label="商品状态"  class='short'>
      <el-select v-model="value" placeholder="请选择活动区域">
        <el-option label="有效" value="1"></el-option>
        <el-option label="无效" value="0"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click="save1()" v-if='show'>保 存</el-button>
    <el-button type="primary" @click="comfire()" v-else>确定</el-button>
  </div>
</el-dialog>

	</div>
</template>
<script type="text/javascript">
import axios from "axios";

import moment from "moment";
export default {
  data() {
    var checkSort = (rule, value, callback) => {
      if (isNaN(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    var checkSort2 = (rule, value, callback) => {
      if (isNaN(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    var checkSort1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("产品编号不能为空"));
      } else {
        callback();
      }
    };

    return {
      Value: "PRODUCT_DESC_AFTER",
      obj: {},
      CMSTags: {},
      total1: null,
      offset: "0",
      limit: "10",
      Image: [],
      count: null,
      fileList: [],
      show1: true,
      List: null,
      sort: null,
      show: true,
      value: "1",
      value0: "",
      value1: "",
      RECID: "",
      code: "",
      CMSRECID: "",
      currentPage4: 0,
      activeName2: "first",
      tableData: [],
      dialogFormVisible1: false,
      ModelGood: {
        PRODUCT_NO: "",
        SORT: "",
        STATUS: "",
        KIND: "DOC"
      },
      rules: {
        SORT: { validator: checkSort, trigger: "blur" },
        salePrice: { validator: checkSort2, trigger: "blur" },
        PRODUCT_NO: { validator: checkSort1, trigger: "blur" }
      }
    };
  },
  watch: {
    offset: function() {
      var This = this;
      axios
        .get(
          "describe/GetCmsProductTagRef?Code=" +
            this.$route.params.id +
            "&offset=" +
            This.offset +
            "&limit=" +
            This.limit
        )
        .then(function(res) {
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].Price = true;
            if (res.data.rows[i].STATUS == 1) {
              res.data.rows[i].STATUS = true;
            } else {
              res.data.rows[i].STATUS = false;
            }
          }
          This.tableData = res.data.rows;
          This.total1 = res.data.count;
        });
      axios
        .get("describe/GetProDec?RECID=" + this.$route.params.id)
        .then(function(res) {
          if (res.data.START_TIME) {
            var timestamp = new Date(
              res.data.START_TIME.split(".")[0]
                .split("T")
                .join(" ")
            );
            This.value0 = timestamp;
          }

          if (res.data.END_TIME) {
            var timestamp1 = new Date(
              res.data.END_TIME.split(".")[0]
                .split("T")
                .join(" ")
            );
            This.value1 = timestamp1;
          }
          This.CMSTags = res.data;
          var obj = {};
          if (JSON.parse(res.data.IMAGE_URL).length > 0) {
            obj.url =
              JSON.parse(res.data.IMAGE_URL)[0].ServerUrl +
              JSON.parse(res.data.IMAGE_URL)[0].FilePath;
            This.fileList.push(obj);
            This.Image = JSON.parse(res.data.IMAGE_URL);
          }
        });
      axios.get("describe/getPositionList").then(function(res) {
        // console.log(res.data)
        This.List = res.data;
        This.Value = This.CMSTags.POSITION_CODE;
      });
    },
    limit: function() {
      var This = this;
      axios
        .get(
          "describe/GetCmsProductTagRef?Code=" +
            this.$route.params.id +
            "&offset=" +
            This.offset +
            "&limit=" +
            This.limit
        )
        .then(function(res) {
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].Price = true;
            if (res.data.rows[i].STATUS == 1) {
              res.data.rows[i].STATUS = true;
            } else {
              res.data.rows[i].STATUS = false;
            }
          }
          This.tableData = res.data.rows;
          This.total1 = res.data.count;
        });
      axios
        .get("describe/GetProDec?RECID=" + this.$route.params.id)
        .then(function(res) {
          if (res.data.START_TIME) {
            var timestamp = new Date(
              res.data.START_TIME.split(".")[0]
                .split("T")
                .join(" ")
            );
            This.value0 = timestamp;
          }

          if (res.data.END_TIME) {
            var timestamp1 = new Date(
              res.data.END_TIME.split(".")[0]
                .split("T")
                .join(" ")
            );
            This.value1 = timestamp1;
          }
          This.CMSTags = res.data;
          var obj = {};
          if (JSON.parse(res.data.IMAGE_URL).length > 0) {
            obj.url =
              JSON.parse(res.data.IMAGE_URL)[0].ServerUrl +
              JSON.parse(res.data.IMAGE_URL)[0].FilePath;
            This.fileList.push(obj);
            This.Image = JSON.parse(res.data.IMAGE_URL);
          }
        });
      axios.get("describe/getPositionList").then(function(res) {
        This.List = res.data;
        This.Value = This.CMSTags.POSITION_CODE;
      });
    }
  },
  methods: {
    cancel() {
      this.dialogFormVisible1 = false;
    },
    change(item) {
      // console.log(item.row.status)
      var num = "";
      if (item.row.STATUS) {
        num = 0;
        item.row.STATUS = false;
      } else {
        num = 1;
        item.row.STATUS = true;
      }

      axios
        // .get("/describe/Tagstatus?status=" + num + "&Id=" + item.row.RECID)
        .post("/describe/Tagstatus", {
          status: num,
          Id: item.row.RECID
        })
        .then(function(res) {});
    },
    handleCurrentChange(currentPage) {
      this.offset = (currentPage - 1) * this.limit;
    },
    buttonChange(num, item) {
      // console.log(num);
      var num1 = "";
      if (num) {
        num1 = 1;
      } else {
        num1 = 0;
      }

      axios
        .post("/describe/Tagstatus", {
          status: num1,
          Id: item.row.RECID
        })
        .then(function(res) {});
    },
    open(a, b) {
      this.$notify({
        title: a,
        message: b,
        type: "success"
      });
    },
    err(a, b) {
      this.$notify.error({
        title: a,
        message: b
      });
    },
    Blur(item) {
      var This = this;
      if (isNaN(item.row.SORT)) {
        this.err("失败", "不能包含字母，请重新输入");
      } else {
        if (this.sort != item.row.SORT) {
          // console.log(1);
          axios
            .post("/describe/EditGood", {
              RECID: item.row.RECID,
              params: item.row
            })
            .then(function() {
              This.open("成功", "排序修改成功");
            });
        }
        item.row.Price = true;
      }
    },
    focus(item) {
      // this.pic = false
      this.sort = item.row.SORT;
    },
    ChangePrice(item, This) {
      item.row.Price = false;
    },
    save() {
      var This = this;
      if (this.$route.params.id || this.CMSRECID || this.CMSRECID == "0") {
        this.CMSTags.START_TIME = moment(this.value0);
        this.CMSTags.END_TIME = moment(this.value1);
        // console.log(this.CMSTags)
        var obj = {};
        for (var attr in this.CMSTags) {
          obj[attr] = this.CMSTags[attr];
        }
        delete obj.RECID;
        obj.IMAGE_URL = JSON.stringify(this.Image);
        obj.POSITION_CODE = this.Value;
        axios
          .post("/describe/UpdateCMSTAG", {
            RECID: this.CMSTags.RECID,
            params: obj
          })
          .then(function(res) {
            This.open("成功", "修改成功");
          });
      } else {
        this.CMSTags.START_TIME = this.value0;
        this.CMSTags.END_TIME = this.value1;
        this.CMSTags.KIND = "DOC";
        this.CMSTags.STATUS = "1";
        this.CMSTags.IMAGE_URL = JSON.stringify(this.Image);
        this.CMSTags.POSITION_CODE = this.Value;
        this.CMSTags.SORT = 99;
        // console.log(this.CMSTags)
        axios
          .post("/describe/creat", {
            param: this.CMSTags
          })
          .then(function(res) {
            This.CMSRECID = res.data.RECID;
            This.CMSTags.RECID = res.data.RECID;
            This.open("成功", "添加成功");
            This.$router.push({
              name: "ProductTagPage",
              params: { id: res.data.RECID }
            });
            This.show1 = false
          });
      }
    },
    addGood() {
      setTimeout(function() {
        var Model = document.getElementsByClassName("v-modal")[0];
        var body = document.getElementsByTagName("body")[0];
        body.removeChild(Model);
      }, 20);
      this.dialogFormVisible1 = true;
      this.ModelGood.PRODUCT_NO = "";
      this.ModelGood.SORT = "99";
      this.ModelGood.STATUS = this.value;
    },
    comfire() {
      var This = this;
      this.$refs["ModelGood"].validate(valid => {
        if (valid) {
          var obj = {};
          var This = this;
          obj.PRODUCT_NO = this.ModelGood.PRODUCT_NO;
          obj.SORT = this.ModelGood.SORT;
          this.ModelGood.STATUS = this.value;
          obj.STATUS = this.ModelGood.STATUS;
          axios
            .post("/describe/EditGood", {
              RECID: this.RECID,
              params: obj
            })
            .then(function(res) {});
          this.dialogFormVisible1 = false;
        } else {
          this.dialogFormVisible1 = true;
          return;
        }
      });
    },
    handleSuccess(response, filelist1) {
      this.fileList = [];
      this.obj.url = response.ServerUrl + response.FilePath;
      this.Image = [];
      this.fileList.push(this.obj);
      this.Image.push(response);
    },
    beforeLeave() {
      return false;
    },
    open4() {
      this.$message.error("错误提示，请先保存专题再进行其他操作");
    },
    handleClick(tab) {
      sessionStorage.setItem("key", tab.name);
    },
    save1() {
      var This = this;
      this.$refs["ModelGood"].validate(valid => {
        if (valid) {
          this.dialogFormVisible1 = false;
          this.ModelGood.STATUS = this.value;
          this.ModelGood.RELATION_CODE = this.CMSTags.RECID;
          var obj = {};
          for (var attr in this.ModelGood) {
            obj[attr] = this.ModelGood[attr];
          }
          obj.Price = true;
          obj.STATUS = true;
          this.tableData.push(obj);
          axios
            .post("/describe/addOne", {
              param: this.ModelGood
            })
            .then(function(res) {});
        } else {
          this.dialogFormVisible1 = true;
          return;
        }
      });
    },
    del(item, all) {
      var This = this;
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          all.splice(item.$index, 1);
          axios
            .get("/describe/deleteOne?RECID=" + item.row.RECID)
            .then(function(res) {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
        tipopen() {
        this.$message({
          showClose: true,
          message: '保存专题后即可点击商品',
          duration:0,
        });
      },
    edit(item) {
      setTimeout(function() {
        var Model = document.getElementsByClassName("v-modal")[0];
        var body = document.getElementsByTagName("body")[0];
        body.removeChild(Model);
      }, 20);
      this.RECID = item.row.RECID;
      this.ModelGood = item.row;
      this.dialogFormVisible1 = true;
      this.show = false;
    }
  },
  created() {
    if (sessionStorage.getItem("key")) {
      this.activeName2 = sessionStorage.getItem("key");
    }
    var This = this;
    if (this.$route.params.id) {
      This.show1 = false
      axios
        .get(
          "describe/GetCmsProductTagRef?Code=" +
            this.$route.params.id +
            "&offset=" +
            This.offset +
            "&limit=" +
            This.limit
        )
        .then(function(res) {
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].Price = true;
            if (res.data.rows[i].STATUS == 1) {
              res.data.rows[i].STATUS = true;
            } else {
              res.data.rows[i].STATUS = false;
            }
          }
          This.tableData = res.data.rows;
          This.total1 = res.data.count;
        });
      axios
        .get("describe/GetProDec?RECID=" + this.$route.params.id)
        .then(function(res) {
          if (res.data.START_TIME) {
            var timestamp = new Date(
              res.data.START_TIME.split(".")[0]
                .split("T")
                .join(" ")
            );
            This.value0 = timestamp;
          }

          if (res.data.END_TIME) {
            var timestamp1 = new Date(
              res.data.END_TIME.split(".")[0]
                .split("T")
                .join(" ")
            );
            This.value1 = timestamp1;
          }
          This.CMSTags = res.data;
          var obj = {};
          if (JSON.parse(res.data.IMAGE_URL).length > 0) {
            obj.url =
              JSON.parse(res.data.IMAGE_URL)[0].ServerUrl +
              JSON.parse(res.data.IMAGE_URL)[0].FilePath;
            This.fileList.push(obj);
            This.Image = JSON.parse(res.data.IMAGE_URL);
          }
        });
      axios.get("describe/getPositionList").then(function(res) {
        // console.log(res.data)
        This.List = res.data;
        This.Value = This.CMSTags.POSITION_CODE;
      });
    } else {
      this.tipopen()
      axios.get("/server/UuId").then(function(res) {
        // this.Code = res.data
        axios.get("describe/getPositionList").then(function(res) {
          This.List = res.data;
        });
        This.code = res.data;
      });
    }
  }
};
</script>
<style type="text/css">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 100px;
  text-align: center;
  /*color: #99a9bf;*/
  color: black;
}
.demo-table-expand .el-form-item {
  width: 50%;
}
.el-form-item__content {
  width: 70%;
}
.demo-table-expand .floor {
  width: 100%;
}
.el-upload-list--picture .el-upload-list__item-thumbnail {
  width: auto;
}

.floor .cell img {
  height: 60px;
  width: 280px;
}
.right .el-form-item__label {
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  padding-left: 40%;
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  font-weight: 600;
  color: black;
}
.block {
  float: left;
}
.right .el-form-item__content {
  width: 100%;
}
.el-form-item__label {
  color: black;
}
.content {
  width: 88%;
  box-sizing: border-box;
  margin: 0 auto;
}
.floorGoo .el-form-item__content {
  width: 90%;
}
#floor #dl .el-form-item {
  width: 100%;
}
#floor #dl .short {
  width: 48%;
}
#dl .el-form-item__content {
  width: 80%;
}
#floor .demo-table-expand label {
  width: 8%;
}
#floor .demo-table-expand .el-form-item__label {
  width: 90px;
}

#floor #seach .el-form {
  width: 100%;
}

#floor #seach .el-form .el-form-item {
  width: 30%;
  float: left;
}
a {
  text-decoration: none;
  color: #5a5e66;
}
.upload-demo {
  width: 60%;
}
.upload-demo img {
  width: 200px;
}

.el-dialog__body {
  padding-top: 0;
}
#floor .el-upload img {
  width: 2;
}
.el-upload-list--picture .el-upload-list__item-thumbnail {
  width: 400px;
}
.cell {
  text-align: center;
}
.one .el-upload-list--picture .el-upload-list__item-thumbnail {
  width: 250px;
}

#dl .el-input {
  width: 80%;
}
#dl .el-form {
  padding-left: 30px;
  box-sizing: border-box;
}
.el-dialog__header {
  height: 40px;
  line-height: 40px;
}
.edit .el-tabs__content {
  border: 1px solid #dfe4ed;
}
.aa .el-form-item__content {
  width: 100%;
}
.aaa .el-form-item__content {
  width: 100%;
}
.sta .el-form-item__content {
  width: 100%;
}
.floor input {
  border: 0px;
  text-align: center;
}
.el-tabs__content {
  border: 1px solid #dfe4ed;
}
.el-submenu .el-menu-item {
  min-width: 10%;
}
.el-tabs__content {
  min-height: 600px;
}
.el-tabs__content {
  min-height: 600px;
}
.el-switch {
  height: 23px;
  line-height: 23px;
}
</style>

