<template>
<div>

<el-card class="box-card"  >
		  <div slot="header" class="clearfix">
			<el-form :inline="true"  class="demo-form-inline" style='width:70%;'>
 			  <el-form-item >
            <el-upload
            class="upload-demo"
            action="/public/addAdverProduct"
            :on-success='handleSuccess'
            >
            <el-button  type="primary">导入增加分类产品</el-button>
            </el-upload>
    
			    
			  </el-form-item>	 
          			  <el-form-item >
			    <el-button type="primary" @click='ExcelDownLoad' >模板下载</el-button>
			  </el-form-item>	      	  
			</el-form>
		  </div>
		</el-card>     
	<div class='view-content' style='margin-top:15px;'>
		<el-card class="box-card1" >
		  <div slot="header" class="clearfix">
			<el-table :data="catetoryName" border style="width:auto">
			    <el-table-column prop="title" label="分类" >
			    </el-table-column>
			    <el-table-column prop="status" label="操作"  width='300'>
					<template slot-scope="scope">
			        	<el-button  type="primary"  v-on:click="edit(scope)" size="small">编辑</el-button>
			     	</template>
			    </el-table-column>
			</el-table>	  
		  </div>
		</el-card>
	</div>
</div>
</template>
<script type="text/javascript">
import axios from "axios";
export default {
  data() {
    return {
      catetoryName:[{title:'首页导航排序',name:'导航排序'},{title:'首页推荐',name:'首页'},{title:"精选美食",name:'美食'},{title:"家居家装",name:'家居家装'},{title:"家用电器",name:'家用电器'},{title:"美妆个护",name:'美妆个护'},{title:"母婴用品",name:'母婴用品'},{title:"汽车养护",name:'汽车养护'},{title:"文化教育",name:'文化教育'},{title:"其他",name:'其他'}],
    };
  },
  methods: {
        ExcelDownLoad(){
      window.location.href =location.origin+ '/template/addAdvertProduct.xlsx'
    },
    edit(item) {
      this.$store.state.show = true;
      var arr =
        window.location.href.split("#")[0] + "#/shophomecatetory/" + item.row.name;
        console.log(arr)
      window.open(arr);
    },
        open(a, b) {
      this.$notify({
        title: a,
        message: b,
        type: "success"
      });
    },
    handleSuccess (result) {
      this.open("成功", "数据保存成功");
    }
  },
  watch: {
  },
  created() {
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
