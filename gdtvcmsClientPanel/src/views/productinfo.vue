<template>
	<div style='width:100%;height:auto;padding-top:35px;margin:0 auto;' class='productTag'>
  		<el-tabs v-model="activeName2" type="card"  class='one' @tab-click="handleClick">
    <el-tab-pane label="专题" name="first" >
		<div style='width:70%; float:left; padding-top:30px;margin:0 auto;padding-bottom:30px; '>
		<el-form   :model="CMSTags"  class='demo-table-expand' inline >
		  <el-form-item label='标题' props = 'TITLE' style='width:100%;text-align:left;'>
		       <el-input v-model="CMSTags.title"></el-input>
		  </el-form-item>
		  <el-form-item label='描述' props = 'TITLE' style='width:100%;text-align:left;'>
		       <el-input v-model="CMSTags.shortDesc"></el-input>
		  </el-form-item>
		  <el-form-item label='排序' props = 'showOrder' style='width:100%;text-align:left;'>
		       <el-input v-model="CMSTags.showOrder"></el-input>
		  </el-form-item>
		  <el-form-item label='KIND' props = 'TITLE' style='width:100%;text-align:left;'>
		       <el-input v-model="CMSTags.kind"></el-input>
		  </el-form-item>
		  <el-form-item label='链接' props = 'TITLE' style='width:100%;text-align:left;'>
		       <el-input v-model="CMSTags.url"></el-input>
		  </el-form-item>
		  <el-form-item label='概要' props = 'summary' style='width:100%;text-align:left;'>
		       <!-- <el-input v-model="CMSTags.summary"></el-input> -->
		        <el-input
		          type="textarea"
		          :autosize="{ minRows: 2, maxRows: 4}"
		          placeholder="请输入内容"
		          v-model="CMSTags.summary">
		        </el-input>   		       
		  </el-form-item>
		  <el-form-item label='内容' props = 'summary' style='width:100%;text-align:left;'>
		       <!-- <el-input v-model="CMSTags.content"></el-input> -->
		              <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="CMSTags.content">
        </el-input>   
		  </el-form-item>

		</el-form>
		</div>
		 <el-button type="primary" style='float:right;position:absolute;right:30px;bottom:30px;box-shadow:1px 1px 1px #ccc;' @click='save1()'  >保存</el-button>
		    </el-tab-pane>
    <el-tab-pane label="商品" name="two" >
		<el-card class="box-card"  >
		  <div slot="header" class="clearfix">
			<el-form :inline="true" class="demo-form-inline" style='width:70%;'>
			  <el-form-item  style='' class='ttsearch'>
			  	<el-input v-model="SelectData" placeholder='标题、编码'></el-input>
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
			    <el-button type="primary" @click='add()'>添加</el-button>
			  </el-form-item>	  
			</el-form>
		  </div>
		</el-card>
		<div style='width:100%; padding-bottom:30px; '>
          <el-table :data="tableData" border style="width: 100%">
        <el-table-column  label="信息" >
          <template slot-scope="scope">
            <a :href="tableData[scope.$index].url" target="_blank">{{tableData[scope.$index].title}}[{{tableData[scope.$index].productNo}}]</a>
          </template>
        </el-table-column>     
        <el-table-column prop="memo"  label="描述" width="300">
        </el-table-column>
        <el-table-column prop="imageUrl"  label="图片" width="300">
          <template slot-scope='scope'>
                            <div v-if='scope.row.imageUrl'>
                  <!-- {{scope.row.imageUrl}} -->
                  <img :src="JSON.parse(scope.row.imageUrl)[0].ServerUrl+JSON.parse(scope.row.imageUrl)[0].FilePath" alt="" >
                  <!-- {{JSON.parse(scope.row.imageUrl)[0].ServerUrl+JSON.parse(scope.row.imageUrl)[0].FilePath}} -->
                </div>
                <div v-else>
                    未设置
                </div>
          </template>
        </el-table-column>
        <el-table-column prop="salePrice"  label="价格" width="100">

            <template slot-scope="scope">
                <div v-if='scope.row.salePrice'>
                  {{scope.row.salePrice}}
                </div>
                <div v-else>
                    未设置
                </div>
            </template>

        </el-table-column>
        <el-table-column prop="sort" label="排序"  width="100" >
            <template slot-scope="scope">
                   <el-button @click="ChangePrice(scope,this)" style='border:0px;' v-if='scope.row.Price'><i class="el-icon-edit"></i>{{scope.row.sort}}</el-button>
              <el-input style='text-align:center;border:0px;' v-model='scope.row.sort' v-else  @blur="Blur(scope)" @focus="focus(scope)" ></el-input>
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
        <el-table-column prop="" label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" @click='edit1(scope.row)' size="small">编辑</el-button>
            <el-button  type="danger"  @click="removegood(scope.row,scope.$index,tableData)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
		  <div class="block">
		    <el-pagination  @current-change="handleCurrentChange"  :current-page="currentPage4" :page-sizes="[limit]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total1">
		    </el-pagination>
 		 </div>
		</div>  
	</el-tab-pane>
  		</el-tabs>
