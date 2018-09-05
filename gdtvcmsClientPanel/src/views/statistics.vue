
<template>
	<div class='view-content'>
		<el-card class="box-card"  >
		  <div slot="header" class="clearfix">
			<el-form :inline="true"  class="demo-form-inline" style='width:70%;'>
			      <el-form-item >
                    <div class="block" style="padding:0;">
                        <el-date-picker
                        v-model="value5"
                        type="daterange"
                        value-format = 'yyyy/MM/d'
                        :picker-options="pickerOptions2"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                        </el-date-picker>
                    </div>
				  </el-form-item>

        <el-form-item >
          <el-select v-model="region" placeholder="请选择活动区域">
            <el-option selected label="商城总访问量与点击量" value="HOME|%"></el-option>
            <el-option label="首页轮播" value="HOME|HOME_BANNER|"></el-option>
            <el-option label="热卖爆款" value="HOME|HOTSALE|"></el-option>
          </el-select>
        </el-form-item>
			  <el-form-item >
			    <el-button type="primary" @click='search()' >查询</el-button>
			  </el-form-item>
			</el-form>
		  </div>
		</el-card>
		<el-card class="box-card1" >
            <div slot="header" class="clearfix">
                <router-view></router-view>
            </div>
		</el-card>
	</div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return {
        region: 'HOME|%',
        value5:[],
        pickerOptions2: {
          shortcuts: [
          {
            text: '昨天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
              picker.$emit('pick', [start, end]);
            }
          }            
            ,{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value5: ''
        }
    },
    methods: {
      search () {
        this.$store.state.statisticsData = null;
        console.log(this.value5)
        var This = this;
        axios.post('statistics/getStatistics',{
            type: 'line',
            timeRange:This.value5,
            statTabType:this.region
        }).then(function(res){
          This.$store.state.statisticsData = res
        })        
      }
    },
    watch: {
      region () {
        switch(this.region)
        {
          case 'HOME|%':
          this.$router.push({ path: '/statistics/pageview',query:{timeRange: this.value5} })
          break;
          case 'HOME|HOME_BANNER|' :
           this.$router.push({ path: '/statistics/HomeBanner', query:{timeRange: this.value5}})
          break;
          case 'HOME|HOTSALE|' :
           this.$router.push({ path: '/statistics/HotSale', query:{timeRange: this.value5} })
          break;          
        }
      }
    }
}
</script>
<style type="text/css" scope>
element.style {
  left: 200px;
}
body .el-date-range-picker {
  left: 12% !important;
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

#echarts{
    /* position: fixed;
    z-index: -1;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right:0;
    padding-top:10px;
    z-index: -1;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;    
    width:88%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box; */
    width:100%;
    height:600px;
}
</style>
