
<template>
    <div id='echarts'>
    </div>
</template>
<script>
import axios from "axios";
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      DetailedDate: [],
      DateCount: [],
      legendData: [],
      seriesArr: []
    };
  },
  mounted() {
    this.drawLine();
  },
  computed: {
    statistics() {
      if (this.$store.state.statisticsData) {
      }
      return this.$store.state.statisticsData;
    }
  },
  watch: {
    statistics() {
      var This = this;
      var myChart = This.$echarts.init(document.getElementById("echarts"));
      if (this.$store.state.statisticsData) {
        myChart.hideLoading();
        myChart.setOption({
          legend: {
            data: this.$store.state.statisticsData.data.legendData
          },
          xAxis: {
            data: this.$store.state.statisticsData.data.xAxisData
          },
          series: this.$store.state.statisticsData.data.seriesData
        });
      } else {
        myChart.showLoading();
      }
    }
  },
  methods: {
    drawLine() {
      var This = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("echarts"));
      myChart.showLoading();
      // 绘制图表
      myChart.setOption({
        title: { text: "商城首页总访问里与点击量" },
        legend: {
          data: This.legendData
        },
        tooltip: {
          trigger: "axis"
        },
        tooltip: {},
        xAxis: {
          data: This.DetailedDate
        },
        yAxis: {
          type: "value"
        },
        series: []
      });
    }
  },
  created() {
    var This = this;
    axios
      .post("statistics/getStatistics", {
        type: "line",
        statTabType: 'HOME|%'
      })
      .then(function(result) {
        // var ResultDate = []
        //  result.data.map(function(res){
        //      var ObjDate = {
        //          date: '',
        //          DateArr: [],
        //          eventArr: [],
        //      }
        //      if(This.DetailedDate.indexOf(res.STAT_DATE) == '-1'){
        //         This.DetailedDate.push(res.STAT_DATE)
        //         ObjDate.date = res.STAT_DATE;
        //         ResultDate.push(ObjDate)
        //      }
        //      ResultDate[This.DetailedDate.indexOf(res.STAT_DATE)]
        //      if(ResultDate[This.DetailedDate.indexOf(res.STAT_DATE)]){
        //          ResultDate[This.DetailedDate.indexOf(res.STAT_DATE)].DateArr.push(res)
        //          ResultDate[This.DetailedDate.indexOf(res.STAT_DATE)].eventArr.push(res.STAT_TAB_OPERA)
        //      }
        //     if(This.legendData.indexOf(res.STAT_TAB_OPERA) == '-1'){
        //         This.legendData.push(res.STAT_TAB_OPERA)
        //         var obj = {
        //                 name: '',
        //                 type: 'line',
        //                 data: [],
        //             }
        //             obj.name = res.STAT_TAB_OPERA
        //         This.seriesArr.push(obj)
        //     }
        //  })
        // ResultDate.map(function(res){
        //     if (res.DateArr.length != This.legendData.length) {

        //         This.legendData.map(function(resData){
        //             var SliceObj = {
        //                 STAT_DATE:'0',
        //                 STAT_TAB_OPERA:'',
        //                 total: 0
        //             }
        //             if(res.eventArr.indexOf(resData) < 0){
        //                 SliceObj.STAT_DATE = res.DateArr[0].STAT_DATE
        //                 SliceObj.STAT_TAB_OPERA = resData;
        //                 SliceObj.total = 0;
        //                 res.eventArr.push(resData)
        //                 res.DateArr.push(SliceObj);
        //             }
        //         })
        //     }
        // })
        // ResultDate.map(function(res){
        //     res.DateArr.map(function(result){
        //         This.seriesArr.map(function(seriesRes) {
        //             if(seriesRes.name == result.STAT_TAB_OPERA) {
        //                 seriesRes.data.push(result.total)
        //             }
        //         })
        //     })
        // })
        var myChart = This.$echarts.init(document.getElementById("echarts"));
        myChart.hideLoading();
        myChart.setOption({
          legend: {
            data: result.legendData
          },
          xAxis: {
            data: result.data.xAxisData
          },
          series: result.data.seriesData
        });
      });
  }
};
</script>