<el-dialog title="楼层商品" v-if='show' :visible.sync="dialogFormVisible1" id="dl" width='80%'  style='left:4%;border-top:1px #fff solid;'>
 <div style="width:50%;float:left;box-sizing:border-box;" >
  <el-input placeholder="标题或编码" v-model="insertcontent" class="input-with-select" style='width:50%;'>
    <el-button slot="append" icon="el-icon-search" @click='search()'></el-button>
  </el-input>
<el-table
    ref="singleTable"
    :data="searchtableData"
    highlight-current-row
    @current-change="handleCurrentChange1"
    style="width: 100%;float:left;" >
    <el-table-column
      property="productNo"
      label="信息"
      style='width:100%;'
      >
    <template slot-scope='scope'>
     {{scope.row.productName}}[{{scope.row.productNo}}]
    </template>
    </el-table-column>
    <el-table-column
      property="address"
      label="图片"
      style='width:20%;'
      >
          <template slot-scope='scope'>
                            <div v-if='scope.row.imageUrl'>
                  <img :src="scope.row.productImg" alt="" style='width:20%;'>
                </div>
                <div v-else>
                    未设置
                </div>
          </template>
    </el-table-column>
  </el-table>  
		  <div class="block">
		    <el-pagination  v-if="infototal > 3 "  @current-change="handleCurrentChangeinfo"  :current-page="currentPage4" :page-sizes="[infolimit]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="infototal">
		    </el-pagination>
 		 </div>
  </div>
  <div style='width:50%;float:left;'>
  <el-form :model="ModelGood"  :rules="rules" ref='ModelGood'>
    <el-form-item label="标题" >
      <el-input v-model="ModelGood.title" ></el-input>
    </el-form-item>
    <el-form-item label="描述" >
      <el-input v-model="ModelGood.memo" ></el-input>
    </el-form-item>
    <el-form-item label="编码" class='short' prop='productNo'>
      <el-input v-model="ModelGood.productNo"></el-input>
    </el-form-item>
    <el-form-item label="价格"  class='short' prop='salePrice'>
      <el-input v-model="ModelGood.salePrice" ></el-input>
    </el-form-item>
    <el-form-item label="排序"   class='short' prop='sort'>
      <el-input v-model="ModelGood.sort" ></el-input>
    </el-form-item>

    <el-form-item label="连接" >
      <template>
        <div>
          <el-input placeholder="请输入内容"  v-model="ModelGood.url">
            <el-button slot="append" icon="el-icon-arrow-right"  @click="ProductLink()"></el-button>
          </el-input>
        </div>
      </template>
    </el-form-item>  
  <el-form-item label='图片'  style='width:100%;text-align:left;'>
    <template>
      <el-upload class="upload-demo" ref="upload" action="/server/file" :on-success='handleSuccess1' :file-list="fileList1" list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>        
    </template>
  </el-form-item>         
  </el-form>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click="save()" v-if='show'>保 存</el-button>
    <el-button type="primary" @click="comfire()" v-else>确定</el-button>
  </div>
</el-dialog>

