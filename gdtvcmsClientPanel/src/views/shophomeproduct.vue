<template>
	<div style='width:100%;height:auto;padding-top:35px;margin:0 auto;' id='shophome'>
  		<el-tabs v-model="activeName2" type="card"  class='one' @tab-click="handleClick">
    <el-tab-pane label="商品" name="two" >
		<el-card class="box-card"  >
		  <div slot="header" class="clearfix">
			<el-form :inline="true" class="demo-form-inline" style='width:70%;'>
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
			    <el-button type="primary" @click='add()'>添加</el-button>
			  </el-form-item>	  
			</el-form>
		  </div>
		</el-card>
		<div style='width:100%; padding-bottom:30px; '>
          <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="expand"   v-if='cateFlag'>
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
            <el-table border
              :data="JSON.parse(props.row.navigationConfig)"
              style="width: 100%">
              <el-table-column
                label="Id"
                prop="Id">
              </el-table-column>
              <el-table-column
                label="标题"
                prop="Title">
              </el-table-column>
              <el-table-column
                label="描述"
                prop="Describe">
              </el-table-column>
              <el-table-column
                label="图片"
                prop="Image">
                   <template slot-scope='scope'>
                            <div v-if='scope.row.Image'>
                  <img :src="scope.row.Image.ServerUrl+scope.row.Image.FilePath" alt="" style='max-height:80px;max-width:150px;'>
                </div>
                <div v-else>
                    未设置
                </div>
          </template>
              </el-table-column>     
        <el-table-column prop="status" label="状态" width='100'>
			    	<template slot-scope="scope">
					<el-switch
					  v-model="scope.row.status"
					  active-color="#409EFF"
					  inactive-color="#909399"
					  	@change="buttonChange1(scope.row.status,scope, props)"
					  >
					</el-switch>		
          	    
			    	</template>
        </el-table-column>                       
        <el-table-column prop="" label="操作" width='300' >
          <template slot-scope="scope">
            <el-button type="primary" @click="up(scope.row,scope,props.row)" size="small">上移</el-button>
            <el-button type="primary"   @click="down(scope.row,scope,props.row)" size="small">下移</el-button>
            <el-button type="primary"  @click="cateEdit(scope.row,scope.$index,props.row)"  size="small">编辑</el-button>
            <el-button type="danger" @click="catedel(scope.row,scope.$index,props.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
            </el-table>
        </el-form>
      </template>
    </el-table-column>
        <el-table-column  label="信息" >
          <template slot-scope="scope">
            <a :href="tableData[scope.$index].url" target="_blank" style='text-decoration:underline;' v-if='tableData[scope.$index].productNo'>{{tableData[scope.$index].title}}[{{tableData[scope.$index].productNo}}]</a>
            <a :href="tableData[scope.$index].url" target="_blank" v-else >{{tableData[scope.$index].title}}</a>
          </template>
        </el-table-column>     
        <el-table-column prop="describe"  label="描述" width="150">
            <template slot-scope='scope'>
              <div v-if='scope.row.describe'>{{scope.row.describe}}</div>
              <div v-else>
                  未设置
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="imageUrl"  label="图片" >
          <template slot-scope='scope'>
                            <div v-if='scope.row.imageUrl'>
                  <img :src="JSON.parse(scope.row.imageUrl)[0].ServerUrl+JSON.parse(scope.row.imageUrl)[0].FilePath" alt="" style='max-height:80px;max-width:150px;'>
                </div>
                <div v-else>
                    未设置
                </div>
          </template>
        </el-table-column>
			    <el-table-column label="时间" width="400" >
			    <!-- <el-table-column label="时间" width="500" v-if="oKind == 'IMAGE'"> -->
			    	<template slot-scope="scope">
              <div>
                  <el-date-picker
                    :change='timeChange(scope.row.timeRange,scope)'
                    v-model="scope.row.timeRange"
                    type="datetimerange"
                    range-separator="至"

                    start-placeholder="选择开始日期"
                    end-placeholder="选择结束日期">
                  </el-date-picker>
              </div>
			    	</template>
			    </el-table-column>
        <el-table-column prop="param1"  label="价格" >
            <template slot-scope="scope">
                <div v-if='scope.row.param1'>
                  {{scope.row.param1}}
                </div>
                <div v-else>
                    未设置
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"   width='100'>
            <template slot-scope="scope">
                   <el-button @click="ChangePrice(scope,this)" style='border:0px;' v-if='scope.row.Price'><i class="el-icon-edit"></i>{{scope.row.sort}}</el-button>
              <el-input style='text-align:center;border:0px;' v-model='scope.row.sort' v-else  @blur="Blur(scope)" @focus="focus(scope)" ></el-input>
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
        <el-table-column prop="" label="操作" width='300' >
          <template slot-scope="scope">
            <el-button type="primary" @click='edit2(scope.row)' size="small" v-if='cateFlag'>添加</el-button>
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
<el-dialog title="添加商品" v-if="oKind != 'IMAGE' && show" :visible.sync="dialogFormVisible1" id="dl" width='80%' style='left:4%;height:auto;border-top:1px #fff solid;'>
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
    <!-- <el-table-column
      property="shortDesc"
      label="描述"
      style='width:30%;'
     >
    </el-table-column> -->
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
		    <el-pagination  v-if="infototal > 4 "  @current-change="handleCurrentChangeinfo"  :current-page="currentPage4" :page-sizes="[infolimit]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="infototal">
		    </el-pagination>
 		 </div>
  </div>
  <div style='width:50%;float:left;box-shadow:2px 2px 2px #ccc;'>
  <el-form :model="ModelGood"   ref='ModelGood'>
    <el-form-item label="标题" >
      <el-input v-model="ModelGood.title" ></el-input>
    </el-form-item>
    <el-form-item label="描述" >
      <el-input v-model="ModelGood.describe" ></el-input>
    </el-form-item>
    <el-form-item label="编码" class='short' prop='productNo' v-if="oKind != 'IMAGE'">
      <el-input v-model="ModelGood.productNo"></el-input>
    </el-form-item>
    <el-form-item label="价格"  class='short' prop='param1' v-if="oKind != 'IMAGE'">
      <el-input v-model="ModelGood.param1" ></el-input>
    </el-form-item>
    <el-form-item label="排序"   class='short' prop='sort'>
      <el-input v-model="ModelGood.sort" ></el-input>
    </el-form-item>
    <el-form-item label="时间" v-if='show' >
      <div class="block"  style='width:auto;' >
        <el-date-picker
          v-model="timevalue"
          type="datetimerange"
          range-separator="至"
          value-format='yyyy-MM-dd HH:mm:ss'
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </el-form-item>


    <el-form-item label="连接" >
      <template>
        <div>
          <el-input placeholder="请输入内容"  v-model="ModelGood.url">
            <el-button slot="append" icon="el-icon-arrow-right" @click="ProductLink(this)"></el-button>
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
    <el-button type="primary" @click="comfire()" v-else>确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="楼层商品" v-else :visible.sync="dialogFormVisible1" id="dl">
  <el-form :model="ModelGood"   ref='ModelGood'>
    <el-form-item label="标题" >
      <el-input v-model="ModelGood.title" ></el-input>
    </el-form-item>
    <el-form-item label="描述" >
      <el-input v-model="ModelGood.describe" ></el-input>
    </el-form-item>
    <el-form-item label="编码" class='short' prop='productNo' v-if="oKind != 'IMAGE'">
      <el-input v-model="ModelGood.productNo"></el-input>
    </el-form-item>
    <el-form-item label="价格"  class='short' prop='param1' v-if="oKind != 'IMAGE'">
      <el-input v-model="ModelGood.param1" ></el-input>
    </el-form-item>
    <el-form-item label="排序"   class='short' prop='sort'>
      <el-input v-model="ModelGood.sort" ></el-input>
    </el-form-item>
    <el-form-item label="时间" v-if='show' v-show="oKind == 'IMAGE'">
      <div class="block"  style='width:auto;' >
        <el-date-picker
          v-model="timevalue"
          type="datetimerange"
          range-separator="至"
          value-format='yyyy-MM-dd HH:mm:ss'
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </el-form-item>
    <el-form-item label="连接" >
      <template>
        <div>
          <el-input placeholder="请输入内容"  v-model="ModelGood.url">
            <el-button slot="append" icon="el-icon-arrow-right" @click="ProductLink(this)"></el-button>
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
    <el-button type="primary" @click="comfire()" v-else>确 定</el-button>
  </div>
