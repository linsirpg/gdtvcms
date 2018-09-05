<template>
 <el-dialog
  title="提示"
  :visible.sync="addproductInfoflag[0]"
  width="50%"
   id='addproducttoast'
  >
  <div>
      <div style="margin-top: 15px;">
  <el-input placeholder="标题或编码" v-model="insertcontent" class="input-with-select">
    <el-button slot="append" icon="el-icon-search" @click='search()'></el-button>
  </el-input>
  <el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
      property="productNo"
      label="信息"
      style='width:30%;'
      >
    <template slot-scope='scope'>
       <a :href="'https://gdtvshop.weixinmvp.com/wap/shop/productdetail.aspx?no='+scope.row.productNo" target="_blank">{{scope.row.productName}}[{{scope.row.productNo}}]</a> 
    </template>
    </el-table-column>
    <el-table-column
      property="shortDesc"
      label="描述"
      style='width:30%;'
     >
    </el-table-column>
    <el-table-column
      property="address"
      label="图片"
      style='width:40%;'
      >
          <template slot-scope='scope'>
                            <div v-if='scope.row.imageUrl'>
                  <img :src="scope.row.productImg" alt="" style='width:40%;'>
                </div>
                <div v-else>
                    未设置
                </div>
          </template>
    </el-table-column>
  </el-table>
</div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click='addComfirm'>确 定</el-button>
  </span>
</el-dialog> 
</template>

<script>
import axios from "axios";
export default {
    computed:{
        addproductInfoflag(){
            return this.$store.state.addproductInfoflag
        }
    },
  data() {
    return {
      insertcontent: "",
      tableData: [],
      productobj:null,
    };
  },
  methods: {
    cancel(){
        this.$store.state.addproductInfoflag = [];
        this.$store.state.addproductInfoflag = [false]
        this.$store.state.addproductInfo = null
    },
    addComfirm() {
      if(this.tableData.length > 0 && !this.$store.state.addproductInfo){
         this.$store.state.addproductInfo = this.tableData[0]
          this.$store.state.addproductInfoflag = [];
        this.$store.state.addproductInfoflag = [false]
      }
      if(!this.tableData.length){
        this.$store.state.addproductInfoflag = [];
        this.$store.state.addproductInfoflag = [false]
        this.$store.state.addproductInfo = null
      }

      if(this.tableData.length > 0 && this.$store.state.addproductInfo){
        this.$store.state.addproductInfoflag = [];
        this.$store.state.addproductInfoflag = [false]
      }
    },
    handleCurrentChange(val) {
      this.$store.state.addproductInfo = val;
    },
    search() {
      var This = this;
      This.tableData = [];
      if (this.insertcontent) {
        axios
          .get("/api/getProductInfo?search=" + this.insertcontent)
          .then(function(res) {
            res.data.map(function(data) {
              if (data.productImg) {
                data.imageUrl = [];
                data.imageUrl.push(JSON.parse(data.productImg)[0]);
                data.productImg =
                  JSON.parse(data.productImg)[0].ServerUrl +
                  JSON.parse(data.productImg)[0].FilePath +
                  ".thumb." +
                  JSON.parse(data.productImg)[0].FileExt;
              }
              This.tableData.push(data);
            });
          });
      } else {
        this.insertcontent = "请输入正确的格式";
      }
    }
  }
};
</script>

<style>
#shophome #addproducttoast .el-table--enable-row-transition .el-table__body td {
  padding: 12px 0 12px 0;
}
</style>