<el-dialog title="楼层商品" :visible.sync="dialogFormVisible1" id="dl" v-else>
  <el-form :model="ModelGood"  :rules="rules" ref='ModelGood'>
    <el-form-item label="标题" >
      <el-input v-model="ModelGood.title" ></el-input>
    </el-form-item>
    <el-form-item label="描述" >
      <el-input v-model="ModelGood.memo" ></el-input>
    </el-form-item>
    <el-form-item label="编码" class='short' prop='productNo'>
      <el-input v-model="ModelGood.productNo"></el-input>
    </el-form-item>
    <el-form-item label="价格"  class='short' prop='salePrice'>
      <el-input v-model="ModelGood.salePrice" ></el-input>
    </el-form-item>
    <el-form-item label="排序"   class='short' prop='sort'>
      <el-input v-model="ModelGood.sort" ></el-input>
    </el-form-item>
    <!-- <el-form-item label="状态"  class='short'>
      <el-select v-model="value" placeholder="请选择活动区域">
        <el-option label="有效" value="1"></el-option>
        <el-option label="无效" value="0"></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="连接" >
      <template>
        <div>
          <el-input placeholder="请输入内容"  v-model="ModelGood.url">
            <el-button slot="append" icon="el-icon-arrow-right"  @click="ProductLink()"></el-button>
          </el-input>
        </div>
      </template>
    </el-form-item> 
  <el-form-item label='图片'  style='width:100%;text-align:left;'>
    <template>
      <el-upload class="upload-demo" ref="upload" action="/server/file" :on-success='handleSuccess1' :file-list="fileList1" list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>        
    </template>
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
import axios from "axios";
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
      Image: [],
      CMSTags: {},
      infototal:null,
      infooffset:0,
      infolimit:4,
      Good: "",
      show: true,
      sort: null,
      SelectData: "",
      Status: "2",
      show: true,
      value: "0",
      value0: "",
      value1: "",
      insertcontent:'',
      searchtableData:[],
      RECID: "",
      limit: 10,
      offset: 0,
      code: "",
      fileList1: [],
      currentPage4: 0,
      CMSRECID: "",
      total1: null,
      activeName2: "first",
      tableData: [],
      dialogFormVisible1: false,
      ModelGood: {
        productNo: "",
        title: "",
        memo: "",
        salePrice: "",
        sort: "",
        status: "",
        url: "",
        relationCode: "",
        relationKind: "article"
      },
      rules: {
        SORT: { validator: checkSort, trigger: "blur" },
        salePrice: { validator: checkSort2, trigger: "blur" },
        PRODUCT_NO: { validator: checkSort1, trigger: "blur" }
      }
    };
  },
  watch: {
    infooffset: function() {
      var This = this;
      this.code = this.$route.params.id;
             axios
          .get(
          "/api/getProductInfo?search=" +
            this.insertcontent+
            "&offset=" +
            this.infooffset +
            "&limit=" +
            this.infolimit 
        )
 .then(function(res) {
            if(res.data.rows){
            res.data.rows.map(function(data) {
              if (data.productImage) {
                data.imageUrl = [];
                data.imageUrl.push(JSON.parse(data.productImage)[0]);
                data.productImg =
                  JSON.parse(data.productImage)[0].ServerUrl +
                  JSON.parse(data.productImage)[0].FilePath +
                  ".thumb." +
                  JSON.parse(data.productImage)[0].FileExt;
              }
              
            });
            This.searchtableData = res.data.rows
            }
                This.infototal = res.data.count;

          });
    },
    offset: function() {
      var This = this;
      this.code = this.$route.params.id;
      axios
        .get(
          "articleinfo/GetCmsProductRef?Code=" +
            this.$route.params.id +
            "&offset=" +
            this.offset +
            "&limit=" +
            this.limit +
            "&title=" +
            this.SelectData +
            "&status=" +
            this.Status
        )
        .then(function(res) {
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].Price = true;
            if (res.data.rows[i].status == 1) {
              res.data.rows[i].status = true;
            } else {
              res.data.rows[i].status = false;
            }
          }
          This.tableData = res.data.rows;
          This.total1 = res.data.count;
        });
    },
    SelectData: function(old) {
      if (old) {
      } else {
        this.SelectData = "";
        var This = this;
        axios
          .get(
            "/articleinfo/GetCmsProductRef?Code=" +
              this.$route.params.id +
              "&offset=" +
              this.offset +
              "&limit=" +
              this.limit +
              "&title=" +
              this.SelectData +
              "&status=" +
              this.Status
          )
          .then(function(res) {
            for (var i = 0; i < res.data.rows.length; i++) {
              res.data.rows[i].Price = true;
              if (res.data.rows[i].status == 1) {
                res.data.rows[i].status = true;
              } else {
                res.data.rows[i].status = false;
              }
            }
            This.tableData = res.data.rows;

            This.total1 = res.data.count;
          });
      }
    }
  },

  methods: {
    ProductLink(href){
      var arr = this.ModelGood.url;
      window.open(arr)
    },
    search() {
      this.currentPage4 = 0
        this.infototal = 0
        this.infooffset = 0 
      var This = this;
      This.searchtableData = [];
      if (this.insertcontent) {
        axios
          .get(
          "/api/getProductInfo?search=" +
            this.insertcontent+
            "&offset=" +
            this.infooffset +
            "&limit=" +
            this.infolimit 
        )
 .then(function(res) {
            if(res.data.rows){
            res.data.rows.map(function(data) {
              if (data.productImage) {
                data.imageUrl = [];
                data.imageUrl.push(JSON.parse(data.productImage)[0]);
                data.productImg =
                  JSON.parse(data.productImage)[0].ServerUrl +
                  JSON.parse(data.productImage)[0].FilePath +
                  ".thumb." +
                  JSON.parse(data.productImage)[0].FileExt;
              }
              
            });
            This.searchtableData = res.data.rows
            }
                This.infototal = res.data.count;

          });
      } else {
        this.insertcontent = "请输入正确的标题或编码";
      }
    },
    handleCurrentChange1(val) {

      // ModelGood: {
      //   productNo: "",
      //   title: "",
      //   memo: "",
      //   salePrice: "",
      //   sort: "99",
      //   status: "",
      //   url: "https://gdtvshop.weixinmvp.com/Wap/Shop/ProductDetail.aspx?no=",
      //   relationCode: "",
      //   relationKind: "specialactivity"
      // },
       if(val){
      this.fileList1  = []
      this.ModelGood.productNo = val.productNo
      this.ModelGood.title = val.productName
      this.ModelGood.memo = val.shortDesc
      this.ModelGood.sort = val.sort
      this.ModelGood.salePrice = val.salePrice
      this.ModelGood.url = "https://gdtvshop.weixinmvp.com/wap/shop/productdetail.aspx?no="+val.productNo
       this.Image = [];
      this.fileList1 = [];
      if(val.imageUrl[0]){
      this.Image = val.imageUrl
      }
      var obj = {};
      obj.url = val.productImg
      this.fileList1.push(obj);
       }
    },
    handleCurrentChangeinfo(currentPage){
      this.infooffset = (currentPage - 1) * this.infolimit;
    },
    open(a, b) {
      this.$notify({
        title: a,
        message: b,
        type: "success"
      });
    },
    handleClick(tab) {
      sessionStorage.setItem("key", tab.name);
    },
    cancel() {
      this.dialogFormVisible1 = false;
      this.ModelGood.productNo = "";
      this.ModelGood.title = "";
      this.ModelGood.memo = "";
      this.ModelGood.salePrice = "";
      this.ModelGood.sort = "";
      this.ModelGood.status = "";
      this.ModelGood.url = "";
      this.ModelGood.relationCode = this.code;
      this.fileList1 = [];
    },
    save() {
      var This = this;
      this.$refs["ModelGood"].validate(valid => {
        if (valid) {
          this.dialogFormVisible1 = false;
          this.ModelGood.status = this.value;
          // console.log(this.Image)
          if (this.Image.length == 1) {
            this.ModelGood.imageUrl = JSON.stringify(this.Image);
          } else {
            delete this.ModelGood.imageUrl;
          }
          if (!this.ModelGood.salePrice) {
            delete this.ModelGood.salePrice;
          }
          if (this.ModelGood.recid) {
            delete this.ModelGood.recid;
          }
          // console.log(this.ModelGood);
          axios
            .post("/articleinfo/addOne",{
              param:this.ModelGood
            })
            .then(function(res) {
              let obj = {};
              obj.recid = res.data.recid;
              for (var attr in This.ModelGood) {
                obj[attr] = This.ModelGood[attr];
              }
              if (This.Image.length == 1) {
                obj.imageUrl = JSON.stringify(This.Image);
              } else {
                obj.imageUrl = null;
              }

              if (This.tableData) {
              } else {
                This.tableData = [];
              }
              obj.status = true;
              obj.Price = true;
              This.tableData.unshift(obj);
              // console.log(This.tableData);
              This.open("成功", "保存成功");
            });
        } else {
          this.dialogFormVisible1 = true;
          return;
        }
      });
    },
    comfire() {
      var This = this;
      this.$refs["ModelGood"].validate(valid => {
        if (valid) {
          this.dialogFormVisible1 = false;
          // this.Good 修改单条数据
          for (var attr in this.ModelGood) {
            this.Good[attr] = this.ModelGood[attr];
          }
          if (this.ModelGood.salePrice) {
          } else {
            delete this.ModelGood.salePrice;
          }
          if (this.Image.length) {
            this.ModelGood.imageUrl = JSON.stringify(this.Image);
            this.Good.imageUrl = JSON.stringify(this.Image);
          }else{
            delete  this.ModelGood.imageUrl
          }
          axios
          .post("/articleinfo/update", {
            RECID: this.Good.recid,
            param: this.ModelGood
          })
          .then(function(res) {
            This.open("成功", "保存成功");
            This.Image = [];
          });
        } else {
          this.dialogFormVisible1 = true;
          return;
        }
      });
    },

    edit1(item) {
      this.show = false;
      this.Good = item;
      this.fileList1 = []
      this.dialogFormVisible1 = true;
      if(this.Good.imageUrl){
      var obj = {}
      obj.url = JSON.parse(this.Good.imageUrl)[0].ServerUrl + JSON.parse(this.Good.imageUrl)[0].FilePath;
      this.fileList1.push(obj)
      }
   
      for (var attr in item) {
        this.ModelGood[attr] = item[attr];
      }

      setTimeout(function() {
        var Model = document.getElementsByClassName("v-modal")[0];
        var body = document.getElementsByTagName("body")[0];
        body.removeChild(Model);
      }, 20);
    },
    add() {
      this.Image = [];
      this.searchtableData = [];
      this.insertcontent = '';
      this.infototal = 0;
      this.fileList1 = [];
      setTimeout(function() {
        var Model = document.getElementsByClassName("v-modal")[0];
        var body = document.getElementsByTagName("body")[0];
        body.removeChild(Model);
      }, 20);
      this.show = true;
      this.dialogFormVisible1 = true;
      this.ModelGood.productNo = "";
      this.ModelGood.title = "";
      this.ModelGood.memo = "";
      this.ModelGood.salePrice = "";
      this.ModelGood.sort = "99";
      this.ModelGood.status = "";
      this.ModelGood.url = "";
      this.ModelGood.relationCode = this.code;
      this.dialogFormVisible1 = true;
    },
    handleSuccess1(res) {
      this.Image = [];
      this.fileList1 = [];
      this.Image.push(res);
      var obj = {};
      obj.url = res.ServerUrl + res.FilePath;
      this.fileList1.push(obj);
    },
    onSubmit() {
      var This = this;
      axios
        .get(
          "/articleinfo/GetCmsProductRef?Code=" +
            this.$route.params.id +
            "&offset=" +
            this.offset +
            "&limit=" +
            this.limit +
            "&title=" +
            this.SelectData +
            "&status=" +
            this.Status
        )
        .then(function(res) {
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].Price = true;
            if (res.data.rows[i].status == 1) {
              res.data.rows[i].status = true;
            } else {
              res.data.rows[i].status = false;
            }
          }
          This.tableData = res.data.rows;
          This.total1 = res.data.count;
        });
    },
    save1() {
      var This = this;
      if (this.$route.params.id || this.code) {
        axios
          .post("/articleinfo/UpdateArtical", {
            RECID: this.CMSTags.recid,
            param: this.CMSTags
          })
          .then(function(res) {
            This.open("成功", "保存成功");
          });
      } else {
        this.CMSTags.createDate = new Date();
        this.CMSTags.updateDate = new Date();
        this.CMSTags.typeId = 0;
        this.CMSTags.status = 1;
        axios
          .post("/articleinfo/creat", { param: this.CMSTags })
          .then(function(res) {
            This.code = res.data.recid;
            This.CMSTags.recid = res.data.recid;
            This.open("成功", "保存成功");
          });
      }
    },

    handleCurrentChange(currentPage) {
      this.offset = (currentPage - 1) * this.limit;
    },
      err(a,b) {
        this.$notify.error({
          title: a,
          message: b
        });
      },
    Blur(item) {
      var This = this;
      if(isNaN(item.row.sort)){
        this.err("失败", "不能包含字母，请重新输入");
      }else{
      if (this.sort != item.row.sort) {
        axios
          .post('/articleinfo/update',{
            RECID:item.row.recid,
            param : item.row
          })
          .then(function(res) {
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
    buttonChange(num, item) {
      // console.log(num)
      var num1 = "";
      if (num) {
        num1 = 1;
      } else {
        num1 = 0;
      }

      axios
        .get("/articleinfo/Goodstatus?status=" + num1 + "&Id=" + item.row.recid)
        .then(function(res) {});
    },
    removegood(item, index, all) {
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

          var This = this;
          all.splice(index, 1);
          This.total1 -= 1;
          // for(var i =0;i<this.AllGoods.length;i++){
          //  if( this.AllGoods[i].RECID == item.RECID){
          //    this.AllGoods.splice(i,1)
          //  }
          //  // console.log(this.AllGoods[i])
          // }
          axios
            .get("/articleinfo/deleteOne?RECID=" + item.recid)
            .then(function(res) {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    if (sessionStorage.getItem("key")) {
      this.activeName2 = sessionStorage.getItem("key");
    }
    if (this.$route.params.id) {
      this.activeName2 = "two";
      var This = this;
      this.code = this.$route.params.id;
      axios
        .get(
          "articleinfo/GetCmsProductRef?Code=" +
            this.$route.params.id +
            "&offset=" +
            this.offset +
            "&limit=" +
            this.limit +
            "&title=" +
            this.SelectData +
            "&status=" +
            this.Status
        )
        .then(function(res) {
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].Price = true;
            if (res.data.rows[i].status == 1) {
              res.data.rows[i].status = true;
            } else {
              res.data.rows[i].status = false;
            }
            if (res.data.rows[i].imageUrl == null || res.data.rows[i].imageUrl == '') {
            } else {
              // if (
              //   JSON.parse(res.data.rows[i].imageUrl)[0].ServerUrl ==
              //     "http://cmsuser.weixinmvp.com" ||
              //   JSON.parse(res.data.rows[i].imageUrl)[0].ServerUrl ==
              //     "http://192.168.0.32:3000" ||
              //   JSON.parse(res.data.rows[i].imageUrl)[0].ServerUrl ==
              //     "http://localhost:3000" ||  JSON.parse(res.data.rows[i].imageUrl)[0].ServerUrl ==
              //     "http://gdtvimg.weixinmvp.com"
              // ){
              
              // } else {
              //   res.data.rows[i].imageUrl = null;
              // }
            }
          }
          This.tableData = res.data.rows;
          This.total1 = res.data.count;
        });
      axios
        .get("articleinfo/GetOneSArticleInfo?RECID=" + this.$route.params.id)
        .then(function(res) {
          This.CMSTags = res.data;
           This.ModelGood.relationKind = res.data.kind
        });
    } else {
      this.activeName2 = "first";
    }
  }
};
</script>
<style type="text/css">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 20%;
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
  width: 84%;
  box-sizing: border-box;
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
/*#floor .demo-table-expand .el-form-item__label{
  width:50%;
}*/
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
#floor .upload-demo {
  position: relative;
  height: 160px;
}
#floor .el-upload .el-button {
  position: absolute;
  bottom: 8px;
  left: 0;
}
#floor .el-upload-list {
  position: absolute;
  top: 0;
  left: 0;
}
#floor .el-upload__tip {
  position: absolute;
  bottom: 0;
  left: 120px;
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
.content {
  width: 88%;
  margin: 0 auto;
}
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
  border: 1px solid #ccc;
}
.el-submenu .el-menu-item {
  min-width: 10%;
}
.el-switch {
  height: 23px;
  line-height: 23px;
}
</style>