</el-dialog>


<el-dialog title="添加子分类"  :visible.sync="dialogFormVisible2" id="dl">
  <el-form :model="catetoryMessage"  >
    <el-form-item label="子ID" >
      <el-input v-model="catetoryMessage.Id" ></el-input>
    </el-form-item>
    <el-form-item label="名称" >
      <el-input v-model="catetoryMessage.Title" ></el-input>
    </el-form-item>
    <el-form-item label="描述" >
      <el-input v-model="catetoryMessage.Describe" ></el-input>
    </el-form-item>
    <!-- <el-form-item label="排序"   class='short' prop='sort'>
      <el-input v-model="catetoryMessage.Sort" ></el-input>
    </el-form-item> -->
  <el-form-item label='图片'  style='width:100%;text-align:left;'>
    <template>
      <el-upload class="upload-demo" ref="upload" action="/server/file" :on-success='handleSuccess2 ' :file-list="fileList2" list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>        
    </template>
  </el-form-item>         
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="catecancel()">取 消</el-button>
    <el-button type="primary" @click="cateSave()" v-if='cateShow'>保 存</el-button>
    <el-button type="primary" @click="catecomfire()" v-else>确 定</el-button>
  </div>
</el-dialog>
	</div>
</template>
<script type="text/javascript">
import axios from "axios";
export default {
  data() {
    return {
      cateShow:true,
      searchtableData: [],
      insertcontent: "",
      Image: [],
      CMSTags: {},
      Good: "",
      show: true,
      sort: null,
      oneMessage: null,
      SelectData: "",
      Status: "2",
      oKind: null,
      show: true,
      value: "0",
      value0: "",
      cateMess:null,
      value1: "",
      cateIndex:0,
      cateFlag:false,
      RECID: "",
      limit: 10,
      offset: 0,
      infooffset: 0,
      infolimit: 4,
      code: "",
      fileList1: [],
      fileList2: [],
      currentPage4: 1,
      navigationConfig: [],
      timevalue: "",
      CMSRECID: "",
      total1: null,
      infototal: null,
      activeName2: "first",
      tableData: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      catetoryMessage: {
        Id: "",
        Title: "",
        Image: "",
        Sort: "",
        Describe: ""
      },
      ModelGood: {
        productNo: "",
        title: "",
        describe: "",
        param1: "",
        param2: "",
        param3: "",
        param4: "",
        param5: "",
        sort: "",
        status: "0",
        url: "",
        advertCode: "",
        kind: "",
        startTime: "",
        endTime: "",
        navigationConfig:"[]"
      }
    };
  },
  watch: {

    offset: function() {
      var This = this;
      this.code = this.$route.params.id;
      axios
        .get(
          "/shophome/GetCmsProductRef?Code=" +
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
            var navigationConfig = JSON.parse(res.data.rows[i].navigationConfig)
            for(var j = 0 ; j < navigationConfig.length; j++){
              if(!navigationConfig[j].hasOwnProperty('status')){
                navigationConfig[j].status = true
              }
            }
            res.data.rows[i].navigationConfig = JSON.stringify(navigationConfig)
          }
          This.tableData = res.data.rows;
          This.total1 = res.data.count;
        });
    },
    infooffset: function() {
      var This = this;
      
      this.code = this.$route.params.id;
      axios
        .get(
          "/api/getProductInfo?search=" +
            this.insertcontent +
            "&offset=" +
            this.infooffset +
            "&limit=" +
            this.infolimit
        )
        .then(function(res) {
          if (res.data.rows) {
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
            This.searchtableData = res.data.rows;
          }
          This.infototal = res.data.count;
        });
    },
    SelectData: function(old) {
      if (old) {
      } else {
        this.SelectData = "";
        var This = this;
        axios
          .get(
            "/shophome/GetCmsProductRef?Code=" +
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
            var navigationConfig = JSON.parse(res.data.rows[i].navigationConfig)
            for(var j = 0 ; j < navigationConfig.length; j++){
              if(!navigationConfig[j].hasOwnProperty('status')){
                navigationConfig[j].status = true
              }
            }
            res.data.rows[i].navigationConfig = JSON.stringify(navigationConfig)      
            }
            This.tableData = res.data.rows;
            This.total1 = res.data.count;
          });
      }
    }
  },

  methods: {
        up(item, all,mess) {
      var This = this;
      // 交换数组元素
      var swapItems = function(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
      };
      if (all.$index != 0) {
        var Array = JSON.parse(
           mess.navigationConfig
        );
        swapItems(Array, all.$index, all.$index - 1);
          mess.navigationConfig = JSON.stringify(
          Array
        );

        var param = {
          navigationConfig : mess.navigationConfig
        }
        
      axios
        .post("/shophome/update", {
          RECID: mess.recid,
          param: param
        })
        .then(function(res) {
         

        });
      }
    },
        down(item, all,mess) {
      var This = this;
      var Array = JSON.parse(
        mess.navigationConfig
      );
      if (
        all.$index ==
        JSON.parse(mess.navigationConfig).length -
          1
      ) {
      } else {
        var swapItems = function(arr, index1, index2) {
          arr[index1] = arr.splice(index2, 1, arr[index1])[0];
          return arr;
        };

        swapItems(Array, all.$index, all.$index + 1);

        mess.navigationConfig = JSON.stringify(
          Array
        );
        var param = {
          navigationConfig : mess.navigationConfig
        }
      axios
        .post("/shophome/update", {
          RECID: mess.recid,
          param: param
        })
        .then(function(res) {
         

        });
      }
    },
    catedel(item, row, all) {
      var This = this;
      this.$confirm("此操作将永久删除楼, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          var FloorArr = JSON.parse(
            all.navigationConfig
          );
          
          FloorArr.splice(row, 1);


        all.navigationConfig = JSON.stringify(
          FloorArr
        );
        var param = {
          navigationConfig : all.navigationConfig
        }
      axios
        .post("/shophome/update", {
          RECID: all.recid,
          param: param
        })
        .then(function(res) {

        });

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    cateSave() {

      this.cateShow = true;
      var This = this;
      if (this.Image[0]) {
        this.catetoryMessage.Image = this.Image[0];
      }
      this.navigationConfig.push(this.catetoryMessage);
      var attr = JSON.parse(this.oneMessage.navigationConfig);
      attr.push(this.catetoryMessage);
      this.oneMessage.navigationConfig = JSON.stringify(attr);
      var param = {
        navigationConfig: this.oneMessage.navigationConfig
      };
      axios
        .post("/shophome/update", {
          RECID: this.oneMessage.recid,
          param: param
        })
        .then(function(res) {
          This.open("成功", "修改成功");
          This.dialogFormVisible2 = false;
          for (attr in This.catetoryMessage) {
            This.catetoryMessage[attr] = "";
          }
          This.Image = [];
        });
    },
    ProductLink(href) {
      var arr = this.ModelGood.url;
      window.open(arr);
    },
    addComfirm() {},
    handleCurrentChange1(val) {
      if (val) {
        this.fileList1 = [];
        this.ModelGood.productNo = val.productNo;
        this.ModelGood.title = val.productName;
        this.ModelGood.describe = val.shortDesc;
        this.ModelGood.sort = val.sort;
        this.ModelGood.param1 = val.salePrice;
        this.ModelGood.url =
          "https://gdtvshop.weixinmvp.com/wap/shop/productdetail.aspx?no=" +
          val.productNo;
        this.Image = [];
        this.fileList1 = [];
        this.Image = val.imageUrl;
        var obj = {};
        obj.url = val.productImg;
        this.fileList1.push(obj);
      }
    },
    search() {
      this.currentPage4 = 0;
      var This = this;
      this.infototal = 0;
      this.infooffset = 0;
      This.searchtableData = [];
      if (this.insertcontent) {
        axios
          .get(
            "/api/getProductInfo?search=" +
              this.insertcontent +
              "&offset=" +
              this.infooffset +
              "&limit=" +
              this.infolimit
          )
          .then(function(res) {
            if (res.data.rows) {
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
              This.searchtableData = res.data.rows;
            }
            This.infototal = res.data.count;
          });
      } else {
        this.insertcontent = "请输入正确的标题或编码";
      }
    },
    timeChange(item, scope) {
      var This = this;
      if (
        this.tableData[scope.$index].startTime !=
          this.tableData[scope.$index].timeRange[0] ||
        this.tableData[scope.$index].endTime !=
          this.tableData[scope.$index].timeRange[1]
      ) {
        var param = {
          startTime: this.tableData[scope.$index].timeRange[0],
          endTime: this.tableData[scope.$index].timeRange[1]
        };
        axios
          .post("/shophome/update", {
            RECID: scope.row.recid,
            param: param
          })
          .then(function(res) {
            This.open("成功", "保存成功");
            scope.row.startTime = This.tableData[scope.$index].timeRange[0];
            scope.row.endTime = This.tableData[scope.$index].timeRange[1];
          });
      }
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
    catecancel(){
      this.dialogFormVisible2 = false;
      for(var attr in  this.catetoryMessage){
         this.catetoryMessage[attr] = ''
      }
    },
    cancel() {
      this.dialogFormVisible1 = false;
      this.ModelGood.productNo = "";
      this.ModelGood.title = "";
      this.ModelGood.describe = "";
      this.ModelGood.param1 = "";
      this.ModelGood.param2 = "";
      this.ModelGood.param3 = "";
      this.ModelGood.param4 = "";
      this.ModelGood.param5 = "";
      this.ModelGood.sort = "";
      this.ModelGood.status = "";
      this.ModelGood.url = "";
      this.ModelGood.advertCode = this.code;
      this.fileList1 = [];
    },
    save() {
      var This = this;
      this.$refs["ModelGood"].validate(valid => {
        if (valid) {
          this.dialogFormVisible1 = false;
          this.ModelGood.status = this.value;
          if (this.Image.length == 1) {
            this.ModelGood.imageUrl = JSON.stringify(this.Image);
          } else {
            delete this.ModelGood.imageUrl;
          }
          if (!this.ModelGood.param1) {
            delete this.ModelGood.param1;
          }
          if (this.ModelGood.recid) {
            delete this.ModelGood.recid;
          }
          if (this.timevalue[0]) {
            this.ModelGood.startTime = this.timevalue[0];
          } else {
            delete this.ModelGood.startTime;
          }
          for (var index in this.ModelGood) {
            if (!this.ModelGood[index]) {
              delete this.ModelGood[index];
            }
          }
          if (this.timevalue[1]) {
            this.ModelGood.endTime = this.timevalue[1];
          } else {
            delete this.ModelGood.endTime;
          }
          this.ModelGood.timeRange = this.timevalue;
          axios
            .post("/shophome/addOne", {
              param: this.ModelGood
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
              obj.status = false;
              obj.Price = true;
              This.ModelGood.imageUrl = [];
              This.tableData.unshift(obj);
              This.open("成功", "保存成功");
              This.searchtableData = [];
            });
        } else {
          this.dialogFormVisible1 = true;
          return;
        }
      });
    },
    catecomfire(){
      var This = this;
            if (this.Image[0]) {
        this.catetoryMessage.Image = this.Image[0];
      }
       var attr = JSON.parse(this.oneMessage.navigationConfig);

        for(var attr1 in attr[this.cateIndex] ){
          attr[this.cateIndex][attr1] = this.catetoryMessage[attr1]
        }
           this.oneMessage.navigationConfig = JSON.stringify(attr);

                 var param = {
        navigationConfig: this.oneMessage.navigationConfig
      };
      axios
        .post("/shophome/update", {
          RECID: this.oneMessage.recid,
          param: param
        })
        .then(function(res) {
          This.open("成功", "修改成功");
          This.dialogFormVisible2 = false;
          for (attr in This.catetoryMessage) {
            This.catetoryMessage[attr] = "";
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
          if (this.ModelGood.param1) {
          } else {
            delete this.ModelGood.param1;
          }
          if (this.Image.length) {
            this.ModelGood.imageUrl = JSON.stringify(this.Image);
            this.Good.imageUrl = JSON.stringify(this.Image);
          } else {
            delete this.ModelGood.imageUrl;
          }
          if (this.oKind != "IMAGE") {
            delete this.ModelGood.startTime;
            delete this.ModelGood.endTime;
          }
          for (var index in this.ModelGood) {
            if (!this.ModelGood[index]) {
              delete this.ModelGood[index];
            }
          }
          if (this.ModelGood.startTime == "Invalid date") {
            delete this.ModelGood.startTime;
          }
          if (this.ModelGood.endTime == "Invalid date") {
            delete this.ModelGood.endTime;
          }
          axios
            .post("/shophome/update", {
              RECID: this.Good.recid,
              param: this.ModelGood
            })
            .then(function(res) {
              This.open("成功", "修改成功");
              This.Image = [];
            });
        } else {
          this.dialogFormVisible1 = true;
          return;
        }
      });
    },
    edit2(item) {
      for(var attr in this.catetoryMessage){
        this.catetoryMessage[attr] = ''
      }
      this.oneMessage = item;
      this.cateShow  = true;
      this.fileList2 = [];
      for (var i = 0; i < JSON.parse(item.navigationConfig).length; i++) {
        this.navigationConfig.push(JSON.parse(item.navigationConfig)[i]);
      }
      setTimeout(function() {
        var Model = document.getElementsByClassName("v-modal")[0];
        var body = document.getElementsByTagName("body")[0];
        body.removeChild(Model);
      }, 20);
      this.dialogFormVisible2 = true;
    },
    cateEdit(data,index,scope) {
      this.oneMessage = scope
      this.cateMess = data; 
      this.cateIndex = index;
      this.cateShow = false;
      this.catetoryMessage.Id = data.Id;
      this.catetoryMessage.Image = data.Image;

      this.catetoryMessage.Sort = data.Sort;
      this.catetoryMessage.Describe = data.Describe;
      this.catetoryMessage.Title = data.Title;
      this.catetoryMessage.status = data.status;
      
      this.fileList2 = [];
      var obj = {};
      obj.url = data.Image.ServerUrl + data.Image.FilePath;
      setTimeout(function() {
        var Model = document.getElementsByClassName("v-modal")[0];
        var body = document.getElementsByTagName("body")[0];
        body.removeChild(Model);
      }, 20);
      this.fileList2.push(obj);
      this.dialogFormVisible2 = true;
    },
    edit1(item) {
      this.show = false;
      this.Good = item;
      this.Image = [];
      this.fileList1 = [];
      this.dialogFormVisible1 = true;
      if (this.Good.imageUrl) {
        this.Image.push(JSON.parse(this.Good.imageUrl)[0]);
        var obj = {};

        obj.url =
          JSON.parse(this.Good.imageUrl)[0].ServerUrl +
          JSON.parse(this.Good.imageUrl)[0].FilePath;
        this.fileList1.push(obj);
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
      this.fileList1 = [];
      this.insertcontent = "";
      setTimeout(function() {
        var Model = document.getElementsByClassName("v-modal")[0];
        var body = document.getElementsByTagName("body")[0];
        body.removeChild(Model);
      }, 20);
      this.show = true;
      this.dialogFormVisible1 = true;
      this.ModelGood.productNo = "";
      this.ModelGood.title = "";
      this.ModelGood.describe = "";
      this.ModelGood.param1 = "";
      this.ModelGood.sort = "99";
      this.ModelGood.status = "";
      this.ModelGood.url = "";
      this.ModelGood.advertCode = this.code;
      this.dialogFormVisible1 = true;
      this.searchtableData = [];
    },
    handleSuccess2(res) {
      this.Image = [];
      this.fileList2 = [];
      this.Image.push(res);
      var obj = {};
      obj.url = res.ServerUrl + res.FilePath;
      this.fileList2.push(obj);
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
          "/shophome/GetCmsProductRef?Code=" +
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
            var navigationConfig = JSON.parse(res.data.rows[i].navigationConfig)
            for(var j = 0 ; j < navigationConfig.length; j++){
              if(!navigationConfig[j].hasOwnProperty('status')){
                navigationConfig[j].status = true
              }
            }
            res.data.rows[i].navigationConfig = JSON.stringify(navigationConfig)    
          }
          This.tableData = res.data.rows;
          This.total1 = res.data.count;
        });
    },
    handleCurrentChange(currentPage) {
      this.offset = (currentPage - 1) * this.limit;
    },
    handleCurrentChangeinfo(currentPage) {
      this.infooffset = (currentPage - 1) * this.infolimit;
    },
    err(a, b) {
      this.$notify.error({
        title: a,
        message: b
      });
    },
    Blur(item) {
      var This = this;
      if (isNaN(item.row.sort)) {
        this.err("失败", "不能包含字母，请重新输入");
      } else {
        if (this.sort != item.row.sort) {
          var param = {
            sort: ""
          };
          param.sort = item.row.sort;
          axios
            .post("/shophome/update", {
              RECID: item.row.recid,
              param: param
            })
            .then(function(res) {
              This.open("成功", "排序修改成功");
              This.onSubmit();
            });
        }
        item.row.Price = true;
      }
    },
    focus(item) {
      this.sort = item.row.SORT;
    },
    ChangePrice(item, This) {
      item.row.Price = false;
    },
    buttonChange(num, item) {
      var num1 = "";
      if (num) {
        num1 = 1;
      } else {
        num1 = 0;
      }

      axios
        .get("/shophome/Goodstatus?status=" + num1 + "&Id=" + item.row.recid)
        .then(function(res) {});
    },
    buttonChange1(num, item, props){
      var navigationConfig = JSON.parse(props.row.navigationConfig)
      navigationConfig[item.$index] = item.row
        var param = {
          navigationConfig : JSON.stringify(navigationConfig)
        }
props.row.navigationConfig = param.navigationConfig
      axios
        .post("/shophome/update", {
          RECID: props.row.recid,
          param: param
        })
        .then(function(res) {
        });
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
            .get("/shophome/deleteOne?RECID=" + item.recid)
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
    if(this.$route.params.id.indexOf("CATEGORY") != -1){
      this.cateFlag = true;
    }
    axios
      .get("/shophome/getKind?advertCode=" + this.$route.params.id)
      .then(function(res) {
        This.ModelGood.kind = res.data.rows[0].kind;
        This.oKind = res.data.rows[0].kind;
      });
    if (this.$route.params.id) {
      this.activeName2 = "two";
      var This = this;
      this.code = this.$route.params.id;
      axios
        .get(
          "/shophome/GetCmsProductRef?Code=" +
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
            // console.log(JSON.parse(res.data.rows[0].navigationConfig, 123))
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].Price = true;
            if (res.data.rows[i].status == 1) {
              res.data.rows[i].status = true;
            } else {
              res.data.rows[i].status = false;
            }
            var navigationConfig = JSON.parse(res.data.rows[i].navigationConfig)
            for(var j = 0 ; j < navigationConfig.length; j++){
              if(!navigationConfig[j].hasOwnProperty('status')){
                navigationConfig[j].status = true
              }
            }
            res.data.rows[i].navigationConfig = JSON.stringify(navigationConfig)
          }
          This.tableData = res.data.rows;
          This.total1 = res.data.count;
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
  width: 100%;
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
  overflow: hidden;
}
/* .el-upload-list--picture .el-upload-list__item-thumbnail {
  width: 400px;
} */
#shophome .el-table .cell {
  text-align: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  line-height: 1;
}
#shophome .el-table .cell img {
  padding: 4px;
  box-sizing: border-box;
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
#shophome .el-table--enable-row-transition .el-table__body td {
  /* padding:0;margin:0; */
  height: auto;
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
  width: 100%;
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
.el-upload-list--picture .el-upload-list__item-thumbnail {
  max-width: 200px;
  max-height: 80px;
}
</style>