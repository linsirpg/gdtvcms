
<template>
	<div class='view-content'>
		<el-card class="box-card"  >
		  <div slot="header" class="clearfix">
			<el-form :inline="true" :model="formInline" class="demo-form-inline" style='width:70%;'>
			  <el-form-item  style='' class='ttsearch'>
			  	<el-input v-model="createdData" placeholder='标题搜索'></el-input>
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
			</el-form>
		  </div>
		</el-card>
		<el-card class="box-card1" >
		  <div slot="header" class="clearfix">
			<el-table :data="tableData" border style="width:auto">
			    <el-table-column prop="recid" label="ID" width="80">
			    </el-table-column>
			    <el-table-column prop="title" label="标题" >
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
			        	<el-button  type="primary"  v-on:click="edit(scope)" size="small">编辑</el-button>
			     	</template>
			    </el-table-column>
			</el-table>	  

		  </div>
		</el-card>
		  <div class="block">
		    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"  :page-sizes="[10,20,40,60,80,100]" layout="total, sizes, prev, pager, next, jumper" :total="total1">
		    </el-pagination>
 		 </div>	
	</div>
</template>
<script type="text/javascript">
import axios from "axios";
export default {
  data() {
    return {
      sort: null,
      Status: "2",
      value3: true,
      total1: null,
      offset: "0",
      limit: "10",
      formInline: {
        user: "",
        region: ""
      },
      SelectData: "",
      createdData:"",
      tableData: [],
      currentPage4: 1
    };
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
        .get("/shophome/status?status=" + num1 + "&Id=" + item.row.recid)
        .then(function(res) {});
    },
    cancel() {
      this.SelectData = "";
      this.GetShopHomeInfo(this.offset, this.limit);
    },
    GetSArticleInfo(offset, limit) {
      var This = this;
      axios
        .get(
          "/shophome/advertPosition?offset=" +
            This.offset +
            "&limit=" +
            This.limit +
            "&title=" +
            This.SelectData +
            "&status=" +
            This.Status
        )
        .then(function(res) {
          This.total1 = res.data.count;
          let obj = res.data.rows;
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].Price = true;
            if (res.data.rows[i].status == 1) {
              res.data.rows[i].status = true;
            } else {
              res.data.rows[i].status = false;
            }
          }
          This.tableData = obj;
        });
    },
    GetShopHomeInfo(offset, limit) {
      var This = this;
      axios
        .get(
          "/shophome/ShopHomePosition?offset=" +
            This.offset +
            "&limit=" +
            This.limit +
            "&title=" +
            This.createdData +
            "&status=" +
            This.Status
        )
        .then(function(res) {
          This.total1 = res.data.count;
          let obj = res.data.rows;
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].Price = true;
            if (res.data.rows[i].status == 1) {
              res.data.rows[i].status = true;
            } else {
              res.data.rows[i].status = false;
            }
          }
          This.tableData = obj;
        });
    },
    Blur(item) {
      var This = this;
      if (this.sort != item.row.showOrder) {
        axios
          .post("/articleinfo/UpdateArtical", {
            RECID: item.row.recid,
            param: item.row
          })
          .then(function(res) {});
      }
      item.row.Price = true;
    },
    focus(item) {
      this.sort = item.row.showOrder;
    },
    ChangePrice(item, This) {
      item.row.Price = false;
    },
    onSubmit() {
      if(this.createdData == ''){
        this.createdData = this.$route.params.id;
      }
      this.GetShopHomeInfo(this.offset, this.limit);
    },
    handleSizeChange(size) {
      this.limit = size;
    },
    handleCurrentChange(currentPage) {
      this.offset = (currentPage - 1) * this.limit;
    },
    edit(item) {
      this.$store.state.show = true;
      var arr =
        window.location.href.split("#")[0] + "#/shophomeproduct/" + item.row.advertCode;
      window.open(arr);
    },
  },
  watch: {
    offset: function() {
      this.GetShopHomeInfo(this.offset, this.limit);
    },
    limit: function() {
      this.GetShopHomeInfo(this.offset, this.limit);
    },
    SelectData: function(old) {
      if (old) {
        // this.onSubmit()
      } else {
        this.SelectData = "";
        this.GetShopHomeInfo(this.offset, this.limit);
      }
    }
  },
  created() {
    this.offset = "0";
    this.createdData = this.$route.params.id;
    this.SelectData = this.$route.params.id;
    this.GetShopHomeInfo(this.offset, this.limit);
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
</style>
